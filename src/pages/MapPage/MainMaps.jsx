import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Property from "../../data/property.js";
import RoomModal from "../../components/Modals/RoomModal.jsx";

const MainMaps = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMarkerClick = (hotelLocation) => {
    setSelectedBrand(hotelLocation);
    setIsModalOpen(true);
  };

  return (
    <>
      <MapContainer
        center={[14.5995, 120.9842]}
        zoom={8}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {Property.property_brands.map((location, index) => (
          <Marker
            key={index}
            position={[location.location.latitude, location.location.longitude]}
            eventHandlers={{
              click: () => handleMarkerClick(location),
            }}
          />
        ))}
      </MapContainer>

      <RoomModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        location={selectedBrand}
      />
    </>
  );
};

export default MainMaps;
