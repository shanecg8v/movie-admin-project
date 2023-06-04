import { Button, Checkbox, Col, DatePicker, Dropdown, Form, Input, Layout, List, Radio, Row, Space, Tooltip } from "antd"
import { selectMember } from "../../../store/slice/memberSlice"
import { useSelector } from "react-redux"
import dayjs from "dayjs"
import { useState } from "react"
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'

export const FormListAdapter = ({params}) => {
  const {fields, operation, getDatas, label} = params
  const [isEdit,setIsEdit] = useState(false)
  const getValues = ()=>{
    const values = getDatas().join(',')
    return values==''?'無資料':values
  }

  return <>
    <Form.Item style={{ marginBottom: 0 }}>
      <Row justify={isEdit?'space-between':'start'} align='middle' >
        <Col>{label}:</Col>
        <Col>{isEdit?
        <Button type="dashed" onClick={() => operation.add()}>新增項目</Button>:
        <Input onClick={() => setIsEdit(!isEdit)} value={getValues()} bordered={false}/>}</Col>
        {isEdit&&<Col><Button type="dashed" onClick={()=>setIsEdit(!isEdit)}>{isEdit?'結束編輯':'編輯'}</Button></Col>}
      </Row>
    </Form.Item>
    {isEdit && fields.map((field, index) => (
      <Form.Item key={field.key} style={{ marginBottom: 0 }}>
        <Row justify='space-between'>
          <Col>
            <Form.Item {...field} noStyle><Input /></Form.Item>
          </Col>
          <Col>
            <Button type="dashed" onClick={() => operation.remove(field.name)}>移除</Button>
          </Col>
        </Row>
      </Form.Item>
    ))}
  </>
}


const MemberInfo = ({ index, setData, isAdd }) => {
  const [form] = Form.useForm();
  let info = useSelector(selectMember)[index]
  const getHobby = ()=>form.getFieldValue('hobby').filter(h => h != undefined && h != '')
  const onValuesChange = (changedValues, allValues) => {
    info = { ...info, ...changedValues, hobby: getHobby() }
    setData(info)
  }
  const [selectedDays, setSelectedDays] = useState()
  const selectDate = (days) => {
    if (days[0] != undefined && days[1] != undefined) {
      setSelectedDays([days[0].toISOString(), days[1].toISOString()])
    }
  }
  info = isAdd ? {} : info
  const hobbyOfInfo = (info.hobby ? info.hobby : [])

  return <Row justify='space-around' align='middle'>
    <Col span={9} cen>
      <Form form={form} layout="horizontal" onValuesChange={onValuesChange}>
        <Form.Item label="帳號" name="email" style={{ marginBottom: 0 }}>
          <Input defaultValue={info.email} disabled={!isAdd} bordered={false} />
        </Form.Item>
        <div style={{ borderBottom: '1px solid' }} />
        <Form.Item label="姓名" name="name" style={{ marginBottom: 0 }}>
          <Input defaultValue={info.name} bordered={false} />
        </Form.Item>
        <div style={{ borderBottom: '1px solid' }} />
        <Form.Item label="電話" name="mobile" style={{ marginBottom: 0 }}>
          <Input defaultValue={info.mobile} bordered={false} />
        </Form.Item>
        <div style={{ borderBottom: '1px solid' }} />

        <Form.List label="興趣" name="hobby" initialValue={hobbyOfInfo}>
        {(fields, operation )=><FormListAdapter params={{fields,operation,getDatas: getHobby,label:'興趣'}}/>}
        </Form.List>
        <div style={{ borderBottom: '1px solid' }} />


        <Form.Item label="性別" name="sex" style={{ marginBottom: 0 }} initialValue={info.sex}>
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>
        <div style={{ borderBottom: '1px solid' }} />
        <Form.Item label="生日" name="birth" style={{ marginBottom: 0 }}>
          <DatePicker defaultValue={dayjs(info.birth)} bordered={false}/>
        </Form.Item>
        <div style={{ borderBottom: '1px solid' }} />
        <Form.Item label="會員點數" name="bounus" style={{ marginBottom: 0 }}>
          <Input defaultValue={info.bounus} disabled bordered={false} />
        </Form.Item>
        <div style={{ borderBottom: '1px solid' }} />
        <Form.Item label="權限" name="roles" style={{ marginBottom: 0 }} initialValue={info.roles}>
          <Checkbox.Group><Row>
            <Checkbox value={'user'}>一般會員</Checkbox>
            <Checkbox value={'admin'}>後臺管理員</Checkbox>
          </Row></Checkbox.Group>
        </Form.Item>
        <div style={{ borderBottom: '1px solid' }} />
      </Form>
    </Col>
    <Col span={1} />
    <Col span={14}>
      <Layout.Header style={{ background: "inherit" }}>消費紀錄</Layout.Header>
      <Layout>
        <List header={<Space>篩選日期<DatePicker.RangePicker onCalendarChange={selectDate}>開始日期</DatePicker.RangePicker>
        </Space>} bordered dataSource={info.orderId?.filter((order => selectedDays ? order.orderDatetime >= selectedDays[0] && order.orderDatetime <= selectedDays[1] : true))} renderItem={(item) => (
          <List.Item key={item.orderId}>
            <List.Item.Meta title={`訂單編號:\n${item.orderId}`} description={<Row justify='space-between'>
              <Col>{`日期:${dayjs(item.orderDatetime).format('YYYY/MM/DD HH:mm:ss')}`}</Col>
              <Col>{`消費:${item.price}`}</Col>
            </Row>} />
          </List.Item>
        )} pagination={{ pageSize: 5 }} />
      </Layout>
    </Col>
  </Row>
}

export default MemberInfo