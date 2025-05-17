import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const SearchMaps = () => {
  return (
    <>
      <MapContainer
        center={[14.29, 121.15]}
        zoom={10}
        style={{ height: "13vh", width: "19vw", borderRadius: "15px", position: "relative"}}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
      </MapContainer>
    </>
  );
};

export default SearchMaps;