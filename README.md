# vue-reactivestorage
Reactive layer for interacting with localStorage from Vue. Plugin for Vue 2.

### why

`window.localStorage` cannot be reactive if you use it directly with Vue, ex

<pre><code>
new Vue({
    data {
      localStorage: window.localStorage
    },
    template: " &lt;div&gt; {{localStorage.notes}}, {{localStorage.lang}} ... &lt;/div&gt; ",
    created: function() {
        this.localStorage.lang = "other value";
    }
})
</code></pre>

Code above will not react, even bind to view. So...

### how to use 

<pre><code>import reactiveStorage from "vue-reactivestorage";

Vue.use(reactiveStorage, [
    "notes", 
    "lang",
    "name",
    "foo"
]); 
</code></pre>

<p>Define vars that will be stored and proxied by `Vue` (any other var in `window.localStorage` that is not on this array will not be proxied).</p>

<p>Now you can acess localStorage in the namespace <code>localStorage</code>.</p>

<pre><code>new Vue({
    template: " &lt;div&gt; {{localStorage.notes}}, {{localStorage.lang}} ... &lt;/div&gt; ",
    created: function() {
        this.localStorage.lang = "other value"; // will react on the view and on real localStorage.
    }
})
</code></pre>
