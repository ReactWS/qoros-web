import { request, config } from 'utils'

const { api } = config
const { apkList, apkAdd, apkDelete, apkUpdate} = api

export function query (params) {
  return request({
    url: apkList,
    method: 'post',
    data: params,
  })
}
export function create (params) {
    return request({
      url: apkAdd,
      method: 'post',
      data: params,
    })
  }

export function remove (params) {
    return request({
      url: apkDelete,
      method: 'post',
      data: params,
    })
  }

export function update (params) {
    return request({
      url: apkUpdate,
      method: 'post',
      data: params,
    })
}
