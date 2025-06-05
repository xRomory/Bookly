import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useProperties } from "../../context/PropertyContext.jsx";
import RoomModal from "../../components/Modals/RoomModal.jsx";

const MainMaps = () => {
  
  const { properties, isLoading, error } = useProperties();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <>
      <MapContainer
        center={[14.29, 121.15]}
        zoom={10}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {properties.map((property) => {
          return (
            <Marker
              key={property.property_id}
              position={[parseFloat(property.latitude), parseFloat(property.longitude)]}
              eventHandlers={{
                click: () => handleMarkerClick(property),
              }}
            />
          )
        })}
      </MapContainer>

      <RoomModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={selectedProperty}
      />
    </>
  );
};

export default MainMaps;