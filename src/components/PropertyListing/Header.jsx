import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-[#1e3b8a] text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-playfair-display italic font-bold">Bookly</Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/user-dashboard/" className="font-quicksand font-semibold hover:text-blue-200 transition-colors">
                User Dashboard
              </Link>
            </li>
            {/* <li>
              <Link to="/property/" className="font-quicksand font-semibold hover:text-blue-200 transition-colors">
                Add Property
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;