import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/MensClothingCategory.css";

const MensClothingCategory = () => {
  const [mensClothing, setMensClothing] = useState([]);

  useEffect(() => {
    const fetchMensClothing = async () => {
      try {
        console.log("Fetching men's clothing products...");
        const { data } = await axios.get("https://fakestoreapi.com/products/category/men's clothing");
        setMensClothing(data);
      } catch (error) {
        console.error("Error fetching men's clothing products:", error);
      }
    };

    fetchMensClothing();
  }, []);

  return (
    <div className="mens-clothing-category">
      <h1>Clothing</h1>
      <div className="products-grid">
        {mensClothing.length > 0 ? (
          mensClothing.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <img src={product.image} alt={product.title} className="product-image" />
                <h4 className="product-title">{product.title}</h4>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="loading-message">Loading men's clothing products...</p>
        )}
      </div>
    </div>
  );
};

export default MensClothingCategory;
