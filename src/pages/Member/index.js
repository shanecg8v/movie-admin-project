import { Button, Col, Row, Table, Layout } from 'antd';
import { useEffect, useState } from 'react';
import MemberInfo from './Components/info';
import { apiMemberGet } from '../../api';
const { Content } = Layout;

const MemberManager = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [editData, setEditData] = useState();
  const [totalPages, setTotalPages] = useState()
  useEffect(() => {
    reFleshMemberTable()
  }, [page,pageSize,editData])

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
      align: 'center',
      render: (_, record) => (
        <>
          <Button 
            onClick={()=>setEditData(record)}
            size="large" 
          >
          編輯
          </Button>
        </>
      )
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

  const [rdData, setRdData] = useState([])
  const onClose = () => {
    setEditData(undefined)
  }
  const pageChange = (current, pageSize) => {
    console.log("pageChange")
    setPage(current)
    setPageSize(pageSize)
  }
  const reFleshMemberTable = ()=>{
    console.log("reFlesh", page, pageSize)
    apiMemberGet(page, pageSize, undefined, 'asc')
      .then(e => {
        const data = e?.data.data.map((d, i) => {
          return {
            ...d,
            key: page * pageSize + i
          }
        })
        setRdData(data)
        setTotalPages(e?.data.totalCounts)
      })
  }

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: 'rgb(230 231 232)'
      }}
    >
      <div style={{ margin: "auto 5%", width: '90%' }}>
        {editData == undefined ?
          <div>
            <h2>會員列表</h2>
            <Row justify='end' style={{ marginBottom: 16 }}>
              <Col>
                <Button 
                  size="large" 
                  onClick={() => setEditData({})}>新增會員
                </Button>
              </Col>
            </Row>
            <Table 
              rowClassName={() => 'editable-row'} 
              bordered 
              dataSource={rdData} 
              columns={columns} 
              pagination={{ current: page, pageSize, total: totalPages, onChange: pageChange }} 
              className="custom-table"
            />
          </div> :
          <MemberInfo data={editData} onClose={onClose} />
        }

      </div>
    </Content>
  );
};

export default MemberManager