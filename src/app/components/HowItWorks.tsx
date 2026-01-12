'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const steps = [
  {
    number: '01',
    title: 'SUBMIT INQUIRY',
    image: '/how/1.jpg',
    description:
      'Reach out via our form or WhatsApp. We quickly understand your sourcing needs and start helping.',
  },
  {
    number: '02',
    title: 'CHOOSE PRODUCTS & BRANDING',
    image: '/how/2.jpg',
    description:
      'Explore our catalog or share your branding. We help customize your product selection.',
  },
  {
    number: '03',
    title: 'CONFIRM ORDER & TIMELINE',
    image: '/how/3.jpg',
    description:
      'Confirm details and timeline. We begin sourcing and production after your approval.',
  },
  {
    number: '04',
    title: 'DELIVERY TO YOUR DOORSTEP',
    image: '/how/4.jpg',
    description:
      'We handle logistics. Your goods are delivered to your location ready for business.',
  },
];

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="px-4 py-16 space-y-12">
      {/* Heading */}
      <h2 className="text-center text-3xl font-bold uppercase text-green-800">How It Works</h2>

      {/* Desktop view */}
      <div className="md:flex gap-6 justify-center hidden">
        {steps.map((step, idx) => {
          const isHovered = hoveredIndex === idx;
          const isActive = activeIndex === idx || hoveredIndex === idx;

          return (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-hovered={isHovered ? 'true' : 'false'} // ✅ used here to avoid unused warning
              className={clsx(
                'relative border border-[#C9A66B] rounded-[50px] overflow-hidden flex flex-col justify-start items-center cursor-pointer transition-all duration-300 ease-in-out',
                isActive ? 'bg-[#F7F2E9] w-[500px]' : 'bg-white w-[130px]',
                'h-[500px]'
              )}
            >
              {/* Number */}
              {!isActive && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xl text-[#C9A66B]">
                  {step.number}
                </div>
              )}

              {/* Vertical title */}
              {!isActive && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rotate-180 writing-vertical text-green-700 font-bold text-sm uppercase text-center">
                  {step.title}
                </div>
              )}

              {/* Expanded View */}
              {isActive && (
                <div className="p-8 pt-16 text-left flex flex-col items-start w-full h-full">
                  <div className="text-xl text-[#C9A66B] mb-2">{step.number}</div>
                  <h4 className="text-lg font-bold text-green-800 uppercase mb-4">{step.title}</h4>
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={500}
                    height={160}
                    className="rounded-lg mb-4 w-full h-auto object-cover"
                  />
                  <p className="text-gray-700 text-sm">{step.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex flex-col gap-6">
        {steps.map((step, idx) => {
          const isActive = activeIndex === idx;

          return (
            <div
              key={idx}
              className={clsx(
                'w-full border border-[#C9A66B] rounded-[50px] transition-all duration-300 bg-white overflow-hidden',
                isActive && 'bg-[#F7F2E9]'
              )}
              onClick={() => setActiveIndex(idx === activeIndex ? null : idx)}
            >
              <div className="p-6">
                {/* Number on left, title center */}
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xl text-[#C9A66B] w-1/5">{step.number}</div>
                  <div className="w-4/5 text-center text-green-800 font-bold uppercase text-sm">
                    {step.title}
                  </div>
                </div>

                {isActive && (
                  <div className="mt-6">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={500}
                      height={300}
                      className="w-full rounded mb-4 object-cover"
                    />
                    <p className="text-sm text-gray-700">{step.description}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
  <a
    href="https://wa.me/8613071024812?text=Hi%2C%20I%27m%20interested%20in%20your%20services"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300 text-center"
  >
    Contact Us on WhatsApp
  </a>
</div>

    </div>
  );
}
