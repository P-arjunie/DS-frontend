import React, { useState } from 'react';

const DriverRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    address: '',
    age: '',
    gender: '',
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
      // Step 1: Register driver in local backend
      const res = await fetch('http://localhost:5000/api/drivers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        // Step 2: Register driver in external auth service
        const authRes = await fetch('https://auth-service-2-4xm3.onrender.com/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            role: 'driver'
          })
        });

        const authResult = await authRes.json();

        if (authRes.ok) {
          setMessage("Driver registered successfully and credentials saved.");
          setFormData({
            name: '', nic: '', address: '', age: '', gender: '', email: '', password: ''
          });
        } else {
          setMessage("Driver saved, but auth registration failed: " + (authResult.message || ""));
        }
      } else {
        setMessage(result.message || "Registration failed.");
      }
    } catch (err) {
      setMessage("Error connecting to backend or auth service.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left half (can leave empty or use for design/image) */}
      <div className="w-1/2 bg-white"></div>

      {/* Right half with form */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Driver Registration</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded-md" />
            <input name="nic" placeholder="NIC" value={formData.nic} onChange={handleChange} required className="w-full p-3 border rounded-md" />
            <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full p-3 border rounded-md" />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required className="w-full p-3 border rounded-md" />
            <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-3 border rounded-md">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded-md" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-3 border rounded-md" />
            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Register</button>
          </form>
          {message && <p className="text-center bg-gray-100 mt-4">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default DriverRegisterForm;
