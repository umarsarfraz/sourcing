'use client';

import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqs = [
  // ... same as before ...
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">FAQ for New Customers</h1>
      <p className="text-center text-gray-600 mb-12">
        Before working with us, you may have some questions. Below are answers to help you understand how ChinaProcure works.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md shadow-sm bg-white transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full px-4 py-3 text-left text-gray-800 hover:bg-blue-50"
            >
              <span className="font-medium">{faq.question}</span>
              {openIndex === index ? (
                <FaMinus className="text-blue-600" />
              ) : (
                <FaPlus className="text-blue-600" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
