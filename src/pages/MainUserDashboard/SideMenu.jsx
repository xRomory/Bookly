import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./UserDashboard.scss";

// Import icons
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaMap } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";


const SideMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-950 text-white p-2 rounded-md"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      <div
        className={`side-menu bg-blue-950 text-white w-16 md:w-20 lg:w-24 fixed md:static h-full min-h-screen z-40 transition-all duration-300 ${
          isMenuOpen ? "left-0" : "-left-20"
        } md:left-0`}
      >
        <div className="menu-items flex flex-col items-center font-quicksand font-semibold justify-start h-full pt-16 md:pt-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `menu-item flex flex-col items-center justify-center p-4 w-full hover:bg-blue-800 transition-colors ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            <FaHome size={24} />
            <span className="text-xs mt-1">Home</span>
          </NavLink>
          <NavLink
            to="/user-dashboard"
            className={({ isActive }) =>
              `menu-item flex flex-col items-center justify-center p-4 w-full hover:bg-blue-800 transition-colors ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            <FaUser size={24} />
            <span className="text-xs mt-1">Profile</span>
          </NavLink>
          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              `menu-item flex flex-col items-center justify-center p-4 w-full hover:bg-blue-800 transition-colors ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            <FaBed size={24} />
            <span className="text-xs mt-1">Bookings</span>
          </NavLink>
          <NavLink
            to="/maps"
            className={({ isActive }) =>
              `menu-item flex flex-col items-center justify-center p-4 w-full hover:bg-blue-800 transition-colors ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            <FaMap size={24} />
            <span className="text-xs mt-1">Locations</span>
          </NavLink>

          <NavLink
            to="/user-settings"
            className={({ isActive }) =>
              `menu-item flex flex-col items-center justify-center p-4 w-full hover:bg-blue-800 transition-colors ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            <FaGear size={24} />
            <span className="text-xs mt-1">Settings</span>
          </NavLink>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default SideMenu;
