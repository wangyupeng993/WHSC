import {getUserInfo} from '@/api/sessionStorage'

const uesr = {
  state: {
    info: getUserInfo()
  },
  mutations: {
    getLoginInfo (state, value) {
      state.info = value
    }
  },
  actions: {
    getLoginInfo (store, value) {
      console.log(value)
      store.commit('getUserInfo', value)
    }
  }
}
export default uesr
