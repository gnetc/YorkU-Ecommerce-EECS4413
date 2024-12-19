import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css'

/**
 * this page is for 
 * sooooo I actually forgot what this page was about :D...
 * I think it was for displaying item images on the main page.
 * @param {*} props 
 * @returns 
 */


function Item({ id, name, image, price }) {
    return (
        <div className='item'>
            <Link to={`/product/${id}`}>
                <img src={image || '/path-to-placeholder-image.jpg'} alt={name || 'Product'} />
                <p>{name}</p>
                <div className='itemPrices'>${price}</div>
            </Link>
        </div>
    );
}

export default Item;
