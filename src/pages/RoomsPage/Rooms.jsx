import React, { useCallback, useEffect, useState } from "react";
import "./RoomsPage.scss";
import SearchFilter from "../../components/SearchFilter/SearchFilter.jsx";

import { Link } from "react-router-dom";
import { useRooms } from "../../context/RoomContext.jsx";

const Rooms = () => {
  const { rooms, isLoading } = useRooms();
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    if(rooms && rooms.length > 0) {
      setFilteredRooms(rooms);
    }
  }, [rooms]);

  const handleFilterChange = useCallback((newFilteredRooms) => {
    setFilteredRooms(newFilteredRooms);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  console.log(filteredRooms)

  return (
    <>
      <div className="rooms-section-container w-full h-full flex justify-between">
        <div className="search-filter-container">
          <SearchFilter onFilterChange={handleFilterChange} />
        </div>

        <div className="rooms-type-container w-full max-h-[59rem] flex pt-[8.5rem]">
          <div className="rooms-container w-[90%] h-full bg-blue-950 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.4)] overflow-auto">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => {
                return (
                  <div
                    key={room.room_id}
                    className="room-types-div w-[96%] h-[15vw] m-6 flex"
                  >
                    <div className="room-image-div flex items-center m-3">
                      <img
                        src={room.main_image}
                        alt="Room Image"
                        className="images w-[23vw] h-[13.5vw] object-cover rounded-2xl"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder.jpg';
                        }}
                      />
                    </div>

                    <div className="room-details-div w-[80%] m-2 relative">
                      <h2 className="room-header-text font-bold text-3xl">
                        {room.room_name}
                      </h2>

                      <h3 className="address-text font-medium mt-2 text-xl">
                        {room.property_details?.address}
                      </h3>

                      <p className="description mt-4 text-lg">
                        {room.room_description}
                      </p>
                      <p className="room-price text-xl mt-6 font-semibold">
                        ₱ {Number(room.price_per_night).toLocaleString()}
                      </p>

                      <button className="view-details-btn absolute bottom-3 right-3 bg-blue-900 text-white h-[4rem] w-[9rem] rounded-md hover:bg-blue-800 font-medium">
                        <Link to={`/rooms/${room.room_id}`}>View Details</Link>
                      </button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="no-results-found flex justify-center items-center h-full">
                <p className="text-2xl text-white font-bold font-quicksand">
                  {!rooms || rooms.length === 0 ? "No rooms available" : "No rooms match your search criteria"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;
