# Performance Testing
### StockPulse — Trading Platform Simulation
**Phase 6: Performance Testing**

---

## 1. Overview

This document covers all testing performed on StockPulse, including unit tests, end-to-end tests, manual testing, and performance observations. The goal is to verify that all functional requirements are met and the application performs reliably under expected usage conditions.

---

## 2. Testing Strategy

| Test Type | Tool | Scope |
|-----------|------|-------|
| Unit Testing | React Testing Library | Individual React components |
| End-to-End Testing | Cypress | Full user flows in real browser |
| Manual Testing | Browser DevTools | API responses, WebSocket, UI behaviour |
| Performance Testing | Browser DevTools (Network, Lighthouse) | Load times, real-time update latency |

---

## 3. Unit Tests

### 3.1 Test Setup
```bash
cd frontend
npm test
```
Framework: **React Testing Library** with Jest runner (built into Create React App)

---

### 3.2 Navigation Component Tests
**File:** `src/tests/Navigation.test.js`

| Test ID | Test Description | Expected Result | Status |
|---------|-----------------|-----------------|--------|
| NAV-01 | Renders StockPulse logo/brand name | Logo text visible in DOM | ✅ Pass |
| NAV-02 | Shows Guide link | Guide link renders | ✅ Pass |
| NAV-03 | Shows Markets link | Markets link renders | ✅ Pass |
| NAV-04 | Shows Login when user not authenticated | Login button visible | ✅ Pass |
| NAV-05 | Shows balance when user authenticated | Balance badge visible | ✅ Pass |

---

### 3.3 Landing Page Tests
**File:** `src/tests/Landing.test.js`

| Test ID | Test Description | Expected Result | Status |
|---------|-----------------|-----------------|--------|
| LAND-01 | Renders hero heading | Heading text present | ✅ Pass |
| LAND-02 | Renders Get Started button | CTA button visible | ✅ Pass |
| LAND-03 | Renders Features section | Feature cards render | ✅ Pass |
| LAND-04 | Renders About section | About section visible | ✅ Pass |

---

### 3.4 Markets Page Tests
**File:** `src/tests/Markets.test.js`

| Test ID | Test Description | Expected Result | Status |
|---------|-----------------|-----------------|--------|
| MKT-01 | Renders search input | Search bar present | ✅ Pass |
| MKT-02 | Renders grid/list toggle | Toggle buttons visible | ✅ Pass |
| MKT-03 | Shows loading skeleton when stocks loading | Skeleton cards render | ✅ Pass |
| MKT-04 | Renders stock cards when data loaded | Stock cards visible | ✅ Pass |

---

## 4. End-to-End (E2E) Tests

### 4.1 Test Setup
```bash
cd frontend
npx cypress open
```
Framework: **Cypress** v8.7.0

---

### 4.2 Investment Flow Test
**File:** `cypress/integration/make_investment_spec.js`

**Scenario:** User registers, browses markets, buys a stock, and verifies portfolio update.

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| E2E-01 | Visit application URL | Landing page loads | ✅ Pass |
| E2E-02 | Click Register | Auth page renders | ✅ Pass |
| E2E-03 | Fill in name, email, password | Form accepts input | ✅ Pass |
| E2E-04 | Submit registration | Redirected to Markets | ✅ Pass |
| E2E-05 | Verify balance shows $100,000 | Balance badge visible | ✅ Pass |
| E2E-06 | Click on a stock card | Stock detail page loads | ✅ Pass |
| E2E-07 | Enter number of shares | Input accepts value | ✅ Pass |
| E2E-08 | Click Buy | Transaction completes | ✅ Pass |
| E2E-09 | Navigate to Investments | Portfolio page loads | ✅ Pass |
| E2E-10 | Verify stock appears in portfolio | Holding visible | ✅ Pass |
| E2E-11 | Verify balance decreased | Balance reflects purchase | ✅ Pass |

**Result: All E2E tests passing ✅**

---

## 5. Manual API Testing (Postman)

All backend API endpoints were manually tested during development using Postman.

### 5.1 Authentication Endpoints

| Method | Endpoint | Test | Result |
|--------|---------|------|--------|
| POST | `/api/users/register` | Register new user | ✅ 200 — JWT returned |
| POST | `/api/users/login` | Login with credentials | ✅ 200 — JWT returned |
| POST | `/api/users/login` | Wrong password | ✅ 401 — Unauthorized |
| GET | `/api/users/:id` | Get user (with token) | ✅ 200 — User data |
| GET | `/api/users/:id` | Get user (no token) | ✅ 401 — Unauthorized |

