import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../../context/PropertyContext';
import PropertyCard from '../../components/PropertyListing/PropertyCard';
import LoadingSpinner from '../../components/Utilities/LoadingSpinner';

const PropertyList = () => {
  const { properties, fetchMyProperties, isLoading } = useProperties();

  useEffect(() => {
    fetchMyProperties();
  }, []);

  if(isLoading) return <LoadingSpinner />

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-quicksand text-main-color">Property Listings</h1>
        <Link
          to="/property/add-property/"
          className="bg-blue-900 font-quicksand font-semibold text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="font-quicksand font-medium text-xl text-main-color">No properties listed yet</h2>
          <p className="font-quicksand mt-2 text-gray-500">
            Click the "Add New Property" button to create your first property listing
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.property_id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(PropertyList);