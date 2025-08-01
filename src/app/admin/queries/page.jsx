'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

export default function QueriesPage() {
  const [contacts, setContacts] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        toast.error('Login required');
        router.push('/auth/login');
        return;
      }

      const token = await user.getIdTokenResult();
      if (token.claims.role !== 'admin') {
        toast.error('Access denied');
        router.push('/');
        return;
      }

      fetchContacts();
    });

    return () => unsub();
  }, []);

  const fetchContacts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'contacts'));
      const contactList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || new Date(),
      }));

      setContacts(contactList);
      prepareChart(contactList);
    } catch (err) {
      toast.error('Failed to fetch');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const prepareChart = (data) => {
    const monthlyCount = {};

    data.forEach((item) => {
      const date = new Date(item.timestamp);
      const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      monthlyCount[key] = (monthlyCount[key] || 0) + 1;
    });

    const sortedKeys = Object.keys(monthlyCount).sort();
    const formatted = sortedKeys.map((key) => ({
      month: key,
      queries: monthlyCount[key],
    }));

    setChartData(formatted);
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📈 Contact Queries Overview</h1>

      {/* Chart */}
      <div className="bg-white p-6 rounded shadow mb-10">
        <h2 className="text-lg font-semibold mb-4">Monthly Contact Queries</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="queries" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Query List */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Latest Contact Messages</h2>
        {loading ? (
          <p>Loading...</p>
        ) : contacts.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          <div className="space-y-4">
            {contacts.map((msg) => (
              <div key={msg.id} className="border p-4 rounded">
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Message:</strong> {msg.message}</p>
                <p className="text-sm text-gray-500">
                  {msg.timestamp.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
