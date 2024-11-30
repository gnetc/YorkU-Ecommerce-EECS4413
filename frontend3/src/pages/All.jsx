import React, { useState, useEffect } from 'react';
import productData from "../components/assets/data"
import Item from '../components/item/Item';
import "./CSS/All.css"

import Sort from "../components/sort/Sort";
import sortProducts from "../components/sort/SortProducts";

function All () {
    const [sortedData, setSortedData] = useState(productData); 
    const [selectedSort, setSelectedSort] = useState("default");  

    useEffect(() => {
        const sorted = sortProducts(productData, selectedSort);
        setSortedData(sorted); 
    }, [selectedSort, productData]); 
    
    const handleSortChange = (value) => {
        setSelectedSort(value); 
    };
    return (
        <div className='allItem'>
            <h1>All Items</h1>
            <hr/>
            <div className="ShopSort">
                <Sort onSortChange={handleSortChange} selectedSort={selectedSort} />
            </div>
            <div className='allProducts'>
                {sortedData.map((item, i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
                })}
            </div>
        </div>
    )
}

export default All;