const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB (Make sure MongoDB is running)
mongoose.connect("mongodb://127.0.0.1:27017/Company", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// ✅ Define Employee Schema
const employeeSchema = new mongoose.Schema({
    ssn: String,
    name: String,
    address: String,
    salary: Number,
    gender: String,
    dob: String,
    superSSN: String,
    deptNo: Number,
});

// ✅ Create Model (Collection: 'employees')
const Employee = mongoose.model("Employee", employeeSchema);

// ✅ API to Add Employee to MongoDB
app.post("/employees", async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.json({ message: "Employee added successfully!", employee: newEmployee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ API to Fetch Employees from MongoDB
app.get("/employees", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ API to Update Employee
app.put("/employees/:id", async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Employee updated!", employee: updatedEmployee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ API to Delete Employee
app.delete("/employees/:id", async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: "Employee deleted!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Start Server
app.listen(5000, () => console.log("Server running on port 5000"));