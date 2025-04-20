import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/DashboardSideBar';

const DriverDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login-driver');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with logout */}
      <Sidebar onLogout={handleLogout} />

      {/* Main content */}
      <div className="flex-1 p-10">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Driver Dashboard</h1>
          <p className="text-gray-600 mb-6">Welcome! You're successfully logged in.</p>

          {/* Dashboard Features Placeholder */}
          <div className="border rounded p-6 bg-gray-50">
            <p className="text-gray-500 text-center">Dashboard content coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
