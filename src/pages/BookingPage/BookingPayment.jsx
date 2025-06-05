import React, { useState } from "react";
import { FaArrowRight, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function BookingPayment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardId, setCardId] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmMember, setConfirmMember] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleBack = () => {
    // Handle back navigation
    navigate("/bookings");
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

    if (Object.keys(newErrors).length === 0) {
      //handle book navigation
      navigate("/booking-receipt", { state: { paymentMethod, cardId } });
    }
  };

  return (
    <main className="flex flex-col items-center gap-5  px-20 py-[18px] bg-blue-950 max-md:px-5">
      {/*<PaymentForm />*/}
      <section className="flex flex-col px-5 py-8 w-[801px] max-w-5xl bg-white rounded-lg">
        <h1 className="text-3xl sm:text-4xl font-semibold text-black">
          Payment Information
        </h1>

        {/* Payment Method Selection */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6 w-full">
          <p className="text-xl sm:text-2xl text-black min-w-[180px] sm:min-w-[200px]">
            Payment Method:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`flex items-center justify-center px-4 py-2 border rounded-md transition-all w-full sm:w-1/2 ${
                paymentMethod === "card"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-black border-gray-400"
              }`}
            >
              <FaCreditCard className="w-5 h-5 mr-2" />
              Card/Online
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("cash")}
              className={`flex items-center justify-center px-4 py-2 border rounded-md transition-all w-full sm:w-1/2 ${
                paymentMethod === "cash"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-black border-gray-400"
              }`}
            >
              <FaMoneyBillWave className="w-5 h-5 mr-2" />
              Cash
            </button>
          </div>
        </div>
        {errors.paymentMethod && (
          <p className="text-red-500 text-sm mt-2">{errors.paymentMethod}</p>
        )}

        {/* Card ID Field */}
        {paymentMethod === "card" && (
          <div className="flex flex-col mt-6 w-full">
            <label htmlFor="cardId" className="text-lg text-black mb-1">
              Card ID
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
            className="flex-1 cursor-pointer leading-tight"
          >
            I confirm that I am an official member of the Bookly Company
          </label>
        </div>
        {errors.confirmMember && (
          <p className="text-red-500 text-sm">{errors.confirmMember}</p>
        )}

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2 mt-4 w-full text-base text-black">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-1"
          />
          <label
            htmlFor="agreeTerms"
            className="flex-1 cursor-pointer leading-snug"
          >
            By checking this box and confirming your booking, you acknowledge
            that all the information provided is accurate and you agree to the
            hotel's Terms of Use and Privacy Policy.
          </label>
        </div>
        {errors.agreeTerms && (
          <p className="text-red-500 text-sm">{errors.agreeTerms}</p>
        )}
      </section>

      {/*<BookingSummary />*/}
      <article className="flex flex-col px-5 pt-4 pb-4 w-[801px] text-base text-black bg-white rounded-lg max-md:mt-7 max-md:max-w-full">
        <img
          src=""
          alt="Hotel Image"
          className="object-contain self-stretch w-full rounded-lg aspect-[3.39] max-md:max-w-full"
        />
        <h2 className="self-start mt-2 ml-1 font-bold max-md:max-w-full">
          Hotel Sogu | Standard Room | Sun, Apr 20 - Wed, Apr 23, 3 nights.
        </h2>

        <h className="mt-3 ml-1 text-[20px] font-semibold text-black max-md:ml-2.5">
          Price Details
        </h>

        <div className="self-stretch text-[15px] font-medium text-black max-md:mr-2.5 max-md:max-w-full px-3 ">
          <div className="flex justify-between mb-1 mt-[10px]">
            <span>Price per Night</span>
            <span className="text-right">P2,800</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>3 night(s)</span>
            <span className="text-right">P8,400</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Discount</span>
            <span className="text-right">P0</span>
          </div>
          <hr className="shrink-0 self-stretch mt-3 mx-1 w-full h-0 border border-black border-solid max-md:mr-2.5" />
          <div className="text-xl flex justify-between mb-1 mt-[13.8px]">
            <span>Total</span>
            <span className="text-right">P8,400</span>
          </div>
        </div>
      </article>

      {/*<NavigationButtons />*/}
      <nav className="flex flex-col items-end ml-24 mt-4 w-full font-semibold max-md:pl-5 max-md:mt-10 max-md:max-w-full">
        {/* Buttons */}
        <div className="flex flex-wrap gap-9 mr-9 max-w-full text-xl w-[625px] max-md:mr-2.5">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 grow shrink-0 px-16 py-5 text-black whitespace-nowrap rounded-xl basis-0 bg-neutral-200 w-fit max-md:px-5"
          >
            <FaArrowRight className="text-orange-400 text-2xl transform -scale-x-100" />
            <span className="text-lg font-medium">Back</span>
          </button>

          <button
            onClick={handleBookNow}
            className="flex items-center justify-center flex-auto gap-2 py-5 pr-10 pl-5 text-white bg-blue-900 rounded-xl max-md:pr-5"
          >
            <span className="text-lg font-medium max-md:text-base">
              Book Now!
            </span>
            <FaArrowRight className="text-orange-400 text-2xl" />
          </button>
        </div>

        {/* Progress steps baba the buttons */}
        <div className="flex gap-10 mt-5 mr-24 mb-14 max-md:flex-wrap max-md:justify-center max-md:mr-2.5">
          <div className="flex flex-col items-center">
            <span className="px-3 text-base text-black rounded-full bg-white h-[31px] w-[31px] flex items-center justify-center">
              1
            </span>
            <p className="text-sm text-white mt-1 text-center">
              Customer Information
            </p>
          </div>
          <div className="flex flex-col items-center">
            <span className="px-3 text-base text-black rounded-full bg-white h-[31px] w-[31px] flex items-center justify-center">
              2
            </span>
            <p className="text-sm text-white mt-1 text-center">
              Payment Information
            </p>
          </div>
          <div className="flex flex-col items-center">
            <span className="px-3 text-base text-white rounded-full bg-black h-[31px] w-[31px] flex items-center justify-center">
              3
            </span>
            <p className="text-sm text-black mt-1 text-center">
              Booking is confirmed!
            </p>
          </div>
        </div>
      </nav>
    </main>
  );
}

export default BookingPayment;