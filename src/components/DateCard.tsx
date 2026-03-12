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
    <div className="bg-black/50 p-4 rounded-lg w-[90vw] text-white text-center lg:w-[20vw] lg:h-[25vh] mt-5 mb-10">
      <h2 className="text-xl font-semibold">Baybay City</h2>
      <p className="font-bold text-[60px]">{currentTime}</p>
      <p className="text-sm">{currentDate}</p>
    </div>
  );
};

export default DateCard;
