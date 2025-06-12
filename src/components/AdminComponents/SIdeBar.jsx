import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'

const SideBar = ({ activePage, setActivePage }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    setActivePage('home');
    navigate("/");
  }

  const handleAdminDashboardClick = () => {
    setActivePage('dashboard');
    navigate("/admin-dashboard/");
  }

  const handlePropertyClick = () => {
    setActivePage('property');
    navigate("/property/");
  }

  const handleSignOut = () => {
    logout()
    navigate("/");
  }

  return (
    <div className="w-64 bg-[#162c5f] text-white flex flex-col">
      {/* Logo */}
      <div className="p-5">
        <h1 className="font-playfair-display italic font-bold text-4xl py-2 text-center">Bookly</h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2 px-3">
          <li>
            <button 
              onClick={handleHomeClick}
              className={`flex font-quicksand font-semibold items-center w-full p-3 rounded-md transition-colors ${
                activePage === 'home' ? 'bg-blue-950' : 'hover:bg-blue-900'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </button>
          </li>
          <li>
            <button
              onClick={handleAdminDashboardClick}
              className={`flex font-quicksand font-semibold items-center w-full p-3 rounded-md transition-colors ${
                activePage === 'dashboard' ? 'bg-blue-950' : 'hover:bg-blue-900'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Dashboard
            </button>
          </li>
          <li>
            <button 
              onClick={handlePropertyClick}
              className={`flex font-quicksand font-semibold items-center w-full p-3 rounded-md transition-colors ${
                activePage === 'home' ? 'bg-blue-950' : 'hover:bg-blue-900'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Property Dashboard
            </button>
          </li>
        </ul>
      </nav>
      
      {/* Logout Button */}
      <div className="p-5 mt-auto">
        <button onClick={handleSignOut} className="flex font-quicksand font-semibold items-center w-full p-3 rounded-md hover:bg-blue-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}

export default SideBar