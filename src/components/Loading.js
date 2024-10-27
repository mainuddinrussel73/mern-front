// src/components/Loading.js
import React from 'react';
import '../styles/Loading.css'; // Optional for styling

const Loading = () => {
  return (
    <div className="loading-container bg-gray-100 dark:bg-gray-900">
      <span class="loader"></span>

      <p className='text-black dark:text-white'>Loading...</p>
    </div>
  );
};

export default Loading;
