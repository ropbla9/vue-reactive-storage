var store = require("store");
var _data = store.getAll();

module.exports = {
    install: function(Vue) {
        Vue.mixin({
            data() {
                return {
                    local: _data
                };
            },
            methods: {
                localSet: function(item, value) {
                    store.set(item, value);
                    _data[item] = value;
                },
                localClear: function() {
                    store.clear();
                    for (var key in _data) {
                        _data[key] = "?";
                    }
                }
            }
        });
    }
};
