import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import CGPACalculator from "./components/CGPAcalculator";
import Attendance from "./components/Attendance";
import Help from "./components/Help";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Communication from "./components/Communication";
import Notice from "./components/Notice";
import Mainpage from "./components/mainpage";
import Login from "./components/login";


function App() {
  const location = useLocation();

  // Routes where sidebar should NOT appear
  const noSidebarRoutes = ["/mainpage", "/login"];

  const hideSidebar = noSidebarRoutes.includes(location.pathname);

  return (
    <>
      {/* Sidebar only if NOT hidden */}
      {!hideSidebar && <Sidebar />}

      {/* All Pages */}
      <Routes>
        <Route path="/cgpa" element={<CGPACalculator />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/help" element={<Help />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/login" element={<Login />} />

        

        {/* Page without Sidebar */}
        <Route path="/mainpage" element={<Mainpage />} />

        {/* Default */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
