import React, { useState } from "react";
import { Layout, Menu, Button, Space, Avatar, Row, Col, Typography } from "antd";
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

import AppRoutes from "../../AppRoutes";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} selectedKeys={["1"]}>
            {[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Dashboard",
                link: "/"
              },
              {
                key: "2",
                icon: <TeamOutlined />,
                label: "Teams",
                link: "/teams"
              },
              {
                key: "3",
                icon: <TrophyOutlined />,
                label: "Competitions",
                link: "/competitions"
              },
              {
                key: "4",
                icon: <SettingOutlined />,
                label: "Configuration",
                link: "/configuration"
              },
              {
                key: "5",
                icon: <LogoutOutlined />,
                label: "Logout",
                link: "/logout"
              },
            ].map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
        <Header style={{
            padding: 0,
            background: '#fff',
          }}>
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
              <Col span={8} offset={8} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Space wrap size={16} style={{ marginRight: '16px' }}>
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
            <AppRoutes />
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default MainLayout;
