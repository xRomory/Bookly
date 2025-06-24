export default async function geocodeAddress({ address, city, region }) {
  try {
    if(!address || !city || !region) return null;
    
    const query = encodeURIComponent(
      `${address}, ${city}, ${region}, Philippines`
    );
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Bookly (claneralarn@gmail.com)",
        "Accept-Language": "en",
      },
    });

    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}