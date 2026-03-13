import React, { useState } from "react";
import { WeatherData, WeatherAlertsProps } from "../utils/definition";
import { AlertTriangle, Wind, Thermometer, Droplets } from "lucide-react";

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ data }) => {
  const [dismissed, setDismissed] = useState<boolean>(false);

  if (dismissed) return null;

  // Determine alert type and message
  const getAlertContent = () => {
    const weather = data.weather[0].main.toLowerCase();
    const windSpeed = data.wind.speed;
    const temp = data.main.temp;
    const rain = data?.rain?.["3h"] || 0;

    if (weather.includes("thunder")) {
      return {
        icon: <AlertTriangle className="h-6 w-6 text-yellow-300" />,
        title: "Thunderstorm Alert",
        message:
          "Thunderstorms detected in your area. Stay indoors and avoid open areas.",
        type: "warning",
      };
    }

    if (windSpeed > 10) {
      return {
        icon: <Wind className="h-6 w-6 text-blue-300" />,
        title: "Strong Winds",
        message: `Wind speeds of ${windSpeed} m/s detected. Secure loose outdoor items.`,
        type: "caution",
      };
    }

    if (rain > 10) {
      return {
        icon: <Droplets className="h-6 w-6 text-blue-400" />,
        title: "Heavy Rain",
        message: `Heavy rainfall of ${rain} mm expected in the next 3 hours. Possible flooding in low areas.`,
        type: "info",
      };
    }

    if (temp > 35) {
      return {
        icon: <Thermometer className="h-6 w-6 text-red-500" />,
        title: "Extreme Heat",
        message: `Temperature of ${Math.round(
          temp
        )}°C. Stay hydrated and avoid prolonged sun exposure.`,
        type: "danger",
      };
    }

    if (temp < 0) {
      return {
        icon: <Thermometer className="h-6 w-6 text-blue-500" />,
        title: "Freezing Conditions",
        message: `Temperature of ${Math.round(
          temp
        )}°C. Risk of ice on roads and pathways.`,
        type: "info",
      };
    }

    return null;
  };

  const alertContent = getAlertContent();
  if (!alertContent) return null;

  const getBgColor = () => {
    switch (alertContent.type) {
      case "warning":
        return "bg-amber-600/90";
      case "danger":
        return "bg-red-600/90";
      case "caution":
        return "bg-orange-500/90";
      case "info":
      default:
        return "bg-blue-600/90";
    }
  };

  return (
    <div
      className={`${getBgColor()} text-white p-4 shadow-lg mx-4 my-2 rounded-lg backdrop-blur-sm animate-slide-up`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          {alertContent.icon}
          <div className="ml-3">
            <h3 className="font-semibold">{alertContent.title}</h3>
            <p className="text-sm">{alertContent.message}</p>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-white hover:text-gray-200"
          aria-label="Dismiss alert"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default WeatherAlerts;
