import React, { useEffect, useState } from "react";
import axios from "../../services/axiosConfig";
import { Table, Divider, Form, Select, Button, Space, Tag } from "antd";
import { Typography } from "antd";
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

const apiKey = import.meta.env.VITE_API_KEY;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

// ...

const Teams = () => {
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false); // Adicionei um estado para lidar com o carregamento

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/competitions`, {
          headers: {
            "X-AUTH-TOKEN": apiKey,
          },
        });

        console.log(response.data);
        setCompetitions(response.data.competitions);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Team Name",
      dataIndex: "name",
      key: "name",
    },
        {
      title: "TLA",
      dataIndex: "tla",
      key: "tla",
    },
    {
      title: "Colors",
      dataIndex: "clubColors",
      key: "clubColors",
      render: (colors) => (
        <>
          {colors.split("/").map((color, index) => (
            <Tag
              key={index}
              color={color.trim().toLowerCase()}
              style={{ color: color.trim().toLowerCase(), backgroundColor: color.trim().toLowerCase(), border:'1px solid #000' }}
            >color
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Stadium",
      dataIndex: "venue",
      key: "venue",
    },
    {
      title: "Fouded",
      dataIndex: "founded",
      key: "founded",
    },
  ];

  const handleSelectChange = (value) => {
    const selectedComp = competitions.find((comp) => comp.code === value);
    setSelectedCompetition(selectedComp);
  };

  const onFinish = async () => {
    console.log("Received values of form:", { select: selectedCompetition });

    try {
      setLoading(true); // Ativando o indicador de carregamento

      const teamsResponse = await axios.get(`/api/competitions/${selectedCompetition.code}/teams`, {
        headers: {
          "X-AUTH-TOKEN": apiKey,
        },
      });

      console.log("Teams data:", teamsResponse.data);

      // Atualizar o estado com os dados das equipes
      setTeams(teamsResponse.data.teams);
    } catch (error) {
      console.error("Erro na requisição de equipes:", error);
    } finally {
      setLoading(false); // Desativando o indicador de carregamento, independentemente do resultado
    }
  };

  return (
    <div>
      <Divider orientation="left">Teams</Divider>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          "input-number": 3,
          "checkbox-group": ["A", "B"],
          rate: 3.5,
          "color-picker": null,
        }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="select"
          label="Select"
          hasFeedback
          rules={[{ required: true, message: "Please select a competition!" }]}
        >
          <Select placeholder="Please select a competition" onChange={handleSelectChange}>
            {competitions.map((competition) => (
              <Option key={competition.code} value={competition.code}>
                {competition.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Space>
            <Button htmlType="submit" type="primary" loading={loading} icon={<SearchOutlined />}>
        Search
      </Button>
          </Space>
        </Form.Item>

      </Form>
      {teams.length > 0 && (
  <Table columns={columns} dataSource={teams.map(team => ({ ...team, key: team.id }))} />
)}
    </div>
  );
};

export default Teams;

