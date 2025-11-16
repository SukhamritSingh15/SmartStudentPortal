import React, { useState } from "react";

const NeedHelp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Technical",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", category: "Technical", message: "" });
  };

  return (
    <div style={styles.page}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>⚡ Smart Student Portal</h2>
       
      </div>

      <div style={styles.main}>
        <div style={styles.container}>
          <h2 style={styles.title}>🆘 Need Help?</h2>
          <p style={styles.subtitle}>
            Having trouble with academics, technical issues, or administrative tasks?
            Submit your issue below, and our support team will assist you shortly.
          </p>

          {submitted ? (
            <div style={styles.successBox}>
              <h3>✅ Thank you!</h3>
              <p>Your message has been sent successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                style={styles.input}
                required
              />

              <label style={styles.label}>Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                style={styles.input}
                required
              />

              <label style={styles.label}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={styles.select}
              >
                <option>Technical</option>
                <option>Academic</option>
                <option>Administrative</option>
                <option>Other</option>
              </select>

              <label style={styles.label}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your issue..."
                style={styles.textarea}
                required
              ></textarea>

              <button type="submit" style={styles.button}>📩 Submit</button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

const styles = {
  page: { display: "flex", minHeight: "100vh", fontFamily: "Poppins, sans-serif" },
  sidebar: { width: "260px", color: "#fff", padding: "30px 20px", position: "fixed", height: "100vh" },
  logo: { textAlign: "center", marginBottom: "30px", fontSize: "1.3rem" },
  nav: { display: "flex", flexDirection: "column", gap: "15px" },
  link: { color: "#fff", textDecoration: "none", padding: "10px 15px", borderRadius: "8px", transition: "0.3s" },
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
},
  title: { textAlign: "center", color: "#646464ff" },
  subtitle: { textAlign: "center", color: "#666", marginBottom: "30px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  label: { fontWeight: "500", color: "#333" },
  input: { padding: "10px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem" },
  select: { padding: "10px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem" },
  textarea: { padding: "10px", borderRadius: "8px", border: "1px solid #ccc", minHeight: "120px", resize: "none" },
  button: { background: "#7b2ff7", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", cursor: "pointer", fontSize: "1rem" },
  successBox: { textAlign: "center", background: "#ede6ff", border: "2px solid #7b2ff7", borderRadius: "12px", padding: "25px" },
  footer: { textAlign: "center", background: "#7b2ff7", color: "#fff", padding: "10px", borderRadius: "8px", marginTop: "30px" },
};

export default NeedHelp;
