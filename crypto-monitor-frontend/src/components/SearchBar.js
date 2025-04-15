// src/components/SearchBar.js
import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search for a coin..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full md:w-1/2 p-3 mb-6 rounded-xl text-black outline-none focus:ring-2 ring-blue-500"
    />
  );
};

export default SearchBar;
