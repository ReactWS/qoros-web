import pathToRegexp from 'path-to-regexp'
import { query2 } from '../../services/msgbox'

export default {

  namespace: 'msgboxDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/msgbox/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'query2', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    * query2 ({
      payload,
    }, { call, put }) {
      const data = yield call(query2, payload)
      const {
        success, message, status, ...other
      } = data
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: other,
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
