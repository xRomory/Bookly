import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const mainImage = property.images && property.images.length > 0 ? property.images?.[0].image : property.property_logo_url;
  const rooms = property.rooms || []

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {property.images && (
        <div className="relative h-48">
          <img 
            src={mainImage}
            alt={property.property_name}
            className="w-full h-full object-cover"
          />
          {property.property_logo_url && (
            <div className="absolute bottom-0 left-0 m-4 w-12 h-12 bg-white rounded-full p-1 shadow-md">
              <img 
                src={property.property_logo_url} 
                alt={`${property.property_name} logo`}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          )}
        </div>
      )}
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{property.property_name}</h3>
        <p className="text-sm text-gray-600 mt-1">{property.address}</p>
        <p className="text-sm text-blue-600 mt-1 font-medium">{property.category}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {rooms.length} {rooms.length === 1 ? 'Room' : 'Rooms'}
          </span>
          <Link 
            to={`/property/${property.property_id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;