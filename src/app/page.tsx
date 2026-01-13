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
    <main className="min-h-screen pt-14 bg-gray-100">
      {/* Hero Section with Animated Text */}
     <div
  className="relative bg-cover bg-center min-h-[50vh] md:min-h-[70vh]"
  style={{ backgroundImage: "url('/img/sq1.JPG')" }}
>
  {/* Orange gradient shadow (left side) */}
  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/80 via-orange-500/40 to-transparent"></div>

  {/* Content */}
  <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center pt-20 md:pt-28">
    <div className="w-full md:w-1/2 px-6 md:px-12 text-white flex flex-col gap-4 md:gap-6">
      
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold"
      >
        Find the Best Products from China
      </motion.h1>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[64px] sm:text-[80px] md:text-[120px] font-extrabold leading-none text-black/90"
      >
        2026
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg md:text-xl text-white"
      >
        We help you source high-quality products at the best prices.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        onClick={() => window.location.href = "/contact"}
        className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-black hover:text-white transition-colors duration-300 self-start"
      >
        Get Quote
      </motion.button>

    </div>
  </div>
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
      {/* Trusted Partners Section */}
<section className="bg-gray-50 py-14">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-4">Official Partner</h2>
    <p className="text-gray-600 mb-10">
      We work closely with China’s top B2B platforms to ensure reliable suppliers and competitive pricing.
    </p>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
      <motion.img
        src="/partner/Alibaba-Logo.png"
        alt="Alibaba"
  className="mx-auto h-20"
  whileHover={{ scale: 1.05 }}
      />
      <motion.img
        src="/partner/1688.png"
        alt="1688"
        className="mx-auto h-12  transition"
        whileHover={{ scale: 1.05 }}
      />
      <motion.img
        src="/partner/mdc.png"
        alt="Made in China"
        className="mx-auto h-12 transition"
        whileHover={{ scale: 1.05 }}
      />
      <motion.img
        src="/partner/44.jpg"
        alt="IQ Degital"
        className="mx-auto h-12  transition"
        whileHover={{ scale: 1.05 }}
      />
    </div>
  </div>
</section>

      <HowItWorks/>
    </main>
  );
}
