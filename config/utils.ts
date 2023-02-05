import { getCookie, hasCookie } from 'cookies-next'

export const isCookie = () => {
  if (hasCookie('cookie')) {
    return getCookie('cookie')
  }
  return false
}

export const isAdmin = () => {
  if (hasCookie('admin_token')) {
    return getCookie('admin_token')
  }
  return false
}

export const adminToken = () => {
  if (hasCookie('admin_token')) {
    const admin_token = getCookie('admin_token')
    return admin_token
  }
  return ''
}

export const getCandle = () => {
  if (hasCookie('candle')) {
    const candle = getCookie('candle')
    return candle
  }
  return 'false'
}
