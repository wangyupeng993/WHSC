import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }, {
    path: '/',
    component: Layout,
    redirect: 'News',
    meta: {title: '新闻管理'},
    children: [{
      path: '',
      name: 'Sort',
      component: () => import('@/views/News/sort'),
      meta: {title: '分类管理'}
    }, {
      path: 'article',
      name: 'Article',
      component: () => import('@/views/News/article'),
      meta: {title: '文章管理'}
    }]
  }, {
    path: '/404',
    component: () => import('@/views/404/index'),
    hidden: true
  }, {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
