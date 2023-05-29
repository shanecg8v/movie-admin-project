import { Button, Card, Col, DatePicker, Form, Row, Select, Space, Tag } from "antd"
import { memberGetAll } from "../../api/member"



const MovieShelf = () => {
  const filterSession = [
    {
      movieName: "關於我和軌變成家人的那件事",
      time: "08:00"
    },{
      movieName: "",
      time: "11:00"
    },{
      movieName: "關於我和軌變成家人的那件事",
      time: "14:00"
    },
  ]

  const chg = () => {

  }

  const testClick = ()=>{
    memberGetAll()
    .then(e=>console.log('T',e))
    .catch(e=>console.log('F',e))
  }

  return (<div style={{ width: '90%', margin: 'auto' }}>
    <Form.Item label="選擇影城">
      <Select onChange={chg} defaultValue={'option1'}>
        <Select.Option value="option1">台北</Select.Option>
        <Select.Option value="option2">台中</Select.Option>
        <Select.Option value="option3">台南</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label="選擇影廳">
      <Select onChange={chg} defaultValue={'option1'}>
        <Select.Option value="option1">1廳</Select.Option>
        <Select.Option value="option2">2廳</Select.Option>
        <Select.Option value="option3">3廳</Select.Option>
      </Select>
    </Form.Item>
    <div>
      <Form.Item label="選擇日期">
        <DatePicker />
      </Form.Item>
      <Form.Item label="選擇電影">
        <Select onChange={chg} defaultValue={'option1'}>
          <Select.Option value="option1">電影A</Select.Option>
          <Select.Option value="option2">電影B</Select.Option>
          <Select.Option value="option3">電影C</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="時段">
        <div style={{marginLeft:30}}>
        <Space>
          <Tag color="green">已上架</Tag>
          <Tag color="grey">未上架</Tag>
          <Tag color="yellow">選擇</Tag>
        </Space>
        <Row gutter={16} style={{marginTop:20}}>
          {filterSession.map(s=><Col span={6}>
            <Card title={s.time} style={{ textAlign: 'center', height:'160px' }}>
              <p>{s.movieName}</p>
            </Card>
          </Col>)}
        </Row>
        </div>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button htmlType="submit">儲存</Button>
        </div>
      </Form.Item>
      
      <Button onClick={testClick}>Test</Button>    
    </div>
  </div>)
}

export default MovieShelf