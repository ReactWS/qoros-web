const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

let msgdata = Mock.mock({
  'data|90-100': [
    {
      id: '@id',
      msgSendRegesId: 2211630184,
      'msgType|0-3':0 ,
      msgCreateTime: '@datetime',
      msgSendMsgContent: '@cparagraph',
      msgAuditingUserName: '@cname',
      msgSendUserName: '@cname',
      'msgUserName|1': [[18051],[18052],[18053],[18054],[18055]],
      //'msgUserName|1': [18051,18052,18053,18054,18055,18094],
      msgSendTime: '@datetime',
      msgCreateUserName: '@cname',
      msgAuditingTime: '@datetime',
      //'msgVIN|1': [[LLNC6ADB4HA006807],[LLNC6ADB4HA006808],[LLNC6ADB4HA006809],[LLNC6ADB4HA006801],[LLNC6ADB4HA006803],[LLNC6ADB4HA006805]],
      'msgVIN|1': ['LLNC6ADB4HA006807','LLNC6ADB4HA006808','LLNC6ADB4HA006809','LLNC6ADB4HA006801','LLNC6ADB4HA006803','LLNC6ADB4HA006805'],
      msgSendMsgTitle: '@ctitle'
    }
  ],
})

let database = msgdata.data

module.exports = {

  [`GET ${apiPrefix}/msgbox/lists`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {//其他条件查询

              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'msgCreateTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },

  [`DELETE ${apiPrefix}/msgbox/lists`] (req, res) {
    const { ids } = req.body
    database = database.filter(item => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },


  [`POST ${apiPrefix}/msgbox`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))
    newData.id = Mock.mock('@id')

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${apiPrefix}/msgbox/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${apiPrefix}/msgbox/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter(item => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${apiPrefix}/msgbox/:id`] (req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    database = database.map((item) => {
      if (item.id === id) {
        isExist = true
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },


}
