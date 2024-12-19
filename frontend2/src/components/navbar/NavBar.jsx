import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import './NavBar.css'

import shoppingCart from "../assets/shoppingCart.jpg"
import logo from "../assets/placeholder.jpg"
import { ShopContext } from '../../context/ShopContext';

const NavBar = () => {

    // const[menu, setMenu] = useState("shop");
    const[menu, setMenu] = useState("All");
    const {getTotalItems} = useContext(ShopContext);

    return (
        <div className='navBar'> 
            <div className='navLogo'>
                <img src={logo} alt=""></img>
                <p>Retail Shop</p>
            </div>
            <ul className='navMenu'>
                <li onClick={() => {setMenu("All")}}><Link style={{textDecoration: 'none'}} to='/'>All</Link>{menu === "All" ? <hr/>:<></>}</li>
                <li onClick={() => {setMenu("ByBrand")}}><Link style={{textDecoration: 'none'}} to='/ByBrand'>By Brand</Link>{menu === "ByBrand" ? <hr/>:<></>}</li>
                <li onClick={() => {setMenu("ByCategory")}}><Link style={{textDecoration: 'none'}} to='/ByCategory'>By Category</Link>{menu === "ByCategory" ? <hr/>:<></>}</li>
                <li onClick={() => {setMenu("ByGenre")}}><Link style={{textDecoration: 'none'}} to='/ByGenre'>By Genre</Link>{menu === "ByGenre" ? <hr/>:<></>}</li>
            </ul>
            <div className='navLogin'>
                <Link to='/Registration'><button>Login</button></Link>
                <Link to='/ShoppingCart'><img className='shoppingCart' src={shoppingCart} alt=""></img></Link>
                <div className='shoppingCartCount'>{getTotalItems()}</div>
            </div>
        </div>
    )
}

export default NavBar