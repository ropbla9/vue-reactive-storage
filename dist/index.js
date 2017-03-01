var store = require("store");


module.exports = {

    install: function(Vue, scheme) {

        // Init the layer
        // store.getAll() returns all localStorage serialized
        // filter returns store.getAll() without items that may occasionally be out of the Scheme
        var _localStorage = (function() {

            var filtered = {};

            for (let key in store.getAll()) {
                if(scheme[key]) {
                    filtered[key] = store.getAll()[key];
                }
            }

            // console.log(filtered);
            return filtered;

        })();

        // Verify scheme
        (function verify_scheme() {

            // Validate scheme existence and scheme type
            if (scheme === undefined) {
                console.error("Schemes are not defined.");
                return false;
            }

            // Check if localStorage contain all keys specified in Scheme
            // If a key fails, it will be seted to null, this way Vue can start watching it
            // scheme.forEach(function(val) {
            //     if(!_localStorage[val]) {
            //         _localStorage[val] = null;
            //         store.set(val, null);
            //     }
            // });

            Object.keys(scheme).forEach((key, i) => {
                if(!_localStorage[key]) {
                    store.set(key, new scheme[key]());
                }
            })
        })();

        // Now we're sure _localStorage contains all the keys in scheme
        Vue.mixin({
            data() {
                return {
                    localStorage: _localStorage
                };
            },
            watch: (function() {

                // Now, vm.data contains a the namespace localStorage
                // We want to create a watcher for all localStorage childrens
                // When them get updated we sync it with store.set (to localStorage)
                var watchers = (function() {

                    var _w = {};

                    Object.keys(scheme).forEach(function(key, i) {
                        _w[key] = function(val) {
                            store.set(key, val);
                            console.log(`${ key } watcher executed...`);
                        };
                    });

                    return _w;

                })();

                // watchers = an object containing a key for each localStorage children with the same name
                // therefore they watch handlers
                // watchers = {
                //     $children1: ...,
                //     $children2: ...,
                // }
                // But they need contain the father namespace in the key to work in Vue watch
                var name_space_parsed = (function() {

                    var _w = {};

                    for(let key in watchers) {
                        _w[`localStorage.${key}`] = watchers[key];
                    }

                    return _w;

                })();

                // now, name_space_parsed = {
                //     'localStorage.$children1': ...,
                //     'localStorage.$children2': ...,
                // }

                return name_space_parsed;

            })(),
            beforeMount() {

                // Remove a item in the scheme (set back to null)
                this.localStorage.remove = function(key) {

                    if(scheme.indexOf(key) != -1) {
                        _localStorage[key] = null;
                        store.set(key, null);
                    } else {
                        console.error("reactiveStorage cannot remove an item which is out of the Scheme");
                    }

                };

                // Clear all items in scheme
                this.localStorage.clear = function() {

                    scheme.forEach(function(item) {
                        _localStorage[item] = null;
                        store.set(item, null);
                    });

                };

            } // beforeMount
        }); // Vue.mixin
    } // install
}; // module.exports
