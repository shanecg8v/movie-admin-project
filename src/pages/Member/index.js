
import { Button, Form, Input, Modal, Table } from 'antd';
import { useContext, useEffect, useState, createContext, useRef } from 'react';
import MemberInfo from './Components/info';
import { apiMemberGetAll, apiMemberAdd, apiMemberRemove, apiMemberUpdate, apiMovieGetAll, apiMovieAdd, apiMovieUpdate, apiMovieRemove } from '../../api';
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
      apiMemberUpdate(editData._id, editData)
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
    </div>
  );
};

export default MemberManager