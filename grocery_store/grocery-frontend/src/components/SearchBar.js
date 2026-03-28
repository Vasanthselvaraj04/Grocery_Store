import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form className="search-container" onSubmit={handleSearch}>
      <div className="search-input-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search for essentials..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            if (e.target.value === "") onSearch("");
          }}
        />
      </div>
      <button type="submit" className="search-button">
        Find
      </button>
    </form>
  );
}

export default SearchBar;