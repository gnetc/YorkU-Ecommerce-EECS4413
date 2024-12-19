import React from "react";
import "./Sort.css";

/**
 * This class is the sorting button interface? thing idk 
 */
function Sort() {
  return (
    <div className="sortContainer">
      <label htmlFor="sort" className="sortLabel">
        Sort by:
      </label>
      <select id="sort" className="sortSelect">
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
