// Routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

import Teams from "./pages/Teams/Teams";
import TeamStats from "./pages/Teams/TeamStats";

import Competitions from "./pages/Competitions/Competitions";
import Configuration from "./pages/Configuration/Configuration";
import Stats from "./pages/Competitions/Stats";
import Register from "./pages/Register/register";

const AppRoutes = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/register" element={<Register />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/competition/stats/:competitionId" element={<Stats />} />
        <Route
          path="/team/stats/:competitionId/:teamId"
          element={<TeamStats />}
        />

        <Route path="/configuration" element={<Configuration />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
