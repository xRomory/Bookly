import { Routes, Route, Router } from "react-router";
import './styles/App.css'

import HomePage from "./pages/LandingPage/HomePagej.jsx";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
