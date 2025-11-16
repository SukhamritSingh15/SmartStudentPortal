import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import CGPACalculator from "./components/CGPAcalculator";
import Attendance from "./components/Attendance";
import Help from "./components/Help";

import "./App.css";

function App() {
  return (
    <>
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<CGPACalculator />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/help" element={<Help />} />
        <Route path="/cgpa" element={<CGPACalculator />} />

        {/* Fallback */}
        <Route path="*" element={<CGPACalculator />} />
      </Routes>
    </>
  );
}

export default App;
