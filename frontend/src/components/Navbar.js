import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; 
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <nav className="custom-navbar">
      <Link className="nav-brand" to="/">Task Manager</Link>
      
      {token && (
        <div className="nav-center">
          <Link className="nav-link active" to="/dashboard">Home</Link>
          {user?.role === 'admin' && <Link className="nav-link" to="/dashboard">Projects</Link>}
          <Link className="nav-link" to="/dashboard">Tasks</Link>
        </div>
      )}

      <div className="nav-right">
        {token ? (
          <>
            <span style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={handleLogout}>Logout</span>
            <div className="small-avatar">{getInitials(user?.name)}</div>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link active" to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
