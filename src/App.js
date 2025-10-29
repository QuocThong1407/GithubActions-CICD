import './App.css';
import MathOperations from './components/MathOperation/MathOperations';
import Login from './components/Login/Login';
import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); 
  };

  return (
    <>
      {!isLoggedIn ? (
          <Login onLoginSuccess={handleLoginSuccess} /> 
        ) : (
          <>
            <h2>Math Operation</h2>
            <MathOperations />
          </>
        )}
    </>
    
  );
}

export default App;
