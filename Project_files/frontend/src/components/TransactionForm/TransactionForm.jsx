import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";
import { getStock } from '../../actions/stocks';
import { getUserInfo } from "../../actions/auth";
import { getPurchase, addPurchase, updatePurchase, removePurchase } from '../../actions/purchased';
import { PURCHASED_ERROR_OCCURRED } from "../../constants/actions";

const initialState = { stockId: null, sharesBought: 0 };

const TransactionForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const stock = useSelector((state) => state.stocksReducer);
  const purchase = useSelector((state) => state.purchasedReducer);
  const errors = useSelector((state) => state.purchasedErrorsReducer);
  const [form, setForm] = useState(initialState);
  const [isSell, setIsSell] = useState(false);
  const [shares, setShares] = useState(0);

  useEffect(() => {
    dispatch({ type: PURCHASED_ERROR_OCCURRED, payload: "" });
    return () => { dispatch({ type: PURCHASED_ERROR_OCCURRED, payload: "" }); };
  }, [dispatch]);

  useEffect(() => { dispatch(getStock(id)); }, [id, dispatch]);
  useEffect(() => { dispatch(getPurchase(id)); }, [dispatch, id]);

  const handleSubmitNewPurchase = (e) => {
    e.preventDefault();
    dispatch({ type: PURCHASED_ERROR_OCCURRED, payload: "" });
    dispatch(addPurchase(form, history));
    dispatch(getUserInfo());
  };

  const handleSubmitUpdatePurchase = (e) => {
    e.preventDefault();
    dispatch({ type: PURCHASED_ERROR_OCCURRED, payload: "" });
    if (isSell) {
      dispatch(removePurchase(id, history));
    } else {
      dispatch(updatePurchase(id, form, history, shares, purchase.shares));
    }
    dispatch(getUserInfo());
  };

  const handleChange = (e) => {
    setShares(e.target.value === "" ? 0 : e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value, stockId: id });
  };

  const totalCost = parseFloat(shares * (stock?.currentPrice || 0)).toFixed(2);
  const isSelling = shares < 0;

  if (!stock || purchase?.length === 0) {
    return (
      <>
        <style>{`
          .tx-error-page {
            min-height: 100vh;
            background: #f9fafb;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 80px;
          }
          .tx-error-card {
            background: white;
            border-radius: 20px;
            border: 1px solid #f0f0f0;
            padding: 48px;
            text-align: center;
            max-width: 480px;
          }
          .tx-error-icon {
            width: 56px; height: 56px;
            background: #fef2f2;
            border-radius: 14px;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 20px;
            color: #dc2626;
          }
          .tx-error-title { font-size: 1.3rem; font-weight: 800; color: #0a0a0a; margin-bottom: 8px; }
          .tx-error-sub { font-size: 0.875rem; color: #9ca3af; margin-bottom: 24px; }
          .tx-error-btn {
            display: inline-block;
            padding: 12px 28px;
            background: #00C805;
            color: white;
            border-radius: 10px;
            font-weight: 700;
            font-size: 0.9rem;
            text-decoration: none;
          }
        `}</style>
        <div className="tx-error-page">
          <div className="tx-error-card">
            <div className="tx-error-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div className="tx-error-title">Invalid Transaction</div>
            <div className="tx-error-sub">This transaction path doesn't exist or has expired.</div>
            <Link to="/" className="tx-error-btn">Back to Home</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .tx-page {
          min-height: 100vh;
          background: #f9fafb;
          padding-top: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 40px;
        }
        .tx-card {
          background: white;
          border-radius: 20px;
          border: 1px solid #f0f0f0;
          width: 100%;
          max-width: 480px;
          margin: 0 24px;
          overflow: hidden;
        }
        .tx-header {
          padding: 28px 28px 0;
          border-bottom: 1px solid #f9fafb;
          margin-bottom: 24px;
        }
        .tx-stock-info {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }
        .tx-stock-logo {
          width: 44px; height: 44px;
          background: #f9fafb;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; padding: 6px;
        }
        .tx-stock-logo img { width: 100%; height: 100%; object-fit: contain; }
        .tx-stock-name { font-size: 1rem; font-weight: 700; color: #0a0a0a; }
        .tx-stock-ticker { font-size: 0.78rem; color: #9ca3af; font-weight: 500; }
        .tx-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }
        .tx-subtitle { font-size: 0.85rem; color: #9ca3af; margin-bottom: 24px; }
        .tx-body { padding: 0 28px 28px; }
        .tx-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .tx-stat {
          background: #f9fafb;
          border-radius: 12px;
          padding: 14px 12px;
          text-align: center;
        }
        .tx-stat-value {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.01em;
        }
        .tx-stat-label {
          font-size: 0.72rem;
          color: #9ca3af;
          font-weight: 500;
          margin-top: 2px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .tx-input-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #374151;
          margin-bottom: 8px;
          display: block;
        }
        .tx-input {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          color: #0a0a0a;
          background: white;
          outline: none;
          transition: border-color 0.15s;
          box-sizing: border-box;
          margin-bottom: 16px;
        }
        .tx-input:focus { border-color: #00C805; }
        .tx-warning {
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 0.85rem;
          color: #92400e;
          margin-bottom: 16px;
        }
        .tx-error-msg {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 0.85rem;
          color: #dc2626;
          margin-bottom: 16px;
        }
        .tx-actions { display: flex; flex-direction: column; gap: 10px; }
        .tx-btn-buy {
          width: 100%; padding: 14px;
          background: #00C805; color: white;
          border: none; border-radius: 10px;
          font-size: 0.9rem; font-weight: 700;
          cursor: pointer; transition: background 0.15s;
        }
        .tx-btn-buy:hover { background: #00b004; }
        .tx-btn-sell-all {
          width: 100%; padding: 14px;
          background: #fef2f2; color: #dc2626;
          border: 1.5px solid #fecaca; border-radius: 10px;
          font-size: 0.9rem; font-weight: 700;
          cursor: pointer; transition: all 0.15s;
        }
        .tx-btn-sell-all:hover { background: #fee2e2; }
        .tx-btn-cancel {
          width: 100%; padding: 14px;
          background: #f3f4f6; color: #374151;
          border-radius: 10px;
          font-size: 0.9rem; font-weight: 700;
          text-align: center; text-decoration: none;
          display: block; transition: background 0.15s;
        }
        .tx-btn-cancel:hover { background: #e5e7eb; color: #374151; }
      `}</style>

      <div className="tx-page">
        <div className="tx-card">
          <div className="tx-header">
            <div className="tx-stock-info">
              <div className="tx-stock-logo">
                <img src={stock.icon} alt={stock.name} />
              </div>
              <div>
                <div className="tx-stock-name">{stock.name}</div>
                <div className="tx-stock-ticker">{stock.exchange} · {stock.ticker}</div>
              </div>
            </div>
            <div className="tx-title">{purchase ? (isSelling ? "Sell Shares" : "Buy More Shares") : "Buy Shares"}</div>
            <div className="tx-subtitle">
              {purchase ? "Enter a negative value to sell shares." : `Limit of 100 shares per transaction.`}
            </div>
          </div>

          <div className="tx-body">
            <div className="tx-stats">
              <div className="tx-stat">
                <div className="tx-stat-value">{stock.ticker}</div>
                <div className="tx-stat-label">Ticker</div>
              </div>
              <div className="tx-stat">
                <div className="tx-stat-value">{Math.abs(shares)}</div>
                <div className="tx-stat-label">Shares</div>
              </div>
              {purchase?._id && (
                <div className="tx-stat">
                  <div className="tx-stat-value">{purchase.shares}</div>
                  <div className="tx-stat-label">Owned</div>
                </div>
              )}
              <div className="tx-stat">
                <div className="tx-stat-value" style={{color: isSelling ? '#dc2626' : '#00C805'}}>${totalCost}</div>
                <div className="tx-stat-label">Total Cost</div>
              </div>
            </div>

            <form onSubmit={purchase ? handleSubmitUpdatePurchase : handleSubmitNewPurchase}>
              <label className="tx-input-label">Number of Shares</label>
              <input
                onChange={handleChange}
                className="tx-input"
                type="number"
                name="sharesBought"
                min={purchase ? "-100" : "1"}
                max="100"
                placeholder={purchase ? "Enter shares (negative to sell)" : "Enter shares to buy"}
              />

              {(shares < 0 && purchase && Math.abs(shares) >= purchase.shares) && (
                <div className="tx-warning">
                  ⚠️ Entering this value will sell your <strong>entire investment</strong> in {stock.name}.
                </div>
              )}

              {errors && (
                <div className="tx-error-msg">❌ {errors}</div>
              )}

              <div className="tx-actions">
                {purchase ? (
                  <>
                    <button onClick={() => setIsSell(false)} type="submit" className="tx-btn-buy">
                      {isSelling ? "Sell Shares" : "Buy More Shares"}
                    </button>
                    <button onClick={() => setIsSell(true)} type="submit" className="tx-btn-sell-all">
                      Sell All Shares
                    </button>
                    <Link to={`/purchased/${stock._id}`} className="tx-btn-cancel">Cancel</Link>
                  </>
                ) : (
                  <>
                    <button type="submit" className="tx-btn-buy">Buy Shares</button>
                    <Link to={`/stock/${stock._id}`} className="tx-btn-cancel">Cancel</Link>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionForm;
