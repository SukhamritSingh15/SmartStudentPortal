// components/ApplyCourse.jsx
import React, { useState } from "react";

export default function ApplyCourse() {
  const [program, setProgram] = useState("DL");
  const [form, setForm] = useState({
    name: "",
    email: "",
    roll: "",
    year: "",
    preferredBatch: "Weekday Morning",
    mode: "Online",
  });

  const [errors, setErrors] = useState({});
  const [showReview, setShowReview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  // ---------------- VALIDATION ----------------
  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Valid email required";
    if (!form.roll.trim()) e.roll = "Roll number required";
    if (!form.year.trim()) e.year = "Year/Semester required";

    return e;
  }

  // ---------------- HANDLERS ----------------
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function openReview(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) setShowReview(true);
  }

  async function submitApplication() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));

    const app = {
      id: "APP-" + Date.now(),
      program,
      ...form,
      submittedAt: new Date().toISOString(),
    };

    const list = JSON.parse(localStorage.getItem("applications") || "[]");
    list.unshift(app);
    localStorage.setItem("applications", JSON.stringify(list, null, 2));

    setSubmitting(false);
    setShowReview(false);
    setSuccess(app);
  }

  function downloadJSON() {
    if (!success) return;
    const blob = new Blob([JSON.stringify(success, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${success.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <style>{`
        .apply-wrap { min-height: 100vh; padding: 32px; background: #f7fbff; font-family: Inter; }
        .card { max-width: 900px; margin: auto; background: white; border-radius: 12px; padding: 24px; box-shadow: 0 8px 25px rgba(0,0,0,0.06); }
        form .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        label { font-size: 13px; font-weight: 600; margin-bottom: 4px; display:block; }
        input, select { width:100%; padding:10px; border-radius:8px; border:1px solid #e4e6ef; font-size:14px; }
        .btn { padding:10px 14px; border:none; border-radius:8px; background:#6f33ff; color:white; font-weight:700; cursor:pointer; }
        .btn.secondary { background:#ebe6ff; color:#4b2bb8; }
        .review, .app-success { margin-top:16px; border-radius:10px; padding:16px; background:white; border:1px solid #eaeaff; }
        .err { font-size:13px; color:#b00020; margin-top:4px; }
        @media(max-width:800px){ .row{ grid-template-columns: 1fr; } }
      `}</style>

      <div className="apply-wrap">
        <div className="card">
          <h2>Apply for DL / ML Program</h2>
          <p className="lead">Fill the form below to apply for the specialization.</p>

          <form onSubmit={openReview}>
            {/* Program Selection */}
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
              <label style={{ display: "flex", gap: 8 }}>
                <input
                  type="radio"
                  name="program"
                  value="DL"
                  checked={program === "DL"}
                  onChange={() => setProgram("DL")}
                />
                Deep Learning (DL)
              </label>

              <label style={{ display: "flex", gap: 8 }}>
                <input
                  type="radio"
                  name="program"
                  value="ML"
                  checked={program === "ML"}
                  onChange={() => setProgram("ML")}
                />
                Machine Learning (ML)
              </label>
            </div>

            {/* Name & Email */}
            <div className="row">
              <div>
                <label>Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} />
                {errors.name && <div className="err">{errors.name}</div>}
              </div>

              <div>
                <label>Email</label>
                <input name="email" value={form.email} onChange={handleChange} />
                {errors.email && <div className="err">{errors.email}</div>}
              </div>
            </div>

            {/* Roll & Year */}
            <div className="row">
              <div>
                <label>Roll Number</label>
                <input name="roll" value={form.roll} onChange={handleChange} />
                {errors.roll && <div className="err">{errors.roll}</div>}
              </div>

              <div>
                <label>Year / Semester</label>
                <input name="year" value={form.year} onChange={handleChange} />
                {errors.year && <div className="err">{errors.year}</div>}
              </div>
            </div>

            {/* Batch */}
            <div>
              <label>Preferred Batch</label>
              <select
                name="preferredBatch"
                value={form.preferredBatch}
                onChange={handleChange}
              >
                <option>Weekday Morning</option>
                <option>Weekday Evening</option>
                <option>Weekend Morning</option>
                <option>Weekend Evening</option>
              </select>
            </div>

            {/* Mode */}
            <div style={{ marginTop: 14 }}>
              <label>Mode</label>
              <select name="mode" value={form.mode} onChange={handleChange}>
                <option>Online</option>
                <option>Offline</option>
                <option>Hybrid</option>
              </select>
            </div>

            {/* Buttons */}
            <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
              <button className="btn" type="submit">
                Review Application
              </button>

              <button
                type="button"
                className="btn secondary"
                onClick={() => {
                  setForm({
                    name: "",
                    email: "",
                    roll: "",
                    year: "",
                    preferredBatch: "Weekday Morning",
                    mode: "Online",
                  });
                  setSuccess(null);
                  setErrors({});
                }}
              >
                Reset
              </button>
            </div>
          </form>

          {/* Review section */}
          {showReview && (
            <div className="review">
              <h3>Review Your Application</h3>
              <p><b>Program:</b> {program}</p>
              <p><b>Name:</b> {form.name}</p>
              <p><b>Email:</b> {form.email}</p>
              <p><b>Roll:</b> {form.roll}</p>
              <p><b>Year/Sem:</b> {form.year}</p>
              <p><b>Preferred Batch:</b> {form.preferredBatch}</p>
              <p><b>Mode:</b> {form.mode}</p>

              <button className="btn" onClick={submitApplication}>
                {submitting ? "Submitting..." : "Submit"}
              </button>

              <button
                className="btn secondary"
                onClick={() => setShowReview(false)}
                style={{ marginLeft: 10 }}
              >
                Edit
              </button>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="app-success">
              <h3>🎉 Application Submitted!</h3>
              <p>Your Application ID: <b>{success.id}</b></p>

              <button className="btn" onClick={downloadJSON}>
                Download JSON
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
