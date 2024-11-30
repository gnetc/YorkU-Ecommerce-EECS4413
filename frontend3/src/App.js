import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration.jsx";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
// import Administrator from "./pages/Administrator";

import NavBar from "./components/navbar/NavBar.jsx";
import Product from "./pages/Product.jsx";
import All from "./pages/All.jsx" 
import ByCategory from "./pages/ByCategory.jsx";
import ByBrand from "./pages/ByBrand.jsx";
import ByGenre from "./pages/ByGenre.jsx";

import CustomerInfo from "./pages/profile/CustomerInfo.jsx"
import PurchaseHistory from "./pages/profile/PurchaseHistory.jsx"

import { LoginProvider } from "./context/LoginState.js"; 

import Administrator from "./pages/administrator/Administrator.jsx";

function App() {
  return (
    <div>
      <LoginProvider>
        <Router>
          <NavBar/>
          
          <Routes>
            <Route path="/" element={<All/>}></Route>
            <Route path="/All" element={<All/>}></Route>
            <Route path="/ByBrand" element={<ByBrand/>}></Route>
            <Route path="/ByCategory" element={<ByCategory/>}></Route>
            <Route path="/ByGenre" element={<ByGenre/>}></Route>
            <Route path="/Product" element={<Product/>}>
              <Route path=":ProductId" element={<Product/>}></Route>
            </Route>
            <Route path="/ShoppingCart" element={<ShoppingCart/>}></Route>
            <Route path="/Registration" element={<Registration/>}></Route>
            <Route path="/Login" element={<Login/>}></Route>
            <Route path="/CustomerInfo" element={<CustomerInfo/>}></Route>
            <Route path="/PurchaseHistory" element={<PurchaseHistory/>}></Route>
            <Route path="/Administrator" element={<Administrator/>}></Route>
          </Routes>
        </Router>
      </LoginProvider>
    </div>
  );
}

export default App;

