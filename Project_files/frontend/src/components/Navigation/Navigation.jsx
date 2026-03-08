import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
// import ToggleTheme from '../ToggleTheme/ToggleTheme';
import { getUserInfo } from "../../actions/auth";
import { LOGOUT } from '../../constants/actions';
import DefaultAvatarImage from '../../assets/images/avatar.jpg';

const Navigation = () => {
        const dispatch = useDispatch();
        const location = useLocation();
        const history = useHistory();
        const container = useRef(null);
        const [showDropdown, setShowDropdown] = useState(false);
        const [menuHidden, setMenuHidden] = useState(true);
        const [scrolled, setScrolled] = useState(false);
        const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

        const logout = useCallback(() => {
                dispatch({ type: LOGOUT });
                setUser(null);
                history.push('/auth');
        }, [dispatch, history]);

        useEffect(() => {
                const handleScroll = () => setScrolled(window.scrollY > 10);
                window.addEventListener('scroll', handleScroll);
                return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        useEffect(() => {
                setMenuHidden(true);
        }, []);

        useEffect(() => {
                const token = user?.token;
                if (token) {
                        const decodedToken = decode(token);
                        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
                        dispatch(getUserInfo());
                }
                setUser(JSON.parse(localStorage.getItem('profile')));
        }, [user?.token, location, logout, dispatch]);

        useEffect(() => {
                const handleOutsideClick = (event) => {
                        if (!container?.current?.contains(event.target)) {
                                if (!showDropdown) return;
                                setShowDropdown(false);
                        }
                };
                window.addEventListener('click', handleOutsideClick);
                return () => window.removeEventListener('click', handleOutsideClick);
        }, [showDropdown]);

        useEffect(() => {
                const handleEscape = (event) => {
                        if (!showDropdown) return;
                        if (event.key === 'Escape') setShowDropdown(false);
                };
                document.addEventListener('keyup', handleEscape);
                return () => document.removeEventListener('keyup', handleEscape);
        }, [showDropdown]);

        const navLinkClass = "relative px-1 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-150";
        const activeLinkClass = "text-gray-900 font-semibold";

        return (
                <>
                        <style>{`
                                .nav-logo-dot {
                                        width: 8px;
                                        height: 8px;
                                        background: #00C805;
                                        border-radius: 50%;
                                        display: inline-block;
                                        margin-left: 3px;
                                        margin-bottom: 2px;
                                        vertical-align: middle;
                                }
                                .nav-link-active::after {
                                        content: '';
                                        position: absolute;
                                        bottom: -4px;
                                        left: 0;
                                        right: 0;
                                        height: 2px;
                                        background: #00C805;
                                        border-radius: 2px;
                                }
                                .balance-badge {
                                        background: #f0fdf0;
                                        color: #16a34a;
                                        border: 1px solid #bbf7d0;
                                        padding: 3px 10px;
                                        border-radius: 20px;
                                        font-size: 0.8rem;
                                        font-weight: 600;
                                        letter-spacing: 0.01em;
                                }
                                .login-btn {
                                        background: #00C805;
                                        color: white;
                                        padding: 7px 18px;
                                        border-radius: 20px;
                                        font-size: 0.85rem;
                                        font-weight: 600;
                                        transition: all 0.15s ease;
                                        letter-spacing: 0.01em;
                                }
                                .login-btn:hover {
                                        background: #00b004;
                                        transform: translateY(-1px);
                                        box-shadow: 0 4px 12px rgba(0,200,5,0.3);
                                }
                                .avatar-ring {
                                        border: 2px solid #00C805;
                                        border-radius: 50%;
                                        padding: 1px;
                                }
                                .dropdown-menu {
                                        position: absolute;
                                        right: 0;
                                        top: calc(100% + 12px);
                                        width: 160px;
                                        background: white;
                                        border: 1px solid #f0f0f0;
                                        border-radius: 12px;
                                        box-shadow: 0 8px 30px rgba(0,0,0,0.10);
                                        overflow: hidden;
                                        z-index: 100;
                                }
                                .dropdown-item {
                                        display: block;
                                        width: 100%;
                                        padding: 10px 16px;
                                        font-size: 0.85rem;
                                        color: #374151;
                                        text-align: left;
                                        transition: background 0.1s;
                                        font-weight: 500;
                                }
                                .dropdown-item:hover {
                                        background: #f9fafb;
                                        color: #111827;
                                }
                                .dropdown-item.logout {
                                        color: #ef4444;
                                        border-top: 1px solid #f3f4f6;
                                }
                                .dropdown-item.logout:hover {
                                        background: #fef2f2;
                                }
                                .mobile-menu {
                                        background: white;
                                        border-top: 1px solid #f3f4f6;
                                        padding: 16px 24px 24px;
                                }
                                .mobile-nav-link {
                                        display: block;
                                        padding: 12px 0;
                                        font-size: 1rem;
                                        font-weight: 500;
                                        color: #374151;
                                        border-bottom: 1px solid #f9fafb;
                                        transition: color 0.15s;
                                }
                                .mobile-nav-link:hover { color: #00C805; }
                                .hamburger-line {
                                        display: block;
                                        width: 22px;
                                        height: 2px;
                                        background: #374151;
                                        border-radius: 2px;
                                        transition: all 0.2s;
                                }
                        `}</style>

                        <nav style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                zIndex: 50,
                                background: 'white',
                                borderBottom: scrolled ? '1px solid #f0f0f0' : '1px solid transparent',
                                boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.06)' : 'none',
                                transition: 'all 0.2s ease'
                        }}>
                                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>

                                                {/* Logo */}
                                                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                                        <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111827', letterSpacing: '-0.02em' }}>
                                                                StockPulse
                                                        </span>
                                                        <span className="nav-logo-dot"></span>
                                                </Link>

                                                {/* Desktop Nav Links */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="hidden md:flex">
                                                        <NavLink exact to="/" className={navLinkClass} activeClassName={`${activeLinkClass} nav-link-active`} onClick={() => setMenuHidden(true)}>Home</NavLink>
                                                        <NavLink exact to="/guide" className={navLinkClass} activeClassName={`${activeLinkClass} nav-link-active`} onClick={() => setMenuHidden(true)}>Guide</NavLink>
                                                        <NavLink exact to="/markets" className={navLinkClass} activeClassName={`${activeLinkClass} nav-link-active`} onClick={() => setMenuHidden(true)}>Markets</NavLink>
                                                        {user?.result && (
                                                                <NavLink exact to="/purchased" className={navLinkClass} activeClassName={`${activeLinkClass} nav-link-active`} onClick={() => setMenuHidden(true)}>Investments</NavLink>
                                                        )}
                                                </div>

                                                {/* Desktop Right Side */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="hidden md:flex">
                                                        {user?.result ? (
                                                                <>
                                                                        <span className="balance-badge">
                                                                                ${user?.result.coins.toFixed(2)}
                                                                        </span>
                                                                        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>
                                                                                {String(user?.result.name).split(" ")[0]}
                                                                        </span>
                                                                        <div ref={container} style={{ position: 'relative' }} onClick={() => setShowDropdown(!showDropdown)}>
                                                                                <div className="avatar-ring" style={{ cursor: 'pointer', width: '34px', height: '34px', overflow: 'hidden' }}>
                                                                                        <img src={DefaultAvatarImage} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} alt="avatar" />
                                                                                </div>
                                                                                {showDropdown && (
                                                                                        <div className="dropdown-menu">
                                                                                                <Link to="/dashboard" className="dropdown-item">Profile</Link>
                                                                                                <Link to="/purchased" className="dropdown-item">Investments</Link>
                                                                                                <button onClick={() => { setMenuHidden(true); logout(); }} className="dropdown-item logout">Logout</button>
                                                                                        </div>
                                                                                )}
                                                                        </div>
                                                                </>
                                                        ) : (
                                                                <Link to="/auth" className="login-btn" onClick={() => setMenuHidden(true)}>
                                                                        Login / Register
                                                                </Link>
                                                        )}
                                                </div>

                                                {/* Mobile Hamburger */}
                                                <button
                                                        className="md:hidden"
                                                        onClick={() => setMenuHidden(!menuHidden)}
                                                        style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
                                                >
                                                        <span className="hamburger-line" style={{ transform: !menuHidden ? 'translateY(7px) rotate(45deg)' : 'none' }}></span>
                                                        <span className="hamburger-line" style={{ opacity: !menuHidden ? 0 : 1 }}></span>
                                                        <span className="hamburger-line" style={{ transform: !menuHidden ? 'translateY(-7px) rotate(-45deg)' : 'none' }}></span>
                                                </button>
                                        </div>
                                </div>

                                {/* Mobile Menu */}
                                {!menuHidden && (
                                        <div className="mobile-menu md:hidden">
                                                <NavLink exact to="/" className="mobile-nav-link" onClick={() => setMenuHidden(true)}>Home</NavLink>
                                                <NavLink exact to="/guide" className="mobile-nav-link" onClick={() => setMenuHidden(true)}>Guide</NavLink>
                                                <NavLink exact to="/markets" className="mobile-nav-link" onClick={() => setMenuHidden(true)}>Markets</NavLink>
                                                {user?.result && (
                                                        <NavLink exact to="/purchased" className="mobile-nav-link" onClick={() => setMenuHidden(true)}>Investments</NavLink>
                                                )}
                                                {user?.result ? (
                                                        <div style={{ paddingTop: '16px' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                                                        <img src={DefaultAvatarImage} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #00C805' }} alt="avatar" />
                                                                        <div>
                                                                                <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#111827' }}>{String(user?.result.name).split(" ")[0]}</div>
                                                                                <div className="balance-badge" style={{ display: 'inline-block', marginTop: '2px' }}>${user?.result.coins.toFixed(2)}</div>
                                                                        </div>
                                                                </div>
                                                                <button onClick={() => { setMenuHidden(true); logout(); }} style={{ width: '100%', padding: '10px', background: '#fef2f2', color: '#ef4444', borderRadius: '8px', fontWeight: '600', fontSize: '0.9rem', border: '1px solid #fee2e2' }}>
                                                                        Logout
                                                                </button>
                                                        </div>
                                                ) : (
                                                        <div style={{ paddingTop: '16px' }}>
                                                                <Link to="/auth" className="login-btn" style={{ display: 'block', textAlign: 'center' }} onClick={() => setMenuHidden(true)}>
                                                                        Login / Register
                                                                </Link>
                                                        </div>
                                                )}
                                        </div>
                                )}
                        </nav>
                </>
        );
}

export default Navigation;
