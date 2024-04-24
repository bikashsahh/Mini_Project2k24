import React from "react";
import "./Admin.css";
import { SlMenu } from "react-icons/sl";
const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar"
      style={{ width: "180px" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg className="bi pe-none me-2" width="40" height="32">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-4">IGNOU</span>
        <span>
          <SlMenu />
        </span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <div>
            <span>Dashboard</span>
            <button
              className="nav-link text-white active"
              aria-current="page"
              onClick={() => {
                // handle click event for Home
              }}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#home"></use>
              </svg>
              Dashboard
            </button>
          </div>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <button
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </button>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <button className="dropdown-item">New project...</button>
          </li>
          <li>
            <button className="dropdown-item">Settings</button>
          </li>
          <li>
            <button className="dropdown-item">Profile</button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item">Sign out</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
