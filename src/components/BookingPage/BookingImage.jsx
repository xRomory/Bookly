import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const BookingImage = ({ roomId }) => {
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await api.get(`/rooms/room-detail/${roomId}/`);
        setRoom(response.data);
      } catch (error) {
        console.error("Failed to fetch room:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  if (isLoading) return <div className="w-full h-64 bg-gray-200 animate-pulse rounded-t-xl"></div>;

  return (
    <div className="w-full h-64 overflow-hidden">
      <img 
        src={room?.main_image} 
        alt="Room Main Image" 
        className="w-full h-full object-cover rounded-t-xl"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1546484488-2a1430996887?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGV1cm9wZWFuJTIwdG93bnxlbnwwfHwwfHx8MA%3D%3D";
        }}
      />
    </div>
  );
};

export default BookingImage;