export interface WeatherData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number; // Minimum temperature in Kelvin
    temp_max: number; // Maximum temperature in Kelvin
    pressure: number; // Atmospheric pressure in hPa
    sea_level?: number; // Sea-level pressure in hPa (optional)
    grnd_level?: number; // Ground-level pressure in hPa (optional)
    humidity: number; // Humidity percentage
    temp_kf?: number; // Temperature difference (optional)
  };
  weather: {
    id: number; // Weather condition ID
    main: string; // Main weather condition (e.g., Rain, Clouds)
    description: string; // Weather description (e.g., moderate rain)
    icon: string; // Weather icon code
  }[];
  clouds: {
    all: number; // Cloudiness percentage
  };
  wind: {
    speed: number; // Wind speed in m/s
    deg: number; // Wind direction in degrees
    gust?: number; // Wind gust speed in m/s (optional)
  };
  visibility: number; // Visibility in meters
  pop?: number; // Probability of precipitation (optional)
  rain?: {
    "3h": number; // Rain volume for the last 3 hours in mm (optional)
  };
  sys: {
    pod: string; // Part of the day (e.g., "n" for night, "d" for day)
  };
  dt_txt: string; // Date and time as a string (e.g., "2025-02-21 18:00:00")
  formattedDate?: string;
}
