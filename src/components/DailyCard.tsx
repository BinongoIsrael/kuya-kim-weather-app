import { Sun, Cloud, CloudRain, CloudLightning, Calendar } from "lucide-react";
import { WeatherData } from "../utils/definition";

const TenDayForecast: React.FC<{ data: WeatherData[] }> = ({ data }) => {
  const forecast = data.slice(0, 7); // Display 7 days (Today + 6 more)

  // 🔹 Function to Get the Correct Weather Icon
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Clear":
        return <Sun className="text-yellow-400 w-8 h-8" />;
      case "Clouds":
        return <Cloud className="text-gray-400 w-8 h-8" />;
      case "Rain":
        return <CloudRain className="text-blue-400 w-8 h-8" />;
      case "Thunderstorm":
        return <CloudLightning className="text-purple-500 w-8 h-8" />;
      default:
        return <Cloud className="text-gray-400 w-8 h-8" />; // Default to cloudy
    }
  };

  return (
    <div className="bg-black/50 p-4 rounded-md w-full shadow-lg text-white mt-10">
      {/* Title */}
      <div className="flex items-center gap-2 border-b-2 mb-2 pb-2">
        <Calendar className="w-6 h-6 text-white" />
        <h2 className="text-lg font-semibold opacity-80">5-DAY FORECAST</h2>
      </div>

      {/* Forecast Grid (Desktop) */}
      <div className="hidden md:grid grid-cols-5 gap-4">
        {forecast.map((day, index) => {
          const isToday = index === 0;
          const formattedDate = new Date(day.dt_txt).toLocaleDateString(
            "en-GB",
            { day: "2-digit", month: "short" }
          );

          return (
            <div
              key={index}
              className={`flex flex-col items-center p-3 rounded-lg ${
                isToday ? "bg-white/20 shadow-lg" : "bg-white/10"
              }`}
            >
              {/* Day Label */}
              <p className="text-sm opacity-70">
                {isToday ? "Today" : formattedDate}
              </p>

              {/* Temperature */}
              <p className="text-xl font-bold mt-1">
                {Math.round(day.main.temp)}°
              </p>

              {/* Weather Icon */}
              <div className="mt-1">{getWeatherIcon(day.weather[0].main)}</div>
            </div>
          );
        })}
      </div>

      {/* Forecast Scroll (Mobile) */}
      <div className="md:hidden overflow-x-auto whitespace-nowrap flex gap-4 py-2">
        {forecast.map((day, index) => {
          const isToday = index === 0;
          const formattedDate = new Date(day.dt_txt).toLocaleDateString(
            "en-GB",
            { day: "2-digit", month: "short" }
          );

          return (
            <div
              key={index}
              className={`flex flex-col items-center min-w-[90px] p-3 rounded-lg ${
                isToday ? "bg-white/20 shadow-lg" : "bg-white/10"
              }`}
            >
              {/* Day Label */}
              <p className="text-sm opacity-70">
                {isToday ? "Today" : formattedDate}
              </p>

              {/* Temperature */}
              <p className="text-xl font-bold mt-1">
                {Math.round(day.main.temp)}°
              </p>

              {/* Weather Icon */}
              <div className="mt-1">{getWeatherIcon(day.weather[0].main)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TenDayForecast;
