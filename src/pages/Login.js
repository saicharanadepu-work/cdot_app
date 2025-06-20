import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      navigate('/products');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="text-center mb-4">User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input type="email" name="email" className="form-control" onChange={handleChange} required />
            <label>Email</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
            <label>Password</label>
          </div>
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>
        <div className="text-center mt-3">
          <small className="text-muted">Don't have an account?</small><br />
          <Link to="/signup" className="btn btn-outline-secondary mt-2">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
