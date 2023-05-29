import { Button, Table, Divider, Card, Col, DatePicker, Form, Row, Select, Space, Tag } from "antd"
import { useEffect, useState } from "react";
import { apiTheater } from '@/api';
import TheaterEdit from './Components/TheaterEdit'

const { getTheaterList } = apiTheater
const Theater = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // useEffect(() => {
  //   getTheaterList().then(i=>{
  //     console.log(i)
  //   })

  // }, [])

  const columns = [
    {
      title: '影城',
      dataIndex: 'theater',
    },
    {
      title: '座位',
      dataIndex: 'seats',
    },
    {
      title: '新增',
      dataIndex: 'rooms',
      width: 400,
      render: () => (
        <>
          <Button className="me-3">新增影廳</Button>
          <Button>編輯</Button>
        </>
      )
    },
    // {
    //   title: '編輯',
    //   dataIndex: 'rditTheater',
    // },
  ];

  const data = [
    {
      theater: '台北影城',
      seats: '5廳1200',
      rooms: 32,
      rditTheater: 'New York No. 1 Lake Park',
    },
    {
      theater: '台北影城',
      seats: '5廳1200',
      rooms: 32,
      rditTheater: 'New York No. 1 Lake Park',
    },
  ];


  return (
    <div style={{ margin: "3%", width: '90%' }}>
      <h2>
        影廳管理   
      </h2>
    { isModalOpen 
      ?
      <>
        <TheaterEdit /> 
      </>
      :
      <>
        <Button
            className="float-end m-3"
            size="large"
            onClick={()=>{setIsModalOpen(true)}}
          >
        新增影城
        </Button>
        <Table 
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={data}
          columns={columns}
        />
      </>
    }
  </div>
  )
}
export default Theater
