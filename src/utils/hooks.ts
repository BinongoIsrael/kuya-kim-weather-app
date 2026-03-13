// hooks.ts
import { useState, useEffect } from "react";
import { City } from "../utils/definition";

export const useCities = () => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/cities.json");
        if (!response.ok) throw new Error("Failed to fetch cities data");
        const data: City[] = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
      }
    };
    fetchCities();
  }, []);

  return cities;
};

export const useGeolocation = (
  setSearchInput: (value: string) => void,
  onSearch: (location: string) => void,
  setLoading: (value: boolean) => void,
  setLocationError: (value: string | null) => void
) => {
  const getLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setLocationError(null);

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            maximumAge: 0,
            enableHighAccuracy: true,
          })
      );

      const { latitude, longitude } = position.coords;
      const apiKey = "8622b47fdb20666afef001dddd18251f";
      const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

      const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      if (data?.length > 0) {
        const { name, city, locality } = data[0];
        const cityName = name || city || locality || "Unknown Location";
        setSearchInput(cityName);
        onSearch(cityName);
      } else {
        throw new Error("No location data returned from API");
      }
    } catch (error: any) {
      console.error("Location error:", error);
      const errorMessages = {
        1: "Location access denied. Please allow location permissions.",
        2: "Location unavailable. Please check your connection.",
        3: "Location request timed out. Please try again.",
      };
      setLocationError(
        error.code
          ? errorMessages[error.code as keyof typeof errorMessages]
          : `Unable to fetch location: ${error.message || "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return getLocation;
};
