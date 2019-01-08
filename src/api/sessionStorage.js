export function setStorage (name, value) {
  window.sessionStorage.setItem(name, JSON.stringify(value))
}

export function getUserInfo () {
  return JSON.parse(window.sessionStorage.getItem('userinfo'))
}

export function removeStorage (naem) {
  window.sessionStorage.removeItem(naem)
}
