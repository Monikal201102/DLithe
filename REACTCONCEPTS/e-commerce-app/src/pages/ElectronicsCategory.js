import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/ElectronicsCategory.css";

const ElectronicsCategory = () => {
  const [electronics, setElectronics] = useState([]);

  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products/category/electronics");
        setElectronics(data);
      } catch (error) {
        console.error("Error fetching electronics products:", error);
      }
    };

    fetchElectronics();
  }, []);

  return (
    <div className="electronics-category">
      <h1>Electronics</h1>
      <div className="products-grid">
        {electronics.length > 0 ? (
          electronics.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="product-image" />
                <h4>{product.title}</h4>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading electronics products...</p>
        )}
      </div>
    </div>
  );
};

export default ElectronicsCategory;
