import router from '@/router'
import {getUserInfo} from '@/api/sessionStorage'
import store from '@/store'

const whiteList = ['/login'] // 不重定向白名单
// 进入导航之前
router.beforeEach((to, from, next) => {
  // console.log(to, Crypto.decrypt(getUserInfo().token, 'Nw6thPsMpO5fg'), store.getters)
  // console.log(to, getUserInfo(), store.getters)
  if (getUserInfo() && getUserInfo() !== null && getUserInfo() !== 'null') {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      next()
      store.commit('getLoginInfo', getUserInfo())
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({path: '/login'})
    }
  }
})
