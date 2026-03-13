// SearchBar.tsx
import { MapPin, Search, RefreshCw } from "lucide-react";
import React, { useState } from "react";
import { SearchBarProps } from "../utils/definition";
import { useCities, useGeolocation } from "../utils/hooks";

const SearchBar: React.FC<SearchBarProps> = ({
  searchInput,
  setSearchInput,
  onSearch,
  loading,
  setLoading,
  darkMode,
  toggleDarkMode,
  onRefresh,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const cities = useCities();
  const handleUseLocation = useGeolocation(
    setSearchInput,
    onSearch,
    setLoading,
    setLocationError
  );

  const getSuggestions = () =>
    searchInput.trim()
      ? cities.filter((city) =>
          city.name.toLowerCase().startsWith(searchInput.toLowerCase())
        )
      : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = searchInput.trim();
    if (trimmedInput) {
      onSearch(trimmedInput);
      setSearchInput("");
      setShowSuggestions(false);
      setLocationError(null);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchInput(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    setLocationError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setShowSuggestions(true);
    setLocationError(null);
  };

  return (
    <div className="p-4 bg-white/95 backdrop-blur-md shadow-lg relative z-50">
      <div className="flex items-center gap-4 max-w-4xl mx-auto">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${
            darkMode
              ? "bg-yellow-400 text-gray-900"
              : "bg-gray-800 text-yellow-400"
          }`}
          aria-label="Toggle dark/light mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <form onSubmit={handleSubmit} className="flex items-center relative">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-600" size={16} />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Search city..."
              className="w-[300px] pl-9 pr-12 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm text-sm"
              disabled={loading}
            />
            <button
              type="button"
              onClick={handleUseLocation}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition disabled:opacity-50 flex items-center justify-center"
              disabled={loading}
              title="Use my current location"
            >
              <MapPin size={16} className="text-gray-600" />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className={"p-2 rounded-lg"}
            disabled={loading}
            title="Refresh weather data"
          >
            <RefreshCw
              size={16}
              className={`text-gray-600 hover:bg-opacity-80 transition-colors  ${
                loading ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Suggestions Panel - Absolutely positioned relative to parent */}
      {showSuggestions && !loading && getSuggestions().length > 0 && (
        <div className="absolute left-0 right-0 z-50 px-4">
          <ul className="max-w-[244px] ml-21 lg:ml-75 bg-white text-gray-800 rounded-b-lg shadow-lg overflow-hidden border border-gray-200">
            {getSuggestions().map((city, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(city.name)}
                className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0 flex items-center text-sm"
              >
                <Search size={12} className="text-gray-400 mr-2" />
                {city.name}
                {city.province && (
                  <span className="text-gray-500 text-xs ml-1">
                    ({city.province})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {locationError && (
        <div className="text-red-600 text-center mt-2 bg-red-100 p-2 rounded-lg shadow text-sm">
          {locationError}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
