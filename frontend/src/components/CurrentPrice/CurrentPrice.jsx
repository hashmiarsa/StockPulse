import React, { useState, useEffect } from "react";

const CurrentPrice = (props) => {
  const { currentPrice, ticker, socket } = props;
  const [price, setPrice] = useState(parseFloat(currentPrice).toFixed(2));
  const [change, setChange] = useState(0.00);
  const [gain, setGain] = useState(true);

  useEffect(() => {
    let mounted = true;
    socket.on(ticker, data => {
      if (mounted) {
        let newPrice = parseFloat(data).toFixed(2);
        setChange(parseFloat(Math.abs((newPrice - price) / price) * 100).toFixed(2));
        if (parseFloat(newPrice) >= parseFloat(price)) {
          setGain(true);
        } else {
          setGain(false);
        }
        setPrice(newPrice);
      }
    });
    return () => { mounted = false; };
  }, [socket, ticker, price]);

  return (
    <>
      <style>{`
        .price-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.95rem;
        }
        .price-badge.up {
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        }
        .price-badge.down {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }
        .price-change {
          font-size: 0.72rem;
          font-weight: 600;
          opacity: 0.8;
        }
      `}</style>

      <span className={`price-badge ${gain ? 'up' : 'down'}`}>
        ${price}
        {change > 0 && (
          <span className="price-change">
            {gain ? '+' : '-'}{change}%
          </span>
        )}
      </span>
    </>
  );
}

export default CurrentPrice;
