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
import Filter from "./pages/Filter.jsx";

import CustomerInfo from "./pages/profile/CustomerInfo.jsx"
import PurchaseHistory from "./pages/profile/PurchaseHistory.jsx"

import { LoginProvider } from "./context/LoginState.js"; 

import Administrator from "./pages/administrator/Administrator.jsx";
import OrderSummary from "./pages/OrderSummary.jsx";

function App() {
  return (
    <div>
      <LoginProvider>
        <Router>
          <NavBar/>
          
          <Routes>
            <Route path="/" element={<Filter filterKey="all" />} />
            <Route path="/ByBrand" element={<Filter filterKey="brand" />} />
            <Route path="/ByCategory" element={<Filter filterKey="category" />} />
            <Route path="/ByGenre" element={<Filter filterKey="genre" />} />
            <Route path="/Product" element={<Product/>}>
              <Route path=":ProductId" element={<Product/>}></Route>
            </Route>
            <Route path="/ShoppingCart" element={<ShoppingCart/>}></Route>
            <Route path="/Registration" element={<Registration/>}></Route>
            <Route path="/Login" element={<Login/>}></Route>
            <Route path="/CustomerInfo" element={<CustomerInfo/>}></Route>
            <Route path="/PurchaseHistory" element={<PurchaseHistory/>}></Route>
            <Route path="/Administrator" element={<Administrator/>}></Route>
            <Route path="/Checkout" element={<Checkout/>}></Route>
            <Route path="/OrderSummary" element={<OrderSummary/>}></Route>
          </Routes>
        </Router>
      </LoginProvider>
    </div>
  );
}

export default App;

