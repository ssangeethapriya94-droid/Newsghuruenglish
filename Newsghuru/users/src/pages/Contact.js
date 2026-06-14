import React, { useState } from "react";
import API from "../config/api";
import "../styles/InfoPages.css";
import { FaEnvelope, FaMapMarkerAlt, FaBuilding, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      try {
        await API.post("/api/contact", form);
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } catch (error) {
        console.error("Submit error:", error);
        alert("Error sending message. Please try again.");
      }
    }
  };

  return (
    <div className="info-page">
      <div className="info-header">
        <h1>Contact Us</h1>
        <p>If you have any questions or news, please Contact Us</p>
      </div>

      <div className="info-card">
        <div className="contact-grid">
          {/* CONTACT INFO */}
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-details">
                <h3>Email Address</h3>
                <a href="mailto:info@newsghuru.in">info@newsghuru.in</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-details">
                <h3>Address</h3>
                <p>Chennai, Tamil Nadu, India</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <FaBuilding />
              </div>
              <div className="contact-details">
                <h3>Company</h3>
                <p>
                  News Ghuru is a digital media brand operated by Gurudeva Entertainments Private Limited.
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="contact-form-container">
            <h3>Send a Message</h3>
            {submitted && (
              <div className="alert-success">
                Your Message was successfully sent! Thank you.
              </div>
            )}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Your Email"
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows="5"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Type Your Message here..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
