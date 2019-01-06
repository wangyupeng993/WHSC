export function getUserInfo () {
  return JSON.parse(window.sessionStorage.getItem('userinfo'))
}
