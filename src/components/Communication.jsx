import React, { useState } from "react";

export default function Communication() {
  const [modalOpen, setModalOpen] = useState(false);
  const [recipient, setRecipient] = useState("");

  const openModal = (name) => {
    setRecipient(name);
    setModalOpen(true);
  };

  const sendMessage = () => {
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    if (subject && message) {
      alert(`Message sent!\nSubject: ${subject}\nMessage: ${message}`);
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
      setModalOpen(false);
    } else {
      alert("Please fill both Subject and Message fields.");
    }
  };

  return (
    <>
      {/* ==== FULL PAGE STYLES INCLUDED HERE ==== */}
      <style>{`
        :root {
          --primary: #915ee1;
          --background: #ffffff;
          --light-gray: #f5f5f7;
          --text: #333;
        }

        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }

        body {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          background: var(--light-gray);
          color: var(--text);
          overflow-x: hidden;
        }

        .sidebar {
          background-color: var(--primary);
          color: white;
          min-height: 100vh;
          width: 240px;
          padding: 20px;
          position: fixed;
          left: 0;
          top: 0;
          transition: transform 0.3s ease;
          transform: translateX(0);
          z-index: 1000;
          box-shadow: 2px 0 10px rgba(0,0,0,0.15);
        }

        .sidebar img {
          width: 160px;
          display: block;
          margin: 0 auto 30px;
        }

        .sidebar a {
          color: white;
          text-decoration: none;
          display: block;
          padding: 10px 0;
          font-weight: 500;
        }

        .sidebar a:hover {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding-left: 15px;
        }

        header {
          background: var(--primary);
          color: white;
          text-align: center;
          padding: 1.2rem 0;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          margin-left: 240px;
          position: sticky;
          top: 0;
          z-index: 900;
          transition: margin-left 0.3s ease;
        }

        header h1 {
          margin: 0;
          font-size: 1.8rem;
        }

        .container {
          width: 90%;
          max-width: 1100px;
          margin: 30px auto;
          background: var(--background);
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          margin-left: 270px;
          transition: margin-left 0.3s ease;
        }

        h2 {
          color: var(--primary);
          margin-bottom: 10px;
          font-size: 1.4rem;
        }

        .section {
          margin-top: 25px;
        }

        .card {
          background: white;
          border-radius: 10px;
          padding: 15px;
          margin: 10px 0;
          box-shadow: 0 12px 12px rgba(0,0,0,0.1);
        }

        .card h3 {
          margin: 0 0 5px 0;
          color: var(--primary);
        }

        .card p {
          margin: 2px 0;
          font-size: 0.9rem;
        }

        .message-btn {
          margin-top: 8px;
          padding: 6px 12px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .message-btn:hover {
          background: #6c63ff;
        }

        .modal {
          display: ${modalOpen ? "block" : "none"};
          position: fixed;
          z-index: 1001;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0,0,0,0.5);
          padding-top: 60px;
        }

        .modal-content {
          background: white;
          margin: auto;
          padding: 20px;
          border-radius: 10px;
          width: 90%;
          max-width: 500px;
          position: relative;
        }

        .close {
          position: absolute;
          right: 15px;
          top: 10px;
          font-size: 24px;
          cursor: pointer;
        }

        .modal input, .modal textarea {
          width: 100%;
          margin: 8px 0;
          padding: 8px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .send-btn {
          background: var(--primary);
          color: white;
          padding: 8px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .send-btn:hover {
          background: #6c63ff;
        }

        footer {
          text-align: center;
          color: #777;
          font-size: 14px;
          margin: 30px 0;
          margin-left: 270px;
        }

        .hamburger {
          display: none;
          position: fixed;
          top: 15px;
          left: 15px;
          background: var(--primary);
          color: white;
          border: none;
          font-size: 22px;
          border-radius: 5px;
          padding: 8px 12px;
          cursor: pointer;
          z-index: 1101;
        }

        @media (max-width: 992px) {
          .sidebar {
            transform: translateX(-100%);
          }
          .sidebar.active {
            transform: translateX(0);
          }
          header {
            margin-left: 0;
          }
          .container {
            margin-left: 0;
            width: 95%;
          }
          footer {
            margin-left: 0;
          }
          .hamburger {
            display: block;
          }
        }
      `}</style>

      {/* ==== Sidebar ==== */}
      <div
        className="sidebar"
        id="sidebar"
        onClick={() =>
          document.getElementById("sidebar").classList.toggle("active")
        }
      >
        <img src="img1-removebg-preview.png" alt="Logo" />
        <a href="/dashboard">Dashboard</a>
        <a href="/myinfo">My Info</a>
        <a href="/notice">Notice</a>
        <a href="/performance">Performance</a>
        <a href="/cgpa">CGPA Calculator</a>
        <a href="/login">Logout</a>
      </div>

      <button
        className="hamburger"
        onClick={() =>
          document.getElementById("sidebar").classList.toggle("active")
        }
      >
        ☰
      </button>

      {/* ==== Header ==== */}
      <header>
        <h1>Student Communication Dashboard</h1>
      </header>

      {/* ==== Main ==== */}
      <div className="container">
        {/* Mentor */}
        <section className="section">
          <h2>Mentor</h2>
          <div className="card">
            <h3>DR CHETNA</h3>
            <p>Course: OOSE</p>
            <p>Email: chetna@chitkara.edu.in</p>
            <button className="message-btn" onClick={() => openModal("DR CHETNA")}>
              Message
            </button>
          </div>
        </section>

        {/* Teachers */}
        <section className="section">
          <h2>Course Teachers</h2>

          <div className="card">
            <h3>DR VIBHU</h3>
            <p>Course: Java Programming</p>
            <p>Email: vibu@chitkara.edu.in</p>
            <button className="message-btn" onClick={() => openModal("DR VIBHU")}>Message</button>
          </div>

          <div className="card">
            <h3>DR AMANDEEP</h3>
            <p>Course: ES & IOT</p>
            <p>Email: amandeep@chitkara.edu.in</p>
            <button className="message-btn" onClick={() => openModal("DR AMANDEEP")}>Message</button>
          </div>

          <div className="card">
            <h3>DR AKSHAY</h3>
            <p>Course: FEE</p>
            <p>Email: akshay@chitkara.edu.in</p>
            <button className="message-btn" onClick={() => openModal("DR AKSHAY")}>Message</button>
          </div>
        </section>
      </div>

      {/* ==== Modal ==== */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <h3>Message to {recipient}</h3>

            <input type="text" id="subject" placeholder="Subject" />
            <textarea id="message" rows="5" placeholder="Type your message..." />

            <button className="send-btn" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}

      {/* ==== Footer ==== */}
      <footer>&copy; 2025 | Student Communication Dashboard</footer>
    </>
  );
}
