import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'

const Detail = ({ userDetail }) => {
  const { data } = userDetail.data
  const content = []

  if(data == null){
    content.push()
  }else{
    if(data["name"]){
      content.push(<div key="name" className={styles.item}>
         <div>用户名</div>
         <div>{String(data["name"])}</div>
       </div>)
    }
    if(data["age"]){
      content.push(<div key="age" className={styles.item}>
         <div>年龄</div>
         <div>{String(data["age"])}</div>
       </div>)
    }
    switch(data["isMale"]){
      case 0:
      content.push(<div key="isMale" className={styles.item}>
         <div>性别</div>
         <div>女</div>
       </div>)
      break;
      case 1:
      content.push(<div key="isMale" className={styles.item}>
         <div>性别</div>
         <div>男</div>
       </div>)
      break;
    }

    if(data["phone"]){
      content.push(<div key="phone" className={styles.item}>
         <div>联系方式</div>
         <div>{String(data["phone"])}</div>
       </div>)
    }
    if(data["email"]){
      content.push(<div key="email" className={styles.item}>
         <div>邮箱</div>
         <div>{String(data["email"])}</div>
       </div>)
    }
    if(data["address"]){
      content.push(<div key="address" className={styles.item}>
         <div>地址</div>
         <div>{String(data["address"])}</div>
       </div>)
    }
    if(data["createTime"]){
      content.push(<div key="createTime" className={styles.item}>
         <div>创建时间</div>
         <div>{String(data["createTime"])}</div>
       </div>)
    }
    if(data["roleId"]){
      content.push(<div key="roleId" className={styles.item}>
         <div>访问权限</div>
         <div>{String(data["roleId"])}</div>
       </div>)
    }

  }
  // for (let key in data) {
  //   if ({}.hasOwnProperty.call(data, key)) {
  //     content.push(<div key={key} className={styles.item}>
  //       <div>{key}</div>
  //       <div>{String(data[key])}</div>
  //     </div>)
  //   }
  // }
  return (<div className="content-inner">
    <div className={styles.content}>
      {content}
    </div>
  </div>)
}

Detail.propTypes = {
  userDetail: PropTypes.object,
}

export default connect(({ userDetail, loading }) => ({ userDetail, loading: loading.models.userDetail }))(Detail)
