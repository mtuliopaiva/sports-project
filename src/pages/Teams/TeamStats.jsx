import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../services/axiosConfig";
import { Table, Divider, Tag } from "antd";
import { Typography } from "antd";

import { Button, Card, Flex } from "antd";
const cardStyle = {
  width: 620,
};
const imgStyle = {
  display: "block",
  width: 273,
};
const { Text } = Typography;

const apiKey = import.meta.env.VITE_API_KEY;

const TeamStats = () => {
  const { competitionId } = useParams(); // Obtenha o ID da competição a partir dos parâmetros de rota
  const [competitionName, setCompetitionName] = useState("");
  const [teamStats, setTeamStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/competitions/BSA/teams`, {
          headers: {
            "X-AUTH-TOKEN": apiKey,
          },
        });

        setTeamStats(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  // const dataSource = competitionStats
  //   .filter((season) => season.winner && season.winner.name !== "N/A")
  //   .map((season) => ({
  //     key: season.id,
  //     season: `${season.startDate.slice(0, 4)}-${season.endDate.slice(0, 4)}`,
  //     winner: season.winner.name,
  //   }));

  const columns = [
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Birthdate",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
    },
  ];
  const team = teamStats.teams && teamStats.teams[11];
  if (!team) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Divider orientation="left">Team</Divider>
      <Card
        hoverable
        style={cardStyle}
        bodyStyle={{
          padding: 20,
          overflow: "hidden",
        }}
      >
        <Flex>
          <img alt="avatar" src={team.crest} style={imgStyle} />
          <Flex
            vertical
            align="flex-start"
            justify="space-between"
            style={{
              padding: 32,
            }}
          >
            <Typography.Title level={4}>{team.shortName}</Typography.Title>
            <Text>
              {team.clubColors.split("/").map((color, index) => (
                <Tag
                  key={index}
                  color={color.trim().toLowerCase()}
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    marginRight: "4px",
                    borderRadius: "50%",
                  }}
                />
              ))}
            </Text>
            <Text>{team.venue}</Text>
          </Flex>
        </Flex>
      </Card>
      {/* <Table style={{marginTop: "20px"}} columns={columns} dataSource={dataSource} /> */}
      <Table style={{ marginTop: "20px" }} columns={columns} />
    </div>
  );
};

export default TeamStats;
