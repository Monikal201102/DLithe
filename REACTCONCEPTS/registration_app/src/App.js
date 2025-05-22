import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({
        ssn: "", name: "", address: "", salary: "", gender: "",
        dob: "", superSSN: "", deptNo: ""
    });

    // ✅ Fetch Employees from MongoDB
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const res = await axios.get("http://localhost:5000/employees");
        setEmployees(res.data);
    };

    // ✅ Handle Input Changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ Submit Form to MongoDB
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/employees", form);
        fetchEmployees(); // Refresh the list
        setForm({ ssn: "", name: "", address: "", salary: "", gender: "", dob: "", superSSN: "", deptNo: "" });
    };

    // ✅ Delete Employee
    const handleDelete = async (id) => {
        await axios.delete(http://localhost:5000/employees/${id});
        fetchEmployees();
    };

    return (
        <div>
            <h2>Employee Management</h2>
            <form onSubmit={handleSubmit}>
                <label>SSN:</label>
                <input type="text" name="ssn" value={form.ssn} onChange={handleChange} required />
                <br /><br />

                <label>Name:</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required />
                <br /><br />

                <label>Address:</label>
                <input type="text" name="address" value={form.address} onChange={handleChange} />
                <br /><br />

                <label>Salary:</label>
                <input type="number" name="salary" value={form.salary} onChange={handleChange} />
                <br /><br />

                <label>Gender:</label>
                <input type="text" name="gender" value={form.gender} onChange={handleChange} />
                <br /><br />

                <label>Date of Birth:</label>
                <input type="date" name="dob" value={form.dob} onChange={handleChange} />
                <br /><br />

                <label>Super SSN:</label>
                <input type="text" name="superSSN" value={form.superSSN} onChange={handleChange} />
                <br /><br />

                <label>Department No:</label>
                <input type="number" name="deptNo" value={form.deptNo} onChange={handleChange} />
                <br /><br />

                <button type="submit">Add Employee</button>
            </form>

            <h3>Employee List</h3>
            <ul>
                {employees.map((emp) => (
                    <li key={emp._id}>
                        {emp.name} - {emp.salary} - {emp.gender}
                        <button onClick={() => handleDelete(emp._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;