import React, { useEffect, useState } from "react";
import API from "../config/api";
import "../styles/Education.css";
import RelativeTime from "../components/RelativeTime";

import {
  FaGraduationCap,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import useSEO from "../hooks/useSEO";

const Education = () => {
  const navigate = useNavigate();

  useSEO({
    title: "Education",
    description: "Education, get the latest news for students and universities",
    keywords: "Education news, school news, college news, exam results",
  });

  const [educationNews, setEducationNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryTamilMap = {
    education: "Education",
  };

  const getCategoryLabel = (category) =>
    categoryTamilMap[category?.toLowerCase()] || category;

  useEffect(() => {
    fetchEducationNews();
  }, []);

  const fetchEducationNews = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/api/news/category/education");
      setEducationNews(res.data || []);

    } catch (err) {
      console.error("Education API Error:", err);
      setError("Failed to load education news");
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
  const filteredEducationNews = filterByDate(educationNews, selectedDate);

  // LOADING
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        Loading Education news...
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
    <section className="education-page">

      {/* HEADER */}
      <div className="education-header">

        <div>
          <h1>Education</h1>
          <p>
            Education, get the latest news for students and universities
          </p>
        </div>

        <button className="education-live-btn">
          <FaGraduationCap /> Education Live
        </button>

      </div>

      {/* EMPTY STATE */}
      {filteredEducationNews.length === 0 ? (
        <div style={{ padding: "20px" }}>
          No education news available for the selected date...
        </div>
      ) : (
        <>
          {/* FEATURED NEWS */}
          <div
            className="featured-education-news"
            onClick={() =>
              navigate(`/news/${filteredEducationNews[0]._id}`, {
                state: filteredEducationNews[0],
              })
            }
          >

            <img
              src={filteredEducationNews[0].image}
              alt={filteredEducationNews[0].title}
              className="featured-education-image"
            />

            <div className="featured-education-content">

              <button className="education-category-btn">
                <FaGraduationCap /> {getCategoryLabel(filteredEducationNews[0].category)}
              </button>

              <h2>{filteredEducationNews[0].title}</h2>

              <div className="featured-education-meta">
                <span>
                  <RelativeTime
                    createdAt={filteredEducationNews[0].createdAt}
                    fallback={filteredEducationNews[0].time}
                  />
                </span>
              </div>

            </div>

          </div>

          {/* GRID */}
          <div className="education-news-grid">

            {filteredEducationNews.map((news) => (

              <div
                key={news._id}
                className="education-news-card"
                onClick={() =>
                  navigate(`/news/${news._id}`, {
                    state: news,
                  })
                }
              >

                <img
                  src={news.image}
                  alt={news.title}
                  className="education-news-image"
                />

                <div className="education-news-content">

                  <button className="education-category-btn">
                    <FaGraduationCap /> {getCategoryLabel(news.category)}
                  </button>

                  <h3>{news.title}</h3>

                  <p>
                    {(news.shortDescription || news.description)?.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").substring(0, 100)}...
                  </p>

                  <div className="education-news-footer">

                    <div className="education-footer-left">
                      <span>
                        <RelativeTime
                          createdAt={news.createdAt}
                          fallback={news.time}
                        />
                      </span>
                    </div>

                    <div className="education-read-more">
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

export default Education;