import { Link } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import logo from "@/assets/image/logo.png";
import styled from "styled-components";

const { Sider } = Layout;
const Logo = styled.img`
  width: 150px;
  height: auto;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
`;
const MyLink = styled(Link)`
  text-decoration: none;
`
const MySider = styled(Sider)`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  width:200px;
`;

const items = [
  {
    key: "會員管理",
    label: <MyLink to="/member">會員管理</MyLink>,
  },
  {
    key: "新增電影",
    label: <MyLink to="/movie">新增電影</MyLink>,
  },
  {
    key: "電影上架",
    label: <MyLink to="/movieShelf">電影上架</MyLink>,
  },
  {
    key: "影城管理",
    label: "影城管理",
    children: [
      {
        key: "影城調整",
        label: <MyLink to="/theater">影城調整</MyLink>,
      },
      {
        key: "影廳管理",
        label: <MyLink to="/room">影廳管理</MyLink>,
      },
      {
        key: "座位管理",
        label: <MyLink to="/seat">座位管理</MyLink>,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <MySider>
      <LogoWrapper>
        <Logo src={logo} alt="" />
      </LogoWrapper>
      <Menu
        mode="inline"
        // defaultSelectedKeys={["會員管理"]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={items}
      />
    </MySider>
  );
};

export default Sidebar;
