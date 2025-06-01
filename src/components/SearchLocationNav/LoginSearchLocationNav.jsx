import React, { useState } from "react";
import "./SearchLocationNav.scss";
import { Link } from "react-router";
import { MdMenu } from "react-icons/md";
import { GrSearch } from "react-icons/gr";
import { AiFillCloseCircle } from "react-icons/ai";

const LoginSearchLocationNav = () => {
  const [active, setActive] = useState(false);

  const showSideBar = () => setActive(true);

  const removeSideBar = () => setActive(false);

  return (
    <>
      <div className="search-container fixed flex m-8">
        <label>
          <input
            type="text"
            className="search-input ml-8 p-[.5rem_4rem] w-full rounded-3xl outline-none shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] relative"
            placeholder="Search for Location"
          />

          <div
            onClick={showSideBar}
            className="toggle-menu-side absolute top-2 left-12"
          >
            <MdMenu className="icon text-2xl cursor-pointer hover:fill-blue-900" />
          </div>

          <div className="search-button absolute top-[10px] -right-1">
            <GrSearch className="icon text-xl cursor-pointer hover:text-blue-900" />
          </div>
        </label>
      </div>

      <div
        className={`side-panel-menu-container absolute w-[450px] h-full ${
          active ? "active-menu" : ""
        }`}
      >
        <div className="menu-side h-full w-[450px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col items-center">
          <div className="logo-container mt-8">
            <Link to="/" className="logo">
              <h1>Bookly</h1>
            </Link>
          </div>

          <div className="navbar-link-cont items-center justify-center h-max">
            <ul className="nav-lists flex items-center flex-col justify-center w-full">
              <li className="nav-item">
                <Link to="/property-brands" className="nav-link">
                  Hotels
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/maps" className="nav-link">
                  Maps
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/rooms/" className="nav-link">
                  Rooms
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user-profile/" className="nav-link">
                  User Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/owner-dashboard/" className="nav-link">
                  Owner's Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div
            onClick={removeSideBar}
            className="close-navbar absolute top-4 right-4 text-2xl text-blue-900 hover:text-orange-400"
          >
            <AiFillCloseCircle className="icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSearchLocationNav;
