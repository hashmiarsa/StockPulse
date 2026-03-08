import React from 'react';
import { useLocation } from 'react-router-dom';

const PurchaseOverview = (props) => {
  const { purchases } = props;
  const { state } = useLocation();

  return (
    <>
      <style>{`
        .po-wrap {
          padding: 32px 32px 24px;
          border-bottom: 1px solid #f0f0f0;
          background: white;
        }
        .po-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .po-left {}
        .po-count {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .po-count span { color: #00C805; }
        .po-subtitle {
          font-size: 0.875rem;
          color: #9ca3af;
        }
        .po-stats {
          display: flex;
          gap: 32px;
        }
        .po-stat-value {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.01em;
        }
        .po-stat-label {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #9ca3af;
          margin-top: 2px;
        }
        .po-notice {
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 10px;
          padding: 12px 16px;
          cursor: pointer;
          transition: background 0.15s;
          max-width: 520px;
        }
        .po-notice:hover { background: #dbeafe; }
        .po-notice-icon {
          width: 32px;
          height: 32px;
          background: #3b82f6;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
        }
        .po-notice-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #1d4ed8;
          margin-bottom: 2px;
        }
        .po-notice-text {
          font-size: 0.78rem;
          color: #3b82f6;
          line-height: 1.5;
        }
      `}</style>

      <div className="po-wrap">
        <div className="po-top">
          <div className="po-left">
            <div className="po-count">
              You have <span>{purchases.length}</span> {purchases.length === 1 ? 'investment' : 'investments'}.
            </div>
            <div className="po-subtitle">See the stocks you bought below.</div>
          </div>
          <div className="po-stats">
            <div>
              <div className="po-stat-value">{purchases.length}</div>
              <div className="po-stat-label">Holdings</div>
            </div>
            <div>
              <div className="po-stat-value" style={{color:'#00C805'}}>Live</div>
              <div className="po-stat-label">Prices</div>
            </div>
          </div>
        </div>

        {state && (
          <div
            className="po-notice"
            onClick={() => { window.history.replaceState({}, document.title); window.location.reload(); }}
          >
            <div className="po-notice-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div>
              <div className="po-notice-title">Investment Sold</div>
              <div className="po-notice-text">Your funds may not be updated yet. Click here to refresh the balance in the top bar.</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PurchaseOverview;
