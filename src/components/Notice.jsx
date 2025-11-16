import React, { useState } from "react";
import Sidebar from "./Sidebar";   // <-- using your real sidebar

export default function Notice() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Notices Data
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
      description: "Academic Calendar for session 2025–26 has been uploaded.",
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
      <style>{`
        body {
          background: #f7f9fc !important;
          margin: 0;
          padding: 0;
        }

        .notice-container {
          margin-left: 250px; 
          padding: 32px;
          min-height: 100vh;
          background: #f7f9fc;
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

      {/* REAL SIDEBAR */}
      <Sidebar />

      {/* PAGE CONTENT */}
      <main className="notice-container">

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
    </>
  );
}
