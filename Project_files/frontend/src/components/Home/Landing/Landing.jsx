import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Stocks from '../../../assets/images/stocks.svg';

const Landing = () => {
  const [user,] = useState(JSON.parse(localStorage.getItem('profile')));

  return (
    <>
      <style>{`
        .landing-section {
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          align-items: center;
          padding-top: 60px;
          overflow: hidden;
          position: relative;
        }
        .landing-bg-circle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,200,5,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .landing-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 24px;
          display: flex;
          align-items: center;
          gap: 64px;
          width: 100%;
        }
        .landing-left {
          flex: 1;
          max-width: 520px;
        }
        .landing-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 20px;
          padding: 5px 14px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #16a34a;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .landing-eyebrow-dot {
          width: 6px;
          height: 6px;
          background: #00C805;
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .landing-heading {
          font-size: clamp(2.2rem, 5vw, 3.2rem);
          font-weight: 800;
          color: #0a0a0a;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
        }
        .landing-heading-green {
          color: #00C805;
        }
        .landing-subtext {
          font-size: 1rem;
          color: #6b7280;
          line-height: 1.7;
          max-width: 440px;
          margin-bottom: 36px;
        }
        .landing-subtext strong {
          color: #111827;
          font-weight: 600;
        }
        .landing-stats {
          display: flex;
          gap: 32px;
          margin-bottom: 36px;
          padding: 20px 0;
          border-top: 1px solid #f3f4f6;
          border-bottom: 1px solid #f3f4f6;
        }
        .landing-stat-item {
          display: flex;
          flex-direction: column;
        }
        .landing-stat-value {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
        }
        .landing-stat-label {
          font-size: 0.75rem;
          color: #9ca3af;
          font-weight: 500;
          margin-top: 2px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .landing-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #00C805;
          color: white;
          padding: 12px 28px;
          border-radius: 24px;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
          box-shadow: 0 4px 14px rgba(0,200,5,0.25);
        }
        .btn-primary:hover {
          background: #00b004;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,200,5,0.35);
          color: white;
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          color: #111827;
          padding: 12px 28px;
          border-radius: 24px;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.2s ease;
          border: 1.5px solid #e5e7eb;
          letter-spacing: 0.01em;
        }
        .btn-secondary:hover {
          background: #f9fafb;
          border-color: #d1d5db;
          transform: translateY(-2px);
          color: #111827;
        }
        .landing-right {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .landing-image-wrap {
          position: relative;
          width: 100%;
          max-width: 520px;
        }
        .landing-image-bg {
          position: absolute;
          inset: -20px;
          background: radial-gradient(circle at 60% 50%, rgba(0,200,5,0.08) 0%, transparent 70%);
          border-radius: 50%;
        }
        .landing-image {
          width: 100%;
          height: auto;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.08));
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .landing-badge {
          position: absolute;
          background: white;
          border-radius: 12px;
          padding: 10px 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.10);
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 2;
          animation: float-badge 4s ease-in-out infinite;
        }
        .landing-badge.badge-top {
          top: 15%;
          right: -10px;
          animation-delay: 1s;
        }
        .landing-badge.badge-bottom {
          bottom: 20%;
          left: -10px;
        }
        @keyframes float-badge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .badge-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        .badge-text-main {
          font-size: 0.85rem;
          font-weight: 700;
          color: #111827;
        }
        .badge-text-sub {
          font-size: 0.7rem;
          color: #9ca3af;
          font-weight: 500;
        }
        @media (max-width: 768px) {
          .landing-inner {
            flex-direction: column;
            padding: 60px 24px 40px;
            text-align: center;
          }
          .landing-left {
            max-width: 100%;
          }
          .landing-eyebrow {
            margin: 0 auto 24px;
          }
          .landing-subtext {
            margin: 0 auto 32px;
          }
          .landing-buttons {
            justify-content: center;
          }
          .landing-stats {
            justify-content: center;
          }
          .landing-badge { display: none; }
        }
      `}</style>

      <header className="landing-section">
        <div className="landing-bg-circle" style={{ width: '600px', height: '600px', top: '-100px', right: '-100px' }}></div>
        <div className="landing-bg-circle" style={{ width: '400px', height: '400px', bottom: '-50px', left: '-50px' }}></div>

        <div className="landing-inner">
          {/* Left Content */}
          <div className="landing-left">
            <div className="landing-eyebrow">
              <span className="landing-eyebrow-dot"></span>
              Simulated Trading Platform
            </div>

            <h1 className="landing-heading">
              {user?.result ? (
                <>Welcome back,<br /><span className="landing-heading-green">{String(user?.result.name).split(" ")[0]}.</span></>
              ) : (
                <>Invest without<br /><span className="landing-heading-green">the risk.</span></>
              )}
            </h1>

            <p className="landing-subtext">
              {user?.result ? <><strong>StockPulse</strong> — </> : ""}
              Start with <strong>$100,000</strong> in virtual currency and experience real market dynamics. Practice trading strategies without risking a single rupee.
            </p>

            <div className="landing-stats">
              <div className="landing-stat-item">
                <span className="landing-stat-value">$100K</span>
                <span className="landing-stat-label">Starting Balance</span>
              </div>
              <div className="landing-stat-item">
                <span className="landing-stat-value">50+</span>
                <span className="landing-stat-label">Stocks</span>
              </div>
              <div className="landing-stat-item">
                <span className="landing-stat-value">Live</span>
                <span className="landing-stat-label">Price Updates</span>
              </div>
            </div>

            <div className="landing-buttons">
              <Link to="/markets" className="btn-primary">
                Browse Markets
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              {!user?.result && (
                <Link to="/auth" className="btn-secondary">
                  Get Started Free
                </Link>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="landing-right">
            <div className="landing-image-wrap">
              <div className="landing-image-bg"></div>
              <img className="landing-image" src={Stocks} alt="stocks landing" />

              {/* Floating Badges */}
              <div className="landing-badge badge-top">
                <div className="badge-icon" style={{ background: '#f0fdf4' }}>📈</div>
                <div>
                  <div className="badge-text-main">+2.4%</div>
                  <div className="badge-text-sub">AAPL Today</div>
                </div>
              </div>

              <div className="landing-badge badge-bottom">
                <div className="badge-icon" style={{ background: '#fefce8' }}>💰</div>
                <div>
                  <div className="badge-text-main">$100,000</div>
                  <div className="badge-text-sub">Free to start</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Landing;
