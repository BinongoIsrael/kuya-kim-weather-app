import { WeatherData } from "../utils/definition";

export const fetchWeatherData = async (): Promise<WeatherData[] | null> => {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast?lat=10.8624&lon=124.9950&appid=8622b47fdb20666afef001dddd18251f&units=metric"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.list || !Array.isArray(result.list)) {
      throw new Error("Invalid API response format");
    }

    console.log("Fetched Weather Data:", result.list); // Debugging
    return result.list; // Return the list array
  } catch (err) {
    console.error("Error fetching weather data:", err);
    return null;
  }
};

export const fetchWeatherMap = async () => {
  const response = await fetch(
    "https://tile.openweathermap.org/map/precipitation_new/5/10/10.png?appid=8622b47fdb20666afef001dddd18251f"
  );

  if (!response.ok) {
    return;
  }

  const result = response.json();
  console.log(result);
};
