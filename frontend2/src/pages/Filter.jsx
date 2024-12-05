import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import "./CSS/Filter.css";
import Item from "../components/item/Item";

const Filter = ({ filterKey }) => {
  const { productData } = useContext(ShopContext);

  // Group products by the filterKey
  const groupBy = (data, key) => {
    return data.reduce((result, item) => {
      const group = item[key] || ""; // Extract the key (e.g., brand, category)
      if (!result[group]) {
        result[group] = []; // Initialize group if it doesn't exist
      }
      result[group].push(item); // Add the item to the group
      return result;
    }, {});
  };

  // Get grouped products
  const groupedProducts = groupBy(productData, filterKey);

  return (
    <div className="Filter">
      <h1>
        {filterKey === "all"
            ? "All Products"
            : filterKey === "brand"
            ? "Brands"
            : filterKey === "category"
            ? "Categories"
            : filterKey === "genre"
            ? "Genres"
            : "Unknown"}
        </h1>

      {Object.keys(groupedProducts).map((group) => (
        <div key={group} className="GroupSection">
          <h2>{group}</h2>
          <div className="GroupItems">
            {groupedProducts[group].map((item) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                description={item.description}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Filter;
