import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api.ts';

const AdminView: React.FC<{ token: string }> = ({ token }) => {
  const [profile, setProfile] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const profileRes = await getProfile(token);
        setProfile(profileRes.data);
        if (profileRes.data.is_admin) {
          const usersRes = await fetch('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } });
          const alertsRes = await fetch('/api/admin/alerts', { headers: { Authorization: `Bearer ${token}` } });
          setUsers(await usersRes.json());
          setAlerts(await alertsRes.json());
        }
      } catch {}
      setLoading(false);
    };
    fetchData();
  }, [token]);

  if (loading) return <div className="p-8">Loading admin view...</div>;
  if (!profile?.is_admin) return null;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">All Users</h3>
        <ul className="list-disc ml-6">
          {users.map(u => (
            <li key={u.id}>{u.email} ({u.subscription_status})</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">All Alerts</h3>
        <ul className="list-disc ml-6">
          {alerts.map(a => (
            <li key={a.id}>[{a.brand}] {a.message} (Source: {a.source}, Risk: {a.risk_score})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminView;
