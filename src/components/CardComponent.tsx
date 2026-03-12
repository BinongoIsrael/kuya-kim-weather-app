import { WiRain } from "react-icons/wi";
import { BsEye } from "react-icons/bs";
import { WeatherData } from "../utils/definition";
import { FaCloudSunRain } from "react-icons/fa6";
import { MdWaterDrop } from "react-icons/md";
import { IoSunnyOutline } from "react-icons/io5";
import { BiWind } from "react-icons/bi";
import { LuWaves } from "react-icons/lu";
import { LiaTachometerAltSolid } from "react-icons/lia";

const CardComponent: React.FC<{ data: WeatherData }> = ({ data }) => {
  return (
    <div className="bg-[#1e2939] bg-opacity-80 text-white rounded-2xl p-6  shadow-lg h-[280px]">
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-gray-800 p-3 rounded-xl w-[220px]">
          <div className="w-[150px]">
            <h1 className="text-5xl font-bold">
              {Math.round(data.main.temp)}°C
            </h1>
            <p className="text-lg capitalize opacity-80">
              Feels like: {Math.round(data.main.feels_like)}°C
            </p>
            <p className="text-2xl flex items-center"></p>
          </div>
          <div>
            {/* Visibility */}
            <div className="flex items-center text-center">
              <BsEye size={22} />{" "}
              <p className="flex items-center text-center p-2">
                {data.visibility
                  ? (data.visibility / 1000).toFixed(1) + " km"
                  : "N/A"}
              </p>
            </div>

            {/* Probability of Precipitation */}
            <div className="flex items-center text-center">
              <FaCloudSunRain size={22} />{" "}
              <p className="flex items-center text-center p-2">
                {data.pop ? (data.pop * 100).toFixed(0) + "%" : "0%"}
              </p>
            </div>
            {/* Rain Volume */}
            <div className="flex items-center text-center">
              <MdWaterDrop size={22} />{" "}
              <p className="flex items-center text-center p-2">
                {data.rain?.["3h"] ? data.rain["3h"] + "mm" : "0 mm"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center text-center ">
          {data.weather[0].main === "Rain" ? (
            <WiRain size={120} color="#0099FF" />
          ) : (
            <IoSunnyOutline size={120} color="#FFAE42" />
          )}
          <p className="text-white mt-5">{data.weather[0].main}</p>
        </div>

        <div className="grid grid-cols-2 bg-gray-800 p-3 rounded-xl">
          <div className="flex flex-col items-center justify-start">
            <LuWaves size={44} />
            <p className="text-2xl flex items-center">{data.main.humidity}%</p>
            <p className="text-sm opacity-70">Humidity</p>
          </div>
          <div className="bg-gray-800 rounded-xl items-center flex flex-col justify-start">
            <BiWind className="mr-2 text-gray-300" size={44} />
            <p className="text-xl flex items-center">{data.wind.speed} m/s</p>
            <p className="text-sm opacity-70">Wind Speed</p>
          </div>
          <div className="bg-gray-800 rounded-xl items-center flex flex-col justify-start">
            <LiaTachometerAltSolid className="mr-2 text-gray-300" size={44} />
            <p className="text-xl flex items-center">
              {data.main.pressure} hPa
            </p>
            <p className="text-sm opacity-70">Pressure</p>
          </div>
          {data.rain && (
            <div className="bg-gray-800 rounded-xl items-center flex flex-col justify-start">
              <p className="text-2xl flex items-center">
                <WiRain className="mr-2 text-white" size={44} />
              </p>
              <p className="text-xl flex items-center">{data.rain["3h"]} mm</p>
              <p className="text-sm opacity-70">Rain (Last 3h)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
