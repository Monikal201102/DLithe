import React from "react";
import "../styles/wishlist.css";

function Wishlist({ wishlist, onRemove }) {
  return (
    <div className="wishlist">
      <h2>Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} className="wishlist-item">
            <img src={item.image} alt={item.name} />
            <div className="wishlist-details">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <button onClick={() => onRemove(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;
