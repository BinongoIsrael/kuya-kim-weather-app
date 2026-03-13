import React from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface WeatherMapProps {
  lat: number;
  lon: number;
  darkMode?: boolean;
  location: string;
  temperature: number;
  description: string;
}

const WeatherMap: React.FC<WeatherMapProps> = ({
  lat,
  lon,
  darkMode = false,
  location,
  temperature,
  description,
}) => {
  const apiKey = "8622b47fdb20666afef001dddd18251f";

  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div
      className={`w-full rounded-lg overflow-hidden shadow-lg ${
        darkMode ? "border border-gray-700" : "border border-gray-200"
      }`}
      style={{ height: "400px" }}
    >
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
        className="z-10"
      >
        {/* Base Map Layer */}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>

          {/* Satellite View */}
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            />
          </LayersControl.BaseLayer>

          {/* Weather Layers */}
          <LayersControl.Overlay name="Temperature">
            <TileLayer
              url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}
              attribution="&copy; OpenWeatherMap"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Clouds">
            <TileLayer
              url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`}
              attribution="&copy; OpenWeatherMap"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Precipitation">
            <TileLayer
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`}
              attribution="&copy; OpenWeatherMap"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Wind Speed">
            <TileLayer
              url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`}
              attribution="&copy; OpenWeatherMap"
            />
          </LayersControl.Overlay>
        </LayersControl>

        {/* Location Marker */}
        <Marker position={[lat, lon]} icon={customIcon}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold">{location}</h3>
              <p className="text-lg">{temperature}°C</p>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
