import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/Politics.css";
import RelativeTime from "../components/RelativeTime";

import {
  FaLandmark,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import useSEO from "../hooks/useSEO";

const Politics = () => {
  const navigate = useNavigate();

  useSEO({
    title: "Politics",
    description: "Know Tamil Nadu and India Politics news, Political leaders and party events",
    keywords: "Politics news, Indian Politics, Tamil Nadu Politics, Election news",
  });

  const [politicsNews, setPoliticsNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryTamilMap = {
    politics: "Politics",
  };

  const getCategoryLabel = (category) =>
    categoryTamilMap[category?.toLowerCase()] || category;

  useEffect(() => {
    fetchPoliticsNews();
  }, []);

  const fetchPoliticsNews = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/api/news/category/politics");
      setPoliticsNews(res.data || []);

    } catch (err) {
      console.error("Politics API Error:", err);
      setError("Failed to load Politics news");
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
  const filteredPoliticsNews = filterByDate(politicsNews, selectedDate);

  // LOADING
  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Politics Loading news...</div>;
  }

  // ERROR
  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <section className="politics-page">

      {/* HEADER */}
      <div className="politics-header">

        <div>
          <h1>Politics</h1>
          <p>Know Tamil Nadu and India Politics news</p>
        </div>

        <button className="politics-live-btn">
          <FaLandmark /> Politics Live
        </button>

      </div>

      {/* EMPTY STATE */}
      {filteredPoliticsNews.length === 0 ? (
        <div style={{ padding: "20px" }}>
          No politics news available for the selected date...
        </div>
      ) : (
        <>
          {/* FEATURED NEWS */}
          <div
            className="featured-politics-news"
            onClick={() =>
              navigate(`/news/${filteredPoliticsNews[0]._id}`, {
                state: filteredPoliticsNews[0],
              })
            }
          >

            <img
              src={filteredPoliticsNews[0].image}
              className="featured-politics-image"
              alt={filteredPoliticsNews[0].title}
            />

            <div className="featured-politics-content">

              <button className="politics-category-btn">
                <FaLandmark /> {getCategoryLabel(filteredPoliticsNews[0].category)}
              </button>

              <h2>{filteredPoliticsNews[0].title}</h2>

              <div className="featured-politics-meta">
                <span>
                  <RelativeTime
                    createdAt={filteredPoliticsNews[0].createdAt}
                    fallback={filteredPoliticsNews[0].time}
                  />
                </span>
              </div>

            </div>

          </div>

          {/* GRID */}
          <div className="politics-news-grid">

            {filteredPoliticsNews.map((news) => (

              <div
                className="politics-news-card"
                key={news._id}
                onClick={() =>
                  navigate(`/news/${news._id}`, {
                    state: news,
                  })
                }
              >

                <img
                  src={news.image}
                  className="politics-news-image"
                  alt={news.title}
                />

                <div className="politics-news-content">

                  <button className="politics-category-btn">
                    <FaLandmark /> {getCategoryLabel(news.category)}
                  </button>

                  <h3>{news.title}</h3>

                  <p>
                    {(news.shortDescription || news.description)?.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").slice(0, 100)}...
                  </p>

                  <div className="politics-news-footer">

                    <div className="politics-footer-left">
                      <span>
                        <RelativeTime
                          createdAt={news.createdAt}
                          fallback={news.time}
                        />
                      </span>
                    </div>

                    <div className="politics-read-more">
                      Read More <FaArrowRight />
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

export default Politics;