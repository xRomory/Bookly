import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function BookingReceipt() {
  const location = useLocation();
  const { cardId, paymentMethod } = location.state || {};
  const navigate = useNavigate();

  const handleHome = () => {
    // Handle back navigation
    navigate("/");
  };

  const handleViewBooking = () => {
    // Handle proceed to payment
    navigate("/User");
  };

  return (
    <main className="flex overflow-hidden flex-col items-end pl-20 pr-8 pt-11 pb-10 bg-blue-950 max-md:px-5 max-md:pt-24">
      <section className="self-center pt-9 pb-10 mb-8 max-w-full rounded-lg bg-zinc-300 w-[634px]">
        <header className="font-semibold px-9 py-1.5 text-xl text-black border border-solid bg-stone-300 border-neutral-200 max-md:px-5 max-md:max-w-full">
          Payment Receipt
        </header>
        <div className="flex flex-col px-4 mt-3.5 w-full max-md:max-w-full">
          <p className="self-center text-xl font-light text-center text-black max-md:max-w-full">
            Thank you for your payment.
            <br />
            This page serves as your receipt and provides you with Reference
            Number.
            <br />
            Please save or screenshot this receipt. You'll need the Booking
            Reference Number during check-in.
          </p>

          {/*<ReceiptDetails />*/}
          <hr className="shrink-0 mt-7 max-w-full h-0 border-black w-[603px] max-md:mr-0.5" />

          <p className="self-start font-semibold mt-3 ml-1.5 text-lg text-black max-md:ml-2.5">
            Price Details
          </p>

          <div className="self-stretch text-lg font-light text-black max-md:mr-2.5 max-md:max-w-full px-3 ">
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
            <hr className="shrink-0 mt-7 max-w-full h-0 border-black w-[603px] max-md:mr-0.5" />
            <div className="text-xl flex justify-between mb-1 mt-[13.8px]">
              <span>Total</span>
              <span className="text-right">P8,400</span>
            </div>
          </div>

          <hr className="shrink-0 mt-3 max-w-full h-0 border-black w-[603px] max-md:mr-0.5" />
          {/*<BookingDates />*/}
          <div className="flex flex-wrap gap-5 justify-between mt-3.5 mr-3 ml-5 text-xl text-zinc-500 max-md:mr-2.5 max-md:max-w-full">
            <div>
              <span className="text-sm">Check-in</span>
              <br />
              <span className="text-base text-black">05/20/2025</span>
            </div>
            <div>
              <span className="text-sm">Check-out</span>
              <br />
              <span className="text-base text-black">05/23/2025</span>
            </div>
          </div>

          <hr className="shrink-0 mt-3.5 max-w-full h-0 border-black w-[603px]" />

          {/*<PaymentInfo />*/}
          <div className="mt-2 ml-5 max-w-full w-[440px]">
            <div className="flex gap-5 max-md:flex-col">
              <div className="w-[45%] max-md:ml-0 max-md:w-full">
                <div className="grow text-xl text-zinc-500 max-md:mt-10">
                  <div>
                    <span className="text-sm">Amount</span>
                    <br />
                    <span className="text-black font-medium">P8, 400.00</span>
                  </div>
                  <div className="mt-4 max-md:mr-2.5">
                    {paymentMethod === "card" && (
                      <div>
                        <span className="text-sm">Card ID</span>
                        <br />
                        <span className="text-black font-medium">
                          {"*".repeat(cardId.length - 3)}
                          {cardId.slice(-3)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <span className="text-sm">Reference Number</span>
                    <br />
                    <span className="text-black font-medium">12345678</span>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm">Booking Date</span>
                    <br />
                    <span className="text-black font-medium">04/21/2025</span>
                  </div>
                </div>
              </div>
              <div className="ml-5 w-[55%] max-md:ml-0 max-md:w-full">
                <div className="text-xl text-zinc-500 max-md:mt-10">
                  <span className="text-sm">Total Payment Amount</span>
                  <br />
                  <span className="text-black">P8, 400.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <nav className="flex flex-col items-end ml-24 pl-20 w-full font-semibold max-md:pl-5 max-md:mt-10 max-md:max-w-full">
        {/* Buttons */}
        <div className="flex flex-wrap gap-9 mr-9 max-w-full text-xl w-[625px] max-md:mr-2.5">
          <button
            onClick={handleHome}
            className="flex items-center gap-2 grow shrink-0 px-16 py-5 text-black whitespace-nowrap rounded-xl basis-0 bg-neutral-200 w-fit max-md:px-5"
          >
            <FaArrowRight className="text-orange-400 text-2xl transform -scale-x-100" />
            <span className="text-lg font-medium">Home</span>
          </button>

          <button
            onClick={handleViewBooking}
            className="flex items-center justify-center flex-auto gap-2 py-5 pr-10 pl-5 text-white bg-blue-900 rounded-xl max-md:pr-5"
          >
            <span className="text-lg font-medium max-md:text-base">
              View Booking
            </span>
            <FaArrowRight className="text-orange-400 text-2xl" />
          </button>
        </div>

        {/* Progress steps BELOW the buttons */}
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
            <span className="px-3 text-base text-black rounded-full bg-white h-[31px] w-[31px] flex items-center justify-center">
              3
            </span>
            <p className="text-sm text-white mt-1 text-center">
              Booking is confirmed!
            </p>
          </div>
        </div>
      </nav>
    </main>
  );
}

export default BookingReceipt;