<template>
  <div id="app">

    <router-view/>
   
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    // this.$http.get(`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`)
    // .then((response) => {
    //   console.log(response.data)
    // })
  }
}
</script>

<style lang="scss">
@import "./assets/all";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
