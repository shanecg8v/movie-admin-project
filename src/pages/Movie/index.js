import { Button, Col, Row, Table } from "antd";
import { useEffect, useState } from "react";
import MovieEdit from "./Components/MovieEdit";
import { apiMovieGet } from "../../api";
import dayjs from "dayjs";

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
      render: (_, record) =>
        rdData.length >= 1 ? (<div style={{ textAlign: 'center', color: 'blue' }}>
          <a onClick={() => setEditData(record)}>編輯</a></div>
        ) : null,
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
    <div style={{ margin: "auto 5%", width: '90%' }}>
      {editData == undefined ? <>
        <div>新增電影</div>
        <Row justify='end' style={{ marginBottom: 16 }} gutter={10}>
          <Col><Button type="primary" onClick={() => setEditData({})}>新增電影</Button></Col>
        </Row>
        <Table rowClassName={() => 'editable-row'} bordered dataSource={rdData} columns={columns} pagination={{ current: page, pageSize, total: totalPages, onChange: pageChange }} />
      </> :
        <MovieEdit data={editData} onClose={onClose} />}
    </div>
  );
}

export default Movie