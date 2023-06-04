import { Button, Table, Divider, Typography, Card, Col, DatePicker, Form, Row, Select, Space, Tag } from "antd"
import { useEffect, useState } from "react";
import { apiTheater } from '@/api';
import TheaterEdit from './Components/TheaterEdit'

const { Title } = Typography;
const { getTheaterList } = apiTheater
const Theater = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // useEffect(() => {
  //   // getTheaterList().then(i=>{
  //   //   console.log(i)
  //   // })
  // }, [])
  let aaa = (row, i) => {
    console.log(row, i)
  }

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
      render: (row, i) => (
        <>
          <Button className="me-3">新增影廳</Button>
          <Button onClick={()=>{aaa(row, i)}}>編輯</Button>
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
        {/* <TheaterEdit />  */}
      </>
      :
      <>
        {/* <Button
            className="float-end m-3"
            size="large"
            onClick={()=>{setIsModalOpen(true)}}
          >
        新增影城
        </Button> */}
        {/* <div className="row justify-content-end align-items-end"> */}
        <Row justify="end" align="middle">
            <Title style={{ margin: 0 }} align="top" level={4}>影廳選擇</Title>
          <Col span={5} offset={1}>
            <Select
              alias="top"
              style={{ width: 400 }}
              showSearch
              size="large"
              placeholder="Select a person"
              optionFilterProp="children"
              // onChange={onChange}
              // onSearch={onSearch}
              // filterOption={(input, option) =>
              //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              // }
              // options={[
              //   {
              //     value: 'jack',
              //     label: 'Jack',
              //   },
              //   {
              //     value: 'lucy',
              //     label: 'Lucy',
              //   },
              //   {
              //     value: 'tom',
              //     label: 'Tom',
              //   },
              // ]}
            />
          </Col>
        </Row>

        {/* <Table 
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={data}
          columns={columns}
        /> */}
      </>
    }
  </div>
  )
}
export default Theater
