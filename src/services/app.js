import { request, config } from 'utils'

const { api } = config
const { user, userLogout, userLogin } = api

export function login (params) {
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

export function logout (params) {
  return request({
    url: userLogout,
    method: 'post',
    data: params,
  })
}

export function query (params) {
  return request({
    //url: user.replace('/:id', ''),
    url: user,
    //url: user.replace('/:id', '/author'),
    method: 'get',
    //method: 'post',
    data: params,
  })
}
