import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Performance() {
  return (
    <>
      <style>{`
        :root {
          --primary: #7b2ff7;
          --bg: #f4f4f9;
          --card: #fff;
          --text: #333;
        }

        .performance-page {
          margin-left: 250px; /* Keep space for sidebar */
          padding: 40px;
          background: var(--bg);
          min-height: 100vh;
          width: 1300px;
        }

        .performance-title {
          text-align: center;
          font-size: 32px;
          font-weight: bold;
          color: var(--text);
          margin-bottom: 40px;
        }

        /* Full-width container */
        .full-width-section {
          background: var(--card);
          padding: 25px;
          border-radius: 14px;
          margin-bottom: 40px;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.08);
          width: 100%;
        }

        .section-title {
          font-size: 22px;
          color: var(--primary);
          margin-bottom: 15px;
          font-weight: 600;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 10px;
        }

        th {
          background: var(--primary);
          color: white;
          padding: 12px;
          text-align: center;
          font-size: 15px;
        }

        td {
          padding: 12px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
          text-align: center;
        }

        tr:last-child td {
          border-bottom: none;
        }

        .footer-text {
          text-align: center;
          margin-top: 30px;
          color: #777;
          font-size: 13px;
        }

        @media (max-width: 900px) {
          .performance-page {
            margin-left: 0; 
            width: 100%;
            padding: 20px;
          }
          th, td { font-size: 13px; }
        }
      `}</style>

      <div className="performance-page">

        <h1 className="performance-title">Student Performance Dashboard</h1>

        {/* ================= FULL-WIDTH SECTION 1 ================= */}
        <div className="full-width-section">
          <h2 className="section-title">Exam Marks</h2>

          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks Scored</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mid Term</td>
                <td>24</td>
                <td>30</td>
              </tr>
              <tr>
                <td>End Term</td>
                <td>26</td>
                <td>30</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ================= FULL-WIDTH SECTION 2 ================= */}
        <div className="full-width-section">
          <h2 className="section-title">FA (Formative Assessment)</h2>

          <table>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Marks Scored</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>FA1</td>
                <td>8</td>
                <td>10</td>
              </tr>
              <tr>
                <td>FA2</td>
                <td>9</td>
                <td>10</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ================= FULL-WIDTH SECTION 3 ================= */}
        <div className="full-width-section">
          <h2 className="section-title">Evaluation (Project & Viva)</h2>

          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Marks Scored</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Presentation</td>
                <td>4</td>
                <td>5</td>
              </tr>
              <tr>
                <td>Project Work & Viva</td>
                <td>23</td>
                <td>25</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="footer-text">© 2025 | Student Performance Dashboard</p>

      </div>
    </>
  );
}
