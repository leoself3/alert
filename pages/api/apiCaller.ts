import axios from 'axios'

import { adminToken } from '../../config/utils'
import { BASE_URL } from '../../config'

export const login = (password: string) => {
  return axios.post(`${BASE_URL}/admin/login`, { password })
}

export const getDeadPeople = (search = '', page = 1, size = 10) => {
  return axios.get(
    `${BASE_URL}/deadpeople?search=${search}&page=${page}&size=${size}`
  )
}

export const getCandles = () => {
  return axios.get(`${BASE_URL}/candles`)
}

export const updateCandle = (urlname: string, candle: number) => {
  return axios.put(`${BASE_URL}/candles${urlname}`, { candle })
}

export const getDeadPerson = (urlname: string) => {
  return axios.get(`${BASE_URL}/deadpeople/${urlname}`)
}

export const addDeadPerson = (formData: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${adminToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  }
  return axios.post(`${BASE_URL}/deadpeople`, formData, config)
}

export const updateDeadPerson = (formData: any, urlname: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${adminToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  }
  return axios.put(`${BASE_URL}/deadpeople/${urlname}`, formData, config)
}

export const deleteDeadPerson = (urlname: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${adminToken()}`,
    },
  }
  return axios.delete(`${BASE_URL}/deadpeople/${urlname}`, config)
}

export const getNewsList = (search = '', page = 1) => {
  return axios.get(`${BASE_URL}/news?search=${search}&page=${page}`)
}

export const getNews = (id: number) => {
  return axios.get(`${BASE_URL}/news/${id}`)
}

export const addNews = (formData: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${adminToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  }
  return axios.post(`${BASE_URL}/news`, formData, config)
}

export const updateNews = (formData: any, id: number) => {
  const config = {
    headers: {
      Authorization: `Bearer ${adminToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  }
  return axios.put(`${BASE_URL}/news/${id}`, formData, config)
}

export const deleteNews = (id: number) => {
  const config = {
    headers: {
      Authorization: `Bearer ${adminToken()}`,
    },
  }
  return axios.delete(`${BASE_URL}/news/${id}`, config)
}

export const deleteComment = (id: number) => {
  const config = {
    headers: {
      Authorization: `Bearer ${adminToken()}`,
    },
  }
  return axios.delete(`${BASE_URL}/comments/${id}`, config)
}

export const getCommentsByNews = (id: string) => {
  return axios.get(`${BASE_URL}/comments/article/${id}`)
}

export const addCommentOnNews = (
  newsId: number,
  name: string,
  content: string
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  return axios.post(
    `${BASE_URL}/comments`,
    { articleId: newsId, username: name, content },
    config
  )
}

export const getCommentsByDead = (id: number) => {
  return axios.get(`${BASE_URL}/comments/dead/${id}`)
}

export const addCommentOnDead = (
  deadPeopleId: number,
  name: string,
  content: string
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  return axios.post(
    `${BASE_URL}/comments`,
    { deadPeopleId: deadPeopleId, username: name, content },
    config
  )
}
