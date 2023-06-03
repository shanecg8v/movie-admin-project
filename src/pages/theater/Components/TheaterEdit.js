import { Button, Table, Divider, Input, Card, Col, DatePicker, Form, Row, Select, Space, Tag, Upload } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { apiTheater } from "@/api";


const { postTheater, postTheaterImg } = apiTheater;
const { TextArea } = Input;

const TheaterEdit = () => {

    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };
    const onFinish = async (values) => {
      
      console.log(values)
      const { fileList } = values;  
      const formData = new FormData();

      fileList.forEach((file) => {
        formData.append('file', file.originFileObj);
      });

      const { data:{ fileUrl } } = await postTheaterImg(formData)

      delete values.fileList
      values.img = fileUrl

      const { data:{data} } = await postTheater({
        date: {
          ...values
        }
      })
    }

  return (
    <>
      <div className="border m-5">
        <Form
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
            name="name"
            label={<span className="fs-5">影城</span>}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="address"
            label={<span className="fs-5">地址</span>}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="phone"
            label={<span className="fs-5">電話</span>}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="fileList" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload 
              action="/upload.do" 
              listType="picture-card"
              // beforeUpload={beforeUpload}
              // onChange={handleChange}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item 
            label={<span className="fs-5">說明</span>}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item 
            label={<span className="fs-5">交通</span>}
          >
            <TextArea rows={4} />
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
            {/* <Button type="primary" htmlType="submit">
                Submit
            </Button> */}
          </Form.Item>
        </Form>
      </div>
    </>
  )
}



export default TheaterEdit