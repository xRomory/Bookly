import React from 'react';
import MainMaps from './MainMaps.jsx';
import SearchLocationNav from '../../components/SearchLocationNav/SearchLocationNav.jsx';
import LoginSearchLocationNav from '../../components/SearchLocationNav/LoginSearchLocationNav.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const MapPage = () => {
  const { isAuthenticated } = useAuth();

  const AuthNavBar = isAuthenticated ? LoginSearchLocationNav : SearchLocationNav;

  return (
    <>
      <AuthNavBar />
      <MainMaps/>
    </>
  )
}

export default MapPage