import React from 'react';
import { Link, useHistory } from "react-router-dom";
import InvestmentPrice from '../../InvestmentPrice/InvestmentPrice';

const PurchaseListView = (props) => {
  const { socket, purchases } = props;
  const history = useHistory();

  const detailPage = (id) => history.push(`/purchased/${id}`);

  return (
    <>
      <style>{`
        .plv-wrap { overflow-x: auto; }
        .plv-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 500px;
        }
        .plv-thead th {
          padding: 12px 20px;
          background: #f9fafb;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #9ca3af;
          text-align: left;
          border-bottom: 1px solid #f0f0f0;
          white-space: nowrap;
        }
        .plv-row {
          border-bottom: 1px solid #f9fafb;
          transition: background 0.1s;
          cursor: pointer;
        }
        .plv-row:hover { background: #f9fafb; }
        .plv-row:last-child { border-bottom: none; }
        .plv-td {
          padding: 16px 20px;
          font-size: 0.875rem;
          color: #374151;
          vertical-align: middle;
        }
        .plv-td-num {
          font-size: 0.78rem;
          color: #9ca3af;
          font-weight: 500;
        }
        .plv-td-ticker {
          font-weight: 700;
          color: #0a0a0a;
          letter-spacing: 0.02em;
        }
        .plv-td-shares {
          font-weight: 600;
          color: #374151;
        }
        .plv-td-invest {
          font-weight: 600;
          color: #374151;
        }
        .plv-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .plv-btn-details {
          padding: 7px 14px;
          background: #f3f4f6;
          color: #374151;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .plv-btn-details:hover { background: #e5e7eb; color: #374151; }
        .plv-btn-update {
          padding: 7px 14px;
          background: #00C805;
          color: white;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .plv-btn-update:hover { background: #00b004; color: white; }
        .plv-skeleton {
          height: 14px;
          background: #f3f4f6;
          border-radius: 6px;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <div className="plv-wrap">
        <table className="plv-table">
          <thead className="plv-thead">
            <tr>
              <th className="hidden md:table-cell">#</th>
              <th>Ticker</th>
              <th className="hidden md:table-cell">Shares</th>
              <th className="hidden md:table-cell">Investment</th>
              <th>Gain / Loss</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchases?.length ? (
              purchases.map((purchase, index) => (
                <tr key={purchase._id} className="plv-row">
                  <td className="plv-td plv-td-num hidden md:table-cell" onClick={() => detailPage(purchase.stock)}>
                    {index + 1}
                  </td>
                  <td className="plv-td plv-td-ticker" onClick={() => detailPage(purchase.stock)}>
                    {purchase.tickerBought}
                  </td>
                  <td className="plv-td plv-td-shares hidden md:table-cell" onClick={() => detailPage(purchase.stock)}>
                    {purchase.shares} shares
                  </td>
                  <td className="plv-td plv-td-invest hidden md:table-cell" onClick={() => detailPage(purchase.stock)}>
                    ${purchase.initialInvestment.toFixed(2)}
                  </td>
                  <td className="plv-td" onClick={() => detailPage(purchase.stock)}>
                    <InvestmentPrice
                      shares={purchase.shares}
                      ticker={purchase.tickerBought}
                      initialInvestment={purchase.initialInvestment}
                      socket={socket}
                    />
                  </td>
                  <td className="plv-td" style={{cursor:'default'}}>
                    <div className="plv-actions">
                      <Link to={`/purchased/${purchase.stock}`} className="plv-btn-details">Details</Link>
                      <Link to={`/transaction/${purchase.stock}`} className="plv-btn-update">Update</Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // Skeleton rows
              [...Array(3)].map((_, i) => (
                <tr key={i} className="plv-row">
                  <td className="plv-td hidden md:table-cell"><div className="plv-skeleton" style={{width:'24px'}}></div></td>
                  <td className="plv-td"><div className="plv-skeleton" style={{width:'60px'}}></div></td>
                  <td className="plv-td hidden md:table-cell"><div className="plv-skeleton" style={{width:'48px'}}></div></td>
                  <td className="plv-td hidden md:table-cell"><div className="plv-skeleton" style={{width:'80px'}}></div></td>
                  <td className="plv-td"><div className="plv-skeleton" style={{width:'100px'}}></div></td>
                  <td className="plv-td"><div className="plv-skeleton" style={{width:'120px'}}></div></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PurchaseListView;
