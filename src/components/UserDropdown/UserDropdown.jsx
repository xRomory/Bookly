import React, { useState, useEffect } from "react";
import "./UserDropdown.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const UserDropdown = ({ isMobile, navLinks }) => {
  const { logout, user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (user) setName(user.first_name);
  }, [user]);

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

  const isAdmin = user?.is_admin || user?.is_superuser;
  const isRegularUser = !isAdmin;

  return (
    <div className="user-dropdown relative">
      <IoPersonCircleOutline
        onClick={toggleDropdown}
        className="cursor-pointer text-4xl nav-link transition-colors text-white hover:text-orange-500"
      />

      {showDropdown && (
        <>
          <div className={`overlay ${showDropdown ? "active" : ""}`}></div>

          <div
            className={`side-container ${showDropdown ? "active-side" : ""}`}
          >
            <div className="menu-container flex flex-col p-8 mt-16">
              {name && (
                <span className="font-quicksand text-2xl font-bold">
                  Welcome, {name}
                </span>
              )}

              <IoClose
                onClick={() => setShowDropdown(false)}
                className="absolute top-8 z-[1000] right-8 text-2xl hover:text-blue-900 cursor-pointer"
              />

              {isMobile && (
                <ul className="mt-4 mb-8 border-b border-gray-200 pb-6">
                  {navLinks.map((link) => (
                    <li key={link.to} className="menu mb-4">
                      <Link
                        to={link.to}
                        className="font-quicksand text-xl font-semibold"
                        onClick={() => setShowDropdown(false)}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <ul className="md:mt-8">
                {isRegularUser && (
                  <>
                    <li className="menu">
                      <Link
                        to="/user-dashboard/"
                        className="font-quicksand text-xl font-semibold"
                      >
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
                  </>
                )}

                {isAdmin && (
                  <li className="menu">
                    <Link
                      to="/admin-dashboard/"
                      className="font-quicksand text-xl font-semibold"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                )}

                <li className="menu mt-[1em] absolute text-red-500">
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
