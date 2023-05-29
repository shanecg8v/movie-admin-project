import { Button, DatePicker, Form, Input, InputNumber, Radio, Select, Switch } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { selectMovie } from '../../../store/slice/movieSlice';
import moment from 'moment/moment';

const { RangePicker } = DatePicker;
const MovieEdit = ({index, cancelHandler}) => {
  const editMovie = useSelector(selectMovie)[index]

  const onFinish = (values) => {
    console.log('表单提交:', values);
    // 在这里可以对表单数据进行处理或发送到后端
  };

  const onFinishFailed = (errorInfo) => {
    console.log('表单提交失败:', errorInfo);
  };

  return (
    <Form labelCol={{span: 4}} wrapperCol={{span: 20}} layout="horizontal" onFinish = {onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item label="是否上架" name="isAvaliable">
        <Switch defaultChecked={editMovie.isAvaliableL}/>
      </Form.Item>
      <Form.Item label="電影海報url" name="imgUrl">
        <Input defaultValue={editMovie.imgUrl}/>
      </Form.Item>
      <Form.Item label="電影預告片url" name="videoUrl">
        <Input defaultValue={editMovie.videoUrl}/>
      </Form.Item>
      <Form.Item label="電影中文名稱" name="movieCName">
        <Input defaultValue={editMovie.movieCName}/>
      </Form.Item>
      <Form.Item label="電影英文名稱" name="movieEName">
        <Input defaultValue={editMovie.movieEName}/>
      </Form.Item>
      <Form.Item label="導演" name="director">
        <Input defaultValue={editMovie.director}/>
      </Form.Item>
      <Form.Item label="卡司" name="cast">
        <Input defaultValue={editMovie.cast.toString()} placeholder='請以","分隔'/>
      </Form.Item>
      <Form.Item label="上映時間" name="inTheatersTime">
        <RangePicker format='YYYY/MM/DD HH:mm:ss' showTime={true} placeholder={['上映時間','下檔時間']} defaultValue={[moment('2023-04-27'),moment('2023-04-28')]}/>
      </Form.Item>
      <Form.Item label="電影時間" name="movieTime">
        <InputNumber defaultValue={editMovie.movieTime} placeholder='單位:分鐘'/>
      </Form.Item>
      <Form.Item label="電影分級" name="rating">
        <Select defaultValue={editMovie.rating}>
          <Select.Option value="G">普通級G</Select.Option>
          <Select.Option value="PG">輔導級PG</Select.Option>
          <Select.Option value="R">限制級R</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="概要???" name="synopsis">
        <ReactQuill value={editMovie.synopsis}/>
      </Form.Item>
      <Form.Item wrapperCol>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button style={{marginRight:20}} onClick={cancelHandler}>取消</Button>
        <Button  htmlType="submit">儲存</Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default MovieEdit