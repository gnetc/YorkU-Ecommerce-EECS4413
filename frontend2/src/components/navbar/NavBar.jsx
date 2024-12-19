import React, {useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'

import shoppingCart from "../assets/shoppingCart.jpg"
import logo from "../assets/placeholder.jpg"
import profile from "../assets/profile.png"
import { ShopContext } from '../../context/ShopContext';
import { LoginContext } from "../../context/LoginState";

/**
 * This page is for the navigation page
 * @returns 
 */
const NavBar = () => {

    // const[menu, setMenu] = useState("shop");
    const { getTotalItems } = useContext(ShopContext);
    const { isLoggedIn } = useContext(LoginContext); 
    const [menu, setMenu] = useState("All");

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
            <div className="navLogin">
                {isLoggedIn ? (
                <img src={profile} alt="" className="profileIcon" /> 
                ) : (
                <Link to="/Registration">
                    <button>Login</button>
                </Link>
                )}
                <Link to="/ShoppingCart">
                <img className="shoppingCart" src={shoppingCart} alt="" />
                </Link>
                <div className="shoppingCartCount">{getTotalItems()}</div>
            </div>
        </div>
    )
}

export default NavBar