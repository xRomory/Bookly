import React from "react";

const RoomDetails = ({ room, guests, booking }) => {
  return (
    <>
      <div className="mb-4 space-y-2">
        <header className="font-bold text-center font-quicksand px-9 py-1.5 text-2xl text-black border border-solid max-md:px-5 max-md:max-w-full">
          User Details
        </header>

        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">Name:</p>
          <p className="font-quicksand font-medium text-main-color">
            {booking.guest_first_name} {booking.guest_last_name}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">
            Guest Email Address:
          </p>
          <p className="font-quicksand font-medium text-main-color">
            {booking.guest_email}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">
            Guest Contact Number:
          </p>
          <p className="font-quicksand font-medium text-main-color">
            {booking.guest_contact_number}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-quicksand font-medium text-main-color">
            Number of Guests:
          </p>
          <p className="font-quicksand font-medium text-main-color">
            {guests.guest}
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
      </div>

      <div className="mb-4 space-y-2">
        <header className="font-bold text-center font-quicksand px-9 py-1.5 text-2xl text-black border border-solid max-md:px-5 max-md:max-w-full">
          Room Details
        </header>

        <div className="flex justify-between items-center">
          <p className="font-quicksand font-medium text-main-color">
            Room Name:
          </p>
          <p className="font-quicksand font-medium text-main-color">
            {room.room_name}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-quicksand font-medium text-main-color">Address:</p>
          <p className="font-quicksand font-medium text-main-color">
            {room.property_details.address}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-quicksand font-medium text-main-color">Owner:</p>
          <p className="font-quicksand font-medium text-main-color">
            {room.property_details.property_name}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-quicksand font-medium text-main-color">
            Owner's Contact Number:
          </p>
          <p className="font-quicksand font-medium text-main-color">
            {room.property_details.contact_number}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-quicksand font-medium text-main-color">
            Owner's Email:
          </p>
          <p className="font-quicksand font-medium text-main-color">
            {room?.owner?.owner?.email}
          </p>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
