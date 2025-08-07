'use client';

import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqs = [
  {
    question: 'What is ChinaProcure and what do you do?',
    answer: 'ChinaProcure is a sourcing agency that helps you find, verify, and import products directly from China.',
  },
  {
    question: 'Can I order in small quantities?',
    answer: 'Yes! We support low MOQ (Minimum Order Quantity) so small businesses can start small.',
  },
  {
    question: 'Do you inspect the products before shipping?',
    answer: 'Absolutely. We conduct quality inspections to ensure you get what you ordered.',
  },
  {
    question: 'What are your service charges?',
    answer: 'Our service charges depend on the complexity and size of the order. We offer transparent, upfront pricing.',
  },
  {
    question: 'How long does it take to receive products?',
    answer: 'Shipping times vary, but typical lead times range from 2 to 5 weeks depending on your location and order size.',
  },
  {
    question: 'Can you ship globally?',
    answer: 'Yes. We handle international logistics including customs and door-to-door delivery.',
  },
  {
    question: 'Do you provide samples?',
    answer: 'Yes, we can help you order and inspect samples before placing a bulk order.',
  },
  {
    question: 'Is your team bilingual?',
    answer: 'Yes, our team speaks English, Urdu, and Chinese to ensure smooth communication.',
  },
  {
    question: 'Where is your office located?',
    answer: 'We operate offices in Guangzhou, China and Lahore, Pakistan.',
  },
  {
    question: 'How do I get started?',
    answer: 'Just visit our Contact page and fill out the form — our team will get back to you within 24 hours.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">FAQ for New Customers</h1>
      <p className="text-center text-gray-600 mb-10">
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
              className="flex justify-between items-center w-full px-4 py-3 text-left text-gray-800 hover:bg-blue-50 focus:outline-none"
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
