# Project Planning
### StockPulse — Trading Platform Simulation
**Phase 4: Project Planning Phase**

---

## 1. Project Overview

| Field | Details |
|-------|---------|
| Project Name | StockPulse — Trading Platform Simulation |
| Author | Md Arsalan |
| GitHub | [@hashmiarsa](https://github.com/hashmiarsa) |
| Live URL | https://stock-pulse-olive.vercel.app/ |
| Type | Full-Stack Web Application (MERN) |
| Purpose | College Project Submission |

---

## 2. Project Scope

### In Scope
- Full-stack MERN web application
- User authentication (register, login, JWT)
- Virtual trading engine (buy/sell stocks)
- Real-time price updates via Socket.IO
- Portfolio tracking with P&L calculations
- Dashboard with insights, transactions, logs
- Complete UI redesign (Robinhood-inspired)
- Deployment on Vercel + MongoDB Atlas
- Unit and E2E tests

### Out of Scope
- Real money / payment integration
- Mobile native app (iOS/Android)
- Real market data API integration
- AI-based stock recommendations
- Social features (leaderboard, sharing)
- Admin panel

---

## 3. Work Breakdown Structure (WBS)

```
StockPulse Project
│
├── 1. Planning & Research
│   ├── 1.1 Brainstorming & Ideation
│   ├── 1.2 Define Problem Statement
│   ├── 1.3 Empathy Mapping
│   ├── 1.4 Requirements Analysis
│   └── 1.5 Technology Stack Selection
│
├── 2. Design
│   ├── 2.1 System Architecture Design
│   ├── 2.2 Database Schema Design
│   ├── 2.3 UI/UX Design System
│   └── 2.4 Component Hierarchy Design
│
├── 3. Backend Development
│   ├── 3.1 Project Setup (Node.JS + Express)
│   ├── 3.2 MongoDB Atlas + Mongoose Setup
│   ├── 3.3 User Authentication (JWT + bcrypt)
│   ├── 3.4 Stock API (CRUD)
│   ├── 3.5 Trading API (Buy/Sell)
│   ├── 3.6 Transactions & Logs API
│   ├── 3.7 Socket.IO Real-Time Price Engine
│   └── 3.8 Database Seeding (50 stocks)
│
├── 4. Frontend Development
│   ├── 4.1 React + Redux Setup (CRACO + Tailwind)
│   ├── 4.2 Auth Components (Login/Register)
│   ├── 4.3 Navigation + Footer
│   ├── 4.4 Home Page (Landing, Features, About, Showcase)
│   ├── 4.5 Markets Page (StockView, Grid/List, Search, Sort)
│   ├── 4.6 Stock Detail Page
│   ├── 4.7 Transaction Form (Buy/Sell)
│   ├── 4.8 Portfolio / Investments Pages
│   ├── 4.9 Dashboard (All 5 tabs)
│   ├── 4.10 Guide Page
│   └── 4.11 UI Redesign (25+ components)
│
├── 5. Testing
│   ├── 5.1 Unit Tests (React Testing Library)
│   └── 5.2 E2E Tests (Cypress)
│
└── 6. Deployment & Documentation
    ├── 6.1 Vercel Deployment
    ├── 6.2 MongoDB Atlas Configuration
    ├── 6.3 README.md
    └── 6.4 Project Phase Documentation
```

---

## 4. Project Timeline (Gantt Overview)

| Phase | Tasks | Duration |
|-------|-------|---------|
| Phase 1: Planning | Brainstorming, Problem Statement, Empathy Map | Week 1 |
| Phase 2: Requirements | Customer Journey, DFD, Requirements, Tech Stack | Week 2 |
| Phase 3: Design | Architecture, DB Schema, UI Design System | Week 3 |
| Phase 4: Backend Dev | Server setup, APIs, Socket.IO, Seeding | Week 4–5 |
| Phase 5: Frontend Dev | All components, Redux, Routing | Week 5–7 |
| Phase 6: UI Redesign | 25+ component redesigns, design system | Week 7–8 |
| Phase 7: Testing | Unit tests, Cypress E2E | Week 8 |
| Phase 8: Deployment | Vercel, MongoDB Atlas, env config | Week 9 |
| Phase 9: Documentation | README, Project Phases docs | Week 9–10 |

---

## 5. Resource Planning

### Human Resources
| Role | Person | Responsibilities |
|------|--------|-----------------|
| Full Stack Developer | Md Arsalan | All development, design, deployment |

### Technical Resources
| Resource | Tool/Platform | Cost |
|----------|--------------|------|
| Code Editor | VS Code | Free |
| Version Control | Git + GitHub | Free |
| Frontend Hosting | Vercel | Free tier |
| Database | MongoDB Atlas | Free M0 tier |
| Package Manager | npm | Free |
| Testing | React Testing Library + Cypress | Free |

---

## 6. Risk Management

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| MongoDB Atlas connection issues | Medium | High | Use `.env` for connection string, test locally first |
| Vercel build failure | Medium | High | Override build command for CRACO compatibility |
| VPN blocking MongoDB Atlas | High | High | Turn off VPN before running backend |
| Socket.IO disconnections | Low | Medium | Socket.IO handles automatic reconnection |
| Node version compatibility | Medium | Medium | Use `--openssl-legacy-provider` flag |
| Free tier limits exceeded | Low | Medium | Monitor Atlas and Vercel usage |

---

## 7. Definition of Done

A feature is considered complete when:
- ✅ Backend API endpoint implemented and tested via Postman
- ✅ Frontend component built and connected to Redux
- ✅ Feature works end-to-end (UI → API → Database)
- ✅ UI follows the design system (colours, typography, spacing)
- ✅ No console errors in browser developer tools
- ✅ Committed and pushed to GitHub

The project is complete when:
- ✅ All functional requirements (FR-01 to FR-40) are implemented
- ✅ Application deployed and accessible via Vercel live URL
- ✅ All project phase documentation completed
- ✅ GitHub repository contains all code and documentation

---

## 8. Communication & Version Control

| Activity | Tool | Frequency |
|----------|------|-----------|
| Version control | Git | Every feature |
| Remote repository | GitHub (hashmiarsa/stockpulse) | Every push |
| Deployment | Vercel (auto-deploy on push to main) | Every push to main |

**Branching Strategy:** Single `main` branch for simplicity (solo developer project)

---

*Document prepared for: College Project Submission*
*Project: StockPulse — Trading Platform Simulation*
*Author: Md Arsalan*
