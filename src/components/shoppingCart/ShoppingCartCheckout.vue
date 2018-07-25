<template>
    <div>
        <Header></Header>
        <Loading :active.sync="isLoading"></Loading>
   
        <div class="container main-contant py-5">
            <h1 class="text-center mb-3 text-secondary">軒轅血拼 結帳</h1>
            <section class="form-row align-items-center text-center">
                <div class="col">
                    <div class="alert alert-success alert-rounded mb-0" role="alert">
                    1.輸入訂單資料
                    </div>
                </div>
                <div class="col">
                    <div class="alert alert-light alert-rounded mb-0" role="alert">
                    2.金流付款
                    </div>
                </div>
                <div class="col">
                    <div class="alert alert-light alert-rounded mb-0" role="alert">
                    3.完成
                    </div>
                </div>
            </section>
            <!-- 整個中間的購物訊息 -->
            <section class="row justify-content-center mt-5">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header" id="headingOne">
                            <h6 class="mb-0 d-flex align-items-center">
                            <a data-toggle="collapse" href="#collapseOne">
                                顯示購物車細節
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                            </a>
                            <span class="h3 ml-auto mb-0">${{cart.final_total}}</span>
                            </h6>
                        </div>
                    </div>
                    <div id="collapseOne" class="collapse mt-3">
                        <table class="table table-sm">
                            <thead>
                            <tr>
                                <th width="30"></th>
                                <th width="100"></th>
                                <th>商品名稱</th>
                                <th width="100">數量</th>
                                <th width="80">小計</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in cart.carts" :key="item.id" v-if="cart.carts" >
                                <td class="align-middle text-center">
                                    <button type="button" class="btn btn-outline-danger btn-sm"
                                        @click="removeCartItem(item.id)">
                                        <i class="far fa-trash-alt"></i>
                                    </button>
                                    <!-- <a href="#removeModal" class="text-muted" data-toggle="modal" data-title="刪除 金牌西裝 1 件">
                                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    </a> -->
                                    
                                </td>
                                <td class="align-middle">
                                    <img src="https://images.unsplash.com/photo-1494281258937-45f28753affd?w=1350" class="img-fluid img-thumbnail" alt="">
                                </td>
                                <td class="align-middle">{{item.product.title}}
                                    <div class="text-success" v-if="item.coupon">
                                        已套用優惠券
                                    </div>
                                </td>
                                <td class="align-middle">{{item.qty}} {{item.product.unit}} </td>
                                <td class="align-middle text-right">${{item.final_total}}</td>
                            </tr>
                            <tr>
                                <td colspan="4" class="text-right">運費</td>
                                <td class="text-right">
                                <strong>${{freight}}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4" class="text-right">合計</td>
                                <td class="text-right">
                                    <strong>${{cart.final_total}}</strong>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    
                    </div>
                    <h5 class="py-3 mt-5 mb-2 text-center bg-light">
                        使用優惠碼
                    </h5>
                    <div class="input-group mb-3 input-group-sm">
                        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                            套用優惠碼
                            </button>
                        </div>
                    </div>

                    <!-- 訂購人資訊 -->
                    <h5 class="py-3 mt-5 mb-2 text-center bg-light">
                    訂購人資訊
                    </h5>
                    <form id="needs-validation" @submit.prevent="createOrder" >
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <label for="username">姓名</label>
                            <input type="text" class="form-control" name="name" id="username"
                                :class="{'is-invalid': errors.has('name')}"
                                v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名" 
                                >
                            <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
                            <!-- <div class="invalid-feedback">
                                請輸入姓名
                            </div> -->
                            </div>
                            <div class="form-group col-md-6">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" name="email" id="useremail"
                                v-validate="'required|email'"
                                :class="{'is-invalid': errors.has('email')}"
                                v-model="form.user.email" placeholder="請輸入 Email"
                                >
                            <span class="text-danger" v-if="errors.has('email')">
                                {{ errors.first('email') }}
                            </span>
                            <!-- <div class="invalid-feedback">
                                請輸入正確的 Email
                            </div> -->
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                            <label for="state">國家</label>
                            <select v-model="form.user.country" id="state" name="country" class="form-control" required>
                                <option selected>台灣</option>
                                <option>...</option>
                            </select>
                            </div>
                            <div class="form-group col-md">
                            <label for="city">城市</label>
                            <select v-model="form.user.city" name="city" id="city" class="form-control" required>
                                <option value="基隆市">基隆市</option>
                                <option value="台北市">台北市</option>
                                <option value="台北縣">台北縣</option>
                                <option value="桃園縣">桃園縣</option>
                                <option value="新竹市">新竹市</option>
                                <option value="新竹縣">新竹縣</option>
                                <option value="苗栗縣">苗栗縣</option>
                                <option value="台中市">台中市</option>
                                <option value="台中縣">台中縣</option>
                                <option value="彰化縣">彰化縣</option>
                                <option value="南投縣">南投縣</option>
                                <option value="雲林縣">雲林縣</option>
                                <option value="嘉義市">嘉義市</option>
                                <option value="嘉義縣">嘉義縣</option>
                                <option value="台南市">台南市</option>
                                <option value="台南縣">台南縣</option>
                                <option value="高雄市">高雄市</option>
                                <option value="高雄縣">高雄縣</option>
                                <option value="屏東縣">屏東縣</option>
                                <option value="台東縣">台東縣</option>
                                <option value="花蓮縣">花蓮縣</option>
                                <option value="宜蘭縣">宜蘭縣</option>
                                <option value="澎湖縣">澎湖縣</option>
                                <option value="金門縣">金門縣</option>
                                <option value="連江縣">連江縣</option>
                            </select>
                            </div>
                            <div class="form-group col-md">
                                <label for="inputZip">郵遞區號</label>
                                <input type="text" class="form-control" id="inputZip" name="postalCode"
                                :class="{'is-invalid': errors.has('postalCode')}"
                                v-model="form.user.postalCode" v-validate="'required'"
                                >
                                <span class="text-danger" v-if="errors.has('postalCode')">郵遞區號必須輸入</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="tel">電話</label>
                            <input type="text" class="form-control" id="inputAddress" placeholder="0900-000-000" 
                            name="tel" :class="{'is-invalid': errors.has('tel')}"
                            v-model="form.user.tel" v-validate="'required'">
                            <span class="text-danger" v-if="errors.has('tel')">地址必須輸入</span>

                        </div>
                        <div class="form-group">
                            <label for="inputAddress">地址</label>
                            <input type="text" class="form-control" id="inputAddress" placeholder="重慶南路一段122號" 
                            name="inputAddress" :class="{'is-invalid': errors.has('inputAddress')}"
                            v-model="form.user.inputAddress" v-validate="'required'"
                            >
                            <span class="text-danger" v-if="errors.has('inputAddress')">地址必須輸入</span>
                            <!-- <div class="invalid-feedback">
                            請輸入地址
                            </div> -->
                        </div>
                        <div class="text-right">
                            <a href="shoppingCart.html" class="btn btn-secondary">繼續選購</a>
                            <button type="submit" class="btn btn-primary">確認付款</button>
                            <a href="shoppingCart-purchase.html" class="btn btn-primary">確認付款</a>
                        </div>
                    </form>
                    <!-- <script>
                    // Example starter JavaScript for disabling form submissions if there are invalid fields
                    (function () {
                        'use strict';

                        window.addEventListener('load', function () {
                        var form = document.getElementById('needs-validation');
                        form.addEventListener('submit', function (event) {
                            if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                            }
                            form.classList.add('was-validated');
                        }, false);
                        }, false);
                    })();
                    </script> -->

                </div>
            </section>

        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from './header';
