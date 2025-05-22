import React, { useState } from "react";
import "../styles/checkout.css";

function Checkout({ onCompletePurchase }) {
  const [details, setDetails] = useState({ name: "", address: "", pin: "", phone: "", payment: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => {
      onCompletePurchase(details);
    }, 3000);
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {!orderPlaced ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleInputChange} required />
          <input type="text" name="address" placeholder="Address" onChange={handleInputChange} required />
          <input type="text" name="pin" placeholder="Pin Code" onChange={handleInputChange} required />
          <input type="text" name="phone" placeholder="Phone Number" onChange={handleInputChange} required />
          <select name="payment" onChange={handleInputChange} required>
            <option value="">Select Payment Method</option>
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI</option>
            <option value="emi">EMI</option>
          </select>
          <button type="submit">Confirm Order</button>
        </form>
      ) : (
        <p>Order Placed! Redirecting...</p>
      )}
    </div>
  );
}

export default Checkout;
