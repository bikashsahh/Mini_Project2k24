import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCog,
  FaMoneyBill,
  FaQuestionCircle,
  FaInfoCircle,
} from "react-icons/fa"; // Import React Icons
import "../base.css"; // Import your base styles

const NavItem = ({ icon, text, path, className }) => {
  return (
    <li className={`nav-item ${className}`}>
      <NavLink to={path} className="nav-link px-2 hover-link">
        <span className="icon" style={{ fontSize: "30px" }}>
          {icon}
        </span>{" "}
        {/* Increase the icon size with inline styles */}
        {text}
      </NavLink>
    </li>
  );
};

export default NavItem;
