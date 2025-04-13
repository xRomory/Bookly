import { Routes, Route, Router } from "react-router";
import "./styles/App.css";

import Navbar from "./components/Navbar/Navbar.jsx";

import HomePage from "./pages/LandingPage/HomePage.jsx";
import MapPage from "./pages/MapPage/MapPage.jsx";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/maps" element={<MapPage />} />
      </Routes>
    </div>
  );
}

export default App;
