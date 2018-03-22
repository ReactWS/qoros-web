import { request, config } from 'utils'

const { api } = config
const { msgboxList, msgbox } = api

export function query (params) {
  return request({
    url: msgboxList,
    method: 'get',
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
      url: msgbox,
      method: 'get',
      data: params,
    })
  }

  export function create (params) {
    return request({
      url: msgbox.replace('/:id', ''),
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
