import React from "react";
import "./Sort.css";

/**
 * This class is the sorting button interface? thing idk 
 */
function Sort({ onSort }) {
  return (
    <div className="sortContainer">
      <label htmlFor="sort" className="sortLabel">
        Sort by:
      </label>
      <select
        id="sort"
        className="sortSelect"
        onChange={(e) => onSort(e.target.value)} // Call onSort with the selected option
      >
        <option value="default">Default</option>
        <option value="priceAsc">Price - Low to High</option>
        <option value="priceDesc">Price - High to Low</option>
        <option value="nameAsc">Name - A to Z</option>
        <option value="nameDesc">Name - Z to A</option>
      </select>
    </div>
  );
}

export default Sort;