import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserDropdown.scss";

import { IoPersonCircleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const UserDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    console.log("Clicked");
  };

  useEffect(() => {
    if (showDropdown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showDropdown]);

  return (
    <div className="user-dropdown relative">
      <IoPersonCircleOutline
        onClick={toggleDropdown}
        className="cursor-pointer text-4xl nav-link transition-colors"
      />

      {showDropdown && (
        <>
          <div className={`overlay ${showDropdown ? 'active' : ''}`}></div>

          <div className={`side-container ${showDropdown ? 'active-side' : ''}`}>
            
            <div className="menu-container flex flex-col p-8">
              <IoClose onClick={() => setShowDropdown(false)} className="absolute top-8 z-[1000] right-8 text-2xl hover:text-blue-900 cursor-pointer" />
              <ul className="mt-8">
                <li className="menu">
                  <Link to="/user-profile/" className="font-quicksand text-xl font-semibold">
                    User Dashboard
                  </Link>
                </li>

                <li className="menu">
                  <Link
                    to="/owner-dashboard/"
                    className="font-quicksand text-xl font-semibold"
                  >
                    Owner's Dashboard
                  </Link>
                </li>

                <li className="menu absolute text-red-500">
                  <Link
                    to="/"
                    className="font-quicksand text-xl font-semibold"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDropdown;
