import React, { useContext, useState, useEffect } from "react";
import "./CSS/Filter.css";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/item/Item";

function ByBrand() {
  const { productData } = useContext(ShopContext);
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    const grouped = groupBy(productData, "brand");
    setGroupedData(grouped);
  }, [productData]);

  const groupBy = (data, key) => {
    return data.reduce((result, item) => {
      (result[item[key]] = result[item[key]] || []).push(item);
      return result;
    }, {});
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

export default ByBrand;
