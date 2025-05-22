import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/JeweleryCategory.css";

const JewelryCategory = () => {
  const [jewelry, setJewelry] = useState([]);

  useEffect(() => {
    const fetchJewelry = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products/category/jewelery");
        setJewelry(data);
      } catch (error) {
        console.error("Error fetching jewelry products:", error);
      }
    };

    fetchJewelry();
  }, []);

  return (
    <div className="jewelry-category">
      <h1>Jewelry</h1>
      <div className="products-grid">
        {jewelry.length > 0 ? (
          jewelry.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="product-image" />
                <h4>{product.title}</h4>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading jewelry products...</p>
        )}
      </div>
    </div>
  );
};

export default JewelryCategory;
