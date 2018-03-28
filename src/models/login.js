import { routerRedux } from 'dva/router'
import { login } from 'services/login'
//reducers 处理数据
//effects   接收数据
//subscriptions 监听数据
export default {
  namespace: 'login',

  state: {},

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      //put  用来发起一条action
      //call 以异步的方式调用函数
      //select 从state中获取相关的数据
      //take 获取发送的数据
      const data = yield call(login, payload)//用户登录
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        const { from } = locationQuery
        yield put({ type: 'app/query' })//用户登录成功
        if (from && from !== '/login' && from !== '/') {
          //console.log(from)  /
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/msgbox'))
        }
      } else {
        throw data
      }
    },
  },

}
