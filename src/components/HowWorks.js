import React from "react";
import { FaClipboardCheck, FaTruck, FaSmile } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaClipboardCheck className="w-10 h-10 text-white" />,
    title: "Place Your Order",
    description: "Easily browse our catalog and place an order with a single click.",
  },
  {
    id: 2,
    icon: <FaTruck className="w-10 h-10 text-white" />,
    title: "Fast Shipping",
    description: "Your order will be delivered quickly and efficiently.",
  },
  {
    id: 3,
    icon: <FaSmile className="w-10 h-10 text-white" />,
    title: "Enjoy Your Product",
    description: "Once you receive your product, enjoy it with satisfaction.",
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-16">
      <div className=" mx-auto px-6">
        <h2 className="text-gray-900 dark:text-stone-100 text-4xl font-bold text-center text-gray-800 mb-12">
          How It Works
        </h2>

        {/* Step Container */}
        <div className="flex flex-col md:flex-row justify-between items-start space-y-12 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center text-center w-full md:w-1/3">
              {/* Line Between Steps */}
              {index !== 0 && (
                <div className="hidden md:block absolute left-0 top-12 w-full h-1 bg-indigo-500 transform -translate-x-1/2"></div>
              )}

              {/* Step Circle with Icon */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500 text-white mb-4 z-10">
                {step.icon}
              </div>

              {/* Step Title */}
              <h3 className="text-xl font-semibold dark:text-stone-100 text-gray-800 mb-2">{step.title}</h3>

              {/* Step Description */}
              <p className="dark:text-stone-300 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
