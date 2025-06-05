import React, { createContext, useContext, useState, useEffect } from 'react';
import api from "../api/axios";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const fetchRooms = async (page = 1) => {
    setIsLoading(true);

    try {
      const response = await api.get(`/rooms/room-list/?page=${page}&page_size=${pageSize}`);
      setRooms(response.data.results)
      setTotalPages(Math.ceil(response.data.count / pageSize));
      setCurrentPage(page);
      setError(null);
    } catch(error) {
      console.error("Error fetching rooms:", error);
      setError(error.response?.data?.message || "Failed to load rooms")
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms(1);
  }, [pageSize]);

  const value = {
    rooms,
    isLoading,
    error,
    currentPage,
    totalPages,
    pageSize,
    setPageSize,
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