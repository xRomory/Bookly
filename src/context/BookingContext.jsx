import React, { createContext, useCallback, useContext, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

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

  const updateBookingData = (data) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const submitBooking = async (bookingDataOverride = null) => {
    const dataToSubmit = bookingDataOverride || bookingData;

    if (dataToSubmit.checkOutDate <= dataToSubmit.checkInDate) {
      throw new Error("Check-out date must be after check-in date");
    }

    try {
      const formattedData = {
        user: user?.user_id,
        room: dataToSubmit.roomId,
        booking_date: new Date().toISOString().split("T")[0],
        booking_check_in: dataToSubmit.checkInDate.toISOString(),
        booking_check_out: dataToSubmit.checkOutDate.toISOString(),
        guest_first_name: dataToSubmit.firstName,
        guest_last_name: dataToSubmit.lastName,
        guest_email: dataToSubmit.email,
        guest_contact_number: dataToSubmit.contactNumber,
        guest: parseInt(dataToSubmit.guests),
        booking_status: "pending",
      };

      const response = await api.post("/booking/room-booking/", formattedData);
      setCurrentBooking(response.data);
      return response.data;
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      throw error;
    }
  };

  const fetchBookingDetails = useCallback(async (bookingId) => {
    try {
      const response = await api.get(`/booking/room-booking/${bookingId}`);
      setCurrentBooking(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch booking details:", error);
      throw error;
    }
  }, []);

  const value = {
    bookingData,
    currentBooking,
    updateBookingData,
    submitBooking: (data) => submitBooking(data),
    fetchBookingDetails,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookings must be used within a BookingProvider");
  }

  return context;
};
