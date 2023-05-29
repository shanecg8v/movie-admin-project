
import { Button, Form, Input, Modal, Table } from 'antd';
import { useContext, useEffect, useState, createContext, useRef } from 'react';
import MemberInfo from './Components/info';
import { apiMemberGetAll, apiMemberAdd, apiMemberRemove, apiMemberUpdate, apiMovieGetAll, apiMovieAdd, apiMovieUpdate, apiMovieRemove } from '../../api';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { selectMember, setMember, setMembers } from '../../store/slice/memberSlice';

const EditableContext = createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => { if (editing) inputRef.current.focus(); }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex], });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values, });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ?
      <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[{ required: true, message: `${title} is required.` }]}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item> :
      <div className="editable-cell-value-wrap" onClick={toggleEdit} >
        {children}
      </div>
  }
  return <td {...restProps}>{childNode}</td>;
};

const MemberManager = () => {
  useEffect(() => {
    Cookies.set(`${process.env.REACT_APP_NAME}_token`, encodeURIComponent('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImExM1haQGdtYWlsLmNvbSIsImlhdCI6MTY4NTE4NTE1OSwiZXhwIjoxNjg1Nzg5OTU5fQ.0xXKOKSQvw85uXWdDTPzWXGPLlv8zPfByaxI_XrgFJo'), { expires: 7, path: '/' })

    apiMemberGetAll(1, 10)
      .then(e => {
        const data = e?.data.data.map((d, i) => {
          return {
            ...d,
            key: i
          }
        })
        updateMembers(data)
      })
      .catch(e => console.log('err', e))
  }, [])

  const [userIndex, setUserIndex] = useState(-1);
  const defaultColumns = [
    {
      title: <div style={{ textAlign: 'center' }}>帳號</div>,
      dataIndex: 'email',
      render: (data) => <div style={{ textAlign: 'center' }}>{data}</div>
    },
    {
      title: <div style={{ textAlign: 'center' }}>姓名</div>,
      dataIndex: 'name',
      render: (data) => <div style={{ textAlign: 'center' }}>{data}</div>
    },
    {
      title: <div style={{ textAlign: 'center' }}>會員權限</div>,
      dataIndex: 'roles',
      render: (data) => <div style={{ textAlign: 'center' }}>{data.includes('admin') ? '後臺管理員' : '一般會員'}</div>
    },
    {
      title: <div style={{ textAlign: 'center' }}>編輯</div>,
      dataIndex: 'operation',
      render: (_, record) =>
        rdData.length >= 1 ? (<div style={{ textAlign: 'center' }}>
          <a onClick={() => { setUserIndex(record.key) }}>編輯</a></div>
        ) : null,
    },
  ];
  const components = { body: { row: EditableRow, cell: EditableCell } };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) return col;
    else return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  //------------------------------------redux
  const rdData = useSelector(selectMember)
  const dispatch = useDispatch()
  const updateMembers = (data) => {
    dispatch(setMembers(data))
  }
  let editData
  const setEditData = (d) => { editData = d }
  const modalOk = () => {
    console.log('modalOk', editData)
    if (editData != undefined) {
      apiMemberUpdate(editData._id, {
        email: editData.email,
        enable: editData.roles.includes('admin')
      })
        .then(e => console.log('7-4T', e?.data.data))
        .catch(e => console.log('7-4F', e.response.data))
      dispatch(setMember(editData))
    }
    editData = undefined
    setUserIndex(-1)
  }
  const modalCancel = () => {
    console.log('modalCancel')
    setUserIndex(-1)
    editData = undefined
  }

  return (
    <div style={{ margin: "auto 5%", width: '90%' }}>
      <div>會員列表</div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" style={{ marginBottom: 16 }} >新增會員</Button>
      </div>
      <Table components={components} rowClassName={() => 'editable-row'} bordered dataSource={rdData} columns={columns} />
      <Modal width={'80%'} open={userIndex > -1} onCancel={modalCancel} onOk={modalOk} key={userIndex}>
        <MemberInfo index={userIndex} setData={setEditData} />
      </Modal>
      <Button onClick={api72}>7-2</Button>
      <Button onClick={api76}>7-6</Button>
    </div>
  );
};

