import React from 'react';
import productData from "../components/assets/data"
import Item from '../components/item/Item';
import "./CSS/All.css"

function All () {
    return (
        <div className='allItem'>
            <h1>All Items</h1>
            <hr/>
            <div className='allProducts'>
                {productData.map((item, i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
                })}
            </div>
        </div>
    )
}

export default All