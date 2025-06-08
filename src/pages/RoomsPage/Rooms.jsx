import React, { useCallback, useEffect, useState } from "react";
import "./RoomsPage.scss";
import SearchFilter from "../../components/SearchFilter/SearchFilter.jsx";

import { Link } from "react-router-dom";
import { useRooms } from "../../context/RoomContext.jsx";

const Rooms = () => {
  const {
    rooms,
    isLoading,
    currentPage,
    totalPages,
    fetchRooms,
    pageSize,
    setPageSize,
  } = useRooms();

  useEffect(() => {
    if (rooms && rooms.length > 0) {
      setFilteredRooms(rooms);
    }
  }, [rooms]);

  const [filteredRooms, setFilteredRooms] = useState([]);
  const handleFilterChange = useCallback((newFilteredRooms) => {
    setFilteredRooms(newFilteredRooms);
  }, []);

  const handlePageChange = (newPage) => {
    fetchRooms(newPage);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  const prefetchRoomData = (roomId) => {
    api.get(`/rooms/${roomId}/`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 z-50"></div>
      </div>
    );
  }

  return (
    <>
      <div className="rooms-section-container w-full h-full flex justify-between">
        <div className="search-filter-container">
          <SearchFilter onFilterChange={handleFilterChange} />
        </div>

        <div className="rooms-type-container w-full max-h-[59rem] flex flex-col pt-[8.5rem]">
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
                          e.target.src = "/placeholder.jpg";
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
                        <Link
                          to={`/rooms/${room.room_id}`}
                          onMouseEnter={() => prefetchRoomData(room.room_id)}
                          onClick={() => prefetchRoomData(room.room_id)}
                        >
                          View Details
                        </Link>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-results-found flex justify-center items-center h-full">
                <p className="text-2xl text-white font-bold font-quicksand">
                  {!rooms || rooms.length === 0
                    ? "No rooms available"
                    : "No rooms match your search criteria"}
                </p>
              </div>
            )}
          </div>

          <div className="pagination-controls flex justify-between items-center mt-4 px-10 py-2 bg-blue-950 w-[90%] rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.4)]">
            <div className="page-size-selector">
              <label htmlFor="pageSize" className="mr-2 text-white">
                Items per page:
              </label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={handlePageSizeChange}
                className="p-1 rounded"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-teal-500 text-white disabled:opacity-50"
              >
                First
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded  bg-teal-500 text-white disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded  bg-teal-500 text-white disabled:opacity-50"
              >
                Next
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded  bg-teal-500 text-white disabled:opacity-50"
              >
                Last
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;
