import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom"; 
import { auth } from "../../firebase/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [spinning, setSpinning] = useState(false);

  const { login, error, loading } = useAuthentication();
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpinning(true);
      await login(email, password);
      console.log("Login Realizado com sucesso");
      setSpinning(false);
      navigate("/dashboard"); 
    } catch {
      console.error("Authentication error");
    }
  };

  return (
    <>
    <Spin spinning={spinning} fullscreen />
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
    >
      <Form.Item
        name="E-mail"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleSubmit}>
          Log in
        </Button>
        Or <a href="/register">register now!</a>
      </Form.Item>
    </Form>
    </>
  );
};

export default Login;
