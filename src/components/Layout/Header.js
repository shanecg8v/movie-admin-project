import { Layout, Button, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectAuth } from "@/store/slice/authSlice";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { clearAuth } from "../../store/slice/authSlice";
import { message } from "antd";
import { useNavigate } from "react-router-dom";


const { Header } = Layout;

const HeaderStyle = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(130 142 157);
`;

const UserBtn = styled(Button)`
display: flex;
align-items: center;
gap: 5px;
`
const DropdownItem = styled.div`
text-align: center;
`

const items = [
  {
    key: "logout",
    label: <DropdownItem >登出</DropdownItem>,
    onclick:()=>{
      console.log('sss')
    }
  },
];

function MyHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector(selectAuth);

  function handleButtonClick(e){
    const {key} = e;
    switch (key) {
      case "logout":
        handleLogout();
        break;
      default:
        break;
    }
  }
  async function handleLogout(){
    dispatch(clearAuth());
    navigate("/login");
    message.success("登出成功");
  }
  return (
    <HeaderStyle>
      <div></div>
      <div>
        <Dropdown
          menu={{
            items,
            onClick: handleButtonClick,
          }}
          placement="bottomLeft"
          trigger={["click"]}
        >
          <UserBtn>
            <UserOutlined />
            {email}
            <DownOutlined />
          </UserBtn>
        </Dropdown>
      </div>
    </HeaderStyle>
  );
}
export default MyHeader;
