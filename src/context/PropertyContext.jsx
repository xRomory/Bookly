import React, { createContext, useContext, useState, useEffect, Children } from 'react'
import api from '../api/axios'

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = async () => {
    setIsLoading(true);

    try {
      const response = await api.get("/property/property-list/");
      setProperties(response.data);
      setError(null);
    } catch(error) {
      console.error("Error fetching properties:", error);
      setError(error.response?.data?.message || "Failed to load maps");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const value = {
    properties,
    isLoading,
    error,
  }

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  )
}

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if(!context) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }

  return context;
};