import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import lei from './modules/lei'
import getters from './getters.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    lei
  },
  getters
})
export default store
