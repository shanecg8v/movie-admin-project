import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import logo from "@/assets/image/logo.png";
import { apiUser } from "@/api";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/slice/authSlice";
import { useNavigate } from "react-router-dom";

const { postLogin } = apiUser;

const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
`;
const Logo= styled.img`
  width: 200px;
  height: auto;
`

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async(values) => {
    try {
      const {data:{data}} = await postLogin({
        data: {
          ...values,
        },
      });
      const {_id,email,token} = data;
      console.log('data',data);
      dispatch(
        setAuth({
          uid: _id,
          email,
          token,
          time:Date.now(),
        })
      );
      message.success("登入成功!");
      navigate("/"); 
    } catch (error) {
      console.log("🚀 ~ file: index.js:36 ~ onFinish ~ error:", error)
    }
    
  };

  return (
    <LoginWrapper>
      <Logo src={logo} alt="" />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-100"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </LoginWrapper>
  );
}
export default Login;
