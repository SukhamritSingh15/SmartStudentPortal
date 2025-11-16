<<<<<<< HEAD
import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar";
import CGPACalculator from "./components/CGPAcalculator";
import Attendance from "./components/Attendance";
import Help from "./components/Help";
import './App.css';
=======
import React from 'react';
import Sidebar from './components/Sidebar';
import CGPACalculator from './components/CGPAcalculator';
import './App.css'; // Import your migrated CSS
>>>>>>> 200918f (cgpa page added)

function App() {
  return (
    <>
<<<<<<< HEAD
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
=======
      {/* 1. Sidebar Component */}
      <Sidebar />
      
      {/* 2. Main Calculator Component */}
      <CGPACalculator />
>>>>>>> 200918f (cgpa page added)
    </>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 200918f (cgpa page added)
