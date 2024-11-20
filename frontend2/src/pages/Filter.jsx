import React, { useContext } from 'react';
import "./CSS/Filter.css"
import { ShopContext } from '../context/ShopContext';
import dropdownIcon from "../components/assets/dropdown.png"
import Item from "../components/item/Item"

function Filter (props) {
    const {productData} = useContext(ShopContext);
    return (
        <div className='Filter'>
            <div className='ShopIndex'>
                <p>
                    <span>Showing 1-12</span> out of 36 produts
                </p>
                <div className='ShopSort'>
                    Sort by <img src={dropdownIcon} alt=""/>
                </div>
            </div>
            <div className='ShopProduct'>
                {productData.map((item, i) => {
                    if (props.Filter === item.Filter) {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className='ShopSeeMore'>
                See More Products
            </div>
        </div>
    )
}

export default Filter