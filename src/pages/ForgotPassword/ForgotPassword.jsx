import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Spin,
  Row,
  Col,
  Divider,
  notification
} from "antd";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";

import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const { resetPassword, error: authError } = useAuthentication();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      notification.success({
        message: 'Success',
        description: 'Check your e-mail.',
      });
    } catch (error) {
      console.log("Error sending password reset email:", error.message);

      let systemErrorMessage;

      if (error.message.includes("email-not-found")) {
        systemErrorMessage =
          "Email not found. Please check your email and try again.";
      } else {
        systemErrorMessage = "An error occurred, please try again later.";
      }

      setError(systemErrorMessage);
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <>
      <Spin spinning={spinning} fullscreen />
      <Divider orientation="left">Forgot Password</Divider>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPassword;
