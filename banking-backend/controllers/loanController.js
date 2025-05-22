const Loan = require("../models/Loan");
const Transaction = require("../models/Transaction");

// @desc    Apply for a loan
// @route   POST /api/loans/apply
// @access  Private
const applyLoan = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { amount, interestRate, durationMonths } = req.body;

    if (!amount || !interestRate || !durationMonths) {
      return res.status(400).json({ message: "Please provide amount, interest rate, and duration in months." });
    }

    if (
      isNaN(amount) || isNaN(interestRate) || isNaN(durationMonths) ||
      amount <= 0 || interestRate <= 0 || durationMonths <= 0
    ) {
      return res.status(400).json({ message: "All loan inputs must be numbers greater than 0." });
    }

    const totalInterest = (amount * interestRate * durationMonths) / (100 * 12);
    const totalRepayment = amount + totalInterest;
    const monthlyPayment = totalRepayment / durationMonths;

    const loan = new Loan({
      userId,
      amount: Math.round(amount),
      interestRate,
      durationMonths,
      totalRepayment: Math.round(totalRepayment),
      monthlyPayment: Math.round(monthlyPayment),
      status: "pending",
    });

    await loan.save();

    res.status(201).json({
      message: "Loan application submitted successfully.",
      loan,
    });
  } catch (error) {
    console.error("Loan Application Error:", error);
    res.status(500).json({ message: "Internal server error while applying for loan.", error: error.message });
  }
};

// @desc    Recommend loan based on user's credit/debit history
// @route   GET /api/loans/recommend
// @access  Private
const recommendLoan = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    // FIXED: Query by 'userId' field instead of 'user'
    const transactions = await Transaction.find({ userId });

    let totalCredit = 0;
    let totalDebit = 0;

    transactions.forEach(txn => {
      if (txn.type === "CR") {
        totalCredit += txn.amount;
      } else if (txn.type === "DR") {
        totalDebit += txn.amount;
      }
    });

    const netBalance = totalCredit - totalDebit;

    console.log("User ID:", userId);
    console.log("Fetched transactions:", transactions.length);
    transactions.forEach(txn => {
      console.log(txn.type, txn.amount);
    });
    console.log("Total Credit:", totalCredit);
    console.log("Total Debit:", totalDebit);
    console.log("Net Balance:", netBalance);

    let recommendation = {
      eligible: false,
      recommendedAmount: 0,
      recommendedInterest: null,
      recommendedDuration: null,
      message: "Insufficient credit history for loan eligibility",
    };

    if (totalCredit >= 10000 && netBalance >= 5000) {
      recommendation = {
        eligible: true,
        recommendedAmount: Math.round(netBalance * 2),
        recommendedInterest: 10,
        recommendedDuration: 12,
        message: "Eligible for a personal loan",
      };
    }

    console.log("Recommendation:", recommendation);

    res.json(recommendation);
  } catch (error) {
    console.error("Loan recommendation failed:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  applyLoan,
  recommendLoan,
};
