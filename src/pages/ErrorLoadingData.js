import React from 'react';
import { Link } from 'react-router-dom';

const ErrorLoadingData = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">Error</h1>
        <p className="mt-4 text-xl text-gray-700">Oops! Something went wrong while loading the data.</p>
        <p className="mt-2 text-lg text-gray-500">
          Please check your internet connection or try refreshing the page.
        </p>
        <div className="mt-6">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Retry
          </button>
          <Link
            to="/"
            className="ml-4 px-5 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorLoadingData;
