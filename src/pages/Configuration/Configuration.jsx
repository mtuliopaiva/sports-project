// Configuration.jsx
import React from "react";
import { ColorPicker, Form, Slider, InputNumber, Space, Divider, Button, Typography } from "antd";

const Configuration = () => {
  const { fontSize, color, updateConfig } = useConfig();

  const handleFontSizeChange = (value) => {
    updateConfig({ fontSize: value });
  };

  const handleColorChange = (value) => {
    updateConfig({ color: value });
  };

  const handleSubmit = () => {
    // Lógica adicional ao clicar em Submit, se necessário
  };

  return (
    <div>
      <Typography style={{fontSize}}>Olá Mundo</Typography>

      <Divider orientation="left">Configuration</Divider>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Font-size">
          <Space>
            <Slider min={12} max={48} value={fontSize} onChange={handleFontSizeChange} style={{ width: 200 }} />
            <InputNumber min={12} max={48} value={fontSize} onChange={handleFontSizeChange} style={{ margin: "0 16px" }} />
          </Space>
        </Form.Item>
        <Form.Item label="Cor base do Menu">
          <ColorPicker value={color} onChange={handleColorChange} />
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
