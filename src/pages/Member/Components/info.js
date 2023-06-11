import { Button, Checkbox, Col, DatePicker, Form, Input, Layout, List, Radio, Row, Space } from "antd"
import dayjs from "dayjs"
import { useState } from "react"
import { apiMemberAdd, apiMemberUpdate } from "../../../api"

export const FormListAdapter = ({ params }) => {
  const { fields, operation, errors, getDatas, marginBottom, label } = params
  const [isEdit, setIsEdit] = useState(false)
  const getValues = () => {
    const values = getDatas()?.join(',')
    return values == '' ? {value:'無資料', style:{border:'1px red solid'}} : {value: values}
  }
  return <>
    <Form.Item label={label} noStyle rules={[validateRequire]} hasFeedback={true} required>
      <Row justify={isEdit?'end':'space-between'} align='middle' wrap={false}>
        <Col flex={!isEdit?'auto':''}>{isEdit? <Button type="dashed" onClick={() => operation.add()}>新增項目</Button> : <Input disabled {...getValues()}/>}</Col>
        <Col><Button type="dashed" onClick={() => setIsEdit(!isEdit)}>{isEdit ? '結束編輯' : '編輯'}</Button></Col>
      </Row>
    </Form.Item>
    {isEdit && fields.map((field, index) => (
      <Form.Item key={field.key} noStyle>
        <Row justify='space-between' wrap={false}>
          <Col flex='auto'>
            <Form.Item {...field} rules={[validateRequire]} hasFeedback={true} noStyle><Input /></Form.Item>
          </Col>
          <Col flex='none'>
            <Button type="dashed" onClick={() => operation.remove(field.name)}>移除</Button>
          </Col>
        </Row>
      </Form.Item>
    ))}
  </>
}

export const validateRequire = {validator:(sender, value) => {
  console.log('required', sender)
  if ((typeof(value)!='boolean' && !value) || (Array.isArray(value) && value.length == 0)) return Promise.reject('此欄位必填!');
  return Promise.resolve();
},required:true}
const validateEmail = {validator:(sender, value) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{1,4}$/;
  if (!emailRegex.test(value)) {
    return Promise.reject('請填寫email格式!');
  }
  return Promise.resolve();
}}

const MemberInfo = ({ data, onClose }) => {
  const isAdd = data._id == undefined
  const [form] = Form.useForm();
  const getHobby = () => form.getFieldValue('hobby')?.filter(h => h != undefined && h != '')
  const [selectedDays, setSelectedDays] = useState()
  const selectDate = (days) => {
    if (days[0] != undefined && days[1] != undefined) {
      setSelectedDays([days[0].toISOString(), days[1].toISOString()])
    }
  }
  data = isAdd ? {} : data
  const onFinish = async (values) => {
    const result = isAdd ? {} : { ...data }
    for (let key in values) {
      if (values[key] !== undefined) {
        result[key] = values[key];
      }
    }
    result.hobby = getHobby()
    console.log('result', result)

    if (isAdd) {
      await apiMemberAdd(result)
        .then(e => onClose())
    } else {
      await apiMemberUpdate(result._id, result)
        .then(e => onClose())
    }
  };

  return <Row justify='space-around' align='middle' gutter={[0,10]}>
    <Col span={isAdd?24:9} cen>
      <Form form={form} layout="horizontal" onFinish={onFinish}>
        <Form.Item label="帳號" name="email" initialValue={data.email} rules={[validateRequire, validateEmail]} hasFeedback={true}>
          <Input disabled={!isAdd}/>
        </Form.Item>
        {isAdd && <Form.Item label="密碼" name="password" rules={[validateRequire]} hasFeedback={true}>
          <Input type="password" />
        </Form.Item>}
        <Form.Item label="姓名" name="name" initialValue={data.name}>
          <Input/>
        </Form.Item>
        <Form.Item label="電話" name="mobile" initialValue={data.mobile}>
          <Input/>
        </Form.Item>

        <Form.Item label="興趣">
        <Form.List name="hobby" initialValue={data.hobby ? data.hobby : []}>
          {(fields, operation) => <FormListAdapter params={{ fields, operation, getDatas: getHobby, marginBottom: 0 }} />}
        </Form.List>
        </Form.Item>

        <Form.Item label="性別" name="sex" initialValue={data.sex}>
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="生日" name="birth" initialValue={dayjs(data.birth)}>
          <DatePicker/>
        </Form.Item>
        <Form.Item label="會員點數" name="bounus" initialValue={data.bounus}>
          <Input disabled />
        </Form.Item>
        <Form.Item label="權限" name="roles" initialValue={data.roles}>
          <Checkbox.Group><Row>
            <Checkbox value={'user'}>一般會員</Checkbox>
            <Checkbox value={'admin'}>後臺管理員</Checkbox>
          </Row></Checkbox.Group>
        </Form.Item>
      </Form>
    </Col>
    <Col span={isAdd?0:1} />
    <Col span={isAdd?0:14}>
      <Layout.Header style={{ background: "inherit" }}>消費紀錄</Layout.Header>
      <Layout>
        <List header={<Space>篩選日期<DatePicker.RangePicker onCalendarChange={selectDate}>開始日期</DatePicker.RangePicker>
        </Space>} bordered dataSource={data.orderId?.filter((order => selectedDays ? order.orderDatetime >= selectedDays[0] && order.orderDatetime <= selectedDays[1] : true))} renderItem={(item) => (
          <List.Item key={item.orderId}>
            <List.Item.Meta title={`訂單編號:\n${item.orderId}`} description={<Row justify='space-between'>
              <Col>{`日期:${dayjs(item.orderDatetime).format('YYYY/MM/DD HH:mm:ss')}`}</Col>
              <Col>{`消費:${item.price}`}</Col>
            </Row>} />
          </List.Item>
        )} pagination={{ pageSize: 5 }} />
      </Layout>
    </Col>
    <Col span={24}><Row justify='end' gutter={10}>
      <Col ><Button type="primary" onClick={form.submit}>OK</Button></Col>
      <Col ><Button onClick={onClose}>Cancel</Button></Col>
    </Row></Col>
  </Row>
}

export default MemberInfo