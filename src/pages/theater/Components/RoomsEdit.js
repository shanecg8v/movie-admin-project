import { Button, Table, Divider, Input, Card, Col, DatePicker, Form, Row, Select, Space, Tag, Upload } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { apiTheater } from "@/api";
import { useEffect, useState } from "react";
import _ from 'lodash'


const { postAddRoom, getTheaterList, getRoomTemplate } = apiTheater;


const RoomsEdit = (props) => {

  const { isEditMode, initialValues } = props
  const [options, setOptions] = useState(false)
  const [roomsOpt, setRoomsOpt] = useState(false)
  const [ticketOpt, setticketOpt] = useState(false)  

  const typeOpt = [
    {label: '數位 2D', value: '數位 2D'},
    {label: '數位 3D', value: '數位 3D'},
    {label: 'IMAX', value: 'IMAX'},
  ]

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
    getRoomTemplate().then(({data:{data: { seats, ticketTypes}}})=>{
   
      const temp = _.map(seats, item => {
        return {
          ...item,
          label: item.name,
          value: item._id
        }
      })
      setRoomsOpt(temp)
      const tempTicket = _.map(ticketTypes, item => {
        return {
          ...item,
          label: item.name,
          value: item._id
        }
      })
      setticketOpt(tempTicket)
    })
  }, [])

  const onFinish = async (values) => {
    console.log(values)

    const aaa = await postAddRoom(values)

    console.log(555, aaa)

    
    // const { img } = values;  
    
    // if(Array.isArray(img)) {

    //   const formData = new FormData();

    //   img.forEach((file) => {
    //     formData.append('file', file.originFileObj);
    //   });

    //   const { data:{ fileUrl } } = await postTheaterImg(formData)
    //   delete values.fileList
    //   values.img = fileUrl
    // }


    // const { data:{data} } = await postTheater({
    //   date: {
    //     ...values
    //   }
    // })
  }

  return (
    <>
      <div className="border m-5">
        <Form
          initialValues={isEditMode ? initialValues : {}}
          className="m-5"
          labelCol = {{ 
            span: 5,  
          }}
          wrapperCol = {{ 
            span: 12,
            offset: 1, 
            flex: 1,
          }}
          onFinish={onFinish}
        >
          <Form.Item 
            name="theaterId"
            label={<span className="fs-5">影城選擇</span>}
            rules={[{ required: true }]}
          >
            <Select
              alias="top"
              style={{ width: 300 }}
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              // onChange={onChange}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={options}
            />
          </Form.Item>
          <Form.Item 
            name="name"
            label={<span className="fs-5">影廳名稱</span>}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="type"
            label={<span className="fs-5">影廳類型</span>}
            rules={[{ required: true }]}
          >
            <Select
              alias="top"
              style={{ width: 300 }}
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              // onChange={onChange}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={typeOpt}
            />
          </Form.Item>
          <Form.Item 
            name="ticketTypeIds"
            label={<span className="fs-5">可售票種</span>}
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              alias="top"
              style={{ width: 300 }}
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              // onChange={onChange}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={ticketOpt}
            />
          </Form.Item>
          <Form.Item 
            name="seatExampleId"
            label={<span className="fs-5">座位表</span>}
            rules={[{ required: true }]}
          >
            <Select
              alias="top"
              style={{ width: 300 }}
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              // onChange={onChange}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={roomsOpt}
            />
          </Form.Item>
        
          <Form.Item 
            label=' '
          >
              <Button 
                type="primary" 
                htmlType="submit"
              >
                新增
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}



export default RoomsEdit