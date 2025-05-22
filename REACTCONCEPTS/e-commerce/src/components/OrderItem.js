import React from "react";
import "../styles/orderItem.css";

function OrderItem({ order }) {
  return (
    <div className="order-item">
      <img src={order.image} alt={order.name} />
      <div className="order-details">
        <h3>{order.name}</h3>
        <p>Price: ${order.price}</p>
        <p>Status: {order.status}</p>
      </div>
    </div>
  );
}

export default OrderItem;
