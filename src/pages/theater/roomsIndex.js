import { Button, Typography, Card, Col, Row, Select, Layout, Modal } from "antd"
import { useEffect, useState   } from "react";
import { apiTheater } from '@/api';
import Rooms from './Components/RoomsEdit'
import _ from 'lodash'
import { Link } from "react-router-dom";
const { Content } = Layout;

const { Title } = Typography;
const { getTheaterList, getRooms, deleteRoom } = apiTheater



const Theater = () => {

  const handleDoubleClick = (id) => {
    const config = {
      title: '刪除',
      content: '確認刪除?',
      onOk: () => {
        deleteRoom(id)
      },
    };
    Modal.error(config)
  };

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [options, setOptions] = useState(false)
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    getTheaterList().then(({data:{data}})=>{
      const temp = _.map(data, item => {
        return {
          ...item,
          label: item.name,
          value: item._id
        }
      })
      setOptions(temp)
    })
  }, [])

  const onChange = (id) => {
    getRooms(id).then(({data:{data:{rooms}}}) => {
      setRooms(rooms)
    })
  }
  

  return (
  <Content
    style={{
      margin: '24px 16px',
      padding: 24,
      minHeight: 280,
      background: 'rgb(230 231 232)'
    }}
  >
    <div style={{ margin: "auto 5%", width: '90%' }}>
      <h2>
        影廳管理   
      </h2>
    { isModalOpen 
      ?
      <>
        <Rooms /> 
      </>
      :
      <>
        <Row className="d-flex justify-content-end align-items-center">
          <Title style={{ margin: 0 }} align="top" level={4}>影城選擇</Title>
          <Col className="ms-3"> 
            <Select
              alias="top"
              style={{ width: 300 }}
              showSearch
              size="large"
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={options}
            />
          </Col>
          <Col className="ms-3">
            <Button
              size="large"
              >
              <Link to="/roomsEdit">新增影廳</Link>
            </Button>
          </Col>
        </Row>
        <div className="container-fluid border border-secondary mx-auto mt-3">
          <Row className="mt-3 mb-3">
            <div className="container d-flex">
              {rooms && rooms.map(item => (
                <Card 
                  style={{
                    width: '200px',
                    height: '100px'
                  }}
                  key={item.id}  
                  onDoubleClick={()=>handleDoubleClick(item.id)}
                >
                  <p>{item.name}</p>  
                </Card>
                  
              ))}
            </div>
          </Row>
        </div>
      </>
    }
    </div>
  </Content>
  )
}
export default Theater
