import React from "react";

interface SkeletonLoaderProps {
  darkMode: boolean;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ darkMode }) => {
  const baseColor = darkMode ? "bg-gray-800" : "bg-gray-200";
  const shimmerColor = darkMode ? "bg-gray-700" : "bg-gray-100";

  return (
    <div className="flex flex-col lg:flex-row lg:items-start w-full gap-4 animate-pulse">
      {/* Main Weather Card Skeleton */}
      <div className="lg:w-1/3 w-full">
        <div
          className={`${baseColor} rounded-lg p-6 h-[400px] flex flex-col gap-4`}
        >
          <div className={`${shimmerColor} h-8 w-24 rounded-full`} />
          <div
            className={`${shimmerColor} h-20 w-20 rounded-full mx-auto my-4`}
          />
          <div className={`${shimmerColor} h-12 w-3/4 rounded-lg mx-auto`} />
          <div className={`${shimmerColor} h-4 w-1/2 rounded mx-auto mt-4`} />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className={`${shimmerColor} h-16 rounded`} />
            <div className={`${shimmerColor} h-16 rounded`} />
            <div className={`${shimmerColor} h-16 rounded`} />
            <div className={`${shimmerColor} h-16 rounded`} />
          </div>
        </div>
      </div>

      {/* Forecast Section Skeleton */}
      <div className="flex flex-col w-full lg:w-2/3 gap-4">
        {/* Hourly Forecast Skeleton */}
        <div className={`${baseColor} rounded-lg p-6 min-h-[250px]`}>
          <div className={`${shimmerColor} h-6 w-40 rounded mb-6`} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`${shimmerColor} h-24 rounded-lg`} />
            ))}
          </div>
        </div>

        {/* Daily Forecast Skeleton */}
        <div className={`${baseColor} rounded-lg p-6 min-h-[250px]`}>
          <div className={`${shimmerColor} h-6 w-40 rounded mb-6`} />
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`${shimmerColor} h-16 rounded-lg`} />
            ))}
          </div>
        </div>

        {/* Date Card Skeleton */}
        <div className={`${baseColor} rounded-lg p-4`}>
          <div className={`${shimmerColor} h-12 w-full rounded-lg`} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
