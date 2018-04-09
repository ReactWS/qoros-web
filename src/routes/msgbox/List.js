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
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: en2ch.zh.DeleteTips,
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
     {
      title: '标题',
      dataIndex: 'msgSendMsgTitle',
      key: 'msgSendMsgTitle',
      render: (text, record) => <Link to={`msgbox/${record.id}`}>{text}</Link>,
    }, {
      title: '消息类型',
      dataIndex: 'msgType',
      key: 'msgType',
      render: text => {
        switch(text){
          case "0":
          return <span>通知</span>
          break;
          case "1":
          return <span>提醒</span>
          break;
          case "2":
          return <span>保养</span>
          break;
          case "3":
          return <span>其他</span>
          break;
        }
      },
    }, {
      title: '创建者',
      dataIndex: 'msgCreateUserName',
      key: 'msgCreateUserName',
    }, {
      title: '创建时间',
      dataIndex: 'msgCreateTime',
      key: 'msgCreateTime',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[ { key: '2', name: '删除' }]} />
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
