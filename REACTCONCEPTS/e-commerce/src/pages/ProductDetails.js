import React from "react";
import { useParams } from "react-router-dom";
import "../styles/productDetails.css";

function ProductDetails({ products }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <button>Add to Cart</button>
      <button>Add to Wishlist</button>
      <button>Buy Now</button>
    </div>
  );
}

export default ProductDetails;