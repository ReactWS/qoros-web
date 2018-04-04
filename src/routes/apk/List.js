import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import en2ch from '../../utils/en2ch'
import styles from './List.less'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      //onEditItem(record)
      console.log('更新...');
    } else if (e.key === '2') {
      confirm({
        title: en2ch.zh.DeleteTips,
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }else if(e.key === '3'){
      console.log('下载...');
    }
  }

  const columns = [
     {
      title: '文件名',
      dataIndex: 'packageFileName',
      key: 'packageFileName',
      //render: (text, record) => <Link to={`msgbox/${record.id}`}>{text}</Link>,
    }, {
      title: '包名',
      dataIndex: 'packageName',
      key: 'packageName',
    }, {
      title: '版本名',
      dataIndex: 'versionName',
      key: 'versionName',
    }, {
      title: '版本号',
      dataIndex: 'versionCode',
      key: 'versionCode',
    }, {
      title: '时间',
      dataIndex: 'versionTime',
      key: 'versionTime',
    }, {
      title: '静默安装',
      dataIndex: 'autoInstall',
      key: 'autoInstall',
      render: (text) => {
        if(text == 1){
          return <span>是</span>
        }else{
          return <span>否</span>
        }
      }
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '禁用' }, { key: '2', name: '删除' }, { key: '3', name: '下载' }]} />
      },
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (
    <Table
      {...tableProps}
      className={classnames(styles.table, { [styles.motion]: isMotion })}
      bordered
      scroll={{ x: 1250 }}
      columns={columns}
      simple
      rowKey={record => record.id}
      components={{
        body: { wrapper: isMotion ? AnimateBody : CommonBody },
      }}
    />
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
