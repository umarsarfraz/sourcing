'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { startOfMonth, endOfMonth, format } from 'date-fns';

export default function QueryChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'contacts'));
        const currentMonthStart = startOfMonth(new Date());
        const currentMonthEnd = endOfMonth(new Date());

        const dateCounts = {};

        snapshot.docs.forEach((doc) => {
          const ts = doc.data().timestamp;
          if (!ts) return;

          const date = ts.toDate();
          if (date >= currentMonthStart && date <= currentMonthEnd) {
            const formatted = format(date, 'yyyy-MM-dd');
            dateCounts[formatted] = (dateCounts[formatted] || 0) + 1;
          }
        });

        // Build array with all days of month
        const days = [];
        let d = new Date(currentMonthStart);
        while (d <= currentMonthEnd) {
          const key = format(d, 'yyyy-MM-dd');
          days.push({ date: key, count: dateCounts[key] || 0 });
          d.setDate(d.getDate() + 1);
        }

        setData(days);
      } catch (err) {
        console.error('Error loading chart data:', err);
      }
    };

    fetchQueries();
  }, []);

  return (
    <div className="bg-white shadow p-6 rounded mt-6">
      <h2 className="text-lg font-semibold mb-4">📊 Queries This Month</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
