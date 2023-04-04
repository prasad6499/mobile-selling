
import React from "react";
import {Route, Routes, BrowserRouter as Router}  from 'react-router-dom'

import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister"
import Footer from "./components/Footer"
import Cart from "./pages/Cart";
import ForgetPassword from "./pages/ForgetPassword";
import Orders from "./pages/Orders";
import AddProduct from "./pages/AddProduct";
import AllOrders from "./pages/AllOrders";
import About from "./pages/About";
import Contact from "./pages/Contact";

import "./App.css"

const App = ()=> {
  return (
    <React.Fragment>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login-register" element={<LoginRegister/>}/>
        <Route path="/reset-password" element={<ForgetPassword/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/my-orders" element={<Orders/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/owner/add-product" element={<AddProduct/>}/>
        <Route path="/owner/all-orders" element={<AllOrders/>}/>
        <Route path="/contact" element={<Contact/>}/>
        
      </Routes>
    
    </Router>
    <Footer/>
    </React.Fragment>
  );
}

export default App;
