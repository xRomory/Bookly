import React, { createContext, useState, useEffect } from "react";

// Create the ListingContext
export const ListingContext = createContext();

// Create the PropertyProvider component
export const ListingProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [properties, setProperties] = useState(() => {
    const savedProperties = localStorage.getItem("propertyListingData");
    return savedProperties ? JSON.parse(savedProperties) : [];
  });

  // Save to localStorage whenever properties changes
  useEffect(() => {
    localStorage.setItem("propertyListingData", JSON.stringify(properties));
  }, [properties]);

  // Add a new property
  const addProperty = (property) => {
    setProperties((prev) => [...prev, property]);
  };

  // Get a property by ID
  const getProperty = (id) => {
    return properties.find((property) => property.id === id);
  };

  // Add a room to a property
  const addRoomToProperty = (propertyId, room) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === propertyId
          ? { ...property, rooms: [...property.rooms, room] }
          : property
      )
    );
  };

  // Delete a property
  const deleteProperty = (id) => {
    setProperties((prev) => prev.filter((property) => property.id !== id));
  };

  // Delete a room from a property
  const deleteRoom = (propertyId, roomId) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === propertyId
          ? {
              ...property,
              rooms: property.rooms.filter((room) => room.id !== roomId),
            }
          : property
      )
    );
  };

  // Update a property
  const updateProperty = (updatedProperty) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === updatedProperty.id ? updatedProperty : property
      )
    );
  };

  // Update a room
  const updateRoom = (propertyId, updatedRoom) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === propertyId
          ? {
              ...property,
              rooms: property.rooms.map((room) =>
                room.id === updatedRoom.id ? updatedRoom : room
              ),
            }
          : property
      )
    );
  };

  return (
    <ListingContext.Provider
      value={{
        properties,
        addProperty,
        getProperty,
        addRoomToProperty,
        deleteProperty,
        deleteRoom,
        updateProperty,
        updateRoom,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};
