<template>
<div>
  <!-- headers -->
  <Header :msgChild.sync="msgChild"></Header>
  <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end">
    <div class="container">
      <div class="p-3 bg-lighter">
        <h1 class="display-3 font-weight-bold">任何地點配送，買越多越便宜！</h1>
        <p class="lead">趕快來試試，還在擔心運費嗎?現在跟蝦皮一樣免運，PCHome被搞垮的免運。</p>
      </div>
    </div>
  </div>
  <div class="container main-contant mb-1">
    <ProductList @emitGetCart="getCartCount"></ProductList>
  </div>
  <!-- footer -->
  <Footer></Footer>

  <!-- 不知道removeModal這幹嘛的 -->


</div>
</template>



<script>
    import Header from './shoppingCart/header';
    import ProductList from './shoppingCart/ProductList';
    import Footer from './shoppingCart/footer';
    //import AlertMessage from './AlertMessage';

export default {

    components:{
        Header,
        ProductList,
        Footer
        //AlertMessage
    },
    name: 'ShoppingCart',
    data(){
        return {
          msgChild:0,
          cart:{}
        };
    },
    methods:{
        getCart() {
          const vm = this;
          const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
          vm.isLoading = true;
          this.$http.get(url).then((response) => {
            vm.cart = response.data.data;
            // console.log('header', vm.cart.carts.length);
            vm.isLoading = false;
          });
          
        },
        getCartCount(){
          //console.log('getCount',carts);
          this.msgChild++;
        }
    }
}
</script>
<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
}
</style>