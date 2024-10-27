import React from 'react';
import '../styles/Loading.css';

const Loading = () => {
  return (
    <div className="loading-container  bg-gray-100 dark:bg-gray-900">
      <span className="loader"></span>
      <p className="text-black dark:text-white mt-4">Loading...</p>
    </div>
  );
};

export default Loading;
