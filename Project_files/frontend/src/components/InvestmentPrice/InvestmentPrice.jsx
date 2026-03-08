import React, { useState, useEffect } from "react";

const InvestmentPrice = (props) => {
  const { socket, shares, ticker, initialInvestment } = props;
  const [price, setPrice] = useState(initialInvestment);

  useEffect(() => {
    let mounted = true;
    socket.on(ticker, data => {
      if (mounted) setPrice(data);
    });
    return () => { mounted = false; };
  }, [socket, ticker]);

  const gain = (parseFloat(price * shares).toFixed(2) - parseFloat(initialInvestment).toFixed(2)) > 0;
  const value = parseFloat(shares * price).toFixed(2);
  const diff = (parseFloat(price * shares).toFixed(2) - parseFloat(initialInvestment).toFixed(2)).toFixed(2);

  return (
    <>
      <style>{`
        .inv-price-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .inv-price-badge.up {
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        }
        .inv-price-badge.down {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }
        .inv-price-diff {
          font-size: 0.72rem;
          font-weight: 600;
          opacity: 0.75;
        }
      `}</style>

      <span className={`inv-price-badge ${gain ? 'up' : 'down'}`}>
        ${value}
        <span className="inv-price-diff">
          {gain ? '+' : ''}{diff}
        </span>
      </span>
    </>
  );
}

export default InvestmentPrice;
