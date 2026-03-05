import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from "../../../actions/transactions";
import TransactionsSkeleton from "./TransactionsSkeleton";

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactionsReducer);

  useEffect(() => { dispatch(getTransactions()); }, [dispatch]);

  return (
    <>
      <style>{`
        .txn-section-title {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9ca3af;
          margin-bottom: 14px;
        }
        .txn-count {
          display: inline-flex;
          align-items: center;
          background: #f3f4f6;
          border-radius: 20px;
          padding: 2px 10px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #6b7280;
          margin-left: 8px;
          vertical-align: middle;
        }
        .txn-table-wrap {
          overflow-x: auto;
          max-height: 420px;
          border-radius: 12px;
          border: 1px solid #f0f0f0;
        }
        .txn-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 400px;
        }
        .txn-thead th {
          padding: 10px 16px;
          background: #f9fafb;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #9ca3af;
          text-align: left;
          border-bottom: 1px solid #f0f0f0;
          position: sticky;
          top: 0;
        }
        .txn-row { border-bottom: 1px solid #f9fafb; transition: background 0.1s; }
        .txn-row:hover { background: #f9fafb; }
        .txn-row:last-child { border-bottom: none; }
        .txn-td {
          padding: 12px 16px;
          font-size: 0.82rem;
          color: #374151;
          vertical-align: middle;
        }
        .txn-type-buy {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        }
        .txn-type-sell {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }
        .txn-type-other {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          background: #f3f4f6;
          color: #6b7280;
        }
        .txn-ticker { font-weight: 700; color: #0a0a0a; letter-spacing: 0.02em; }
        .txn-date { font-size: 0.75rem; color: #9ca3af; }
      `}</style>

      <div>
        <div className="txn-section-title">
          Transaction History
          <span className="txn-count">{transactions?.length ?? 0} records</span>
        </div>

        {!transactions?.length ? <TransactionsSkeleton /> : (
          <div className="txn-table-wrap">
            <table className="txn-table">
              <thead className="txn-thead">
                <tr>
                  <th>Type</th>
                  <th className="hidden md:table-cell">Shares</th>
                  <th>Ticker</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => {
                  const type = t.transactionType?.toLowerCase();
                  const badgeClass = type === 'buy' ? 'txn-type-buy' : type === 'sell' ? 'txn-type-sell' : 'txn-type-other';
                  return (
                    <tr key={t._id} className="txn-row">
                      <td className="txn-td">
                        <span className={badgeClass}>{t.transactionType}</span>
                      </td>
                      <td className="txn-td hidden md:table-cell">{t.shares}</td>
                      <td className="txn-td txn-ticker">{t.tickerBought}</td>
                      <td className="txn-td txn-date">
                        {new Date(t.transactedAt).toDateString()}{' '}
                        {new Date(t.transactedAt).toLocaleTimeString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Transactions;
