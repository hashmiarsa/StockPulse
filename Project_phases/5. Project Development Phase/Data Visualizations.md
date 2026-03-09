# Data Visualizations
### StockPulse — Trading Platform Simulation
**Phase 5: Project Development Phase**

---

## 1. Overview

StockPulse uses data visualisation extensively to communicate real-time stock prices, portfolio performance, and financial metrics to users in an intuitive and visually clear format. This document describes all data visualisation components implemented in the application.

---

## 2. Visualisation 1: Live Price Chart (PriceChart Component)

### Purpose
Display the real-time price movement of an individual stock as a live updating line chart.

### Location
- Stock Card (Markets page — compact view)
- Stock Detail page (full view)

### Technology
- **Library:** Chart.JS v3
- **Type:** Line Chart (canvas-based)
- **Data:** Streamed via Socket.IO WebSocket in real time

### Chart Configuration
```javascript
{
  type: 'line',
  data: {
    labels: [],           // timestamps (hidden)
    datasets: [{
      data: [],           // price history array
      borderColor: '#00C805',    // green line
      backgroundColor: 'rgba(0,200,5,0.1)', // green fill
      borderWidth: 2,
      pointRadius: 0,     // no dots for clean look
      tension: 0.4        // smooth curve
    }]
  },
  options: {
    maintainAspectRatio: false,  // fills container
    responsive: true,
    scales: { x: { display: false }, y: { display: false } },
    plugins: { legend: { display: false } },
    animation: { duration: 0 }  // no animation for real-time
  }
}
```

### Visual Description
```
$155 ┤         ╭──╮
$153 ┤    ╭────╯  ╰─╮
$151 ┤────╯          ╰────
$149 ┤
     └────────────────────► time
```
- Green line on white background
- Fills container height (64px in cards, larger on detail page)
- Updates in real time as WebSocket prices arrive
- No axes or labels — clean minimal design

---

## 3. Visualisation 2: Current Price Badge (CurrentPrice Component)

### Purpose
Show the current price of a stock with a clear directional indicator (up/down) and percentage change.

### Location
- Every StockCard on Markets page
- Stock Detail page
- Purchased Stock Detail page

### Visual Design
```
Green badge (price increased):   ▲ $152.34  +2.3%
Red badge (price decreased):     ▼ $149.10  -1.8%
```

### Logic
```
direction = newPrice > previousPrice ? 'up' : 'down'
changePercent = |((newPrice - initialPrice) / initialPrice)| × 100
color = direction === 'up' ? '#00C805' (green) : '#ef4444' (red)
```

### Component Style
- Pill-shaped badge
- Bold percentage number
- Arrow icon for direction
- Updates in real time from Socket.IO

---

## 4. Visualisation 3: Investment P&L Badge (InvestmentPrice Component)

### Purpose
Show the current profit or loss on a purchased stock investment.

### Location
- Investments list (PurchaseListView)
- Purchased Stock Detail page

### Visual Design
```
Profit:  ✅  +$96.60   (+6.34%)   [Green pill]
Loss:    🔴  -$45.00   (-3.67%)   [Red pill]
```

### Calculation
```
currentValue = shares × currentPrice
initialInvestment = shares × buyPrice
profitLoss = currentValue - initialInvestment
profitLossPercent = (profitLoss / initialInvestment) × 100
```

---

## 5. Visualisation 4: Portfolio Summary Cards (Insights Tab)

### Purpose
Display high-level portfolio metrics in clear stat cards.

### Location
- Dashboard → Insights Tab

### Visual Design
```
┌────────────────────┐  ┌────────────────────┐
│   Current Balance  │  │   Total P&L        │
│                    │  │                    │
│   $104,866.40      │  │   +$4,866.40       │
│   ▲ +4.87%         │  │   All investments  │
└────────────────────┘  └────────────────────┘
```

### Colour Coding
- Positive P&L → Green text + green percentage badge
- Negative P&L → Red text + red percentage badge
- Balance card → Always displayed in primary black

---

## 6. Visualisation 5: Transaction Type Badges (Transactions Tab)

### Purpose
Visually distinguish between BUY and SELL transactions in the transaction history table.

### Location
- Dashboard → Transactions Tab

### Visual Design
```
┌────────────────────────────────────────────────────────┐
│  #  │  Type        │  Ticker  │  Shares  │  Amount     │
│  1  │  ✅ BUY      │  AAPL    │  10      │  $1,523.40  │
│  2  │  🔴 SELL     │  TSLA    │  5       │  $1,180.00  │
└────────────────────────────────────────────────────────┘
```

- **BUY** = Green pill badge
- **SELL** = Red pill badge

---

## 7. Visualisation 6: Activity Log Indicators (Logs Tab)

### Purpose
Visually indicate each log entry with a colour dot for quick scanning.

### Location
- Dashboard → Logs Tab

### Visual Design
```
● [green dot]  Bought 10 shares of AAPL     2026-03-01 14:32
● [green dot]  Sold 5 shares of TSLA        2026-03-02 09:15
● [green dot]  Updated display name         2026-03-04 08:00
```

### Metadata Badge
- Total record count displayed as a badge: `[12 records]`

---

## 8. Visualisation 7: Portfolio Holdings Table

### Purpose
Give users a clear tabular view of all their stock holdings with performance data.

### Location
- Investments page (PurchaseListView)

### Visual Design
```
┌────────┬──────────┬──────────┬─────────┬──────────────┐
│ Stock  │  Shares  │ Invested │ Current │ Gain / Loss  │
├────────┼──────────┼──────────┼─────────┼──────────────┤
│ AAPL   │  10      │ $1,523   │ $1,620  │ ✅ +$97(+6%) │
│ TSLA   │  5       │ $1,225   │ $1,180  │ 🔴 -$45(-4%) │
│ MSFT   │  8       │ $3,024   │ $3,100  │ ✅ +$76(+3%) │
└────────┴──────────┴──────────┴─────────┴──────────────┘
```

---

## 9. Design Principles for Data Visualisation

| Principle | Implementation |
|-----------|---------------|
| **Colour consistency** | Green always = positive/gain, Red always = negative/loss |
| **Minimal decoration** | Charts have no axes labels, grid lines hidden — clean and focused |
| **Real-time feedback** | All price-related visualisations update live via WebSocket |
| **Progressive disclosure** | Summary badges on cards, full details on detail pages |
| **Accessibility** | Colour + icon/arrow combined — not colour alone — for direction |

---

## 10. Summary of All Visualisations

| # | Component | Type | Location | Updates |
|---|-----------|------|----------|---------|
| 1 | PriceChart | Line Chart (Chart.JS) | Stock cards, Stock detail | Real-time (WebSocket) |
| 2 | CurrentPrice | Badge/pill | Markets, Stock detail | Real-time (WebSocket) |
| 3 | InvestmentPrice | Badge/pill | Investments, Investment detail | Real-time (WebSocket) |
| 4 | Portfolio Summary | Stat cards | Dashboard Insights | On load |
| 5 | Transaction Badges | Coloured pills | Dashboard Transactions | On load |
| 6 | Log Indicators | Dot + text | Dashboard Logs | On load |
| 7 | Holdings Table | Table | Investments page | Real-time (WebSocket) |

---

*Document prepared for: College Project Submission*
*Project: StockPulse — Trading Platform Simulation*
*Author: Md Arsalan*
