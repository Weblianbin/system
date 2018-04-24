// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入第三方图标
import 'font-awesome/css/font-awesome.css'
// 导入公用样式
import './style/reset.css'
import './style/common.css'
// 全国三级联动
// import VueAreaLinkage from 'vue-area-linkage'
// import 'vue-area-linkage/dist/index.css'
import Highcharts from 'highcharts'
Vue.use(Highcharts)
// Vue.use(VueAreaLinkage)
// 要在use上面import进来
Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
