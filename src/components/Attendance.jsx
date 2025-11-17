import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const AttendancePage = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [attendanceData] = useState([
    { code: "CSE0101", delivered: 165, attended: 147, dl: 0, ml: 0, approvedDL: 0, approvedML: 0 },
    { code: "CSE0201", delivered: 60, attended: 54, dl: 0, ml: 0, approvedDL: 0, approvedML: 0 },
    { code: "CSE0210", delivered: 49, attended: 41, dl: 0, ml: 0, approvedDL: 0, approvedML: 0 },
    { code: "CSE0205", delivered: 92, attended: 82, dl: 0, ml: 0, approvedDL: 0, approvedML: 0 },
    { code: "CSE0307", delivered: 70, attended: 59, dl: 1, ml: 0, approvedDL: 1, approvedML: 0 },
  ]);

  const [analysis, setAnalysis] = useState(null);

  // ✅ Chart.js useEffect with cleanup
  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");;;;;;
    if (!ctx) return;

    // Destroy previous chart before re-creating
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const subjectCodes = attendanceData.map((sub) => sub.code);
    const percentages = attendanceData.map(
      (sub) => ((sub.attended / sub.delivered) * 100).toFixed(2)
    );

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: subjectCodes,
        datasets: [
          {
            label: "Attendance Percentage (%)",
            data: percentages,
            backgroundColor: "#7b2ff7",
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, max: 100, ticks: { color: "#333" } },
          x: { ticks: { color: "#333" } },
        },
      },
    });

    // Cleanup chart on unmount
    return () => chartInstance.current?.destroy();
  }, [attendanceData]);

  // ✅ Analyze Attendance
  const handleAnalyze = () => {
    const percentages = attendanceData.map(
      (sub) => ((sub.attended / sub.delivered) * 100).toFixed(2)
    );
    const below75 = attendanceData.filter((_, i) => percentages[i] < 75);
    const avg = (
      percentages.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) /
      percentages.length
    ).toFixed(2);

    const totalDL = attendanceData.reduce((a, b) => a + b.dl, 0);
    const totalML = attendanceData.reduce((a, b) => a + b.ml, 0);
    const approvedDL = attendanceData.reduce((a, b) => a + b.approvedDL, 0);
    const approvedML = attendanceData.reduce((a, b) => a + b.approvedML, 0);

    setAnalysis({ avg, below75, totalDL, totalML, approvedDL, approvedML });
  };
return (
  <div style={styles.main}>
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Student Attendance Record</h2>

      <div style={styles.info}>
        <p><strong>Name:</strong> Kunal Sood</p>
        <p><strong>Roll No:</strong> 22BCS1136</p>
        <p><strong>Department:</strong> Computer Science Engineering</p>
        <p><strong>Session:</strong> Jul - Dec 2025</p>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Subject Code</th>
            <th>Delivered</th>
            <th>Attended</th>
            <th>DL</th>
            <th>ML</th>
            <th>Attendance %</th>
            <th>Approved DL</th>
            <th>Approved ML</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((sub, i) => {
            const percentage = ((sub.attended / sub.delivered) * 100).toFixed(2);
            return (
              <tr key={i}>
                <td>{sub.code}</td>
                <td>{sub.delivered}</td>
                <td>{sub.attended}</td>
                <td>{sub.dl}</td>
                <td>{sub.ml}</td>
                <td style={{ color: percentage >= 75 ? "green" : "red" }}>
                  {percentage}%
                </td>
                <td>{sub.approvedDL}</td>
                <td>{sub.approvedML}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button style={styles.button} onClick={handleAnalyze}>
          🔍 Analyze Attendance
        </button>
      </div>

      {analysis && (
        <div style={styles.analysisBox}>
          <h3>📋 Attendance Analysis</h3>
          <p><strong>Average Attendance:</strong> {analysis.avg}%</p>
          <p><strong>Total DL:</strong> {analysis.totalDL} | <strong>Approved:</strong> {analysis.approvedDL}</p>
          <p><strong>Total ML:</strong> {analysis.totalML} | <strong>Approved:</strong> {analysis.approvedML}</p>
          {analysis.below75.length > 0 ? (
            <p style={{ color: "red" }}>⚠️ Below 75% in: {analysis.below75.map((s) => s.code).join(", ")}</p>
          ) : (
            <p style={{ color: "green" }}>✅ You are above 75% in all subjects!</p>
          )}
        </div>
      )}

      <div style={styles.chartContainer}>
        <canvas ref={chartRef}></canvas>
      </div>

      <footer style={styles.footer}>
        Smart Student Portal © 2025 | Designed by Kunal Sood
      </footer>
    </div>
  </div>
);

};

// ✅ Inline styling for simplicity
const styles = {
  page: { display: "flex", minHeight: "100vh", fontFamily: "Poppins, sans-serif", background: "#f5f7fa" },
  sidebar: { width: "250px", background: "#7b2ff7", padding: "30px 20px", color: "#fff", position: "fixed", height: "100vh" },
 main: {
  marginLeft: "350px",
  padding: "40px",
  width: "calc(100% - 250px)",
  display: "flex",
  justifyContent: "center",
  background: "background: linear-gradient(to right, #d0cecd, #e0caca);",
}
,
 container: {
  width: "100%",             // take most of the space
  maxWidth: "1400px",       // increase width limit
  background: "#fff",
  borderRadius: "12px",
  padding: "30px",
  boxShadow: "0 0 15px rgba(0,0,0,0.1)"
}
,
  title: { textAlign: "center", color: "#7b2ff7" },
  info: { textAlign: "center", marginBottom: 20 },
  table: { width: "100%", borderCollapse: "collapse" },
  button: { background: "#7b2ff7", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer" },
  analysisBox: { marginTop: 20, background: "#f1edff", padding: 15, borderLeft: "5px solid #7b2ff7", borderRadius: 8 },
  chartContainer: { marginTop: 30 },
  footer: { textAlign: "center", background: "#7b2ff7", color: "white", padding: "10px", borderRadius: "8px", marginTop: "20px" },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    color:"#fff"
  },
   activeLink: {
    background: "#6020c9",
    padding: "10px 15px",
    borderRadius: "8px",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
  },link: {
  display: "block",
  color: "#fff",
  textDecoration: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  fontWeight: "500",
  transition: "0.3s",
},
linkHover: {
  background: "#6020c9",
},



};

export default AttendancePage;;
