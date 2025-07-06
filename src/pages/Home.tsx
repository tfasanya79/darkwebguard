import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center text-white">
      <header className="mb-12 flex flex-col items-center">
        <img src="/logo192.png" alt="DarkWebGuard Logo" className="w-24 h-24 mb-4 drop-shadow-lg" />
        <h1 className="text-5xl font-extrabold tracking-tight mb-2 text-blue-400 drop-shadow">DarkWebGuard</h1>
        <p className="text-lg max-w-xl text-center text-gray-200 mb-4">
          Proactive Dark Web Monitoring & Brand Protection. <br />
          Get real-time alerts for breaches, leaks, and threats targeting your business.
        </p>
        <a href="#get-started" className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold shadow-lg transition">Get Started</a>
      </header>
      <section className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" id="features">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <span className="text-4xl mb-2">🕵️‍♂️</span>
          <h2 className="font-bold text-xl mb-2 text-blue-300">Deep Web Scanning</h2>
          <p className="text-gray-300 text-center">Continuously scan forums, marketplaces, and hidden sites for your brand and assets.</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <span className="text-4xl mb-2">⚡</span>
          <h2 className="font-bold text-xl mb-2 text-blue-300">Instant Alerts</h2>
          <p className="text-gray-300 text-center">Receive instant notifications when your data or credentials are found on the dark web.</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <span className="text-4xl mb-2">🔒</span>
          <h2 className="font-bold text-xl mb-2 text-blue-300">Brand Protection</h2>
          <p className="text-gray-300 text-center">Safeguard your reputation and take action before threats escalate.</p>
        </div>
      </section>
      <section className="w-full flex flex-col items-center" id="get-started">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Start Protecting Your Brand Today</h2>
        <p className="text-gray-200 mb-6 max-w-xl text-center">
          Sign up for a free trial and experience the power of DarkWebGuard. Stay ahead of cybercriminals and keep your business secure.
        </p>
        <a href="/login" className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-full text-lg font-semibold shadow-lg transition">Sign Up / Login</a>
      </section>
      <footer className="mt-16 text-gray-500 text-sm text-center">
        &copy; {new Date().getFullYear()} DarkWebGuard. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
