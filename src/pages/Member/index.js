
import { Button, Col, Modal, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import MemberInfo from './Components/info';
import { apiMemberGet, apiMemberAdd, apiMemberRemove, apiMemberUpdate } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { addMembers, selectMember, setMember, setMembers } from '../../store/slice/memberSlice';

const MemberManager = () => {
  const pageSize = 5
  useEffect(() => {
    apiMemberGet(1, pageSize * 2, undefined, 'asc')
      .then(e => {
        const data = e?.data.data.map((d, i) => {
          return { ...d, key: i }
        })
        dispatch(setMembers(data))
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
      render: (data) => <div style={{ textAlign: 'center' }}>{data?.includes('admin') ? '後臺管理員' : data?.includes('user') ? '一般會員' : '無'}</div>
    },
    {
      title: <div style={{ textAlign: 'center' }}>編輯</div>,
      dataIndex: 'operation',
      render: (_, record) =>
        rdData.length >= 1 ? (<div style={{ textAlign: 'center', color: 'blue' }}>
          <a onClick={() => { console.log(record); setUserIndex(record.key) }}>編輯</a></div>
        ) : null,
    },
  ];
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
  let editData
  const setEditData = (d) => { editData = d }
  const modalOk = async () => {
    if (editData != undefined) {
      if (userIndex >= rdData.length) {
        await apiMemberAdd(editData)
          .then(e => {
            const data = { ...editData, key: rdData.length }
            dispatch(addMembers([data]))
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
        <Col><Button type="primary" onClick={() => setUserIndex(rdData.length)}>新增會員</Button></Col>
      </Row>
      <Table rowClassName={() => 'editable-row'} bordered dataSource={rdData} columns={columns} pagination={{ pageSize, onChange: pageChange }} />
      <Modal width={'80%'} open={userIndex > -1} onCancel={modalClose} onOk={modalOk} key={userIndex}>
        <MemberInfo index={userIndex} setData={setEditData} isAdd={userIndex >= rdData.length} />
      </Modal>
    </div>
  );
};

export default MemberManager