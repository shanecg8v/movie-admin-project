import { Button, Dropdown, Table } from "antd";
import { useEffect, useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import MovieEdit from "./Components/MovieEdit";
import { apiMovieGetAll } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { selectMovie, setMovies } from "../../store/slice/movieSlice";

const Movie = () => {
  useEffect(() => {
    apiMovieGetAll(1, 10)
      .then(e => {
        const data = e?.data.data.map((d, i) => {
          return {
            ...d,
            key: i
          }
        })
        updateMovies(data)
      })
      .catch(e => console.log('err', e))
  }, [])
  const [movieIndex, setMovieIndex] = useState(-1);
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
      render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>
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
  return (
    <div style={{ margin: "auto 5%", width: '90%' }}>
      {movieIndex > -1 ? <MovieEdit index={movieIndex} cancelHandler={()=>setMovieIndex(-1)} style={{ marginTop: 20 }} /> : <>
        <div>新增電影</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button type="primary" style={{ marginBottom: 16, marginRight: 8 }} >
              下拉選擇影城<DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown menu={{ items }} trigger={['click']} >
            <Button type="primary" style={{ marginBottom: 16, marginRight: 8 }} >
              下拉選擇電影<DownOutlined />
            </Button>
          </Dropdown>
          <Button type="primary" style={{ marginBottom: 16 }} >新增電影</Button>
        </div>
        <Table rowClassName={() => 'editable-row'} bordered dataSource={rdData} columns={columns} />
      </>}
    </div>
  );
}

export default Movie