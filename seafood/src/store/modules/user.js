import { login } from '../../api/auth'
import { setUserInfo } from '../../utils/auth.js'
const user = {
  state: {
    account: '',
    user_id: ''
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      console.log('userInfo', userInfo)
      state.account = userInfo.account
      state.user_id = userInfo._id
      console.log('mutations--', state)
    }
  },
  actions: {
    // 登录
    async Login ({dispatch, commit}, userInfo) {
      try {
        var res = await login({
          'user': userInfo
        })
        var data = res.data.dataObj[0]
        console.log('store中', res)
        console.log('data', data)
        // 把用户信息存入store
        commit('SET_USER_INFO', data)
        // 把信息存入localStorage中
        await setUserInfo(data)
        return Promise.resolve(res)
      } catch (e) {
        console.log('e', e)
        return Promise.reject(e)
      }
    },
    // 获取用户信息
    async GetInfo ({commit, state}) {
      try {
        console.log('获取信息')
      } catch (ex) {
        console.log('ex', ex)
        return Promise.reject(ex)
      }
    }
  }
}

export default user
