# Dashboard and Storyboard
### StockPulse — Trading Platform Simulation
**Phase 5: Project Development Phase**

---

## 1. Overview

This document presents the UI storyboard and dashboard design for StockPulse. It covers the complete user interface flow, screen-by-screen wireframe descriptions, and the detailed dashboard feature set.

---

## 2. Application Storyboard

### Screen 1: Landing Page (Home — `/`)

**Purpose:** First impression, explains the product and encourages sign-up.

```
┌────────────────────────────────────────────────┐
│  NAVIGATION                                    │
│  [StockPulse Logo]    [Guide] [Markets] [Login]│
├────────────────────────────────────────────────┤
│  HERO SECTION                                  │
│                                                │
│  "Start Trading Smarter."                      │
│  Subtext: Practice with $100K virtual capital  │
│                                                │
│  [Get Started →]  [View Markets →]             │
│                                                │
│  Floating badges: AAPL +2.3% | TSLA -1.1%     │
├────────────────────────────────────────────────┤
│  FEATURES (3 cards)                            │
│  📈 Live Prices | 💰 Virtual Capital | 📊 Portfolio │
├────────────────────────────────────────────────┤
│  FEATURED STOCKS (Showcase)                    │
│  [Card] [Card] [Card] [Card] → live prices     │
├────────────────────────────────────────────────┤
│  ABOUT SECTION                                 │
│  Stats: 50+ Stocks | Real-time | Free          │
├────────────────────────────────────────────────┤
│  FOOTER                                        │
└────────────────────────────────────────────────┘
```

---

### Screen 2: Guide Page (`/guide`)

**Purpose:** Step-by-step onboarding for new users.

```
┌────────────────────────────────────────────────┐
│  NAVIGATION                                    │
├────────────────────────────────────────────────┤
│  "How to Get Started"                          │
│                                                │
│  01  ←────────────────────────────────────────│
│  Sign Up                                       │
│  Create your free account to get $100,000      │
│  [Image: Registration form]                    │
│                                                │
│  ────────────────────────────────────→  02     │
│                               Browse Markets   │
│              Explore 50+ stocks with live data │
│                                                │
│  03  ←────────────────────────────────────────│
│  Buy Stocks                                    │
│  Select shares and complete your first trade   │
│                                                │
│  ────────────────────────────────────→  04     │
│                               Track Portfolio  │
│                         Watch your investments │
└────────────────────────────────────────────────┘
```

---

### Screen 3: Auth Page (`/auth`)

**Purpose:** User registration and login.

```
┌────────────────────────────────────────────────┐
│  NAVIGATION                                    │
├────────────────────────────────────────────────┤
│                                                │
│         ┌──────────────────────┐               │
│         │  [Login] [Register]  │               │
│         │                      │               │
│         │  Name: ____________  │               │
│         │  Email: ___________  │               │
│         │  Password: ________  │               │
│         │                      │               │
│         │  [Sign Up / Login]   │               │
│         │                      │               │
│         │  Or [Try as Guest]   │               │
│         └──────────────────────┘               │
│                                                │
└────────────────────────────────────────────────┘
```

---

### Screen 4: Markets Page (`/markets`)

**Purpose:** Browse all stocks, search, sort, switch views.

```
┌────────────────────────────────────────────────┐
│  NAVIGATION  [Balance: $100,000.00]  [Avatar ▾]│
├────────────────────────────────────────────────┤
│  TOP INFO BAR                                  │
│  Total Stocks: 50 | Avg Price: $XXX            │
├────────────────────────────────────────────────┤
│  TOOLBAR                                       │
│  [🔍 Search...] [Sort: Name ▾] [⊞ Grid] [☰ List]│
├────────────────────────────────────────────────┤
│  GRID VIEW                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│  │AAPL  │ │TSLA  │ │MSFT  │ │AMZN  │          │
│  │$152  │ │$245  │ │$378  │ │$185  │          │
│  │[chart│ │[chart│ │[chart│ │[chart│          │
│  │+2.3% │ │-1.1% │ │+0.5% │ │+1.2% │          │
│  └──────┘ └──────┘ └──────┘ └──────┘          │
│  [Load More / Pagination]                      │
└────────────────────────────────────────────────┘
```

---

### Screen 5: Stock Detail Page (`/stocks/:id`)

**Purpose:** Full stock information and buy action.

