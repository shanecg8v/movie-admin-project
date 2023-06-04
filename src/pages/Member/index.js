
import { Button, Col, Form, Input, Modal, Row, Table } from 'antd';
import { useContext, useEffect, useState, createContext, useRef } from 'react';
import MemberInfo from './Components/info';
import { apiMemberGet, apiMemberAdd, apiMemberRemove, apiMemberUpdate } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { addMembers, selectMember, setMember, setMembers } from '../../store/slice/memberSlice';

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
  const pageSize = 5
  useEffect(() => {
    apiMemberGet(1, pageSize * 2)
      .then(e => {
        const data = e?.data.data.map((d, i) => {
          return {
            ...d,
            key: i
          }
        })
        updateMembers(data)
      })
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
  const rdData = useSelector(selectMember)
  const dispatch = useDispatch()
  const updateMembers = (data) => {
    dispatch(setMembers(data))
  }
  let editData
  const setEditData = (d) => { editData = d }
  const modalOk = async () => {
    if (editData != undefined) {
      if (userIndex >= rdData.length) {
        await apiMemberAdd(editData)
          .then(e => {
            dispatch(addMembers([editData]))
            modalClose()
          })
      } else {
        await apiMemberUpdate(editData._id, editData)
          .then(e => {
            dispatch(setMember(editData))
            modalClose()
          })
      }
    }
  }
  const modalClose = () => {
    setUserIndex(-1)
    editData = undefined
  }

  const pageChange = (current, pageSize) => {
    if (rdData.length - current * pageSize != 0) return
    apiMemberGet(current + 1, pageSize)
      .then(e => {
        const data = e?.data.data.map((d, i) => {
          return {
            ...d,
            key: current * pageSize + i
          }
        })
        dispatch(addMembers(data))
      })
  }

  return (
    <div style={{ margin: "auto 5%", width: '90%' }}>
      <div>會員列表</div>
      <Row justify='end' style={{ marginBottom: 16 }}>
        <Col><Button type="primary" onClick={()=>setUserIndex(rdData.length)}>新增會員</Button></Col>
      </Row>
      <Table components={components} rowClassName={() => 'editable-row'} bordered dataSource={rdData} columns={columns} pagination={{ pageSize, onChange: pageChange }} />
      <Modal width={'80%'} open={userIndex > -1} onCancel={modalClose} onOk={modalOk} key={userIndex}>
        <MemberInfo index={userIndex} setData={setEditData} isAdd={userIndex >= rdData.length} />
      </Modal>
    </div>
  );
};

export default MemberManager