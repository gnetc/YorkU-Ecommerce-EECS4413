import React, { useContext } from 'react';
import "./CartItems.css"
import { ShopContext } from '../../context/ShopContext';

function CartItems () {
    const {getTotal, productData, cartItems, removeFromCart} = useContext(ShopContext);
    return (
        <div className='cartItems'>
            <div className='cartFormat'>
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr/> 
            {/* Displays items users have in cart */}
            {productData.map((e) => {
                if (cartItems[e.id] > 0) {
                    return <div>
                        <div className='itemFormat itemGrid'>
                            <img src={e.image} alt="" className='productIcon'></img>
                            <p>{e.name}</p>
                            <p>${e.price}</p>
                            <button className='cartQuantity'>{cartItems[e.id]}</button>
                            <p>${e.price * cartItems[e.id]}</p>
                            <button className='removeItem' onClick={() => {removeFromCart(e.id)}}>Remove Item</button>
                        </div>
                        <hr/>
                    </div>
                }
                return null;
            })}
            <div className='cartBottom'>
                <div className='cartTotal'>
                    <h1>Cart Totals</h1>
                    <div>
                        <div className='totalItem'>
                            <p>Subtotal</p>
                            <p>${getTotal()}</p>
                        </div>
                        <hr/>
                        <div className='totalItem'>
                            <p>Shipping Fee</p>
                            <p>$100</p>
                        </div>
                        <hr/>
                        <div className='totalItem'>
                            <h3>Total</h3>
                            <h3>${getTotal() + 100}</h3>
                        </div>
                    </div>
                    <button>Check Out</button>
                </div>
            </div>
        </div>
    )
}

export default CartItems