import React, { useEffect } from "react";

export default function Dashboard() {

  useEffect(() => {
    /* =======================
       ADD ORIGINAL CSS IN <style>
    ======================== */
    const style = document.createElement("style");
    style.innerHTML = `
    html, body, #root {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.container-fluid {
  max-width: 100%;
  overflow-x: hidden;
}

.row {
  width: 100%;
  margin: 0;
}

      body {
        background-color: #e6e6ea;
        overflow-x: hidden;
      }

      .sidebar {
        background-color: #7b2ff7;
        color: white;
        min-height: 100vh;
        padding: 20px;
      }

      .sidebar a {
        color: white;
        text-decoration: none;
        display: block;
        padding: 10px 0;
        font-weight: 500;
      }

      .sidebar a:hover {
        background-color: rgba(255,255,255,0.2);
        border-radius: 8px;
        padding-left: 15px;
      }

      .i1 { width: 180px; }

      /* Banner */
      .banner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #7b2ff7;
        color: white;
        border-radius: 12px;
        padding: 20px 30px;
        box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
        flex-wrap: wrap;
      }

      .banner img {
        width: 280px;
        height: 180px;
        object-fit: contain;
      }

      .banner-left h1 { font-size: 1.6rem; }
      .banner-left p { font-size: 0.9rem; opacity: 0.9; }

      /* Finance Cards */
      .finance-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-top: 25px;
      }

      .finance-card {
        flex: 1 1 calc(33.333% - 20px);
        background: white;
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
      }

      .finance-card img { width: 50px; margin-bottom: 10px; }
      .finance-card h2 { font-size: 1.2rem; margin: 5px 0; }

      /* Courses */
      .courses-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }

      .course-card {
        background: white;
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        border: 1px solid #a259ff;
        transition: 0.3s;
      }

      .course-card:hover {
        transform: scale(1.03);
        border-color: #7b2ff7;
      }

      .course-info h3 {
        color: #7b57ff;
        font-size: 1.1rem;
      }

      /* Right Panel */
      .fixed-right {
        position: sticky;
        top: 10px;
        background: #f8f9fa;
        border-radius: 10px;
        padding: 15px;
        border: 1px solid #ddd;
      }

      .task-item {
        background: white;
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .task-icon {
        width: 40px;
        height: 40px;
        background: #eee;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }

      a { color: white; }

      .new-chat-btn {
        background-color: #6c63ff;
        color: white;
        border: none;
        width: 100%;
        padding: 8px;
        border-radius: 6px;
      }

      .sch {
        border-radius: 30px;
        border: 1px solid gray;
      }

      @media (min-width: 992px) {
        body { overflow-y: hidden; }
      }

      @media (max-width: 991px) {
        .sidebar {
          position: fixed;
          top: 0;
          left: -250px;
          width: 220px;
          height: 100%;
          z-index: 999;
          transition: 0.3s;
        }
        .sidebar.active { left: 0; }
        .toggle-btn {
          background-color: #7b2ff7;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 8px 12px;
          margin: 10px;
        }
        .col-md-7 { margin-top: 60px; }
      }
    `;
    document.head.appendChild(style);

    /* =======================
       BUILD SIDEBAR (same JS)
    ======================== */
    const sidebar = document.createElement("div");
    sidebar.className = "sidebar";
    sidebar.id = "sidebar";

    const logoImg = document.createElement("img");
    logoImg.src = "img1-removebg-preview.png";
    logoImg.className = "i1 mb-4";
    sidebar.appendChild(logoImg);

    const links = [
      { href: "/dashboard", text: "Dashboard" },
      { href: "/myinfo", text: "My Info" },
      { href: "/performance", text: "Performance" },
      { href: "/communication", text: "Communication" },
      { href: "/notice", text: "Notice" },
      { href: "/cgpa", text: "CGPA Calculator" },
      { href: "/login", text: "Logout" }
    ];

    links.forEach(item => {
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.text;
      sidebar.appendChild(a);
    });

    document.getElementById("sidebar-container").appendChild(sidebar);
  }, []);

  const toggleSidebar = () =>
    document.getElementById("sidebar").classList.toggle("active");

  return (
    <>
      <button className="toggle-btn d-lg-none" onClick={toggleSidebar}>☰ Menu</button>

      <div className="container-fluid">
        <div className="row">

          <div className="col-lg-2" id="sidebar-container"></div>

          <div className="col-lg-7 col-md-12 p-4">
            <input type="text" className="form-control mb-3 sch" placeholder="Search" />

            <div className="banner">
              <div className="banner-left">
                <h1>Welcome back, Kunal!</h1>
                <p>Always stay updated in your student portal</p>
              </div>
              <img src="Screenshot 2025-08-11 224225.png" alt="Student" />
            </div>

            <div className="finance-container">
              <div className="finance-card">
                <a href="/attendance">
                  <img src="3589030.png" alt="Attendance" />
                  <h2 style={{ color: "black" }}>Attendance</h2>
                </a>
              </div>

           

              <div className="finance-card">
                <a href="/Apply"> 
                <img src="leave-request-2.png" alt="DL/ML" />
                 <h2 style={{ color: "black" }}>DL/ML</h2>
                </a>
              </div>
            </div>

            {/* Courses */}
            <div className="section-title mt-4 fw-bold">Enrolled Courses</div>
            <div className="courses-container">
              {["Object Oriented Programming","Fundamentals of Database Systems","Data Structures & Algorithms"]
                .map((course, i) => (
                <div className="course-card" key={i}>
                  <div className="course-info">
                    <h3>{course}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-lg-3 col-md-12 mt-4 mt-lg-0">
            <div className="fixed-right">

              <div className="d-flex align-items-center mb-4">
                <img src="img2.jpeg" className="rounded-circle me-3" width="60" height="60" />
                <div>
                  <h6 className="mb-0">Kunal Sood</h6>
                  <small>Roll no: 2410991136</small><br />
                  <small>2nd Year</small>
                </div>
              </div>

              <h6>Upcoming Tasks</h6>

              {/* SAME TASKS */}
              <div className="task-item">
                <div className="task-icon bg-danger text-white">A</div>
                <div>
                  <strong>Discussion Algorithm</strong><br />
                  <small>09:00 AM - 11:00 AM</small>
                </div>
              </div>

              <div className="task-item">
                <div className="task-icon bg-warning text-white">M</div>
                <div>
                  <strong>Revision</strong><br />
                  <small>02:00 PM - 04:00 PM</small>
                </div>
              </div>

              <div className="task-item">
                <div className="task-icon bg-warning text-white">M</div>
                <div>
                  <strong>FA2</strong><br />
                  <small>30 October, 2025</small>
                </div>
              </div>

              <div className="task-item">
                <div className="task-icon bg-warning text-white">M</div>
                <div>
                  <strong>Revision DSA</strong><br />
                  <small>02:00 PM - 04:00 PM</small>
                </div>
              </div>
            </div>
<br></br>
            <hr />

            <div className="friend-item d-flex align-items-center mb-3">
              <img src="img2.jpeg" className="rounded-circle me-2" width="40" height="40" />
              <div><strong>Need help?</strong></div>
            </div>

            <button className="new-chat-btn">
              <a href="/Help">Need Help 😊</a>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
