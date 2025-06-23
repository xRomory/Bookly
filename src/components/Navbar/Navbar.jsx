import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent py-4 px-6 fixed top-0 w-full z-10">
      <div
        className="container mx-auto flex justify-between items-center h-16"
      >
        <div className="flex items-center">
          <div className="text-3xl font-playfair-display italic font-bold text-blue-900">
            Bookly
          </div>
        </div>

        <div className="hidden md:block space-x-8">
          <Link
            to="/"
            className="hover:text-orange-500 font-quicksand font-medium text-lg"
          >
            Home
          </Link>
          <Link
            to="/maps/"
            className="hover:text-orange-500 font-quicksand font-medium text-lg"
          >
            Maps
          </Link>
          <Link
            to="/rooms/"
            className="hover:text-orange-500 font-quicksand font-medium text-lg"
          >
            Rooms
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="flex items-center ml-4 space-x-4">
            <Link
              to="/sign-up"
              className=" hover:text-orange-500 hover:scale-105 font-quicksand font-medium text-lg"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="text-white bg-blue-900 px-4 py-2 rounded-md hover:scale-95 hover:bg-blue-800 font-quicksand font-semibold text-lg"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-blue-900 hover:text-blue-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white mt-2 rounded-lg shadow-lg p-4">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="hover:text-orange-500 font-quicksand font-medium text-lg"
            >
              Home
            </Link>
            <Link
              to="/maps/"
              className="hover:text-orange-500 font-quicksand font-medium text-lg"
            >
              Maps
            </Link>
            <Link
              to="/rooms/"
              className="hover:text-orange-500 font-quicksand font-medium text-lg"
            >
              Rooms
            </Link>

            <Link
              to="/sign-up"
              className=" hover:text-orange-500 font-quicksand font-medium text-lg"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="hover:text-orange-500 font-quicksand font-medium text-lg"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
