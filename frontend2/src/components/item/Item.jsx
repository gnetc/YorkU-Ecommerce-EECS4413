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
function Item (props) {
    return (
        <div className='item'>
            <Link to={`/product/${props.id}`}><img src={props.image} alt=''/> </Link>
            <p>{props.name}</p>
            <div className='itemPrices'>
                ${props.price}
            </div>
        </div>
    )
}

export default Item