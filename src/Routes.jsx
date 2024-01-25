// Routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
import Teams from "./pages/Teams/Teams";
import TeamStats from "./pages/Teams/TeamStats";

//controla o estado do auth
import { onAuthStateChanged } from "firebase/auth";

import Competitions from "./pages/Competitions/Competitions";
import Configuration from "./pages/Configuration/Configuration";
import Stats from "./pages/Competitions/Stats";
import Register from "./pages/Register/register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

const App = () => {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;
  console.log(user);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });
  }, [auth]);

  return (
    <div className="App">
      <Routes>
        <>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/teams" element={<Teams />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Competitions />} />
          <Route path="/competition/stats/:competitionId" element={<Stats />} />
          <Route
            path="/team/stats/:competitionId/:teamId"
            element={<TeamStats />}
          />
          <Route path="/configuration" element={<Configuration />} />
        </>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />


      </Routes>
    </div>
  );
};

export default App;
