
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { query,create, remove, update } from 'services/apk'
import { pageModel } from './common'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'apk',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
    fileList: [],
    uploading: false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/apk') {
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
    * query ({ payload = {} }, { call, put, select }) {
      const data = yield call(query, payload)
      const {user} = yield select(_ => _.app)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.list,
            user: user,
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
      const {packageFileName , packageName} = payload
      const data = yield call(remove, { packageFileName , packageName })
      const { selectedRowKeys } = yield select(_ => _.apk)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
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
      const {packageName , autoInstall} = payload
      const data = yield call(update, {packageName,autoInstall})
      const { selectedRowKeys } = yield select(_ => _.apk)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
      } else {
        throw data
      }
    },

    * showmodal ({payload }, {select, call, put}) {
      yield put({type: 'showModal',payload: payload })
    },

    * hidemodal ({payload }, {select, call, put}) {
      yield put({type: 'hideModal'})
    },

    * handleUpload ({ payload }, { select, call, put }) {
      const { fileList } = yield select(_ => _.apk);
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('files[]', file);
      });
      //yield put({type: 'switchUploadingShow'});
      const data = yield call(create, formData);
      if(data.success){
        yield put({type: 'switchUploadingHide'});
      }else{
        throw data
      }
    }

  },

  reducers: {
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

    switchUploadingShow(state){
      return {...state, uploading: true }
    },

    switchUploadingHide(state){
      return {...state,fileList: [], uploading: false }
    },

  },
})
