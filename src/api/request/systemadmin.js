import request from '@/utils/request'
const service = {
  // 获取商户列表
  getmemberAll: (data) => {
    return request({
      url: '/smartmerchant/merchant/platform/all',
      method: 'post',
      data
    })
  },
  // 获取角色列表
  getRoleQuery: (data) => {
    return request({
      url: '/smartsystem/system/role/query',
      method: 'post',
      data
    })
  },
  // 解绑商户
  unlockbusiness: (data) => {
    return request({
      url: '/smartmerchant/merchant/update/info',
      method: 'post',
      data
    })
  },
  /* // 搜索商户
  searchbusiness: (data) => {
    return request({
      url: '/smartmerchant/merchant/platform/all',
      method: 'post',
      data
    })
  }, */
  // 获取配置列表
  getConfig: (data) => {
    return request({
      url: '/smartsystem/system/config/getall',
      method: 'post',
      data
    })
  },
  // 保存系统配置
  saveSystemconfig: (data) => {
    return request({
      url: '/smartsystem/system/config/update',
      method: 'post',
      data
    })
  },
  // 获取导航栏列表
  getpermission: (data) => {
    return request({
      url: '/smartsystem/system/permission/query',
      method: 'post',
      data
    })
  },
  // 新增修改权限
  changePermission: (data) => {
    return request({
      url: '/smartsystem/system/permission/add',
      method: 'post',
      data
    })
  },
  // 删除权限
  deletePermission: (data) => {
    return request({
      url: '/smartsystem/system/permission/del',
      method: 'post',
      data
    })
  },
  // 获取角色列表
  getRolelist: (data) => {
    return request({
      url: '/smartsystem/system/role/query',
      method: 'post',
      data
    })
  },
  // 新增修改角色
  changeRole: (data) => {
    return request({
      url: '/smartsystem/system/role/add',
      method: 'post',
      data
    })
  },
  // 删除角色
  deleteRole: (data) => {
    return request({
      url: '/smartsystem/system/role/del',
      method: 'post',
      data
    })
  },
  // 查询角色权限配置
  getRolePermission: (data) => {
    return request({
      url: '/smartsystem/system/rolePermission/query',
      method: 'post',
      data
    })
  },
  // 提交修改权限
  changeRolePermission: (data) => {
    return request({
      url: '/smartsystem/system/rolePermission/add',
      method: 'post',
      data
    })
  }
}
export default service
