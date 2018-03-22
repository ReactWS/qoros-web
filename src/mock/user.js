const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

let usersListData = Mock.mock({
  'data|90-100': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
      avatar () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1))
      },
    },
  ],
})

// let usersListData = Mock.mock({
//   "list": [
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386520000,
//             "msgSendMsgContent": "内容2",
//             "msgSendUserID": "zhao2",
//             "msgAuditingUserName": "赵2",
//             "msgSendUserName": "赵2",
//             "msgUserName": "张2",
//             "msgSendTime": 1520386520000,
//             "msgCreateUserName": "赵2",
//             "msgCreateUserID": "zhao2",
//             "msgAuditingTime": 1520386520000,
//             "msgSendStatus": 1,
//             "ID": 2,
//             "msgUserId": "zhang2",
//             "msgAuditingUserID": "zhao2",
//             "msgSendMsgSummary": "简介2",
//             "msgVIN": "LLNT6AFN2HAEX0283",
//             "msgSendMsgTitle": "标题2"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386520000,
//             "msgSendMsgContent": "内容3",
//             "msgSendUserID": "zhao3",
//             "msgAuditingUserName": "赵3",
//             "msgSendUserName": "赵3",
//             "msgUserName": "张3",
//             "msgSendTime": 1520386520000,
//             "msgCreateUserName": "赵3",
//             "msgCreateUserID": "zhao3",
//             "msgAuditingTime": 1520386520000,
//             "msgSendStatus": 1,
//             "ID": 3,
//             "msgUserId": "zhang3",
//             "msgAuditingUserID": "zhao3",
//             "msgSendMsgSummary": "简介3",
//             "msgVIN": "LLNT6AFN2HAEX0383",
//             "msgSendMsgTitle": "标题3"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386520000,
//             "msgSendMsgContent": "内容4",
//             "msgSendUserID": "zhao4",
//             "msgAuditingUserName": "赵4",
//             "msgSendUserName": "赵4",
//             "msgUserName": "张4",
//             "msgSendTime": 1520386520000,
//             "msgCreateUserName": "赵4",
//             "msgCreateUserID": "zhao4",
//             "msgAuditingTime": 1520386520000,
//             "msgSendStatus": 1,
//             "ID": 4,
//             "msgUserId": "zhang4",
//             "msgAuditingUserID": "zhao4",
//             "msgSendMsgSummary": "简介4",
//             "msgVIN": "LLNT6AFN2HAEX0483",
//             "msgSendMsgTitle": "标题4"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386520000,
//             "msgSendMsgContent": "内容5",
//             "msgSendUserID": "zhao5",
//             "msgAuditingUserName": "赵5",
//             "msgSendUserName": "赵5",
//             "msgUserName": "张5",
//             "msgSendTime": 1520386520000,
//             "msgCreateUserName": "赵5",
//             "msgCreateUserID": "zhao5",
//             "msgAuditingTime": 1520386520000,
//             "msgSendStatus": 1,
//             "ID": 5,
//             "msgUserId": "zhang5",
//             "msgAuditingUserID": "zhao5",
//             "msgSendMsgSummary": "简介5",
//             "msgVIN": "LLNT6AFN2HAEX0583",
//             "msgSendMsgTitle": "标题5"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386520000,
//             "msgSendMsgContent": "内容6",
//             "msgSendUserID": "zhao6",
//             "msgAuditingUserName": "赵6",
//             "msgSendUserName": "赵6",
//             "msgUserName": "张6",
//             "msgSendTime": 1520386520000,
//             "msgCreateUserName": "赵6",
//             "msgCreateUserID": "zhao6",
//             "msgAuditingTime": 1520386520000,
//             "msgSendStatus": 1,
//             "ID": 6,
//             "msgUserId": "zhang6",
//             "msgAuditingUserID": "zhao6",
//             "msgSendMsgSummary": "简介6",
//             "msgVIN": "LLNT6AFN2HAEX0683",
//             "msgSendMsgTitle": "标题6"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容7",
//             "msgSendUserID": "zhao7",
//             "msgAuditingUserName": "赵7",
//             "msgSendUserName": "赵7",
//             "msgUserName": "张7",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵7",
//             "msgCreateUserID": "zhao7",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 7,
//             "msgUserId": "zhang7",
//             "msgAuditingUserID": "zhao7",
//             "msgSendMsgSummary": "简介7",
//             "msgVIN": "LLNT6AFN2HAEX0783",
//             "msgSendMsgTitle": "标题7"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容8",
//             "msgSendUserID": "zhao8",
//             "msgAuditingUserName": "赵8",
//             "msgSendUserName": "赵8",
//             "msgUserName": "张8",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵8",
//             "msgCreateUserID": "zhao8",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 8,
//             "msgUserId": "zhang8",
//             "msgAuditingUserID": "zhao8",
//             "msgSendMsgSummary": "简介8",
//             "msgVIN": "LLNT6AFN2HAEX0883",
//             "msgSendMsgTitle": "标题8"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容9",
//             "msgSendUserID": "zhao9",
//             "msgAuditingUserName": "赵9",
//             "msgSendUserName": "赵9",
//             "msgUserName": "张9",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵9",
//             "msgCreateUserID": "zhao9",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 9,
//             "msgUserId": "zhang9",
//             "msgAuditingUserID": "zhao9",
//             "msgSendMsgSummary": "简介9",
//             "msgVIN": "LLNT6AFN2HAEX0983",
//             "msgSendMsgTitle": "标题9"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容q",
//             "msgSendUserID": "zhaoq",
//             "msgAuditingUserName": "赵q",
//             "msgSendUserName": "赵q",
//             "msgUserName": "张q",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵q",
//             "msgCreateUserID": "zhaoq",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 10,
//             "msgUserId": "zhangq",
//             "msgAuditingUserID": "zhaoq",
//             "msgSendMsgSummary": "简介q",
//             "msgVIN": "LLNT6AFN2HAEX0q83",
//             "msgSendMsgTitle": "标题q"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容q",
//             "msgSendUserID": "zhaoq",
//             "msgAuditingUserName": "赵q",
//             "msgSendUserName": "赵q",
//             "msgUserName": "张q",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵q",
//             "msgCreateUserID": "zhaoq",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 10,
//             "msgUserId": "zhangq",
//             "msgAuditingUserID": "zhaoq",
//             "msgSendMsgSummary": "简介q",
//             "msgVIN": "LLNT6AFN2HAEX0q83",
//             "msgSendMsgTitle": "标题q"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容q",
//             "msgSendUserID": "zhaoq",
//             "msgAuditingUserName": "赵q",
//             "msgSendUserName": "赵q",
//             "msgUserName": "张q",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵q",
//             "msgCreateUserID": "zhaoq",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 10,
//             "msgUserId": "zhangq",
//             "msgAuditingUserID": "zhaoq",
//             "msgSendMsgSummary": "简介q",
//             "msgVIN": "LLNT6AFN2HAEX0q83",
//             "msgSendMsgTitle": "标题q"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容q",
//             "msgSendUserID": "zhaoq",
//             "msgAuditingUserName": "赵q",
//             "msgSendUserName": "赵q",
//             "msgUserName": "张q",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵q",
//             "msgCreateUserID": "zhaoq",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 10,
//             "msgUserId": "zhangq",
//             "msgAuditingUserID": "zhaoq",
//             "msgSendMsgSummary": "简介q",
//             "msgVIN": "LLNT6AFN2HAEX0q83",
//             "msgSendMsgTitle": "标题q"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容q",
//             "msgSendUserID": "zhaoq",
//             "msgAuditingUserName": "赵q",
//             "msgSendUserName": "赵q",
//             "msgUserName": "张q",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵q",
//             "msgCreateUserID": "zhaoq",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 10,
//             "msgUserId": "zhangq",
//             "msgAuditingUserID": "zhaoq",
//             "msgSendMsgSummary": "简介q",
//             "msgVIN": "LLNT6AFN2HAEX0q83",
//             "msgSendMsgTitle": "标题q"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容q",
//             "msgSendUserID": "zhaoq",
//             "msgAuditingUserName": "赵q",
//             "msgSendUserName": "赵q",
//             "msgUserName": "张q",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵q",
//             "msgCreateUserID": "zhaoq",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 10,
//             "msgUserId": "zhangq",
//             "msgAuditingUserID": "zhaoq",
//             "msgSendMsgSummary": "简介q",
//             "msgVIN": "LLNT6AFN2HAEX0q83",
//             "msgSendMsgTitle": "标题q"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容q",
//             "msgSendUserID": "zhaoq",
//             "msgAuditingUserName": "赵q",
//             "msgSendUserName": "赵q",
//             "msgUserName": "张q",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵q",
//             "msgCreateUserID": "zhaoq",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 10,
//             "msgUserId": "zhangq",
//             "msgAuditingUserID": "zhaoq",
//             "msgSendMsgSummary": "简介q",
//             "msgVIN": "LLNT6AFN2HAEX0q83",
//             "msgSendMsgTitle": "标题q"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容q",
//             "msgSendUserID": "zhaoq",
//             "msgAuditingUserName": "赵q",
//             "msgSendUserName": "赵q",
//             "msgUserName": "张q",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵q",
//             "msgCreateUserID": "zhaoq",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 10,
//             "msgUserId": "zhangq",
//             "msgAuditingUserID": "zhaoq",
//             "msgSendMsgSummary": "简介q",
//             "msgVIN": "LLNT6AFN2HAEX0q83",
//             "msgSendMsgTitle": "标题q"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容q",
//             "msgSendUserID": "zhaoq",
//             "msgAuditingUserName": "赵q",
//             "msgSendUserName": "赵q",
//             "msgUserName": "张q",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵q",
//             "msgCreateUserID": "zhaoq",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 10,
//             "msgUserId": "zhangq",
//             "msgAuditingUserID": "zhaoq",
//             "msgSendMsgSummary": "简介q",
//             "msgVIN": "LLNT6AFN2HAEX0q83",
//             "msgSendMsgTitle": "标题q"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容q",
//             "msgSendUserID": "zhaoq",
//             "msgAuditingUserName": "赵q",
//             "msgSendUserName": "赵q",
//             "msgUserName": "张q",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵q",
//             "msgCreateUserID": "zhaoq",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 10,
//             "msgUserId": "zhangq",
//             "msgAuditingUserID": "zhaoq",
//             "msgSendMsgSummary": "简介q",
//             "msgVIN": "LLNT6AFN2HAEX0q83",
//             "msgSendMsgTitle": "标题q"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容q",
//             "msgSendUserID": "zhaoq",
//             "msgAuditingUserName": "赵q",
//             "msgSendUserName": "赵q",
//             "msgUserName": "张q",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵q",
//             "msgCreateUserID": "zhaoq",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 10,
//             "msgUserId": "zhangq",
//             "msgAuditingUserID": "zhaoq",
//             "msgSendMsgSummary": "简介q",
//             "msgVIN": "LLNT6AFN2HAEX0q83",
//             "msgSendMsgTitle": "标题q"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容q",
//             "msgSendUserID": "zhaoq",
//             "msgAuditingUserName": "赵q",
//             "msgSendUserName": "赵q",
//             "msgUserName": "张q",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵q",
//             "msgCreateUserID": "zhaoq",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 10,
//             "msgUserId": "zhangq",
//             "msgAuditingUserID": "zhaoq",
//             "msgSendMsgSummary": "简介q",
//             "msgVIN": "LLNT6AFN2HAEX0q83",
//             "msgSendMsgTitle": "标题q"
//         },
//         {
//             "msgType": 0,
//             "msgCreateTime": 1520386521000,
//             "msgSendMsgContent": "内容w",
//             "msgSendUserID": "zhaow",
//             "msgAuditingUserName": "赵w",
//             "msgSendUserName": "赵w",
//             "msgUserName": "张w",
//             "msgSendTime": 1520386521000,
//             "msgCreateUserName": "赵w",
//             "msgCreateUserID": "zhaow",
//             "msgAuditingTime": 1520386521000,
//             "msgSendStatus": 1,
//             "ID": 11,
//             "msgUserId": "zhangw",
//             "msgAuditingUserID": "zhaow",
//             "msgSendMsgSummary": "简介w",
//             "msgVIN": "LLNT6AFN2HAEX0w83",
//             "msgSendMsgTitle": "标题w"
//         }
//     ],
// })


