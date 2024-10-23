import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "How do I place an order?",
    answer: "To place an order, browse our catalog, select a product, and click on the 'Buy Now' button. You will be guided through the checkout process.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods such as credit cards, PayPal, and bank transfers. Choose the option that best suits you during checkout.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, we will send you a tracking number via email. You can also track your order from your account dashboard.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unused and undamaged items. Simply contact our support team to initiate a return.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Section Title */}
        <h2 className="text-5xl font-extrabold text-center text-gray-900 dark:text-stone-100 mb-16">
          <FaQuestionCircle className="inline-block text-indigo-500 mr-3" />
          Frequently Asked Questions
        </h2>

        {/* FAQ Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white  dark:bg-gray-800 rounded-lg  p-6 border-l-4 border-indigo-500 hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-stone-400 hover:text-indigo-500 transition">
                  {faq.question}
                </h3>
                {activeIndex === index ? (
                  <FaChevronUp className="text-indigo-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </div>

              {activeIndex === index && (
                <p className="mt-4 text-gray-600 dark:text-stone-200 transition-opacity duration-500">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
