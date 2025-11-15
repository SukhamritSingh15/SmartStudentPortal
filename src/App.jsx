import React from 'react';
import Sidebar from './components/Sidebar';
import CGPACalculator from './components/CGPAcalculator';
import './App.css'; // Import your migrated CSS

function App() {
  return (
    <>
      {/* 1. Sidebar Component */}
      <Sidebar />
      
      {/* 2. Main Calculator Component */}
      <CGPACalculator />
    </>
  );
}

export default App;