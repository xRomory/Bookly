import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTransactions } from "../../context/TransactionContext";

import LoadingSpinner from "../../components/Utilities/LoadingSpinner";
import RoomDetails from "../../components/BookingPage/RoomDetails";
import RecepitDetails from "../../components/BookingPage/RecepitDetails";
import ProgressIndicator from "../../components/BookingPage/ProgressIndicator";

function BookingReceipt() {
  const navigate = useNavigate();
  const { transactionId } = useParams();

  const { fetchTransactionDetails } = useTransactions();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionData = await fetchTransactionDetails(transactionId);
        setTransaction(transactionData);
      } catch (err) {
        setError(err.message || "Failed to load transaction details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [transactionId, fetchTransactionDetails]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="font-quicksand font-bold flex justify-center items-center">
        Error: {error}
      </div>
    );
  if (!transaction)
    return (
      <div className="font-quicksand font-bold flex justify-center items-center">
        No transaction found
      </div>
    );

  const {
    booking_details: booking,
    room,
    property_details: property,
    reference_number,
    total_amount,
    transaction_date
  } = transaction;

  const checkIn = new Date(booking.booking_check_in);
  const checkOut = new Date(booking.booking_check_out);
  const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  const totalPrice = transaction.total_amount || days * room.price_per_night;

  const formattedBooking = {
    ...booking,
    booking_check_in: formatDate(booking.booking_check_in),
    booking_check_out: formatDate(booking.booking_check_out),
    booking_date: formatDate(booking.booking_date),
    transaction_date: formatDate(transaction.transaction_date),
  };

  const pricingData = {
    pricePerDay: room?.price_per_night,
    days: days,
    total: totalPrice,
  };

  const handleHome = () => navigate("/");
  const handleViewBooking = () => navigate("/user-dashboard");

  return (
    <main className="flex overflow-hidden flex-col items-center justify-center py-6 bg-main-white max-md:px-5 max-md:pt-32">
      <section className="self-center pt-0 pb-10 mb-8 max-w-full rounded-xl bg-secondary-white w-[660px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="flex flex-col justify-center items-center pb-4">
          <h1 className="logo mt-2">Bookly</h1>
          <h2 className="font-playfair-display text-xl">
            Book with Ease, Stay in Peace
          </h2>
        </div>
        <div className="flex flex-col px-4 mt-3.5 w-full max-md:max-w-full">
          <p className="self-center text-xl font-quicksand text-center text-main-color max-md:max-w-full">
            Thank you for your payment.
            <br />
            Please <strong>save</strong> or{" "}
            <strong>screenshot this receipt</strong> for verification.
            <br />
            You'll need the booking reference number during check-in.
          </p>

          <hr className="my-4 border-gray-600" />

          <RoomDetails
            booking={formattedBooking}
            room={room}
            guests={{ guest: booking.guest }}
          />

          

          <header className="font-bold text-center font-quicksand px-9 py-1.5 text-2xl text-black border border-solid max-md:px-5 max-md:max-w-full">
            Payment Receipt
          </header>

          <RecepitDetails
            booking={formattedBooking}
            transaction={transaction}
            pricing={pricingData}
          />

          <hr className="my-4 border-gray-600" />
          <div className="flex justify-between items-center font-bold">
            <h3 className="text-2xl font-quicksand">Total</h3>
            <span className="text-2xl font-quicksand">₱ {totalPrice}</span>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-6 md:w-[35%]">
        <div className="flex gap-4">
          <button
            onClick={handleHome}
            className="flex-1 px-4 py-3 bg-teal-500 hover:bg-teal-400 font-quicksand text-white rounded-md transition-colors font-semibold"
          >
            Home
          </button>

          <button
            onClick={handleViewBooking}
            className="flex-1 px-4 py-3 bg-blue-900 hover:bg-blue-800 font-quicksand text-white rounded-md transition-colors font-semibold"
          >
            View Booking
          </button>
        </div>

        <ProgressIndicator currentStep={3} totalSteps={3} />
      </div>
    </main>
  );
}

export default BookingReceipt;
