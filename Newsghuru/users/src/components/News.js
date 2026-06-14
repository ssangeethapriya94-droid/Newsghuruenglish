import React from "react";
import "../styles/News.css";
import { FaVolumeUp, FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const News = ({ selectedCategory }) => {

  const navigate = useNavigate();

  const newsData = {
    "Latest News": [
      {
        id: 1,
        image: "/images/news1.jpg",
        title: "BREAKING: Important Political Event Happened Today",
        description:
          "An important event took place in Tamil Nadu politics today...",
        category: "Tamil Nadu",
        time: "2 hours ago",
        comments: 10,
      },
      {
        id: 2,
        image: "/images/news2.jpg",
        title: "New changes in global market",
        description:
          "New changes are emerging in global economy...",
        category: "World",
        time: "1 hours ago",
        comments: 8,
      },
    ],

    "Tamil Nadu": [
      {
        id: 3,
        image: "/images/tamil1.jpg",
        title: "Metro expansion begins in Chennai",
        description:
          "New metro line expansion works started in Chennai...",
        category: "Tamil Nadu",
        time: "2 hours ago",
        comments: 9,
      },
    ],
  };

  const currentNews =
    newsData[selectedCategory] || newsData["Latest News"];

  return (
    <section className="breaking-section">

      <div className="left-news">

        <div className="section-title">
          {selectedCategory} <span className="live-badge">LIVE</span>
        </div>

        {/* MAIN NEWS CARD */}

        <div
          className="main-news-card"
          onClick={() =>
            navigate(`/news/${currentNews[0].id}`, {
              state: currentNews[0],
            })
          }
        >
          <img
            src={currentNews[0]?.image}
            alt=""
            className="main-news-image"
          />

          <div className="main-news-content">
            <h2>{currentNews[0]?.title}</h2>
            <p>Live now</p>
          </div>
        </div>

        {/* NEWS GRID */}

        <div className="news-grid">

          {currentNews.map((news, index) => (

            <div
              className="news-card"
              key={index}
              onClick={() =>
                navigate(`/news/${news.id}`, {
                  state: news,
                })
              }
            >
              <img
                src={news.image}
                alt=""
                className="news-image"
              />

              <div className="news-content">

                <h3>{news.title}</h3>

                <button className="category-btn">
                  {news.category}
                </button>

                <div className="news-footer">

                  <span>{news.time}</span>

                  <div className="news-icons">
                    <FaVolumeUp />

                    <span>
                      <FaComment /> {news.comments}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* ADS */}

      <div className="right-ads">
        <img
          src="/images/ad1.jpg"
          alt=""
          className="ad-image small-ad"
        />

        <img
          src="/images/ad2.jpg"
          alt=""
          className="ad-image"
        />
      </div>

    </section>
  );
};

export default News;