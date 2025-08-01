'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">About Us</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          At <strong>Sourcing Agent</strong>, we specialize in helping global businesses connect with trusted manufacturers and suppliers across China. Our mission is to simplify your sourcing journey while ensuring quality, transparency, and competitive pricing.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          With offices in both <strong>Guangzhou, China</strong> and <strong>Lahore, Pakistan</strong>, we bridge international markets by providing expert support in:
        </p>

        <ul className="list-disc list-inside text-gray-700 text-lg mb-6">
          <li>Product Sourcing & Negotiation</li>
          <li>Factory Audits & Quality Control</li>
          <li>Custom Branding & Packaging</li>
          <li>Shipping & Logistics Management</li>
          <li>After-sales support</li>
        </ul>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Whether you're a startup, e-commerce seller, or established brand, we are here to be your trusted sourcing partner. We aim to build long-term relationships based on integrity, efficiency, and results.
        </p>

        <p className="text-gray-700 text-lg">
          📞 <strong>Contact Us:</strong> <br />
          Email: support@sourcingagent.com <br />
          WhatsApp: +86 137 0000 0000 | +92 300 1234567
        </p>
      </div>
    </main>
  );
}
