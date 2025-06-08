import React, { useState, useEffect } from "react";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useBookings } from "../../context/BookingContext";
import TransactionDetails from "../../components/BookingPage/TransactionDetails";
import ProgressIndicator from "../../components/BookingPage/ProgressIndicator";
import NavigationButtons from "../../components/BookingPage/NavigationButtons";
import LoadingSpinner from "../../components/Utilities/LoadingSpinner";

function BookingPayment() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { currentBooking, fetchBookingDetails } = useBookings();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardId, setCardId] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmMember, setConfirmMember] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    if (!currentBooking || currentBooking.booking_id !== parseInt(bookingId)) {
      fetchBookingDetails(bookingId);
    }
  }, [bookingId, currentBooking, fetchBookingDetails]);

  if (!currentBooking) return <LoadingSpinner />;

  const handleBack = () => {
    navigate(`/bookings/${currentBooking.booking_id}`);
  };

  const checkIn = new Date(currentBooking.booking_check_in);
  const checkOut = new Date(currentBooking.booking_check_out);
  const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  const total = days * currentBooking.room?.price_per_night;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const bookingData = {
    customer: {
      name: `${
        currentBooking.guest_first_name || currentBooking.user?.first_name
      } ${currentBooking.guest_last_name || currentBooking.user?.last_name}`,
      email: currentBooking.guest_email,
      phone: currentBooking.guest_contact_number,
      checkIn: formatDate(currentBooking.booking_check_in),
      checkOut: formatDate(currentBooking.booking_check_out),
      guests: currentBooking.guest || 1,
    },
    pricing: {
      pricePerDay: currentBooking.room.price_per_night,
      days,
      total,
    },
  };


  const handleBookNow = () => {
    const newErrors = {};

    if (!paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method.";
    }

    if (paymentMethod === "card" && cardId.trim() === "") {
      newErrors.cardId = "Card ID is required for card payments.";
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms and Conditions.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0)
      navigate("/booking-receipt", { state: { paymentMethod, cardId } });
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-main-white">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col items-center gap-12">
          <section className="flex flex-col px-5 py-8 w-[801px] max-w-7xl bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <h1 className="text-3xl font-quicksand font-bold text-black">
              Payment Information
            </h1>

            {/* Payment Method Selection */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6 w-full">
              <p className="font-quicksand font-medium sm:text-2xl text-black min-w-[180px] sm:min-w-[200px]">
                Payment Method:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md transition-all w-full sm:w-1/2 ${
                    paymentMethod === "card"
                      ? "bg-blue-900 text-white border-teal-500"
                      : "bg-white text-black border-gray-400"
                  }`}
                >
                  <FaCreditCard className="w-6 h-6 mr-2" />
                  Card/Online
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md transition-all w-full sm:w-1/2 ${
                    paymentMethod === "cash"
                      ? "bg-blue-900 text-white border-teal-500"
                      : "bg-white text-black border-gray-400"
                  }`}
                >
                  <FaMoneyBillWave className="w-6 h-6 mr-2" />
                  Cash
                </button>
              </div>
            </div>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-2">
                {errors.paymentMethod}
              </p>
            )}

            {/* Card ID Field */}
            {paymentMethod === "card" && (
              <div className="flex flex-col mt-6 w-full">
                <label
                  htmlFor="cardId"
                  className="text-lg font-quicksand font-semibold text-black mb-1"
                >
                  Card Number
                </label>
                <input
                  id="cardId"
                  type="text"
                  value={cardId}
                  onChange={(e) => setCardId(e.target.value)}
                  className="bg-gray-100 rounded-xl border-[3px] border-blue-900 px-3 h-[51px] w-full"
                />
                {errors.cardId && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardId}</p>
                )}
              </div>
            )}

            {/* Confirm Member */}
            <div className="flex items-start gap-2 mt-6 w-full text-base font-medium text-black">
              <input
                type="checkbox"
                id="confirmMember"
                checked={confirmMember}
                onChange={(e) => setConfirmMember(e.target.checked)}
                className="mt-1"
              />
              <label
                htmlFor="confirmMember"
                className="flex-1 cursor-pointer leading-tight font-quicksand"
              >
                I confirm that I am a registered user of Bookly
              </label>
            </div>
            {errors.confirmMember && (
              <p className="text-red-500 text-sm">{errors.confirmMember}</p>
            )}

            {/* Terms and Conditions */}
            <div className="flex items-start gap-2 mt-4 w-full text-base text-black mb-4">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1"
              />
              <label
                htmlFor="agreeTerms"
                className="flex-1 cursor-pointer leading-snug font-quicksand"
              >
                By checking this box and confirming your booking, you
                acknowledge that all the information provided is accurate and
                you agree to Bookly's Terms of Use and Privacy Policy.
              </label>
            </div>

            {errors.agreeTerms && (
              <p className="text-red-500 text-sm mb-4">{errors.agreeTerms}</p>
            )}

            <TransactionDetails
              customer={bookingData.customer}
              pricing={bookingData.pricing}
            />

            <hr className="my-4 border-gray-600" />
            <div className="flex justify-between items-center font-bold">
              <h3 className="text-2xl font-quicksand">Total</h3>
              <span className="text-2xl font-quicksand">
                ₱{bookingData.pricing.total}
              </span>
            </div>
          </section>

          <div className="flex flex-col gap-6 md:w-[40%]">
            <NavigationButtons onBack={handleBack} onProceed={handleBookNow} />
            <ProgressIndicator currentStep={2} totalSteps={3} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookingPayment;
