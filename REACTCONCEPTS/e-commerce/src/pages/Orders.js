import React from "react";
import "../styles/orders.css";

function Orders({ orderHistory }) {
  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {orderHistory.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orderHistory.map((order, index) => (
          <div key={index} className="order-item">
            <p>Product: {order.productName}</p>
            <p>Status: {order.status}</p>
            <p>Delivery Date: {order.deliveryDate}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;