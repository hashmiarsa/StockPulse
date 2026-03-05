import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { getStock } from '../../actions/stocks';
import StockDetailsSkeleton from "./StockDetailsSkeleton";
import CurrentPrice from "../CurrentPrice/CurrentPrice";
import PriceChart from "../PriceChart/PriceChart";

const StockDetails = (props) => {
  const { id } = props;
  const socket = socketIOClient(process.env.REACT_APP_STOCKS_API, { transports: ['websocket', 'polling', 'flashsocket'] });
  const stock = useSelector((state) => state.stocksReducer);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getStock(id)); }, [dispatch, id]);
  useEffect(() => {
    socket.connect();
    return () => { socket.disconnect(); };
  }, [dispatch, socket]);

  const isUp = (stock?.currentPrice / stock?.initialPrice).toFixed(2) > 1;
  const changePct = stock ? Math.abs((1 - (stock.currentPrice / stock.initialPrice)) * 100).toFixed(2) : 0;

  return (
    !stock?._id ? <StockDetailsSkeleton /> :
    <>
      <style>{`
        .sd-page {
          background: #f9fafb;
          min-height: 100vh;
          padding-top: 80px;
        }
        .sd-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 24px;
        }
        .sd-back {
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
        .sd-back:hover { color: #0a0a0a; }
        .sd-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }
        .sd-logo-wrap {
          width: 56px;
          height: 56px;
          background: white;
          border-radius: 14px;
          border: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 8px;
        }
        .sd-logo { width: 40px; height: 40px; object-fit: contain; }
        .sd-company-name {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
        }
        .sd-ticker-badge {
          display: inline-flex;
          align-items: center;
          background: #f3f4f6;
          border-radius: 6px;
          padding: 3px 10px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #374151;
          letter-spacing: 0.04em;
          margin-top: 4px;
        }
        .sd-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 24px;
        }
        .sd-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #f0f0f0;
          padding: 28px;
        }
        .sd-price-section { margin-bottom: 24px; }
        .sd-price-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #9ca3af;
          margin-bottom: 8px;
        }
        .sd-change-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          margin-top: 8px;
        }
        .sd-change-up { background: #f0fdf4; color: #16a34a; }
        .sd-change-down { background: #fef2f2; color: #dc2626; }
        .sd-chart-section { margin-top: 20px; }
        .sd-chart-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #9ca3af;
          margin-bottom: 12px;
        }
        .sd-desc {
          font-size: 0.9rem;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .sd-info-list { margin-bottom: 24px; }
        .sd-info-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f9fafb;
          font-size: 0.875rem;
        }
        .sd-info-key { color: #9ca3af; font-weight: 500; }
        .sd-info-val { color: #0a0a0a; font-weight: 600; }
        .sd-actions { display: flex; flex-direction: column; gap: 10px; }
        .sd-btn-buy {
          width: 100%;
          padding: 14px;
          background: #00C805;
          color: white;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          transition: background 0.15s;
          display: block;
        }
        .sd-btn-buy:hover { background: #00b004; color: white; }
        .sd-btn-back {
          width: 100%;
          padding: 14px;
          background: #f3f4f6;
          color: #374151;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          transition: background 0.15s;
          display: block;
        }
        .sd-btn-back:hover { background: #e5e7eb; color: #374151; }
        .sd-website-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #00C805;
          font-weight: 600;
          text-decoration: none;
          margin-bottom: 20px;
        }
        .sd-website-link:hover { text-decoration: underline; }
        @media (max-width: 768px) {
          .sd-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="sd-page">
        <div className="sd-inner">
          <Link to="/markets" className="sd-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back to Markets
          </Link>

          <div className="sd-header">
            <div className="sd-logo-wrap">
              <img className="sd-logo" src={stock.icon} alt={stock.name} />
            </div>
            <div>
              <div className="sd-company-name">{stock.name}</div>
              <div className="sd-ticker-badge">{stock.exchange} · {stock.ticker}</div>
            </div>
          </div>

          <div className="sd-grid">
            {/* Left - Price & Chart */}
            <div className="sd-card">
              <div className="sd-price-section">
                <div className="sd-price-label">Current Price</div>
                <CurrentPrice currentPrice={stock.currentPrice} ticker={stock.ticker} socket={socket} />
                <div className={`sd-change-badge ${isUp ? 'sd-change-up' : 'sd-change-down'}`}>
                  {isUp ? '▲' : '▼'} {changePct}% all time
                </div>
              </div>
              <div className="sd-chart-section">
                <div className="sd-chart-label">Price Trend</div>
                <PriceChart id={stock.ticker} legendDisplay={false} xDisplay={false} yDisplay={false} socket={socket} ticker={stock.ticker} currPrice={stock.currentPrice} styleSet={"h-40 w-full"} />
              </div>
              <div style={{marginTop:'24px'}}>
                <div className="sd-price-label">About</div>
                <p className="sd-desc">{stock.description}</p>
              </div>
            </div>

            {/* Right - Info & Actions */}
            <div>
              <div className="sd-card" style={{marginBottom:'16px'}}>
                <div className="sd-info-list">
                  <div className="sd-info-item">
                    <span className="sd-info-key">Ticker</span>
                    <span className="sd-info-val">{stock.ticker}</span>
                  </div>
                  <div className="sd-info-item">
                    <span className="sd-info-key">Exchange</span>
                    <span className="sd-info-val">{stock.exchange}</span>
                  </div>
                  <div className="sd-info-item">
                    <span className="sd-info-key">IPO Date</span>
                    <span className="sd-info-val">{stock.ipoDate}</span>
                  </div>
                  <div className="sd-info-item">
                    <span className="sd-info-key">Industries</span>
                    <span className="sd-info-val">{stock.industries?.join(", ")}</span>
                  </div>
                  <div className="sd-info-item" style={{borderBottom:'none'}}>
                    <span className="sd-info-key">Initial Price</span>
                    <span className="sd-info-val">${stock.initialPrice?.toFixed(2)}</span>
                  </div>
                </div>
                <a href={stock.siteUrl} className="sd-website-link" target="_blank" rel="noopener noreferrer">
                  Visit Company Website
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                </a>
                <div className="sd-actions">
                  <Link to={`/transaction/${stock._id}`} className="sd-btn-buy">Buy Shares</Link>
                  <Link to="/markets" className="sd-btn-back">Back to Markets</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StockDetails;
