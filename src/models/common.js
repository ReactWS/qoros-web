import modelExtend from 'dva-model-extend'

const model = {
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

const pageModel = modelExtend(model, {

  state: {
    list: [],
    dataUVs: [],
    fileList: [],
    user: {},
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共计 ${total} 条`,
      current: 1,
      total: 0,
      pageSize: 10,
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { list, pagination, dataUVs,user } = payload
      return {
        ...state,
        list,
        dataUVs,
        user,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },

})


module.exports = {
  model,
  pageModel,
}
