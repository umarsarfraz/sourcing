'use client';

import { useEffect, useState } from 'react';
import { db } from '../lib/firebase'; // adjust if needed
import { collection, getDocs } from 'firebase/firestore';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Trending Products</h1>
        <p className="text-center text-gray-600 mb-12">
          We help source <strong>any product</strong> — here are some trending items right now.
        </p>

        {loading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500">No products available yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
              >
                <div className="h-48 w-full mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.image || '/placeholder.png'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
