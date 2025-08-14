'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

import ProductList from '../components/ProductList';
import QueryChart from '../components/QueryChart';
import AddProductModal from '../components/AddProductModal';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState('products');
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refreshProducts, setRefreshProducts] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        toast.error('Login required.');
        router.push('/auth/login');
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const data = userDoc.data();

      if (data?.role !== 'admin') {
        toast.error('Access denied.');
        router.push('/');
        return;
      }

      setIsAdmin(true);
      fetchContacts();
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchContacts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'contacts'));
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setContacts(items);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load contacts.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out!');
      router.push('/auth/login');
    } catch (err) {
      toast.error('Logout failed.');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-600">Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
      </header>

      {/* Navigation Tabs + Logout */}
      <nav className="bg-white px-6 shadow flex items-center justify-between">
        {/* Tabs */}
        <div className="flex space-x-4 py-3">
          <button
            className={`px-4 py-2 rounded ${
              tab === 'products' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'
            }`}
            onClick={() => setTab('products')}
          >
            Manage Products
          </button>
          <button
            className={`px-4 py-2 rounded ${
              tab === 'contacts' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'
            }`}
            onClick={() => setTab('contacts')}
          >
            User Queries
          </button>
          <button
            className={`px-4 py-2 rounded ${
              tab === 'analytics' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'
            }`}
            onClick={() => setTab('analytics')}
          >
            Analytics
          </button>
        </div>

        {/* Logout button aligned right */}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </nav>

      {/* Content */}
      <main className="p-6">
        {tab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">🛒 Manage Products</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                ➕ Add Product
              </button>
            </div>

            <ProductList
              onEdit={(product) => {
                toast(`Edit product: ${product.name}`);
              }}
              refresh={refreshProducts}
            />

            {showModal && (
              <AddProductModal
                onClose={() => setShowModal(false)}
                onAdd={() => {
                  toast.success('Product added!');
                  setRefreshProducts((prev) => !prev);
                  setShowModal(false);
                }}
              />
            )}
          </div>
        )}

        {tab === 'contacts' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">📬 User Queries</h2>
            {contacts.length === 0 ? (
              <p className="text-gray-600">No queries submitted yet.</p>
            ) : (
              <div className="grid gap-4">
                {contacts.map((q) => (
                  <div key={q.id} className="bg-white p-4 rounded shadow">
                    <p><strong>Name:</strong> {q.name}</p>
                    <p><strong>Email:</strong> {q.email}</p>
                    <p><strong>Message:</strong> {q.message}</p>
                    <p><strong>Time:</strong> {q.timestamp?.toDate().toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'analytics' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">📊 Monthly Query Analytics</h2>
            <QueryChart />
          </div>
        )}
      </main>
    </div>
  );
}
