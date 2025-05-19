import React, { useCallback, useState } from "react";
import "./RoomsPage.scss";
import SearchFilter from "../../components/SearchFilter/SearchFilter.jsx";
import Property from "../../data/Property.js";

import { Link } from "react-router-dom";

const Rooms = () => {
  const [filteredRooms, setFilteredRooms] = useState(() => {
    const allRooms = [];

    Property.property_brands.forEach((brand) => {
      brand.room_types.forEach((room) => {
        allRooms.push({ brand, room });
      });
    });

    return allRooms;
  });

  const handleFilterChange = useCallback((newFilteredRooms) => {
    setFilteredRooms(newFilteredRooms);
  }, []);

  return (
    <>
      <div className="rooms-section-container w-full h-full flex justify-between">
        <div className="search-filter-container">
          <SearchFilter onFilterChange={handleFilterChange} />
        </div>

        <div className="rooms-type-container w-full max-h-[64.8rem] flex pt-[8.5rem]">
          <div className="rooms-container w-[90%] h-full bg-blue-950 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.4)] overflow-auto">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((item, index) => (
                <div
                  key={index}
                  className="room-types-div w-[96%] h-[15vw] m-6 flex"
                >
                  <div className="room-image-div flex items-center m-3">
                    <img
                      src={item.room.room_image}
                      alt="Room Image"
                      className="images w-[23vw] h-[13.5vw] object-cover rounded-2xl"
                    />
                  </div>

                  <div className="room-details-div w-[80%] m-2 relative">
                    <h2 className="room-header-text font-bold text-3xl">
                      {item.room.name}
                    </h2>

                    <h3 className="address-text font-medium mt-2 text-xl">
                      {item.brand.address}
                    </h3>

                    <p className="description mt-4 text-lg">
                      {item.room.description}
                    </p>
                    <p className="room-price text-xl mt-6 font-semibold">
                      ₱ {item.room.price_per_night.toLocaleString()}
                    </p>

                    <button className="view-details-btn absolute bottom-3 right-3 bg-blue-900 text-white h-[4rem] w-[9rem] rounded-md hover:bg-blue-800 font-medium">
                      <Link to="/">View Details</Link>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results-found flex justify-center items-center h-full">
                <p className="text-2xl text-white font-bold">
                  No rooms match your search criteria.
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
