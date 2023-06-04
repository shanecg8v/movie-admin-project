import { Button, Table, Divider, Card, Col, DatePicker, Form, Row, Select, Space, Tag } from "antd"
import { useEffect, useState } from "react";
import { apiTheater } from '@/api';
import TheaterEdit from './Components/TheaterEdit'
import { useId } from 'react'
import _ from 'lodash'

const { getTheaterList, getTheaterRow } = apiTheater

const Theater = () => {
  const [rowData, setRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tadate, setTadate] = useState(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    getTheaterList().then(({data}) => {
      setTadate(data.data)
    })

  }, [])

  const editRow = (id) => {
    // let row = _.find(tadate, {_id: id})
    getTheaterRow(id).then(({data:{data}})=> {
      if (data) {
        setEditMode(true)
        setRowData(data)  
        setIsModalOpen(true)
      } else {
        console.log('錯誤')
      }
    })

    // setIsModalOpen(true)
    
  }

  const toggleModal = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true)
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
      render: (id, i) => (
        <>
          <Button className="me-3" key={i}>新增影廳</Button>
          <Button onClick={()=>editRow(id)}>編輯</Button>
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
        {/* <TheaterEdit rowData={rowData}/>  */}
        <TheaterEdit isEditMode={editMode} initialValues={rowData}/> 
      </>
      :
      <>
        <Button
            className="float-end m-3"
            size="large"
            onClick={()=>{toggleModal()}}
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
