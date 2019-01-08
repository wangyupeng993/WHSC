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
  },
  getArticleall: (data) => {
    return request({
      url: '/flyCmsNews/article/admin/queryArticle',
      method: 'post',
      data
    })
  },
  getSortquery (data) {
    return request({
      url: '/flyCmsNews/articleCategory/admin/query',
      method: 'post',
      data
    })
  }
}

export default service
