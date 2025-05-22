import React, { useState } from "react";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    pinCode: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    if (!paymentMethod || !customerDetails.name || !customerDetails.address || !customerDetails.pinCode || !customerDetails.phone) {
      alert("Please fill all details and select a payment method.");
      return;
    }
    alert("Order is booked! Estimated delivery in 5-7 days.");
    setTimeout(() => {
      window.location.href = "/"; // Redirecting to main page
    }, 3000);
  };

  return (
    <div className="payment-page">
      <h2>Payment Options</h2>
      <div className="payment-options">
        <label>
          <input type="radio" name="payment" value="COD" onChange={(e) => setPaymentMethod(e.target.value)} />
          Cash on Delivery
        </label>
        <label>
          <input type="radio" name="payment" value="UPI" onChange={(e) => setPaymentMethod(e.target.value)} />
          Pay with UPI
        </label>
        <label>
          <input type="radio" name="payment" value="EMI" onChange={(e) => setPaymentMethod(e.target.value)} />
          Pay with EMI
        </label>
      </div>
      
      <h3>Customer Details</h3>
      <input type="text" name="name" placeholder="Name" onChange={handleInputChange} required />
      <input type="text" name="address" placeholder="Address" onChange={handleInputChange} required />
      <input type="text" name="pinCode" placeholder="PIN Code" onChange={handleInputChange} required />
      <input type="text" name="phone" placeholder="Phone Number" onChange={handleInputChange} required />
      
      <button onClick={handlePayment}>Confirm Payment</button>
    </div>
  );
};

export default PaymentPage;
