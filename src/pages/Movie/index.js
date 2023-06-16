import { Button, Col, Row, Table, Layout } from "antd";
import { useEffect, useState } from "react";
import MovieEdit from "./Components/MovieEdit";
import { apiMovieGet } from "../../api";
import dayjs from "dayjs";
const { Content } = Layout;

const Movie = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [editData, setEditData] = useState();
  const [totalPages, setTotalPages] = useState()
  useEffect(() => {
    reFleshTableData()
  }, [page,pageSize,editData])
  const [rdData, setRdData] = useState([])
  const onClose = () => {
    setEditData(undefined)
  }
  const defaultColumns = [
    {
      title: <div style={{ textAlign: 'center' }}>電影中文名稱</div>,
      dataIndex: 'movieCName',
      editable: true,
      render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>
    },
    {
      title: <div style={{ textAlign: 'center' }}>上映時間</div>,
      dataIndex: 'inTheatersTime',
      render: (text) => <div style={{ textAlign: 'center' }}>{dayjs(text).format('YYYY/MM/DD HH:mm:ss')}</div>
    },
    {
      title: <div style={{ textAlign: 'center' }}>影城</div>,
      dataIndex: 'movieTime',
      render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>
    },
    {
      title: <div style={{ textAlign: 'center' }}>電影販售管理</div>,
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
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title
      }),
    };
  });

  const pageChange = (current, pageSize) => {
    console.log("pageChange")
    setPage(current)
    setPageSize(pageSize)
  }
  const reFleshTableData = ()=>{
    console.log("reFlesh", page, pageSize)
    apiMovieGet(page, pageSize)
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
        {editData == undefined ? <>
          <h2>新增電影</h2>
          <Row 
            justify='end' 
            style={{ marginBottom: 16 }} 
            gutter={10}
          >
            <Col>
              <Button 
                size="large" 
                onClick={() => 
                setEditData({})}
              >
                新增電影
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
        </> :
          <MovieEdit data={editData} onClose={onClose} />}
      </div>
    </Content>
  );
}

export default Movie