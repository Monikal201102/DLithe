import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TransactionPage.css"; // Ensure CSS file exists

function TransactionPage() {
  const [transaction, setTransaction] = useState({
    amount: "",
    description: "",
    date: "",
    type: "credit",
  });

  const [balance, setBalance] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Load balance from localStorage
    const storedBalance = localStorage.getItem("balance");
    setBalance(storedBalance ? parseFloat(storedBalance) : 0);
  }, []);

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(transaction.amount);

    // Validate amount
    if (amount <= 0 || isNaN(amount)) {
      alert("Please enter a valid amount greater than zero!");
      return;
    }

    let newBalance = balance;
    if (transaction.type === "credit") {
      newBalance += amount;
    } else {
      if (amount > balance) {
        alert("Insufficient funds!");
        return;
      }
      newBalance -= amount;
    }

    setBalance(newBalance);
    localStorage.setItem("balance", newBalance.toFixed(2)); // Store updated balance

    setSuccessMessage("Transaction successfully recorded!");

    // Store transaction history in localStorage
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Navigate after a short delay
    setTimeout(() => {
      navigate("/transactions", { state: transaction });
    }, 1500);
  };

  return (
    <div className="transaction-container">
      <h2>Enter Transaction Details</h2>
      <p>Current Balance: <strong>${balance.toFixed(2)}</strong></p>

      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label>Transaction Type:</label>
        <select name="type" value={transaction.type} onChange={handleChange} required>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>

        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={transaction.amount}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          placeholder="Enter description"
          value={transaction.description}
          onChange={handleChange}
          required
        />

        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={transaction.date}
          onChange={handleChange}
          required
        />

        <div className="button-group">
          <button type="submit" className="submit-btn">Submit Transaction</button>
          <button type="button" className="cancel-btn" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default TransactionPage;
