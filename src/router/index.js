import Vue from 'vue'
import Router from 'vue-router'
// import Layout from '@/views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [{
  path: '',
  redirect: '/login'
}, {
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
}, {
  path: '/404',
  component: () => import('@/views/404/index'),
  hidden: true
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
