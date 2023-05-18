import { Button, Dropdown, Space, Table } from "antd";
import { useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import MovieEdit from "./Components/MovieEdit";

const Movie = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      movieName: '電影A',
      theaterName: '台北影城',
      inTheatersTime: '2023-05-01T10:21:22.164+00:00'
    }, {
      key: '1',
      movieName: '電影B',
      theaterName: '台北影城',
      inTheatersTime: '2023-05-01T10:21:22.164+00:00'
    }, {
      key: '2',
      movieName: '電影C',
      theaterName: '台北影城',
      inTheatersTime: '2023-05-01T10:21:22.164+00:00'
    },
  ]);
  const [count, setCount] = useState(dataSource.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultColumns = [
    {
      title: <div style={{ textAlign: 'center' }}>電影名稱</div>,
      dataIndex: 'movieName',
      width: '30%',
      editable: true,
      render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>
    },
    {
      title: <div style={{ textAlign: 'center' }}>影城</div>,
      dataIndex: 'theaterName',
      render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>
    },
    {
      title: <div style={{ textAlign: 'center' }}>上映時間</div>,
      dataIndex: 'inTheatersTime',
      render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>
    },
    {
      title: <div style={{ textAlign: 'center' }}>電影販售管理</div>,
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
      movieName: '電影New',
      theaterName: '影城New',
      inTheatersTime: new Date().toISOString(),
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
      {isModalOpen ? 
      <MovieEdit
        cancelHandler = {setIsModalOpen}
       style={{ marginTop: 20 }} 
       /> : <>

        <div>新增電影</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <Button
              type="primary"
              style={{
                marginBottom: 16,
                marginRight: 8
              }}
            >下拉選擇影城<DownOutlined /></Button>
          </Dropdown>
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <Button
              type="primary"
              style={{
                marginBottom: 16,
                marginRight: 8
              }}
            >下拉選擇電影<DownOutlined /></Button>
          </Dropdown>
          <Button
            onClick={handleAdd}
            type="primary"
            style={{
              marginBottom: 16
            }}
          >新增電影</Button>
        </div>
        <Table
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </>
      }
    </div>
  );
}

export default Movie