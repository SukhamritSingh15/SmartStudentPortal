import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function MyInfo() {
  return (
    <>
      <style>{`
/* ===================== THEME COLORS ===================== */
:root {
  --primary: #7b2ff7;
  --light-text: #666;
  --text: #222;
  --card-bg: #fff;
  --bg: #f4f4f9;
}

/* ===================== GLOBAL ===================== */
.myinfo-page {
  margin-left: 250px; /* sidebar offset */
  padding: 40px;
  background: var(--bg);
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, sans-serif;
}

/* ===================== HEADINGS ===================== */
.myinfo-title {
  font-size: 34px;
  font-weight: bold;
  color: var(--primary);
}

.myinfo-subtitle {
  margin-bottom: 35px;
  color: var(--light-text);
}

/* ===================== GRID (3 + 3 layout) ===================== */
.myinfo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

/* ===================== CARD ===================== */
.myinfo-card {
  background: var(--card-bg);
  padding: 22px;
  border-radius: 14px;
  border-top: 5px solid var(--primary);
  box-shadow: 0px 4px 10px rgba(0,0,0,0.08);
  transition: 0.2s ease;
}

.myinfo-card:hover {
  transform: translateY(-4px);
}

.myinfo-card h2 {
  font-size: 20px;
  color: var(--primary);
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

/* ===================== ROWS ===================== */
.row {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  padding-bottom: 8px;
  border-bottom: 1px dashed #ddd;
}

.row:last-child {
  border-bottom: none;
}

.label {
  color: var(--light-text);
  font-weight: 500;
}

.value {
  font-weight: 600;
}

/* ====== Colors ====== */
.green { color: #1fa750; }
.red { color: #d63b3b; }
.orange { color: #e69500; }

/* ===================== RESPONSIVE ===================== */
@media (max-width: 900px) {
  .myinfo-page { margin-left: 0; padding: 20px; }
  .myinfo-grid { grid-template-columns: 1fr; }
}
      `}</style>

      {/* ===================== PAGE CONTENT ===================== */}
      <div className="myinfo-page">

        <h1 className="myinfo-title">My Information</h1>
        <p className="myinfo-subtitle">
          Overview of your academic, personal and contact details.
        </p>

        {/* ============ 3 CARDS IN FIRST ROW + 3 IN SECOND ROW ============ */}
        <div className="myinfo-grid">

          {/* PERSONAL DETAILS */}
          <div className="myinfo-card">
            <h2><i className="fas fa-user"></i> Personal Details</h2>
            <div className="row"><span className="label">Name</span><span className="value">Kunal Sood</span></div>
            <div className="row"><span className="label">Roll No</span><span className="value">2410991136</span></div>
            <div className="row"><span className="label">Year</span><span className="value">2nd Year</span></div>
            <div className="row"><span className="label">Program</span><span className="value">B.Tech CSE</span></div>
            <div className="row"><span className="label">Birth Date</span><span className="value">15/05/2004</span></div>
          </div>

          {/* ACADEMIC DETAILS */}
          <div className="myinfo-card">
            <h2><i className="fas fa-graduation-cap"></i> Academic Summary</h2>
            <div className="row"><span className="label">Semester</span><span className="value">3</span></div>
            <div className="row"><span className="label">Cumulative GPA</span><span className="value green">8.75</span></div>
            <div className="row"><span className="label">Credits Earned</span><span className="value">48</span></div>
            <div className="row"><span className="label">Scholarship</span><span className="value">Merit-Based</span></div>
          </div>

          {/* GUARDIAN */}
          <div className="myinfo-card">
            <h2><i className="fas fa-users"></i> Guardian Information</h2>
            <div className="row"><span className="label">Father</span><span className="value">Rajeev Sood</span></div>
            <div className="row"><span className="label">Occupation</span><span className="value">Software Architect</span></div>
            <div className="row"><span className="label">Mother</span><span className="value">Neha Sood</span></div>
            <div className="row"><span className="label">Contact</span><span className="value">98123 45678</span></div>
          </div>

          {/* FINANCIAL */}
          <div className="myinfo-card">
            <h2><i className="fas fa-wallet"></i> Financial & Fee Status</h2>
            <div className="row"><span className="label">Current Dues</span><span className="value red">₹ 15,000</span></div>
            <div className="row"><span className="label">Last Payment</span><span className="value">10 Oct 2025</span></div>
            <div className="row"><span className="label">Next Deadline</span><span className="value orange">30 Nov 2025</span></div>
            <div className="row"><span className="label">Hostel Fee</span><span className="value green">Paid</span></div>
          </div>

          {/* CONTACT */}
          <div className="myinfo-card">
            <h2><i className="fas fa-phone"></i> Contact Information</h2>
            <div className="row"><span className="label">Email</span><span className="value">kunal.sood@smartdesk.edu</span></div>
            <div className="row"><span className="label">Mobile</span><span className="value">98765 43210</span></div>
            <div className="row"><span className="label">Emergency</span><span className="value">Father: 98123 45678</span></div>
            <div className="row"><span className="label">Address</span><span className="value">123, Model Town, Chandigarh</span></div>
          </div>

          {/* EXTRA CARD (6th box) */}
          <div className="myinfo-card">
            <h2><i className="fas fa-id-card"></i> Student Profile</h2>
            <div className="row"><span className="label">Status</span><span className="value green">Active</span></div>
            <div className="row"><span className="label">Hostel</span><span className="value">Yes</span></div>
            <div className="row"><span className="label">Bus Service</span><span className="value">No</span></div>
          </div>

        </div>
      </div>
    </>
  );
}
