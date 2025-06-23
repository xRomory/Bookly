import React, { useState, useRef } from "react";
import { useProperties } from "../../context/PropertyContext";

// Helper to get today's date in YYYY-MM-DD format
const getToday = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const BookingForm = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const { fetchCitySuggestions } = useProperties();
  const dropdownRef = useRef();
  const today = getToday();

  const handleLocationChange = async (e) => {
    const value = e.target.value;
    setLocation(value);

    if(value.length > 1) {
      const suggestions = await fetchCitySuggestions(value);
      setCitySuggestions(suggestions);
      setShowDropdown(true);
    } else {
      setCitySuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (city) => {
    setLocation(city.name);
    setShowDropdown(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-4xl md:max-w-5xl bg-secondary-white md:p-8 p-6 mx-4 shadow-lg rounded-lg absolute top-10 md:top-20">
      <h3 className="font-quicksand font-bold text-2xl mb-4">
        Want to book a reservation?
      </h3>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative" ref={dropdownRef}>
            <label
              htmlFor="location"
              className="block font-medium font-quicksand text-gray-700 mb-1"
            >
              Location
            </label>

            <input
              type="text"
              id="location"
              placeholder="Where are you going?"
              className="w-full p-2 border-2 font-quicksand border-blue-950 rounded-md focus:ring-blue-500 focus:border-blue-900"
              value={location}
              onChange={handleLocationChange}
              autoComplete="off"
              required
            />
            {showDropdown && citySuggestions.length > 0 && (
              <ul className="absolute z-10 bg-secondary-white border border-teal-500 w-full mt-1 rounded shadow max-h-48 overflow-y-auto">
                {citySuggestions.map((city) => (
                  <li
                    key={city.id}
                    className="px-4 py-2 hover:bg-teal-100 cursor-pointer font-quicksand font-medium"
                    onClick={() => handleSuggestionClick(city)}
                  >
                    {city.name}
                    {city.region_name ? `, ${city.region_name}` : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label
              htmlFor="check-in"
              className="block font-medium font-quicksand text-gray-700 mb-1"
            >
              Check-in
            </label>

            <div className="relative">
              <input
                type="date"
                id="check-in"
                min={today}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value)
                  if(checkOut && e.target.value > checkOut) setCheckOut("");
                }}
                required
                className="w-full p-2 border-2 font-quicksand border-blue-950 rounded-md focus:ring-blue-500 focus:border-blue-900 pr-10"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-blue-900"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="check-out"
              className="block font-medium font-quicksand text-gray-700 mb-1"
            >
              Check-out
            </label>

            <div className="relative">
              <input
                type="date"
                id="check-out"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                className="w-full p-2 border-2 font-quicksand border-blue-950 rounded-md focus:ring-blue-500 focus:border-blue-900 pr-10"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-blue-900"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-800 text-lg text-main-white px-6 py-2 rounded-lg font-semibold font-quicksand items-center"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
