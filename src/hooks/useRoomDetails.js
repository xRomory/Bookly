import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export const useRoomDetails = () => {
  const { room_id } = useParams();
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
    setIsLoading(true);
  
    try {
      // const token = localStorage.getItem("token");
  
      const response = await api.get(`/rooms/room-detail/${room_id}`);
      setRoom(response.data);
      setError(null);
    } catch(error) {
      console.error("Error fetching rooms:", error);
      setError("Failed to load rooms");
    } finally {     
      setIsLoading(false);
    }
  };

  if(room_id) fetchRoomDetails();

  }, [room_id]);

  return { room, isLoading, error };
};