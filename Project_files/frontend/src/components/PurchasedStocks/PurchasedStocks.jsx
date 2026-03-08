import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
import { getPurchases } from '../../actions/purchased';
import { useDispatch, useSelector } from 'react-redux';
import PurchaseListView from "./PurchaseListView/PurchaseListView";
import PurchaseListViewSkeleton from "./PurchaseListView/PurchaseListViewSkeleton";
import PurchaseOverview from "./PurchaseOverview/PurchaseOverview";
import PurchaseOverviewSkeleton from "./PurchaseOverview/PurchaseOverviewSkeleton";

const PurchasedStocks = () => {
  const socket = socketIOClient(process.env.REACT_APP_STOCKS_API, { transports: ['websocket', 'polling', 'flashsocket'] });
  const purchases = useSelector((state) => state.purchasedReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchases());
  }, [dispatch]);

  useEffect(() => {
    socket.connect();
    return () => { socket.disconnect(); };
  }, [socket]);

  return (
    <>
      <style>{`
        .ps-page {
          background: #f9fafb;
          min-height: 100vh;
          padding-top: 80px;
        }
        .ps-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 24px;
        }
        .ps-header {
          margin-bottom: 32px;
        }
        .ps-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #00C805;
          margin-bottom: 8px;
        }
        .ps-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
        }
        .ps-subtitle {
          font-size: 0.875rem;
          color: #9ca3af;
          margin-top: 4px;
        }
        .ps-content {
          background: white;
          border-radius: 16px;
          border: 1px solid #f0f0f0;
          overflow: hidden;
        }
      `}</style>

      <div className="ps-page">
        <div className="ps-inner">
          <div className="ps-header">
            <div className="ps-label">Portfolio</div>
            <h1 className="ps-title">My Investments</h1>
            <p className="ps-subtitle">Track your holdings and portfolio performance</p>
          </div>
          <div className="ps-content">
            {!purchases ? (
              <>
                <PurchaseOverviewSkeleton />
                <PurchaseListViewSkeleton />
              </>
            ) : (
              <>
                <PurchaseOverview purchases={purchases} />
                <PurchaseListView purchases={purchases} socket={socket} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PurchasedStocks;
