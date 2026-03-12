import { useState, useEffect } from "react";
import { WeatherData } from "../utils/definition";

const DateCard: React.FC<{ data: WeatherData }> = ({ data }) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    if (!data?.dt_txt) return;

    const updateTime = () => {
      const localDate = new Date(data.dt_txt + "Z");
      const now = new Date();

      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Manila",
      };

      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        timeZone: "Asia/Manila",
      };

      const day = localDate.getDate();
      const month = localDate.toLocaleString("en-PH", {
        month: "short",
        timeZone: "Asia/Manila",
      });
      const weekday = new Intl.DateTimeFormat("en-PH", dateOptions).format(
        localDate
      );

      setCurrentTime(new Intl.DateTimeFormat("en-PH", timeOptions).format(now));
      setCurrentDate(`${weekday}, ${day} ${month}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [data?.dt_txt]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white text-center w-[400px] h-[280px] border-2 border-black shadow-2xl">
      <h2 className="text-xl font-semibold mt-10">Baybay City</h2>
      <p className="font-bold text-[60px] pt-5">{currentTime}</p>
      <p className="text-sm">{currentDate}</p>
    </div>
  );
};

export default DateCard;
