import React, { useContext } from 'react';
import "./Breadcrumb.css"
import proceed from "../assets/proceed.png"

function Breadcrumb (props) {
    const {product} = props;
    return (
        <div className='breadcrumb'>
            {product.Filter} <img src={proceed} alt=""></img> {product.name}
        </div>
    )
}

export default Breadcrumb