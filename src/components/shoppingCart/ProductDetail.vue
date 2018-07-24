<template>
<div>
  <Header></Header>
  <loading :active.sync="isLoading"></loading>
  <div class="container main-contant mb-1">
    <nav aria-label="breadcrumb" role="navigation">
      <ol class="breadcrumb bg-transparent pl-0" v-if="product">
        <li class="breadcrumb-item">
          
          <router-link to="/shoppingCart">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <a href="#">{{product.category}}</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-md-4 mb-5">
        <div class="sticky-top" style="top: 10px;">
          <h1 class="h2">{{product.title}}
            <small class="text-muted">(這是屬於sutitle類)</small>
          </h1>
          <div class="d-flex my-3 align-items-end justify-content-end">
            <del class="text-muted">售價 ${{product.origin_price}}</del>
            <div class="h3 mb-0 ml-auto text-danger">
              <small>網路價 NT$</small>
              <strong>{{product.price}}</strong>
            </div>
          </div>
          <hr> 尺寸:
          <div class="btn-group btn-group-sm btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-outline-secondary active">
              <input type="radio" name="size" checked> SM
            </label>
            <label class="btn btn-outline-secondary">
              <input type="radio" name="size"> M
            </label>
            <label class="btn btn-outline-secondary disabled">
              <input type="radio" name="size" disabled> L
            </label>
            <label class="btn btn-outline-secondary">
              <input type="radio" name="size"> XL
            </label>
          </div>

          <div class="input-group mt-3">
            <select name="" class="form-control mr-1" id="" v-model="product.num">
              <option :value="num" v-for="num in 5" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
            <a href="shoppingCart-checkout.html" class="btn btn-primary" @click.prevent="addtoCart(product.id, product.num)">
              <i class="fa fa-cart-plus" aria-hidden="true"></i> 加入購物車
            </a>
          </div>

          <div class="mt-2 text-right text-muted">
            <i class="fa fa-cc-visa" aria-hidden="true"></i>
            <i class="fa fa-cc-jcb" aria-hidden="true"></i>
            <i class="fa fa-cc-paypal" aria-hidden="true"></i>
          </div>

        </div>


      </div>
      <div class="col-md-8">
        <h2>{{product.title}}</h2>
        <p class="card-text">商品介紹區塊，你要有介紹她才會有出現。</p>

        <h3 class="mt-5 text-center">介紹一</h3>
        <img :src="product.imageUrl" class="w-100" alt="">

        <h3 class="mt-5 text-center">介紹二</h3>
        <img :src="product.image" class="w-100" alt="">

         <div class="alert alert-secondary mt-4" role="alert">
          <h2 class="text-center">購物說明</h2>
          <p>不准退貨!不准退貨!不准退貨!很重要講三遍。</p>
        </div>
      </div>

    </div>
  </div>
  <Footer></Footer>
</div>
</template>


<script>
import $ from "jquery";
import Header from './header';
import Footer from './footer';

export default {
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ""
      },
      cart: {},
      isLoading: false,
      productId: "",
    };
  },
  components:{
        Header,
        Footer
  },
  methods: {
    getProduct(id) {
      console.log('(id)',id);
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        $('#productModal').modal('show');
        console.log('getProduct(id)',response);
        vm.status.loadingItem = '';
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(url, { data: cart }).then(response => {
        console.log(response);
        vm.status.loadingItem = "";
      });
    },
    
  },
  created() {
    const vm = this;
    vm.productId = this.$route.params.productId;
    this.getProduct(vm.productId);
    //console.log('created(productId)',vm.productId);
  }
};
</script>
