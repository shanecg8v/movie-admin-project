import { Button, DatePicker, Form, Input, InputNumber, Radio, Select, Switch } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const MovieEdit = ({cancelHandler}) => {
  const onFinish = (values) => {
    console.log('表单提交:', values);
    // 在这里可以对表单数据进行处理或发送到后端
  };

  const onFinishFailed = (errorInfo) => {
    console.log('表单提交失败:', errorInfo);
  };

  return (
    <Form 
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      wrapperCol={{ span: 20}}
      style={{
        width:'100%'
      }}
      onFinish = {onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="是否上架" name="isAvaliable">
        <Switch />
      </Form.Item>
      <Form.Item label="電影海報url" name="imgUrl">
        <Input />
      </Form.Item>
      <Form.Item label="電影預告片url" name="videoUrl">
        <Input />
      </Form.Item>
      <Form.Item label="電影中文名稱" name="movieCName">
        <Input />
      </Form.Item>
      <Form.Item label="電影英文名稱" name="movieEName">
        <Input />
      </Form.Item>
      <Form.Item label="導演" name="director">
        <Input />
      </Form.Item>
      <Form.Item label="卡司" name="cast">
        <Input placeholder='請以","分隔'/>
      </Form.Item>
      <Form.Item label="上映時間????" name="inTheatersTime">
        <RangePicker/>
      </Form.Item>
      <Form.Item label="電影時間" name="movieTime">
        <InputNumber placeholder='單位:分鐘'/>
      </Form.Item>
      <Form.Item label="電影分級" name="rating">
        <Select>
          <Select.Option value="demo">普通級G</Select.Option>
          <Select.Option value="demo">輔導級PG</Select.Option>
          <Select.Option value="demo">限制級R</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="概要" name="synopsis">
        <ReactQuill/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 20}}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button style={{marginRight:20}} onClick={()=>cancelHandler(false)}>取消</Button>
        <Button  htmlType="submit">儲存</Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default MovieEdit