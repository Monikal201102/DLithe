import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import SignInPage from "./pages/SignInPage";
import IndexPage from "./pages/IndexPage";
import TransactionPage from "./pages/TransactionPage"; // Ensure this import exists
import TransactionDetails from "./pages/TransactionDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/transaction" element={<TransactionPage />} /> 
        <Route path="/transactions" element={<TransactionDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
