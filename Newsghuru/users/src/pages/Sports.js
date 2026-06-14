import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/Sports.css";
import RelativeTime from "../components/RelativeTime";

import {
  FaFutbol,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import useSEO from "../hooks/useSEO";

const Sports = () => {
  const navigate = useNavigate();

  useSEO({
    title: "Sports",
    description: "Get important news about world sports and Indian teams",
    keywords: "Sports news, cricket, football, olympics, sports",
  });

  const [sportsNews, setSportsNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryTamilMap = {
    sports: "Sports",
  };

  const getCategoryLabel = (category) =>
    categoryTamilMap[category?.toLowerCase()] || category;

  useEffect(() => {
    fetchSportsNews();
  }, []);

  const fetchSportsNews = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/api/news/category/sports");
      setSportsNews(res.data || []);

    } catch (err) {
      console.error("Sports API Error:", err);
      setError("Failed to load sports news");
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
  const filteredSportsNews = filterByDate(sportsNews, selectedDate);

  // LOADING
  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading sports news...</div>;
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
    <section className="sports-page">

      {/* HEADER */}
      <div className="sports-header">

        <div>
          <h1>Sports</h1>
          <p>
            Get important news about world sports and Indian teams
          </p>
        </div>

        <button className="sports-live-btn">
          <FaFutbol /> Sports Live
        </button>

      </div>

      {/* EMPTY STATE */}
      {filteredSportsNews.length === 0 ? (
        <div style={{ padding: "20px" }}>
          No sports news available for the selected date...
        </div>
      ) : (
        <>
          {/* FEATURED NEWS */}
          <div
            className="featured-sports-news"
            onClick={() =>
              navigate(`/news/${filteredSportsNews[0]._id}`, {
                state: filteredSportsNews[0],
              })
            }
          >

            <img
              src={filteredSportsNews[0].image}
              alt={filteredSportsNews[0].title}
              className="featured-sports-image"
            />

            <div className="featured-sports-content">

              <button className="sports-category-btn">
                <FaFutbol /> {getCategoryLabel(filteredSportsNews[0].category)}
              </button>

              <h2>{filteredSportsNews[0].title}</h2>

              <div className="featured-sports-meta">
                <span>
                  <RelativeTime
                    createdAt={filteredSportsNews[0].createdAt}
                    fallback={filteredSportsNews[0].time}
                  />
                </span>
              </div>

            </div>

          </div>

          {/* GRID */}
          <div className="sports-news-grid">

            {filteredSportsNews.map((news) => (

              <div
                className="sports-news-card"
                key={news._id}
                onClick={() =>
                  navigate(`/news/${news._id}`, {
                    state: news,
                  })
                }
              >

                <img
                  src={news.image}
                  alt={news.title}
                  className="sports-news-image"
                />

                <div className="sports-news-content">

                  <button className="sports-category-btn">
                    <FaFutbol /> {getCategoryLabel(news.category)}
                  </button>

                  <h3>{news.title}</h3>

                  <p>
                    {(news.shortDescription || news.description)?.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").slice(0, 100)}...
                  </p>

                  <div className="sports-news-footer">

                    <div className="sports-footer-left">
                      <span>
                        <RelativeTime
                          createdAt={news.createdAt}
                          fallback={news.time}
                        />
                      </span>
                    </div>

                    <div className="sports-read-more">
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

export default Sports;