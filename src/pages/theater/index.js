import { Button, Table, Layout } from "antd"
import { useEffect, useState } from "react";
import { apiTheater } from '@/api';
import TheaterEdit from './Components/TheaterEdit'
import _ from 'lodash'
import { Link } from "react-router-dom";
const { Content } = Layout;


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

  const columns = [
    {
      title: '影城',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '影廳數量',
      dataIndex: 'roomCount',
      key: 'roomCount',
      align: 'center'
    },
    {
      title: '座位總數',
      dataIndex: 'seatCount',
      key: 'seatCount',
      align: 'center'

    },
    {
      title: '新增',
      dataIndex: '_id',
      width: 400,
      align: 'center',
      render: (id, i) => (
        <>
          <Button 
            className="me-3" 
            key={i}
            size="large" 
          >
            <Link to="/roomsEdit">新增影廳</Link>
          </Button>
          <Button 
            onClick={()=>editRow(id)}
            size="large" 
          >
          編輯
          </Button>
        </>
      )
    },
  ];

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
            >
              <Link to="/theaterEdit">新增影城</Link>
          </Button>
          <Table 
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={tadate}
            columns={columns}
            rowKey='_id'
            className="custom-table"
          />
        </>
      }
      </div>
    </Content>
  )
}
export default Theater
