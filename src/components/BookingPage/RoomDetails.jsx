import React from "react";

const RoomDetails = ({ room, guests }) => {
  return (
    <div className="mb-4 space-y-2">
      <header className="font-bold text-center font-quicksand px-9 py-1.5 text-2xl text-black border border-solid max-md:px-5 max-md:max-w-full">
        Room Details
      </header>

      <div className="flex justify-between items-center">
        <p className="font-quicksand font-medium text-main-color">Room Name:</p>
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
        <p className="font-quicksand font-medium text-main-color">
          Number of Guest:
        </p>
        <p className="font-quicksand font-medium text-main-color">
          {guests.guest}
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
          Contact Number:
        </p>
        <p className="font-quicksand font-medium text-main-color">
          {room.property_details.contact_number}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-quicksand font-medium text-main-color">Email:</p>
        <p className="font-quicksand font-medium text-main-color">
          {room?.owner?.owner?.email}
        </p>
      </div>
    </div>
  );
};

export default RoomDetails;
