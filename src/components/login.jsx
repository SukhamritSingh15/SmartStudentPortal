import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// ----------------------
//  FIX: Firebase initialized OUTSIDE component
// ----------------------
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
const auth = getAuth(app);

// ----------------------
//  React Component
// ----------------------
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // Dashboard Per User
  const dashboards = {
    "kunalsood15@gmail.com": "/dashboard",
    "sukhamritsingh1512@gmail.com": "/dashboard2",
    "sidharth.zs.05.01@gmail.com": "/dashboard3",
  };

  const validateForm = () => {
    if (!email || !password) {
      setMessage("⚠️ Please fill all fields!");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setMessage("❌ Enter a valid email!");
      return false;
    }
    if (password.length < 5) {
      setMessage("🔒 Password must be at least 5 characters!");
      return false;
    }
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setMessage("✅ Login Successful! Redirecting...");
        setLoggedIn(true);

        setTimeout(() => {
          window.location.href = dashboards[email] || "/dashboard";
        }, 1500);
      })
      .catch((error) => {
        setMessage("❌ " + error.message);
      });
  };

  return (
    <div className="full-page">
      <style>{`
        .full-page {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #e9e9e9;
          font-family: Arial, sans-serif;
        }
        .container {
          width: 80%;
          max-width: 900px;
          display: flex;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .login-section {
          flex: 1;
          padding: 40px;
        }
        .login-section h2 {
          font-size: 32px;
          color: #4b2ba8;
          margin-bottom: 10px;
        }
        .login-section p {
          color: gray;
          margin-bottom: 20px;
        }
        .login-section label {
          font-weight: 600;
          display: block;
          margin-top: 15px;
        }
        .login-section input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          margin-top: 5px;
        }
        .login-section button {
          width: 100%;
          padding: 12px;
          background: #6a42e5;
          border: none;
          color: white;
          margin-top: 20px;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }
        .login-section button:hover {
          background: #592cd3;
        }
        .forgot {
          margin-top: 15px;
          text-align: left;
        }
        .forgot a {
          color: #6a42e5;
          text-decoration: none;
        }
        .welcome-section {
          flex: 1;
          background: #f0f0f0;
          border-radius: 0 12px 12px 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .welcome-section img {
          width: 95%;
          border-radius: 10px;
        }
        .message-box {
          margin-top: 10px;
          font-weight: 600;
        }
      `}</style>

      <div className="container">
        {!loggedIn ? (
          <div className="login-section">
            <h2>Login</h2>
            <p>Enter your credentials below</p>

            <form onSubmit={handleLogin}>
              <label>Email</label>
              <input
                type="email"
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">Login</button>

              <div className="forgot">
                <a href="#">Forgot your password?</a>
              </div>

              <div className="message-box">{message}</div>
            </form>
          </div>
        ) : (
          <div className="login-section">
            <h2>Welcome!</h2>
            <p>Email: {email}</p>
            <p>Firebase Login Successful.</p>
            <button onClick={() => window.location.reload()}>Logout</button>
          </div>
        )}

        <div className="welcome-section">
          <img src="/img4.png" alt="Student Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
