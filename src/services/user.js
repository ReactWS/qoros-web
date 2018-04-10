import { request, config } from 'utils'

const { api } = config
const { user, userSelect, userAdd, userUpdate } = api

export function query (params) {
  return request({
    url: userSelect,
    method: 'post',
    data: params,
  })
}

export function create (params) {
  return request({
    url: userAdd,
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: user,
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: userUpdate,
    method: 'patch',
    data: params,
  })
}
