import React, { useEffect } from "react";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  // INIT FIREBASE
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyDokgC29ZW2v0MJDKVifnvH1M8W6sXJXUI",
      authDomain: "my-login-project-243c5.firebaseapp.com",
      projectId: "my-login-project-243c5",
      storageBucket: "my-login-project-243c5.appspot.com",
      messagingSenderId: "252344831078",
      appId: "1:252344831078:web:59ee84778dd2a94854b1a7",
      measurementId: "G-R0Q6WDB4YL",
    };

    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
  }, []);

  // HANDLE SIGNUP
  const handleSignup = (e) => {
    e.preventDefault();
    const auth = getAuth();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirm-password").value.trim();

    if (!name || !email || !password || !confirm) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Signup Successful!");
        window.location.href = "/login";
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      {/* ===================== INLINE CSS ===================== */}
      <style>{`
      /* FIX WHITESPACE — REMOVE ALL DEFAULT MARGINS */
html, body, #root {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important; 
  background-color: #a362ea;
}

/* FULL PAGE WRAPPER FIX */
.container {
  display: flex;
  width: 100vw !important;
  height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* REMOVE ANY PADDING FROM REACT ROOT PARENT */
#root {
  margin: 0 !important;
  padding: 0 !important;
}

        .intro {
          position: fixed;
          top: 0; left: 0;
          height: 100%; width: 100%;
          background: linear-gradient(to right, #e0f7fa, #e3f2fd);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999;
          animation: fadeOut 1s ease forwards;
          animation-delay: 3s;

        }


        .welcome-section {
  width: 50vw !important;
  height: 100vh;
}


        .logo-img {
          width: 200px;
          animation: logoZoomSequence 3s ease forwards;
        }

        @keyframes logoZoomSequence {
          0% { transform: scale(0); opacity: 0; }
          33% { transform: scale(1.8); opacity: 1; }
          66% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1.2); opacity: 1; }
        }

        @keyframes fadeOut {
          to { opacity: 0; visibility: hidden; }
        }

        * {
          margin: 0; padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
        }

        body, html {
          height: 100%;
          background: white;
        }

        .container {
          display: flex;
          height: 100vh;
         
        }

        .login-section {
          flex: 1;
          background-color: #1f1f1f;
          color: white;
          padding: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        //    margin-right:100px;
        }

        .login-section h2 {
          font-size: 28px;
          margin-bottom: 10px;
          
        }

        .login-section p {
          font-size: 14px;
          color: #aaa;
          margin-bottom: 30px;
        }

        .login-section label {
          font-size: 14px;
          margin-top: 20px;
        }

        .login-section input {
          width: 100%;
          padding: 12px;
          margin-top: 5px;
          background: #2d2d2d;
          border: none;
          border-radius: 6px;
          color: white;
        }

        .login-section button {
          width: 100%;
          padding: 12px;
          margin-top: 30px;
          background-color: #a362ea;
          border: none;
          border-radius: 6px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }

        .login-section button:hover {
          background-color: #8b4dde;
        }

        .forgot {
          margin-top: 15px;
        }

        .forgot a {
          color: #888;
          font-size: 13px;
          text-decoration: none;
        }

        .welcome-section {
          flex: 1;
          background: #a362ea;
          color: white;
        //   padding: 60px;
       
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          position: relative;
        }

        .welcome-section img {
        padding-left:150px;
          max-width: 80%;
          margin: 0 auto;
          height: auto;
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }
          .login-section, .welcome-section {
            width: 100%;
            padding: 40px 20px;
            text-align: center;
          }
        }
      `}</style>

      {/* ===================== PAGE STRUCTURE ===================== */}

      {/* Splash Intro */}
      <div className="intro">
        <img src="img1-removebg-preview.png" className="logo-img" alt="Logo" />
      </div>

      {/* Signup Layout */}
      <div className="container">

        {/* LEFT SECTION */}
        <div className="login-section">
          <h2>Create Account</h2>
          <p>Enter your details below to sign up</p>

          <form onSubmit={handleSignup}>
            <label>Full Name</label>
            <input id="name" type="text" placeholder="Your name" required />

            <label>Email</label>
            <input id="email" type="email" placeholder="example@domain.com" required />

            <label>Password</label>
            <input id="password" type="password" placeholder="Create password" required />

            <label>Confirm Password</label>
            <input id="confirm-password" type="password" placeholder="Repeat password" required />

            <button type="submit">Sign Up</button>

            <div className="forgot">
              <a href="/login">Already have an account? Login</a>
            </div>
          </form>
        </div>

        {/* RIGHT SECTION */}
        <div className="welcome-section">
          <img src="img4.png" alt="Student" />
        </div>

      </div>
    </>
  );
}
