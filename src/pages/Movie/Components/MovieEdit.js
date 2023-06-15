import { Button, DatePicker, Form, Input, InputNumber, Select, Switch, Upload } from 'antd';
import { apiMovieAdd, apiMovieUpdate } from '../../../api';
import dayjs from 'dayjs';
import { FormListAdapter, validateRequire } from '../../Member/Components/info';
import { InboxOutlined } from '@ant-design/icons'

const validateArray = {
  validator: (sender, value) => {
    if (Array.isArray(value) && value.length == 0) return Promise.reject('此欄位不可為空白');
    return Promise.resolve();
  }, required: true
}

const UploadVideo = () => {
  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append('video', file);
    console.log('file:', file);
    console.log('formData:', formData);
    // 將影片檔案上傳到後端
    // 使用 fetch 或其他 Ajax 方法發送 POST 請求
    fetch('http://localhost:3000/upload-video', {
      method: 'POST',
      body: formData,
      contentType: 'application/json'
    })
      .then(response => response.json())
      .then(data => {
        console.log('影片上傳成功:', data);
      })
      .catch(error => {
        console.log('影片上傳失敗:', error);
      });
  };

  const handleBeforeUpload = (file) => {
    console.log('handleBeforeUpload:file', file)
    // 檢查是否已有上傳的影片
    const isUploaded = file.status === 'done' || file.status === 'uploading';

    // 如果已有上傳的影片，阻止新的上傳
    if (isUploaded) {
      console.log('handleBeforeUpload', '阻止上傳')
      return false;
    }

    // 返回 true 允許上傳
    console.log('handleBeforeUpload', '允許上傳')
    return true;
  };

  const onChange = (info) => {
    console.log('onChange', info);
    if (info.file.status === 'done') {
      console.log('影片上傳完成:'/*, info.file.response*/);
      handleUpload(info.file.originFileObj)
    }
  }

  const uploadProps = {
    name: 'video',
    action: 'http:localhost:3000/upload-video',
    method: 'POST',
    multiple: false, // 只能上傳一部影片
    beforeUpload: handleBeforeUpload,
    onChange: onChange
  };

  return (
    <Upload.Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">點擊或拖放文件到此區域上傳</p>
      <p className="ant-upload-hint">支援單一影片上傳</p>
    </Upload.Dragger>
  );
};

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

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} layout="horizontal" onFinish={onFinish}>
      <Form.Item label="是否上架" name="isAvaliableL" initialValue={data.isAvaliableL || false} rules={[validateRequire]} hasFeedback={true}>
        <Switch />
      </Form.Item>
      <Form.Item label="電影海報url" name="imgUrl" initialValue={data.imgUrl} rules={[validateRequire]} hasFeedback={true}>
        <Input />
      </Form.Item>

      <Form.Item label="電影預告片url" name="videoUrl" initialValue={data.videoUrl} rules={[validateRequire]} hasFeedback={true}>
        <Input />
      </Form.Item>

      <Form.Item label="Dragger" valuePropName='fileList' getValueFromEvent={normFile}>
        <UploadVideo />
      </Form.Item>

      <Form.Item label="電影中文名稱" name="movieCName" initialValue={data.movieCName} rules={[validateRequire]} hasFeedback={true}>
        <Input />
      </Form.Item>
      <Form.Item label="電影英文名稱" name="movieEName" initialValue={data.movieEName} rules={[validateRequire]} hasFeedback={true}>
        <Input />
      </Form.Item>
      <Form.Item label="導演" name="director" initialValue={data.director} rules={[validateRequire]} hasFeedback={true}>
        <Input />
      </Form.Item>

      <Form.Item label="卡司" required>
        <Form.List name="cast" initialValue={data.cast} rules={[validateArray]} hasFeedback={true}>
          {(fields, operation, errors) => <FormListAdapter params={{ fields, operation, errors, getDatas: getCast, validator:{rules:[validateRequire], hasFeedback:true} }} />}
        </Form.List>
      </Form.Item>

      <Form.Item label="上映時間" name="inTheatersTime" initialValue={data.inTheatersTime != undefined && data.outOfTheatersTime != undefined ? [dayjs(data.inTheatersTime), dayjs(data.outOfTheatersTime)] : undefined} rules={[validateRequire]} hasFeedback={true}>
        <DatePicker.RangePicker format='YYYY/MM/DD HH:mm:ss' showTime={true} placeholder={['上映時間', '下檔時間']} />
      </Form.Item>
      <Form.Item label="電影時間" name="movieTime" initialValue={data.movieTime} rules={[validateRequire]} hasFeedback={true}>
        <InputNumber placeholder='單位:分鐘' min={0} />
      </Form.Item>
      <Form.Item label="電影分級" name="rating">
        <Select defaultValue={data.rating || 'G'}>
          <Select.Option value="G">普通級G</Select.Option>
          <Select.Option value="PG">輔導級PG</Select.Option>
          <Select.Option value="R">限制級R</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="概要" name="synopsis" initialValue={data.synopsis} rules={[validateRequire]} hasFeedback={true}>
        <Input.TextArea rows={4} />
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