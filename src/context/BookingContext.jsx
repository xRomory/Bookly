import React, {
  createContext,
  use,
  useCallback,
  useContext,
  useState,
} from "react";
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

  const fetchUserBookings = useCallback(async () => {
    try {
      const response = await api.get("/booking/room-booking/");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user bookings", error);
      throw error;
    }
  }, []);

  const roomAvailability = useCallback(
    async ({ roomId, checkInDate, checkOutDate, guests }) => {
      try {
        const response = await api.post("/booking/room-availability/", {
          room_id: roomId,
          booking_check_in: checkInDate,
          booking_check_out: checkOutDate,
          guest: guests,
        });

        return response.data;
      } catch (error) {
        console.error("Failed to check room availability", error);
        throw error;
      }
    }
  );

  const cancelBooking = useCallback(async (bookingId) => {
    try {
      const response = await api.post(
        `/booking/room-booking/${bookingId}/cancel/`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to cancel booking", error);
      throw error;
    }
  });

  const fetchAdminBookings = useCallback(async () => {
    try {
      const response = await api.get("/booking/admin/bookings/");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch admin bookings", error);
      throw error;
    }
  }, []);

  const adminBookingAction = useCallback(async (bookingId, action) => {
    try {
      const response = await api.post(
        `/booking/admin/bookings/${bookingId}/action/`,
        { action }
      );
      return response.data;
    } catch (error) {
      console.error("Admin booking action failed", error);
      throw error;
    }
  }, []);

  const value = {
    bookingData,
    currentBooking,
    updateBookingData,
    submitBooking: (data) => submitBooking(data),
    fetchBookingDetails,
    fetchUserBookings,
    cancelBooking,
    roomAvailability,
    fetchAdminBookings,
    adminBookingAction,
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
