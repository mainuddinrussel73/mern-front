import React, { useState } from 'react';

const StatisticsSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const statistics = [
    { title: "Total Products", value: "1,200", icon: "📦" },
    { title: "Active Users", value: "4,500", icon: "👤" },
    { title: "Products Sold", value: "3,800", icon: "🛒" },
    { title: "Positive Reviews", value: "2,150", icon: "🌟" },
  ];

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <section className="text-gray-600 dark:text-gray-300 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="text-center mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 dark:text-gray-100 mb-4">
              Key Statistics
            </h1>
           
          </div>

          <div className="flex flex-wrap -m-4 text-center">
            {statistics.map((stat, index) => (
              <div key={index} className="p-4 sm:w-1/2 md:w-1/4 w-full">
                <div className="border-2 border-gray-200 dark:border-gray-700 px-4 py-6 rounded-lg">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <h2 className="title-font font-medium text-3xl text-gray-900 dark:text-white">{stat.value}</h2>
                  <p className="leading-relaxed">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatisticsSection;
