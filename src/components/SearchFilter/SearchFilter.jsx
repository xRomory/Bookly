import React, { useState, useEffect } from "react";
import "./SearchFilter.scss";
import SearchMaps from "./SearchMaps.jsx";

import { useRooms } from "../../context/RoomContext.jsx";
import { Link } from "react-router-dom";
import { Range } from "react-range";

const MIN = 0;
const MAX = 21000;
const STEP = 100;

const SearchFilter = ({ onFilterChange }) => {
  const { rooms = [] } = useRooms();
  const [searchTerm, setSearchTerm] = useState("");
  const [values, setValues] = useState([0, 21000]);
  const [propertyTypes, setPropertyTypes] = useState({
    hotel: false,
    apartment: false,
    motel: false,
    villa: false,
    lodge: false,
    inn: false,
    resort: false,
    suite: false,
  });

  useEffect(() => {
    
    if(!Array.isArray(rooms)) {
    console.log("Rooms is not an array:", rooms);
    onFilterChange([]);
    return;
  }

    const filteredRooms = rooms.filter((room) => {
      const matchesSearch = 
        searchTerm === "" || 
        room.room_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.property_details?.property_name.toLowerCase().includes(searchTerm.toLowerCase());

        
      const anyTypeSelected = Object.values(propertyTypes).some(Boolean);
      const matchesPropertyType = !anyTypeSelected || propertyTypes[room.room_type];

      const matchesPriceRange = 
        room.price_per_night >= values[0] && 
        room.price_per_night <= values[1];

      return matchesSearch && matchesPropertyType && matchesPriceRange;
    });

    onFilterChange(filteredRooms);
  }, [searchTerm, propertyTypes, values, rooms, onFilterChange]);

  const handlePropertyTypeChange = (type) => {
    setPropertyTypes({
      ...propertyTypes,
      [type]: !propertyTypes[type],
    });
  };

  return (
    <div className="search-filter-container w-[35vw] h-full flex p-[5.5rem_0_0_7rem]">
      <div className="search-container m-12 w-[24vw] h-[42vw] rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.4)] p-[1rem_3rem_3rem] overflow-auto">
        <div className="maps-div mb-16 relative">
          <SearchMaps />
          <div className="maps-footer absolute w-full h-[5vh] text-center">
            <Link to="/maps">View Maps</Link>
          </div>
        </div>
        <div className="search-property-header flex flex-col mb-8">
          <h2 className="property-brand-text mb-4 font-bold text-2xl">
            Search by Property Brand
          </h2>
          <label>
            <input
              type="text"
              placeholder="Hotel Sagot"
              className="input-text w-full p-[1rem] rounded-[15px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>

        <div className="filter-property-type flex flex-col">
          <h2 className="property-brand-text mb-4 font-bold text-2xl">
            Property Type
          </h2>
          <div className="check-property-div flex flex-col gap-4">
            {Object.keys(propertyTypes).map((type) => (
              <div key={type} className="hotels-checkbox-div">
                <input 
                  type="checkbox" 
                  id={type}
                  checked={propertyTypes[type]}
                  onChange={() => handlePropertyTypeChange(type)}
                  />
                  <label htmlFor={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
              </div>
            ))}
          </div>
        </div>

        <div className="price-range-div mt-4">
          <h2 className="property-brand-text mb-4 font-bold text-2xl">
            Price Per Night
          </h2>

          <div className="price-range-input flex justify-between mb-8">
            <input
              type="number"
              placeholder="P 0"
              value={values[0]}
              min={MIN}
              max={values[1]}
              onChange={(e) => {
                const newMin = parseInt(e.target.value) || 0;
                if (newMin <= values[1]) setValues([newMin, values[1]]);
              }}
              className="input-text w-[45%] p-[1rem] rounded-[15px]"
            />
            <input
              type="number"
              placeholder="P 20,000 +"
              value={values[1]}
              min={values[0]}
              max={MAX}
              onChange={(e) => {
                const newMax = parseInt(e.target.value) || 0;
                if (newMax >= values[0]) setValues([values[0], newMax]);
              }}
              className="input-text w-[45%] p-[1rem] rounded-[15px]"
            />
          </div>

          <div className="price-range-slide">
            <Range
              step={STEP}
              min={MIN}
              max={MAX}
              values={values}
              onChange={(vals) => setValues(vals)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "100%",
                    backgroundColor: "var(--SecondaryColorTeal)",
                    borderRadius: "3px",
                  }}
                  className="range-track"
                >
                  {children}
                </div>
              )}
              
              renderThumb={({ props, isDragged }) => {
                const { key, ...otherProps } = props;
                return (
                  <div
                    key={key}
                    {...otherProps}
                    style={{
                      ...otherProps.style,
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                      backgroundColor: isDragged 
                        ? "var(--PrimaryColor)" 
                        : "var(--SecondaryColorTeal)",
                      border: "2px solid var(--SecondaryColorTeal)",
                      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
                      outline: "none",
                    }}
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;