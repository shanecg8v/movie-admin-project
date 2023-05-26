import { Button, Table, Divider, Input, Card, Col, DatePicker, Form, Row, Select, Space, Tag, Upload } from "antd"
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const TheaterEdit = () => {
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

    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };
  return (
    <>
    {/*  */}
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
        // name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        // initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        // autoComplete="off"
      >
        <Form.Item 
          label={<span className="fs-5">影城</span>}
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label={<span className="fs-5">地址</span>}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item 
          label={<span className="fs-5">照片</span>}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item> */}
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
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
           <Button type="primary" htmlType="submit">
              Submit
          </Button>
          <Button type="primary" htmlType="submit">
              Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    {/*  */}
    </>
  )
}


export default TheaterEdit