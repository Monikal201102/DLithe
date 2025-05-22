// src/pages/AdminDashboard.js
import React from 'react';

const AdminDashboard = () => {
  const adminEmail = localStorage.getItem("adminEmail"); // optional

  return (
    <div className="container mt-5">
      <h1 className="text-center">Admin Dashboard</h1>
      <p className="text-center text-muted">Welcome, {adminEmail || "Admin"} 👋</p>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📊 View Users</h5>
              <p className="card-text">See a list of registered users and their details.</p>
              <button className="btn btn-outline-primary w-100" disabled>Coming Soon</button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">💸 Monitor Transactions</h5>
              <p className="card-text">Track deposits and withdrawals by users.</p>
              <button className="btn btn-outline-primary w-100" disabled>Coming Soon</button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">🔐 Admin Settings</h5>
              <p className="card-text">Manage admin credentials and settings.</p>
              <button className="btn btn-outline-primary w-100" disabled>Coming Soon</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
