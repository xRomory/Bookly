import { Routes, Route } from "react-router-dom";
import "./styles/App.css";

// import Navbar from "./components/Navbar/Navbar.jsx";
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
  return (
    <div className="app">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property-brands" element={<HotelsPage />} />
        <Route path="/rooms/" element={<RoomsPage />} />
        <Route path="/rooms/room-details/" element={<RoomDetailsPage />} />
        <Route path="/bookings/" element={<BookingPage />} />
        <Route path="/maps" element={<MapPage />} />
        <Route path="/user-profile/" element={<UserDashboard/>} />
        <Route path="/renter-dashboard/" element={<RenterDashboardPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
