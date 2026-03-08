import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getStocks } from "../../../actions/stocks";
import { MARKET_ERROR_OCCURRED } from '../../../constants/actions';
import socketIOClient from "socket.io-client";
import ShowcaseCardSkeleton from "./ShowcaseCardSkeleton";
import ShowcaseCard from "./ShowcaseCard";

const Showcase = () => {
  const socket = socketIOClient(process.env.REACT_APP_STOCKS_API, { transports: ['websocket', 'polling', 'flashsocket'] });
  const stocks = useSelector((state) => state.stocksReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStocks());
  }, [dispatch]);

  useEffect(() => {
    socket.connect();
    dispatch({ type: MARKET_ERROR_OCCURRED, payload: "" });
    return () => {
      socket.disconnect();
      dispatch({ type: MARKET_ERROR_OCCURRED, payload: "" });
    }
  }, [socket, dispatch]);

  return (
    <>
      <style>{`
        .showcase-section {
          background: white;
          padding: 80px 24px;
        }
        .showcase-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .showcase-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .showcase-label {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #00C805;
          margin-bottom: 12px;
        }
        .showcase-title {
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .showcase-subtitle {
          font-size: 0.95rem;
          color: #9ca3af;
          margin-top: 10px;
        }
        .showcase-cards {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
        }
      `}</style>

      <section className="showcase-section">
        <div className="showcase-inner">
          <div className="showcase-header">
            <span className="showcase-label">Live Prices</span>
            <h2 className="showcase-title">Today's Featured Picks</h2>
            <p className="showcase-subtitle">Prices update in real time via WebSockets</p>
          </div>
          <div className="showcase-cards">
            {!stocks?.length
              ? <ShowcaseCardSkeleton />
              : <ShowcaseCard socket={socket} stocks={stocks} stockOne={stocks[0]} stockTwo={stocks[1]} stockThree={stocks[2]} />
            }
          </div>
        </div>
      </section>
    </>
  );
}

export default Showcase;
