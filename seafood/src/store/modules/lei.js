// import { login, userLogin } from '../../api/auth'
// import { setUserInfo, clearUserInfo } from '../../utils/auth.js'
const lei = {
  state: {
    lei: ''
  },
  mutations: {
    SET_LEI: (state, data) => {
      state.lei = data
    }
  },
  actions: {
    Lei ({dispatch, commit}, data) {
      commit('SET_LEI', data)
    }
  }
}

export default lei
