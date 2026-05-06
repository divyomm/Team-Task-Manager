import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Login failed. Please check credentials.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto' }}>
      <div className="outlier-card">
        <div className="card-header" style={{ marginBottom: '24px', justifyContent: 'center' }}>
          <h2 style={{ margin: 0, color: 'white' }}>Welcome Back</h2>
        </div>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            className="custom-input" 
            placeholder="Email address"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            className="custom-input" 
            placeholder="Password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
