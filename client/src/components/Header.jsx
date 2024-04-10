import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaSearch,
  FaHome,
  FaCog,
  FaMoneyBill,
  FaQuestionCircle,
  FaInfoCircle,
} from "react-icons/fa"; // Import necessary icons
import "../base.css"; // Import your base styles

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const isAuthenticated = window.localStorage.getItem("isLogedIn");

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to the search results page with the search term as a query parameter
    navigate(`/search?term=${searchTerm}`);
  };

  const handleLogout = () => {
    // Perform logout action here, such as clearing authentication token, etc.
    // After logout, redirect the user to the homepage or any other appropriate page
    window.localStorage.removeItem("isLogedIn");
    navigate("/LoginPage");
  };

  const NavItem = ({ icon, text, path, exact }) => (
    <li>
      <Link
        to={path}
        className="btn btn-outline-secondary nav-link px-2 hover-link"
        exact={exact}
      >
        <span className="nav-icon">{icon}</span>{" "}
        {/* Wrap icon with a span for styling */}
        <span className="nav-text">{text}</span>
      </Link>
    </li>
  );

  return (
    <div className="container heading">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0 d-flex align-items-center">
          <Link
            to="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          >
            <div className="logo">
              <img src="logo.png" alt="Mnnit" width="55" height="55" />
            </div>
            <span className="ms-2 logotext">
              IGNOU ALLAHABAD
              <br />
              <span className="">MNNIT Study Centre</span>
            </span>
          </Link>
        </div>

        <div className="ml-5">
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 text-decoration-none">
            <NavItem icon={<FaHome />} text="Home" path="/" exact />
            <NavItem icon={<FaCog />} text="Features" path="#" />
            <NavItem icon={<FaMoneyBill />} text="Pricing" path="#" />
            <NavItem icon={<FaQuestionCircle />} text="FAQs" path="#" />
            <NavItem icon={<FaInfoCircle />} text="About" path="#" />
          </ul>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-end">
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-outline-secondary me-2 hover-link"
            >
              <FaSearch className="search-icon" /> {/* Search icon */}
              <span className="search-text">Search</span>
            </button>
          </form>
          <div className="col-md-3 text-end">
            {isAuthenticated ? (
              <button
                type="button"
                className="btn btn-outline-secondary me-2 hover-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2 hover-button"
                  onClick={() => handleNavigation("/LoginPage")}
                >
                  Login
                </button>
                <a
                  href="https://ignouadmission.samarth.edu.in/index.php/registration/user/register"
                  className="btn btn-outline-secondary me-2 hover-button text-decoration-none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sign-up
                </a>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
