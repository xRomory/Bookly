  import React, { useState, useContext } from "react";
  import { useNavigate } from "react-router-dom";
  import ImageUpload from "./ImageUpload";
  import MapPicker from "./MapPicker";
  import { useProperties } from "../../context/PropertyContext";

  const PropertyForm = () => {
    const navigate = useNavigate();
    const { createProperty } = useProperties();

    const [property, setProperty] = useState({
      name: "",
      address: "",
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
              <p className="mt-1 text-sm text-red-500">{errors.contact_number}</p>
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

          <div>
            <label className="block text-main-color font-quicksand font-semibold text-gray-700 mb-1">
              Property Location
            </label>
            <p className="text-sm text-main-color font-quicksand text-gray-500 mb-2">
              Pin the location of your property on the map below
            </p>
            <div className="h-96 border border-gray-300 rounded-md overflow-hidden">
              <MapPicker
                selectedLocation={property.location}
                onLocationSelect={handleLocationSelect}
              />
            </div>
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
    );
  };

  export default PropertyForm;
