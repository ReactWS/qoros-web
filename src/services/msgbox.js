import { request, config } from 'utils'

const { api } = config
const { msgboxList, msgbox, msgboxSelect,msgboxUser2Vin} = api

export function query (params) {
  return request({
    url: msgboxList,
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: msgboxList,
    method: 'delete',
    data: params,
  })
}

  export function query2 (params) {
    return request({
      url: msgboxSelect,
      method: 'post',
      data: params,
    })
  }

  export function create (params) {
    return request({
      url: msgboxAdd,
      method: 'post',
      data: params,
    })
  }

  export function remove2 (params) {
    return request({
      url: msgbox,
      method: 'delete',
      data: params,
    })
  }

  export function update (params) {
    return request({
      url: msgbox,
      method: 'patch',
      data: params,
    })
}

export function user2vin (params) {
  return request({
    url: msgboxUser2Vin,
    method: 'get',
    data: params,
  })
}
