import { Routes, Route } from "react-router";
import "./styles/App.css";

// import Navbar from "./components/Navbar/Navbar.jsx";
import HomePage from "./pages/LandingPage/HomePage.jsx";
import MapPage from "./pages/MapPage/MapPage.jsx";
import HotelsPage from "./pages/HotelsPage/HotelsPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/RegisterPage/SignupPage.jsx";
import RoomsPage from "./pages/RoomsPage/RoomsPage.jsx";

function App() {
  return (
    <div className="app">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property-brands" element={<HotelsPage />} />
        <Route path="/rooms/" element={<RoomsPage />} />
        <Route path="/maps" element={<MapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
