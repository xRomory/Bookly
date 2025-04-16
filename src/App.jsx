import { Routes, Route, Router } from "react-router";
import "./styles/App.css";

import Navbar from "./components/Navbar/Navbar.jsx";

import HomePage from "./pages/LandingPage/HomePage.jsx";
import MapPage from "./pages/MapPage/MapPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/RegisterPage/SignupPage.jsx";

function App() {
  return (
    <div className="app">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/maps" element={<MapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
