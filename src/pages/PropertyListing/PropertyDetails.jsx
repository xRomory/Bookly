import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ListingContext } from "../../context/ListingContext";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProperty, deleteProperty, deleteRoom } = useContext(ListingContext);
  const [property, setProperty] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchedProperty = getProperty(id);
    if (fetchedProperty) {
      setProperty(fetchedProperty);
    } else {
      // Redirect if property not found
      navigate('/');
    }
  }, [id, getProperty, navigate]);

  if (!property) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleDeleteProperty = () => {
    deleteProperty(id);
    navigate('/');
  };

  const handleDeleteRoom = (roomId) => {
    deleteRoom(id, roomId);
    // Refresh property data
    setProperty(getProperty(id));
  };

  return (
    <div className="space-y-8">
      {/* Property Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{property.name}</h1>
          <p className="text-gray-600 mt-1">{property.address}</p>
          <p className="text-blue-600 font-medium mt-1">{property.category}</p>
        </div>

        <div className="flex space-x-3">
          <Link
            to={`/property/${id}/add-room`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Room
          </Link>
          <button
            onClick={() => setDeleteConfirmation(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Delete Property
          </button>
        </div>
      </div>

      {/* Property Images */}
      <div className="flex items-center space-x-6">
        {property.image && (
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">Property Image</h2>
            <div className="rounded-lg overflow-hidden h-64 bg-gray-100">
              <img 
                src={URL.createObjectURL(property.image)} 
                alt={property.name}
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
                src={URL.createObjectURL(property.logo)} 
                alt={`${property.name} logo`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Property Location */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Property Location</h2>
        <div className="text-gray-600">
          <p>Latitude: {property.location?.lat}</p>
          <p>Longitude: {property.location?.lng}</p>
        </div>
      </div>

      {/* Rooms Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Rooms</h2>
        
        {property.rooms.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-md text-center">
            <p className="text-gray-600">No rooms added yet.</p>
            <Link
              to={`/property/${id}/add-room`}
              className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Your First Room
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {property.rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {room.images[room.mainImageIndex] && (
                  <div className="h-48">
                    <img
                      src={URL.createObjectURL(room.images[room.mainImageIndex])}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{room.name}</h3>
                    <span className="text-sm text-blue-600">{room.category}</span>
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full">
                      Capacity: {room.capacity}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mt-2 text-sm line-clamp-3">{room.description}</p>
                  
                  {room.amenities.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700">Amenities:</h4>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {room.amenities.map((amenity, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove Room
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900">Delete Property</h3>
            <p className="mt-2 text-gray-600">
              Are you sure you want to delete "{property.name}"? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirmation(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProperty}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;