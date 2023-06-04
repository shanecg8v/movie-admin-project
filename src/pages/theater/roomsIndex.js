import { Button, Table, Divider, Typography, Card, Col, DatePicker, Form, Row, Select, Space, Tag } from "antd"
import { useEffect, useState } from "react";
import { apiTheater } from '@/api';
import Rooms from './Components/RoomsEdit'
import _ from 'lodash'

const { Title } = Typography;
const { getTheaterList, getRooms } = apiTheater

const Theater = () => {
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
  
  const toggleModal = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true)
  }


  return (
    <div style={{ margin: "3%", width: '90%' }}>
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
        <Row justify="end">
          <Button
              // className="float-end m-3"
              size="large"
              onClick={()=>{toggleModal()}}
            >
          新增影廳
          </Button>
        </Row>
        <div className="container-fluid border mx-auto mt-3">
          <Row justify="end" align="middle" className="mt-3">
              <Title style={{ margin: 0 }} align="top" level={4}>影城選擇</Title>
            <Col span={5} offset={1}>
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
          </Row>
          <Row className="mt-3 mb-3">
            <div className="container d-flex">
              {rooms && rooms.map(item => (
                <Card 
                  style={{
                    width: '200px',
                    height: '100px'
                  }}
                  key={item.id}  
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
  )
}
export default Theater