let database = usersListData.data
//let database = usersListData.list

const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'guest',
  DEVELOPER: 'developer',
}

const userPermission = {
  DEFAULT: {
    visit: ['1','8'],
    role: EnumRoleType.DEFAULT,
  },
  ADMIN: {
    role: EnumRoleType.ADMIN,
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER,
  },
}

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
  }, {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
  }, {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    permissions: userPermission.DEVELOPER,
  },
]

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {

  [`POST ${apiPrefix}/user/login`] (req, res) {
    const { username, password } = req.body
    const user = adminUsers.filter(item => item.username === username)

    if (user.length > 0 && user[0].password === password) {
      const now = new Date()
      now.setDate(now.getDate() + 1)
      res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
        maxAge: 900000,
        httpOnly: true,
      })
      res.json({ success: true, message: 'Ok' })
    } else {
      res.status(400).end()
    }
  },

  [`GET ${apiPrefix}/user/logout`] (req, res) {
    res.clearCookie('token')
    res.status(200).end()
  },

  [`GET ${apiPrefix}/user`] (req, res) {
    const cookie = req.headers.cookie || ''
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
    const response = {}
    const user = {}
    if (!cookies.token) {
      res.status(200).send({ message: 'Not Login' })
      return
    }
    const token = JSON.parse(cookies.token)
    if (token) {
      response.success = token.deadline > new Date().getTime()
    }
    if (response.success) {
      const userItem = adminUsers.filter(_ => _.id === token.id)
      if (userItem.length > 0) {
        user.permissions = userItem[0].permissions
        user.username = userItem[0].username
        user.id = userItem[0].id
      }
    }
    response.user = user
    res.json(response)
  },

  [`GET ${apiPrefix}/users`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createTime') {
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

  [`DELETE ${apiPrefix}/users`] (req, res) {
    const { ids } = req.body
    database = database.filter(item => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },


  [`POST ${apiPrefix}/user`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))
    newData.id = Mock.mock('@id')

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${apiPrefix}/user/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${apiPrefix}/user/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter(item => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${apiPrefix}/user/:id`] (req, res) {
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
