import React, { useState } from 'react';
import { getProfile } from '../services/api.ts';

const Settings: React.FC<{ token: string }> = ({ token }) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await getProfile(token);
        setProfile(res.data);
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  if (loading) return <div className="p-8">Loading settings...</div>;

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      <div className="mb-2">Email: <span className="font-mono">{profile?.email}</span></div>
      <div className="mb-2">Subscription: <span className="font-mono">{profile?.subscription_status}</span></div>
      <div className="mb-2">Role: <span className="font-mono">{profile?.is_admin ? 'Admin' : 'User'}</span></div>
      {/* Add more settings/actions here */}
    </div>
  );
};

export default Settings;