```
┌────────────────────────────────────────────────┐
│  NAVIGATION                                    │
├────────────────────────────────────────────────┤
│  [← Back to Markets]                          │
│                                                │
│  [Stock Icon]  Apple Inc. (AAPL)               │
│  NASDAQ | Technology                           │
│                                                │
│  Current Price: $152.34  ▲ +2.3%              │
│  ┌──────────────────────────────────────────┐  │
│  │  [LIVE PRICE CHART ── ─ ────── ──]       │  │
│  └──────────────────────────────────────────┘  │
│                                                │
│  Description: Technology company...            │
│  IPO Date: Dec 12, 1980                        │
│  Website: [apple.com]                          │
│                                                │
│  ┌──────────────────┐                          │
│  │  Shares: [ 10 ]  │                          │
│  │  Cost: $1,523.40 │                          │
│  │  [Buy Stock →]   │                          │
│  └──────────────────┘                          │
└────────────────────────────────────────────────┘
```

---

### Screen 6: Investments Page (`/investments`)

**Purpose:** Portfolio overview of all purchased stocks.

```
┌────────────────────────────────────────────────┐
│  NAVIGATION                                    │
├────────────────────────────────────────────────┤
│  PORTFOLIO OVERVIEW                            │
│  Total Invested: $15,234  |  Current: $16,100  │
│  P&L: +$866  ▲ +5.7%                          │
├────────────────────────────────────────────────┤
│  MY INVESTMENTS                                │
│  ┌──────────────────────────────────────────┐  │
│  │ AAPL  10 shares  $1,523  $1,620  +6.4%✅│  │
│  │ TSLA   5 shares  $1,225  $1,180  -3.7%🔴│  │
│  │ MSFT   8 shares  $3,024  $3,100  +2.5%✅│  │
│  └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

---

### Screen 7: Dashboard (`/dashboard`)

See Section 3 below for full Dashboard storyboard.

---

## 3. Dashboard Design

The Dashboard is a tabbed settings and analytics panel accessed via the Navigation avatar dropdown.

### Dashboard Layout

```
┌────────────────────────────────────────────────────┐
│  NAVIGATION                                        │
├───────────────┬────────────────────────────────────┤
│  SIDEBAR      │  CONTENT AREA                      │
│               │                                    │
│  ○ General    │  [Tab content renders here]        │
│  ○ Account    │                                    │
│  ○ Insights   │                                    │
│  ○ Transactions│                                   │
│  ○ Logs       │                                    │
│               │                                    │
└───────────────┴────────────────────────────────────┘
```

---

### Tab 1: General
```
Display Preferences
┌─────────────────────────────────────┐
│  Light Theme  ✅  [Selected]        │
│  Dark Theme   ○                     │
└─────────────────────────────────────┘
```

---

### Tab 2: Account
```
Account Settings
Name: [Md Arsalan          ] [Update]

──────────────────────────────────────
⚠️ Danger Zone
[Delete Account]  — permanently removes all data
```

---

### Tab 3: Insights
```
Portfolio Performance
┌──────────────┐  ┌──────────────┐
│ Balance      │  │ Total P&L    │
│ $104,866     │  │ +$4,866      │
│ ▲ +4.87%     │  │ ▲ All time   │
└──────────────┘  └──────────────┘

[Portfolio Balance Chart — line graph over time]
```

---

### Tab 4: Transactions
```
Transaction History
┌────┬──────┬──────┬────────┬──────────┬────────────┐
│ #  │ Type │ Tick │ Shares │ Amount   │ Date       │
├────┼──────┼──────┼────────┼──────────┼────────────┤
│ 1  │ BUY  │ AAPL │ 10     │ $1,523   │ 2026-03-01 │
│ 2  │ SELL │ TSLA │ 5      │ $1,180   │ 2026-03-02 │
│ 3  │ BUY  │ MSFT │ 8      │ $3,024   │ 2026-03-03 │
└────┴──────┴──────┴────────┴──────────┴────────────┘
BUY = green badge | SELL = red badge
```

---

### Tab 5: Logs
```
Activity Log  [12 records]
● Bought 10 shares of AAPL        2026-03-01 14:32
● Sold 5 shares of TSLA           2026-03-02 09:15
● Bought 8 shares of MSFT         2026-03-03 11:47
● Updated display name            2026-03-04 08:00
● Logged in                       2026-03-05 10:22
```

---

## 4. Navigation Flow Diagram

```
[Home] ──► [Guide] ──► [Auth: Register]
                              │
                              ▼
                       [Markets] ──► [Stock Detail] ──► [Buy]
                              │                           │
                              ▼                           ▼
                       [Investments] ◄──────────── [Portfolio Updates]
                              │
                              ▼
                       [Investment Detail] ──► [Sell]
                              │
                              ▼
                       [Dashboard]
                         ├── General
                         ├── Account
                         ├── Insights
                         ├── Transactions
                         └── Logs
```

---

*Document prepared for: College Project Submission*
*Project: StockPulse — Trading Platform Simulation*
*Author: Md Arsalan*
