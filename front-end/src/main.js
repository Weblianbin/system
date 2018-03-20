// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入element-ui组件库
import ElementUI from 'element-ui'
// 导入样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入第三方图标
import 'font-awesome/css/font-awesome.css'
// 导入公用样式
import './style/reset.css'
import './style/common.css'
Vue.config.productionTip = false
Vue.use(ElementUI)

// 把主机接口定义为全局变量
global.ApiUrl = 'http://localhost:3000'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
