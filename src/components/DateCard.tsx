import { useState, useEffect } from "react";
import { WeatherData } from "../utils/definition";
import { Clock, MapPin } from "lucide-react";

interface DateCardProps {
  data: WeatherData;
  location: string;
  darkMode?: boolean;
}

const DateCard: React.FC<DateCardProps> = ({
  data,
  location,
  darkMode = false,
}) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    if (!data?.dt_txt) return;

    const updateTime = () => {
      const now = new Date();

      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };

      setCurrentTime(new Intl.DateTimeFormat("en-US", timeOptions).format(now));
      setCurrentDate(new Intl.DateTimeFormat("en-US", dateOptions).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [data?.dt_txt]);

  return (
    <div
      className={`p-5 rounded-xl w-full text-center mt-5 mb-5 shadow-lg transition-colors duration-300 ${
        darkMode ? "bg-gray-800/70 text-white" : "bg-white/90 text-gray-800"
      }`}
    >
      <div className="flex items-center justify-center mb-2">
        <MapPin
          className={`mr-2 ${darkMode ? "text-red-300" : "text-red-500"}`}
          size={20}
        />
        <h2 className="text-xl font-semibold">{location}</h2>
      </div>

      <div className="flex items-center justify-center mb-3">
        <Clock
          className={`mr-2 ${darkMode ? "text-blue-300" : "text-blue-500"}`}
          size={18}
        />
        <p className="text-lg">{currentTime}</p>
      </div>

      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        {currentDate}
      </p>

      {/* Add weather stats summary */}
      <div
        className={`mt-4 pt-3 border-t ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="opacity-70">Visibility</span>
            <p>{Math.round(data.visibility / 1000)} km</p>
          </div>
          <div>
            <span className="opacity-70">Wind Direction</span>
            <p>{data.wind.deg}°</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateCard;
