<template>



<div>
  <loading :active.sync="isLoading"></loading>

  <div class="row">
    <div class="col-md-2">
      <!-- 左側選單 (List group) -->
      <LeftBar></LeftBar>
    </div>
    <div class="col-md-10">
      <div class="d-flex mb-4">
        <!-- Search bar -->
        <form class="form-inline my-3 my-lg-0">
          <div class="input-group">
            <input class="form-control" type="text" placeholder="Search" aria-label="Search">
            <div class="input-group-append">
              <button class="btn btn-outline-warning" type="submit">
                <i class="fa fa-search" aria-hidden="true"></i> Search</button>
            </div>
          </div>
        </form>
      </div>
      <!-- 主要商品列表 (Card) -->
      <div class="tab-content">
        <div class="tab-pane active" id="list-gold">
              <div class="row mt-4">
                <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
                  <div class="card border-0 shadow-sm">
                    <div style="height: 150px; background-size: cover; background-position: center"
                      :style="{backgroundImage: `url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                      <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                      <h5 class="card-title">
                        <a href="#" class="text-dark">{{ item.title }}</a>
                      </h5>
                      <p class="card-text">{{ item.content }}</p>
                      <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                          <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                        <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
                      </div>
                    </div>
                    <div class="card-footer d-flex">
                      <!-- <button type="button" class="btn btn-outline-secondary btn-sm"
                        @click="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                        查看更多
                      </button> -->
                      <router-link :to="`./product-detail/${item.id}`" class="btn btn-outline-secondary btn-sm">查看更多</router-link>
                      <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                        @click="addtoCart(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                        <i class="fa fa-cart-plus" aria-hidden="true"></i>
                        加到購物車
                      </button>
                    </div>
                  </div>
                </div>

                <div class="col-md-4 mb-4">
                    <div class="card border-0 box-shadow text-center h-100">
                        <div style="height: 150px; background-size: cover; background-position: center"
                        :style="{backgroundImage: `url(https://images.unsplash.com/photo-1485373650022-3ed53f62b8f3?w=634)`}">
                        <!-- <img class="card-img-top" src="https://images.unsplash.com/photo-1485373650022-3ed53f62b8f3?w=634" alt="Card image cap"> -->
                        </div>
                        <div class="card-body">
                          <h4 class="card-title">變聲領帶</h4>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                              is a little bit longer.</p>
                        </div>
                        <div class="card-footer border-top-0 bg-white">
                          <a href="#" class="btn btn-outline-secondary btn-block btn-sm disabled">
                              缺貨中
                          </a>
                        </div>
                    </div>
                </div>

              </div>
        </div>
        <div class="tab-pane" id="list-gift">
          <div class="row align-items-stretch">
            <!-- 禮品 -->
            <div class="col-md-4 mb-4">
              <div class="card border-0 box-shadow text-center h-100">
                <img class="card-img-top" src="https://images.unsplash.com/photo-1482173074468-5b323335debe?w=1350" alt="Card image cap">
                <div class="card-body">
                  <h4 class="card-title">超精緻禮物</h4>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                    is a little bit longer.</p>
                </div>
                <div class="card-footer border-top-0 bg-white">
                  <a href="#" class="btn btn-outline-secondary btn-block btn-sm">
                    <i class="fa fa-cart-plus" aria-hidden="true"></i> 搶購去
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- tab-content end -->
      <!-- pagination -->
      <Pagination :pages="pagination" @emitPages="getProducts"></Pagination>
    </div>

  </div>
</div>
</template>


<script>
import $ from "jquery";
import Pagination from "../Pagination";
import LeftBar from './leftBar';
export default {
  data() {
    return {
      products: [],
      status: {
        loadingItem: ""
      },
      pagination: {},
      isLoading: false
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/products?page=${page}`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.products = response.data.products;
        console.log(response);
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
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
        //vm.getCart();
        this.$emit('emitGetCart');
        // console.log(vm.$refs.header);
       
        $("#productModal").modal("hide");
      });
    }
  },
  components: {
    Pagination,
    LeftBar,
  },
  created() {
    this.getProducts();
    
  }
};
</script>

<style scoped>
</style>