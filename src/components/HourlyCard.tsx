import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  Clock,
} from "lucide-react";
import { WeatherData } from "../utils/definition";

interface HourlyCardComponentProps {
  data: WeatherData[];
  darkMode?: boolean;
}

const HourlyCardComponent: React.FC<HourlyCardComponentProps> = ({
  data,
  darkMode = false,
}) => {
  const currentTime = new Date();

  // Filter only future hourly data
  const upcomingHours = data.filter(
    (hourData) => new Date(hourData.dt_txt) > currentTime
  );

  // Function to Get the Correct Weather Icon
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Clear":
        return (
          <Sun
            className={`${
              darkMode ? "text-yellow-300" : "text-yellow-500"
            } w-8 h-8`}
          />
        );
      case "Clouds":
        return (
          <Cloud
            className={`${
              darkMode ? "text-gray-300" : "text-gray-500"
            } w-8 h-8`}
          />
        );
      case "Rain":
        return (
          <CloudRain
            className={`${
              darkMode ? "text-blue-300" : "text-blue-500"
            } w-8 h-8`}
          />
        );
      case "Thunderstorm":
        return (
          <CloudLightning
            className={`${
              darkMode ? "text-purple-300" : "text-purple-500"
            } w-8 h-8`}
          />
        );
      case "Snow":
        return (
          <Snowflake
            className={`${
              darkMode ? "text-blue-200" : "text-blue-400"
            } w-8 h-8`}
          />
        );
      default:
        return (
          <Cloud
            className={`${
              darkMode ? "text-gray-300" : "text-gray-500"
            } w-8 h-8`}
          />
        );
    }
  };

  return (
    <div
      className={`flex flex-col  pb-6 w-full mt-5 rounded-2xl p-5 ${
        darkMode ? "bg-gray-800/70 text-white" : "bg-white/90 text-gray-800"
      } shadow-lg transition-colors duration-300`}
    >
      <div
        className={`flex items-center gap-2 border-b-2 mb-4 pb-2 ${
          darkMode ? "border-gray-600" : "border-gray-200"
        }`}
      >
        <Clock className={darkMode ? "text-blue-300" : "text-blue-500"} />
        <h2 className="text-xl font-medium">Hourly Forecast</h2>
      </div>

      {/* Mobile View: Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory lg:hidden">
        {upcomingHours.slice(0, 8).map((hourData, index) => {
          const hour = new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date(hourData.dt_txt));

          return (
            <div
              key={index}
              className={`${
                darkMode ? "bg-gray-700/60" : "bg-gray-100/60"
              } rounded-xl w-28 h-32 shadow-sm flex flex-col items-center justify-center p-2 snap-center shrink-0`}
            >
              <h3 className="text-sm font-semibold opacity-80">{hour}</h3>
              <div className="mt-1">
                {getWeatherIcon(hourData.weather[0].main)}
              </div>
              <p className="text-lg font-bold mt-1">
                {Math.round(hourData.main.temp)}°
              </p>
              <p className="text-xs capitalize opacity-80 text-center">
                {hourData.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Large Screen View: Grid Layout */}
      <div className="hidden lg:grid lg:grid-cols-5 gap-2">
        {upcomingHours.slice(0, 8).map((hourData, index) => {
          const hour = new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date(hourData.dt_txt));

          return (
            <div
              key={index}
              className={`${
                darkMode ? "bg-gray-700/60" : "bg-gray-100/60"
              } rounded-xl shadow-sm flex flex-col items-center justify-center p-3 transition-all duration-200 hover:shadow-md`}
            >
              <h3 className="text-sm font-semibold opacity-80">{hour}</h3>
              <div className="mt-2">
                {getWeatherIcon(hourData.weather[0].main)}
              </div>
              <p className="text-lg font-bold mt-2">
                {Math.round(hourData.main.temp)}°
              </p>
              <p className="text-xs capitalize opacity-80 text-center">
                {hourData.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyCardComponent;
