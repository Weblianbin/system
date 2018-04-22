import { login, userLogin } from '../../api/auth'
import { setUserInfo, clearUserInfo } from '../../utils/auth.js'
const user = {
  state: {
    account: '',
    user_id: '',
    radio: ''
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      if (userInfo) {
        state.account = userInfo.account
        state.user_id = userInfo._id
      } else {
        state.account = ''
        state.user_id = ''
      }
    },
    SET_USERU_INFO: (state, userInfo) => {
      if (userInfo) {
        state.account = userInfo.account
        state.radio = userInfo.radio
        state.phone = userInfo.phone
        state.email = userInfo.email
        state.user_id = userInfo._id
      } else {
        state.account = ''
        state.radio = ''
        state.phone = ''
        state.email = ''
        state.user_id = ''
      }
    }
  },
  actions: {
    // 登录
    async Login ({dispatch, commit}, userInfo) {
      try {
        var res = await login({
          'user': userInfo
        })
        if (res.data.code === '1111') {
          var data = res.data.dataObj[0]
          // 把用户信息存入store
          commit('SET_USER_INFO', data)
          // 把信息存入localStorage中
          await setUserInfo(data)
        }
        return Promise.resolve(res)
      } catch (e) {
        console.log('e', e)
        return Promise.reject(e)
      }
    },
    // 用户登录
    async userLogin ({dispatch, commit}, userInfo) {
      try {
        var res = await userLogin({
          'user': userInfo
        })
        if (res.data.code === '1111') {
          var data = res.data.dataObj[0]
          // 把用户信息存入store
          commit('SET_USER_INFO', data)
          // 把信息存入localStorage中
          await setUserInfo(data)
        }
        return Promise.resolve(res)
      } catch (e) {
        console.log('e', e)
        return Promise.reject(e)
      }
    },
    // 登出
    async loginOut ({dispatch, commit}) {
      try {
        await clearUserInfo()
        commit('SET_USER_INFO', null)
      } catch (error) {
        console.log('error', error)
      }
    },
    // 获取用户信息
    async getUserInfo ({dispatch, commit}, data) {
      try {
        commit('SET_USER_INFO', data)
        // 把信息存入localStorage中
        await clearUserInfo()
        await setUserInfo(data)
      } catch (error) {
        console.log('error', error)
      }
    }
  }
}

export default user
