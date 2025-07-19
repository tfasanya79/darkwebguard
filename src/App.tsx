import React from "react";
import "./App.css";

function App() {
  return (
    <div className="dwg-landing">
      <header className="dwg-header">
        <img
          src="/logo192.png"
          alt="DarkWebGuard Logo"
          className="dwg-logo"
        />
        <h1>Welcome to DarkWebGuard</h1>
        <p className="dwg-tagline">
          Proactive Dark Web Monitoring & Brand Protection
        </p>
        <a href="/login" className="dwg-cta">
          Get Started
        </a>
      </header>
      <main className="dwg-main">
        <section className="dwg-hero">
          <img
            src="https://cdn.pixabay.com/photo/2017/01/10/19/05/hacker-1971782_1280.jpg"
            alt="Cybersecurity Illustration"
            className="dwg-hero-img"
          />
          <div className="dwg-hero-text">
            <h2>Stay Ahead of Threats</h2>
            <p>
              DarkWebGuard continuously scans the dark web for leaked credentials, brand mentions, and threats targeting your business. Get instant alerts and actionable insights to protect your reputation and assets.
            </p>
          </div>
        </section>
        <section className="dwg-features">
          <h3>Why Choose DarkWebGuard?</h3>
          <ul>
            <li>⚡ Real-time dark web monitoring</li>
            <li>🔒 Secure, privacy-first platform</li>
            <li>📈 Actionable alerts and analytics</li>
            <li>🛡️ Brand and credential protection</li>
            <li>💡 Easy onboarding & intuitive dashboard</li>
          </ul>
        </section>
      </main>
      <footer className="dwg-footer">
        &copy; {new Date().getFullYear()} DarkWebGuard. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
