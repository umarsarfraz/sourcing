'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import AddProductModal from '../../components/AddProductModal';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      const token = await user.getIdTokenResult();
      if (token.claims.role !== 'admin') {
        toast.error('Access denied');
        router.push('/');
        return;
      }

      fetchProducts();
    });

    return () => unsub();
  }, []);

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, 'products'));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(list);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), {
          ...form,
          price: parseFloat(form.price),
        });
        toast.success('Product updated');
        setEditingId(null);
        setForm({ name: '', description: '', price: '' });
        fetchProducts();
      }
    } catch (err) {
      toast.error('Update failed');
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error('Delete failed');
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🛒 Manage Products</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Add Product
        </button>
      </div>

      {/* Edit Form (if editing) */}
      {editingId && (
        <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded mb-10 space-y-4">
          <h2 className="text-lg font-semibold">Edit Product</h2>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Product
          </button>
        </form>
      )}

      {/* Product List */}
      <div className="bg-white shadow p-6 rounded space-y-4">
        <h2 className="text-lg font-semibold mb-4">All Products</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((prod) => (
            <div
              key={prod.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{prod.name}</h3>
                <p>{prod.description}</p>
                <p className="text-blue-600 font-semibold">${prod.price}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(prod)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prod.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onAdd={fetchProducts}
        />
      )}
    </div>
  );
}
