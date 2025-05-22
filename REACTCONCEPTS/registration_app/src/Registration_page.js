import React, { useState } from "react";

const Registration = () => {
  const [formData, setFormData] = useState({
    employee_ssn: "",
    employee_name: "",
    birth_date: "",
    address: "",
    salary: "",
    dept_id: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registered Employee:", formData);
    alert("Registration Successful!");
  };

  return (
    <div>
      <h2>Employee Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Employee SSN:</label>
        <input type="text" name="employee_ssn" value={formData.employee_ssn} onChange={handleChange} required />
        <br /><br />

        <label>Employee Name:</label>
        <input type="text" name="employee_name" value={formData.employee_name} onChange={handleChange} required />
        <br /><br />

        <label>Birth Date:</label>
        <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} required />
        <br /><br />

        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        <br /><br />

        <label>Salary:</label>
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
        <br /><br />

        <label>Department ID:</label>
        <input type="text" name="dept_id" value={formData.dept_id} onChange={handleChange} required />
        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
