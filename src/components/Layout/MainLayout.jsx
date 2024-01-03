import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  TrophyOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { Col, Row } from "antd";
import { Typography } from "antd";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;

const boxStyle = {
  width: "100%",
  height: 120,
  borderRadius: 6,
  border: "1px solid #40a9ff",
};
const justifyOptions = [
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
];
const alignOptions = ["flex-start", "center", "flex-end"];
const { Text } = Typography;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [justify, setJustify] = React.useState(justifyOptions[0]);
  const [alignItems, setAlignItems] = React.useState(alignOptions[0]);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Dashboard",
            },

            {
              key: "2",
              icon: <TeamOutlined />,
              label: "Teams",
            },
            {
              key: "3",
              icon: <TrophyOutlined />,
              label: "Competitions",
            },
            {
              key: "4",
              icon: <SettingOutlined />,
              label: "Configuration",
            },
            {
              key: "5",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Row>
            <Col span={8}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
              style={{ display: "flex", justifyContent: "flex-end"}}
            >
              <Space wrap size={16} style={{marginRight:'16px'}}>
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
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
