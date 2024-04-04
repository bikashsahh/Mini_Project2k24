import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../base.css"; // Import your base styles
import "./header.css"; // Import your custom header styles

const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="container heading">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0 d-flex align-items-center">
          <a
            href="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          >
            <img src="logo.webp" alt="Mnnit" width="40" height="40" />
            <span className="ms-2 logotext">
              IGNOU ALLAHABAD
              <br />
              <span className="">Regional Centre</span>
            </span>
          </a>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 text-decoration-none">
          <li>
            <a
              href="#"
              className="btn btn-outline-secondary nav-link px-2 hover-link"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="btn btn-outline-secondary nav-link px-2 hover-link"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#"
              className="btn btn-outline-secondary nav-link px-2 hover-link"
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#"
              className="btn btn-outline-secondary nav-link px-2 hover-link"
            >
              FAQs
            </a>
          </li>
          <li>
            <a
              href="#"
              className="btn btn-outline-secondary nav-link px-2 hover-link"
            >
              About
            </a>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          <button
            type="button"
            className="btn btn-outline-secondary me-2 hover-button"
          >
            Login
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary me-2 hover-button"
          >
            Sign-up
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
