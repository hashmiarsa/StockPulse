import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import { getStock } from '../../actions/stocks';
import { getPurchase } from '../../actions/purchased';
import { useParams } from "react-router";
import CurrentPrice from "../CurrentPrice/CurrentPrice";
import InvestmentPrice from "../InvestmentPrice/InvestmentPrice";
import PurchasedStockDetailsSkeleton from "./PurchasedStockDetailsSkeleton";

const PurchasedStockDetails = (props) => {
  const socket = socketIOClient(process.env.REACT_APP_STOCKS_API, { transports: ['websocket', 'polling', 'flashsocket'] });
  const purchase = useSelector((state) => state.purchasedReducer);
  const stock = useSelector((state) => state.stocksReducer);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => { dispatch(getPurchase(id)); }, [dispatch, id]);
  useEffect(() => { dispatch(getStock(id)); }, [dispatch, id]);
  useEffect(() => {
    socket.connect();
    return () => { socket.disconnect(); };
  }, [dispatch, socket]);

  const isUp = (stock?.currentPrice / stock?.initialPrice).toFixed(2) > 1;
  const changePct = stock ? Math.abs((1 - (stock.currentPrice / stock.initialPrice)) * 100).toFixed(2) : 0;

  return (
    !purchase?._id || !stock?._id ? <PurchasedStockDetailsSkeleton /> :
    <>
      <style>{`
        .psd-page {
          background: #f9fafb;
          min-height: 100vh;
          padding-top: 80px;
        }
        .psd-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 24px;
        }
        .psd-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: #6b7280;
          font-weight: 500;
          text-decoration: none;
          margin-bottom: 28px;
          transition: color 0.15s;
        }
        .psd-back:hover { color: #0a0a0a; }
        .psd-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
          align-items: start;
        }
        .psd-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #f0f0f0;
          padding: 28px;
        }
        .psd-heading {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .psd-heading span { color: #00C805; }
        .psd-desc {
          font-size: 0.9rem;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 28px;
        }
        .psd-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        .psd-stat-box {
          background: #f9fafb;
          border-radius: 12px;
          padding: 16px 20px;
          border: 1px solid #f0f0f0;
        }
        .psd-stat-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #9ca3af;
          margin-bottom: 10px;
        }
        .psd-stat-plain {
          font-size: 1rem;
          font-weight: 700;
          color: #0a0a0a;
        }
        .psd-hash {
          font-size: 0.72rem;
          font-weight: 600;
          color: #6b7280;
          font-family: monospace;
          background: #f3f4f6;
          padding: 4px 8px;
          border-radius: 6px;
          word-break: break-all;
        }
        .psd-notice {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 10px;
          padding: 14px 16px;
          cursor: pointer;
          transition: background 0.15s;
          margin-top: 20px;
        }
        .psd-notice:hover { background: #dbeafe; }
        .psd-notice-icon {
          width: 30px; height: 30px;
          background: #3b82f6;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: white;
        }
        .psd-notice-title { font-size: 0.85rem; font-weight: 700; color: #1d4ed8; margin-bottom: 2px; }
        .psd-notice-text { font-size: 0.78rem; color: #3b82f6; line-height: 1.5; }
        .psd-right-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #f0f0f0;
          overflow: hidden;
        }
        .psd-stock-img {
          width: 100%;
          height: 160px;
          object-fit: contain;
          padding: 28px;
          background: #f9fafb;
        }
        .psd-stock-body { padding: 20px 24px; }
        .psd-stock-name {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.01em;
          margin-bottom: 4px;
        }
        .psd-stock-ticker {
          font-size: 0.78rem;
          color: #9ca3af;
          font-weight: 500;
          margin-bottom: 20px;
        }
        .psd-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f9fafb;
          font-size: 0.875rem;
        }
        .psd-price-row:last-of-type { border-bottom: none; }
        .psd-price-key { color: #9ca3af; font-weight: 500; }
        .psd-trend-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 700;
        }
        .psd-trend-up { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
        .psd-trend-down { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
        .psd-actions { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
        .psd-btn-buy {
          display: block; width: 100%; padding: 13px;
          background: #00C805; color: white;
          border-radius: 10px; font-size: 0.9rem; font-weight: 700;
          text-align: center; text-decoration: none; transition: background 0.15s;
        }
        .psd-btn-buy:hover { background: #00b004; color: white; }
        .psd-btn-details {
          display: block; width: 100%; padding: 13px;
          background: #f3f4f6; color: #374151;
          border-radius: 10px; font-size: 0.9rem; font-weight: 700;
          text-align: center; text-decoration: none; transition: background 0.15s;
        }
        .psd-btn-details:hover { background: #e5e7eb; color: #374151; }
        @media (max-width: 768px) {
          .psd-grid { grid-template-columns: 1fr; }
          .psd-stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="psd-page">
        <div className="psd-inner">
          <Link to="/purchased" className="psd-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back to Investments
          </Link>

          <div className="psd-grid">
            {/* Left */}
            <div className="psd-card">
              <h1 className="psd-heading">
                Investing {purchase.shares} {purchase.shares === 1 ? 'share' : 'shares'} in{' '}
                <span>{stock.exchange} : {purchase.tickerBought}</span>.
              </h1>
              <p className="psd-desc">{stock.description}</p>

              <div className="psd-stats-grid">
                <div className="psd-stat-box">
                  <div className="psd-stat-label">Initial Investment</div>
                  <div style={{display:'inline-flex', alignItems:'center', gap:'6px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:'20px', padding:'5px 12px'}}>
                    <span style={{fontSize:'0.95rem', fontWeight:'700', color:'#1d4ed8'}}>${parseFloat(purchase.initialInvestment).toFixed(2)}</span>
                  </div>
                </div>

                <div className="psd-stat-box">
                  <div className="psd-stat-label">Shares Bought</div>
                  <div className="psd-stat-plain">{purchase.shares} shares</div>
                </div>

                <div className="psd-stat-box">
                  <div className="psd-stat-label">Total Value</div>
                  <InvestmentPrice shares={purchase.shares} ticker={purchase.tickerBought} initialInvestment={purchase.initialInvestment} socket={socket} />
                </div>

                <div className="psd-stat-box">
                  <div className="psd-stat-label">Purchase Hash</div>
                  <div className="psd-hash">#{purchase.stock}</div>
                </div>
              </div>

              {state && (
                <div className="psd-notice" onClick={() => { window.history.replaceState({}, document.title); window.location.reload(); }}>
                  <div className="psd-notice-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </div>
                  <div>
                    <div className="psd-notice-title">Funds Updating</div>
                    <div className="psd-notice-text">Looks like you just bought / updated this investment. Click here to refresh the balance in the top bar.</div>
                  </div>
                </div>
              )}
            </div>

            {/* Right */}
            <div className="psd-right-card">
              <img className="psd-stock-img" src={stock.icon} alt={stock.name} />
              <div className="psd-stock-body">
                <div className="psd-stock-name">{stock.name}</div>
                <div className="psd-stock-ticker">{stock.exchange} · {stock.ticker}</div>

                <div className="psd-price-row">
                  <span className="psd-price-key">Current Price</span>
                  <CurrentPrice currentPrice={stock.currentPrice} ticker={stock.ticker} socket={socket} />
                </div>
                <div className="psd-price-row">
                  <span className="psd-price-key">All Time Trend</span>
                  <span className={`psd-trend-badge ${isUp ? 'psd-trend-up' : 'psd-trend-down'}`}>
                    {isUp ? '▲' : '▼'} {changePct}%
                  </span>
                </div>

                <div className="psd-actions">
                  <Link to={`/transaction/${stock._id}`} className="psd-btn-buy">Buy / Sell Shares</Link>
                  <Link to={`/stock/${stock._id}`} className="psd-btn-details">Stock Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PurchasedStockDetails;
