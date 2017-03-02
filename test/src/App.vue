<template>
  <div id="app">
      <h1>Test str and num</h1>
    <input type="text" v-model="localStorage.str" placeholder="type value for str"><br><br>
    <input type="number" v-model="localStorage.num" placeholder="type value for num">
      <h1>Test obj and arr</h1>
    <small>open Vue console to test below</small> <br><br>
    <input type="text" v-model="newKeyValueObj.key" placeholder="type new key for obj"> <input type="text" v-model="newKeyValueObj.value" placeholder="new value for obj">
    <button @click="addKeyValueToObj">add</button>
    <br><br>
    <input type="text" v-model="newValueToArr" placeholder="type new value for arr">
    <button @click="addValueToArr">add</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      newKeyValueObj: {
          key: "",
          value: ""
      },
      newValueToArr: ""
    }
},
methods: {
    addKeyValueToObj() {
        // For reacticy with plains u must replace entire object becouse watch doesn't detect changes on further namespaces/vars inside it.
        var copy = JSON.parse(JSON.stringify(this.localStorage.obj));
            copy[this.newKeyValueObj.key] = this.newKeyValueObj.value;
        this.localStorage.obj = copy;
    },
    addValueToArr() {
        this.localStorage.arr.push(this.newValueToArr);
    }
}
}
</script>
