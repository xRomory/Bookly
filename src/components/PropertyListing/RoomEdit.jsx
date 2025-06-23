import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRooms } from "../../context/RoomContext";
import LoadingSpinner from "../Utilities/LoadingSpinner";
import ImageUpload from "./ImageUpload";

const RoomEdit = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { updateRoom, isLoading, getRoomById } = useRooms();
  const { propertyId } = useParams();
  const numericPropertyId = parseInt(propertyId, 10);

  const [room, setRoom] = useState({
    property: numericPropertyId,
    room_name: "",
    capacity: 1,
    room_description: "",
    room_type: "hotel",
    amenities: ["", "", "", ""],
    images: Array(5).fill(null),
    existingImages: [], // <-- add this
    mainImageIndex: 0,
    price_per_night: "",
    room_status: "available",
  });

  const roomCategories = [
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
  const [activeAmenities, setActiveAmenities] = useState(1);

  useEffect(() => {
    if (roomId) {
      const fetchRoomData = async () => {
        try {
          const roomData = await getRoomById(roomId);
          setRoom({
            property: roomData.property,
            room_name: roomData.room_name,
            capacity: roomData.capacity,
            room_description: roomData.room_description,
            room_type: roomData.room_type,
            amenities: [
              ...roomData.amenities,
              ...Array(4 - roomData.amenities.length).fill(""),
            ],
            images: Array(5).fill(null),
            existingImages: roomData.images || [],
            mainImageIndex: 0,
            price_per_night: roomData.price_per_night,
            room_status: roomData.room_status,
          });
          setActiveAmenities(roomData.amenities.length);

          // Set main image index if possible
          if (roomData.main_image) {
            const mainIdx = (roomData.images || []).findIndex(
              (img) => img.image === roomData.main_image
            );
            if (mainIdx !== -1) {
              setRoom((prev) => ({ ...prev, mainImageIndex: mainIdx }));
            }
          }
        } catch (err) {
          // handle error
        }
      };
      fetchRoomData();
    }
  }, [roomId, getRoomById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleCapacityChange = (e) => {
    const value = parseInt(e.target.value);
    setRoom((prev) => ({ ...prev, capacity: value }));
  };

  const handleAmenityChange = (index, value) => {
    const updatedAmenities = [...room.amenities];
    updatedAmenities[index] = value;
    setRoom((prev) => ({ ...prev, amenities: updatedAmenities }));
  };

  const addAmenity = () => {
    if (activeAmenities < 4) {
      setActiveAmenities((prev) => prev + 1);
    }
  };

  const removeAmenity = (index) => {
    const updatedAmenities = [...room.amenities];
    updatedAmenities[index] = "";

    for (let i = index; i < 3; i++) {
      updatedAmenities[i] = updatedAmenities[i + 1];
    }
    updatedAmenities[3] = "";

    setRoom((prev) => ({ ...prev, amenities: updatedAmenities }));
    setActiveAmenities((prev) => prev - 1);
  };

  const handleImageUpload = (file, index) => {
    const newImages = [...room.images];
    newImages[index] = file;
    setRoom((prev) => ({ ...prev, images: newImages }));
  };

  const setMainImage = (index) => {
    setRoom((prev) => ({ ...prev, mainImageIndex: index }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!room.room_name.trim()) newErrors.room_name = "Room name is required";
    if (!room.room_description.trim())
      newErrors.room_description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const filteredAmenities = room.amenities.filter((a) => a.trim() !== "");

    // Combine existing and new images for main image selection
    const allImages = [
      ...(room.existingImages || []),
      ...room.images.filter((img) => img !== null),
    ];
    const mainImage = allImages[room.mainImageIndex];

    // Only send new images (files)
    const newImages = allImages
      .filter((img, idx) => idx !== room.mainImageIndex)
      .filter((img) => img && typeof img !== "string" && !img.id);

    const payload = {
      property: propertyId,
      room_name: room.room_name,
      room_type: room.room_type,
      room_description: room.room_description,
      price_per_night: room.price_per_night,
      amenities: filteredAmenities,
      room_status: room.room_status,
      capacity: room.capacity,
      room_image:
        mainImage && !mainImage.id && typeof mainImage !== "string"
          ? mainImage
          : undefined,
      images: newImages,
    };

    try {
      await updateRoom(roomId, payload);
      navigate(`/property/${propertyId}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-3 py-8">
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
          <h2 className="font-quicksand text-2xl font-bold text-gray-800">
            Edit Room Information
          </h2>

          <div>
            <label
              htmlFor="name"
              className="block font-quicksand font-semibold text-gray-700 mb-1"
            >
              Room Name
            </label>
            <input
              type="text"
              id="name"
              name="room_name"
              value={room.room_name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.room_name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter room name"
            />
            {errors.room_name && (
              <p className="mt-1 font-quicksand font-semibold text-sm text-red-500">
                {errors.room_name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="capacity"
              className="block font-quicksand font-semibold text-gray-700 mb-1"
            >
              Room Capacity
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              min="1"
              value={room.capacity}
              onChange={handleCapacityChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block font-quicksand font-semibold text-gray-700 mb-1"
            >
              Room Category
            </label>
            <select
              id="category"
              name="room_type"
              value={room.room_type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {roomCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block font-quicksand font-semibold text-gray-700 mb-1"
            >
              Room Description
            </label>
            <textarea
              id="description"
              name="room_description"
              rows="4"
              value={room.room_description}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 font-quicksand font-medium border rounded-md ${
                errors.room_description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter room description"
            ></textarea>
            {errors.room_description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.room_description}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="price_per_night"
              className="block font-quicksand font-semibold text-gray-700 mb-1"
            >
              Price Per Night
            </label>
            <input
              type="number"
              id="price_per_night"
              name="price_per_night"
              min="0"
              value={room.price_per_night}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 font-quicksand border rounded-md ${
                errors.price_per_night ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter price per night"
            />
            {errors.price_per_night && (
              <p className="mt-1 text-sm text-red-500">
                {errors.price_per_night}
              </p>
            )}
          </div>

          <div>
            <label className="block font-quicksand font-semibold text-gray-700 mb-1">
              Room Amenities (Up to 4)
            </label>
            <div className="space-y-3">
              {[0, 1, 2, 3].map(
                (index) =>
                  index < activeAmenities && (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={room.amenities[index]}
                        onChange={(e) =>
                          handleAmenityChange(index, e.target.value)
                        }
                        placeholder={`Amenity ${index + 1}`}
                        className="flex-1 font-quicksand px-3 py-2 border border-gray-300 rounded-md"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeAmenity(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  )
              )}

              {activeAmenities < 4 && (
                <button
                  type="button"
                  onClick={addAmenity}
                  className="flex items-center font-quicksand font-medium text-blue-600 hover:text-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Amenity
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block font-quicksand font-semibold text-gray-700 mb-1">
              Room Images (Up to 5)
            </label>
            <p className="text-sm font-quicksand font-medium text-gray-500 mb-2">
              You can upload up to 5 images. Click on an image to set it as the
              main image.
            </p>

            {room.existingImages && room.existingImages.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                {room.existingImages.map((img, idx) => (
                  <div
                    key={img.id}
                    className={`relative border-2 rounded-md ${
                      room.mainImageIndex === idx
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={img.image}
                      alt={`Room Image ${idx + 1}`}
                      className="w-full h-32 object-cover rounded"
                      onClick={() => setMainImage(idx)}
                    />
                    <div className="mt-2 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setMainImage(idx)}
                        className={`text-sm ${
                          room.mainImageIndex === idx
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        } py-1 px-2 rounded`}
                      >
                        {room.mainImageIndex === idx
                          ? "Main Image"
                          : "Set as Main"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* New Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {room.images.map((_, index) => (
                <div
                  key={`new-${index}`}
                  className={`relative border-2 rounded-md ${
                    room.mainImageIndex === index + room.existingImages.length
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <ImageUpload
                    onImageUpload={(file) => handleImageUpload(file, index)}
                    label={`New Image ${index + 1}`}
                    showPreview={true}
                  />
                  {room.images[index] && (
                    <div className="mt-2 flex justify-center">
                      <button
                        type="button"
                        onClick={() =>
                          setMainImage(index + room.existingImages.length)
                        }
                        className={`text-sm ${
                          room.mainImageIndex ===
                          index + room.existingImages.length
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        } py-1 px-2 rounded`}
                      >
                        {room.mainImageIndex ===
                        index + room.existingImages.length
                          ? "Main Image"
                          : "Set as Main"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {errors.images && (
              <p className="mt-2 text-sm text-red-500">{errors.images}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-900 text-white font-quicksand font-semibold rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomEdit;
