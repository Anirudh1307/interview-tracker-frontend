# Interview Tracker Frontend

Interview Tracker Frontend is a responsive React application built for job seekers who want a cleaner way to manage applications and understand interview performance. It transforms job-search activity into a focused product experience with dashboards, status tracking, and production-ready UI patterns. The frontend is designed to work with the Spring Boot API and is deployed independently on Vercel.

## 🚀 Key Highlights

- Full-stack production deployment with Vercel, Render, and Neon
- Secure JWT authentication integrated with the Spring Boot backend
- Interactive analytics dashboard with KPI cards, charts, and recent activity
- Modern responsive UI built with Material UI and Recharts
- Clean backend integration with a layered Spring Boot architecture

## 📌 Project Purpose

The frontend exists to give job seekers a simple, reliable workspace for tracking progress across applications, interview rounds, and outcomes. It focuses on fast scanning, better visual hierarchy, and an experience that feels closer to a shipped product than a basic CRUD demo.

## ✨ Advanced Features

- Responsive and modern UI design system with reusable surfaces, headers, and form layouts
- Smooth animations, hover states, skeleton loaders, and polished interaction feedback
- Secure API integration with token-based authentication and protected requests
- Scalable frontend structure with shared theme configuration and reusable UI building blocks
- Analytics with data visualization for status distribution, offer rate, recent activity, and monthly trends

## Overview

This frontend solves a real workflow problem: keeping applications organized without relying on spreadsheets or scattered notes. It gives users a modern interface for managing opportunities, reviewing progress, and spotting trends across the hiring pipeline. The result is a portfolio-ready React application with clear product value and production-style deployment.

## Live Application

- Frontend: https://interview-tracker-frontend-txa4.vercel.app/
- Backend API: https://interview-tracker-backend-tkf4.onrender.com

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| React | Application framework | 18.2.0 |
| Material UI | Component system and theming | 7.3.7 |
| Recharts | Data visualization | 3.7.0 |
| Axios | API client | 1.6.2 |
| React Toastify | Notifications | 11.0.5 |
| React Scripts | Build tooling | 5.0.1 |

## UI System

### Theme

The frontend uses a custom Material UI theme focused on readability, polish, and modern contrast.

| Token | Value |
|------|-------|
| Primary | `#4F46E5` |
| Secondary | `#22C55E` |
| Background | `#F8FAFC` |
| Surface | `#FFFFFF` |
| Text Primary | `#0F172A` |
| Text Secondary | `#64748B` |

### Design Notes

- Rounded surfaces and inputs for a softer, modern look
- Consistent spacing scale across cards, sections, and forms
- Elevated primary actions with clearer hover feedback
- Responsive layouts tuned for mobile, tablet, and desktop

### Status Colors

| Status | Color |
|--------|-------|
| Applied | `#4F46E5` |
| Online Assessment | `#0EA5E9` |
| Interview | `#F59E0B` |
| HR Round | `#8B5CF6` |
| Offered | `#22C55E` |
| Rejected | `#EF4444` |

## Screenshots

### Dashboard

Primary analytics workspace with application KPIs, status distribution, recent activity, and trend visualization.

### Job Applications

Responsive application management view with clear status chips, structured metadata, and focused actions.

### Authentication

Branded login and registration experience with validation feedback and cleaner visual hierarchy.

### Mobile Experience

Stacked layouts and touch-friendly spacing optimized for smaller screens without losing readability.

## Component Structure

```text
src/
├── components/
│   ├── Auth/
│   ├── Dashboard/
│   ├── Jobs/
│   ├── Layout/
│   └── UI/
├── services/
├── App.jsx
├── index.js
└── theme.js
```

## Core Frontend Capabilities

- Authentication flow for registration and login
- Dashboard analytics with cards, pie chart, line chart, and recent activity
- Job application creation and deletion workflows
- Shared design system through a centralized MUI theme
- Feedback patterns including loading states and toast notifications

## Local Development

### Prerequisites

- Node.js 16+
- npm 8+
- Running backend API

### Setup

```bash
git clone https://github.com/Anirudh1307/interview-tracker-frontend.git
cd interview-tracker-frontend
npm install
```

Create `.env`:

```env
REACT_APP_API_URL=http://localhost:8080
```

Start the development server:

```bash
npm start
```

The app runs at `http://localhost:3000`.

## Production Deployment

The frontend is configured for Vercel deployment and consumes the Render-hosted backend through `REACT_APP_API_URL`.

### Required Environment Variable

```env
REACT_APP_API_URL=https://your-backend.onrender.com
```

### Build Command

```bash
npm run build
```

## Project Strengths

- Strong visual polish with a consistent component system
- Clear UX improvements around spacing, hierarchy, and responsiveness
- Practical use of analytics and data visualization
- Production deployment setup that mirrors real-world workflows

## Related Documentation

- Backend README: [../backend/README.md](../backend/README.md)
- Root project README: [../README.md](../README.md)
