// Routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard"
import Teams from "./pages/Teams/Teams";
import Competitions from "./pages/Competitions/Competitions";
import Configuration from "./pages/Configuration/Configuration";
import Stats from "./pages/Competitions/Stats";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/competitions" element={<Competitions />} />
      <Route path="/competition/stats/:competitionId" element={<Stats />} />
      <Route path="/configuration" element={<Configuration />} />
      <Route path="/teams" element={<Teams />} />

    </Routes>
  );
};

export default AppRoutes;
