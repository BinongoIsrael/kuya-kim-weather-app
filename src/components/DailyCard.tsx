import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  Calendar,
} from "lucide-react";
import { WeatherData } from "../utils/definition";

interface DailyCardProps {
  data: WeatherData[];
  darkMode?: boolean;
}

const DailyCard: React.FC<DailyCardProps> = ({ data, darkMode = false }) => {
  const forecast = data.slice(0, 7); // Display 7 days (Today + 6 more)

  // Function to Get the Correct Weather Icon
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Clear":
        return (
          <Sun
            className={`${
              darkMode ? "text-yellow-300" : "text-yellow-500"
            } w-6 h-6`}
          />
        );
      case "Clouds":
        return (
          <Cloud
            className={`${
              darkMode ? "text-gray-300" : "text-gray-500"
            } w-6 h-6`}
          />
        );
      case "Rain":
        return (
          <CloudRain
            className={`${
              darkMode ? "text-blue-300" : "text-blue-500"
            } w-6 h-6`}
          />
        );
      case "Thunderstorm":
        return (
          <CloudLightning
            className={`${
              darkMode ? "text-purple-300" : "text-purple-500"
            } w-6 h-6`}
          />
        );
      case "Snow":
        return (
          <Snowflake
            className={`${
              darkMode ? "text-blue-200" : "text-blue-400"
            } w-6 h-6`}
          />
        );
      default:
        return (
          <Cloud
            className={`${
              darkMode ? "text-gray-300" : "text-gray-500"
            } w-6 h-6`}
          />
        );
    }
  };

  // Calculate min-max temps for each day
  const getDayMinMaxTemp = (dayData: WeatherData) => {
    return {
      min: Math.round(dayData.main.temp_min),
      max: Math.round(dayData.main.temp_max),
    };
  };

  return (
    <div
      className={`p-4 rounded-xl w-full shadow-lg mt-5 ${
        darkMode ? "bg-gray-800/70 text-white" : "bg-white/90 text-gray-800"
      } transition-colors duration-300`}
    >
      {/* Title */}
      <div
        className={`flex items-center gap-2 border-b-2 mb-4 pb-2 ${
          darkMode ? "border-gray-600" : "border-gray-200"
        }`}
      >
        <Calendar className={darkMode ? "text-green-300" : "text-green-600"} />
        <h2 className="text-xl font-medium">Daily Forecast</h2>
      </div>

      {/* Forecast Grid (Desktop) */}
      <div className="hidden md:grid grid-cols-5 gap-2">
        {forecast.map((day, index) => {
          const isToday = index === 0;
          const formattedDate = new Date(day.dt_txt).toLocaleDateString(
            "en-GB",
            { weekday: "short", day: "numeric", month: "short" }
          );
          const { min } = getDayMinMaxTemp(day);

          return (
            <div
              key={index}
              className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                isToday
                  ? darkMode
                    ? "bg-blue-800/30 shadow-md"
                    : "bg-blue-100/80 shadow-md"
                  : darkMode
                  ? "bg-gray-700/40 hover:bg-gray-700/60"
                  : "bg-gray-100/60 hover:bg-gray-200/70"
              }`}
            >
              {/* Day Label */}
              <p className="text-sm font-medium">
                {isToday ? "Today" : formattedDate}
              </p>

              {/* Weather Icon */}
              <div className="my-2">{getWeatherIcon(day.weather[0].main)}</div>

              {/* Temperature */}
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {min}°
                </span>
              </div>

              {/* Description */}
              <p className="text-xs mt-1 text-center capitalize opacity-80">
                {day.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Forecast Scroll (Mobile) */}
      <div className="md:hidden overflow-x-auto pb-2 flex gap-3 snap-x snap-mandatory">
        {forecast.map((day, index) => {
          const isToday = index === 0;
          const formattedDate = new Date(day.dt_txt).toLocaleDateString(
            "en-GB",
            { weekday: "short", day: "numeric" }
          );
          const { min, max } = getDayMinMaxTemp(day);

          return (
            <div
              key={index}
              className={`flex flex-col items-center min-w-[90px] p-3 rounded-lg snap-center ${
                isToday
                  ? darkMode
                    ? "bg-blue-800/30"
                    : "bg-blue-100/80"
                  : darkMode
                  ? "bg-gray-700/40"
                  : "bg-gray-100/60"
              }`}
            >
              {/* Day Label */}
              <p className="text-sm font-medium">
                {isToday ? "Today" : formattedDate}
              </p>

              {/* Weather Icon */}
              <div className="my-2">{getWeatherIcon(day.weather[0].main)}</div>

              {/* Temperature */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{max}°</span>
                <span
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {min}°
                </span>
              </div>

              {/* Description */}
              <p className="text-xs mt-1 text-center capitalize opacity-80">
                {day.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyCard;
