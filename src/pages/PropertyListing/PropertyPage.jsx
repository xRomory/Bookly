import React from 'react'
import Header from '../../components/PropertyListing/Header'
import LoginNavbar from '../../components/Navbar/LoginNavbar'
import PropertyList from './PropertyList'

const PropertyPage = () => {
  return (
    <div className='min-h-screen bg-secondary-white'>
      <Header />
      <div className='container mx-auto px-3 py-8'>
        <PropertyList />
      </div>
    </div>
  )
}

export default PropertyPage