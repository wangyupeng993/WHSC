export function setStorage (name, value) {
  window.sessionStorage.setItem(name, JSON.stringify(value))
}
