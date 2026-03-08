import React, { useState } from "react";
import General from "./General/General";
import Account from "./Account/Account";
import Insights from "./Insights/Insights";
import Transactions from "./Transactions/Transactions";
import Logs from "./Logs/Logs";

const Dashboard = () => {
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const [currentTab, setCurrentTab] = useState("Account");

  const shownTab = (tab) => {
    switch (tab) {
      case "Account": return <Account user={user} />;
      case "General": return <General />;
      case "Insights": return <Insights user={user} />;
      case "Transactions": return <Transactions />;
      case "Logs": return <Logs />;
      default: return <Account />;
    }
  };

  const tabs = [
    { key: "General", label: "General", icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { key: "Account", label: "Account", icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { key: "Transactions", label: "Transaction History", icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
    { key: "Logs", label: "Activity Logs", icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg> },
    { key: "Insights", label: "Insights", icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>, beta: true },
  ];

  return (
    <>
      <style>{`
        .dash-page {
          background: #f9fafb;
          min-height: 100vh;
          padding-top: 80px;
        }
        .dash-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 24px;
        }
        .dash-header { margin-bottom: 32px; }
        .dash-greeting {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .dash-email {
          font-size: 0.875rem;
          color: #9ca3af;
        }
        .dash-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 24px;
          align-items: start;
        }
        .dash-sidebar {
          background: white;
          border-radius: 16px;
          border: 1px solid #f0f0f0;
          overflow: hidden;
        }
        .dash-tab {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.15s;
          border-left: 3px solid transparent;
          position: relative;
        }
        .dash-tab:hover { background: #f9fafb; color: #0a0a0a; }
        .dash-tab.active {
          background: #f0fdf4;
          color: #16a34a;
          font-weight: 700;
          border-left-color: #00C805;
        }
        .dash-tab.active svg { color: #00C805; }
        .dash-beta {
          font-size: 0.65rem;
          font-weight: 700;
          background: #ede9fe;
          color: #7c3aed;
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 0.04em;
          margin-left: auto;
        }
        .dash-content {
          background: white;
          border-radius: 16px;
          border: 1px solid #f0f0f0;
          padding: 28px;
          min-height: 400px;
        }
        @media (max-width: 768px) {
          .dash-layout { grid-template-columns: 1fr; }
          .dash-sidebar { display: flex; overflow-x: auto; border-radius: 12px; }
          .dash-tab { border-left: none; border-bottom: 3px solid transparent; white-space: nowrap; }
          .dash-tab.active { border-bottom-color: #00C805; border-left: none; }
        }
      `}</style>

      <div className="dash-page">
        <div className="dash-inner">
          <div className="dash-header">
            <div className="dash-greeting">Hi, {user?.result?.name} 👋</div>
            <div className="dash-email">{user?.result?.email}</div>
          </div>
          <div className="dash-layout">
            <div className="dash-sidebar">
              {tabs.map(tab => (
                <div
                  key={tab.key}
                  className={`dash-tab ${currentTab === tab.key ? 'active' : ''}`}
                  onClick={() => setCurrentTab(tab.key)}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.beta && <span className="dash-beta">BETA</span>}
                </div>
              ))}
            </div>
            <div className="dash-content">
              {shownTab(currentTab)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
