import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.post(`${API_URL}/api/auth/signup`, { name, email, password, role });
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Signup failed. User might exist.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto' }}>
      <div className="outlier-card">
        <div className="card-header" style={{ marginBottom: '24px', justifyContent: 'center' }}>
          <h2 style={{ margin: 0, color: 'white' }}>Create Account</h2>
        </div>
        <form onSubmit={handleSignup}>
          <input 
            type="text" 
            className="custom-input" 
            placeholder="Full Name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
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
          <select 
            className="custom-input" 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
