import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/HomePage.css";
import adBanner from "./ecommerce_ad_banner.jpg";


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const data = response.data;
        const selectedProducts = [
          ...data.filter((p) => p.category === "electronics").slice(0, 5),
          ...data.filter((p) => p.category === "jewelery").slice(0, 5),
          ...data.filter((p) => p.category === "men's clothing").slice(0, 5),
        ];
        setProducts(selectedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));

    // Dummy Offers Data (Can be dynamic)
    setOffers([
      { id: 1, text: "Up to 50% Off on Electronics!", bgColor: "#FF9800" },
      { id: 2, text: "Buy 1 Get 1 Free on Fashion!", bgColor: "#E91E63" },
      { id: 3, text: "Exclusive Deals on Mobiles!", bgColor: "#3F51B5" },
    ]);
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="homepage">
      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search for products (e.g., 'iPhone', 'TV')..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* 🎯 Offers Section */}
      <div className="offers-container">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card" style={{ backgroundColor: offer.bgColor }}>
            {offer.text}
          </div>
        ))}
      </div>

      {/* 🔥 Advertisements (Carousel) */}
      <div className="ad-banner">
      <img src={adBanner} alt="Ad Banner" />



{/* ✅ Fixed Image Path */}
      </div>

      {/* 🛍️ Category Section */}
      <div className="category-container">
        <h2>Shop by Category</h2>
        <div className="categories">
          <Link to="/category/electronics">📱 Electronics</Link>
          <Link to="/category/jewelery">💍 Jewelry</Link>
          <Link to="/category/mens-clothing">👕 Clothing</Link>
        </div>
      </div>

      {/* 🏆 Featured Products */}
      <h2>Featured Products</h2>
      <div className="products-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="product-image" />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="no-results">No products found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
