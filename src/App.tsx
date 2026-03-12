import { useState, useEffect } from "react";
import CardComponent from "./components/CardComponent";
import { WeatherData } from "./utils/definition";
import { fetchWeatherData } from "./utils/data";
import HourlyCardComponent from "./components/HourlyCard";
import DailyCard from "./components/DailyCard";
import DateCard from "./components/DateCard";

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

  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (loading)
    return <div className="text-center text-white mt-10">Loading...</div>;
  if (!weather || weather.length === 0)
    return (
      <div className="text-center text-white mt-10">
        No weather data available.
      </div>
    );

  const latestWeather = weather[0];

  const hourlyForecast = weather.slice(0, 8);
  const fiveDayForecast = weather.filter((_, index) => index % 8 === 0);

  return (
    <main className="w-screen flex flex-col lg:flex-row bg-[url('/bg.jpg')] lg:items-center bg-cover h-screen overflow-auto scroll-smooth">
      <div className="w-3/4 pt-2 lg:pt-10">
        <CardComponent data={latestWeather} />
      </div>
      <div className="flex flex-col" id="hourly-forecast">
        <HourlyCardComponent data={hourlyForecast} />
        <DailyCard data={fiveDayForecast} />
        <div className="flex justify-around">
          <DateCard data={latestWeather} />
        </div>
      </div>
    </main>
  );
};

export default App;
