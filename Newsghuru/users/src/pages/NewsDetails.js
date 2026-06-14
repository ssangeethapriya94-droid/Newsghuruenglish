import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/NewsDetails.css";
import RelativeTime from "../components/RelativeTime";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import useSEO from "../hooks/useSEO";

import {
  FaClock,
  FaArrowLeft,
  FaFacebookF,
  FaTwitter,
  FaUserAlt,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const NewsDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [news, setNews] = useState(location.state || null);

  useSEO({
    title: news ? (news.title) : "News Details",
    description: news ? (news.shortDescription || news.description)?.substring(0, 160) : "News Details and comprehensive information",
    keywords: news && (news.seoKeywords || news.keywords) ? (news.seoKeywords || news.keywords) : (news ? `${(news.title)?.split(" ").slice(0, 5).join(", ")}, English News` : "English News, News, News Guru"),
  });

  const [loading, setLoading] = useState(!location.state);
  const [error, setError] = useState("");

  const currentUrl = window.location.href;

  const categoryTamilMap = {
    breaking: "Breaking News",
    tamil: "Tamil Nadu",
    india: "India",
    world: "World",
    business: "Business",
    sports: "Sports",
    education: "Education",
    politics: "Politics",
    cinema: "Cinema",
    technology: "Technology",
    tech: "Technology",
  };

  const getCategoryLabel = (category) =>
    categoryTamilMap[category?.toLowerCase()] || category;

  useEffect(() => {
    const fetchNewsById = async () => {
      if (location.state) return;

      try {
        setLoading(true);
        setError("");

        const res = await API.get(`/api/news/${id}`);

        setNews(res.data || null);
      } catch (err) {
        console.error("News Details Error:", err);
        setError("Failed to load news details");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsById();
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="news-not-found">
        <h2>Loading news...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-not-found">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="news-not-found">
        <h2>News not found</h2>
      </div>
    );
  }

  return (
    <div className="news-details-page">

      {/* BACK BUTTON */}
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        Go Back
      </button>

      {/* FEATURE IMAGE */}
      <div className="details-image-wrapper">
        <img
          src={news.image}
          alt={news.title}
          className="details-image"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/1200x700?text=News+Image";
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="details-content">

        {/* CATEGORY */}
        <button className="category-btn">
          {getCategoryLabel(news.category)}
        </button>

        {/* TITLE */}
        <h1 className="details-title">
          {news.title}
        </h1>

        {/* META */}
        <div className="details-meta">

          <span>
            <FaClock />
            <RelativeTime
              createdAt={news.createdAt}
              fallback={news.time}
            />
          </span>

          <span>
            <FaUserAlt />
            Admin Reporter
          </span>

        </div>

        {/* DESCRIPTION */}
        <div className="details-section">
          <div
            className="rich-text-content"
            dangerouslySetInnerHTML={{
              __html: news.fullDescription || news.shortDescription || news.description || "No details available",
            }}
          />
        </div>

        {/* SHARE SECTION */}
        <div className="share-section">

          <h3 className="share-title">
            Share this news
          </h3>

          <div className="share-buttons">

            {/* FACEBOOK */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <FaFacebookF />
              Facebook
            </a>

            {/* TWITTER / X */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                currentUrl
              )}&text=${encodeURIComponent(news.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <FaTwitter />
              Twitter
            </a>

            {/* INSTAGRAM */}
            <a
              href="https://www.instagram.com/newsghuru_tamil/"
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <FaInstagram />
              Instagram
            </a>

            {/* YOUTUBE */}
            <a
              href="https://youtube.com/@newsghurutamil"
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <FaYoutube />
              YouTube
            </a>

          </div>

        </div>

      </div>

    </div>
  );
};

export default NewsDetails;