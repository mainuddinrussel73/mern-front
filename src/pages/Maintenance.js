// MaintenancePage.js
import React from 'react';

const MaintenancePage = () => {
  return (
    <div className="flex items-center justify-center h-screen  bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Site Under Maintenance</h1>
        <p className="text-gray-600 text-lg mb-6">
          We’re currently working on improvements. Please check back later!
        </p>
        <div className="flex justify-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-500 mb-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
            ></path>
          </svg>
        </div>
        <p className="text-gray-500">Thank you for your patience.</p>
      </div>
    </div>
  );
};

export default MaintenancePage;
