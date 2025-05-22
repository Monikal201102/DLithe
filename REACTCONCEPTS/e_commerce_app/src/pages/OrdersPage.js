import React, { useEffect, useState } from "react";
import "../styles/OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={order.image} alt={order.title} className="order-item-image" />
            <div className="order-item-details">
              <h3>{order.title}</h3>
              <p>Price: ${order.price}</p>
              <p>Delivery Status: {order.status}</p>
              <p>Estimated Delivery: {order.deliveryDate}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
