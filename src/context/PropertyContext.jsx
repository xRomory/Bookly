import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import api from "../api/axios";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await api.get("/property/property-list/");
      setProperties(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError(error.response?.data?.message || "Failed to load maps");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPropertyDetail = useCallback(async (propertyId) => {
    setIsLoading(true);
    try {
      const response = await api.get(`property/property-detail/${propertyId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError(
        error.response?.data?.message || "Failed to load property detail"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createProperty = useCallback(
    async ({
      property_name,
      property_logo,
      address,
      property_description,
      latitude,
      longitude,
      contact_number,
      category,
      images,
    }) => {
      try {
        const formData = new FormData();
        formData.append("property_name", property_name);
        formData.append("property_logo", property_logo);
        formData.append("address", address);
        formData.append("property_description", property_description);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("contact_number", contact_number);
        formData.append("category", category);

        if (images && images.length > 0)
          images.forEach((img) => formData.append("images", img));

        const response = await api.post(
          "/property/property-create/",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        await fetchProperties();
        return response.data;
      } catch (error) {
        setError(error.response?.data?.message || "Failed to create property");
        throw error;
      }
    },
    [fetchProperties]
  );

  const fetchMyProperties = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/property/my-properties/");
      setProperties(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load properties");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteProperty = useCallback(async (propertyId) => {
    setIsLoading(true);
    try {
      await api.delete(`/property/property-delete/${propertyId}/`);
      setProperties((prev) => prev.filter((p) => p.property_id !== propertyId));
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete property");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchCitySuggestions = useCallback(async (query) => {
    if(!query) return [];
    try {
      const response = await api.get(`/property/cities/autocomplete/?q=${encodeURIComponent(query)}`);
      return response.data
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      return []
    }
  }, []);

  const value = useMemo(
    () => ({
      properties,
      isLoading,
      error,
      fetchProperties,
      fetchPropertyDetail,
      fetchMyProperties,
      fetchCitySuggestions,
      createProperty,
      deleteProperty,
    }),
  );

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }

  return context;
};