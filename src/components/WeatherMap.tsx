import React from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import L from "leaflet"; // Import L from leaflet
import "leaflet/dist/leaflet.css";

const OpenWeatherMapTileLayer: React.FC<{ layer: string }> = ({ layer }) => {
  const apiKey = "8622b47fdb20666afef001dddd18251f"; // Replace with your API key

  return (
    <TileLayer
      url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`}
      attribution="© OpenWeatherMap"
    />
  );
};

const App: React.FC = () => {
  // Coordinates for Baybay City, Philippines
  const baybayCityCenter: [number, number] = [10.6785, 124.8006];
  const zoomLevel = 12; // Adjust zoom level to focus on Baybay City

  // Define the bounds around Baybay City (optional)
  const baybayCityBounds: L.LatLngBoundsExpression = [
    [10.5, 124.6], // Southwest coordinates
    [10.8, 125.0], // Northeast coordinates
  ];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={baybayCityCenter} // Center on Baybay City
        zoom={zoomLevel} // Zoom level to focus on Baybay City
        style={{ height: "100%", width: "100%" }}
        minZoom={14} // Allow more zoom-out flexibility
        maxBounds={baybayCityBounds} // Restrict map to the defined bounds
        maxBoundsViscosity={1.0} // Prevent panning outside the bounds
      >
        {/* Base Map (OpenStreetMap) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* OpenWeatherMap Layers */}
        <LayersControl position="topright">
          <LayersControl.Overlay name="Precipitation" checked>
            <OpenWeatherMapTileLayer layer="precipitation_new" />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Sea Level">
            <OpenWeatherMapTileLayer layer="sea_level_new" />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default App;
