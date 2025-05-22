import React from "react";

const PaymentButton = ({ children, type = "button", onClick, className }) => {
  return (
    <button type={type} onClick={onClick} className={`payment-button ${className}`}>
      {children}
    </button>
  );
};

export default PaymentButton;
