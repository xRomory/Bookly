import React from 'react';

const RoomInfo = ({ roomType, address }) => {
  return (
    <div className="mb-4">
      <h2 className="text-3xl text-main-color font-lora font-bold">{roomType}</h2>
      <p className="text-gray-600 text-lg font-lora font-medium">{address}</p>
    </div>
  );
};

export default RoomInfo;