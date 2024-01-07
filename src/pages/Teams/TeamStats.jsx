import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../services/axiosConfig";
import { Table, Divider, Tag } from "antd";
import { Typography } from "antd";
import { formatDate } from "../../utils/formatDate";


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
  const { teamId } = useParams();
  const { competitionId } = useParams();

  const [competitionName, setCompetitionName] = useState("");
  const [teamStats, setTeamStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/competitions/${competitionId}/teams`, {
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
  const team = teamStats.teams && teamStats.teams[teamId];
  if (!team) {
    return <div>Loading...</div>;
  }
  const squad = team.squad;
  const dataSource = squad.map((squad) => ({
    key: squad.id,
    position: squad.position,
    name: squad.name,
    dateOfBirth: formatDate(squad.dateOfBirth),
    nationality: squad.nationality,
  }));
  console.log(competitionId);
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
            <Text>{team.address}</Text>
          </Flex>
        </Flex>
      </Card>
      <Table style={{marginTop: "20px"}} columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default TeamStats;
