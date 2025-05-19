import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const RoomMaps = () => {
  return (
    <>
      <MapContainer
        center={[14.5995, 120.9842]}
        zoom={20}
        style={{ height: "60vh", width: "82vw", borderRadius: "15px", position: "relative", marginBottom: "2rem"}}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
      </MapContainer>
    </>
  );
};

export default RoomMaps;