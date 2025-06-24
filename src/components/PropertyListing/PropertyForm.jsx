import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../../context/PropertyContext";
import geocodeAddress from "../../utils/geocodeAddress";
import ImageUpload from "./ImageUpload";
import MapPicker from "./MapPicker";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const PropertyForm = () => {
  const { fetchRegionSuggestions, fetchCitiesByRegion, createProperty } =
    useProperties();
  const [regionSuggestions, setRegionSuggestions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [geocodeTrigger, setGeocodeTrigger] = useState(0);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    name: "",
    address: "",
    region: "",
    regionId: null,
    city: "",
    cityId: null,
    description: "",
    contact_number: "",
    logo: null,
    image: null,
    category: "hotel",
    location: { lat: 14.6043, lng: 120.9946 }, //NU-Manila Default Location
  });

  const propertyCategories = [
    "hotel",
    "apartment",
    "suite",
    "motel",
    "villa",
    "resort",
    "lodge",
    "inn",
  ];

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  // Region Autocomplete
  const handleRegionChange = async (e) => {
    const value = e.target.value;
    setProperty((prev) => ({
      ...prev,
      region: value,
      regionId: null,
      city_province: "",
      cityId: null,
    }));
    if (value.length > 1) {
      const suggestions = await fetchRegionSuggestions(value);
      setRegionSuggestions(suggestions);
      setShowRegionDropdown(true);
    } else {
      setRegionSuggestions([]);
      setShowRegionDropdown(false);
    }
  };

  const handleRegionSelect = async (region) => {
    setProperty((prev) => ({
      ...prev,
      region: region.name,
      regionId: region.id,
      city: "",
      cityId: null,
    }));
    setShowRegionDropdown(false);

    const cities = await fetchCitiesByRegion(region.id);
    setCityOptions(cities);
    setShowCityDropdown(true);
  };

  // City Dropdown
  const handleCitySelect = (city) => {
    setProperty((prev) => ({
      ...prev,
      city: city.name,
      cityId: city.id,
    }));

    setShowCityDropdown(false);
  };

  useEffect(() => {
    const geocode = debounce(async () => {
      if (property.address && property.city && property.region) {
        const coords = await geocodeAddress({
          address: property.address,
          city: property.city,
          region: property.region,
        });

        if (coords) {
          setProperty((prev) => ({
            ...prev,
            location: coords,
          }));
        }
      }
    }, 1000);

    geocode();

    return () => geocode.cancel?.();
  }, [property.address, property.city, property.region]);

  const handleLogoUpload = (file) => {
    setProperty((prev) => ({ ...prev, logo: file }));
  };

  const handleImageUpload = (file) => {
    setProperty((prev) => ({ ...prev, image: file }));
  };

  const handleLocationSelect = (location) => {
    setProperty((prev) => ({ ...prev, location }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!property.name.trim()) newErrors.name = "Property name is required";
    if (!property.region.trim()) newErrors.region = "Region is required";
    if (!property.city.trim()) newErrors.region = "City is required";
    if (!property.address.trim()) newErrors.address = "Address is required";
    if (!property.logo) newErrors.logo = "Property logo is required";
    if (!property.image) newErrors.image = "Property image is required";
    if (!property.contact_number.trim())
      newErrors.contact_number = "Contact number is required";
    if (!property.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setSubmitting(true);

    try {
      await createProperty({
        property_name: property.name,
        property_logo: property.logo,
        region: property.regionId,
        city_province: property.cityId,
        address: property.address,
        property_description: property.description,
        latitude: parseFloat(Number(property.location.lat).toFixed(5)),
        longitude: parseFloat(Number(property.location.lng).toFixed(5)),
        contact_number: property.contact_number,
        category: property.category,
        images: [property.image],
      });

      navigate("/property/");
    } catch (error) {
      setErrors({ submit: "Failed to add property. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-900 font-quicksand font-bold hover:text-blue-800 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Property Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-main-color font-quicksand">
            Add New Property
          </h2>

          <div>
            <label
              htmlFor="name"
              className="block font-medium text-main-color font-quicksand mb-1"
            >
              Property Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={property.name}
              onChange={handleInputChange}
              className={`text-main-color font-quicksand w-full px-3 py-2 border rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter property name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="region"
              className="block text-main-color font-quicksand font-medium text-gray-700 mb-1"
            >
              Region
            </label>
            <input
              type="text"
              id="region"
              name="region"
              value={property.region}
              onChange={handleRegionChange}
              className={`text-main-color font-quicksand w-full px-3 py-2 border rounded-md ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="National Capital Region (NCR)"
              required
            />

            {showRegionDropdown && regionSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-secondary-white border border-teal-500 w-full mt-1 rounded shadow max-h-48 overflow-y-auto">
                {regionSuggestions.map((region) => (
                  <li
                    key={region.id}
                    className="px-4 py-2 hover:bg-teal-100 cursor-pointer font-quicksand font-medium"
                    onClick={() => handleRegionSelect(region)}
                  >
                    {region.name}
                  </li>
                ))}
              </ul>
            )}

            {errors.region && (
              <p className="mt-1 text-sm text-red-500">{errors.region}</p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="city"
              className="block text-main-color font-quicksand font-medium text-gray-700 mb-1"
            >
              City/Province
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={property.city}
              onFocus={() => setShowCityDropdown(true)}
              className={`text-main-color font-quicksand w-full px-3 py-2 border rounded-md ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter City Location"
            />

            {showCityDropdown && cityOptions.length > 0 && (
              <ul className="absolute z-10 bg-secondary-white border border-teal-500 w-full mt-1 rounded shadow max-h-48 overflow-y-auto">
                {cityOptions.map((city) => (
                  <li
                    key={city.id}
                    className="px-4 py-2 hover:bg-teal-100 cursor-pointer font-quicksand font-medium"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}

            {errors.region && (
              <p className="mt-1 text-sm text-red-500">{errors.region}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-main-color font-quicksand font-medium text-gray-700 mb-1"
            >
              Property Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={property.address}
              onBlur={async () => {
                if (property.address && property.city && property.region) {
                  const coords = await geocodeAddress({
                    address: property.address,
                    city: property.city,
                    region: property.region,
                  });
                  if (coords) {
                    setProperty((prev) => ({ ...prev, location: coords }));
                  }
                }
              }}
              onChange={handleInputChange}
              className={`text-main-color font-quicksand w-full px-3 py-2 border rounded-md ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter property address"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="block text-main-color font-quicksand font-semibold text-gray-700 mb-1">
              Property Location
            </label>
            <p className="text-sm text-main-color font-quicksand text-gray-500 mb-2">
              Pin the location of your property on the map below
            </p>

            <p className="text-xs font-bold italic text-main-color font-quicksand text-gray-500 mb-2">
              Please patiently wait for the map location to load your location*
            </p>
            <div className="h-96 border border-gray-300 rounded-md overflow-hidden">
              <MapPicker
                selectedLocation={property.location}
                onLocationSelect={handleLocationSelect}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact_number"
              className="block text-main-color font-quicksand font-medium text-gray-700 mb-1"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contact_number"
              name="contact_number"
              value={property.contact_number}
              onChange={handleInputChange}
              className={`text-main-color font-quicksand w-full px-3 py-2 border rounded-md ${
                errors.contact_number ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter contact number"
            />
            {errors.contact_number && (
              <p className="mt-1 text-sm text-red-500">
                {errors.contact_number}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Description
            </label>
            <textarea
              id="description"
              name="description"
              value={property.description}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter property description"
              rows="4"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-main-color font-quicksand font-semibold text-gray-700 mb-1"
            >
              Property Category
            </label>
            <select
              id="category"
              name="category"
              value={property.category}
              onChange={handleInputChange}
              className="text-main-color font-quicksand w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {propertyCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-main-color font-quicksand font-semibold text-gray-700 mb-1">
              Property Logo
            </label>
            <ImageUpload
              onImageUpload={handleLogoUpload}
              error={errors.logo}
              label="Upload Logo"
            />
          </div>

          <div>
            <label className="block text-main-color font-quicksand font-semibold text-gray-700 mb-1">
              Property Image
            </label>
            <ImageUpload
              onImageUpload={handleImageUpload}
              error={errors.image}
              label="Upload Property Image"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 font-quicksand bg-blue-900 text-main-white font-medium rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;