import Footer from './footer';

import $ from 'jquery';
export default {
  data() {
    return {
      cart: {},
      isLoading: false,
      productId: "",
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          postalCode:'',
          city:'',
          country:'',
          inputAddress:''
        },
        message: '',
      },
      coupon_code: '',
      freight: 0,
    };
  },
  components:{
        Header,
        Footer
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data;
        vm.cart.final_total =  vm.cart.final_total + vm.freight;
        console.log('vm.cart', vm.cart);
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(url).then(() => {
        vm.getCart();
        vm.isLoading = false;
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.isLoading = true;
      this.$http.post(url, { data: coupon }).then((response) => {
        //console.log(response);
        vm.getCart();
        vm.isLoading = false;
      });
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      vm.form.user.address = vm.form.user.postalCode + vm.form.user.country + vm.form.user.city + vm.form.user.inputAddress
      const order = vm.form;

      vm.isLoading = true;
      this.$validator.validate().then((result) => {
        if (result) {
            //order.final_total = process.env.FreightFee;
            //console.log(order.final_total);
          this.$http.post(url, { data: order }).then((response) => {
            console.log('訂單已建立', response);
            if (response.data.success) {
              vm.$router.push(`/shoppingCart-purchase/${response.data.orderId}`);
            }
            // vm.getCart();
            //this.$emit('emitGetCart');
            vm.isLoading = false;
          });
        } else {
          console.log('欄位不完整');
        }
      });
    },
    
  },
  created() {
    const vm = this;
    vm.freight = process.env.FreightFee * 1;
    this.getCart();
  }
};
</script>