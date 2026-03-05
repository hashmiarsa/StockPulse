# 📈 StockPulse — Trading Platform Simulation

<div align="center">

| 🏠 Home | 🏪 Markets & Buying | 💼 Investments & Dashboard |
|--------|-------------------|--------------------------|
| ![Home Preview](./demo_gifs/HomePage.gif) | ![Markets Preview](./demo_gifs/MarketAndBuying.gif) | ![Dashboard Preview](./demo_gifs/InvestmentAndDashboard.gif) |

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://your-vercel-url.vercel.app)


**A full-stack MERN trading platform simulation with real-time price updates and a fully custom Robinhood-inspired UI redesign.**

</div>

---

## 📌 Overview

StockPulse is a simulated stock trading web application built with the **MERN stack** and **Socket.IO**. Users can register, browse 50+ stocks with live price updates, buy and sell shares using virtual currency ($100,000 to start), and track their portfolio performance in real time.

> ⚠️ This is a simulation only. Prices are randomly generated and not reflective of real-world market performance.

---

## ✨ UI Redesign

This project features a **complete frontend UI redesign** — every component was rebuilt from scratch with a clean, modern **Robinhood-inspired** design system.

**Design System:**
| Token | Value |
|-------|-------|
| Primary Green | `#00C805` |
| Background | `#f9fafb` |
| Card | `white` with `#f0f0f0` border |
| Text | `#0a0a0a` / `#6b7280` |
| Border Radius | `10–20px` |
| Font Weight | `800` headings, `500` body |

**Components Redesigned (25+):**

| Component | Description |
|-----------|-------------|
| `Navigation` | Sticky navbar with balance badge, avatar dropdown |
| `Landing` | Hero section with animated floating badges |
| `Features` | 3-card feature grid with hover effects |
| `About` | Two-column layout with stats |
| `Showcase` | Featured stocks with live price badges |
| `Footer` | Light theme footer with social links |
| `Auth` | Clean login/register card |
| `StockCard` | Stock card with live chart |
| `StockDetails` | Full stock info with buy action |
| `StockView` | Markets page with list/grid toggle + search |
| `ListView` | Table view with sort headers |
| `GridView` | Responsive card grid |
| `TopInfoSection` | Markets stats bar |
| `Dashboard` | Sidebar settings panel |
| `General` | Theme switcher |
| `Account` | Name update + danger zone |
| `Insights` | Portfolio performance stats + chart |
| `Transactions` | Color-coded transaction history table |
| `Logs` | Activity log table |
| `PurchasedStocks` | My investments page |
| `PurchaseOverview` | Holdings summary |
| `PurchaseListView` | Investment table with gain/loss badges |
| `PurchasedStockDetails` | Single investment detail page |
| `CurrentPrice` | Green/red live price badge |
| `InvestmentPrice` | Live portfolio value badge |
| `PriceChart` | Fixed-size Chart.js line chart |
| `Guide` | Step-by-step numbered guide |

---

## 🛠️ Tech Stack

**Frontend**
- [React](https://reactjs.org/) — Component-based UI
- [Redux](https://redux.js.org/) — Global state management
- [TailwindCSS](https://tailwindcss.com/) — Utility-first styling
- [Chart.JS](https://www.chartjs.org/) — Live price charts
- [Socket.IO Client](https://socket.io/) — Real-time price updates

**Backend**
- [Node.JS](https://nodejs.org/en/) — Runtime
- [Express.JS](https://expressjs.com/) — REST API
- [Mongoose.JS](https://mongoosejs.com/) — MongoDB ODM
- [Socket.IO](https://socket.io/) — WebSocket server
- [JWT](https://jwt.io/) — Authentication

**Database**
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — Cloud database

**Deployment**
- [Vercel](https://vercel.com/) — Frontend hosting
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — Database hosting

---

## 🚀 Getting Started

### Prerequisites
- [Node.js & NPM](https://nodejs.org/en/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```bash
# MongoDB connection string
MONGO_CONNECTION_STRING=your_mongo_connection_string

# JWT secret key
JWT_SECRET=your_jwt_secret

# Guest account MongoDB ObjectID
GUEST_ID=your_guest_object_id
```

Start the backend (default port `5000`):

```bash
node index.js
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in `/frontend`:

```bash
# Backend API URL
REACT_APP_STOCKS_API=http://localhost:5000

# Guest account email (base64 encoded)
REACT_APP_GUEST_EMAIL=base64_encoded_email

# Guest account password (base64 encoded)
REACT_APP_GUEST_PASS=base64_encoded_password
```

> 💡 Encode your credentials using [base64encode.org](https://www.base64encode.org/)

Start the frontend (default port `3000`):

```bash
npm start
```

---

### ⚡ Quick Start (Both Servers)

```bash
# Terminal 1 — Backend
cd backend && node index.js

# Terminal 2 — Frontend
cd frontend && npm start
```

> 🔴 **Note:** Turn off VPN before starting — MongoDB Atlas may not connect through VPN.

---

## ☁️ Deploying to Vercel

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Set **Root Directory** to `frontend`
5. Add all environment variables from your `.env`
6. Click **Deploy** ✅

---

## 🗂️ Project Structure

```
stockpulse/
├── 📄 README.md
├── 📄 LICENSE
├── 📄 SECURITY.md
├── 📁 architecture_diagrams/
├── 📁 demo_gifs/
│
├── 📁 backend/
│   ├── index.js
│   ├── seed.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── web_sockets/
│
└── 📁 frontend/
    ├── src/
    │   ├── actions/
    │   ├── api/
    │   ├── assets/
    │   ├── components/
    │   ├── constants/
    │   ├── contexts/
    │   ├── reducers/
    │   └── tests/
    └── cypress/
```

---

## 🏗️ Architecture

**System Overview**

![System Architecture](./architecture_diagrams/MockStocksSystem.png)

**Database Schema**

![Database Architecture](./architecture_diagrams/MockStocksDatabase.png)

**Backend (MVC)**

![Backend Architecture](./architecture_diagrams/MockStocksBackend.png)

**Frontend (Component Hierarchy)**

![Frontend Architecture](./architecture_diagrams/MockStocksFrontend.png)

---

## 📊 Data Model

Stock data is represented as:

```json
{
  "id": 0,
  "ticker": "AAPL",
  "exchange": "NASDAQ",
  "name": "Apple Inc.",
  "initialPrice": 150.00,
  "currentPrice": 152.34,
  "description": "Technology company.",
  "ipoDate": "1980-12-12",
  "siteURL": "https://apple.com",
  "industries": ["Technology", "Consumer Electronics"],
  "icon": "https://icon-url.com/aapl.png",
  "favorited": false,
  "timesBought": 12
}
```

---

## 🧪 Testing

**Frontend Unit Tests** — [React Testing Library](https://testing-library.com/)
```bash
cd frontend && npm test
```

**End-to-End Tests** — [Cypress](https://www.cypress.io/)
```bash
cd frontend && npx cypress open
```

---

## 📦 Pushing to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - StockPulse UI Redesign"

# Add your GitHub remote
git remote add origin https://github.com/hashmiarsa/stockpulse.git

# Push
git push -u origin main
```

---

