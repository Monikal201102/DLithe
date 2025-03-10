import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function TransactionDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const newTransaction = location.state;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Get existing transactions from localStorage
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

    if (newTransaction) {
      // Check if the transaction already exists in history (avoid duplicates)
      const isDuplicate = storedTransactions.some(
        (txn) =>
          txn.amount === newTransaction.amount &&
          txn.description === newTransaction.description &&
          txn.date === newTransaction.date &&
          txn.type === newTransaction.type
      );

      if (!isDuplicate) {
        const updatedTransactions = [...storedTransactions, newTransaction];
        setTransactions(updatedTransactions);
        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      } else {
        setTransactions(storedTransactions);
      }
    } else {
      setTransactions(storedTransactions);
    }
  }, [newTransaction]);

  const handleClearHistory = () => {
    localStorage.removeItem("transactions");
    setTransactions([]);
  };

  return (
    <div className="transaction-details-container">
      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions available</p>
      ) : (
        <ul>
          {transactions.map((txn, index) => (
            <li key={index}>
              <strong>Type:</strong> {txn.type} | 
              <strong> Amount:</strong> ${txn.amount} | 
              <strong> Description:</strong> {txn.description} | 
              <strong> Date:</strong> {txn.date}
            </li>
          ))}
        </ul>
      )}
      <div className="button-group">
        {transactions.length > 0 && (
          <button onClick={handleClearHistory} className="clear-btn">Clear History</button>
        )}
        <button onClick={() => navigate("/")} className="home-btn">Back to Home</button>
      </div>
    </div>
  );
}

export default TransactionDetails;
