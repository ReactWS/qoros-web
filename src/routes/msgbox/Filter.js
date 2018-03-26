/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,Select } from 'antd'
import city from '../../utils/city'
import en2ch from '../../utils/en2ch';

const { Search } = Input
const { RangePicker } = DatePicker
const { Option } = Select

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
  switchIsMotion,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    const { msgCreateTime } = fields
    if (msgCreateTime.length) {
      fields.msgCreateTime = [msgCreateTime[0].format('YYYY-MM-DD'), msgCreateTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
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
  const { msgSendMsgTitle, msgType } = filter

  let initialCreateTime = []
  if (filter.msgCreateTime && filter.msgCreateTime[0]) {
    initialCreateTime[0] = moment(filter.msgCreateTime[0])
  }
  if (filter.msgCreateTime && filter.msgCreateTime[1]) {
    initialCreateTime[1] = moment(filter.msgCreateTime[1])
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('msgSendMsgTitle', { initialValue: msgSendMsgTitle })(<Search placeholder={en2ch.zh.SearchTips} onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }} >

          {getFieldDecorator('msgType', { initialValue: "99" })(
          <Select   onSearch={handleSubmit}>
              <Option value="0">通知</Option>
              <Option value="1">提醒</Option>
              <Option value="2">保养</Option>
              <Option value="3">其他</Option>
              <Option value="99">全部</Option>
            </Select>
          )}

      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} id="createTimeRangePicker">
        <FilterItem label={en2ch.zh.Createtime}>
          {getFieldDecorator('msgCreateTime', { initialValue: initialCreateTime })(<RangePicker
            //style={{ width: '100%' }}
            onChange={handleChange.bind(null, 'msgCreateTime')}
            getCalendarContainer={() => {
              return document.getElementById('createTimeRangePicker')
            }}
          />)}
        </FilterItem>
      </Col>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <Button type="primary" className="margin-right" onClick={handleSubmit}>{en2ch.zh.Search}</Button>
            <Button onClick={handleReset}>{en2ch.zh.Reset}</Button>
          </div>
          <div className="flex-vertical-center">
            <Switch className="ant-switch-large" style={{ marginRight: 16 }} defaultChecked={isMotion} onChange={switchIsMotion} checkedChildren="Motion" unCheckedChildren="Motion" />
            <Button type="ghost" onClick={onAdd}>{en2ch.zh.Create}</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
