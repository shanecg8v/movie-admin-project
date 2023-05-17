
import { Button, Col, Form, Input, Modal, Popconfirm, Row, Table } from 'antd';
import { useContext, useEffect, useRef, useState, createContext } from 'react';
import MemberInfo from './Components/info';
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
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const MemberManager = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      email: 'aaa@CineK.com',
      nickName: 'alixe',
      permission: '一般會員'
    }, {
      key: '1',
      email: 'aaBa@CineK.com',
      nickName: 'alixeA',
      permission: '一般會員'
    }, {
      key: '2',
      email: 'aaaC@CineK.com',
      nickName: 'alixeB',
      permission: '一般會員'
    },
  ]);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultColumns = [
    {
      title: <div style={{ textAlign: 'center' }}>帳號</div>,
      dataIndex: 'email',
      width: '30%',
      editable: true,
      render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>
    },
    {
      title: <div style={{ textAlign: 'center' }}>姓名</div>,
      dataIndex: 'nickName',
      render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>
    },
    {
      title: <div style={{ textAlign: 'center' }}>會員權限</div>,
      dataIndex: 'permission',
      render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>
    },
    {
      title: <div style={{ textAlign: 'center' }}>編輯</div>,
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (<div style={{ textAlign: 'center' }}>
          <a onClick={() => setIsModalOpen(true)}>編輯</a></div>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      email: 'aaa@CineK.com',
      nickName: 'alixe',
      permission: '一般會員',
    }
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div style={{margin:"auto 5%", width:'90%'}}>
      <div>會員列表</div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16
          }}
        >新增會員</Button>
      </div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
      <Modal width={'80%'} open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
        <MemberInfo />
      </Modal>
    </div>
  );
};

export default MemberManager
