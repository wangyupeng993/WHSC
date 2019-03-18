import request from '@/utils/request'
const service = {
  // 获取代理商列表
  getAgentAll: (data) => {
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
  freezeBusiness: (data) => {
    return request({
      url: '/smartmerchant/merchant/system/freeze',
      method: 'post',
      data
    })
  },
  unfreezeBusiness: (data) => {
    return request({
      url: '/smartmerchant/merchant/system/unfreeze',
      method: 'post',
      data
    })
  }
}
export default service
