import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  const isAdmin = user?.is_admin || user?.is_superuser;
  const isRegularUser = !isAdmin;

  return (
    <header className="bg-[#1e3b8a] text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-playfair-display italic font-bold"
        >
          Bookly
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="font-quicksand font-semibold hover:text-blue-200 transition-colors"
              >
                Home
              </Link>
            </li>
            {isRegularUser && (
              <li>
                <Link
                  to="/user-dashboard/"
                  className="font-quicksand font-semibold hover:text-blue-200 transition-colors"
                >
                  User Dashboard
                </Link>
              </li>
            )}

            {isRegularUser && (
              <li>
                <Link to="/owner-dashboard/" className="font-quicksand font-semibold hover:text-blue-200 transition-colors">
                  Owner's Dashboard
                </Link>
              </li>
            )} 
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;