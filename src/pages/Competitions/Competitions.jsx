import { useEffect, useState } from "react";
import axios from "../../services/axiosConfig";
import { Card, Col, Row, Divider } from "antd";
import Meta from "antd/es/card/Meta";
import { Typography } from "antd";

import { stringToLowerCase } from "../../utils/stringToLowerCase";
import { formatDate } from "../../utils/formatDate";

const { Text, Link } = Typography;
const style = {
  background: '#0092ff',
  padding: '8px 0',
};

const apiKey = import.meta.env.VITE_API_KEY;

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/competitions/", {
          headers: {
            "X-AUTH-TOKEN": apiKey,
          },
        });
        setCompetitions(response.data.competitions);

        console.log(response.data.competitions);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
    <Divider orientation="left">Competitions</Divider>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
    {competitions.map((competition) => (
      <Col key={competition.id} className="gutter-row" span={6}>
        <div style={{ marginBottom: "20px" }}>
           <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt={competition.name} src={competition.emblem} style={{ height: '160px', width: '200px', objectFit: 'cover', margin:'auto'}}/>}
          >

            <div style={{ display: "flex", flexDirection: "column" }}>
            <Text>{competition.name}</Text>
            <Text>{competition.area.name}</Text>
            <Text type="secondary">{stringToLowerCase(competition.type)}</Text>
            <Text type="secondary">Last update: {formatDate(competition.lastUpdated)}</Text>

            </div>
          </Card>
        </div>
        </Col>
      ))}
    </Row>
    </div>
  );
};

export default Competitions;
