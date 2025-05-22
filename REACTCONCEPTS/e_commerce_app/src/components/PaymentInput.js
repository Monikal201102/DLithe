import React from "react";

const PaymentInput = ({ type = "text", name, placeholder, onChange, className, required }) => {
  return (
    <input 
      type={type} 
      name={name} 
      placeholder={placeholder} 
      onChange={onChange} 
      required={required} 
      className={`payment-input ${className}`} 
    />
  );
};

export default PaymentInput;
