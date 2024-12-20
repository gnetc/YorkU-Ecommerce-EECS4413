import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../components/productDisplay/ProductDisplay';

function Product () {
    const {productData} = useContext(ShopContext);
    const {ProductId} = useParams();
    const product = productData.find((e) => e.id === Number(ProductId));
    return (
        <div>
            <ProductDisplay product={product}></ProductDisplay>
        </div>
    )
}

export default Product