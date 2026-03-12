import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  Clock,
} from "lucide-react";
import { WeatherData } from "../utils/definition";

const HourlyCardComponent: React.FC<{ data: WeatherData[] }> = ({ data }) => {
  const currentTime = new Date();

  // Filter only future hourly data
  const upcomingHours = data.filter(
    (hourData) => new Date(hourData.dt_txt) > currentTime
  );

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
      case "Snow":
        return <Snowflake className="text-white w-8 h-8" />;
      default:
        return <Cloud className="text-gray-400 w-8 h-8" />;
    }
  };

  return (
    <div className="flex flex-col pb-6 w-full mt-10 lg:w-[60vw] lg:h-[35vh] bg-black/50 rounded-2xl p-5 ml-1 mr-0">
      <div className="flex items-center gap-2 border-b-2 mb-2 pb-2 border-white/30">
        <Clock color="white" />
        <h2 className="text-2xl text-white">Hourly Forecast</h2>
      </div>

      {/* 🔹 Mobile View: Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory lg:hidden">
        {upcomingHours.slice(0, 6).map((hourData, index) => {
          const hour = new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date(hourData.dt_txt));

          return (
            <div
              key={index}
              className="bg-white/20 text-white rounded-2xl w-28 h-32 shadow-lg flex flex-col items-center justify-center p-2 snap-center shrink-0"
            >
              <h3 className="text-sm font-semibold opacity-80">{hour}</h3>
              <div className="mt-1">
                {getWeatherIcon(hourData.weather[0].main)}
              </div>
              <p className="text-lg font-bold mt-1">
                {Math.round(hourData.main.temp)}°C
              </p>
              <p className="text-xs capitalize opacity-80 text-center">
                {hourData.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>

      {/* 🔹 Large Screen View: Grid Layout */}
      <div className="hidden lg:grid gap-5 grid-cols-6 justify-around items-center">
        {upcomingHours.slice(0, 6).map((hourData, index) => {
          const hour = new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date(hourData.dt_txt));

          return (
            <div
              key={index}
              className="bg-white/20 text-white rounded-2xl w-28 h-32 shadow-lg flex flex-col items-center justify-center p-2"
            >
              <h3 className="text-sm font-semibold opacity-80">{hour}</h3>
              <div className="mt-1">
                {getWeatherIcon(hourData.weather[0].main)}
              </div>
              <p className="text-lg font-bold mt-1">
                {Math.round(hourData.main.temp)}°C
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
