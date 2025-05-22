import React from "react";

const PaymentCard = ({ children, className }) => {
  return <div className={`payment-card ${className}`}>{children}</div>;
};

export default PaymentCard;
