import { Button, DatePicker, Form, Input, InputNumber, Select, Switch } from 'antd';
import { useSelector } from 'react-redux';
import { selectMovie, } from '../../../store/slice/movieSlice';
import { apiMovieAdd, apiMovieUpdate } from '../../../api';
import dayjs from 'dayjs';
import { FormListAdapter } from '../../Member/Components/info';

const { RangePicker } = DatePicker;
const MovieEdit = ({ index, cancelHandler, isAdd }) => {
  const [form] = Form.useForm();
  let editMovie = useSelector(selectMovie)[index]

  const onFinish = async (values) => {
    const result = isAdd ? {} : { ...editMovie }
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
    if (isAdd) {
      await apiMovieAdd(result)
        .then(e => cancelHandler(-1))
    } else {
      await apiMovieUpdate(editMovie._id, result)
        .then(e => cancelHandler(-1))
    }
  };

  editMovie = isAdd ? {} : editMovie
  const getCast = () => form.getFieldValue('cast')?.filter(c => c != undefined && c != '')
  console.log(form)

  return (
    <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} layout="horizontal" onFinish={onFinish}>
      <Form.Item label="是否上架" name="isAvaliableL">
        <Switch defaultChecked={editMovie.isAvaliableL} />
      </Form.Item>
      <Form.Item label="電影海報url" name="imgUrl">
        <Input defaultValue={editMovie.imgUrl} />
      </Form.Item>
      <Form.Item label="電影預告片url" name="videoUrl">
        <Input defaultValue={editMovie.videoUrl} />
      </Form.Item>
      <Form.Item label="電影中文名稱" name="movieCName">
        <Input defaultValue={editMovie.movieCName} />
      </Form.Item>
      <Form.Item label="電影英文名稱" name="movieEName">
        <Input defaultValue={editMovie.movieEName} />
      </Form.Item>
      <Form.Item label="導演" name="director">
        <Input defaultValue={editMovie.director} />
      </Form.Item>

      <Form.Item label="卡司" style={{ marginBottom: 0 }}>
      <Form.List name="cast" initialValue={editMovie.cast}>
        {(fields, operation) => <FormListAdapter params={{ fields, operation, getDatas: getCast, label: '卡司' }} />}
      </Form.List>
      </Form.Item>

      <Form.Item label="上映時間" name="inTheatersTime">
        <RangePicker format='YYYY/MM/DD HH:mm:ss' showTime={true} placeholder={['上映時間', '下檔時間']} defaultValue={editMovie.inTheatersTime != undefined && editMovie.outOfTheatersTime != undefined ? [dayjs(editMovie.inTheatersTime), dayjs(editMovie.outOfTheatersTime)] : undefined} />
      </Form.Item>
      <Form.Item label="電影時間" name="movieTime">
        <InputNumber defaultValue={editMovie.movieTime} placeholder='單位:分鐘' />
      </Form.Item>
      <Form.Item label="電影分級" name="rating">
        <Select defaultValue={editMovie.rating}>
          <Select.Option value="G">普通級G</Select.Option>
          <Select.Option value="PG">輔導級PG</Select.Option>
          <Select.Option value="R">限制級R</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="概要" name="synopsis">
        <Input.TextArea defaultValue={editMovie.synopsis} rows={4} />
      </Form.Item>
      <Form.Item wrapperCol>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button style={{ marginRight: 20 }} onClick={cancelHandler}>取消</Button>
          <Button htmlType="submit">儲存</Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default MovieEdit