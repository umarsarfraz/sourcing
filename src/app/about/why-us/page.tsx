import { ShieldCheck, Globe, PackageCheck, Users, Handshake, PhoneCall } from 'lucide-react';

const features = [
  {
    title: "Direct Access to Factories",
    description: "Source directly from trusted Chinese manufacturers with no middlemen involved.",
    icon: ShieldCheck,
  },
  {
    title: "Global Shipping & Logistics",
    description: "We handle everything from production to doorstep delivery, including customs.",
    icon: Globe,
  },
  {
    title: "Product Sourcing & Inspection",
    description: "We find, verify, and inspect your products to ensure top-notch quality every time.",
    icon: PackageCheck,
  },
  {
    title: "Bilingual Team Support",
    description: "Our team in China and Pakistan ensures seamless communication and local presence.",
    icon: Users,
  },
  {
    title: "Low MOQ Support",
    description: "Start small and grow big — we help small businesses get off the ground.",
    icon: Handshake,
  },
  {
    title: "After-Sales Support",
    description: "We’re available before, during, and after your order. Real people. Real help.",
    icon: PhoneCall,
  },
];

export default function WhyUsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Why Choose ChinaProcure?</h1>
        <p className="text-lg text-gray-600">
          Your one-stop sourcing partner from China to your doorstep — transparent, reliable, and efficient.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-4">
              <feature.icon className="text-blue-600 w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to start sourcing with confidence?</h2>
        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
