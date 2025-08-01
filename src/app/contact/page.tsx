'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message.');
    }
  };

  return (
    <div className="space-y-16">

      {/* China Office Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {/* Left - Image */}
        <div className="h-96 w-full">
          <img
            src="/img/guanzhou.jpg"
            alt="China Office"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right - Info */}
        <div className="bg-white p-10 flex flex-col justify-center shadow">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">🇨🇳 China Office</h2>
          <ul className="text-gray-700 space-y-3 text-lg">
            <li><strong>📍 Address:</strong> No. 88 Tianhe Road, Guangzhou</li>
            <li><strong>📞 WhatsApp:</strong> +86 137 0000 0000</li>
            <li><strong>💬 WeChat:</strong> china-agent123</li>
            <li><strong>✉️ Email:</strong> china@sourcingagent.com</li>
          </ul>
        </div>
      </div>

      {/* Pakistan Office Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {/* Left - Image */}
        <div className="h-96 w-full">
          <img
            src="/img/photo-1622546758596-f1f06ba11f58.jpeg"
            alt="Pakistan Office"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right - Info */}
        <div className="bg-white p-10 flex flex-col justify-center shadow">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">🇵🇰 Pakistan Office</h2>
          <ul className="text-gray-700 space-y-3 text-lg">
            <li><strong>📍 Address:</strong> 123 Mall Road, Lahore, Pakistan</li>
            <li><strong>📞 WhatsApp:</strong> +92 300 1234567</li>
            <li><strong>💬 WeChat:</strong> pk-agent321</li>
            <li><strong>✉️ Email:</strong> lahore@sourcingagent.com</li>
          </ul>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          If you have any needs, you can submit them in the form below, and we will reply as soon as possible.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
              rows={4}
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
