import { useState, useEffect } from "react";
import CardComponent from "./components/CardComponent";
import HourlyCardComponent from "./components/HourlyCard";
import DailyCard from "./components/DailyCard";
import DateCard from "./components/DateCard";
import SearchBar from "./components/SearchBar";
import WeatherAlerts from "./components/WeatherAlerts";
import SkeletonLoader from "./components/SkeletonLoader";
import WeatherMap from "./components/WeatherMap";
import { WeatherData } from "./utils/definition";
import { fetchWeatherData } from "./utils/data";
import BackgroundWrapper from "./components/BackgroundWrapper";

const App = () => {
  const [weather, setWeather] = useState<WeatherData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("Calubian");
  const [searchInput, setSearchInput] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [tempUnit, setTempUnit] = useState<"C" | "F">("C");

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      const getWeather = async () => {
        if (!location) return;
        setLoading(true);
        setError(null);
        try {
          const data = await fetchWeatherData(location);
          setWeather(data);
        } catch (err) {
          if (err instanceof Error && err.message.includes("404")) {
            setError("Location not found. Please try another location.");
          } else {
            setError("Failed to fetch weather data.");
          }
          setWeather(null);
        } finally {
          setLoading(false);
        }
      };
      getWeather();
    }, 500);

    return () => clearTimeout(debounceFetch);
  }, [location]);

  const handleSearch = (newLocation: string) => {
    setLocation(newLocation);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleTempUnit = () => {
    setTempUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  const handleRefresh = () => {
    if (location) {
      handleSearch(location);
    }
  };

  const getWeatherCondition = () => {
    if (!weather || weather.length === 0) return "clear";

    const condition = weather[0].weather[0].main.toLowerCase();
    if (condition.includes("rain")) return "rain";
    if (condition.includes("cloud")) return "clouds";
    if (condition.includes("snow")) return "snow";
    if (condition.includes("thunder")) return "thunder";
    return "clear";
  };

  // Check if there are any severe weather conditions
  const hasAlerts = () => {
    if (!weather || weather.length === 0) return false;

    const currentWeather = weather[0].weather[0].main.toLowerCase();
    const strongWind = weather[0].wind.speed > 10;
    const heavyRain = weather[0]?.rain && weather[0].rain["3h"] > 10;
    const extremeTemp = weather[0].main.temp > 35 || weather[0].main.temp < 0;

    return (
      currentWeather.includes("thunder") ||
      strongWind ||
      heavyRain ||
      extremeTemp
    );
  };

  return (
    <BackgroundWrapper condition={getWeatherCondition()} darkMode={darkMode}>
      <main
        className={`w-screen flex flex-col overflow-auto scroll-smooth transition-colors duration-300 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        <div className="sticky top-0 z-50">
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            onSearch={handleSearch}
            loading={loading}
            setLoading={setLoading}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            tempUnit={tempUnit}
            toggleTempUnit={toggleTempUnit}
            onRefresh={handleRefresh}
          />
        </div>

        {hasAlerts() && weather && <WeatherAlerts data={weather[0]} />}

        <div className="flex-1 flex flex-col lg:flex-row lg:items-start p-4 gap-4">
          {error && (
            <div
              className={`p-4 rounded-lg ${
                darkMode ? "bg-red-800/70" : "bg-red-100"
              } w-full text-center`}
            >
              {error}
            </div>
          )}

          {loading ? (
            <SkeletonLoader darkMode={darkMode} />
          ) : !error && weather && weather.length > 0 ? (
            <>
              <div className="lg:w-1/3 w-full space-y-4">
                <CardComponent data={weather[0]} darkMode={darkMode} />
                <WeatherMap
                  lat={weather[0].coord?.lat || 0}
                  lon={weather[0].coord?.lon || 0}
                  darkMode={darkMode}
                  location={location}
                  temperature={Math.round(weather[0].main.temp)}
                  description={weather[0].weather[0].description}
                />
              </div>
              <div
                className="flex flex-col w-full lg:w-2/3 lg:flex-1 gap-4 h-full"
                id="hourly-forecast"
              >
                <div
                  className={`flex-1 p-6 rounded-lg ${
                    darkMode ? "bg-gray-900/80" : "bg-white/90"
                  } backdrop-blur-md shadow-lg min-h-[250px]`}
                >
                  <h2 className="text-xl font-semibold mb-4">
                    Hourly Forecast
                  </h2>
                  <HourlyCardComponent
                    data={weather.slice(0, 8)}
                    darkMode={darkMode}
                  />
                </div>
                <div
                  className={`flex-1 p-6 rounded-lg ${
                    darkMode ? "bg-gray-900/80" : "bg-white/90"
                  } backdrop-blur-md shadow-lg min-h-[250px]`}
                >
                  <h2 className="text-xl font-semibold mb-4">Daily Forecast</h2>
                  <DailyCard
                    data={weather.filter((_, index) => index % 8 === 0)}
                    darkMode={darkMode}
                  />
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-gray-900/80" : "bg-white/90"
                  } backdrop-blur-md shadow-lg flex justify-around`}
                >
                  <DateCard
                    data={weather[0]}
                    location={location}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </>
          ) : (
            <div
              className={`text-center ${
                darkMode ? "text-white" : "text-gray-800"
              } mt-10 w-full`}
            >
              No weather data available.
            </div>
          )}
        </div>
      </main>
    </BackgroundWrapper>
  );
};

export default App;
