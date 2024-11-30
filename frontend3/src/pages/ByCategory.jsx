import React, { useContext, useState, useEffect } from "react";
import "./CSS/Filter.css";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/item/Item";

function ByCategory() {
  const { productData } = useContext(ShopContext);
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    const grouped = groupBy(productData, "category");
    setGroupedData(grouped);
  }, [productData]);

  const groupBy = (data, key) => {
    const grouped = data.reduce((result, item) => {
      (result[item[key]] = result[item[key]] || []).push(item);
      return result;
    }, {});

    const sortedKeys = Object.keys(grouped).sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)); 
      const numB = parseInt(b.match(/\d+/));

      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB; 
      }
      return a.localeCompare(b);
    });

    const sortedGrouped = {};
    sortedKeys.forEach((key) => {
      sortedGrouped[key] = grouped[key];
    });

    return sortedGrouped;
  };

  return (
    <div className="ShopGrouped">
      {Object.keys(groupedData).map((group, i) => (
        <div key={i} className="GroupSection">
          <h2>{group}</h2>
          <div className="GroupItems">
            {groupedData[group].map((item, j) => (
              <Item
                key={j}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ByCategory;
