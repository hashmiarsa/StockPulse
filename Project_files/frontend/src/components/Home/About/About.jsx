import React from "react";
import Stonks from '../../../assets/images/stonks.webp';

const About = () => {
  return (
    <>
      <style>{`
        .about-section {
          background: white;
          padding: 80px 24px;
        }
        .about-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 64px;
        }
        .about-left { flex: 1; }
        .about-label {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #00C805;
          margin-bottom: 16px;
        }
        .about-title {
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .about-desc {
          font-size: 0.95rem;
          color: #6b7280;
          line-height: 1.8;
          max-width: 480px;
        }
        .about-stats {
          display: flex;
          gap: 32px;
          margin-top: 36px;
          padding-top: 36px;
          border-top: 1px solid #f3f4f6;
        }
        .about-stat-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
        }
        .about-stat-label {
          font-size: 0.78rem;
          color: #9ca3af;
          font-weight: 500;
          margin-top: 2px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .about-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }
        .about-image-wrap {
          position: relative;
          max-width: 480px;
          width: 100%;
        }
        .about-image-bg {
          position: absolute;
          inset: -16px;
          background: linear-gradient(135deg, rgba(0,200,5,0.06) 0%, rgba(14,165,233,0.06) 100%);
          border-radius: 24px;
        }
        .about-image {
          width: 100%;
          height: 280px;
          object-fit: cover;
          object-position: center;
          border-radius: 16px;
          position: relative;
          z-index: 1;
          box-shadow: 0 20px 40px rgba(0,0,0,0.10);
        }
        @media (max-width: 768px) {
          .about-inner { flex-direction: column; }
          .about-right { justify-content: center; }
          .about-stats { flex-wrap: wrap; gap: 20px; }
        }
      `}</style>

      <section className="about-section">
        <div className="about-inner">
          <div className="about-left">
            <span className="about-label">About Us</span>
            <h2 className="about-title">What is<br />StockPulse?</h2>
            <p className="about-desc">
              StockPulse is a trading platform simulation with real time quotes and investment monitoring. It is not a reflection of how real stock markets work — prices here are simulated and not reflective of the real world.
            </p>
            <div className="about-stats">
              <div>
                <div className="about-stat-value" style={{color: '#00C805'}}>$100K</div>
                <div className="about-stat-label">Virtual Balance</div>
              </div>
              <div>
                <div className="about-stat-value">50+</div>
                <div className="about-stat-label">Stocks</div>
              </div>
              <div>
                <div className="about-stat-value">Free</div>
                <div className="about-stat-label">Forever</div>
              </div>
            </div>
          </div>
          <div className="about-right">
            <div className="about-image-wrap">
              <div className="about-image-bg"></div>
              <img className="about-image" src={Stonks} alt="Stonks" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
