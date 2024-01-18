// Configuration.jsx
import React from "react";
import { ColorPicker, Form, Slider, InputNumber, Space, Divider, Button, Typography } from "antd";

const Configuration = () => {

  const handleFontSizeChange = (value) => {
  };

  const handleColorChange = (value) => {
  };

  const handleSubmit = () => {
    // Lógica adicional ao clicar em Submit, se necessário
  };

  return (
    <div>

      <Divider orientation="left">Configuration</Divider>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Font-size">
          <Space>
            <Slider min={12} max={48}  onChange={handleFontSizeChange} style={{ width: 200 }} />
            <InputNumber min={12} max={48}  onChange={handleFontSizeChange} style={{ margin: "0 16px" }} />
          </Space>
        </Form.Item>
        <Form.Item label="Cor base do Menu">
          <ColorPicker onChange={handleColorChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>

    </div>
  );
};

export default Configuration;
