import React from "react";
import "./Sort.css";

function Sort({ onSortChange, selectedSort }) {
  return (
    <div className="sortContainer">
      <label htmlFor="sort" className="sortLabel">
        Sort by:
      </label>
      <select
        id="sort"
        className="sortSelect"
        value={selectedSort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="priceAsc">Price-low to high</option>
        <option value="priceDesc">Price-high to low</option>
        <option value="nameAsc">Name-A to Z</option>
        <option value="nameDesc">Name-Z to A</option>
      </select>
    </div>
  );
}

export default Sort;
