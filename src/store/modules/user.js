import {getUserInfo} from '@/utils/auth'

const uesr = {
  state: {
    info: getUserInfo()
  },
  mutations: {},
  actions: {
    getLoginInfo (state, value) {}
  }
}
export default uesr
