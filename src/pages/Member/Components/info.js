import { Button, Col, Divider, Layout, List, Row, Typography } from "antd"
import Sider from "antd/es/layout/Sider"
import { Content } from "antd/es/layout/layout"
import { useState } from "react"

const MemberInfo = () => {

  const [permission,setPermission] = useState(false)

  const dataL = [
    { name: '帳號', value: "vvvvv" },
    { name: '姓名', value: "vvvvv" },
    { name: '電話', value: "vvvvv" },
    { name: '會員點數', value: "vvvvv" },
    { name: '權限', value: permission }
  ]

  const data = [
    '消費紀錄1',
    '消費紀錄2',
    '消費紀錄3',
    '消費紀錄4',
    '消費紀錄5',
  ];
  const permissionChg = ()=>{
    setPermission(!permission)
  }


  return <Layout style={{marginTop:"20px"}}>
      <Sider style={{ margin: "auto", background: "inherit" }}>
        {dataL.map(d =>
          <div key={d.name} style={{ margin: "auto", marginTop: "10px", width: "70%" }}>
            {d.name=="權限"?
            <a style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={permissionChg}>{`${d.name}:${permission?"管理者":"一般會員"}`}</a>:
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{`${d.name}:${d.value}`}</div>
            }
            <div style={{ borderBottom: '1px solid', height: '10px' }}></div>
          </div>
        )}
      </Sider>
      <Content >
        <Layout.Header style={{ background: "inherit" }}>消費紀錄</Layout.Header>
        <Layout>
          
        <List
          header={<>日期<Button style={{margin:"auto 10px"}}>開始日期</Button><Button>結束日期</Button></>}
          footer={<div></div>}
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
        </Layout>
      </Content>
  </Layout>
}

export default MemberInfo