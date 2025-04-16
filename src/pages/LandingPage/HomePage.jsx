import React from 'react'
import HomeHeader from './HomeHeader.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import HomeContent from './HomeContent.jsx';
import Footer from '../../components/Footer/Footer.jsx';


const HomePage = () => {
  return (
    <>
      <Navbar />
      <HomeHeader />
      <HomeContent />
      <Footer />
    </>
  )
}

export default HomePage