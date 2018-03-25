import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/Layout/index.vue'
import projectManager from '@/pages/project_manager/index.vue'
import projectDetail from '@/pages/project_manager/detail.vue'
import Home from '@/pages/Main_Page/home.vue'
import CustomerList from '@/pages/Main_Page/CustomerManager/CustomerList.vue'
import SeafoodList from '@/pages/Main_Page/RepertoryManager/Seafood/SeafoodList.vue'
import SeafoodTypeList from '@/pages/Main_Page/RepertoryManager/SeafoodType/SeafoodTypeList.vue'
import SellList from '@/pages/Main_Page/SellManager/SellList.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      name: '首页',
      meta: { title: '首页' },
      children: [
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
        },
        {
          path: 'projectList',
          name: 'projectList',
          component: projectManager,
          meta: { title: '项目列表', icon: 'table' },
          props: { cata_id: 1 }
        },
        {
          path: 'detail',
          name: 'detail',
          component: projectDetail,
          meta: { title: '项目详情', icon: 'table' },
          props: { cata_id: 1 }
        }
      ]
    },
    { path: '*', redirect: '/404' }
  ]
})
