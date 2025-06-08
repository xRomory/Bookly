import { Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import "./styles/App.css";

// import Footer from "./components/Footer/Footer.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import LoginNavbar from "./components/Navbar/LoginNavbar.jsx";
import HomePage from "./pages/LandingPage/HomePage.jsx";
import MapPage from "./pages/MapPage/MapPage.jsx";
import HotelsPage from "./pages/HotelsPage/HotelsPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/RegisterPage/SignupPage.jsx";
import RoomsPage from "./pages/RoomsPage/RoomsPage.jsx";
import BookingPage from "./pages/BookingPage/BookingPage.jsx";
import BookingPayment from "./pages/BookingPage/BookingPayment.jsx";
import BookingReceipt from "./pages/BookingPage/BookingReceipt.jsx";
import UserDashboard from "./pages/UserDashboard/UserDashboard.jsx";
import RenterDashboardPage from "./pages/RenterDashboard/RenterDashboardPage.jsx";
import RoomDetailsPage from "./pages/RoomDetails/RoomDetailsPage.jsx";

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const hideNavBarAndFooter = [
    "/login",
    "/sign-up",
    "/user-profile",
    "/owner-dashboard",
    "/maps",
    "/bookings",
    "/bookings/payment",
    "/bookings/payment/receipts",
  ].some(path => location.pathname.startsWith(path));

  const NavbarToRender = isAuthenticated ? LoginNavbar : Navbar;

  return (
    <div className="app">
      {!hideNavBarAndFooter && <NavbarToRender />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property-brands" element={<HotelsPage />} />
        <Route path="/rooms/" element={<RoomsPage />} />
        <Route path="/rooms/:room_id" element={<RoomDetailsPage />} />
        <Route path="/bookings/:bookingId" element={<BookingPage />} />
        <Route path="/bookings/payment/:bookingId" element={<BookingPayment />} />
        <Route path="/bookings/payment/receipt" element={<BookingReceipt />} />
        <Route path="/maps" element={<MapPage />} />
        <Route path="/user-profile/" element={<UserDashboard />} />
        <Route path="/owner-dashboard/" element={<RenterDashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
      {!hideNavBarAndFooter}
    </div>
  );
}

export default App;
