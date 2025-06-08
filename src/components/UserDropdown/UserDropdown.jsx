import React, { useState, useEffect } from "react";
import "./UserDropdown.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const UserDropdown = () => {
  const { logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = () => {
    logout();
    navigate("/");
  }

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if(userData) {
      try {
        const parsedUser = JSON.parse(userData);
        const username = `${parsedUser.first_name}`;
        setName(username);
      } catch(error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

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
            
            <div className="menu-container flex flex-col p-8 mt-16">
              {name && (
                <span className="font-quicksand text-2xl font-bold">Welcome, {name}</span>
              )}

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
                  <button
                    onClick={handleSignOut}
                    className="font-quicksand text-xl font-semibold"
                  >
                    Logout
                  </button>
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
