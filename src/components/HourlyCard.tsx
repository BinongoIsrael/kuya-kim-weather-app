import {
  WiCloudy,
  WiDaySunny,
  WiRain,
  WiThunderstorm,
  WiSnow,
} from "react-icons/wi";
import { WeatherData } from "../utils/definition";

const HourlyCardComponent: React.FC<{ data: WeatherData[] }> = ({ data }) => {
  const currentTime = new Date(); // Get the current time

  // Filter only future hourly data
  const upcomingHours = data.filter((hourData) => {
    return new Date(hourData.dt_txt) > currentTime;
  });

  return (
    <div className="flex flex-col gap-4 w-[830px] h-[340px] items-center bg-[#1e2939] rounded-2xl shadow-3xl">
      <h2 className="text-3xl py-3">Hourly Forecast</h2>
      <div className="flex gap-5">
        {upcomingHours.map((hourData, index) => {
          // Format time in 24-hour format (HH:mm)
          const hour = new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Ensures 24-hour format
          }).format(new Date(hourData.dt_txt));

          return (
            <div
              key={index}
              className="bg-gray-900 bg-opacity-80 text-white rounded-2xl pb-6 p-2 w-28 h-52 shadow-lg flex flex-col items-center"
            >
              {/* Time (24-hour format) */}
              <h3 className="text-lg font-semibold opacity-80">{hour}</h3>

              {/* Weather Icon (Conditionally Rendered) */}
              <div>
                {hourData.weather[0].main === "Clear" && (
                  <WiDaySunny className="text-5xl text-yellow-400 mt-2" />
                )}
                {hourData.weather[0].main === "Clouds" && (
                  <WiCloudy className="text-5xl text-gray-400 mt-2" />
                )}
                {hourData.weather[0].main === "Rain" && (
                  <WiRain className="text-5xl text-blue-400 mt-2" />
                )}
                {hourData.weather[0].main === "Thunderstorm" && (
                  <WiThunderstorm className="text-5xl text-purple-500 mt-2" />
                )}
                {hourData.weather[0].main === "Snow" && (
                  <WiSnow className="text-5xl text-white mt-2" />
                )}
              </div>
              {/* Weather Icon & Temperature */}
              <p className="text-3xl font-bold mt-2">
                {Math.round(hourData.main.temp)}°C
              </p>

              {/* Weather Description */}
              <p className="text-sm capitalize opacity-80">
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
