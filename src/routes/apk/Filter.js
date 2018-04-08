/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form,Upload, Icon,Button, Row, Col, DatePicker, Input, Cascader, Switch,Select,message } from 'antd'
import config from '../../utils/config'
import en2ch from '../../utils/en2ch';


const { Search } = Input
const { RangePicker } = DatePicker
const { Option } = Select
const { api } = config
const { apkAdd } = api

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}



const Filter = ({
  onAdd,
  isMotion,
  uploading,
  fileList,
  switchIsMotion,
  onFilterChange,
  filter,
  handleUpload,
  beforeUploadMethod,
  onRemoveMethod,
  onChangeFile,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {


  const handleSubmit = () => {
    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  const { packageFileName } = filter

  const UploadProps = {
    name: 'file',
    action: apkAdd,
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    beforeUpload: (file) => {
      const isAPK = file.type === 'application/vnd.android.package-archive';
      if (!isAPK) {
        message.error('只能上传 APK 文件哦！');
      }
      return isAPK;
    },
    onChange: (infos) => {
      onChangeFile(infos);
    },
    //headers: {'Content-Type':'multipart/form-data'},
    // onRemove: (file) => {
    //   onRemoveMethod(file);
    //
    // },
    // beforeUpload: (file) => {
    //     beforeUploadMethod(file);
    //     return false;
    //   },
    //   fileList: fileList,
  }

  return (
    <div>
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('packageFileName', { initialValue: packageFileName })(<Search placeholder="文件名" onSearch={handleSubmit} />)}
      </Col>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <Button type="primary" className="margin-right" onClick={handleSubmit}>{en2ch.zh.Search}</Button>
            <Button onClick={handleReset}>{en2ch.zh.Reset}</Button>
          </div>
          <div className="flex-vertical-center">
            <Switch className="ant-switch-large" style={{ marginRight: 16 }} defaultChecked={isMotion} onChange={switchIsMotion} checkedChildren="Motion" unCheckedChildren="Motion" />

          </div>
        </div>
      </Col>

      <Col xl={{span: 20}} md={{span: 8}}>
        <Upload {...UploadProps}>
          <Button>
            <Icon type="upload" /> 选择文件
          </Button>
        </Upload>
      </Col>

    </Row>
  </div>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  uploading: PropTypes.bool,
  handleUpload: PropTypes.func,
}

export default Form.create()(Filter)
