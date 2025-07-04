import React, { useState } from 'react';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './components/Dashboard.tsx';
import Settings from './pages/Settings.tsx';
import AdminView from './pages/AdminView.tsx';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [view, setView] = useState<'dashboard' | 'settings' | 'admin'>('dashboard');

  if (!token) {
    return showRegister ? (
      <Register onRegister={() => setShowRegister(false)} />
    ) : (
      <div>
        <Login onLogin={setToken} />
        <div className="text-center mt-4">
          <button className="text-blue-600 underline" onClick={() => setShowRegister(true)}>
            Don't have an account? Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="flex gap-4 p-4 bg-gray-200 mb-4">
        <button onClick={() => setView('dashboard')} className="font-semibold">Dashboard</button>
        <button onClick={() => setView('settings')} className="font-semibold">Settings</button>
        <button onClick={() => setView('admin')} className="font-semibold">Admin</button>
        <button onClick={() => setToken(null)} className="ml-auto text-red-600">Logout</button>
      </nav>
      {view === 'dashboard' && <Dashboard token={token} />}
      {view === 'settings' && <Settings token={token} />}
      {view === 'admin' && <AdminView token={token} />}
    </div>
  );
};

export default App;
