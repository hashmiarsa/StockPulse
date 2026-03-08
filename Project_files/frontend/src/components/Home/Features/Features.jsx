import React from 'react';

const Features = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width:'24px',height:'24px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Real Time Quotes",
      desc: "See the latest price changes in the markets and your investments powered by WebSockets.",
      color: "#00C805"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width:'24px',height:'24px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Industry Titans",
      desc: "Choose from a curated collection of the biggest names across all major industries.",
      color: "#0ea5e9"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width:'24px',height:'24px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Performance Insights",
      desc: "Track your portfolio performance in real time with numerical and visual feedback.",
      color: "#8b5cf6"
    }
  ];

  return (
    <>
      <style>{`
        .features-section {
          background: #f9fafb;
          padding: 80px 24px;
        }
        .features-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .features-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .features-label {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #00C805;
          margin-bottom: 12px;
        }
        .features-title {
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        .feature-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          border: 1px solid #f0f0f0;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--accent);
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
          border-color: transparent;
        }
        .feature-card:hover::before {
          transform: scaleX(1);
        }
        .feature-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .feature-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0a0a0a;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }
        .feature-desc {
          font-size: 0.9rem;
          color: #6b7280;
          line-height: 1.7;
        }
      `}</style>

      <section className="features-section">
        <div className="features-inner">
          <div className="features-header">
            <span className="features-label">Why StockPulse</span>
            <h2 className="features-title">Everything you need to<br />practice trading</h2>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card" style={{'--accent': f.color}}>
                <div className="feature-icon-wrap" style={{background: `${f.color}15`, color: f.color}}>
                  {f.icon}
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;
