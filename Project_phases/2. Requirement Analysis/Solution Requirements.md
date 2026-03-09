# Solution Requirements
### StockPulse — Trading Platform Simulation
**Phase 2: Requirement Analysis**

---

## 1. Introduction

This document defines all functional and non-functional requirements for StockPulse. Requirements are categorised by priority using the MoSCoW method and mapped to specific system components.

---

## 2. Functional Requirements

### 2.1 User Authentication

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-01 | Users shall be able to register with name, email, and password | Must Have | ✅ Done |
| FR-02 | Passwords shall be securely hashed before storing | Must Have | ✅ Done |
| FR-03 | Users shall receive a JWT token upon successful login/register | Must Have | ✅ Done |
| FR-04 | Protected routes shall require a valid JWT token | Must Have | ✅ Done |
| FR-05 | Users shall be able to log out and invalidate their session | Must Have | ✅ Done |
| FR-06 | A guest account shall be available for demo access | Should Have | ✅ Done |

---

### 2.2 Virtual Balance

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-07 | Every new user shall receive $100,000 in virtual currency | Must Have | ✅ Done |
| FR-08 | Balance shall be displayed in the navigation bar at all times | Must Have | ✅ Done |
| FR-09 | Balance shall decrease when user buys stock | Must Have | ✅ Done |
| FR-10 | Balance shall increase when user sells stock | Must Have | ✅ Done |
| FR-11 | Users shall not be able to buy stocks exceeding their balance | Must Have | ✅ Done |

---

### 2.3 Stock Market

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-12 | The system shall seed at least 50 stocks into the database | Must Have | ✅ Done |
| FR-13 | Stock prices shall update in real time via WebSockets | Must Have | ✅ Done |
| FR-14 | Users shall be able to browse stocks in grid and list view | Must Have | ✅ Done |
| FR-15 | Users shall be able to search for stocks by name or ticker | Must Have | ✅ Done |
| FR-16 | Users shall be able to sort stocks by name or price | Should Have | ✅ Done |
| FR-17 | Each stock shall display: name, ticker, exchange, current price | Must Have | ✅ Done |
| FR-18 | A live price chart shall be displayed for each stock | Must Have | ✅ Done |
| FR-19 | Stock detail page shall show full info including description and IPO date | Should Have | ✅ Done |

---

### 2.4 Trading (Buy / Sell)

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-20 | Users shall be able to buy any available stock | Must Have | ✅ Done |
| FR-21 | Users shall be able to specify the number of shares to buy | Must Have | ✅ Done |
| FR-22 | Total purchase cost shall be shown before confirming | Should Have | ✅ Done |
| FR-23 | Users shall be able to sell stocks they own | Must Have | ✅ Done |
| FR-24 | Selling a stock shall calculate value at current price | Must Have | ✅ Done |
| FR-25 | Every transaction shall be recorded with timestamp | Must Have | ✅ Done |

---

### 2.5 Portfolio & Investments

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-26 | Users shall be able to view all stocks they currently own | Must Have | ✅ Done |
| FR-27 | Portfolio shall show current value, invested amount, and P&L | Must Have | ✅ Done |
| FR-28 | Each holding shall display gain/loss as a coloured badge (green/red) | Must Have | ✅ Done |
| FR-29 | Users shall be able to click into each investment for full details | Should Have | ✅ Done |

---

### 2.6 Dashboard

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-30 | Dashboard shall have tabs: General, Account, Insights, Transactions, Logs | Must Have | ✅ Done |
| FR-31 | Account tab shall allow user to update their display name | Should Have | ✅ Done |
| FR-32 | Account tab shall allow user to delete their account | Could Have | ✅ Done |
| FR-33 | Insights tab shall display portfolio balance and total profit/loss | Must Have | ✅ Done |
| FR-34 | Transactions tab shall list all buy/sell history with colour coding | Must Have | ✅ Done |
| FR-35 | Logs tab shall record all account activity with timestamps | Should Have | ✅ Done |

---

### 2.7 UI & Navigation

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-36 | Application shall have a persistent navigation bar | Must Have | ✅ Done |
| FR-37 | Navigation shall show current balance and user avatar | Must Have | ✅ Done |
| FR-38 | A step-by-step Guide page shall be available | Should Have | ✅ Done |
| FR-39 | Application shall have a Landing, About, and Features section | Should Have | ✅ Done |
| FR-40 | 404 Not Found page shall be displayed for invalid routes | Should Have | ✅ Done |

---

## 3. Non-Functional Requirements

### 3.1 Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-01 | Stock prices shall update with minimal visible delay | < 3 seconds per update |
| NFR-02 | API responses shall be fast | < 500ms average |
| NFR-03 | Frontend shall load within acceptable time | < 3 seconds on broadband |

### 3.2 Security

| ID | Requirement |
|----|-------------|
| NFR-04 | All passwords shall be hashed (bcrypt) — never stored in plain text |
| NFR-05 | All protected API routes shall validate JWT tokens via middleware |
| NFR-06 | Environment variables shall store all secrets (DB URI, JWT secret) |
| NFR-07 | Guest credentials shall be base64-encoded in frontend `.env` |

### 3.3 Usability

| ID | Requirement |
|----|-------------|
| NFR-08 | UI shall follow a consistent design system (green: #00C805, white background) |
| NFR-09 | All interactive elements shall have clear visual feedback (hover states, badges) |
| NFR-10 | The application shall be fully responsive on desktop |

### 3.4 Reliability

| ID | Requirement |
|----|-------------|
| NFR-11 | The application shall handle failed API calls gracefully without crashing |
| NFR-12 | MongoDB Atlas free tier ensures 99.9% uptime for database |
| NFR-13 | Frontend shall be deployed on Vercel for reliable global CDN delivery |

### 3.5 Maintainability

| ID | Requirement |
|----|-------------|
| NFR-14 | Frontend shall follow component-based architecture (React) |
| NFR-15 | Backend shall follow MVC pattern (Routes → Controllers → Models) |
| NFR-16 | All environment-specific config shall be in `.env` files |

---

## 4. System Constraints

| Constraint | Details |
|------------|---------|
| Platform | Web browser only (no native mobile app) |
| Hosting | Vercel (frontend), MongoDB Atlas (database) — free tier |
| Stock data | Simulated prices only — not connected to real market APIs |
| Concurrent users | Limited by free tier WebSocket and database capacity |

---

*Document prepared for: College Project Submission*
*Project: StockPulse — Trading Platform Simulation*
*Author: Md Arsalan*
