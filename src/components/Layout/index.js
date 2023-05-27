import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Sidebar from './Sidebar';
import { Layout, Button, Dropdown } from "antd";
import MyHeader from './Header';


const { Header, Content, Footer, Sider } = Layout;

function MyLayout() {

  return (
    <div className="wrapper d-flex align-items-stretch">
      <Sidebar />
      <Layout>
        <MyHeader/>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
}
export default MyLayout;
