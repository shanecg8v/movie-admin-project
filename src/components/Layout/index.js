import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Sidebar from './Sidebar';
import { Layout, Button, Dropdown } from "antd";
import MyHeader from './Header';
import styled from 'styled-components';


const { Header, Content, Footer, Sider } = Layout;

const MyContent = styled(Content)`
padding:15px 10px;
`

function MyLayout() {

  return (
    <div className="wrapper d-flex align-items-stretch">
      <Sidebar />
      <Layout>
        <MyHeader/>
        <MyContent>
          <Outlet />
        </MyContent>
      </Layout>
    </div>
  );
}
export default MyLayout;
