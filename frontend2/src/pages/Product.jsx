import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/breadcrumbs/Breadcrumb';
import ProductDisplay from '../components/productDisplay/ProductDisplay';

function Product () {
    const {productData} = useContext(ShopContext);
    const {ProductId} = useParams();
    const product = productData.find((e) => e.id === Number(ProductId));
    return (
        <div>
            <Breadcrumb product={product}></Breadcrumb>
            <ProductDisplay product={product}></ProductDisplay>
        </div>
    )
}

export default Product