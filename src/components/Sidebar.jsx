import React, { useState } from 'react';
import { Link } from "react-router-dom";   // <-- IMPORTANT
// The CSS for this component should be included in your main CSS file (App.css)

function Sidebar() {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      {/* HAMBURGER BUTTON */}
      <button 
        className="hamburger" 
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* SIDEBAR */}
      <div className={`sidebar ${isActive ? 'active' : ''}`} id="sidebar">
        <img src="/img1-removebg-preview.png" alt="Logo" className="sidebar-logo" />

        {/* Navigation Links using React Router */}
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/Myinfo">My Info</Link>
        <Link to="/ai-assistant">
          <i className="fas fa-robot"></i> AI Assistant
        </Link>
        <Link to="/communication">Communication</Link>
        <Link to="/performance">Performance</Link>
        <Link to="/notice">Notice</Link>
        <Link to="/login">Logout</Link>

      </div>
    </>
  );
}

export default Sidebar;
