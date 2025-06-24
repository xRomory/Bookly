import React from "react";
import UserDropdown from "../UserDropdown/UserDropdown";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  const isAdmin = user?.is_admin || user?.is_superuser;
  const isRegularUser = !isAdmin;

  return (
    <header className="bg-[#1e3b8a] shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl text-white font-playfair-display italic font-bold"
        >
          Bookly
        </Link>
        <nav className="">
          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                to="/"
                className="font-quicksand text-main-white font-semibold hover:text-orange-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/maps/"
                className="font-quicksand text-main-white font-semibold hover:text-orange-400 transition-colors"
              >
                Maps
              </Link>
            </li>
            <li>
              <Link
                to="/rooms/"
                className="font-quicksand text-main-white font-semibold hover:text-orange-400 transition-colors"
              >
                Room
              </Link>
            </li>
            <UserDropdown />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;