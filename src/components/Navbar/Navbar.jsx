import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router";

const Navbar = () => {
  const [transparent, setTransparent] = useState("nav-container");

  const addBg = () => {
    if(window.scrollY >= 15) {
      setTransparent("nav-container active-header")
    } else {
      setTransparent("nav-container")
    };
  };

  window.addEventListener("scroll", addBg);

  return (
    <section className="navbar-section">
      <div className={`${transparent} fixed flex justify-between p-[1.5rem_5rem] z-50 w-full`}>
        <div className="logo-container ml-[5rem]">
          <Link to="/" className="logo justify-center items-center ">
            <h1>Bookly</h1>
          </Link>
        </div>

        <div className="navbar-link-cont items-center justify-center content-center">
          <ul className="nav-lists flex items-center">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Hotels
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/maps" className="nav-link">
                Maps
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/offers" className="nav-link">
                Offers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sign-up" className="nav-link">
                Sign up
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Log in
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
