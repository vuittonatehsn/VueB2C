<template>
  <nav class="navbar navbar-light bg-light">
      <!-- <a class="navbar-brand" href="shoppingCart.html">
        <i class="fa fa-heart text-info" aria-hidden="true"></i>
        軒轅大拍賣
      </a> -->
      <router-link  class="navbar-brand" to="/shoppingCart">
      <i class="fa fa-heart text-info" aria-hidden="true"></i>
       軒轅大拍賣
      </router-link>
     
      <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
      <div class="dropdown ml-auto">
        <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
          <!-- <font-awesome-icon icon="shopping-cart"/> -->
     
          <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
          <span class="badge badge-pill badge-danger" v-if="cart.carts">{{cart.carts.length}}</span>
          <span class="sr-only">unread messages</span>
        </button>
        <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 300px" data-offset="400">
          <h6>已選擇商品</h6>
          <table class="table table-sm">
            <tbody>
              <tr v-for="item in  cart.carts" :key="item.id"  v-if="cart.carts">
                <td class="align-middle text-center">
                  <a href="#removeModal" class="text-muted" data-toggle="modal" data-title="刪除 金牌西裝 1 件">
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </a>
                </td>
                <td class="align-middle">{{item.product.title}}</td>
                <td class="align-middle">{{item.qty}} {{item.product.unit}}</td>
                <td class="align-middle text-right">${{item.product.price}}</td>
              </tr>
            </tbody>
          </table>
          <router-link to="/shoppingCart-checkout" class="btn btn-primary btn-block">
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </router-link>
        </div>
      </div>
  </nav>
</template>

<script>
export default {
    props: ['msgChild'],
    watch:{
      'msgChild'(argMsg, old){
        console.log('InHeader', argMsg, 'old', old);
        this.getCart();
      }
    },
    name: 'Header',
    data(){
        return {
          cart: {
            carts:{}
          },
          isLoading: false,
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
          //this.$emit('emitCartCount',  vm.cart.carts.length);
          vm.isLoading = false;
        });
      },
      

    },
    created() {
      this.getCart();
      
    },
    
  }  
</script>

<style scoped>

.navbar-brand {
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
}
</style>

