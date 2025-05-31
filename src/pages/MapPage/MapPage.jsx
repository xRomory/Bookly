import React, { useState } from 'react';
import MainMaps from './MainMaps.jsx';
import SearchLocationNav from '../../components/SearchLocationNav/SearchLocationNav.jsx';

const MapPage = () => {
  return (
    <>
      <SearchLocationNav />
      <MainMaps/>
    </>
  )
}

export default MapPage