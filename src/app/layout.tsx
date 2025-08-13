import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sourcing Agent",
  description: "Find and source the best products from China",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    style: {
      fontSize: '18px',       // 👈 Larger font
      padding: '16px 24px',   // 👈 Bigger padding
      borderRadius: '12px',
    },
    duration: 4000,           // Optional: how long toast shows
  }}
/>

        <Navbar /> {/* ✅ Navbar at top */}
        <main className="pt-18 min-h-screen bg-gray-50">{children}</main>
        <Footer /> {/* ✅ Footer at bottom */}
      </body>
    </html>
  );
}
