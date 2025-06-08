import React from "react";

const RecepitDetails = ({ booking, transaction, pricing }) => {
  
  return (
    <div>
      <div className="space-y-2">
        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">
            Name:
          </p>
          <p className="font-quicksand font-medium text-main-color">
            {booking.guest_first_name} {booking.guest_last_name}
          </p>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">
            Email Address:
          </p>
          <p className="font-quicksand font-medium text-main-color">
            {booking.guest_email}
          </p>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">
            Phone Number:
          </p>
          <p className="font-quicksand font-medium text-main-color">
            {booking.guest_contact_number}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">
            Reference Number
          </p>
          <p className="font-quicksand font-medium text-main-color">
            {transaction.reference_number}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">
            Booking Date
          </p>
          <p className="font-quicksand font-medium text-main-color">
            {booking.booking_date}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">
            Check-in:
          </p>
          <p className="font-quicksand font-medium text-main-color">
            {booking.booking_check_in}
          </p>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">
            Check-out:
          </p>
          <p className="font-quicksand font-medium text-main-color">
            {booking.booking_check_out}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">
            Card Number:
          </p>
          <p className="font-quicksand font-medium text-main-color">
            {transaction.payment_token}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">
            Price per day:
          </p>
          <p className="font-quicksand font-medium text-main-color">
            ₱ {pricing.pricePerDay}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-quicksand font-medium text-main-color">
            {pricing.days} day(s)
          </p>
          <p className="font-quicksand font-medium text-main-color">
            ₱ {pricing.pricePerDay * pricing.days}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecepitDetails;
