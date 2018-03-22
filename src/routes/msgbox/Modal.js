import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Select,TreeSelect } from 'antd'
import city from '../../utils/city'
import { treeData } from '../../tests/user2vin'

//const treeData = treeData
const FormItem = Form.Item
const SHOW_PARENT = TreeSelect.SHOW_PARENT
const { Option } = Select


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      //data.address = data.address.join(' ')
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const onChange = (value) => {
    //console.log('onChange ', value, arguments);
    //this.setState(value );
    item.msgUserName = value
  }

  const tProps = {
      treeData,
      onChange: onChange,
      multiple: true,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择要推送的用户',
    }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="消息类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('msgType',{
            initialValue: item.msgType,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select  style={{ width: 120 }} >
                <Option value="0">通知</Option>
                <Option value="1">提醒</Option>
                <Option value="2">保养</Option>
                <Option value="3">其他</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="标题" hasFeedback labelCol={{span: 6,}} wrapperCol={{span: 16,}}>
          {getFieldDecorator('msgSendMsgTitle', {
            initialValue: item.msgSendMsgTitle,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="textarea" />)}
        </FormItem>
        <FormItem label="内容" hasFeedback {...formItemLayout}>
          {getFieldDecorator('msgSendMsgContent', {
            initialValue: item.msgSendMsgContent,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="textarea" />)}
        </FormItem>

        <FormItem label="推送用户" hasFeedback {...formItemLayout}>
          {getFieldDecorator('msgVIN', {
            initialValue: item.msgVIN,
          })(<TreeSelect {...tProps} />)}
        </FormItem>

        <FormItem label="提示：不选择推送用户的情况下默认全推！" labelCol={{span:18}} >
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
