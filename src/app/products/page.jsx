'use client';

import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    };
    fetch();
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Trending Products</h1>
        <p className="text-center text-gray-600 mb-12">
          We can help source <strong>any product</strong> — but these are in high demand.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <img
                src={product.image}
                alt={product.name}
                className="rounded mb-3 h-72 w-full object-cover"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
          ))} 
        </div>

        {/* New Section Below Products */}
        <div className="mt-16 text-center bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Looking for something else?</h2>
          <p className="text-gray-700 mb-4">
            We can hunt for <strong>any product</strong> you need from China. 
            Just tell us what you're looking for, and we’ll help you find it.
          </p>
          <a
  href="https://wa.me/8613071024812?text=Hi%2C%20I%27m%20interested%20in%20your%20services"
  target="_blank"
  rel="noopener noreferrer"
>
  <button className="mt-2 px-6 py-2 bg-[#69C9D0] text-white font-semibold rounded hover:bg-[#4da6b0] transition">
    Submit Your Request
  </button>
</a>
        </div>
      </div>
    </main>
  );
}
