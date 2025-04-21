/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CustomerLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // For redirection
  
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://auth-service-2-4xm3.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await res.json();
      if (res.ok && result.token) {
        console.log("Token:", result.token);
        localStorage.setItem('token', result.token);
        localStorage.setItem('userEmail', formData.email); // Store email for profile fetching
        setMessage("Login successful!");
        // navigate('/customer-dashboard'); // Change to your customer dashboard route
      } else {
        setMessage(result.message || "Login failed.");
      }
    } catch (err) {
      setMessage("Error connecting to backend.");
    }
  };
  
  return (
    <div className="flex min-h-screen">
      {/* Left half */}
      <div className="w-1/2 bg-white"></div>
      
      {/* Right half with form */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Customer Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Login
            </button>
          </form>
          {message && <p className="text-center bg-gray-100 mt-4">{message}</p>}
          
          <p className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register-customer" className="text-blue-500 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoginForm;