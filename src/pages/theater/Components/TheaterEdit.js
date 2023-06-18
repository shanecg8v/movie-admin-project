import { Button, message, Input, Form, Upload } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { apiTheater } from "@/api";
import { useNavigate  } from "react-router-dom";


const { postTheater, postTheaterImg } = apiTheater;
const { TextArea } = Input;

const TheaterEdit = (props) => {

  const navigate = useNavigate();
  const { isEditMode, initialValues } = props

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = async (values) => {

    const { img } = values;  
    
    if(Array.isArray(img)) {

      const formData = new FormData();

      img.forEach((file) => {
        formData.append('file', file.originFileObj);
      });

      const { data:{ fileUrl } } = await postTheaterImg(formData)
      delete values.fileList
      values.img = fileUrl
    }


    try {
      await postTheater(values)
    } catch (error) {
      message.error('新增失敗')
      return console.log('error', error) 
    }

    message.success("新增成功");
    navigate('/theater');

  }

  return (
    <>
      <div className="input-tb">
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
            // initialValue={address}
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
          <Form.Item name="img" label="Upload" valuePropName="img" getValueFromEvent={normFile}>
            <Upload 
              action="/upload.do" 
              listType="picture-card"
              defaultFileList={isEditMode ? [{ url: initialValues.img }] : []}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item 
            name="mapUrl"
            label={<span className="fs-5">地圖</span>}
            rules={[{ required: true, message: 'Please input your mapUrl!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="description"
            label={<span className="fs-5">說明</span>}
            rules={[{ required: true, message: 'Please input your description!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item 
            name="traffic"
            label={<span className="fs-5">交通</span>}
            rules={[{ required: true, message: 'Please input traffic!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 16  }}>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  size="large"
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