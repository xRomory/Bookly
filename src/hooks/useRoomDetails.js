import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export const useRoomDetails = () => {
  const { room_id } = useParams();
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheRef = useRef(new Map());

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if(cacheRef.current.has(room_id)) {
        setRoom(cacheRef.current.get(room_id));
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      try {
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