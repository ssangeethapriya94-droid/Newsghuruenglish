import React from "react";

import "../styles/NewsGuru.css";

import {
  FaClock,
  FaComment,
  FaFire,
  FaPlayCircle,
  FaEye,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import useSEO from "../hooks/useSEO";

const NewsGuru = () => {

  const navigate = useNavigate();

  useSEO({
    title: "News Guru (News Guru)",
    description: "News Guru - Get breaking news instantly in English",
    keywords: "News Guru, Breaking News, Live Updates, English News",
  });

  /* =========================================
     NEWS GURU DATA
  ========================================= */

  const guruNews = [

    {
      id: 101,
      image: "/images/guru1.jpg",

      title:
        "News Guru: New changes in Tamil Nadu politics",

      description:
        "Reports suggest major political changes in Tamil Nadu today.",

      category: "Politics",

      time: "30 minutes ago",

      comments: 18,

      views: "15K",
    },

    {
      id: 102,
      image: "/images/guru2.jpg",

      title:
        "Technology conference begins in Chennai",

      description:
        "India's largest AI and technology conference started in Chennai.",

      category: "Technology",

      time: "1 hours ago",

      comments: 12,

      views: "10K",
    },

    {
      id: 103,
      image: "/images/guru3.jpg",

      title:
        "Sudden crash in the global market",

      description:
        "A sudden drop in the international stock market today.",

      category: "Business",

      time: "45 minutes ago",

      comments: 20,

      views: "21K",
    },

    {
      id: 104,
      image: "/images/guru4.jpg",

      title:
        "New record for the Indian team",

      description:
        "The Indian cricket team has set a world record.",

      category: "Sports",

      time: "2 hours ago",

      comments: 30,

      views: "35K",
    },

  ];

  return (

    <section className="guru-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="guru-header">

        <div>

          <h1>News Guru</h1>

          <p>
            Get breaking news instantly
          </p>

        </div>

        <div className="guru-live">

          <FaFire />

          Trending Now

        </div>

      </div>

      {/* =========================================
          FEATURED NEWS
      ========================================= */}

      <div
        className="guru-featured-news"
        onClick={() =>
          navigate(`/news/${guruNews[0].id}`, {
            state: guruNews[0],
          })
        }
      >

        <img
          src={guruNews[0].image}
          alt=""
          className="guru-featured-image"
        />

        <div className="guru-featured-content">

          <button className="guru-category-btn">
            {guruNews[0].category}
          </button>

          <h2>
            {guruNews[0].title}
          </h2>

          <p>
            {guruNews[0].description}
          </p>

          <div className="guru-meta">

            <span>
              <FaClock />
              {guruNews[0].time}
            </span>

            <span>
              <FaComment />
              {guruNews[0].comments}
            </span>

            <span>
              <FaEye />
              {guruNews[0].views}
            </span>

          </div>

        </div>

      </div>

      {/* =========================================
          TRENDING NEWS GRID
      ========================================= */}

      <div className="guru-news-grid">

        {guruNews.map((news) => (

          <div
            className="guru-news-card"
            key={news.id}
            onClick={() =>
              navigate(`/news/${news.id}`, {
                state: news,
              })
            }
          >

            {/* IMAGE */}

            <div className="guru-image-wrapper">

              <img
                src={news.image}
                alt=""
                className="guru-news-image"
              />

              <div className="play-icon">

                <FaPlayCircle />

              </div>

            </div>

            {/* CONTENT */}

            <div className="guru-news-content">

              <button className="guru-category-btn">
                {news.category}
              </button>

              <h3>
                {news.title}
              </h3>

              <p>
                {news.description}
              </p>

              {/* FOOTER */}

              <div className="guru-news-footer">

                <span>
                  <FaClock />
                  {news.time}
                </span>

                <span>
                  <FaComment />
                  {news.comments}
                </span>

                <span>
                  <FaEye />
                  {news.views}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>

  );
};

export default NewsGuru;