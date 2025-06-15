import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProperties } from "../../context/PropertyContext";
import { useRooms } from "../../context/RoomContext";
import LoadingSpinner from "../../components/Utilities/LoadingSpinner";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const {
    fetchPropertyDetail,
    isLoading: propertyLoading,
    deleteProperty,
  } = useProperties();
  const {
    rooms,
    isLoading: roomsLoading,
    fetchRooms,
    deleteRoom,
    error: roomError,
  } = useRooms();

  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const propertyData = await fetchPropertyDetail(propertyId);
      setProperty(propertyData);
      await fetchRooms(propertyId);
    };
    loadData();
  }, [propertyId, fetchPropertyDetail, fetchRooms]);

  const propertyRooms = rooms.filter(
    (room) =>
      String(room.property?.property_id || room.property) === String(propertyId)
  );

  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteRoom(roomId);
    } catch (error) {
      console.error("Failed to delete room:", error);
    }
  };

  const handleDeleteProperty = async () => {
    try {
      await deleteProperty(propertyId);
      navigate("/property/");
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  const handleRoomEdit = async () => {
    navigate(`/property/${propertyId}/edit-room/`);
  };

  if (propertyLoading || roomsLoading || !property) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-main-white">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="mb-6">
            <button
              onClick={() => navigate(`/property/`)}
              className="text-blue-900 font-quicksand font-bold hover:text-blue-800 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Property Dashboard
            </button>
          </div>
          {/* Property Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-quicksand font-bold text-gray-800">
                {property.property_name}
              </h1>
              <p className="text-gray-600 mt-1">{property.address}</p>
              <p className="text-blue-600 font-medium mt-1">
                {property.category}
              </p>
            </div>

            <div className="flex space-x-3">
              <Link
                to={`/property/${propertyId}/add-room`}
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
              >
                Add Room
              </Link>
              <button
                onClick={() => setDeleteConfirmation(true)}
                className="bg-red-600 text-white px-4 py-2 font-quicksand font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Delete Property
              </button>
            </div>
          </div>

          {/* Property Images */}
          <div className="flex items-center space-x-6">
            {property.images && property.images.length > 0 && (
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">Property Image</h2>
                <div className="rounded-lg overflow-hidden h-64 bg-gray-100">
                  <img
                    src={property.images[0].image}
                    alt={property.property_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {property.logo && (
              <div className="w-40">
                <h2 className="text-lg font-semibold mb-2">Property Logo</h2>
                <div className="rounded-lg overflow-hidden h-40 w-40 p-4 bg-gray-100 flex items-center justify-center">
                  <img
                    src={property.property_logo_url}
                    alt={`${property.property_name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Property Location */}
          <div>
            <h2 className="text-lg font-quicksand font-semibold mb-2">
              Property Location
            </h2>
            <div className="text-gray-600 font-quicksand">
              <p>Latitude: {property.latitude}</p>
              <p>Longitude: {property.longitude}</p>
            </div>
          </div>

          {/* Rooms Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-quicksand font-bold mb-4">Rooms</h2>

            {propertyRooms.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-md text-center">
                <p className="text-gray-600">No rooms added yet.</p>
                <Link
                  to={`/property/${propertyId}/add-room`}
                  className="font-quicksand font-medium mt-3 inline-block bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
                >
                  Add Your First Room
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {propertyRooms.map((room) => (
                  <div
                    key={room.room_id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    {room.main_image && (
                      <div className="h-48">
                        <img
                          src={room.main_image}
                          alt={room.room_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-quicksand font-semibold">
                          {room.room_name}
                        </h3>
                        <span className="text-sm font-quicksand font-semibold text-blue-600">
                          {room.room_type}
                        </span>
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-xs font-quicksand font-semibold rounded-full">
                          Capacity: {room.capacity}
                        </span>
                      </div>

                      <p className="font-quicksand font-medium text-gray-600 mt-2 text-sm line-clamp-3">
                        {room.room_description}
                      </p>

                      {room.amenities && room.amenities.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-quicksand font-semibold text-gray-700">
                            Amenities:
                          </h4>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {room.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 font-quicksand font-medium text-gray-700 text-xs px-2 py-1 rounded"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-8 flex justify-between">
              
                          <div key={room.room_id}>
                        
                            <button
                              onClick={() =>
                                navigate(
                                  `/property/${propertyId}/edit-room/${room.room_id}`
                                )
                              }
                            >
                              Edit
                            </button>
                          </div>
              
                        <button
                          onClick={() => setRoomToDelete(room.room_id)}
                          className="font-quicksand font-bold text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove Room
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* {roomError && <div className="text-red-500 mt-2">{roomError}</div>} */}
          </div>

          {/* Delete Confirmation Modal */}
          {deleteConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h3 className="text-xl font-quicksand font-bold text-gray-900">
                  Delete Property
                </h3>
                <p className="mt-2 font-quicksand text-gray-600">
                  Are you sure you want to delete "{property.property_name}"?
                  This action cannot be undone.
                </p>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setDeleteConfirmation(null)}
                    className="px-4 py-2 font-quicksand font-semibold bg-gray-500 text-main-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteProperty}
                    className="px-4 py-2 font-quicksand font-semibold bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {roomToDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h3 className="text-xl font-quicksand font-bold text-gray-900">
                  Delete Property
                </h3>
                <p className="mt-2 font-quicksand text-gray-600">
                  Are you sure you want to delete "{property.property_name}"?
                  This action cannot be undone.
                </p>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setRoomToDelete(null)}
                    className="px-4 py-2 font-quicksand font-semibold bg-gray-500 text-main-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        `/property/${propertyId}/edit-room/${room.room_id}`
                      )
                    }
                    className="px-4 py-2 font-quicksand font-semibold bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
