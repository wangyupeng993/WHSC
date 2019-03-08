import request from '@/utils/request'

const service = {
  getbase64: () => {
    return request({
      url: '/smartmerchant/merchant/getValidCode',
      method: 'post'
    })
  },
  login: (data) => {
    return request({
      url: '/smartmerchant/merchant/login',
      method: 'post',
      data
    })
  }
}

export default service
