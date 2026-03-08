import React from 'react';
import { Link } from "react-router-dom";
import CurrentPrice from "../CurrentPrice/CurrentPrice";
import PriceChart from "../PriceChart/PriceChart";

const StockCard = (props) => {
  const { socket, stock } = props;

  return (
    <>
      <style>{`
        .stock-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #f0f0f0;
          overflow: hidden;
          transition: all 0.2s ease;
          max-width: 300px;
          width: 100%;
          margin: 8px;
        }
        .stock-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
          border-color: transparent;
        }
        .stock-card-image-wrap {
          background: #f9fafb;
          padding: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 140px;
        }
        .stock-card-image {
          width: 72px;
          height: 72px;
          object-fit: contain;
          border-radius: 12px;
        }
        .stock-card-body { padding: 16px 20px; }
        .stock-card-name {
          font-size: 1rem;
          font-weight: 700;
          color: #0a0a0a;
          letter-spacing: -0.01em;
          margin-bottom: 2px;
        }
        .stock-card-ticker {
          font-size: 0.78rem;
          color: #9ca3af;
          font-weight: 500;
          margin-bottom: 14px;
        }
        .stock-card-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .stock-card-chart {
          height: 64px;
          overflow: hidden;
          position: relative;
          margin-bottom: 16px;
        }
        .stock-card-actions {
          display: flex;
          gap: 8px;
          padding: 0 20px 20px;
        }
        .stock-card-btn-buy {
          flex: 1;
          padding: 10px;
          background: #00C805;
          color: white;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          transition: background 0.15s;
        }
        .stock-card-btn-buy:hover { background: #00b004; color: white; }
        .stock-card-btn-details {
          flex: 1;
          padding: 10px;
          background: #f3f4f6;
          color: #374151;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          transition: background 0.15s;
        }
        .stock-card-btn-details:hover { background: #e5e7eb; color: #374151; }
      `}</style>

      <div className="stock-card">
        <Link to={`/stock/${stock._id}`} style={{textDecoration:'none'}}>
          <div className="stock-card-image-wrap">
            <img className="stock-card-image" src={stock.icon} alt={stock.name} />
          </div>
          <div className="stock-card-body">
            <div className="stock-card-name">{stock.name}</div>
            <div className="stock-card-ticker">{stock.exchange}:{stock.ticker}</div>
            <div className="stock-card-price-row">
              <CurrentPrice currentPrice={stock.currentPrice} ticker={stock.ticker} socket={socket} />
            </div>
            <div className="stock-card-chart" style={{height:'64px', overflow:'hidden'}}>
              <PriceChart id={stock.ticker} legendDisplay={false} xDisplay={false} yDisplay={false} socket={socket} ticker={stock.ticker} currPrice={stock.currentPrice} styleSet={"h-16 w-full"} />
            </div>
          </div>
        </Link>
        <div className="stock-card-actions">
          <Link to={`/transaction/${stock._id}`} className="stock-card-btn-buy">Buy</Link>
          <Link to={`/stock/${stock._id}`} className="stock-card-btn-details">Details</Link>
        </div>
      </div>
    </>
  );
}

export default StockCard;
