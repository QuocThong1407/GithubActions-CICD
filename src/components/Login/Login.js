import React, { useState, useEffect } from 'react';

const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1; 
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ['+', '-']; 
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let answer;
  if (operator === '+') {
    answer = num1 + num2;
  } else {
    if (num1 < num2) {
      answer = num2 - num1;
      return { num1: num2, num2: num1, operator, question: `${num2} ${operator} ${num1} = ?`, answer };
    }
    answer = num1 - num2;
  }
  return { num1, num2, operator, question: `${num1} ${operator} ${num2} = ?`, answer };
};

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [error, setError] = useState('');

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []); 

  const handleLogin = (e) => {
    e.preventDefault(); 
    setError(''); 

    if (!email || !password || !captchaInput) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (parseInt(captchaInput, 10) !== captcha.answer) {
      setError('Kết quả xác minh không chính xác.');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }

    if (email === 'test@example.com' && password === 'password123') {
      console.log('Đăng nhập thành công!');
      onLoginSuccess(); 
    } else {
      setError('Email hoặc mật khẩu không đúng.');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@example.com"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password123"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label htmlFor="captcha">Xác minh:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', fontStyle: 'italic', userSelect: 'none' }}>{captcha.question}</span>
            <input
              type="number"
              id="captcha"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              style={{ width: '80px', padding: '8px', boxSizing: 'border-box' }}
              required
            />
          </div>
        </div>
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', width: "100%" }}>Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;
