import { WeatherData } from "../utils/definition";

export const fetchWeatherData = async (
  location: string
): Promise<WeatherData[] | null> => {
  try {
    // First get coordinates for the location
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        location
      )}&limit=1&appid=8622b47fdb20666afef001dddd18251f`
    );

    if (!geoResponse.ok) {
      throw new Error(`HTTP error! Status: ${geoResponse.status}`);
    }

    const geoData = await geoResponse.json();
    if (!geoData || geoData.length === 0) {
      throw new Error("Location not found");
    }

    const { lat, lon } = geoData[0];

    // Then get weather data with coordinates
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8622b47fdb20666afef001dddd18251f&units=metric`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.list || !Array.isArray(result.list)) {
      throw new Error("Invalid API response format");
    }

    // Add coordinates to each weather data item
    const weatherDataWithCoords = result.list.map((item: WeatherData) => ({
      ...item,
      coord: { lat, lon },
    }));

    console.log("Fetched Weather Data:", weatherDataWithCoords);
    return weatherDataWithCoords;
  } catch (err) {
    console.error("Error fetching weather data:", err);
    throw err;
  }
};
