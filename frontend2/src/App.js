import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration.jsx';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import Administrator from './pages/Administrator';

import NavBar from './components/navbar/NavBar.jsx';
import Filter from './pages/Filter.jsx';
import Product from './pages/Product.jsx';
import All from "./pages/All.jsx" 

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
          <Route path='/Product' element={<Product/>}>
            <Route path=':ProductId' element={<Product/>}></Route>
          </Route>
          <Route path='/ShoppingCart' element={<ShoppingCart/>}></Route>
          <Route path='/Registration' element={<Registration/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

