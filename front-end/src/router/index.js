import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login/index'
import Register from '@/components/Register/index'
// 客户信息管理
import addCustomer from '@/components/Main_children/CustomerManager/addCustomer'
import customerList from '@/components/Main_children/CustomerManager/customerList'
// 库存管理
import addSeafood from '@/components/Main_children/RepertoryManager/seafood/addSeafood'
import seafoodList from '@/components/Main_children/RepertoryManager/seafood/seafoodList'
import addSeafoodType from '@/components/Main_children/RepertoryManager/seafoodType/addSeafoodType'
import seafoodTypeList from '@/components/Main_children/RepertoryManager/seafoodType/seafoodTypeList'
// 销售管理
import addSell from '@/components/Main_children/sellManager/addSell'
import sellList from '@/components/Main_children/sellManager/sellList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          component: customerList
        },
        // 客户管理
        {
          path: '/addCustomer',
          component: addCustomer
        },
        {
          path: '/customerList',
          component: customerList
        },
        // 库存管理
        {
          path: '/addSeafood',
          component: addSeafood
        },
        {
          path: '/seafoodList',
          component: seafoodList
        },
        {
          path: '/addSeafoodType',
          component: addSeafoodType
        },
        {
          path: '/seafoodTypeList',
          component: seafoodTypeList
        },
        // 销售管理
        {
          path: '/addSell',
          component: addSell
        },
        {
          path: '/sellList',
          component: sellList
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ]
})
