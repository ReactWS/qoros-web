import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'

const Detail = ({ msgboxDetail }) => {
  const { data } = msgboxDetail
  const content = []
  content.push(<div key="msgSendMsgTitle" className={styles.item}>
     <div>消息标题</div>
     <div>{String(data["msgSendMsgTitle"])}</div>
   </div>)
  switch(data["msgType"]){
    case "0":
    content.push(<div key="msgType" className={styles.item}>
       <div>消息类型</div>
       <div>通知</div>
     </div>)
    break;
    case "1":
    content.push(<div key="msgType" className={styles.item}>
       <div>消息类型</div>
       <div>通知</div>
     </div>)
    break;
    case "2":
    content.push(<div key="msgType" className={styles.item}>
       <div>消息类型</div>
       <div>通知</div>
     </div>)
    break;
    case "3":
    content.push(<div key="msgType" className={styles.item}>
       <div>消息类型</div>
       <div>通知</div>
     </div>)
    break;
  }

  content.push(<div key="msgCreateUserName" className={styles.item}>
     <div>创建者</div>
     <div>{String(data["msgCreateUserName"])}</div>
   </div>)

  content.push(<div key="msgCreateTime" className={styles.item}>
     <div>创建时间</div>
     <div>{String(data["msgCreateTime"])}</div>
   </div>)

  content.push(<div key="msgAuditingUserName" className={styles.item}>
     <div>审核者</div>
     <div>{String(data["msgAuditingUserName"])}</div>
   </div>)

  content.push(<div key="msgAuditingTime" className={styles.item}>
     <div>审核时间</div>
     <div>{String(data["msgAuditingTime"])}</div>
   </div>)

  content.push(<div key="msgSendUserName" className={styles.item}>
     <div>发送者</div>
     <div>{String(data["msgSendUserName"])}</div>
   </div>)

  content.push(<div key="msgCreateTime" className={styles.item}>
     <div>发送时间</div>
     <div>{String(data["msgCreateTime"])}</div>
   </div>)

  content.push(<div key="msgSendMsgContent" className={styles.item}>
     <div>消息内容</div>
     <div>{String(data["msgSendMsgContent"])}</div>
   </div>)
  // for (let key in data) {
  //   if ({}.hasOwnProperty.call(data, key)) {
  //     content.push(<div key={key} className={styles.item}>
  //        <div>{key}</div>
  //        <div>{String(data[key])}</div>
  //      </div>)
  //   }
  // }
  return (<div className="content-inner">
    <div className={styles.content}>
      {content}
    </div>
  </div>)
}



Detail.propTypes = {
  msgboxDetail: PropTypes.object,
}

export default connect(({ msgboxDetail, loading }) => ({ msgboxDetail, loading: loading.models.msgboxDetail }))(Detail)
