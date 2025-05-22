// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage"; // ✅ Updated to use AuthPage
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import OrdersPage from "./pages/OrdersPage";
import ElectronicsCategory from "./pages/ElectronicsCategory";
import JewelryCategory from "./pages/JeweleryCategory";
import MensClothingCategory from "./pages/MensClothingCategory";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} /> {/* ✅ Fixed Sign In route */}
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/category/electronics" element={<ElectronicsCategory />} />
            <Route path="/category/jewelery" element={<JewelryCategory />} />
            <Route path="/category/mens-clothing" element={<MensClothingCategory />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
