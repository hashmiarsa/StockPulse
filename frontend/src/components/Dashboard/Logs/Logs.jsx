import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getLogs } from "../../../actions/logs";
import LogsSkeleton from "./LogsSkeleton";

const Logs = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.logsReducer);

  useEffect(() => { dispatch(getLogs()); }, [dispatch]);

  return (
    <>
      <style>{`
        .logs-section-title {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9ca3af;
          margin-bottom: 14px;
        }
        .logs-count {
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
        .logs-table-wrap {
          overflow-x: auto;
          max-height: 420px;
          border-radius: 12px;
          border: 1px solid #f0f0f0;
        }
        .logs-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 360px;
        }
        .logs-thead th {
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
        .logs-row { border-bottom: 1px solid #f9fafb; transition: background 0.1s; }
        .logs-row:hover { background: #f9fafb; }
        .logs-row:last-child { border-bottom: none; }
        .logs-td {
          padding: 12px 16px;
          font-size: 0.82rem;
          color: #374151;
          vertical-align: middle;
        }
        .logs-num {
          font-size: 0.75rem;
          color: #9ca3af;
          font-weight: 500;
        }
        .logs-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
          color: #374151;
        }
        .logs-action-dot {
          width: 6px; height: 6px;
          background: #00C805;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .logs-date { font-size: 0.75rem; color: #9ca3af; }
      `}</style>

      <div>
        <div className="logs-section-title">
          Activity Logs
          <span className="logs-count">{logs?.length ?? 0} records</span>
        </div>

        {!logs?.length ? <LogsSkeleton /> : (
          <div className="logs-table-wrap">
            <table className="logs-table">
              <thead className="logs-thead">
                <tr>
                  <th>#</th>
                  <th className="hidden md:table-cell">Action</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={log._id} className="logs-row">
                    <td className="logs-td logs-num">{index + 1}</td>
                    <td className="logs-td hidden md:table-cell">
                      <span className="logs-action">
                        <span className="logs-action-dot"></span>
                        {log.logAction}
                      </span>
                    </td>
                    <td className="logs-td logs-date">
                      {new Date(log.loggedAt).toDateString()}{' '}
                      {new Date(log.loggedAt).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Logs;
