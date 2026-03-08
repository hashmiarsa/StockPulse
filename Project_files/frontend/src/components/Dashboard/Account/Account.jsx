import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateUserName, removeUserAccount } from '../../../actions/auth';
import { USER_ERROR_OCCURRED } from "../../../constants/actions";

const initialState = { firstName: '', lastName: '' };

const Account = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState(initialState);
  const errors = useSelector((state) => state.userErrorsReducer);
  const { user } = props;

  useEffect(() => {
    dispatch({ type: USER_ERROR_OCCURRED, payload: "" });
    return () => { dispatch({ type: USER_ERROR_OCCURRED, payload: "" }); };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: USER_ERROR_OCCURRED, payload: "" });
    dispatch(updateUserName(form, history));
  };

  const handleSubmitRemoveAccount = (e) => {
    e.preventDefault();
    dispatch({ type: USER_ERROR_OCCURRED, payload: "" });
    const confirm = window.confirm("[WARNING] Are you sure you want to remove this account? This action cannot be undone!");
    if (confirm) dispatch(removeUserAccount(history));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <style>{`
        .acc-section { margin-bottom: 28px; }
        .acc-section-title {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9ca3af;
          margin-bottom: 14px;
        }
        .acc-divider {
          border: none;
          border-top: 1px solid #f0f0f0;
          margin: 24px 0;
        }
        .acc-field-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .acc-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
        }
        .acc-input {
          width: 100%;
          padding: 10px 14px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 0.875rem;
          color: #111827;
          background: #f9fafb;
          outline: none;
          transition: border-color 0.15s, background 0.15s;
          box-sizing: border-box;
        }
        .acc-input:focus { border-color: #00C805; background: white; }
        .acc-input::placeholder { color: #9ca3af; }
        .acc-error {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          padding: 12px 16px;
          margin-top: 12px;
        }
        .acc-error-icon {
          width: 28px; height: 28px;
          background: #ef4444;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: white;
        }
        .acc-error-text { font-size: 0.82rem; color: #dc2626; font-weight: 500; }
        .acc-btn-green {
          width: 100%;
          padding: 11px;
          background: #00C805;
          color: white;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: background 0.15s;
          margin-top: 4px;
        }
        .acc-btn-green:hover { background: #00b004; }
        .acc-danger-zone {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 20px;
        }
        .acc-danger-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: #dc2626;
          margin-bottom: 4px;
        }
        .acc-danger-desc {
          font-size: 0.78rem;
          color: #9ca3af;
          margin-bottom: 14px;
        }
        .acc-btn-red {
          width: 100%;
          padding: 11px;
          background: #ef4444;
          color: white;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: background 0.15s;
          margin-bottom: 8px;
        }
        .acc-btn-red:hover { background: #dc2626; }
        .acc-btn-disabled {
          width: 100%;
          padding: 11px;
          background: #f3f4f6;
          color: #9ca3af;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          border: none;
          cursor: not-allowed;
          opacity: 0.6;
        }
        @media (max-width: 540px) {
          .acc-field-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div>
        {/* Change Name */}
        <div className="acc-section">
          <div className="acc-section-title">Change Name</div>
          <form onSubmit={handleSubmit}>
            <div className="acc-field-grid">
              <div>
                <label className="acc-label" htmlFor="firstName">First Name</label>
                <input
                  onChange={handleChange} required
                  id="firstName" type="text" name="firstName"
                  placeholder={String(user?.result.name).split(" ")[0]}
                  className="acc-input"
                />
              </div>
              <div>
                <label className="acc-label" htmlFor="lastName">Last Name</label>
                <input
                  onChange={handleChange} required
                  id="lastName" type="text" name="lastName"
                  placeholder={String(user?.result.name).split(" ")[1]}
                  className="acc-input"
                />
              </div>
            </div>
            {errors && (
              <div className="acc-error">
                <div className="acc-error-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <div className="acc-error-text"><strong>Error:</strong> {errors}</div>
              </div>
            )}
            <button type="submit" className="acc-btn-green" style={{marginTop:'16px'}}>Update Name</button>
          </form>
        </div>

        <hr className="acc-divider" />

        {/* Danger Zone */}
        <div className="acc-section">
          <div className="acc-section-title">Account Management</div>
          <div className="acc-danger-zone">
            <div className="acc-danger-title">⚠️ Danger Zone</div>
            <div className="acc-danger-desc">These actions are permanent and cannot be undone.</div>
            <form onSubmit={handleSubmitRemoveAccount}>
              <button type="submit" className="acc-btn-red">🗑️ Delete Account</button>
              <button type="button" disabled className="acc-btn-disabled">📦 Archive Account (Coming Soon)</button>
              {errors && (
                <div className="acc-error" style={{marginTop:'12px'}}>
                  <div className="acc-error-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </div>
                  <div className="acc-error-text"><strong>Error:</strong> {errors}</div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
