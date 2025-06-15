import React, { useState, useEffect } from "react";
import "./UserDashboard.scss";
import SideMenu from "./SideMenu.jsx";

import { useNavigate } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { LuMapPinHouse } from "react-icons/lu";
import { useBookings } from "../../context/BookingContext.jsx";
import { useTransactions } from "../../context/TransactionContext.jsx";

const UserDashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [bookings, setBookings] = useState([]);
  const { fetchUserBookings, cancelBooking } = useBookings();
  const { fetchTransactionByBookingId } = useTransactions();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        const username = `${parsedUser.first_name} ${parsedUser.last_name}`;
        const userEmail = `${parsedUser.email}`;
        const contactNumber = `${parsedUser.contact_number}`;
        setName(username);
        setEmail(userEmail);
        setContact(contactNumber);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const userBookings = await fetchUserBookings();
        setBookings(userBookings);
      } catch (err) {
        console.error("Failed to load bookings:", err);
        setError(err.message || "Failed to load bookings");
      }
    };

    loadBookings();
  }, [fetchUserBookings]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePayNow = (bookingId) => {
    console.log(`Processing payment for booking: ${bookingId}`);
    navigate(`/bookings/${bookingId}/`);
  };

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      const updatedBookings = await fetchUserBookings();
      setBookings(updatedBookings);
    } catch (err) {
      console.error("Cancellation failed:", err);
      setError(err.message || "Cancellation failed");
    }
  };

  const handleViewReceipt = async (bookingId) => {
    try {
      const transaction = await fetchTransactionByBookingId(bookingId);
      if (transaction && transaction.transaction_id) {
        navigate(`/bookings/payment/receipt/${transaction.transaction_id}`);
      } else {
        alert("No receipt found for this booking.");
      }
    } catch (err) {
      alert("Failed to fetch receipt.");
    }
  };

  const getTotalPrice = (booking) => {
    if (booking.transaction) {
      return booking.transaction.total_amount;
    }

    const checkIn = new Date(booking.booking_check_in);
    const checkOut = new Date(booking.booking_check_out);
    const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return days * (booking.room?.price_per_night || 0);
  };

  const getRoomImage = (room) => {
    if (room && room?.main_image) {
      return room.main_image;
    }
    return "https://via.placeholder.com/265x192?text=No+Image";
  };

  return (
    <>
      <div className="user-profile-page-container flex flex-col md:flex-row ">
        <SideMenu />
        <div className="user-content-container flex flex-col justify-center items-center flex-1 p-4 md:p-6 lg:p-8">
          {/* User Profile Section */}
          <div className="user-profile-container w-[90%] bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="user-profile-icon-div flex items-center justify-center mb-4 md:mb-0">
                {/* <div className="icon-circle-bg relative rounded-full w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[175px] lg:h-[175px] bg-teal-400"></div> */}
              </div>
              <div className="user-info-div md:ml-6 text-center md:text-left">
                <div className="user-name-text mb-4">
                  {name && (
                    <h2 className="user-name-text font-semibold text-2xl md:text-3xl">
                      Hello, {name}
                    </h2>
                  )}
                </div>
                <div className="user-email-info flex flex-col md:flex-row md:items-center mb-2">
                  <h3 className="user-email font-bold mr-1">Email:</h3>
                  {email && (
                    <span className="user-email-address font-regular">
                      {email}
                    </span>
                  )}
                </div>
                <div className="user-contact-info flex flex-col md:flex-row md:items-center">
                  <h3 className="user-email font-bold mr-1">Contact Number:</h3>
                  {contact && (
                    <span className="user-email-address font-regular">
                      {contact}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bookings Section */}
          <div className="user-booking-container w-[90%] max-h-[675px] bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="text-header-info mb-6">
              <h2 className="bookings-header-text font-bold text-2xl md:text-3xl">
                My Bookings
              </h2>
            </div>

            {bookings.length === 0 ? (
              <p className="text-center py-8 text-2xl md:text-3xl font-quicksand font-bold text-main-color">
                No bookings found.
              </p>
            ) : (
              <div className="flex flex-col space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.booking_id}
                    className="bookings-details-container-div w-full p-3 flex flex-col md:flex-row gap-4 shadow-md rounded-lg"
                  >
                    <img
                      src={getRoomImage(booking.room)}
                      alt="Room image"
                      className="h-48 md:h-full w-full md:w-[265px] rounded-lg object-cover"
                    />

                    <div className="room-details flex flex-col flex-grow">
                      <h3 className="room-name font-bold text-xl md:text-2xl mb-2">
                        {booking.room?.room_name || "Room Type"}
                      </h3>

                      <div className="flex flex-col md:flex-row md:justify-between w-full">
                        <div className="details-left w-full md:w-1/2">
                          <div className="address-div flex items-center mb-2">
                            <LuMapPinHouse className="icon text-lg mr-2" />
                            <p className="text-gray-600">
                              {booking.room?.property_details?.address ||
                                "123 Somewhere St, Some City, Manila"}
                            </p>
                          </div>

                          <div className="guest-div flex items-center mb-2">
                            <FaUserGroup className="icon text-lg mr-2" />
                            <p className="text-gray-600">
                              Guests: {booking.guest || 2}
                            </p>
                          </div>

                          <h3 className="room-price font-bold text-lg md:text-xl mb-4">
                            Total: ₱ {getTotalPrice(booking)}
                          </h3>
                        </div>

                        <div className="details-right w-full md:w-1/2">
                          <div className="flex flex-row space-x-6 mb-4">
                            <div className="check-in-div">
                              <h3 className="font-semibold text-base md:text-lg">
                                Check-In
                              </h3>
                              <p className="text-gray-600">
                                {formatDate(booking.booking_check_in)}
                              </p>
                            </div>

                            <div className="check-out-div">
                              <h3 className="font-semibold text-base md:text-lg">
                                Check-out
                              </h3>
                              <p className="text-gray-600">
                                {formatDate(booking.booking_check_out)}
                              </p>
                            </div>
                          </div>

                          <div className="status-and-actions flex flex-col items-start md:items-end space-y-3">
                            <div className="status-div">
                              {booking.booking_status === "confirmed" ? (
                                <p className="flex items-center text-green-500 font-semibold text-lg">
                                  <span className="relative flex h-3 w-3 mr-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                  </span>
                                  Paid
                                </p>
                              ) : booking.booking_status === "cancelled" ? (
                                <p className="flex items-center text-red-500 font-semibold text-lg">
                                  <span className="relative flex h-3 w-3 mr-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                  </span>
                                  Cancelled
                                </p>
                              ) : booking.booking_status === "pending" ? (
                                <p className="flex items-center text-yellow-500 font-semibold text-lg">
                                  <span className="relative flex h-3 w-3 mr-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                                  </span>
                                  Pending
                                </p>
                              ) : (
                                <p className="flex items-center text-red-500 font-semibold text-lg">
                                  <span className="relative flex h-3 w-3 mr-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                                  </span>
                                  {booking.booking_status || "Unknown"}
                                </p>
                              )}
                            </div>

                            <div className="button-group flex space-x-2">
                              {booking.booking_status === "pending" ? (
                                <>
                                  <button
                                    onClick={() =>
                                      handlePayNow(booking.booking_id)
                                    }
                                    className="btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors"
                                  >
                                    Pay Now
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleCancel(booking.booking_id)
                                    }
                                    className="btn bg-gray-200 text-main-white py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : booking.booking_status === "confirmed" ? (
                                <button
                                  onClick={() =>
                                    handleViewReceipt(
                                      booking.booking_id
                                    )
                                  }
                                  className="btn bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-800 transition-colors"
                                >
                                  View Receipt
                                </button>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
