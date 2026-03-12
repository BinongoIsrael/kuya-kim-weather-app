import { WiCloudy, WiDaySunny, WiRain, WiThunderstorm } from "react-icons/wi";
import { WeatherData } from "../utils/definition";

const DailyForecastComponent: React.FC<{ data: WeatherData[] }> = ({
  data,
}) => {
  const dailyForecast = data.reduce((acc: WeatherData[], dayData) => {
    const date = new Date(dayData.dt_txt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      weekday: "long",
    });

    // Avoid duplicate days in the forecast
    if (
      !acc.find(
        (item) =>
          new Date(item.dt_txt).toDateString() ===
          new Date(dayData.dt_txt).toDateString()
      )
    ) {
      acc.push({ ...dayData, formattedDate: date });
    }

    return acc;
  }, []);

  return (
    <div className="bg-gray-900 bg-opacity-80 text-white p-6 shadow-lg w-full ">
      <div className="flex flex-col h-[340px] w-[330px] bg-[#1e2939] p-2 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          5-Day Forecast
        </h2>
        {dailyForecast.slice(0, 5).map((day, index) => (
          <div
            key={index}
            className="flex justify-between text-center items-center gap-2"
          >
            <div>
              {day.weather[0].main === "Clear" && (
                <WiDaySunny className="text-4xl text-yellow-400 mt-2" />
              )}
              {day.weather[0].main === "Clouds" && (
                <WiCloudy className="text-4xl text-gray-400 mt-2" />
              )}
              {day.weather[0].main === "Rain" && (
                <WiRain className="text-4xl text-blue-400 mt-2" />
              )}
              {day.weather[0].main === "Thunderstorm" && (
                <WiThunderstorm className="text-4xl text-purple-500 mt-2" />
              )}
            </div>
            <div>
              <p className="text-[18px]">{Math.round(day.main.temp)}°C</p>
            </div>
            <div>
              <p className="text-sm font-semibold p-2">{day.formattedDate}</p>
            </div>
            <div className="items-center flex justify-center text-center">
              <p className="text-sm capitalize opacity-80 p-2">
                {day.weather[0].description.replace(/rain/gi, "").trim()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecastComponent;
