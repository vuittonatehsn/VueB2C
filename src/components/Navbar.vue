<template>
<div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
           <a class="nav-link" href="#"  @click.prevent="signout" >Sign out</a>
          <!-- 這會直接倒頁，失敗 -->
          <!-- <router-link to="./HelloWorld" @click="signout" class="nav-link ">
              登出
          </router-link> -->
        </li>
      </ul>
    </nav>
</div>
</template>



<script>
export default {
  name: 'Navbar',
  data(){
    return {
      
    };
  },
  methods:{
    signout(){
      const vm = this;
      //console.log(vm.user)
      this.$http.post(`${process.env.APIPATH}/logout`).then((response) => {
        console.log(response.data)
        if(response.data.success){
          vm.$router.push('/login');
        }
      })
    }
  }
}
</script>