### 5.2 Stocks Endpoints

| Method | Endpoint | Test | Result |
|--------|---------|------|--------|
| GET | `/api/stocks` | Fetch all stocks | ✅ 200 — 50 stocks returned |
| GET | `/api/stocks/:id` | Fetch single stock | ✅ 200 — Stock data |

### 5.3 Trading Endpoints

| Method | Endpoint | Test | Result |
|--------|---------|------|--------|
| POST | `/api/purchased_stocks` | Buy stock | ✅ 200 — Portfolio updated |
| POST | `/api/purchased_stocks` | Insufficient balance | ✅ 400 — Error returned |
| GET | `/api/purchased_stocks` | Get portfolio | ✅ 200 — Holdings returned |
| DELETE | `/api/purchased_stocks/:id` | Sell stock | ✅ 200 — Removed + balance updated |

### 5.4 Dashboard Endpoints

| Method | Endpoint | Test | Result |
|--------|---------|------|--------|
| GET | `/api/transactions` | Get transaction history | ✅ 200 — All transactions |
| GET | `/api/action_logs` | Get activity logs | ✅ 200 — All logs |
| PATCH | `/api/users/:id` | Update name | ✅ 200 — Name updated |
| DELETE | `/api/users/:id` | Delete account | ✅ 200 — Account deleted |

---

## 6. Real-Time Performance Testing

### 6.1 WebSocket Connection

| Test | Observation | Result |
|------|-------------|--------|
| Initial connection on page load | Socket connects within 1 second | ✅ Pass |
| Price update frequency | Updates visible every ~2-3 seconds | ✅ Pass |
| Price chart updates | New data point added on each update | ✅ Pass |
| Reconnection after disconnect | Auto-reconnects within 3 seconds | ✅ Pass |
| 50 stocks updating simultaneously | No visible lag | ✅ Pass |

---

## 7. Frontend Performance (Lighthouse)

Tested on the deployed Vercel URL: https://stock-pulse-olive.vercel.app/

| Metric | Score | Status |
|--------|-------|--------|
| Performance | 78/100 | 🟡 Good |
| Accessibility | 85/100 | ✅ Good |
| Best Practices | 92/100 | ✅ Good |
| SEO | 88/100 | ✅ Good |

**Key Observations:**
- Initial bundle size is moderate (React + Redux + Chart.JS)
- GIF files in README/demo add weight (not loaded by app itself)
- Time to Interactive: ~2.8 seconds on broadband
- No critical performance blockers identified

---

## 8. Bug Fixes Applied During Testing

| Bug ID | Description | Fix Applied |
|--------|-------------|------------|
| BUG-01 | PriceChart overflowed card container | Added `maintainAspectRatio: false`, wrapper `position: relative` |
| BUG-02 | CurrentPrice showing wrong colour (green for loss, red for gain) | Fixed inverted condition in colour logic |
| BUG-03 | `parseFloat().toFixed()` chaining error in chart data push | Split into two operations |
| BUG-04 | Vercel 404 on deployment | Set Root Directory to `frontend`, build command to CRACO Linux format |
| BUG-05 | `set NODE_OPTIONS` failing on Vercel (Windows command) | Changed to `NODE_OPTIONS=--openssl-legacy-provider craco build` |

---

## 9. Test Summary

| Category | Total Tests | Passed | Failed |
|----------|------------|--------|--------|
| Unit Tests | 13 | 13 | 0 |
| E2E Tests | 11 | 11 | 0 |
| API Manual Tests | 16 | 16 | 0 |
| Real-Time Tests | 5 | 5 | 0 |
| **Total** | **45** | **45** | **0** |

**Overall Test Result: ✅ All 45 tests passing**

---

## 10. Conclusion

StockPulse has been thoroughly tested across all layers — frontend components, backend API endpoints, real-time WebSocket functionality, and complete end-to-end user flows. All identified bugs were fixed, all tests pass, and the application is successfully deployed and accessible at:

🌐 **https://stock-pulse-olive.vercel.app/**

---

*Document prepared for: College Project Submission*
*Project: StockPulse — Trading Platform Simulation*
*Author: Md Arsalan*
