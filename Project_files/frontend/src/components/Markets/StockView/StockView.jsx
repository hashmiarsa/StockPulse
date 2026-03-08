import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from "socket.io-client";
import { getStocks } from "../../../actions/stocks";
import { SORT_STOCKS_BY_FIELD, MARKET_ERROR_OCCURRED } from '../../../constants/actions';
import ListView from "./ListView/ListView";
import GridView from "./GridView/GridView";
import TopInfoSection from "./TopInfoSection/TopInfoSection";
import Pagination from "../../Pagination/Pagination";

const StockView = () => {
  const socket = socketIOClient(process.env.REACT_APP_STOCKS_API, { transports: ['websocket', 'polling', 'flashsocket'] });
  const errors = useSelector((state) => state.marketErrorsReducer);
  const stocks = useSelector((state) => state.stocksReducer);
  const [isListMode, setIsListMode] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");
  const [sortById, setSortById] = useState(true);
  const [sortByName, setSortByName] = useState(true);
  const [sortByTicker, setSortByTicker] = useState(true);
  const [sortByPrice, setSortByPrice] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [stocksPerPage] = useState(12);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getStocks()); }, [dispatch]);

  useEffect(() => {
    socket.connect();
    dispatch({ type: MARKET_ERROR_OCCURRED, payload: "" });
    return () => {
      socket.disconnect();
      dispatch({ type: MARKET_ERROR_OCCURRED, payload: "" });
    };
  }, [socket, dispatch]);

  const filteredStocks = stocks?.length ? stocks.filter((stock) =>
    stock.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    stock.ticker.toLowerCase().includes(searchFilter.toLowerCase())
  ) : null;

  const sortByField = (field, reverse) => {
    dispatch({ type: SORT_STOCKS_BY_FIELD, payload: { field, reverse } });
  };

  const searchStocks = (e) => {
    setCurrentPage(1);
    setSearchFilter(e.target.value);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = filteredStocks?.length ? filteredStocks.slice(indexOfFirstStock, indexOfLastStock) : null;

  return (
    <>
      <style>{`
        .markets-page {
          background: #f9fafb;
          min-height: 100vh;
          padding-top: 80px;
        }
        .markets-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px;
        }
        .markets-header {
          margin-bottom: 28px;
        }
        .markets-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #00C805;
          margin-bottom: 8px;
        }
        .markets-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
        }
        .markets-subtitle {
          font-size: 0.875rem;
          color: #9ca3af;
          margin-top: 4px;
        }
        .markets-toolbar {
          background: white;
          border-radius: 14px;
          border: 1px solid #f0f0f0;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .markets-search {
          flex: 1;
          padding: 10px 16px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 0.9rem;
          color: #111827;
          background: #f9fafb;
          outline: none;
          transition: border-color 0.15s;
        }
        .markets-search:focus {
          border-color: #00C805;
          background: white;
        }
        .markets-search::placeholder { color: #9ca3af; }
        .toolbar-divider {
          width: 1px;
          height: 28px;
          background: #f0f0f0;
        }
        .toolbar-btn {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f9fafb;
          border: 1.5px solid #e5e7eb;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .toolbar-btn:hover {
          background: #f3f4f6;
          color: #0a0a0a;
          border-color: #d1d5db;
        }
        .toolbar-btn.active {
          background: #f0fdf4;
          border-color: #00C805;
          color: #00C805;
        }
        .toolbar-btn-label {
          font-size: 0.72rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .markets-results {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          padding: 0 4px;
        }
        .results-count {
          font-size: 0.85rem;
          font-weight: 600;
          color: #374151;
        }
        .results-badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 600;
        }
        .results-badge.found {
          background: #f0fdf4;
          color: #16a34a;
        }
        .results-badge.not-found {
          background: #fef2f2;
          color: #dc2626;
        }
        .markets-content {
          background: white;
          border-radius: 16px;
          border: 1px solid #f0f0f0;
          overflow: hidden;
        }
        .sort-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .sort-label {
          font-size: 0.72rem;
          color: #9ca3af;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
      `}</style>

      <div className="markets-page">
        <div className="markets-inner">
          {/* Page Header */}
          <div className="markets-header">
            <div className="markets-label">Explore</div>
            <h1 className="markets-title">Markets</h1>
            <p className="markets-subtitle">{stocks?.length || 0} stocks available · Prices update in real time</p>
          </div>

          <TopInfoSection count={stocks?.length ? stocks.length : 0} />

          {/* Toolbar */}
          <div className="markets-toolbar">
            <input
              onChange={searchStocks}
              type="text"
              className="markets-search"
              placeholder="Search by company or ticker..."
            />

            <div className="toolbar-divider"></div>

            {/* View toggle */}
            <button
              onClick={() => setIsListMode(true)}
              className={`toolbar-btn ${isListMode ? 'active' : ''}`}
              title="List view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>

            <button
              onClick={() => setIsListMode(false)}
              className={`toolbar-btn ${!isListMode ? 'active' : ''}`}
              title="Grid view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>

            {/* Sort buttons - only show in grid mode */}
            {!isListMode && (
              <>
                <div className="toolbar-divider"></div>
                <div className="sort-group">
                  <span className="sort-label">Sort:</span>
                  <button
                    onClick={() => { sortByField("id", sortById); setSortById(p => !p); }}
                    className="toolbar-btn"
                    title="Sort by ID"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => { sortByField("name", sortByName); setSortByName(p => !p); }}
                    className="toolbar-btn"
                    title="Sort by name"
                  >
                    {sortByName
                      ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" /></svg>
                    }
                  </button>
                  <button
                    onClick={() => { sortByField("currentPrice", sortByPrice); setSortByPrice(p => !p); }}
                    className="toolbar-btn"
                    title="Sort by price"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Results count */}
          <div className="markets-results">
            {filteredStocks?.length ? (
              <span className="results-badge found">
                {filteredStocks.length} {filteredStocks.length === 1 ? 'result' : 'results'} found
              </span>
            ) : (
              <span className="results-badge not-found">No results found</span>
            )}
          </div>

          {/* Stock List/Grid */}
          <div className="markets-content">
            {isListMode ? (
              <ListView
                filteredStocks={currentStocks}
                errors={errors}
                socket={socket}
                searchStocks={searchStocks}
                setIsListMode={setIsListMode}
                sortByField={sortByField}
                sortById={sortById}
                sortByName={sortByName}
                sortByTicker={sortByTicker}
                sortByPrice={sortByPrice}
                setSortById={setSortById}
                setSortByName={setSortByName}
                setSortByTicker={setSortByTicker}
                setSortByPrice={setSortByPrice}
              />
            ) : (
              <GridView
                filteredStocks={currentStocks}
                errors={errors}
                socket={socket}
                searchStocks={searchStocks}
                setIsListMode={setIsListMode}
              />
            )}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            stocksPerPage={stocksPerPage}
            totalStocks={filteredStocks?.length ? filteredStocks.length : 0}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
}

export default StockView;
