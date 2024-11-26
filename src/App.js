// src/App.js
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import About from "./Pages/About/About";
import Cart from "./Pages/Cart/Cart";
import Contact from "./Pages/Contact/Contact";
import Slider from "./Pages/Coupon/Slider";
import Discount from "./Pages/Discount/Discount";
import Homepage from "./Pages/Homepage/Homepage";
import Myorder from "./Pages/Homepage/Myorder";
import UserOrder from "./Pages/Homepage/Userorder";
import Wishlist from "./Pages/Homepage/Wishlist";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Login/Profile";
import Message from "./Pages/Message/Message";
import New from "./Pages/New/New";
import Offer from "./Pages/Off/Off";
import Payment from "./Pages/Payment/Payment";
import Thankyou from "./Pages/Payment/Thankyou";
import BarChart from "./Pages/admin/BarChart";
import {
  default as AddProduct,
  default as Product,
} from "./Pages/Product/Product";
import UpdateProduct from "./Pages/Product/ProductUpdate";
import Review from "./Pages/Product/Review";
import Register from "./Pages/Register/Register";
import Search from "./Pages/Search/Search";
import Shop from "./Pages/Shop/Shop";
import Support from "./Pages/Support/Support";
import AdminDashboard from "./Pages/admin/admin_dashboard/AdminDashboard";
import ForgotPassword from "./Pages/forgotPassword/ForgotPassword";
import Navbar from "./components/Navbar";

import AdminRoutes from "./protected_routes/AdminRoutes";
import UserRoutes from "./protected_routes/UserRoutes";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/discounts" element={<Discount />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/newproduct" element={<New />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/messages" element={<Message />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/search" element={<Search />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/myorder" element={<Myorder />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/userorder" element={<UserOrder />} />
        <Route path="/userprofile" element={<Profile />} />
        <Route path="/review/:productId" element={<Review />} />
        <Route path="/slider" element={<Slider />} />

        {/* Admin routes */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/admin/update/:id" element={<UpdateProduct />} />
          <Route path="/admin/chart" element={<BarChart />} />
        </Route>

        {/* User Routes */}
        <Route element={<UserRoutes />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
