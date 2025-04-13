import React from "react";
import "./Navbar.scss";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <section className="navbar-section">
      <div className="nav-container fixed flex justify-between bg-transparent p-[1.5rem_5rem] z-50 w-full">
        <div className="logo-container ml-[5rem]">
          <Link to="/" className="logo justify-center items-center ">
            <h1 className="">Bookly</h1>
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
              <Link to="/community" className="nav-link">
                Offers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ranks-badges" className="nav-link">
                Sign up
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/partners" className="nav-link">
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
