/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const CustomerRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    password: ''
  });
  
  const [message, setMessage] = useState('');
  
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/api/customers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await res.json();
      
      if (res.ok) {
        setMessage("Awesome! You're all set to order some delicious pizza!");
        setFormData({
          name: '', phone: '', address: '', email: '', password: ''
        });
      } else {
        setMessage(result.message || "Oops! Registration hit a snag.");
      }
    } catch (err) {
      setMessage("Can't reach our ovens right now. Try again soon!");
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Background pizza elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-orange-200 opacity-40"></div>
      <div className="absolute top-1/4 -right-10 w-32 h-32 rounded-full bg-orange-300 opacity-30"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-orange-400 opacity-20"></div>
      
      {/* Main container */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-orange-500 py-6 px-8 relative">
            <div className="absolute top-0 right-0 w-full h-full">
              <div className="absolute -top-6 right-10 w-16 h-16 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute top-10 right-20 w-10 h-10 bg-red-400 rounded-full opacity-20"></div>
            </div>
            <div className="flex items-center space-x-4 relative z-10">
              <div className="bg-black p-2 rounded-full">
                <img src="/api/placeholder/50/50" alt="Crust Pizza Logo" className="rounded-full" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">JOIN THE CRUST CREW!</h1>
                <p className="text-orange-100">Where every slice tells a delicious story</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row">
            {/* Left info column */}
            <div className="w-full md:w-2/5 bg-black p-8 text-white relative">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-16 h-16 border-4 border-orange-500 rounded-full"></div>
                <div className="absolute bottom-40 right-10 w-20 h-20 border-4 border-orange-500 rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-12 h-12 border-4 border-orange-500 rounded-full"></div>
              </div>
              
              <div className="relative z-10 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-orange-400 mb-2">Why Join?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">🍕</span>
                      <span>Exclusive deals just for members</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">🎁</span>
                      <span>Birthday surprises you'll love</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">⚡</span>
                      <span>Fast & easy ordering experience</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">🌟</span>
                      <span>Earn points with every bite</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-2">Already a member?</h3>
                  <a href="#" className="block text-center py-2 px-4 bg-orange-500 hover:bg-orange-600 rounded-md font-medium transition-colors">
                    LOG IN HERE
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right form column */}
            <div className="w-full md:w-3/5 p-8">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Your Slice of the Action!</h2>
              
              {message && (
                <div className="mb-6 p-4 rounded-lg bg-orange-100 border-l-4 border-orange-500 text-center">
                  {message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">What should we call you?</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">😎</span>
                    </div>
                    <input 
                      id="name"
                      name="name" 
                      placeholder="Your awesome name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">How can we reach you?</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">📱</span>
                    </div>
                    <input 
                      id="phone"
                      name="phone" 
                      placeholder="Your phone number" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      required 
                      className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Where should we deliver?</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">🏠</span>
                    </div>
                    <input 
                      id="address"
                      name="address" 
                      placeholder="Your delivery address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      required 
                      className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">What's your email?</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">✉️</span>
                    </div>
                    <input 
                      id="email"
                      type="email" 
                      name="email" 
                      placeholder="Your email address" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Create a secret password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">🔑</span>
                    </div>
                    <input 
                      id="password"
                      type="password" 
                      name="password" 
                      placeholder="Your secret password" 
                      value={formData.password} 
                      onChange={handleChange} 
                      required 
                      className="w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transform hover:scale-105 transition-all shadow-lg"
                  >
                    LET'S GET COOKIN'! 🔥
                  </button>
                </div>
              </form>
              
              <p className="text-center text-gray-600 mt-6">
                By joining, you agree to our deliciously reasonable 
                <a href="#" className="text-orange-500 hover:underline"> Terms </a> 
                &amp; 
                <a href="#" className="text-orange-500 hover:underline"> Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegisterForm;