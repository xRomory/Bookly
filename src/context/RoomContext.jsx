import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../api/axios";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const fetchRooms = useCallback(async (page = 1) => {
    setIsLoading(true);

    try {
      const response = await api.get(
        `/rooms/room-list/?page=${page}&page_size=${pageSize}`
      );
      setRooms(response.data.results);
      setTotalPages(Math.ceil(response.data.count / pageSize));
      setCurrentPage(page);
      setError(null);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError(error.response?.data?.message || "Failed to load rooms");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createRoom = useCallback(
    async (roomData) => {
      setIsLoading(true);

      try {
        const formData = new FormData();

        // Append all simple fields
        formData.append("property", roomData.property);
        formData.append("room_name", roomData.room_name);
        formData.append("room_type", roomData.room_type);
        formData.append("room_description", roomData.room_description);
        formData.append("price_per_night", roomData.price_per_night);
        formData.append("room_status", roomData.room_status);
        formData.append("capacity", roomData.capacity);

        if (roomData.room_image) {
          formData.append("room_image", roomData.room_image);
        }

        formData.append("amenities", JSON.stringify(roomData.amenities));

        if (roomData.images && roomData.images.length > 0) {
          roomData.images.forEach((img, index) => {
            if (img) {
              formData.append("images", img);
            }
          });
        }

        const response = await api.post("/rooms/room-list/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        await fetchRooms(currentPage);
        return response.data;
      } catch (error) {
        console.error("Error creating room:", error.response?.data);
        setError(error.response?.data || "Failed to create room");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchRooms, currentPage]
  );

  const deleteRoom = useCallback(async (roomId) => {
    setIsLoading(true);
    try {
      await api.delete(`/rooms/room-detail/${roomId}/`);
      setRooms((prev) => prev.filter((room) => room.room_id !== roomId));
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete room");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

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
    createRoom,
    deleteRoom,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export const useRooms = () => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error("useRooms must be used within a RoomProvider");
  }

  return context;
};
