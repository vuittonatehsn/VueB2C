<template>
<div>
    <Navbar></Navbar>
    <AlertMessage></AlertMessage>
    <div class="container-fluid">
      <div class="row">
      <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
         <router-view></router-view>
        </main>
      </div>
    </div>
</div>
</template>



<script>
    import Sidebar from './Sidebar';
    import Navbar from './Navbar';
    import AlertMessage from './AlertMessage';

export default {

    components:{
        Sidebar,
        Navbar,
        AlertMessage
    },
    name: 'Login',
    data(){
        return {
        
        };
    },
    methods:{
        signin(){
            const vm = this;
            this.$http.post(`${process.env.APIPATH}/signin`, vm.user).then((response) => {
                console.log(response.data)
                if(response.data.success){
                vm.$router.push('/admin');
                }
            })
        }
    }
}
</script>