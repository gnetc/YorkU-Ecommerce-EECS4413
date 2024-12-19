import React, { useContext } from 'react';
import "./ProductDisplay.css"
import { ShopContext } from '../../context/ShopContext';

/**
 * this page is for displaying the product the user clicked on - shows detail of the product
 * @param {*} props 
 * @returns product info page
 */
function ProductDisplay (props) {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    return (
        <div className='productDisplay'>
            <div className='displayLeft'>
                <div className='displayImg'>
                    <img className='displayMain' src={product.image} alt=""></img>
                </div>
            </div>
            <div className='displayRight'>
                <h1>{product.name}</h1>
                <div className='displayPrice'>
                    ${product.price}
                </div>
                <div className='displayBrand'>
                    Brand:&nbsp;<span>{product.Filter}</span>
                </div>
                <div className='displayQuantity'>
                    Quanity left:&nbsp;<span>{product.quantity}</span>
                </div>
                <div className='displayDescription'>
                    Description:&nbsp;<span>{product.description}</span>
                </div>
                <button onClick={() => {addToCart(product.id)}}>Add to Cart</button>
            </div>
        </div>
    )
}

export default ProductDisplay