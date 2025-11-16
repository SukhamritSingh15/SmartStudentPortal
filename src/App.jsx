import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar";
import CGPACalculator from "./components/CGPAcalculator";
import Attendance from "./components/Attendance";
import Help from "./components/Help";
import './App.css';

function App() {
  return (
    <>
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Pages below */}
      <Routes>
        <Route path="/" element={<CGPACalculator />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/help" element={<Help />} />
        <Route path="/cgpa" element={<CGPACalculator />} />

        {/* Catch-all route */}
        <Route path="*" element={<CGPACalculator />} />
      </Routes>
    </>
  );
}

export default App;
