import React from "react";
import "./RoomModal.scss";

const RoomModal = ({ isOpen, onClose, property }) => {
  if(!isOpen || !property) return null;

  const primaryImage = property.images?.find(img => img.is_primary) || property.images?.[0];
  const imageUrl = primaryImage?.image || '/placeholder.jpg';

  return (
    <div className="room-modal-container fixed bg-white inset-0 w-[40vw] rounded-2xl m-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="logo-div m-[1rem_2rem]">
        <h1 className="logo">Bookly</h1>
        <p className="tagline font-medium">Book with Ease, Stay in Peace</p>
      </div>

      <div className="info-container flex p-[.5rem_1.5rem] rounded-lg flex-col">
        <div className="image-container flex justify-center w-full">
          <img
            src={imageUrl}
            alt={property.property_name}
            className="w-[95%] rounded-md h-[35vh] object-cover shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-4"
          />
        </div>      

        <div className="text-info m-[1rem_2rem]">
          <h2 className="location-name font-bold">{property.property_name}</h2>
          <p className="address font-medium">{property.address}</p>
          <p className="description mt-2">{property.property_description}</p>
        </div>

        <div className="button-container flex justify-between p-[1rem_3rem]">
          <button onClick={onClose} className="cancel">
            Cancel
          </button>
          <button className="confirm">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;