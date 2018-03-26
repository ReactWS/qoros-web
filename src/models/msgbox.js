/* global window */
//用来接收你发送的action

import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { query,create, remove,remove2, update ,user2vin} from 'services/msgbox'
//import * as usersService from 'services/users'
import { pageModel } from './common'

//const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'msgbox',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    //subscription是订阅，用于订阅一个数据源，然后根据需要dispatch相应的
    //action在app.start()时被执行，数据源可以是当前的时间，服务器的websocket连接，
    //keyboard输入，geolocation变化，history路由变化等。
    setup ({ dispatch, history }) {
      //监听history变化，当进入‘/user’时触发‘query’ action
      history.listen((location) => {
        if (location.pathname === '/msgbox') {
          const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    //用于处理异步操作和业务逻辑。不直接修改state。由action触发，可以触发action，
    //可以和服务器交互，可以获取全局state的数据等。
    * query ({ payload = {} }, { call, put }) {
      //调用 query，成功后触发‘querySuccess’ action 保存到state
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove2, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
      } else {
        throw data
      }
    },

    * multiDelete ({ payload }, { call, put }) {
      const data = yield call(remove, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    * user2vin ({ payload ={}}, { select, call, put }) {
      const data = yield call(user2vin, payload)
      if (data.success) {
        yield put({ type: 'changeUser2Vin' ,payload:{data:data.data}})
      } else {
        throw data
      }
    },

  },

  reducers: {
    //保存数据到state
    /**
    /*用于处理同步操作，唯一可以修改state的地方。由action触发
    */

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
