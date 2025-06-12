import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoomForm from '../../components/PropertyListing/RoomForm'
import { ListingContext } from '../../context/ListingContext';

const AddRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProperty } = useContext(ListingContext);
  
  // Check if property exists
  useEffect(() => {
    const property = getProperty(id);
    if (!property) {
      navigate('/');
    }
  }, [id, getProperty, navigate]);
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(`/property/${id}`)}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Property
        </button>
      </div>
      
      <RoomForm propertyId={id} />
    </div>
  );
};

export default AddRoom;