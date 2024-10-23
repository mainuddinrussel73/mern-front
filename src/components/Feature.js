import React, { useState } from 'react';

const FeaturesSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const features = [
    "Wide Range of Books",
    "Interactive Courses",
    "Used Products for Recycling",
    "High-Quality Bikes",
    "Latest Mobile Phones",
    "Powerful Computers",
    "Affordable Cars",
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <section className="text-gray-600 dark:text-gray-300 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 dark:text-gray-100 mb-4">
              Discover Your Needs with Our Categories
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
              Explore a variety of books, courses, and products. From electronics to vehicles, we have everything you need in one place!
            </p>
            
          </div>

          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            {features.map((feature, index) => (
              <div key={index} className="p-2 sm:w-1/2 w-full">
                <div className="bg-white dark:bg-gray-800 rounded flex p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="text-indigo-500 dark:text-indigo-400 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span className="title-font font-medium">{feature}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="flex mx-auto mt-16 text-white bg-indigo-500 dark:bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 dark:hover:bg-indigo-700 rounded text-lg">
            Explore More
          </button>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
