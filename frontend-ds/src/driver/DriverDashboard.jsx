import React from 'react';
import { useNavigate } from 'react-router-dom';

const DriverDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login-driver');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Driver Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome! You're successfully logged in.</p>

        {/* Dashboard Features Placeholder */}
        <div className="mb-6">
          <p className="text-gray-500">Dashboard content coming soon...</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DriverDashboard;
