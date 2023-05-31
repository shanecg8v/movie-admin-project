import { Button, Col, Layout, List, Row } from "antd"
import Sider from "antd/es/layout/Sider"
import { Content } from "antd/es/layout/layout"
import { useEffect, useState } from "react"
import { selectMember } from "../../../store/slice/memberSlice"
import { useSelector } from "react-redux"

const MemberInfo = ({ index, setData }) => {
  const info = useSelector(selectMember)[index]
  const [permission, setPermission] = useState(info.roles.includes('admin'))
  const dataL = [
    { name: '帳號', value: info.email },
    { name: '姓名', value: info.name == undefined ? "" : info.name },
    { name: '電話', value: info.phone == undefined ? "" : info.phone },
    { name: '會員點數', value: info.bonus == undefined ? "" : info.bonus },
    { name: '權限', value: permission },
    { name: 'id', value: info._id }
  ]
  const permissionChg = () => {
    setPermission(!permission)
    setData({...info, roles:!permission ? ['user', 'admin'] : ['user']})
  }

  return <Row>
    <Col span={8}>
      <Sider style={{ margin: "auto", marginTop: 30, background: "inherit" }}>
        {dataL.map(d =>
          <div key={d.name} style={{ margin: "auto", marginTop: "10px" }}>
            {d.name == "權限" ?
              <a style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={permissionChg}>{`${d.name}:${d.value ? '後臺管理員' : '一般會員'}`}</a> :
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{`${d.name}:${d.value}`}</div>
            }
            <div style={{ borderBottom: '1px solid', height: '10px' }}></div>
          </div>
        )}
      </Sider>
    </Col>
    <Col span={16}>
      <Content>
        <Layout.Header style={{ background: "inherit" }}>消費紀錄</Layout.Header>
        <Layout>
          <List
            header={<>日期<Button style={{ margin: "auto 10px" }}>開始日期</Button><Button>結束日期</Button></>}
            footer={<div></div>}
            bordered
            dataSource={info.orderId}
            renderItem={(item) => (
              <List.Item key={item.orderId} style={{ display: "flex" }}>
                <div>{`訂單編號:${item.orderId}`}</div>
                <div>{`消費:${item.price}`}</div>
              </List.Item>
            )}
          />
        </Layout>
      </Content>
    </Col>
  </Row>
}

export default MemberInfo