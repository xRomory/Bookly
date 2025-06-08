import React, { useEffect, useState } from "react";
import "./BookingModal.scss";
import DateModal from "../DatePicker/DateModal";
import { useBookings } from "../../context/BookingContext";
import { useNavigate, useParams } from "react-router-dom";
import { AiTwotoneCloseCircle } from "react-icons/ai";

const BookingModal = ({ roomId, roomCapacity }) => {
  const navigate = useNavigate();
  const { submitBooking } = useBookings();
  const { room_id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  });

  const handleCheckInChange = (date) => {
    setCheckInDate(date);

    if (date > checkOutDate) {
      const newCheckOut = new Date(date);
      newCheckOut.setDate(date.getDate() + 1);
      setCheckOutDate(newCheckOut);
    }
  };

  const [errorModal, setErrorModal] = useState({
    show: false,
    title: "",
    message: "",
  });

  const showError = (title, message) => {
    setErrorModal({
      show: true,
      title,
      message,
    });
  };

  const closeErrorModal = () => {
    setErrorModal({
      show: false,
      title: "",
      message: "",
    });
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    guests: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.guests > roomCapacity) {
      alert(`This room only accommodates up to ${roomCapacity} guests`);
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    if (checkOutDate <= checkInDate) {
      alert("Check-out date must be after check-in date");
      return;
    }

    if (checkInDate < new Date().setHours(0, 0, 0, 0)) {
      alert("Check-in date cannot be in the past");
      return;
    }

    try {
      const booking = await submitBooking({
        ...formData,
        checkInDate,
        checkOutDate,
        roomId: roomId || room_id,
      });

      if (booking?.booking_id) {
        navigate(`/bookings/${booking.booking_id}`);
      }

      setShowModal(false);
    } catch (error) {
      console.error("Booking failed:", error);
      console.error("Booking failed:", error);
      if (error.response) {
        if (error.response.status === 409) {
          showError(
            "Room Not Available",
            error.response.data.message ||
              "Room is already booked for these dates. Please choose different dates."
          );
        } else {
          showError(
            "Booking Failed",
            error.response.data.message ||
              "An error occurred while processing your booking."
          );
        }
      } else {
        showError(
          "Network Error",
          "Could not connect to the server. Please check your internet connection."
        );
      }
    }
  };

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "unset";
  }, [showModal]);

  return (
    <div className="booking">
      <button
        onClick={toggleShowModal}
        className="btn hover:bg-blue-800 text-white font-quicksand font-semibold text-xl rounded-lg"
      >
        Book Now!
      </button>

      {showModal && (
        <>
          <div
            className={`fixed top-0 left-0 w-full h-full bg-opacity-55 bg-black z-[900] pointer-events-none ${
              showModal ? "active" : ""
            }`}
          ></div>

          <div className="booking-container fixed top-[10%] left-[25%] w-[60rem] h-[53rem] z-[1000] bg-secondary-white rounded-xl p-4">
            <AiTwotoneCloseCircle
              onClick={() => setShowModal(false)}
              className="rounded-full absolute -top-6 -right-6 text-[3rem] text-blue-900 cursor-pointer hover:text-blue-700"
            />

            <div className="flex flex-col justify-center items-center mb-8">
              <h1 className="logo mt-2">Bookly</h1>
              <h2 className="font-playfair-display text-xl">
                Book with Ease, Stay in Peace
              </h2>

              <div className="mt-12">
                <p className="font-quicksand font-semibold text-xl text-left">
                  Please provide the correct information*
                </p>
              </div>
            </div>

            <div className="booking-info flex items-center justify-center">
              <form onSubmit={handleSubmit} className="user-form w-[80%]">
                <div className="user-info grid grid-cols-2 gap-6">
                  <label htmlFor="firstName">
                    <h3 className="font-quicksand text-left mb-2 text-2xl">
                      First Name
                    </h3>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full h-2/4 outline-none bg-main-white p-[20px_45px_20px_20px] rounded-xl"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your First Name"
                      required
                    />
                  </label>

                  <label htmlFor="lastName">
                    <h3 className="font-quicksand text-left mb-2 text-2xl">
                      Last Name
                    </h3>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full h-2/4 outline-none bg-main-white p-[20px_45px_20px_20px] rounded-xl"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your Last Name"
                      required
                    />
                  </label>

                  <label htmlFor="email">
                    <h3 className="font-quicksand text-left mb-2 text-2xl">
                      Email
                    </h3>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full h-2/4 outline-none bg-main-white p-[20px_45px_20px_20px] rounded-xl"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      required
                    />
                  </label>

                  <label htmlFor="contacts">
                    <h3 className="font-quicksand text-left mb-2 text-2xl">
                      Contact Number
                    </h3>
                    <input
                      type="tel"
                      id="contacts"
                      name="contactNumber"
                      className="w-full h-2/4 outline-none bg-main-white p-[20px_45px_20px_20px] rounded-xl"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="+63 9123456789"
                      pattern="^(09\d{9}|639\d{9}|\+639\d{9})$"
                      required
                    />
                  </label>

                  <label htmlFor="checkInDate">
                    <h3 className="font-quicksand text-left mb-2 text-2xl">
                      Check-in
                    </h3>
                    <DateModal
                      selectedDate={checkInDate}
                      onChange={handleCheckInChange}
                    />
                  </label>

                  <label htmlFor="checkOutDate">
                    <h3 className="font-quicksand text-left mb-2 text-2xl">
                      Check-out
                    </h3>
                    <DateModal
                      selectedDate={checkOutDate}
                      onChange={(date) => setCheckOutDate(date)}
                      minDate={checkInDate}
                    />
                  </label>
                </div>

                <label
                  className="flex flex-col items-center mt-8"
                  htmlFor="contacts"
                >
                  <h3 className="font-quicksand mb-2 text-2xl">Guests</h3>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    min="1"
                    max={roomCapacity}
                    className="w-full max-w-36 h-2/4 outline-none bg-main-white p-[15px_15px_15px_15px] rounded-xl"
                    value={formData.guests}
                    onChange={handleChange}
                    placeholder={`1 (max ${roomCapacity})`}
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="btn hover:bg-blue-800 text-white font-quicksand font-medium text-xl rounded-lg absolute bottom-10 right-[30%]"
                >
                  Review Booking
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {errorModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1100]">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h3 className="text-2xl items-start font-quicksand font-bold text-red-600 mb-4">
              {errorModal.title}
            </h3>
            {/* <p className="mb-6 font-quicksand">{errorModal.message}</p> */}
            <p className="mb-6 font-quicksand font-medium">Room has been occupied</p>
            <button
              onClick={closeErrorModal}
              className="bg-blue-900 hover:bg-blue-800 font-quicksand font-semibold text-white py-2 px-4 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingModal;
