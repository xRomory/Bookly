import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';

import { useAuth } from './AuthContext';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const { user } = useAuth();

  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    checkInDate: new Date(),
    checkOutDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    guests: 1,
    roomId: null,
  });

  const [currentBooking, setCurrentBooking] = useState(null);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const updateBookingData = (data) => {
    setBookingData((prev) => ({ ...prev, data }));
  };

  const submitBooking = async () => {
    try {
      const formattedData = {
        first_name: bookingData.firstName,
        last_name: bookingData.lastName,
        email: bookingData.email,
        contact_number: bookingData.contactNumber,
        bookly_check_in: bookingData.checkInDate.toISOString().split('T')[0],
        bookly_check_out: bookingData.checkOutDate.toISOString().split('T')[0],
        guest: bookingData.guests,
        room_id: bookingData.roomId,
        user_id: user?.user_id,
      };

      const response = api.post("/bookings/", formattedData);
      setCurrentBooking(response.data);
      return response.data
    } catch(error) {
      console.error("Booking Submission failed:", error);
      throw error;
    }
  };

  const createTransaction = async (paymentData) => {
    try {
      if(!currentBooking) {
        throw new Error("No booking found to create transaction");
      }

      const response = await api.post("/transactions/", {
        ...paymentData,
        booking_id: currentBooking.booking_id,
        user_id: user?.user_id,
        room_id: currentBooking.room.room_id
      });

      setCurrentTransaction(response.data);
      return response.data;
    } catch (error) {
      console.error("Transaction creation failed:", error);
      throw error;
    }
  };

  const fetchBookingDetails = async (bookingId) => {
    try {
      const response = await api.get(`/bookings/${bookingId}`);
      setCurrentBooking(response.data);
      return response.data
    } catch (error) {
      console.error("Failed to fetch booking details:", error);
      throw error
    }
  }

  const value = {
    bookingData,
    currentBooking,
    currentTransaction,
    updateBookingData,
    submitBooking,
    createTransaction,
    fetchBookingDetails,
  }

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context)  {
    throw new Error("useBookings must be used within a BookingProvider")
  }

  return context;
}