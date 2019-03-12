import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [{
  path: '',
  redirect: '/SystemAdmin/member'
}, {
  path: '/SystemAdmin',
  component: Layout,
  meta: {title: '系统管理', icon: 'fab fa-windows'},
  children: [{
    path: 'member',
    name: 'Menber',
    component: () => import('@/views/SystemAdmin/Member/index'),
    meta: {title: '会员管理', icon: 'fas fa-users-cog'}
  }, {
    path: 'role',
    name: 'Role',
    component: () => import('@/views/SystemAdmin/role/index'),
    meta: {title: '角色管理', icon: 'fas fa-user-tag'}
  }, {
    path: 'configure',
    name: 'Configure',
    component: () => import('@/views/SystemAdmin/configure/index'),
    meta: {title: '配置管理', icon: 'fas fa-cog'}
  }, {
    path: 'powerlimit',
    name: 'PowerLimit',
    component: () => import('@/views/SystemAdmin/PowerLimit/index'),
    meta: {title: '权限管理', icon: 'fas fa-sitemap'}
  }]
}, {
  path: '/UserAgent',
  component: Layout,
  meta: {title: '用户代理', icon: 'fas fa-users'},
  children: [{
    path: 'business',
    name: 'Business',
    component: () => import('@/views/UserAgent/Business/index'),
    meta: {title: '新增商户或代理', icon: 'fas fa-home'}
  }, {
    path: 'agentlist',
    name: 'AgentList',
    component: () => import('@/views/UserAgent/AgentList/index'),
    meta: {title: '商户代理列表', icon: 'fas fa-list-ul'}
  }, {
    path: 'reviewbusiness',
    name: 'ReviewBusiness',
    component: () => import('@/views/UserAgent/ReviewBusiness/index'),
    meta: {title: '审核商户或代理', icon: 'fas fa-file-signature'}
  }]
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
}
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
