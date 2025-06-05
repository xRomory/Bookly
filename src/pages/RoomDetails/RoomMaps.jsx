import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useProperties } from "../../context/PropertyContext";
const RoomMaps = ({ latitude, longitude, propertyName, address }) => {
  if (!latitude || !longitude) {
    return (
      <div className="flex justify-center items-center h-full bg-gray-100 rounded-lg">
        <p className="text-gray-500">Location data not available</p>
      </div>
    );
  }

  const position = [parseFloat(latitude), parseFloat(longitude)];

  return (
    <>
      <MapContainer
        center={position}
        zoom={20}
        style={{ 
          height: "60vh",
          width: "82vw", 
          borderRadius: "15px", 
          position: "relative", 
          marginBottom: "2rem",
          zIndex: 0,
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <Marker 
          position={position}
        />
        
      </MapContainer>
    </>
  );
};

export default RoomMaps;