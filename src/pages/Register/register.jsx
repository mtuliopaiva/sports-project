import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Divider, Row, Col } from "antd";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    const { username, password } = values;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        username,  
        password
      );
      const user = userCredential.user;
      console.log("User registered:", user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };
  return (
    <>
      <Divider orientation="left">Register now</Divider>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleRegister}
        labelCol={{ span: 8 }} 
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          name="username"
          label="Username"
          dependencies={['password']}
          hasFeedback
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Row>
          <Col offset={8} span={16}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Register now
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
