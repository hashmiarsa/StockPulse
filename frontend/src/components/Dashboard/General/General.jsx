import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext/ThemeContext";

const General = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <style>{`
        .gen-section-title {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9ca3af;
          margin-bottom: 14px;
        }
        .gen-theme-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 28px;
        }
        .gen-theme-btn {
          border: 2px solid #f0f0f0;
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          background: white;
          transition: all 0.15s;
          text-align: left;
          width: 100%;
        }
        .gen-theme-btn:hover { border-color: #d1d5db; }
        .gen-theme-btn.active {
          border-color: #00C805;
          background: #f0fdf4;
        }
        .gen-theme-preview {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .gen-theme-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .gen-theme-lines { flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .gen-theme-line { height: 6px; border-radius: 4px; }
        .gen-theme-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: #374151;
        }
        .gen-active-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #16a34a;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
          margin-top: 8px;
        }
        .gen-select-wrap {
          position: relative;
        }
        .gen-select {
          width: 100%;
          padding: 10px 36px 10px 14px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 0.875rem;
          color: #374151;
          background: #f9fafb;
          appearance: none;
          cursor: not-allowed;
          opacity: 0.6;
          outline: none;
        }
        .gen-select-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }
        .gen-coming-soon {
          font-size: 0.72rem;
          color: #9ca3af;
          margin-top: 6px;
        }
      `}</style>

      <div>
        <div className="gen-section-title">Appearance</div>
        <div className="gen-theme-grid">
          {/* Light Theme */}
          <button
            className={`gen-theme-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => { setTheme("light"); document.body.style.background = "#f9fafb"; }}
          >
            <div className="gen-theme-preview">
              <div className="gen-theme-dot" style={{background:'#f3f4f6', border:'2px solid #e5e7eb'}}></div>
              <div className="gen-theme-lines">
                <div className="gen-theme-line" style={{background:'#e5e7eb', width:'80%'}}></div>
                <div className="gen-theme-line" style={{background:'#f3f4f6'}}></div>
              </div>
            </div>
            <div className="gen-theme-label">☀️ Light Theme</div>
            {theme === 'light' && (
              <div className="gen-active-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                Active
              </div>
            )}
          </button>

          {/* Dark Theme */}
          <button
            className={`gen-theme-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => { setTheme("dark"); document.body.style.background = "#111827"; }}
          >
            <div className="gen-theme-preview">
              <div className="gen-theme-dot" style={{background:'#374151', border:'2px solid #4b5563'}}></div>
              <div className="gen-theme-lines">
                <div className="gen-theme-line" style={{background:'#4b5563', width:'80%'}}></div>
                <div className="gen-theme-line" style={{background:'#374151'}}></div>
              </div>
            </div>
            <div className="gen-theme-label">🌙 Dark Theme</div>
            {theme === 'dark' && (
              <div className="gen-active-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                Active
              </div>
            )}
          </button>
        </div>

        <div className="gen-section-title">Language</div>
        <div className="gen-select-wrap">
          <select disabled className="gen-select">
            <option>English - EN</option>
            <option>Français - FR</option>
            <option>Español - ES</option>
            <option>中文 - ZH</option>
          </select>
          <div className="gen-select-icon">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
          </div>
        </div>
        <p className="gen-coming-soon">🌐 Additional languages coming soon.</p>
      </div>
    </>
  );
}

export default General;
