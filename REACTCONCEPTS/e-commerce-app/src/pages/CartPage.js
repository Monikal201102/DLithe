import React, { useState, useEffect } from "react";
import "../styles/CartPage.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleBuyNow = () => {
    alert("Proceeding to payment...");
    // Redirect to payment page logic can be added here
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Size: {item.size || "N/A"}</p>
              <p>Color: {item.color || "N/A"}</p>
              <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
