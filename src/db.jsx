import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./Dashboard";

import "./App.css";

function App() {
  return (
    <>
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Page Routes */}
      <Routes>

        {/* Default page */}
        <Route path="/" element={<Dashboard />} />

        {/* Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Fallback route */}
        <Route path="*" element={<Dashboard />} />

      </Routes>
    </>
  );
}

export default App;
