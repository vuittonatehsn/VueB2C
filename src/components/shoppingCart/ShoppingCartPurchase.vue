<template>
    <div>
        <Header></Header>
         <div class="container main-contant py-5">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <h1 class="text-center mb-3 text-secondary">六角血拼 結帳完成</h1>
                    <section class="form-row align-items-center text-center">
                    <div class="col">
                        <div class="alert alert-success alert-rounded mb-0" role="alert">
                        完成
                        </div>
                    </div>
                    </section>

                    <h4 class="text-center my-4">購買資訊</h4>
                    <table class="table table-sm">
                    <thead>
                        <tr>
                        <th width="100"></th>
                        <th>商品名稱</th>
                        <th width="100">數量</th>
                        <th width="80">小計</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td class="align-middle">
                            <img src="https://images.unsplash.com/photo-1494281258937-45f28753affd?w=1350" class="img-fluid img-thumbnail" alt="">
                        </td>
                        <td class="align-middle">金牌西裝</td>
                        <td class="align-middle">1 件</td>
                        <td class="align-middle text-right">$520</td>
                        </tr>
                        <tr>
                        <td colspan="3" class="text-right">運費</td>
                        <td class="text-right">
                            <strong>$60</strong>
                        </td>
                        </tr>
                        <tr>
                        <td colspan="3" class="text-right">合計</td>
                        <td class="text-right">
                            <strong>$580</strong>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    <hr>
                    <h4 class="text-center my-4">個人資料</h4>
                    <table class="table">
                    <tbody>
                        <tr>
                            <th width="100">Email</th>
                            <td>{{ order.user.email }}</td>
                        </tr>
                        <tr>
                            <th>姓名</th>
                            <td>{{ order.user.name }}</td>
                        </tr>
                        <tr>
                            <th>收件人電話</th>
                            <td>{{ order.user.tel }}</td>
                        </tr>
                        <tr>
                            <th>收件人地址</th>
                            <td>{{ order.user.address }}</td>
                        </tr>
                        <tr>
                            <th>付款狀態</th>
                            <td>
                            <span v-if="!order.is_paid">尚未付款</span>
                            <span v-else class="text-success">付款完成</span>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>

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
      order: {
        user: {},
      },
      orderId: '',
    };
  },
  components:{
        Header,
        Footer
  },
  methods: {
    getOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.order = response.data.order;
        console.log(response);
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(url).then((response) => {
        console.log(response);
        if (response.data.success) {
          vm.getOrder();
        }
        vm.isLoading = false;
      });
    },
    
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
    console.log('purchase',this.orderId);
  }
};
</script>