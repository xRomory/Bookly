import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapPicker = ({ selectedLocation, onLocationSelect }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;
    
    mapInstanceRef.current = L.map(mapRef.current).setView([selectedLocation.lat, selectedLocation.lng], 18);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstanceRef.current);
    
    markerRef.current = L.marker([selectedLocation.lat, selectedLocation.lng], {
      draggable: true
    }).addTo(mapInstanceRef.current);
    
    markerRef.current.on('dragend', function(e) {
      const position = markerRef.current.getLatLng();
      onLocationSelect({ lat: position.lat, lng: position.lng });
    });
    
    mapInstanceRef.current.on('click', function(e) {
      markerRef.current.setLatLng(e.latlng);
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    });
    
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedLocation.lat, selectedLocation.lng, onLocationSelect]);
  
  useEffect(() => {
    if (markerRef.current && mapInstanceRef.current) {
      markerRef.current.setLatLng([selectedLocation.lat, selectedLocation.lng]);
      mapInstanceRef.current.setView([selectedLocation.lat, selectedLocation.lng]);
    }
  }, [selectedLocation]);

  return (
    <div ref={mapRef} className="w-full h-full"></div>
  );
};

export default MapPicker;