import React, { useEffect, useState } from 'react';
import { getProfile, getBrands, getAlerts, addBrand, deleteBrand, markAlertRead } from '../services/api.ts';
import AlertCard from './AlertCard.tsx';

const Dashboard: React.FC<{ token: string }> = ({ token }) => {
  const [profile, setProfile] = useState<any>(null);
  const [brands, setBrands] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [brandName, setBrandName] = useState('');
  const [brandDomain, setBrandDomain] = useState('');
  const [brandError, setBrandError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profileRes, brandsRes, alertsRes] = await Promise.all([
        getProfile(token),
        getBrands(token),
        getAlerts(token)
      ]);
      setProfile(profileRes.data);
      setBrands(brandsRes.data);
      setAlerts(alertsRes.data);
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [token]);

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    setBrandError('');
    try {
      await addBrand(token, brandName, brandDomain);
      setBrandName('');
      setBrandDomain('');
      fetchData();
    } catch (err: any) {
      setBrandError(err.response?.data?.detail || 'Failed to add brand');
    }
  };

  const handleDeleteBrand = async (id: number) => {
    await deleteBrand(token, id);
    fetchData();
  };

  const handleMarkRead = async (id: number) => {
    await markAlertRead(token, id);
    fetchData();
  };

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {profile?.email}</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Brands</h2>
        <form onSubmit={handleAddBrand} className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Brand Name"
            value={brandName}
            onChange={e => setBrandName(e.target.value)}
            className="border p-2 rounded w-1/3"
            required
          />
          <input
            type="text"
            placeholder="Domain"
            value={brandDomain}
            onChange={e => setBrandDomain(e.target.value)}
            className="border p-2 rounded w-1/3"
            required
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
        </form>
        {brandError && <div className="text-red-500 mb-2 text-sm">{brandError}</div>}
        <ul className="list-disc ml-6">
          {brands.map(b => (
            <li key={b.id} className="flex items-center justify-between">
              <span>{b.name} ({b.domain})</span>
              <button
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={() => handleDeleteBrand(b.id)}
              >Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Alerts</h2>
        {alerts.length === 0 && <div className="text-gray-500">No alerts yet.</div>}
        {alerts.map(a => (
          <AlertCard key={a.id} alert={a} onMarkRead={handleMarkRead} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
