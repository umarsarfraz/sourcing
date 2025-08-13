'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          <Image
            src="/img/logo-img.jpg"
            alt="Logo"
            width={130}
            height={40}
            priority
          />
        </Link>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center text-gray-700 hover:text-blue-600">
              About Us <FaChevronDown className="ml-1 text-sm" />
            </button>
            {dropdownOpen && (
              <div className="absolute bg-white shadow-lg rounded-md mt-2 py-2 w-48 animate-fade-in-down z-40">
                <Link
                  href="/about/why-us"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Why ChinaProcure
                </Link>
                <Link
                  href="/about/faq"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  FAQ
                </Link>
              </div>
            )}
          </div>

          <Link href="/services" className="text-gray-700 hover:text-blue-600">Services</Link>
          <Link href="/products" className="text-gray-700 hover:text-blue-600">Trending Products</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>

          <span className="text-gray-300">|</span>

          <Link href="/auth/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          <Link
            href="/auth/signup"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-6 space-y-3 animate-fade-in-down">
          <Link href="/" className="block text-gray-700 hover:text-blue-600" onClick={() => setMobileOpen(false)}>
            Home
          </Link>

          {/* Click Dropdown in Mobile */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full text-left text-gray-700 hover:text-blue-600 flex justify-between items-center"
          >
            About Us <FaChevronDown className="ml-2" />
          </button>
          {dropdownOpen && (
            <div className="ml-4 space-y-2">
              <Link href="/about/why-us" className="block text-gray-600 hover:text-blue-600" onClick={() => setMobileOpen(false)}>
                Why ChinaProcure
              </Link>
              <Link href="/about/faq" className="block text-gray-600 hover:text-blue-600" onClick={() => setMobileOpen(false)}>
                FAQ
              </Link>
            </div>
          )}

          <Link href="/services" className="block text-gray-700 hover:text-blue-600" onClick={() => setMobileOpen(false)}>
            Services
          </Link>
          <Link href="/products" className="block text-gray-700 hover:text-blue-600" onClick={() => setMobileOpen(false)}>
            Trending Products
          </Link>
          
          <Link href="/contact" className="block text-gray-700 hover:text-blue-600" onClick={() => setMobileOpen(false)}>
            Contact
          </Link>
          <Link href="/auth/login" className="block text-gray-700 hover:text-blue-600" onClick={() => setMobileOpen(false)}>
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
            onClick={() => setMobileOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
