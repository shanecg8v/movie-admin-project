import { Button, DatePicker, Form, Input, InputNumber, Select, Switch } from 'antd';
import { apiMovieAdd, apiMovieUpdate } from '../../../api';
import dayjs from 'dayjs';
import { FormListAdapter, validateRequire } from '../../Member/Components/info';

const MovieEdit = ({ data, onClose }) => {
  const isAdd = data._id == undefined
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const result = isAdd ? {} : { ...data }
    for (let key in values) {
      if (values[key] !== undefined) {
        result[key] = values[key];
      }
    }

    result.cast = getCast()
    if (Array.isArray(result.inTheatersTime)) {
      result.outOfTheatersTime = result.inTheatersTime[1].toISOString()
      result.inTheatersTime = result.inTheatersTime[0].toISOString()
    }
    result.isAvaliableL = result.isAvaliableL ? result.isAvaliableL?.toString() : 'false'
    result.movieTime = result.movieTime?.toString()

    console.log('onFinish', result)
    if (isAdd) {
      await apiMovieAdd(result)
        .then(e => onClose())
    } else {
      await apiMovieUpdate(data._id, result)
        .then(e => onClose())
    }
  };

  data = isAdd ? {} : data
  const getCast = () => form.getFieldValue('cast')?.filter(c => c != undefined && c != '')

  const onF = (p1)=>{
    console.log('onFinishFailed' ,p1)
  }

  return (
    <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} layout="horizontal" onFinish={onFinish} onFinishFailed={onF}>
      <Form.Item label="是否上架" name="isAvaliableL" initialValue={data.isAvaliableL || false} rules={[validateRequire]} hasFeedback={true}>
        <Switch/>
      </Form.Item>
      <Form.Item label="電影海報url" name="imgUrl" initialValue={data.imgUrl} rules={[validateRequire]} hasFeedback={true}>
        <Input/>
      </Form.Item>

      <Form.Item label="電影預告片url" name="videoUrl" initialValue={data.videoUrl} rules={[validateRequire]} hasFeedback={true}>
        <Input/>
      </Form.Item>

      <Form.Item label="電影中文名稱" name="movieCName" initialValue={data.movieCName} rules={[validateRequire]} hasFeedback={true}>
        <Input/>
      </Form.Item>
      <Form.Item label="電影英文名稱" name="movieEName" initialValue={data.movieEName} rules={[validateRequire]} hasFeedback={true}>
        <Input/>
      </Form.Item>
      <Form.Item label="導演" name="director" initialValue={data.director} rules={[validateRequire]} hasFeedback={true}>
        <Input/>
      </Form.Item>

      <Form.Item label="卡司" required>
      <Form.List name="cast" initialValue={data.cast} rules={[validateRequire]}>
        {(fields, operation, errors) => <FormListAdapter params={{ fields, operation, errors, getDatas: getCast }} />}
      </Form.List>
      </Form.Item>

      <Form.Item label="上映時間" name="inTheatersTime" initialValue={data.inTheatersTime != undefined && data.outOfTheatersTime != undefined ? [dayjs(data.inTheatersTime), dayjs(data.outOfTheatersTime)] : undefined} rules={[validateRequire]} hasFeedback={true}>
        <DatePicker.RangePicker format='YYYY/MM/DD HH:mm:ss' showTime={true} placeholder={['上映時間', '下檔時間']}/>
      </Form.Item>
      <Form.Item label="電影時間" name="movieTime" initialValue={data.movieTime} rules={[validateRequire]} hasFeedback={true}>
        <InputNumber placeholder='單位:分鐘' />
      </Form.Item>
      <Form.Item label="電影分級" name="rating">
        <Select defaultValue={data.rating || 'G'}>
          <Select.Option value="G">普通級G</Select.Option>
          <Select.Option value="PG">輔導級PG</Select.Option>
          <Select.Option value="R">限制級R</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="概要" name="synopsis" initialValue={data.synopsis} rules={[validateRequire]} hasFeedback={true}>
        <Input.TextArea rows={4}/>
      </Form.Item>
      <Form.Item wrapperCol>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button style={{ marginRight: 20 }} onClick={onClose}>取消</Button>
          <Button htmlType="submit">儲存</Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default MovieEdit