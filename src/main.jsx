import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import MainLayout from "./components/Layout/MainLayout.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
const authValue = {};


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider value={authValue}>
      <MainLayout>
        <App />
      </MainLayout>
    </AuthProvider>
  </React.StrictMode>
);
