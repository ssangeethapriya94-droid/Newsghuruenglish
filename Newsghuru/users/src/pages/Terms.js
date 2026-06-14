import React from "react";
import "../styles/InfoPages.css";
import { FaFileContract, FaGavel, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const Terms = () => {
  return (
    <div className="info-page">
      <div className="info-header">
        <h1>Terms and Conditions</h1>
        <p>Rules for using News Guru services</p>
      </div>

      <div className="info-card">
        <div className="info-section">
          <h2>
            <FaFileContract /> 1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the News Guru (News Ghuru) website, you agree to be bound by these terms and conditions. If you do not agree to these terms, you are requested not to use our website.
          </p>
        </div>

        <div className="info-section">
          <h2>
            <FaGavel /> 2. Intellectual Property
          </h2>
          <p>
            All articles, news, images, logos and other content on our website are the property of News Guru. They may not be copied, published or distributed without our prior permission.
          </p>
        </div>

        <div className="info-section">
          <h2>
            <FaCheckCircle /> 3. User Responsibilities
          </h2>
          <p>
            While using our services, you must not engage in any activity that is illegal or harmful to our reputation.
          </p>
          <ul>
            <li>Do not spread false information.</li>
            <li>Do not defame or threaten others in the comment box.</li>
          </ul>
        </div>

        <div className="info-section">
          <h2>
            <FaExclamationTriangle /> 4. Disclaimer
          </h2>
          <p>
            Our site strives to provide reliable news. However, we do not guarantee the complete accuracy or reliability of the information on the website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
