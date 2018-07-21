// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCoffee, faSpinner,faAsterisk)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('Loading', Loading)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to, from, next)=>{
  console.log('to', to, 'from', from, 'next', next)
  if(to.meta.requiresAuth){
    console.log('這裡需要驗證');
    axios.post(`${process.env.APIPATH}/api/user/check`)
    .then((response) => {
      console.log(response.data)
      if(response.data.success){
        console.log('驗證成功');
        next();
      }else{
        next({
            path:'/login'
        });
      }
    })
  }else{
    next();
  }
})
