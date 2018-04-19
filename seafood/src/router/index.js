import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Manager/Login/index.vue'
import Register from '@/pages/Manager/Register/index.vue'
import ManagerDetail from '@/pages/Manager/managerDetail.vue'
import Layout from '@/pages/Layout/index.vue'
import Home from '@/pages/Main_Page/Home/home.vue'
import HomeIndex from '@/pages/Main_Page/Home/Main/index.vue'
import SeafoodType from '@/pages/Main_Page/Home/Main/seafoodType.vue'
import Seafood from '@/pages/Main_Page/Home/Main/seafood.vue'
import Life from '@/pages/Main_Page/Home/Main/life.vue'
import Circle from '@/pages/Main_Page/Home/Main/circle.vue'
import About from '@/pages/Main_Page/Home/Main/about.vue'
import CustomerList from '@/pages/Main_Page/CustomerManager/CustomerList.vue'
import SeafoodList from '@/pages/Main_Page/RepertoryManager/Seafood/SeafoodList.vue'
import SeafoodTypeList from '@/pages/Main_Page/RepertoryManager/SeafoodType/SeafoodTypeList.vue'
import SellList from '@/pages/Main_Page/SellManager/SellList.vue'
import LifeList from '@/pages/Main_Page/LifeManager/LifeList.vue'
import CircleList from '@/pages/Main_Page/CircleManager/CircleList.vue'
import { getUserInfo } from '@/utils/auth'
// console.log(store)
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { title: 'Home' },
      children: [
        {
          path: '',
          component: HomeIndex
        },
        {
          path: '/seafoodType',
          component: SeafoodType
        },
        {
          path: '/seafood',
          component: Seafood
        },
        {
          path: '/life',
          component: Life
        },
        {
          path: '/circle',
          component: Circle
        },
        {
          path: '/about',
          component: About
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      component: Layout,
      name: '后台主界面',
      meta: { title: '后台主界面' },
      children: [
        {
          path: '/',
          redirect: '/customerList'
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
          meta: { title: '海鲜名称列表' }
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
          path: 'lifeList',
          name: 'LifeList',
          component: LifeList,
          meta: { title: '精致生活文章列表' }
        },
        {
          path: 'circleList',
          name: 'CircleList',
          component: CircleList,
          meta: { title: '海鲜圈文章列表' }
        },
        {
          path: 'managerDetail',
          name: 'ManagerDetail',
          component: ManagerDetail,
          meta: { title: '管理员信息' }
        }
      ]
    },
    { path: '*', redirect: '/404' }
  ]
})
// 路由守卫
// 当登陆时,把用户信息存入本地,登出时,移除
const whiteList = ['/login', '/register']// no redirect whitelist
router.beforeEach((to, from, next) => {
  // 有token的情况直接已登录状态
  let userInfo = getUserInfo()
  if (userInfo) {
    if (to.path === '/login' || to.path === '/register') {
      next({ path: '/customerList' })
    } else {
      // 当准备跳到首页的时候,还会再经过路由守卫,再走一次
      next()
    }
  } else {
    // 没有重定向到登录页
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      console.log('next')
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})
export default router
