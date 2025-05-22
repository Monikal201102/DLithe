import React, { useState, useEffect } from "react";
import PaymentPage from "./PaymentPage"; // Import PaymentPage
import "../styles/CartPage.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleBuyNow = (item) => {
    setSelectedItem(item); // Store selected item
    setShowPayment(true);  // Show payment form
  };

  const closePaymentModal = () => {
    setShowPayment(false);
    setSelectedItem(null);
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
              <button className="buy-now" onClick={() => handleBuyNow(item)}>Buy Now</button>
            </div>
          </div>
        ))
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closePaymentModal}>✖</button>
            <h2>Payment Details</h2>
            <PaymentPage selectedItem={selectedItem} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
