"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t text-sm text-gray-600 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-3">Sourcing Agent</h2>
          <p className="leading-relaxed">
            Your trusted sourcing partner from China to the world. We deliver quality and reliability in every shipment.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
            </li>
            <li>
              <Link href="/sourcing" className="hover:text-blue-600 transition-colors">Source Products</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Account</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/auth/login" className="hover:text-blue-600 transition-colors">Login</Link>
            </li>
            <li>
              <Link href="/auth/signup" className="hover:text-blue-600 transition-colors">Sign Up</Link>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <p className="mb-2">
            Email:{" "}
            <a href="mailto:info@sourcingagent.com" className="text-blue-600 hover:underline">
              info@sourcingagent.com
            </a>
          </p>
          <p className="mb-4">Phone: +86 123 456 7890</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-600" aria-label="Facebook">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12.073C22 6.48 17.523 2 12 2S2 6.48 2 12.073c0 5.021 3.657 9.187 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.874h2.773l-.443 2.89h-2.33v6.987C18.343 21.26 22 17.094 22 12.073z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-blue-600" aria-label="LinkedIn">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14C2.69 0 2 .69 2 1.54v20.92C2 23.31 2.69 24 3.54 24h14.92c.85 0 1.54-.69 1.54-1.54V1.54C20.54.69 19.85 0 19 0zm-11.8 20.46H4.54V9h2.66v11.46zM6 7.66a1.54 1.54 0 1 1 0-3.08 1.54 1.54 0 0 1 0 3.08zm14.46 12.8h-2.66v-5.64c0-1.34-.02-3.06-1.86-3.06-1.86 0-2.14 1.45-2.14 2.95v5.75h-2.66V9h2.55v1.56h.04c.35-.66 1.22-1.35 2.51-1.35 2.69 0 3.18 1.77 3.18 4.07v7.18z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Sourcing Agent. All rights reserved.
      </div>
    </footer>
  );
}
