import { useState, useEffect } from "react";
import CardComponent from "./components/CardComponent";
import { WeatherData } from "./utils/definition";
import { fetchWeatherData } from "./utils/data";
import HourlyCardComponent from "./components/HourlyCard";
import DateCard from "./components/DateCard";
import DailyCard from "./components/DailyCard";
import WeatherMap from "./components/WeatherMap";

const App = () => {
  const [weather, setWeather] = useState<WeatherData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeatherData();

        setWeather(data);
      } catch (err) {
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (loading) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  if (!weather || weather.length === 0) {
    return (
      <div className="text-center text-white mt-10">
        No weather data available.
      </div>
    );
  }

  const latestWeather = weather[0];
  const hourlyForecast = weather.slice(0, 8); // Display next 4 hours
  const fiveDayForecast = weather.filter((_, index) => index % 8 === 0); // Approx. every 24 hrs

  // Generate the list of years from 2005 to 2998
  const years = [];
  for (let year = 2005; year <= 2998; year++) {
    years.push(year);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-700 p-3 rounded-full cursor-pointer">
            🌙 {/* Dark mode icon placeholder */}
          </div>
          <input
            type="text"
            placeholder="Search for your preferred city..."
            className="p-2 w-80 rounded-lg bg-gray-800 text-white outline-none"
          />
        </div>
        <button className="bg-green-500 px-4 py-2 rounded-lg">
          Current Location
        </button>
      </div>

      {/* Content area */}
      <div className="flex flex-col w-[1200px] bg-red">
        <div className="flex justify-around">
          <div>
            <DateCard data={latestWeather} />
          </div>
          <div>
            <CardComponent data={latestWeather} />
          </div>
        </div>
        <div className="flex mt-5">
          <div className="flex items-start justify-center">
            <DailyCard data={fiveDayForecast} />
          </div>
          <div className="flex items-center justify-center">
            <HourlyCardComponent data={hourlyForecast} />
          </div>
        </div>
      </div>
      <WeatherMap />
    </div>
  );
};

export default App;
