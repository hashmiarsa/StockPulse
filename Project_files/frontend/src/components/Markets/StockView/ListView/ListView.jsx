import React from 'react';
import { Link, useHistory } from "react-router-dom";
import ListViewSkeleton from './ListViewSkeleton';
import CurrentPrice from "../../../CurrentPrice/CurrentPrice";
import PriceChart from "../../../PriceChart/PriceChart";

const ListView = (props) => {
  const {
    socket,
    filteredStocks,
    sortByField,
    sortById,
    sortByName,
    sortByTicker,
    sortByPrice,
    setSortById,
    setSortByName,
    setSortByTicker,
    setSortByPrice
  } = props;
  const history = useHistory();

  const detailPage = (id) => history.push(`/stock/${id}`);

  const SortIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginLeft:'4px', opacity:0.4}}>
      <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
    </svg>
  );

  return (
    <>
      <style>{`
        .lv-table-wrap {
          overflow-x: auto;
        }
        .lv-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }
        .lv-thead th {
          padding: 12px 20px;
          background: #f9fafb;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #9ca3af;
          text-align: left;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          user-select: none;
          white-space: nowrap;
        }
        .lv-thead th:hover { color: #374151; }
        .lv-thead th.no-sort { cursor: default; }
        .lv-row {
          border-bottom: 1px solid #f9fafb;
          transition: background 0.1s;
        }
        .lv-row:hover { background: #f9fafb; }
        .lv-row:last-child { border-bottom: none; }
        .lv-td {
          padding: 14px 20px;
          font-size: 0.875rem;
          color: #374151;
          cursor: pointer;
          vertical-align: middle;
        }
        .lv-td-id {
          font-size: 0.78rem;
          color: #9ca3af;
          font-weight: 500;
        }
        .lv-td-name {
          font-weight: 600;
          color: #0a0a0a;
        }
        .lv-td-ticker {
          font-weight: 600;
          color: #374151;
          font-size: 0.82rem;
          letter-spacing: 0.02em;
        }
        .lv-chart-cell {
          width: 120px;
          height: 48px;
        }
        .lv-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .lv-btn-buy {
          padding: 7px 16px;
          background: #00C805;
          color: white;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .lv-btn-buy:hover { background: #00b004; color: white; }
        .lv-btn-details {
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
        .lv-btn-details:hover { background: #e5e7eb; color: #374151; }
      `}</style>

      <div className="lv-table-wrap">
        <table className="lv-table">
          <thead className="lv-thead">
            <tr>
              <th onClick={() => { sortByField("id", sortById); setSortById(p => !p); }}>
                # <SortIcon />
              </th>
              <th onClick={() => { sortByField("name", sortByName); setSortByName(p => !p); }} className="hidden md:table-cell">
                Company <SortIcon />
              </th>
              <th onClick={() => { sortByField("ticker", sortByTicker); setSortByTicker(p => !p); }}>
                Ticker <SortIcon />
              </th>
              <th onClick={() => { sortByField("currentPrice", sortByPrice); setSortByPrice(p => !p); }}>
                Price <SortIcon />
              </th>
              <th className="hidden md:table-cell no-sort">Trend</th>
              <th className="no-sort">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!filteredStocks?.length ? (
              <ListViewSkeleton />
            ) : (
              filteredStocks.map((stock) => (
                <tr key={stock._id} className="lv-row">
                  <td className="lv-td lv-td-id" onClick={() => detailPage(stock._id)}>{stock.id}</td>
                  <td className="lv-td lv-td-name hidden md:table-cell" onClick={() => detailPage(stock._id)}>
                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                      <img src={stock.icon} alt={stock.name} style={{width:'28px', height:'28px', objectFit:'contain', borderRadius:'6px', background:'#f9fafb', padding:'2px'}} />
                      {stock.name}
                    </div>
                  </td>
                  <td className="lv-td lv-td-ticker" onClick={() => detailPage(stock._id)}>{stock.ticker}</td>
                  <td className="lv-td" onClick={() => detailPage(stock._id)}>
                    <CurrentPrice currentPrice={stock.currentPrice} ticker={stock.ticker} socket={socket} />
                  </td>
                  <td className="lv-td hidden md:table-cell" onClick={() => detailPage(stock._id)}>
                    <div className="lv-chart-cell">
                      <PriceChart id={stock.ticker} legendDisplay={false} xDisplay={false} yDisplay={false} socket={socket} ticker={stock.ticker} currPrice={stock.currentPrice} styleSet={"h-12 w-32"} />
                    </div>
                  </td>
                  <td className="lv-td" style={{cursor:'default'}}>
                    <div className="lv-actions">
                      <Link to={`/transaction/${stock._id}`} className="lv-btn-buy">Buy</Link>
                      <Link to={`/stock/${stock._id}`} className="lv-btn-details">Details</Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListView;
