import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import en2ch from '../../utils/en2ch'

const Msgbox = ({location, dispatch, msgbox, loading}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,dataUVs } = msgbox

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({//执行dispatch 发送一条action给对应的model那边
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    treeData: dataUVs,
    visible: modalVisible,
    //loading: loading.effects['msgbox/user2vin'],
    maskClosable: false,
    confirmLoading: loading.effects['msgbox/update'],
    title: `${modalType === 'create' ? en2ch.zh.CreateTitile : en2ch.zh.UpdateTitile}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `msgbox/${modalType}`,
        payload: data,
      })
      //.then(() => handleRefresh)
    },
    onCancel () {
      dispatch({
        type: 'msgbox/hidemodal',
      })
      //.then(() => handleRefresh
      //.then(() => console.log(1))
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['msgbox/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'msgbox/delete',
        payload: id,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    onEditItem (item) {
      dispatch({
        type: 'msgbox/showmodal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
        .then(() => handleRefresh)
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'msgbox/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    isMotion,
    filter: {
      ...query,
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
    onAdd () {
      //dispatch({type: 'msgbox/user2vin'})
      dispatch({
        type: 'msgbox/showmodal',
        payload: {
          modalType: 'create',
        }
      })
      .then((value) => handleRefresh({...value, page:1}))
      // .then(() => handleRefresh)

    },
    switchIsMotion () {
      dispatch({ type: 'msgbox/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'msgbox/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
      .then(() => {
        handleRefresh({
          page: (list.length === selectedRowKeys.length && pagination.current > 1) ? pagination.current - 1 : pagination.current,
        })
      })
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`选中 ${selectedRowKeys.length} 条 `}
            <Popconfirm title={en2ch.zh.DeleteTips} placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{ marginLeft: 8 }}>全部删除</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

Msgbox.propTypes = {
  msgbox: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
//connect的意思，就是将这两种组件连起来。
//如果说你的ui里面需要用到model里面的数据的话
//那么就可以直接用这个 将model里面的元素 当做props的方式 传递进来
export default connect(({ msgbox, loading }) => ({ msgbox, loading }))(Msgbox)
