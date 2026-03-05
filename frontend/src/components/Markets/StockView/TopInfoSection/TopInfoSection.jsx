import React from 'react';

const TopInfoSection = (props) => {
  const { count } = props;
  return (
    <>
      <style>{`
        .tis-wrap {
          background: white;
          border-radius: 16px;
          border: 1px solid #f0f0f0;
          padding: 28px 32px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .tis-left {}
        .tis-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .tis-subtitle {
          font-size: 0.875rem;
          color: #9ca3af;
          font-weight: 500;
        }
        .tis-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .tis-stat {
          text-align: center;
        }
        .tis-stat-value {
          font-size: 1.4rem;
          font-weight: 800;
          color: #00C805;
          letter-spacing: -0.02em;
        }
        .tis-stat-label {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #9ca3af;
          margin-top: 2px;
        }
        .tis-divider {
          width: 1px;
          height: 36px;
          background: #f0f0f0;
        }
        @media (max-width: 640px) {
          .tis-wrap { flex-direction: column; align-items: flex-start; }
          .tis-right { width: 100%; justify-content: flex-start; }
        }
      `}</style>

      <div className="tis-wrap">
        <div className="tis-left">
          <div className="tis-title">Browse our stocks</div>
          <div className="tis-subtitle">The biggest names in the industry, all in one place</div>
        </div>
        <div className="tis-right">
          <div className="tis-stat">
            <div className="tis-stat-value">{count}</div>
            <div className="tis-stat-label">Stocks</div>
          </div>
          <div className="tis-divider"></div>
          <div className="tis-stat">
            <div className="tis-stat-value">Live</div>
            <div className="tis-stat-label">Prices</div>
          </div>
          <div className="tis-divider"></div>
          <div className="tis-stat">
            <div className="tis-stat-value">Free</div>
            <div className="tis-stat-label">To Trade</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopInfoSection;
