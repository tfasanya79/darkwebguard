import React, { useState } from 'react';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './components/Dashboard.tsx';
import Settings from './pages/Settings.tsx';
import AdminView from './pages/AdminView.tsx';
import Home from './pages/Home.tsx';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [view, setView] = useState<'dashboard' | 'settings' | 'admin'>('dashboard');

  if (!token) {
    if (showRegister) {
      return <Register onRegister={() => setShowRegister(false)} />;
    }
    return (
      <>
        <Home />
        <div className="fixed top-0 right-0 m-6 flex gap-2 z-50">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" onClick={() => setShowRegister(true)}>
            Register
          </button>
          <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded shadow" onClick={() => setShowRegister(false)}>
            Login
          </button>
        </div>
        {/* Show login modal if not registering */}
        {!showRegister && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-40">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96 max-w-full">
              <Login onLogin={setToken} />
            </div>
          </div>
        )}
      </>
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
