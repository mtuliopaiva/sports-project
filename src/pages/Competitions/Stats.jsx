import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../services/axiosConfig";
import { Table, Divider } from "antd";
import { Typography } from "antd";

const { Text } = Typography;

const apiKey = import.meta.env.VITE_API_KEY;

const Stats = () => {
  const { competitionId } = useParams(); // Obtenha o ID da competição a partir dos parâmetros de rota
  const [competitionName, setCompetitionName] = useState('');
  const [competitionStats, setCompetitionStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/competitions/${competitionId}`, {
          headers: {
            "X-AUTH-TOKEN": apiKey,
          },
        });

        console.log(response.data);
        setCompetitionName(response.data.name);
        setCompetitionStats(response.data.seasons)
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, [competitionId]); // Certifique-se de incluir competitionId como dependência do useEffect

  const dataSource = competitionStats
    .filter(season => season.winner && season.winner.name !== "N/A")
    .map(season => ({
      key: season.id,
      season: `${season.startDate.slice(0, 4)}-${season.endDate.slice(0, 4)}`,
      winner: season.winner.name,
    }));

  const columns = [
    {
      title: 'Seasons',
      dataIndex: 'season',
      width: '30%',
    },
    {
      title: 'Winner',
      dataIndex: 'winner',
      width: '40%',
    },
  ];

  return (
    <div>
      <Divider orientation="left">{competitionName}</Divider>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default Stats;
