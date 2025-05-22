import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // uses interceptor with token
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const LoanRecommendation = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    duration: '',
    reason: 'Based on your transaction history',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get('/loans/recommend', {
        headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data || {};

        setRecommendation(data);
        setFormData({
          amount: data.recommendedAmount || '',
          duration: data.recommendedDuration || '',
          reason: 'Based on your transaction history',
        });
      } catch (err) {
        console.error('Error fetching recommendation:', err.response?.data || err.message);
        setError('Failed to fetch recommendation');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissionMessage('Loan application submitted successfully (simulated).');
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading recommendation...</p>
      </div>
    );
  }

  if (error) return <Alert variant="danger" className="mt-4">{error}</Alert>;

  return (
    <div className="container mt-5">
      <h2>Loan Recommendation</h2>
      {recommendation && (
        <div className="mt-3">
          <p><strong>Status:</strong> {recommendation.eligible ? 'Eligible ✅' : 'Not Eligible ❌'}</p>
          {recommendation.eligible && (
            <>
              <p><strong>Recommended Amount:</strong> ₹{recommendation.recommendedAmount}</p>
              <p><strong>Interest Rate:</strong> {recommendation.recommendedInterest}%</p>
              <p><strong>Duration:</strong> {recommendation.recommendedDuration} months</p>
              <p><strong>Message:</strong> {recommendation.message}</p>

              <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group className="mb-3">
                  <Form.Label>Loan Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Duration (in months)</Form.Label>
                  <Form.Control
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    type="text"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Apply for Loan
                </Button>
              </Form>

              {submissionMessage && <Alert variant="success" className="mt-3">{submissionMessage}</Alert>}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LoanRecommendation;
