'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import HowItWorks from './components/HowItWorks';
import {
  FaProjectDiagram,
  FaSmile,
  FaTasks,
  FaUsers,
} from 'react-icons/fa';

export default function Home() {
  const stats = [
    { label: 'Projects Completed', value: 120, icon: <FaProjectDiagram size={36} className="text-blue-600" /> },
    { label: 'Happy Clients', value: 85, icon: <FaSmile size={36} className="text-blue-600" /> },
    { label: 'Ongoing Projects', value: 15, icon: <FaTasks size={36} className="text-blue-600" /> },
    { label: 'Team Members', value: 10, icon: <FaUsers size={36} className="text-blue-600" /> },
  ];

  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const Counter = ({ end }: { end: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!visible) return;
      let start = 0;
      const duration = 1500;
      const step = Math.ceil(end / (duration / 30));
      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(start);
        }
      }, 30);
      return () => clearInterval(interval);
    }, [visible, end]);

    return <span className="text-4xl font-bold text-blue-600">{count}+</span>;
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section with Animated Text */}
      <div className="text-center py-20 bg-blue-600 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-4"
        >
          Find the Best Products from China
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl"
        >
          We help you source high-quality products at the best prices.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100"
        >
          Get Started
        </motion.button>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Product Sourcing', 'Quality Assurance', 'Logistics Support'].map((title, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">{title}</h3>
              <p className="text-gray-700">
                {title === 'Product Sourcing' &&
                  'We find the best products for your business needs.'}
                {title === 'Quality Assurance' &&
                  'We ensure the products meet your quality standards.'}
                {title === 'Logistics Support' &&
                  'We handle shipping and delivery for you.'}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievement Counter Section */}
      <section ref={sectionRef} className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, type: 'spring', stiffness: 100 }}
                className="bg-gray-100 rounded-lg shadow p-6 flex flex-col items-center"
              >
                {stat.icon}
                <Counter end={hasAnimated ? stat.value : 0} />
                <p className="mt-2 text-gray-700 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <HowItWorks/>
    </main>
  );
}