const api72 = () => {//page,nums
  apiMemberGetAll(1, 10)
    .then(e => console.log('7-2T', e?.data.data))
    .catch(e => console.log('7-2F', e))
}
const api73 = () => {//postData
  apiMemberAdd({
    name: "王曉明Aaac",
    email: "abcAaaC@abc.com",
    password: "00000000",
    mobile: "0987654321",
    hobby: [""],
    birth: "2023-05-01T10:21:22.164+00:00",
    enable: true
  })
    .then(e => console.log('7-3T', e?.data.data))
    .catch(e => console.log('7-3F', e.response.data))
}
const api74 = () => {//DB id,postData 沒有可以變更權限的欄位
  apiMemberUpdate('646b7be64d4e376cee8090fd', {
    name: "王曉明A",
    email: "abcaXac@abc.com",
    password: "00000000",
    mobile: "0987654324",
    hobby: [""],
    birth: "2023-05-01T10:21:22.164+00:00",
    enable: true
  })
    .then(e => console.log('7-4T', e?.data.data))
    .catch(e => console.log('7-4F', e.response.data))
}
const api75 = () => {//DB id
  apiMemberRemove('646b7be64d4e376cee8090fd')
    .then(e => console.log('7-5T', e?.data.data))
    .catch(e => console.log('7-5F', e.response.data))
}
const api76 = () => {//page,nums
  apiMovieGetAll(1, 10)
    .then(e => console.log('7-6T', e?.data.data))
    .catch(e => console.log('7-6F', e.response.data))
}
const api77 = () => {//postData
  apiMovieAdd({
    "isAvaliableL": "true",
    "imgUrl": "img_url",
    "movieCName": "鬼滅NNN",
    "movieEName": "ABC",
    "director": "程偉豪X",
    "cast": [
      "許光漢",
      "林柏宏",
      "王淨",
      "蔡振南",
      "王滿嬌",
      "庹宗華",
      "馬念先"
    ],
    "inTheatersTime": "2022-03-16",
    "outOfTheatersTime": "2022-03-16",
    "movieTime": "125",
    "rating": "G",
    "synopsis": "恐同男警吳明翰 (許光漢 飾) ，誤撿地上紅包，沒想到紅包裡的對象是個男的 (林柏宏 飾) ！被迫男男冥婚的明翰，一路衰到底，不但甩不掉冥婚對象，就連警花林子晴 (王淨 飾) 埋線已久的緝毒案，都被他搞砸。為了挽救危機，恐同又怕鬼的明翰，別無選擇，即使人鬼殊途也要和鬼老公毛毛攜手跨界追兇，一場荒謬絕倫、笑中帶淚的旅程就此展開！",
    "videoUrl": "ssss"
  })
    .then(e => console.log('7-7T', e?.data.data))
    .catch(e => console.log('7-7F', e.response.data))
}
const api78 = () => {//DB id,postData
  apiMovieUpdate('646b801a4d4e376cee809128', {
    "isAvaliableL": "true",
    "imgUrl": "img_url",
    "movieCName": "鬼滅",
    "movieEName": "ABCDDDD",
    "director": "程偉豪X",
    "cast": [
      "許光漢",
      "林柏宏",
      "王淨",
      "蔡振南",
      "王滿嬌",
      "庹宗華",
      "馬念先"
    ],
    "inTheatersTime": "2022-03-16",
    "outOfTheatersTime": "2022-03-16",
    "movieTime": "125",
    "rating": "G",
    "synopsis": "恐同男警吳明翰 (許光漢 飾) ，誤撿地上紅包，沒想到紅包裡的對象是個男的 (林柏宏 飾) ！被迫男男冥婚的明翰，一路衰到底，不但甩不掉冥婚對象，就連警花林子晴 (王淨 飾) 埋線已久的緝毒案，都被他搞砸。為了挽救危機，恐同又怕鬼的明翰，別無選擇，即使人鬼殊途也要和鬼老公毛毛攜手跨界追兇，一場荒謬絕倫、笑中帶淚的旅程就此展開！",
    "videoUrl": "ssss"
  })
    .then(e => console.log('7-8T', e?.data.data))
    .catch(e => console.log('7-8F', e.response.data))
}
const api79 = () => {//DB id
  apiMovieRemove('646b801a4d4e376cee809128')
    .then(e => console.log('7-9T', e?.data.data))
    .catch(e => console.log('7-9F', e.response.data))
}



export default MemberManager
