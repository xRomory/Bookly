import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.scss";
import UserDropdown from "../UserDropdown/UserDropdown";
import { Link } from "react-router-dom";

const LoginNavbar = () => {
  const { user } = useAuth();
  const [transparent, setTransparent] = useState("nav-container");
  // const [showUserMenu, setUserMenu] = useState();

  const addBg = () => {
    if (window.scrollY >= 15) {
      setTransparent("nav-container active-header");
    } else {
      setTransparent("nav-container");
    }
  };

  window.addEventListener("scroll", addBg);

  return (
    <section className="navbar-section">
      <div
        className={`${transparent} fixed flex justify-between px-20 py-6 z-50 w-full shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.01)]`}
      >
        <div className="logo-container ml-20">
          <Link to="/" className="logo justify-center items-center ">
            <h1>Bookly</h1>
          </Link>
        </div>

        <div className="navbar-link-cont items-center justify-center content-center">
          <ul className="nav-lists flex items-center">
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

            {user && (
              <li className="nav-item">
                <UserDropdown />
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LoginNavbar;