import { useState } from "react";
import { useLocation } from "react-router-dom"; 
import PaymentCard from "../components/PaymentCard";
import PaymentInput from "../components/PaymentInput";
import PaymentButton from "../components/PaymentButton";
import { toast } from "react-toastify";
import "../styles/PaymentForm.css";

export default function PaymentPage() {
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct || null; 

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pinCode: "",
    paymentMode: "",
    upiApp: "",
    emiDuration: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentProcessed, setIsPaymentProcessed] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for popup

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "paymentMode") {
      if (value !== "UPI") {
        setFormData((prevData) => ({ ...prevData, upiApp: "" }));
      }
      if (value !== "EMI") {
        setFormData((prevData) => ({ ...prevData, emiDuration: "" }));
      }
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!formData.paymentMode) {
      toast.error("Please select a payment mode!", { autoClose: 1000 });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentProcessed(true);
      setShowPopup(true); // Show popup on success

      toast.success(
        <div>
          ✅ Payment Successful! <br />
          🎉 Happy Shopping! 😊
        </div>,
        { autoClose: 1500 }
      );
    }, 3000);
  };

  return (
    <div className="payment-container">
      <PaymentCard className="payment-card">
        <h2 className="payment-title">Payment Details</h2>

        {selectedProduct && (
          <div className="selected-product-info">
            <img src={selectedProduct.image} alt={selectedProduct.title} className="product-image" />
            <h3>{selectedProduct.title}</h3>
            <p className="product-price">Price: ${selectedProduct.price.toFixed(2)}</p>
          </div>
        )}

        <h2 className="address-title">Address</h2>
        <form onSubmit={handlePayment} className="payment-form">
          <PaymentInput name="name" placeholder="Name" onChange={handleChange} required />
          <PaymentInput name="phone" type="number" placeholder="Phone Number" onChange={handleChange} required />
          <PaymentInput name="address" type="text" placeholder="Address" onChange={handleChange} required />
          <PaymentInput name="pinCode" type="number" placeholder="Pin Code" onChange={handleChange} required />

          <h3>Payment Mode</h3>
          <label>
            <input type="radio" name="paymentMode" value="UPI" onChange={handleChange} /> UPI
          </label>
          {formData.paymentMode === "UPI" && (
            <select name="upiApp" onChange={handleChange} className="payment-input">
              <option value="">Select UPI App</option>
              <option value="Google Pay">Google Pay</option>
              <option value="PhonePe">PhonePe</option>
              <option value="Paytm">Paytm</option>
              <option value="BHIM">BHIM</option>
            </select>
          )}

          <label>
            <input type="radio" name="paymentMode" value="COD" onChange={handleChange} /> Cash on Delivery (COD)
          </label>

          <label>
            <input type="radio" name="paymentMode" value="EMI" onChange={handleChange} /> Pay with EMI
          </label>
          {formData.paymentMode === "EMI" && (
            <select name="emiDuration" onChange={handleChange} className="payment-input">
              <option value="">Select EMI Duration</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="9 Months">9 Months</option>
              <option value="12 Months">12 Months</option>
            </select>
          )}

          {isProcessing ? (
            <div className="processing-animation">
              <p>🔄 Validating Payment...</p>
            </div>
          ) : (
            <PaymentButton type="submit" disabled={isPaymentProcessed}>
              {isPaymentProcessed ? "Payment Completed 🎉" : "Submit Payment"}
            </PaymentButton>
          )}
        </form>
      </PaymentCard>

      {/* Payment Success Popup */}
      {showPopup && (
        <div className="payment-popup show">
          <span className="success-icon">✅</span>
          <p className="payment-popup-message">Payment Successful! 🎉</p>
          <button className="payment-popup-close" onClick={() => setShowPopup(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
