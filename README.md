# vue-reactive-storage
Reactive layer for interacting with localStorage from Vue. Plugin for Vue 2.

### why

`window.localStorage` cannot be reactive if you use it directly with Vue, ex

```js
new Vue({
    data {
      localStorage: window.localStorage
    },
    template: " <div> {{localStorage.notes}}, {{localStorage.lang}} ... </div> ",
    created: function() {
        this.localStorage.lang = "other value";
    }
})
```

Code above will not react, even bind to view. So...

### how to use

```js
import reactiveStorage from "vue-reactive-storage";
// Set initial values
Vue.use(reactiveStorage, {
    "notes": 'foo',
    "lang": 'foo',
    "name": 'foo',
    "count": 1,
    "userConfig": {age: 10, name: 'fred'}
});
```

Define vars that will be stored and proxied by `Vue` (any other var in `window.localStorage` that is not on this array will not be proxied).

Now you can acess the namespace <code>localStorage</code> in Vue.

```js
new Vue({
    template: " <div> {{localStorage.notes}}, {{localStorage.lang}} ... </div> ",
    created: function() {
        this.localStorage.lang = "other value"; // will react on the view and on real localStorage.
    }
})
```
