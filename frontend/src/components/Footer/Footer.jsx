import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <style>{`
        .footer {
          background: #f9fafb;
          border-top: 1px solid #f0f0f0;
          padding: 64px 24px 32px;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-top {
          display: flex;
          gap: 64px;
          margin-bottom: 48px;
        }
        .footer-brand { flex: 1.5; }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          margin-bottom: 12px;
        }
        .footer-logo-text {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
        }
        .footer-logo-dot {
          width: 7px;
          height: 7px;
          background: #00C805;
          border-radius: 50%;
        }
        .footer-tagline {
          font-size: 0.875rem;
          color: #9ca3af;
          line-height: 1.6;
          max-width: 280px;
          margin-bottom: 20px;
        }
        .footer-socials {
          display: flex;
          gap: 12px;
        }
        .footer-social-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: white;
          border: 1.5px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          color: #6b7280;
          text-decoration: none;
        }
        .footer-social-btn:hover {
          background: #00C805;
          border-color: #00C805;
          color: white;
        }
        .footer-links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          flex: 2;
        }
        .footer-col-title {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #9ca3af;
          margin-bottom: 16px;
        }
        .footer-link {
          display: block;
          font-size: 0.85rem;
          color: #6b7280;
          text-decoration: none;
          margin-bottom: 10px;
          transition: color 0.15s;
          font-weight: 500;
        }
        .footer-link:hover { color: #00C805; }
        .footer-divider {
          border: none;
          border-top: 1px solid #f0f0f0;
          margin-bottom: 24px;
        }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer-copy {
          font-size: 0.8rem;
          color: #9ca3af;
          font-weight: 500;
        }
        .footer-copy span { color: #00C805; font-weight: 700; }
        .footer-disclaimer {
          font-size: 0.75rem;
          color: #d1d5db;
          max-width: 400px;
          text-align: right;
        }
        @media (max-width: 768px) {
          .footer-top { flex-direction: column; gap: 32px; }
          .footer-links { grid-template-columns: repeat(2, 1fr); }
          .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
          .footer-disclaimer { text-align: center; }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <span className="footer-logo-text">StockPulse</span>
                <span className="footer-logo-dot"></span>
              </Link>
              <p className="footer-tagline">The trading platform simulation for everyone. Practice without risk.</p>
              <div className="footer-socials">
                <a href="https://github.com/JackyTea/stockpulse" className="footer-social-btn" target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z"/>
                  </svg>
                </a>
                <a href="https://jackytea.com/" className="footer-social-btn" target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.001 20H6.00098C4.89641 20 4.00098 19.1046 4.00098 18V7C4.00098 5.89543 4.89641 5 6.00098 5H10.001V7H6.00098V18H17.001V14H19.001V18C19.001 19.1046 18.1055 20 17.001 20ZM11.701 13.707L10.291 12.293L16.584 6H13.001V4H20.001V11H18.001V7.415L11.701 13.707Z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-links">
              <div>
                <div className="footer-col-title">Info</div>
                <Link to="/guide" className="footer-link">Guide</Link>
                <Link to="/careers" className="footer-link">Careers</Link>
              </div>
              <div>
                <div className="footer-col-title">Stack</div>
                <a href="https://www.mongodb.com/mern-stack" className="footer-link" target="_blank" rel="noopener noreferrer">MERN</a>
                <a href="https://socket.io/" className="footer-link" target="_blank" rel="noopener noreferrer">Socket.IO</a>
              </div>
              <div>
                <div className="footer-col-title">Projects</div>
                <a href="https://jackytea.github.io/GH_Gridlock_Pathfinder/" className="footer-link" target="_blank" rel="noopener noreferrer">Pathfinder</a>
                <a href="https://silly-shirley-309cb3.netlify.app/" className="footer-link" target="_blank" rel="noopener noreferrer">WebGL FPS</a>
              </div>
              <div>
                <div className="footer-col-title">Portfolio</div>
                <a href="https://github.com/JackyTea" className="footer-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://jackytea.com/" className="footer-link" target="_blank" rel="noopener noreferrer">Personal Site</a>
              </div>
            </div>
          </div>
          <hr className="footer-divider" />
          <div className="footer-bottom">
            <p className="footer-copy">© StockPulse <span>{new Date().getFullYear()}</span>. All rights reserved.</p>
            <p className="footer-disclaimer">Not a real trading platform. Prices are simulated and not reflective of real world market performance.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
