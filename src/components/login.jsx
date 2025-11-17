import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
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

    initializeApp(firebaseConfig);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const auth = getAuth();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("message");

    if (!email || !password) {
      msg.style.color = "yellow";
      msg.innerHTML = "⚠️ Please fill all fields";
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      msg.style.color = "red";
      msg.innerHTML = "❌ Invalid email format";
      return;
    }
    if (password.length < 5) {
      msg.style.color = "red";
      msg.innerHTML = "❌ Password must be at least 5 characters";
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        msg.style.color = "lightgreen";
        msg.innerHTML = "Login successful! Redirecting...";
        setTimeout(() => (window.location.href = "/dashboard"), 1500);
      })
      .catch((err) => {
        msg.style.color = "red";
        msg.innerHTML = err.message;
      });
  };

  return (
    <>
      <style>{`
        
/* RESET EVERYTHING */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* Remove sidebar on login page */
.sidebar, .hamburger { display: none !important; }

html, body, #root {
  width: 100%;
  height: 100%;
  background: #938e8eff !important;
  overflow: hidden;
}

/* PAGE CENTERING */
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;   /* Horizontal centering */
  align-items: center;       /* Vertical centering */
}

/* LOGIN BOX */
.login-box {
  width: 450px;
  padding: 40px;
  background: #1f1f1f;
  border-radius: 12px;
  color: white;
}

.login-box h2 {
  margin-bottom: 10px;
}

.login-box p {
  margin-bottom: 25px;
  color: #aaa;
}

.login-box label {
  margin-top: 15px;
  display: block;
}

.login-box input {
  width: 100%;
  padding: 12px;
  background: #2d2d2d;
  border: none;
  border-radius: 6px;
  color: white;
  margin-top: 5px;
}

.login-box button {
  width: 100%;
  margin-top: 25px;
  padding: 12px;
  background: #a362ea;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.login-box button:hover {
  background: #8b4dde;
}

.forgot {
  margin-top: 10px;
}

.forgot a {
  color: #ccc;
  font-size: 13px;
  text-decoration: none;
}

      `}</style>

      {/* LOGIN PAGE */}
      <div className="container">
        <div className="login-box">
          <h2>Login</h2>
          <p>Enter your credentials below</p>

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input id="email" type="email" />

            <label>Password</label>
            <input id="password" type="password" />

            <button type="submit">Login</button>

            <div id="message" style={{ marginTop: "10px" }}></div>

            <div className="forgot">
              <a href="#">Forgot your password?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
