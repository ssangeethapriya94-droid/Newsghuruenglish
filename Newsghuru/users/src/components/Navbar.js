import React from "react";
import "../styles/Navbar.css";
import {
  FaHome,
  FaNewspaper,
  FaMapMarkedAlt,
  FaFlag,
  FaGlobe,
  FaBriefcase,
  FaFutbol,
  FaGraduationCap,
  FaLandmark,
  FaFilm,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const topMenu = [
    {
      name: "Home", // Fixed: Added missing home label
      icon: <FaHome />,
      path: "/",
    },
    {
      name: "Latest News",
      icon: <FaNewspaper />,
      path: "/latest-news",
    },
    {
      name: "Tamil Nadu",
      icon: <FaMapMarkedAlt />,
      path: "/tamilnadu",
    },
    {
      name: "India",
      icon: <FaFlag />,
      path: "/india",
    },
    {
      name: "World",
      icon: <FaGlobe />,
      path: "/world",
    },
    {
      name: "Business",
      icon: <FaBriefcase />,
      path: "/business",
    },
    {
      name: "Sports",
      icon: <FaFutbol />,
      path: "/sports",
    },
    {
      name: "Education",
      icon: <FaGraduationCap />,
      path: "/education",
    },
    {
      name: "Politics",
      icon: <FaLandmark />,
      path: "/politics",
    },
    {
      name: "Cinema",
      icon: <FaFilm />,
      path: "/cinema",
    }
  ];

  return (
    <nav className="top-nav">
      {topMenu.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            isActive ? "nav-item active-nav" : "nav-item"
          }
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-text">{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;