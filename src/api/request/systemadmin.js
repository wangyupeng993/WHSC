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
  // 搜索商户
  searchbusiness: (data) => {
    return request({
      url: '/smartmerchant/merchant/platform/all',
      method: 'post',
      data
    })
  }
}
export default service
