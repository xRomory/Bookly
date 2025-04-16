import React from "react";
import "./Footer.scss";
import logo from "../../assets/images/Bookly.png"

import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="footer p-8 rounded-[20px_20px_0_0]">
      <div className="footer-container grid grid-cols-5 gap-6 items-center">
        <div className="logo-div flex">
          <div className="footer-logo pb-2">
            <Link to="/" className="flex flex-col items-center">
              <h1 className="logo items-center">Bookly</h1>
            </Link>
            <p className="subtext text-white">Book with Ease, Stay in Peace</p>
          </div>
        </div>

        <div className="footer-links">
          <h2 className="link-title pb-2 font-bold text-lg">Information</h2>

          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#">Hotels</a>
          </li>
          <li>
            <Link to="/maps">Maps</Link>
          </li>
          <li>
            <a href="#">Offer</a>
          </li>
        </div>

        <div className="footer-links">
          <h2 className="link-title pb-2 font-bold text-lg">Contact Info</h2>

          <p className="address">
            123 Some Street, Brgy., Sandok, Metro Manila, 1234
          </p>
          <p className="phone">+123 456 7890</p>
          <p className="email">bookly@email.com</p>
        </div>

        <div className="footer-links">
          <h2 className="link-title pb-2 font-bold text-lg">Supports</h2>

          <li>
            <a href="#">Help Center</a>
          </li>
          <li>
            <a href="#">Feedback</a>
          </li>
          <li>
            <a href="#">Email Us</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
        </div>

        <div className="logo-div flex justify-center w-[50%]">
          <img src={logo} alt="Bookly Logo" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
