import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/pages/Products'
import Coupons from '@/components/pages/Coupons';
import Orders from '@/components/pages/Orders';
import CustomerOrder from '@/components/pages/CustomerOrders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';

import shoppingCart from '@/components/ShoppingCart';
import ShoppingCartCheckout from '@/components/shoppingCart/ShoppingCartCheckout';
import ProductDetail from '@/components/shoppingCart/ProductDetail';
import ShoppingCartPurchase from '@/components/shoppingCart/ShoppingCartPurchase';

import City from '@/components/shoppingCart/City'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '*',
      redirect:'login'
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   //meta:{requiresAuth:true}
    // },
    {
      path: '/shoppingCart',
      name: 'ShoppingCart',
      component: shoppingCart,
    },
    {
      path: '/shoppingCart-checkout',
      name: 'ShoppingCartCheckout',
      component: ShoppingCartCheckout,
    },
    {
      path: '/product-detail/:productId',
      name: 'ProductDetail',
      component: ProductDetail,
    },
    {
      path: '/shoppingCart-purchase/:orderId',
      name: 'ShoppingCartPurchase',
      component: ShoppingCartPurchase,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        }
      ]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,          
      children: [
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout
        }
      ]
    },
    
  ]
})
