import React from "react";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";

function Cart({ cartItems, onRemove }) {
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item.id} item={item} onRemove={onRemove} />
        ))
      )}
      {cartItems.length > 0 && (
        <button onClick={() => navigate("/checkout")} className="checkout-button">Buy Now</button>
      )}
    </div>
  );
}

export default Cart;
