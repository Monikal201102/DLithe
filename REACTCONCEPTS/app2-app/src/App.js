import { useState } from "react";
import myImage from "./react.js-img.png";

export default function App() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      {showDetails ? (
        <Details setShowDetails={setShowDetails} />
      ) : (
        <Home setShowDetails={setShowDetails} />
      )}
    </div>
  );
}

function Home({ setShowDetails }) {
  return (
    <div style={{ textAlign: "center" }}> {/* Centering the content */}
      {/* Increased image size and centered it */}
      <img 
        src={myImage} 
        alt="Placeholder" 
        style={{ width: "1000px", height: "auto", display: "block", margin: "0 auto" }} 
      />
      <br />
      {/* Centered Read More button */}
      <button onClick={() => setShowDetails(true)} style={{ marginTop: "10px" }}>
        Read More
      </button>
    </div>
  );
}

function Details({ setShowDetails }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>ReactJs</h2>
      <p>  ReactJS is an open-source JavaScript library developed by Facebook for building dynamic 
        and interactive user interfaces, primarily for single-page applications. It allows developers 
        to create reusable UI components that manage their own state, making applications more efficient 
        and easier to maintain. React uses a virtual DOM to optimize rendering performance, ensuring 
        that updates happen quickly and efficiently. One of its most powerful features is the use of 
        hooks, which enable functional components to have state and lifecycle capabilities. React is widely 
        adopted by major companies and developers worldwide due to its component-based architecture, 
        fast rendering capabilities, and strong community support. Whether you're building small projects 
        or large-scale applications, React provides a flexible and scalable solution for modern web 
        development, making it one of the most popular frontend libraries today.
      </p>
      <button onClick={() => setShowDetails(false)} style={{ marginTop: "20px" }}>
        Go Back
      </button>
    </div>
  );
}