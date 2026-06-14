import React from "react";
import "../styles/InfoPages.css";
import { FaShieldAlt, FaLock, FaEye, FaUserShield } from "react-icons/fa";

const Privacy = () => {
  return (
    <div className="info-page">
      <div className="info-header">
        <h1>Privacy Policy</h1>
        <p>News Guru Privacy Policy Details</p>
      </div>

      <div className="info-card">
        <div className="info-section">
          <h2>
            <FaShieldAlt /> 1. Introduction
          </h2>
          <p>
            News Guru respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we handle the information we collect from you when you use our services.
          </p>
        </div>

        <div className="info-section">
          <h2>
            <FaEye /> 2. Information We Collect
          </h2>
          <p>
            When you use our website, we may collect the following information:
          </p>
          <ul>
            <li>Name and email address provided by you when subscribing or contacting us.</li>
            <li>Usage data collected through cookies and analytics (such as IP address, browser type, and page views).</li>
          </ul>
        </div>

        <div className="info-section">
          <h2>
            <FaLock /> 3. Use of Information
          </h2>
          <p>
            The information we collect is used for the following purposes:
          </p>
          <ul>
            <li>To provide you with news and updates instantly.</li>
            <li>To improve our services and enhance the user experience.</li>
            <li>To answer your questions and provide support.</li>
          </ul>
        </div>

        <div className="info-section">
          <h2>
            <FaUserShield /> 4. Data Security
          </h2>
          <p>
            Your personal information will not be sold or shared with any third party. We follow appropriate security practices to ensure the safety of your information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
