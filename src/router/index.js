import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/page/notFound'
import Index from '@/page/index'
import Cart from '@/page/cartList/cartList'
import Address from '@/page/address/address'
import OrderConfirm from '@/page/orderConfirm/'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'GoodList',
      component: Index
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/address',
      name: 'Address',
      component: Address,
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm,
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    },
  ]
})
