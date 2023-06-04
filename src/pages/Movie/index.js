import { Button, Col, Dropdown, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import MovieEdit from "./Components/MovieEdit";
import { apiMovieGet } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { addMovies, selectMovie, setMovies } from "../../store/slice/movieSlice";
import dayjs from "dayjs";

const Movie = () => {
  const [movieIndex, setMovieIndex] = useState(-1);
  const pageSize = 5
  useEffect(() => {
    apiMovieGet(1, pageSize*2)
      .then(e => {
        const data = e?.data.data.map((d, i) => {
          return {
            ...d,
            key: i
          }
        })
        updateMovies(data)
      })
  }, [movieIndex])
  const rdData = useSelector(selectMovie)
  const dispatch = useDispatch()
  const updateMovies = (data) => {
    dispatch(setMovies(data))
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
        rdData.length >= 1 ? (<div style={{ textAlign: 'center' }}>
          <a onClick={() => setMovieIndex(record.key)}>編輯</a></div>
        ) : null,
    },
  ];
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
        title: col.title
      }),
    };
  });
  const items = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];

  const pageChange = (current, pageSize) => {
    if (rdData.length - current * pageSize != 0) return
    apiMovieGet(current + 1, pageSize)
      .then(e => {
        const data = e?.data.data.map((d, i) => {
          return {
            ...d,
            key: current * pageSize + i
          }
        })
        dispatch(addMovies(data))
      })
  }

  return (
    <div style={{ margin: "auto 5%", width: '90%' }}>
      {movieIndex > -1 ? <MovieEdit index={movieIndex} cancelHandler={setMovieIndex} style={{ marginTop: 20 }} isAdd={movieIndex >= rdData.length}/> : <>
        <div>新增電影</div>
        <Row justify='end' style={{ marginBottom: 16 }} gutter={10}>
          <Col><Dropdown menu={{ items }} trigger={['click']}>
            <Button type="primary"  >
              下拉選擇影城<DownOutlined />
            </Button>
          </Dropdown></Col>
          <Col><Dropdown menu={{ items }} trigger={['click']} >
            <Button type="primary" >
              下拉選擇電影<DownOutlined />
            </Button>
          </Dropdown></Col>
          <Col><Button type="primary" onClick={()=>setMovieIndex(rdData.length)}>新增電影</Button></Col>
        </Row>
        <Table rowClassName={() => 'editable-row'} bordered dataSource={rdData} columns={columns} pagination={{ pageSize, onChange: pageChange }} />
      </>}
    </div>
  );
}

export default Movie