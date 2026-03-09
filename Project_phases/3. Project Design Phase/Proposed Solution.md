# Proposed Solution
### StockPulse — Trading Platform Simulation
**Phase 3: Project Design Phase**

---

## 1. Solution Summary

**StockPulse** is a full-stack MERN web application that simulates a real-world stock trading platform. It provides users with $100,000 in virtual currency to buy and sell stocks, track their portfolio performance in real time, and learn investing through hands-on practice — completely risk-free.

**Live Application:** https://stock-pulse-olive.vercel.app/

---

## 2. Solution Architecture

The solution is built on a three-tier architecture:

```
┌─────────────────────────────────┐
│  PRESENTATION TIER              │
│  React + Redux + TailwindCSS    │
│  Hosted on Vercel               │
└────────────┬────────────────────┘
             │ HTTP REST + WebSocket
┌────────────▼────────────────────┐
│  APPLICATION TIER               │
│  Node.JS + Express REST API     │
│  Socket.IO WebSocket Server     │
└────────────┬────────────────────┘
             │ Mongoose ODM
┌────────────▼────────────────────┐
│  DATA TIER                      │
│  MongoDB Atlas Cloud Database   │
└─────────────────────────────────┘
```

---

## 3. Core Solution Components

### 3.1 Virtual Trading Engine
Every registered user receives **$100,000 virtual currency**. The trading engine:
- Validates purchase against current balance
- Calculates total investment cost (shares × currentPrice)
- Deducts from user balance on buy
- Returns sell value at current price on sell
- Records every transaction with full metadata

### 3.2 Real-Time Price Engine
Socket.IO WebSocket server continuously simulates market activity:
- Randomly adjusts stock prices at regular intervals
- Broadcasts updates to all connected clients simultaneously
- Frontend receives updates and re-renders price displays and charts instantly
- Each stock maintains price history for the live chart

### 3.3 Portfolio Tracking System
Users can see their investments' performance at any time:
- Current value = shares × current live price
- Profit/Loss = current value − initial investment
- Displayed as green (profit) or red (loss) coloured badges
- Dashboard Insights tab aggregates total portfolio performance

### 3.4 Complete Audit Trail
Every user action is recorded:
- **Transactions:** Every buy/sell with ticker, shares, price, timestamp
- **Logs:** Every account action (login, buy, sell, update) with timestamp

---

## 4. Pages & Features

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, features, about, and featured stocks |
| Guide | `/guide` | Step-by-step trading guide (4 steps) |
| Markets | `/markets` | Browse all 50+ stocks, search, sort, list/grid view |
| Stock Detail | `/stocks/:id` | Full stock info, live chart, buy button |
| Investments | `/investments` | Portfolio of purchased stocks with P&L |
| Investment Detail | `/investments/:id` | Single investment detail with sell option |
| Dashboard | `/dashboard` | Account settings, insights, transactions, logs |
| Auth | `/auth` | Login and Register |
| Not Found | `*` | 404 page |

---

## 5. UI Design System

The entire frontend was redesigned from scratch with a **Robinhood-inspired** design system:

| Token | Value | Usage |
|-------|-------|-------|
| Primary Green | `#00C805` | Buttons, badges, accents |
| Background | `#f9fafb` | Page backgrounds |
| Card Background | `white` | All card components |
| Card Border | `#f0f0f0` | Subtle card borders |
| Primary Text | `#0a0a0a` | Headings |
| Secondary Text | `#6b7280` | Subtext, labels |
| Border Radius | `10–20px` | Cards, buttons, badges |
| Heading Weight | `800` | All page titles |
| Body Weight | `500` | General body text |

**25+ components redesigned** including Navigation, Landing, StockCard, StockView, Dashboard and all sub-components, Portfolio pages, and more.

---

## 6. Database Design

Five MongoDB collections power the application:

### Users
```json
{ "name": "string", "email": "string", "password": "hashed", "coins": 100000 }
```

### Stocks
```json
{ "ticker": "AAPL", "name": "Apple Inc.", "exchange": "NASDAQ",
  "currentPrice": 152.34, "initialPrice": 150.00, "industries": [],
  "description": "string", "ipoDate": "date", "siteURL": "string", "icon": "url" }
```

### Purchased Stocks
```json
{ "userId": "ref", "stock": "ref", "tickerBought": "AAPL",
  "shares": 10, "initialInvestment": 1523.40 }
```

### Transactions
```json
{ "userId": "ref", "transactionType": "BUY|SELL", "tickerBought": "AAPL",
  "shares": 10, "investment": 1523.40, "transactedAt": "date" }
```

### Logs
```json
{ "userId": "ref", "logAction": "string", "loggedAt": "date" }
```

---

## 7. Security Design

| Concern | Solution |
|---------|---------|
| Password storage | bcryptjs hashing — never stored plain text |
| Authentication | JWT tokens with expiry |
| Protected routes | Express middleware validates JWT on every request |
| Secrets | All stored in `.env` files, never committed to git |
| Guest access | Credentials base64-encoded in frontend `.env` |

---

## 8. Deployment Design

| Component | Platform | URL |
|-----------|---------|-----|
| Frontend | Vercel | https://stock-pulse-olive.vercel.app/ |
| Database | MongoDB Atlas (M0 free) | Cloud-hosted |
| Backend | Local / cloud server | Port 5000 |

**Vercel Configuration:**
- Root Directory: `frontend`
- Build Command: `NODE_OPTIONS=--openssl-legacy-provider craco build`
- Output Directory: `build`
- Framework: Create React App

---

## 9. Testing Strategy

| Type | Tool | Coverage |
|------|------|---------|
| Unit Tests | React Testing Library | Landing, Markets, Navigation components |
| E2E Tests | Cypress | Full investment flow: browse → buy → verify |

---

*Document prepared for: College Project Submission*
*Project: StockPulse — Trading Platform Simulation*
*Author: Md Arsalan*
