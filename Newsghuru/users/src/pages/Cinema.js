import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/Business.css";
import { FaClock, FaFilm, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RelativeTime from "../components/RelativeTime";
import useSEO from "../hooks/useSEO";

const Cinema = () => {
  const navigate = useNavigate();

  useSEO({
    title: "Cinema",
    description: "Get breaking news instantly from the world of Cinema and art, movie reviews and actor news",
    keywords: "Cinema News, movie reviews, actors, new movies",
  });

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryTamilMap = {
    cinema: "Cinema",
  };

  const getCategoryLabel = (category) =>
    categoryTamilMap[category?.toLowerCase()] || category;

  useEffect(() => {
    fetchCinemaNews();
  }, []);

  const fetchCinemaNews = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/api/news/category/cinema");
      setNews(res.data || []);

    } catch (err) {
      console.error("Cinema News Error:", err);
      setError("Cinema Failed to load news");
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
  const filteredNews = filterByDate(news, selectedDate);

  // LOADING
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        Cinema Loading news...
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <section className="business-page">

      {/* HEADER */}
      <div className="business-header">

        <div>
          <h1>Cinema</h1>
          <p>Get breaking news instantly from the world of Cinema and art</p>
        </div>

        <button className="business-live-btn">
          <FaFilm /> Cinema News
        </button>

      </div>

      {/* EMPTY STATE */}
      {filteredNews.length === 0 ? (
        <div style={{ padding: "20px" }}>
          No cinema news available for the selected date...
        </div>
      ) : (
        <>
          {/* FEATURED NEWS */}
          <div
            className="featured-business-news"
            onClick={() =>
              navigate(`/news/${filteredNews[0]._id}`, {
                state: filteredNews[0],
              })
            }
          >

            <img
              src={filteredNews[0].image}
              alt={filteredNews[0].title}
              className="featured-business-image"
            />

            <div className="featured-business-content">

              <button className="business-category-btn">
                <FaFilm /> {getCategoryLabel(filteredNews[0].category)}
              </button>

              <h2>{filteredNews[0].title}</h2>

              <div className="featured-business-meta">
                <span>
                  <FaClock />{" "}
                  <RelativeTime
                    createdAt={filteredNews[0].createdAt}
                    fallback={filteredNews[0].time}
                  />
                </span>
              </div>

            </div>

          </div>

          {/* GRID */}
          <div className="business-news-grid">

            {filteredNews.map((item) => (
              <div
                key={item._id}
                className="business-news-card"
                onClick={() =>
                  navigate(`/news/${item._id}`, {
                    state: item,
                  })
                }
              >

                <img
                  src={item.image}
                  alt={item.title}
                  className="business-news-image"
                />

                <div className="business-news-content">

                  <button className="business-category-btn">
                    <FaFilm /> {getCategoryLabel(item.category)}
                  </button>

                  <h3>{item.title}</h3>

                  <p>{(item.description)?.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").substring(0, 120)}...</p>

                  <div className="business-news-footer">

                    <div className="business-footer-left">
                      <span>
                        <FaClock />{" "}
                        <RelativeTime
                          createdAt={item.createdAt}
                          fallback={item.time}
                        />
                      </span>
                    </div>

                    <div className="business-read-more">
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

export default Cinema;