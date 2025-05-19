import React from "react";
import "./RoomModal.scss";

const RoomModal = ({ isOpen, onClose, location }) => {
  // const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  if (!isOpen || !location) return null;

  return (
    <div className="room-modal-container fixed bg-white inset-0 w-[40vw] rounded-2xl m-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="logo-div m-[1rem_2rem]">
        <h1 className="logo">Bookly</h1>
        <p className="tagline font-medium">Book with Ease, Stay in Peace</p>
      </div>

      <div className="info-container flex p-[.5rem_1.5rem] rounded-lg flex-col">
        <div className="image-container flex justify-center w-full">
          <img
            src={location.image}
            alt={location.name}
            className="w-[95%] rounded-md h-[35vh] object-cover shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-4"
          />
        </div>

        <div className="text-info m-[1rem_2rem]">
          <h2 className="location-name font-bold">{location.name}</h2>
          <p className="address font-medium">{location.address}</p>
          <p className="description mt-2">{location.hotel_description}</p>
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
