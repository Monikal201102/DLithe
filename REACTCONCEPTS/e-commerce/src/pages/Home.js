import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

import smartphone from "../assets/smartphone.jpg";
import laptop from "../assets/laptop.jpg";
import washingMachine from "../assets/washing-machine.jpg";
import tshirt from "../assets/tshirt.jpg";
import headphones from "../assets/headphones.jpg";

const products = [
  { id: 1, name: "Smartphone", category: "Electronics", price: "$699", image: smartphone },
  { id: 2, name: "Laptop", category: "Electronics", price: "$999", image: laptop },
  { id: 3, name: "Washing Machine", category: "Home Appliances", price: "$499", image: washingMachine },
  { id: 4, name: "T-Shirt", category: "Clothing", price: "$29", image: tshirt },
  { id: 5, name: "Headphones", category: "Electronics", price: "$199", image: headphones }
];


function Home() {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p>{product.price}</p>
              <Link to={`/product/${product.id}`} className="details-button">View Details</Link>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}

export default Home;