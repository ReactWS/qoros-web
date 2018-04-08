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

const Apk = ({location, dispatch, apk, loading}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {list, pagination, currentItem, modalVisible,
     modalType, isMotion, selectedRowKeys,user,fileList, uploading } = apk

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
    user: user,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['apk/update'],
    title: `${modalType === 'create' ? en2ch.zh.CreateTitile : en2ch.zh.UpdateTitile}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `apk/${modalType}`,
        payload: data,
      })
      .then(() => handleRefresh({page:1}))

    },
    onCancel () {
      dispatch({
        type: 'apk/hidemodal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['apk/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (record) {
      dispatch({
        type: 'apk/delete',
        payload: record,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
          })
        })
    },
    onEditItem (record) {
      dispatch({
        type: 'apk/update',
        payload: record,
      })
        .then(() => {
          handleRefresh({
            page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
        })
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'apk/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    isMotion,
    uploading,
    fileList,
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
      dispatch({
        type: 'apk/showmodal',
        payload: {
          modalType: 'create',
        }
      })

    },
    switchIsMotion () {
      dispatch({ type: 'apk/switchIsMotion' })
    },

    handleUpload(){
      dispatch({ type: 'apk/handleUpload'})
    },

    beforeUploadMethod(file){
      dispatch({
        type: 'apk/updateState',
        payload: {
          fileList: [...fileList, file],
        },
      });
    },
    onRemoveMethod(file){
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      dispatch({
        type: 'apk/updateState',
        payload: {
          fileList: newFileList,
        },
      });
      //return newFileList;
    },
    onChangeFile(info){
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(`${info.file.name} file uploaded successfully`);
        handleRefresh({page:1})
      } else if (info.file.status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  }

  const handleDeleteItems = () => {
    // dispatch({
    //   type: 'apk/multiDelete',
    //   payload: {
    //     ids: selectedRowKeys,
    //   },
    // })
    //   .then(() => {
    //     handleRefresh({
    //       page: (list.length === selectedRowKeys.length && pagination.current > 1) ? pagination.current - 1 : pagination.current,
    //     })
    //   })
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

Apk.propTypes = {
  apk: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ apk, loading }) => ({ apk, loading }))(Apk)
