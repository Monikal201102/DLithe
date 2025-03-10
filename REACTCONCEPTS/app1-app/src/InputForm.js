import { useState } from "react";
import "./InputForm.js"; // Optional, if you have styles

export default function InputForm() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleSubmit = () => {
    alert(`Input 1: ${input1}, Input 2: ${input2}`);
  };

  return (
    <div className="flex flex-col items-center p-6 gap-4 border rounded-xl shadow-lg w-80">
      <input
        type="text"
        placeholder="Enter first text"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        placeholder="Enter second text"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button onClick={handleSubmit} className="w-full bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </div>
  );
}
