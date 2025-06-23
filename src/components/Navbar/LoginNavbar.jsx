import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.scss";
import UserDropdown from "../UserDropdown/UserDropdown";
import { Link } from "react-router-dom";

const LoginNavbar = () => {
  const { user } = useAuth();

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/maps/", text: "Maps" },
    { to: "/rooms/", text: "Rooms" },
  ];

  return (
    <nav className="bg-transparent py-4 px-6 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center h-16">
        <div className="flex items-center">
          <div className="text-3xl font-playfair-display italic font-bold text-blue-900">
            Bookly
          </div>
        </div>

        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-orange-500 font-quicksand font-medium text-lg"
            >
              {link.text}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <div className="flex items-center ml-4 space-x-4">
            <UserDropdown isMobile={false} navLinks={[]} />
          </div>
        </div>

        {/* Mobile Menu - Only UserDropdown */}
        <div className="md:hidden">
          <UserDropdown isMobile={true} navLinks={navLinks} />
        </div>
      </div>
    </nav>
  );
};

export default LoginNavbar;