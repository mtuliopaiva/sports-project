import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Button,
  Space,
  Avatar,
  Row,
  Col,
  Typography,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  TrophyOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Link } from "react-router-dom";

import Routes from "../../Routes";

import { useAuthentication } from "../../hooks/useAuthentication";

import { onAuthStateChanged } from "firebase/auth";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout = () => {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  const [collapsed, setCollapsed] = useState(false);

  const loadingUser = user === undefined;
  console.log(user);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
  {[
    {
      key: "1",
      icon: <UserOutlined />,
      label: user ? "Dashboard" : "Login", // Altera o rótulo com base na existência do usuário
      link: user ? "/" : "/login", // Altera o link com base na existência do usuário
    },
    {
      key: "2",
      icon: <TeamOutlined />,
      label: "Teams",
      link: "/teams",
    },
    {
      key: "3",
      icon: <TrophyOutlined />,
      label: "Competitions",
      link: "/competitions",
    },
    {
      key: "4",
      icon: <SettingOutlined />,
      label: "Configuration",
      link: "/configuration",
    },
    {
      key: "5",
      icon: <LogoutOutlined />,
      label: "Logout",
      link: "/logout",
    },
  ].map((item) => (
    <Menu.Item key={item.key} icon={item.icon}>
      <Link to={item.link}>{item.label}</Link>
    </Menu.Item>
  ))}
</Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "#fff",
            }}
          >
            <Row>
              <Col span={8}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </Col>
              <Col
                span={8}
                offset={8}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Space wrap size={16} style={{ marginRight: "16px" }}>
                  <Text>Peter Parker</Text>
                  <Avatar icon={<UserOutlined />} />
                </Space>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "calc(100vh - 128px)",
            }}
          >
            <Routes />
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default MainLayout;
