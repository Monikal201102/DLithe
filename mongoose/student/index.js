const express = require("express");
const mongoose = require("mongoose");
const Student = require("./Student");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/schooldatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" Connected to MongoDB"))
.catch(err => console.error("Could not connect", err));

// Function to Add Students Manually
const addStudents = async () => {
    try {
        const students = [
            { name: "Alice Johnson", age: 22, email: "alicej@example.com", courses: ["Physics", "Chemistry"] },
            { name: "Bob Williams", age: 21, email: "bobw@example.com", courses: ["Math", "Biology"] },
            { name: "Charlie Davis", age: 23, email: "charlied@example.com", courses: ["English", "History"] },
            { name: "David Wilson", age: 20, email: "davidw@example.com", courses: ["Computer Science", "Math"] },
            
        ];

        await Student.insertMany(students);
        console.log(" Students added successfully!");
    } catch (error) {
        console.error(" Error adding students:", error.message);
    }
};

// Call the function to insert students once the server starts
addStudents();

// Start Express Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
