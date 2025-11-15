import React, { useState } from 'react';
// The CSS for this component should be included in your main CSS file (App.css)

function Sidebar() {
  // useState hook to manage the active/inactive state of the sidebar for mobile
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      {/* HAMBURGER BUTTON - Handles the toggle logic */}
      <button 
        className="hamburger" 
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* SIDEBAR CONTAINER - Conditional class application */}
      <div className={`sidebar ${isActive ? 'active' : ''}`} id="sidebar">
        {/* NOTE: React uses 'className' instead of 'class' */}
        <img src="img1-removebg-preview.png" alt="Logo" />
        <a href="dashboard.html">Dashboard</a>
        <a href="myinfo.html">My Info</a>
        <a href="Communication.html">Communication</a>
        <a href="performance.html">Performance</a>
        <a href="notice.html">Notice</a>
        <a href="login.html">Logout</a>
      </div>
    </>
  );
}

export default Sidebar;