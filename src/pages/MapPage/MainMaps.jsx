import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useProperties } from "../../context/PropertyContext.jsx";
import RoomModal from "../../components/Modals/RoomModal.jsx";

const MainMaps = () => {
  const { properties, isLoading, error } = useProperties();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mapRef = useRef();

  const DEFAULT_CENTER = [14.5995, 120.9842];
  const DEFAULT_ZOOM = 10;

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);

    if(mapRef.current) {
      mapRef.current.flyTo(
        [parseFloat(property.latitude), parseFloat(property.longitude)],
        18,
        { duration: 0.7 },
      );
    }
  };

  const MapFlyTo = ({ property }) => {
    const map = useMap();
    React.useEffect(() => {
      if(property) {
        map.flyTo(
          [parseFloat(property.latitude), parseFloat(property.longitude)],
          18,
          { duration: 0.7 },
        );
      } else {
        map.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, { duration: 0.7 });
      }
    }, [property, map])
    return null;
  }

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
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100vh", width: "100vw" }}
        whenCreated={(mapInstance) => { mapRef.current = mapInstance }}
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
        <MapFlyTo property={selectedProperty} />
      </MapContainer>

      <RoomModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProperty(null);
        }}
        property={selectedProperty}
      />
    </>
  );
};

export default MainMaps;