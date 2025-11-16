import React, { useState } from "react";

export default function Notice() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Notices
  const notices = [
    {
      title: "Mid Term Exam Schedule Released",
      category: "exam",
      description:
        "Mid Term Examinations for all semesters will begin from 25th October 2025.",
      date: "2025-10-10",
    },
    {
      title: "Guest Lecture on AI & Robotics",
      category: "event",
      description:
        "A special guest lecture by industry experts on AI trends will be held on 12th October.",
      date: "2025-10-05",
    },
    {
      title: "New Academic Calendar Published",
      category: "academic",
      description:
        "Academic Calendar for session 2025–26 has been uploaded.",
      date: "2025-09-28",
    },
    {
      title: "Hostel Allotment Notice",
      category: "admin",
      description:
        "New hostel allotment lists for 2nd-year and 3rd-year students released.",
      date: "2025-09-21",
    },
  ];

  const filtered = notices.filter((n) => {
    const matchTitle = n.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || category === n.category;
    return matchTitle && matchCategory;
  });

  return (
    <>
      {/* ===================== ALL CSS ===================== */}
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f7f9fc;
          margin: 0;
          padding: 0;
        }


        html, body, #root {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: #f7f9fc !important;   /* FIX GLOBAL BACKGROUND */
}

        .page-wrapper {
          min-height: 100vh;
          display: flex;
          background-color: #f7f9fc;
        }

        /* -------- Sidebar -------- */
        .sidebar {
          width: 256px;
          background-color: #7b2ff7;
          color: white;
          padding: 20px;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          box-shadow: 2px 0 10px rgba(0,0,0,0.15);
        }

        .sidebar-logo {
          padding: 20px 0;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          text-align: center;
        }
.content {
    margin-left: 256px !important;
    width: calc(100% - 256px);
}

        .sidebar nav a {
          display: block;
          padding: 12px 20px;
          color: white;
          border-radius: 8px;
          margin-bottom: 4px;
          transition: 0.2s;
        }

        .sidebar nav a:hover {
          background-color: rgba(255,255,255,0.1);
          transform: translateX(4px);
        }

        .sidebar nav .active {
          background-color: rgba(255,255,255,0.15);
          font-weight: 600;
          border-left: 4px solid white;
          padding-left: 16px;
        }

        /* -------- Main Content -------- */
        .content {
          margin-left: 256px;
          padding: 32px;
          width: calc(100% - 256px);
        }

        .header-box {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          margin-bottom: 32px;
        }

        .search-filter-box {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
        }

        .search-input, .filter-select {
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
          flex-grow: 1;
        }

        .filter-select {
          max-width: 200px;
        }

        /* -------- Notice Cards -------- */
        .notice-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          border-left: 4px solid #7b2ff7;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          margin-bottom: 20px;
          transition: 0.3s;
        }

        .notice-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(123,47,247,0.2);
        }

        .notice-title {
          font-size: 20px;
          font-weight: 600;
          color: #7b2ff7;
        }

        .notice-desc {
          margin-top: 8px;
          color: #4b4b4b;
        }

        .notice-meta {
          margin-top: 4px;
          font-size: 14px;
          color: gray;
        }
      `}</style>

      {/* ===================== PAGE START ===================== */}
      <div className="page-wrapper">

        {/* ================= SIDEBAR ================= */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <img src="img1-removebg-preview.png" alt="logo" width="140" />
          </div>

          <nav>
            <a href="#">Dashboard</a>
            <a href="#">My Info</a>
            <a href="#">Performance</a>
            <a href="#">Communication</a>
            <a href="#">CGPA Calculator</a>
            <a className="active" href="#">Notice</a>
            <hr style={{ margin: "16px 0", opacity: 0.3 }} />
            <a href="#">Logout</a>
          </nav>
        </aside>

        {/* ================= CONTENT AREA ================= */}
        <main className="content">

          <div className="header-box">
            <h1 style={{ fontSize: "30px", margin: 0 }}>Official Notice Board</h1>
            <p style={{ color: "gray", marginTop: "6px" }}>
              Latest Announcements & Circulars for Students
            </p>
          </div>

          {/* Search + Filter */}
          <div className="search-filter-box">
            <input
              type="text"
              placeholder="Search by title or keyword..."
              className="search-input"
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="filter-select"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="academic">Academic</option>
              <option value="exam">Examination</option>
              <option value="event">Events & Clubs</option>
              <option value="admin">Administration</option>
            </select>
          </div>

          {/* Notices */}
          {filtered.length > 0 ? (
            filtered.map((n, i) => (
              <div key={i} className="notice-card">
                <div className="notice-title">{n.title}</div>
                <div className="notice-desc">{n.description}</div>
                <div className="notice-meta">Category: {n.category}</div>
                <div className="notice-meta">Date: {n.date}</div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "gray", marginTop: "40px" }}>
              No notices found.
            </p>
          )}

        </main>
      </div>
    </>
  );
}
