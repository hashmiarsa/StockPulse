import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { loginUser, registerUser } from '../../actions/auth';
import { AUTH_ERROR_OCCURRED } from '../../constants/actions';

const initialState = { firstName: '', lastName: '', email: '', password: '' };

const Auth = () => {
  const errors = useSelector((state) => state.authErrorsReducer);
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGuest, setIsLoadingGuest] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();

  useEffect(() => {
    dispatch({ type: AUTH_ERROR_OCCURRED, payload: "" });
    return () => { dispatch({ type: AUTH_ERROR_OCCURRED, payload: "" }); }
  }, [dispatch]);

  const switchMode = () => {
    setIsLoading(false);
    dispatch({ type: AUTH_ERROR_OCCURRED, payload: "" });
    const inputs = document.forms["auth_form"].getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) inputs[i].value = "";
    setIsSignup((prev) => !prev);
  };

  const handleSubmitGuestAccount = (e) => {
    e.preventDefault();
    setIsLoadingGuest(true);
    dispatch({ type: AUTH_ERROR_OCCURRED, payload: "" });
    dispatch(loginUser({ email: atob(process.env.REACT_APP_GUEST_EMAIL), password: atob(process.env.REACT_APP_GUEST_PASS) }, history, state));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch({ type: AUTH_ERROR_OCCURRED, payload: "" });
    if (isSignup) {
      dispatch(registerUser(form, history, state));
    } else {
      dispatch(loginUser(form, history, state));
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <style>{`
        .auth-page {
          min-height: 100vh;
          background: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px 40px;
        }
        .auth-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 40px rgba(0,0,0,0.08);
          width: 100%;
          max-width: 420px;
          overflow: hidden;
        }
        .auth-header {
          padding: 36px 36px 0;
          text-align: center;
        }
        .auth-logo {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 24px;
        }
        .auth-logo-text {
          font-size: 1.3rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
        }
        .auth-logo-dot {
          width: 7px;
          height: 7px;
          background: #00C805;
          border-radius: 50%;
          margin-bottom: 2px;
        }
        .auth-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0a0a0a;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }
        .auth-subtitle {
          font-size: 0.875rem;
          color: #9ca3af;
          margin-bottom: 28px;
        }
        .auth-body { padding: 0 36px 28px; }
        .auth-input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 0.9rem;
          color: #111827;
          background: white;
          outline: none;
          transition: border-color 0.15s;
          margin-bottom: 12px;
          box-sizing: border-box;
        }
        .auth-input:focus { border-color: #00C805; }
        .auth-input::placeholder { color: #9ca3af; }
        .auth-btn-primary {
          width: 100%;
          padding: 13px;
          background: #00C805;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 4px;
        }
        .auth-btn-primary:hover { background: #00b004; }
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }
        .auth-divider-line {
          flex: 1;
          height: 1px;
          background: #f3f4f6;
        }
        .auth-divider-text {
          font-size: 0.75rem;
          color: #9ca3af;
          white-space: nowrap;
          font-weight: 500;
        }
        .auth-btn-guest {
          width: 100%;
          padding: 13px;
          background: #f9fafb;
          color: #374151;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .auth-btn-guest:hover { background: #f3f4f6; border-color: #d1d5db; }
        .auth-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .auth-error-text {
          font-size: 0.85rem;
          color: #dc2626;
          font-weight: 500;
        }
        .auth-footer {
          padding: 20px 36px;
          background: #f9fafb;
          border-top: 1px solid #f3f4f6;
          text-align: center;
        }
        .auth-switch-text {
          font-size: 0.85rem;
          color: #6b7280;
        }
        .auth-switch-btn {
          background: none;
          border: none;
          color: #00C805;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          margin-left: 6px;
        }
        .auth-switch-btn:hover { text-decoration: underline; }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <span className="auth-logo-text">StockPulse</span>
              <span className="auth-logo-dot"></span>
            </div>
            <h1 className="auth-title">{isSignup ? "Create account" : "Welcome back"}</h1>
            <p className="auth-subtitle">{isSignup ? "Start with $100,000 in virtual currency" : "Login to your account"}</p>
          </div>

          <div className="auth-body">
            {errors && (
              <div className="auth-error">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span className="auth-error-text">{errors}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} name="auth_form">
              {isSignup && (
                <div style={{display:'flex', gap:'10px'}}>
                  <input className="auth-input" required type="text" placeholder="First name" name="firstName" onChange={handleChange} />
                  <input className="auth-input" required type="text" placeholder="Last name" name="lastName" onChange={handleChange} />
                </div>
              )}
              <input className="auth-input" type="email" required placeholder="Email address" name="email" onChange={handleChange} />
              <input className="auth-input" type="password" required placeholder="Password" name="password" onChange={handleChange} />
              <button className="auth-btn-primary" type="submit">
                {isLoading && !errors && (
                  <svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                  </svg>
                )}
                {isSignup ? "Create Account" : "Login"}
              </button>
            </form>

            <div className="auth-divider">
              <div className="auth-divider-line"></div>
              <span className="auth-divider-text">or continue with guest</span>
              <div className="auth-divider-line"></div>
            </div>

            <form onSubmit={handleSubmitGuestAccount}>
              <button type="submit" className="auth-btn-guest">
                {isLoadingGuest && !errors ? (
                  <svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                )}
                Try with Guest Account
              </button>
            </form>
          </div>

          <div className="auth-footer">
            <span className="auth-switch-text">
              {!isSignup ? "Don't have an account?" : "Already have an account?"}
              <button onClick={switchMode} className="auth-switch-btn">
                {!isSignup ? "Register" : "Login"}
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
