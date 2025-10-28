// Import React and useState hook from 'react'
import React, { useState } from 'react';

// Define the MathOperations component
function MathOperations() {
  // State variables for input numbers and result
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);

  // Math operation functions
  const add = () => setResult(num1 + num2);
  const subtract = () => setResult(num1 - num2);
  const multiply = () => setResult(num1 * num2);
  const divide = () => setResult(num2 !== 0 ? num1 / num2 : 'Error: Division by zero');

  // --- CSS Styles as JavaScript Objects ---

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    width: '320px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backgroundColor: '#f9f9f9'
  };

  const inputContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '15px'
  };
  
  const inputStyle = {
    width: '100px',
    padding: '10px',
    margin: '0 5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    textAlign: 'center',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px', // Khoảng cách giữa các nút
    marginBottom: '20px'
  };

  const buttonStyle = {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    minWidth: '80px' // Đảm bảo các nút có độ rộng nhất quán
  };

  const resultStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    minHeight: '36px', // Giữ chiều cao ổn định
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #eee'
  };

  // Render the component with inline styles
  return (
    <div style={containerStyle}>
      <h2 style={{ marginTop: '0', color: '#555' }}>Simple Calculator</h2>
      
      {/* Input fields for numbers */}
      <div style={inputContainerStyle}>
        <input 
          style={inputStyle}
          type="number" 
          value={num1} 
          onChange={(e) => setNum1(Number(e.target.value))} 
        />
        <input 
          style={inputStyle}
          type="number" 
          value={num2} 
          onChange={(e) => setNum2(Number(e.target.value))} 
        />
      </div>
      
      {/* Buttons for math operations */}
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={add}>Add</button>
        <button style={buttonStyle} onClick={subtract}>Subtract</button>
        <button style={buttonStyle} onClick={multiply}>Multiply</button>
        <button style={buttonStyle} onClick={divide}>Divide</button>
      </div>
      
      {/* Display result */}
      <p style={resultStyle}>
        Result: {result}
      </p>
    </div>
  );
}

// Export the MathOperations component
export default MathOperations;