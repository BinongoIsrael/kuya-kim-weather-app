import { WiRain } from "react-icons/wi";
import { WeatherData } from "../utils/definition";
import { BiWind } from "react-icons/bi";
import { LuWaves } from "react-icons/lu";
import { LiaTachometerAltSolid } from "react-icons/lia";

const CardComponent: React.FC<{ data: WeatherData }> = ({ data }) => {
  return (
    <div className="border-2 bg-black/50 shadow-lg flex flex-col justify-center ml-5 items-center shrink w-[90vw] lg:h-[85vh] text-white rounded-2xl lg:w-[30vw] lg:ml-10">
      {/* Temperature & Weather Description */}
      <div className="flex flex-col items-center justify-center pt-12">
        <h1 className="text-5xl font-bold">{Math.round(data.main.temp)}°</h1>
        {/* Weather Icon & Condition */}
        <div className="mt-6 items-center text-center">
          <p className="text-xl mt-3">{data.weather[0].main}y Day</p>
        </div>

        {/* Weather Summary */}
        <p className="mt-3 text-center text-sm md:text-base leading-wider lg:w-[30vw]">
          {data.weather[0].main === "Rain"
            ? "Today, expect a rainy day with fluctuating temperatures."
            : "A bright and clear day awaits you!"}
        </p>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-7 p-4 rounded-xl mt-8">
        <div className="flex flex-col items-center  lg:w-[13vw] bg-black/40 backdrop-blur-3xl px-5 py-3 rounded-lg">
          <LuWaves size={44} />
          <p className="text-xl">{data.main.humidity}%</p>
          <p className="text-sm opacity-70">Humidity</p>
        </div>
        <div className="flex flex-col items-center  lg:w-[13vw] bg-black/40 backdrop-blur-3xl px-5 py-3 rounded-lg">
          <BiWind size={44} />
          <p className="text-xl">{data.wind.speed} m/s</p>
          <p className="text-sm opacity-70">Wind Speed</p>
        </div>
        <div className="flex flex-col items-center lg:w-[13vw] bg-black/40 backdrop-blur-3xl px-5 py-3 rounded-lg">
          <LiaTachometerAltSolid size={44} />
          <p className="text-xl">{data.main.pressure} hPa</p>
          <p className="text-sm opacity-70">Pressure</p>
        </div>
        {data.rain && (
          <div className="flex flex-col items-center lg:w-[13vw] bg-black/40 backdrop-blur-3xl px-5 py-3 rounded-lg">
            <WiRain size={44} />
            <p className="text-xl">{data.rain["3h"]} mm</p>
            <p className="text-sm opacity-70">Rain (Last 3h)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
