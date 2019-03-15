export function parseTime (date, times, splicing) {
  const now = new Date(date)
  const y = now.getFullYear()
  const m = now.getMonth() + 1
  const d = now.getDate()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  return splicing ? y + splicing + (m < 0 ? '0' + m : m) + splicing + (d < 10 ? '0' + d : d) + ' ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) : y + '年' + (m < 0 ? '0' + m : m) + '月' + (d < 10 ? '0' + d : d) + '日' + ' ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes)
}
export function getRoleName (data, id, array) {
  if (array && array.length > 0) {
    return array.filter(item => item.id === Number(id))[0].name
  } else {
    return data
  }
}
