// src/components/Loading.js
import React from 'react';
import '../styles/Loading.css'; // Optional for styling

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;