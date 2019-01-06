const getters = {
  getToKen: state => state.user.info.token,
  getRoleId: state => state.user.info.roleId,
  getUserId: state => state.user.info.id,
  getUserInfo: state => state.user.info
}
export default getters
