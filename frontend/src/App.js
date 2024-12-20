import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import ShoppingCart from './pages/ShoppingCart.jsx';
import Checkout from './pages/Checkout.jsx';
import Administrator from './pages/Administrator.jsx';

import NavBar from './components/navbar/NavBar.jsx';
import Filter from './pages/Filter.jsx';
import ProductDisplay from './components/productDisplay/ProductDisplay.jsx'; // Import the ProductDisplay component
import All from "./pages/All.jsx" 
import { LoginContext } from './context/LoginState.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<All/>}></Route>
          <Route path='/All' element={<Filter Filter="All"/>}></Route>
          <Route path='/ByBrand' element={<Filter Filter="ByBrand"/>}></Route>
          <Route path='/ByCategory' element={<Filter Filter="ByCategory"/>}></Route>
          <Route path='/ByGenre' element={<Filter Filter="ByGenre"/>}></Route>
          <Route path="/Product/:productId" element={<ProductDisplay />} /> {/* Updated to use :productId */}
          <Route path='/ShoppingCart' element={<ShoppingCart/>}></Route>
          <Route path='/Registration' element={<Registration/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

