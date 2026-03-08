import React from 'react';
import { Link } from 'react-router-dom';
import Step1 from '../../assets/images/step1.svg';
import Step2 from '../../assets/images/step2.svg';
import Step3 from '../../assets/images/step3.svg';
import Step4 from '../../assets/images/step4.svg';

const steps = [
  {
    number: "01",
    title: "Log Into StockPulse",
    desc: "Log in to your StockPulse account. If you don't have an account, you can create one for free and start with $100,000 in virtual currency.",
    cta: { label: "Login / Register", to: "/auth" },
    image: Step1,
    flip: false,
  },
  {
    number: "02",
    title: "Browse Stocks",
    desc: "Browse our collection of the biggest names in the industry. Search, filter, and sort to find the right company to invest in.",
    cta: { label: "Browse Markets", to: "/markets" },
    image: Step2,
    flip: true,
  },
  {
    number: "03",
    title: "Make a Transaction",
    desc: "Buy up to 100 shares with your virtual currency. Note that real-time price updates may affect the total cost of your transaction.",
    cta: null,
    image: Step3,
    flip: false,
  },
  {
    number: "04",
    title: "Sit Back and Invest",
    desc: "You're all set! Check your investments page to monitor profits and losses in real time, and sell your shares whenever you're ready.",
    cta: null,
    image: Step4,
    flip: true,
  },
];

const Guide = () => {
  return (
    <>
      <style>{`
        .guide-page {
          background: #f9fafb;
          min-height: 100vh;
          padding-top: 80px;
        }
        .guide-hero {
          background: white;
          text-align: center;
          padding: 64px 24px 56px;
          border-bottom: 1px solid #f0f0f0;
        }
        .guide-hero-label {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #00C805;
          margin-bottom: 16px;
        }
        .guide-hero-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
          line-height: 1.1;
        }
        .guide-hero-subtitle {
          font-size: 1rem;
          color: #9ca3af;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .guide-steps {
          max-width: 1100px;
          margin: 0 auto;
          padding: 64px 24px;
        }
        .guide-step {
          display: flex;
          align-items: center;
          gap: 64px;
          margin-bottom: 80px;
          background: white;
          border-radius: 20px;
          border: 1px solid #f0f0f0;
          padding: 48px;
          overflow: hidden;
        }
        .guide-step.flip { flex-direction: row-reverse; }
        .guide-step-left { flex: 1; }
        .guide-step-number {
          font-size: 4rem;
          font-weight: 900;
          color: #f3f4f6;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 8px;
        }
        .guide-step-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
          margin-bottom: 14px;
        }
        .guide-step-desc {
          font-size: 0.95rem;
          color: #6b7280;
          line-height: 1.75;
          max-width: 400px;
          margin-bottom: 24px;
        }
        .guide-step-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #00C805;
          color: white;
          padding: 11px 24px;
          border-radius: 22px;
          font-weight: 700;
          font-size: 0.875rem;
          text-decoration: none;
          transition: all 0.15s;
          box-shadow: 0 4px 12px rgba(0,200,5,0.2);
        }
        .guide-step-btn:hover {
          background: #00b004;
          transform: translateY(-1px);
          color: white;
        }
        .guide-step-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .guide-step-img {
          width: 100%;
          max-width: 340px;
          height: 240px;
          object-fit: contain;
          filter: drop-shadow(0 8px 24px rgba(0,0,0,0.06));
        }
        @media (max-width: 768px) {
          .guide-step, .guide-step.flip {
            flex-direction: column;
            padding: 32px 24px;
            gap: 32px;
          }
          .guide-step-number { font-size: 3rem; }
        }
      `}</style>

      <div className="guide-page">
        <div className="guide-hero">
          <span className="guide-hero-label">Getting Started</span>
          <h1 className="guide-hero-title">The Official<br />StockPulse Guide</h1>
          <p className="guide-hero-subtitle">Follow the steps below to get started with StockPulse and begin investing today.</p>
        </div>

        <div className="guide-steps">
          {steps.map((step, i) => (
            <div key={i} className={`guide-step ${step.flip ? 'flip' : ''}`}>
              <div className="guide-step-left">
                <div className="guide-step-number">{step.number}</div>
                <h2 className="guide-step-title">{step.title}</h2>
                <p className="guide-step-desc">{step.desc}</p>
                {step.cta && (
                  <Link to={step.cta.to} className="guide-step-btn">
                    {step.cta.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                )}
              </div>
              <div className="guide-step-right">
                <img className="guide-step-img" src={step.image} alt={`Step ${step.number}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Guide;
