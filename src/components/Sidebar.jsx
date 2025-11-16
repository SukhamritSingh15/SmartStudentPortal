import React, { useState } from 'react';
// The CSS for this component should be included in your main CSS file (App.css)

function Sidebar() {
  // useState hook to manage the active/inactive state of the sidebar for mobile
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);;
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
        <a href="">Dashboard</a>
        <a href="">My Info</a>
        <a href="">Communication</a>
        <a href="">Performance</a>
        <a href="">Notice</a>
        <a href="">Logout</a>
      </div>
    </>
  );
}

export default Sidebar;