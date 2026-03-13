import { WiRain } from "react-icons/wi";
import { WeatherData } from "../utils/definition";

import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
} from "react-icons/wi";
import {
  TiWeatherPartlySunny,
  TiWeatherStormy,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherCloudy,
} from "react-icons/ti";

interface CardComponentProps {
  data: WeatherData;
  darkMode?: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({
  data,
  darkMode = false,
}) => {
  const getWeatherIcon = () => {
    const condition = data.weather[0].main.toLowerCase();
    const iconSize = 80;

    if (condition.includes("clear")) {
      return (
        <TiWeatherPartlySunny size={iconSize} className="text-yellow-400" />
      );
    } else if (condition.includes("rain")) {
      return <TiWeatherShower size={iconSize} className="text-blue-400" />;
    } else if (condition.includes("cloud")) {
      return <TiWeatherCloudy size={iconSize} className="text-gray-400" />;
    } else if (condition.includes("snow")) {
      return <TiWeatherSnow size={iconSize} className="text-blue-200" />;
    } else if (condition.includes("thunder")) {
      return <TiWeatherStormy size={iconSize} className="text-purple-400" />;
    } else {
      return (
        <TiWeatherPartlySunny size={iconSize} className="text-yellow-400" />
      );
    }
  };

  const getWeatherSummary = () => {
    const condition = data.weather[0].main.toLowerCase();
    const temp = Math.round(data.main.temp);

    if (condition.includes("rain")) {
      return `Expect rain with temperatures around ${temp}°C. Don't forget your umbrella!`;
    } else if (condition.includes("cloud")) {
      return `Cloudy conditions with temperatures around ${temp}°C. A good day for outdoor activities.`;
    } else if (condition.includes("clear")) {
      return `Clear skies with temperatures around ${temp}°C. Great day to be outside!`;
    } else if (condition.includes("snow")) {
      return `Snowfall expected with temperatures around ${temp}°C. Bundle up and drive carefully.`;
    } else if (condition.includes("thunder")) {
      return `Thunderstorms in the area with temperatures around ${temp}°C. Consider staying indoors.`;
    } else {
      return `Current temperature is ${temp}°C with ${data.weather[0].description}.`;
    }
  };

  return (
    <div
      className={`shadow-lg flex flex-col justify-center items-center w-full h-full rounded-2xl overflow-hidden transition-all duration-300 ${
        darkMode ? "bg-gray-800/70 text-white" : "bg-white/90 text-gray-800"
      }`}
    >
      {/* Temperature & Weather Description */}
      <div className="flex flex-col items-center justify-center pt-8 px-4 w-full">
        <div className="mb-2">{getWeatherIcon()}</div>
        <h1 className="text-6xl font-bold tracking-tight">
          {Math.round(data.main.temp)}°
        </h1>
        <p className="text-xl mt-2 font-medium">{data.weather[0].main}</p>
        <p className="mt-1 text-sm capitalize opacity-80">
          {data.weather[0].description}
        </p>

        {/* Min/Max Temperature */}
        <div className="flex justify-center gap-4 mt-3">
          <div className="flex items-center">
            <span className="text-sm">
              Min: {Math.round(data.main.temp_min)}°
            </span>
          </div>
          <div className="h-4 border-r border-gray-300"></div>
          <div className="flex items-center">
            <span className="text-sm">
              Max: {Math.round(data.main.temp_max)}°
            </span>
          </div>
        </div>

        {/* Weather Summary */}
        <p
          className={`mt-4 text-center text-sm leading-tight px-4 py-3 rounded-lg ${
            darkMode ? "bg-gray-700/50" : "bg-gray-100/50"
          }`}
        >
          {getWeatherSummary()}
        </p>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-3 p-4 w-full mt-4">
        <div
          className={`flex items-center p-3 rounded-lg ${
            darkMode ? "bg-gray-700/50" : "bg-gray-100/70"
          }`}
        >
          <WiHumidity
            size={35}
            className={darkMode ? "text-blue-300" : "text-blue-500"}
          />
          <div className="ml-3">
            <p className="text-lg font-medium">{data.main.humidity}%</p>
            <p className="text-xs opacity-70">Humidity</p>
          </div>
        </div>

        <div
          className={`flex items-center p-3 rounded-lg ${
            darkMode ? "bg-gray-700/50" : "bg-gray-100/70"
          }`}
        >
          <WiStrongWind
            size={35}
            className={darkMode ? "text-green-300" : "text-green-500"}
          />
          <div className="ml-3">
            <p className="text-lg font-medium">{data.wind.speed} m/s</p>
            <p className="text-xs opacity-70">Wind Speed</p>
          </div>
        </div>

        <div
          className={`flex items-center p-3 rounded-lg ${
            darkMode ? "bg-gray-700/50" : "bg-gray-100/70"
          }`}
        >
          <WiBarometer
            size={35}
            className={darkMode ? "text-purple-300" : "text-purple-500"}
          />
          <div className="ml-3">
            <p className="text-lg font-medium">{data.main.pressure}</p>
            <p className="text-xs opacity-70">Pressure</p>
          </div>
        </div>

        <div
          className={`flex items-center p-3 rounded-lg ${
            darkMode ? "bg-gray-700/50" : "bg-gray-100/70"
          }`}
        >
          <WiThermometer
            size={35}
            className={darkMode ? "text-red-300" : "text-red-500"}
          />
          <div className="ml-3">
            <p className="text-lg font-medium">
              {Math.round(data.main.feels_like)}°
            </p>
            <p className="text-xs opacity-70">Feels Like</p>
          </div>
        </div>

        {data.rain && (
          <div
            className={`flex items-center p-3 rounded-lg col-span-2 ${
              darkMode ? "bg-gray-700/50" : "bg-gray-100/70"
            }`}
          >
            <WiRain
              size={35}
              className={darkMode ? "text-blue-300" : "text-blue-500"}
            />
            <div className="ml-3">
              <p className="text-lg font-medium">{data.rain["3h"]} mm</p>
              <p className="text-xs opacity-70">Rainfall (Last 3h)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
