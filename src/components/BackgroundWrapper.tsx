import React from "react";

interface BackgroundWrapperProps {
  children: React.ReactNode;
  condition: string;
  darkMode: boolean;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({
  children,
  condition,
  darkMode,
}) => {
  const getBackgroundStyle = () => {
    if (darkMode) {
      // Dark mode backgrounds
      switch (condition) {
        case "rain":
          return "bg-gradient-to-b from-gray-900 to-blue-900";
        case "clouds":
          return "bg-gradient-to-b from-gray-900 to-gray-700";
        case "snow":
          return "bg-gradient-to-b from-gray-800 to-blue-950";
        case "thunder":
          return "bg-gradient-to-b from-gray-900 to-purple-900";
        default: // clear
          return "bg-gradient-to-b from-gray-900 to-blue-950";
      }
    } else {
      // Light mode backgrounds
      switch (condition) {
        case "rain":
          return "bg-gradient-to-b from-blue-400 to-blue-600";
        case "clouds":
          return "bg-gradient-to-b from-blue-200 to-gray-400";
        case "snow":
          return "bg-gradient-to-b from-blue-100 to-blue-300";
        case "thunder":
          return "bg-gradient-to-b from-blue-500 to-purple-700";
        default: // clear
          return "bg-gradient-to-b from-blue-400 to-blue-600";
      }
    }
  };

  return (
    <div
      className={`min-h-screen ${getBackgroundStyle()} transition-colors duration-500`}
    >
      {children}
    </div>
  );
};

export default BackgroundWrapper;
