import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext"; // Cart functions
import { useParams } from "react-router-dom";
import ProductDisplay from "../components/productDisplay/ProductDisplay";

/**
 * Shows information about the selected item
 * @returns Display selected item
 */
function Product () {
    const {productData} = useContext(ShopContext); // Data of ALL products
    const {ProductId} = useParams(); // Retrieve product id from url
    // Searches through productData array to find id that matches id from url
    const product = productData.find((e) => e.id === Number(ProductId));
    return (
        <div>
            {/*Display the selected product on page*/}
            <ProductDisplay product={product}></ProductDisplay>
        </div>
    )
}

export default Product