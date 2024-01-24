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
  Spin,
  Popconfirm,
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
import { auth } from "../../firebase/config";
import { Link } from "react-router-dom";
import Routes from "../../Routes";

import { useAuthentication } from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout = () => {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  const [collapsed, setCollapsed] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const navigate = useNavigate();

  const confirmLogout = () => {
    console.log("Logout confirmado");
    handleLogout();
  };
  const handleLogout = async () => {
    try {
      setSpinning(true);
      await auth.signOut();
      console.log("Logout completed");
      setSpinning(false);
      navigate("/login");
    } catch (error) {
      console.error("Error", error);
    }
  };

  const cancelLogout = () => {
    console.log("Logout cancelado");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <>
      <Spin spinning={spinning} fullscreen />
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          {user && (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              {[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: "Dashboard",
                  link: "/dashboard",
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
                  popconfirm: (
                    <Popconfirm
                      title="Are you sure you want to logout?"
                      onConfirm={confirmLogout}
                      onCancel={cancelLogout}
                      okText="Yes"
                      cancelText="No"
                      placement="right"
                    >
                      <Menu.Item key="5" style={{ padding: "0" }}>
                        Logout
                      </Menu.Item>
                    </Popconfirm>
                  ),
                },
              ].map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  {item.popconfirm ? (
                    item.popconfirm
                  ) : (
                    <Link to={item.link}>{item.label}</Link>
                  )}
                </Menu.Item>
              ))}
            </Menu>
          )}
          {!user && (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              {[
                {
                  key: "6",
                  icon: <UserOutlined />,
                  label: "Login",
                  link: "/login",
                },
              ].map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  {item.popconfirm ? (
                    item.popconfirm
                  ) : (
                    <Link to={item.link}>{item.label}</Link>
                  )}
                </Menu.Item>
              ))}
            </Menu>
          )}
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
                <Text>{user ? user.email : 'Usuário'}</Text>
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
    </>
  );
};

export default MainLayout;
