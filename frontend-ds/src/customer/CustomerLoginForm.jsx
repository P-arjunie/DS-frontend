/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CustomerLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
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
        localStorage.setItem('userEmail', formData.email);
        setMessage("Login successful! Welcome back! 🎉");
        // navigate('/customer-dashboard');
      } else {
        setMessage(result.message || "Oops! Login failed. Try again?");
      }
    } catch (err) {
      setMessage("Hmm, can't reach our servers right now. Try again soon!");
    }
  };
  
  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* Background circles for visual energy */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-orange-200 opacity-70"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-yellow-400 opacity-50"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-red-400 opacity-30"></div>
      
      {/* Left half */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="text-center px-8">
          <h1 className="text-4xl font-bold text-orange-500 mb-4">Flavor Masters</h1>
          <p className="text-gray-800 text-lg">Where culinary dreams come to life!</p>
          <div className="mt-8">
            <span className="text-orange-600 text-6xl">🍳</span>
          </div>
        </div>
      </div>
      
      {/* Right half with form */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100 relative">
        <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg border-t-4 border-orange-500 relative z-10">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl mb-6 text-center">
            <h2 className="text-2xl font-bold">JOIN THE CREW! 🚀</h2>
          </div>
          
          <p className="text-center text-gray-700 mb-6">Let's Get Cookin'! 🔥</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute left-3 top-3 text-orange-500">✉️</div>
              <input
                type="email"
                name="email"
                placeholder="Your awesome email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 pl-10 border-2 border-orange-300 rounded-xl focus:border-orange-500 focus:ring focus:ring-orange-200 transition"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-3 top-3 text-orange-500">🔒</div>
              <input
                type="password"
                name="password"
                placeholder="Super secret password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 pl-10 border-2 border-orange-300 rounded-xl focus:border-orange-500 focus:ring focus:ring-orange-200 transition"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full p-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transform hover:scale-105 transition duration-200 font-bold text-lg"
            >
              Let Me In! 🎯
            </button>
          </form>
          
          {message && (
            <div className="text-center mt-4 p-2 rounded-lg bg-orange-100 text-orange-700 animate-pulse">
              {message}
            </div>
          )}
          
          <p className="text-center mt-6 text-gray-700">
            First time here? {' '}
            <Link to="/register-customer" className="text-orange-500 hover:text-orange-600 font-bold hover:underline">
              Create an account! ✨
            </Link>
          </p>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">Join our flavorful community today!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoginForm;