import React from "react";
import "../styles/ProductCart.css";

const ProductCart = ({ product, onAddToCart }) => {
  return (
    <div className="product-cart">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCart;
