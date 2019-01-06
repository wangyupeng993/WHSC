import request from '@/utils/request'

const service = {
  getbase64: () => {
    return request({
      url: '/flyCmsSystem/admin/getValidCode',
      method: 'post'
    })
  },
  login: (data) => {
    return request({
      url: '/flyCmsSystem/admin/login',
      method: 'post',
      data
    })
  }
}

export default service
