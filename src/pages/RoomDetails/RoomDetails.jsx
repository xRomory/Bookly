import React, { useState, useMemo, useCallback, Suspense } from "react";
import "./RoomDetails.scss";
import RoomMaps from "./RoomMaps.jsx";
import RoomHeader from "../../components/RoomComponents/RoomHeader.jsx";
import RoomImages from "../../components/RoomComponents/RoomImages.jsx";
import RoomDescription from "../../components/RoomComponents/RoomDescription.jsx";
import OwnerInfo from "../../components/RoomComponents/OwnerInfo.jsx";
import AmenitiesList from "../../components/RoomComponents/AmenitiesList.jsx";
import LoadingSpinner from "../../components/Utilities/LoadingSpinner.jsx";
import { useRoomDetails } from "../../hooks/useRoomDetails.js";
import { Link } from "react-router-dom";

const BookingModal = React.lazy(() => import('../../components/BookingModal/BookingModal.jsx'));
const DateModal = React.lazy(() => import('../../components/DatePicker/DateModal.jsx'));

const RoomDetails = () => {
  const today = new Date();
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  });

  const handleCheckInChange = useCallback((date) => {
    setCheckInDate(date);

    if (date > checkOutDate) {
      const newCheckOut = new Date(date);
      newCheckOut.setDate(date.getDate() + 1);
      setCheckOutDate(newCheckOut);
    }
  }, [checkOutDate]);

  const { room, isLoading, error } = useRoomDetails();

  const roomData = useMemo(() => ({
    price: `₱ ${Number(room?.price_per_night || 0).toLocaleString()}`,
    mainImage: room?.main_image,
    images: room?.images?.slice(0, 4),
    amenities: room?.amenities,
    propertyDetails: room?.property_details,
    description: room?.room_description,
    capacity: room?.capacity,
    owner: room?.owner,
  }), [room]);

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="font-quicksand font-bold text-5xl flex justify-center items-center w-screen h-screen">Error: {error}</div>;
  if (!room) return <div>Room not found</div>;

  return (
    <div className="room-details-container h-full w-full p-16">
      <div className="room-deets-page-container m-16 p-8">
        <RoomHeader
          name={room.room_name}
          address={roomData.propertyDetails?.address}
        />

        <RoomImages
          mainImage={roomData.mainImage}
          images={roomData.images}
        />

        <RoomDescription
          description={roomData.description}
          price={roomData.price}
          capacity={roomData.capacity}
        />

        <form className="availability-form flex flex-col md:flex-row items-start md:items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl p-6 mx-auto mt-16 max-w-full">
          <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-main-color ">
            <div className="flex flex-col">
              <label
                htmlFor="checkInDate"
                className="font-semibold font-quicksand text-xl"
              >
                Check-in
                <Suspense fallback={<div>Loading date picker...</div>}>
                  <DateModal
                    selectedDate={checkInDate}
                    onChange={handleCheckInChange}
                  />
                </Suspense>
              </label>
            </div>
            <div className="w-px h-16 bg-gray-400/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label
                htmlFor="checkOutDate"
                className="font-semibold font-quicksand text-xl"
              >
                Check-out
                <Suspense fallback={<div>Loading date picker...</div>}>
                  <DateModal selectedDate={checkOutDate} />
                </Suspense>
              </label>
            </div>
            <div className="w-px h-16 bg-gray-400/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label
                htmlFor="guests"
                className="font-semibold font-quicksand text-xl"
              >
                Guest
                <input
                  type="number"
                  className="max-w-20 flex rounded-lg border-2 border-blue-900 px-3 py-[.3rem] mt-1.5 outline-none"
                  placeholder="0"
                  required
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn font-quicksand font-semibold max-w-5xl hover:bg-blue-800 transition-all active:scale-95 text-white text-xl max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 cursor-pointer flex items-center justify-center"
          >
            Check Availability
          </button>
        </form>

        <div className="room-info-container mt-20 flex gap-6">
          <div className="room-more-details w-3/5 h-[30vw] flex p-8 m-auto flex-col">
            <h1 className="font-bold font-quicksand text-[2.5rem] mb-6">Amenities</h1>
            <AmenitiesList amenities={room.amenities} />  
          </div>

          <div className="owner-contact-booking w-2/5 relative">
            <OwnerInfo
              property_details={roomData.propertyDetails}
              owner={roomData.owner}
            />

            <div className="flex justify-center absolute bottom-8 left-52">
              <Suspense fallback={<div>Loading modal...</div>}>
                <BookingModal 
                  roomId={room.room_id} 
                  roomCapacity={room.capacity}
                />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="maps-div mt-24 space-y-4">
          <h2 className="font-quicksand font-bold text-3xl">
            Room Location Map
          </h2>
          <RoomMaps 
            latitude={room.property_details?.latitude}
            longitude={room.property_details?.longitude}
            propertyName={room.property_details?.property_name}
            address={room.property_details?.address}
          />
          <div className="room-location flex justify-between">
            <h3 className="font-quicksand font-semibold text-2xl">
              {room.property_details?.address}
            </h3>
            <Link to="/maps">
              <button className="btn font-quicksand text-xl font-medium bg-blue-900 w-[400px] text-white rounded-lg hover:bg-blue-800">
                See Location
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;