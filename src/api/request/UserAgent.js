import request from '@/utils/request'
const service = {
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
  }
}
export default service
