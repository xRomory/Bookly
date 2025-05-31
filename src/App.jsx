import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/App.css";

import Navbar from "./components/Navbar/Navbar.jsx";
import LoginNavbar from "./components/Navbar/LoginNavbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./pages/LandingPage/HomePage.jsx";
import MapPage from "./pages/MapPage/MapPage.jsx";
import HotelsPage from "./pages/HotelsPage/HotelsPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/RegisterPage/SignupPage.jsx";
import RoomsPage from "./pages/RoomsPage/RoomsPage.jsx";
import BookingPage from "./pages/BookingPage/BookingPage.jsx";
import UserDashboard from "./pages/UserDashboard/UserDashboard.jsx";
import RenterDashboardPage from "./pages/RenterDashboard/RenterDashboardPage.jsx";
import RoomDetailsPage from "./pages/RoomDetails/RoomDetailsPage.jsx";

function App() {
  const isLoggedIn = "Please edit this for backend";

  const location = useLocation();

  const hideNavBarAndFooter = [
    "/login",
    "/sign-up",
    "/user-profile/",
    "/owner-dashboard/",
    "/maps",
  ].includes(location.pathname);

  const NavbarToRender = isLoggedIn ? Navbar : LoginNavbar

  return (
    <div className="app">
      {!hideNavBarAndFooter && <NavbarToRender />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property-brands" element={<HotelsPage />} />
        <Route path="/rooms/" element={<RoomsPage />} />
        <Route path="/rooms/room-details/" element={<RoomDetailsPage />} />
        <Route path="/bookings/" element={<BookingPage />} />
        <Route path="/maps" element={<MapPage />} />
        <Route path="/user-profile/" element={<UserDashboard />} />
        <Route path="/owner-dashboard/" element={<RenterDashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
      {!hideNavBarAndFooter && <Footer />}
    </div>
  );
}

export default App;
