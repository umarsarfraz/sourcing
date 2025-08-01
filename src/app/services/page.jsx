// src/app/services/page.jsx
export default function ServicesPage() {
  const services = [
    {
      title: "✅ DDP Shipping",
      description:
        "Hassle-free door-to-door delivery from China to your location. Customs, taxes, and shipping – all handled by us.",
      imageAlt: "DDP Shipping",
    },
    {
      title: "🕵️ Supplier Verification",
      description:
        "We thoroughly vet and verify suppliers to ensure product quality, legitimacy, and smooth communication.",
      imageAlt: "Supplier Verification",
    },
    {
      title: "🏬 Product Sourcing",
      description:
        "Tell us what you need — we’ll hunt the best suppliers in China with competitive pricing and high quality.",
      imageAlt: "Product Sourcing",
    },
    {
      title: "📦 Warehousing & Fulfillment",
      description:
        "Store your inventory in our China warehouse and ship globally on demand — fast, secure, and trackable.",
      imageAlt: "Warehousing",
    },
    {
      title: "📸 Product Photography & Inspection",
      description:
        "Professional product images and detailed quality checks before your products leave China.",
      imageAlt: "Photography and Inspection",
    },
    {
      title: "💬 One-on-one Support",
      description:
        "Speak directly with our sourcing experts via WhatsApp, email, or chat — no bots, just real people.",
      imageAlt: "Customer Support",
    },
  ];

  return (
    <div className="bg-white py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
        Our Services
      </h1>

      <div className="grid gap-12 md:grid-cols-2">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-xl overflow-hidden">
                {/* Replace this with an image later */}
                <div className="w-full h-full flex items-center justify-center text-2xl">
                  📦
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-20">
        <a
          href="https://wa.me/YOUR_NUMBER"
          target="_blank"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition"
        >
          Get in Touch on WhatsApp
        </a>
      </div>
    </div>
  );
}
