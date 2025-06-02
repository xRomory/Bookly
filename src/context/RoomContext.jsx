import React, { createContext, useContext, useState, useEffect } from 'react';
import api from "../api/axios";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRooms = async () => {
    setIsLoading(true);

    try {
      const response = await api.get("/rooms/room-list/");
      setRooms(response.data);
      setError(null);
    } catch(error) {
      console.error("Error fetching rooms:", error);
      setError(error.response?.data?.message || "Failed to load rooms")
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);


  const value = {
    rooms,
    isLoading,
    error,
    fetchRooms,
  }

  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  )
}

export const useRooms = () => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error("useRooms must be used within a RoomProvider");
  }

  return context;
};