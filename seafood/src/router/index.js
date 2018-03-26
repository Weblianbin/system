import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/User/Login/index.vue'
import Register from '@/pages/User/Register/index.vue'
import Layout from '@/pages/Layout/index.vue'
import Home from '@/pages/Main_Page/home.vue'
import CustomerList from '@/pages/Main_Page/CustomerManager/CustomerList.vue'
import SeafoodList from '@/pages/Main_Page/RepertoryManager/Seafood/SeafoodList.vue'
import SeafoodTypeList from '@/pages/Main_Page/RepertoryManager/SeafoodType/SeafoodTypeList.vue'
import SellList from '@/pages/Main_Page/SellManager/SellList.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/',
      component: Layout,
      name: '首页',
      meta: { title: '首页' },
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'Home',
          component: Home,
          meta: { title: 'Home' }
        },
        {
          path: 'customerList',
          name: 'CustomerList',
          component: CustomerList,
          meta: { title: '客户信息列表' }
        },
        {
          path: 'seafoodList',
          name: 'SeafoodList',
          component: SeafoodList,
          meta: { title: '海鲜列表' }
        },
        {
          path: 'seafoodTypeList',
          name: 'SeafoodTypeList',
          component: SeafoodTypeList,
          meta: { title: '海鲜种类列表' }
        },
        {
          path: 'sellList',
          name: 'SellList',
          component: SellList,
          meta: { title: '海鲜销售列表' }
        }
      ]
    },
    { path: '*', redirect: '/404' }
  ]
})
