import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/LatestNews.css";
import RelativeTime from "../components/RelativeTime";

import {
  FaVolumeUp,
  FaArrowRight,
  FaFire,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import useSEO from "../hooks/useSEO";

const LatestNews = () => {
  const navigate = useNavigate();

  useSEO({
    title: "Breaking News",
    description: "Get instant breaking news from Tamil Nadu and India, Live updates",
    keywords: "Latest News, Live Updates, Tamil Nadu News, English News",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [breaking, setBreaking] = useState([]);

  useEffect(() => {
    fetchBreakingNews();
  }, []);

  const fetchBreakingNews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/api/news/category/breaking");
      setBreaking(response.data || []);

    } catch (err) {
      console.error("Latest News Error:", err);
      setError("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ✅ DATE FILTER ENGINE
  // =========================
  const getSelectedDate = () => {
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get("date");

    if (dateParam) {
      const d = new Date(dateParam);
      if (!isNaN(d.getTime())) return d;
    }
    return null;
  };

  const filterByDate = (list, selectedDate) => {
    if (!selectedDate) return list;

    return list.filter((item) => {
      const itemDate = new Date(item.createdAt || item.time);
      return (
        itemDate.getFullYear() === selectedDate.getFullYear() &&
        itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getDate() === selectedDate.getDate()
      );
    });
  };

  const selectedDate = getSelectedDate();
  const filteredBreaking = filterByDate(breaking, selectedDate);

  // LOADING
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        Loading news...
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          color: "red",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <section className="breaking-news-page">

      {/* TITLE */}
      <div className="breaking-page-title">
        <h1>Breaking News</h1>

        <span className="live-badge">
          <FaFire /> Live
        </span>
      </div>

      {/* EMPTY STATE */}
      {filteredBreaking.length === 0 ? (
        <div style={{ padding: "20px" }}>
          No Breaking News available for the selected date...
        </div>
      ) : (
        <>
          {/* FEATURED NEWS */}
          <div
            className="main-breaking-card"
            onClick={() =>
              navigate(`/news/${filteredBreaking[0]._id}`, {
                state: filteredBreaking[0],
              })
            }
          >
            <img
              src={filteredBreaking[0].image}
              className="main-breaking-image"
              alt={filteredBreaking[0].title}
            />

            <div className="main-breaking-content">

              <button className="breaking-category-btn">
                <FaFire /> Breaking News
              </button>

              <h2>{filteredBreaking[0].title}</h2>

              <p>
                {(filteredBreaking[0].description)?.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").substring(0, 180)}...
              </p>

              <div className="breaking-meta">
                <RelativeTime
                  createdAt={filteredBreaking[0].createdAt}
                  fallback={filteredBreaking[0].time}
                />
              </div>

            </div>
          </div>

          {/* NEWS GRID */}
          <div className="breaking-news-grid">

            {filteredBreaking.slice(1).map((item) => (
              <div
                key={item._id}
                className="breaking-news-card"
                onClick={() =>
                  navigate(`/news/${item._id}`, {
                    state: item,
                  })
                }
              >

                <img
                  src={item.image}
                  className="breaking-news-image"
                  alt={item.title}
                />

                <div className="breaking-news-content">

                  <button className="breaking-category-btn">
                    <FaFire /> Breaking News
                  </button>

                  <h3>{item.title}</h3>

                  <p>
                    {(item.description)?.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").substring(0, 140)}...
                  </p>

                  <div className="breaking-news-footer">

                    <div className="footer-left">
                      <RelativeTime
                        createdAt={item.createdAt}
                        fallback={item.time}
                      />
                    </div>

                    <div className="breaking-icons">
                      <FaVolumeUp />

                      <div className="read-more">
                        Read More <FaArrowRight />
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>
        </>
      )}

    </section>
  );
};

export default LatestNews;