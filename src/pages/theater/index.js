import { Button, Table, Divider, Card, Col, DatePicker, Form, Row, Select, Space, Tag } from "antd"
import { useEffect, useState } from "react";
import { apiTheater } from '@/api';
import TheaterEdit from './Components/TheaterEdit'
import { useId } from 'react'
import _ from 'lodash'

const { getTheaterList } = apiTheater

const Theater = () => {
  // const id = useId();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tadate, setTadate] = useState(null)
  useEffect(() => {
    getTheaterList().then(({data}) => {
      setTadate(data.data)
    })

  }, [])

  const editRow = (rowId) => {
    console.log('rowId', rowId)
    setIsModalOpen(true)
    
  }

  const columns = [
    {
      title: '影城',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '影廳數量',
      dataIndex: 'roomCount',
      key: 'roomCount'
    },
    {
      title: '座位總數',
      dataIndex: 'seatCount',
      key: 'seatCount'

    },
    {
      title: '新增',
      dataIndex: '_id',
      width: 400,
      render: (item, i) => (
        <>
          <Button className="me-3" key={i}>新增影廳</Button>
          <Button onClick={()=>editRow(item)}>編輯</Button>
        </>
      )
    },
  ];

  return (
    <div style={{ margin: "3%", width: '90%' }}>
      <h2>
        影城列表   
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
          dataSource={tadate}
          columns={columns}
          rowKey='_id'
        />
      </>
    }
  </div>
  )
}
export default Theater
