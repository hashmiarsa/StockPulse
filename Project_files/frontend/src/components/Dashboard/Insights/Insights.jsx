import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPurchases } from '../../../actions/purchased';
import InsightsChart from "./InsightsChart";
import InsightsSkeleton from "./InsightsSkeleton";

const Insights = (props) => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchasedReducer);
  const { user } = props;

  useEffect(() => { dispatch(getPurchases()); }, [dispatch]);

  const coins = user?.result.coins ?? 0;
  const isProfit = coins > 100000;
  const changePct = (Math.abs(1 - (coins / 100000)) * 100).toFixed(2);

  return (
    <>
      <style>{`
        .ins-section-title {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9ca3af;
          margin-bottom: 14px;
        }
        .ins-stats-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }
        .ins-stat-box {
          background: #f9fafb;
          border: 1px solid #f0f0f0;
          border-radius: 12px;
          padding: 18px 20px;
        }
        .ins-stat-label {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #9ca3af;
          margin-bottom: 8px;
        }
        .ins-stat-value {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .ins-stat-sub {
          font-size: 0.75rem;
          color: #9ca3af;
          margin-top: 4px;
        }
        .ins-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 700;
          margin-top: 4px;
        }
        .ins-badge.up { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
        .ins-badge.down { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
        .ins-chart-wrap { margin-top: 8px; }
      `}</style>

      <div>
        <div className="ins-section-title">Portfolio Insights</div>

        <div className="ins-stats-row">
          <div className="ins-stat-box">
            <div className="ins-stat-label">Current Balance</div>
            <div className="ins-stat-value" style={{color:'#0a0a0a'}}>${coins.toFixed(2)}</div>
            <div className="ins-stat-sub">Started with $100,000.00</div>
          </div>
          <div className="ins-stat-box">
            <div className="ins-stat-label">Overall Performance</div>
            <div className="ins-stat-value" style={{color: isProfit ? '#16a34a' : '#dc2626'}}>
              {isProfit ? '+' : '-'}{changePct}%
            </div>
            <span className={`ins-badge ${isProfit ? 'up' : 'down'}`}>
              {isProfit ? '▲ Profit' : '▼ Loss'}
            </span>
          </div>
        </div>

        <div className="ins-section-title">Investment Breakdown</div>
        <div className="ins-chart-wrap">
          {purchases?.length
            ? <InsightsChart id="insights-on-purchases-bar-chart" purchases={purchases} styleSet="h-full w-full" />
            : <InsightsSkeleton />
          }
        </div>
      </div>
    </>
  );
}

export default Insights;
