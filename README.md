# Interview Tracker - Frontend

> A modern React application for tracking job applications and interview progress with real-time analytics

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.14.0-blue.svg)](https://mui.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.8.0-brightgreen.svg)](https://recharts.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Overview

Interview Tracker Frontend is a responsive React application that helps job seekers manage their application process. It provides an intuitive interface for tracking applications, interview rounds, and visualizing success metrics through interactive charts and analytics.

**Live Demo**: https://interview-tracker-frontend-txa4.vercel.app/

**Backend Repository**: [interview-tracker-backend](https://github.com/Anirudh1307/interview-tracker-backend)

---

## ✨ Features

### 🔐 Authentication
- User registration with email validation
- Secure login with JWT token storage
- Password strength validation
- Persistent sessions with localStorage
- Auto-logout on token expiration

### 📊 Dashboard Analytics
- **Total Applications**: Track all submitted applications
- **Total Interviews**: Count of interview rounds completed
- **Total Offers**: Number of job offers received
- **Offer Rate**: Success percentage calculation
- **Active Applications**: Applications in progress (excludes offered/rejected)
- **Status Distribution**: Pie chart showing application status breakdown
- **Recent Activity**: Last 5 applications with status badges
- **Monthly Trends**: Line chart displaying 6-month application trends

### 💼 Job Management
- Create new job applications with company, role, date, and status
- Edit existing applications
- Delete applications (with confirmation)
- Status tracking: APPLIED → OA → INTERVIEW → HR → OFFERED/REJECTED
- Real-time updates to dashboard

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface
- Adaptive layouts using Material-UI Grid/Stack

### 🎨 Modern UI/UX
- Material-UI components with custom theme
- Smooth animations and transitions
- Hover effects on cards and buttons
- Loading skeletons for better UX
- Toast notifications for user feedback
- Color-coded status badges

---

## 🚀 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI library | 18.2.0 |
| **Material-UI (MUI)** | Component library | 5.14.0 |
| **Recharts** | Data visualization | 2.8.0 |
| **Axios** | HTTP client | 1.5.0 |
| **React Toastify** | Notifications | 9.1.3 |
| **React Router** | Navigation (if added) | - |

---

## 📸 Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)
*Analytics dashboard with KPI cards, charts, and recent activity*

### Job Applications
![Job List](./screenshots/jobs.png)
*Job applications list with status badges and action buttons*

### Login Page
![Login](./screenshots/login.png)
*Clean login interface with form validation*

### Mobile View
![Mobile](./screenshots/mobile.png)
*Responsive design optimized for mobile devices*

> **Note**: Add screenshots to `/screenshots` folder

---

## 🏗️ Component Architecture

```
App.jsx (Root)
├── Navbar (Navigation & Logout)
├── Dashboard
│   ├── StatCard (KPI metrics)
│   ├── StatusChart (Pie chart)
│   ├── RecentActivity (Last 5 apps)
│   └── TrendChart (Line chart)
├── JobList
│   ├── JobForm (Create/Edit)
│   └── JobCard (Display)
└── Auth
    ├── Login
    └── Register
```

### Component Responsibilities

**App.jsx**
- Manages global state (token, view)
- Handles authentication flow
- Provides theme configuration
- Controls navigation between views

**Dashboard Components**
- `StatCard`: Reusable KPI card with icon and value
- `StatusChart`: Pie chart for status distribution
- `RecentActivity`: List of recent applications
- `TrendChart`: Line chart for monthly trends

**JobList**
- Displays all job applications
- Handles CRUD operations
- Manages form state
- Triggers dashboard refresh on changes

**Auth Components**
- `Login`: User authentication
- `Register`: New user signup with validation

---

## 🛠️ Local Development

### Prerequisites

- Node.js 16+ and npm 8+
- Git
- Backend API running (see backend README)

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/Anirudh1307/interview-tracker-frontend.git
cd interview-tracker-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
# Copy example file
cp .env.example .env

# Edit .env
REACT_APP_API_URL=http://localhost:8080
```

4. **Start development server**
```bash
npm start
```

5. **Open browser**
```
http://localhost:3000
```

### Available Scripts

```bash
npm start          # Start development server (port 3000)
npm run build      # Create production build
npm test           # Run tests
npm run eject      # Eject from Create React App (irreversible)
```

---

## 🚢 Production Deployment (Vercel)

### Step 1: Prepare for Deployment

1. **Update production environment**
```bash
# Edit .env.production
REACT_APP_API_URL=https://your-backend.onrender.com
```

2. **Test production build locally**
```bash
npm run build
npx serve -s build
```

### Step 2: Deploy to Vercel

1. Push code to GitHub
```bash
git add .
git commit -m "chore: prepare for production deployment"
git push origin main
```

2. Create account at [vercel.com](https://vercel.com)

3. Import repository
   - Click "Add New" → "Project"
   - Select `interview-tracker-frontend`
   - Click "Import"

4. Configure project
   - **Framework Preset**: Create React App (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. Add environment variable
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend.onrender.com`

6. Click "Deploy" → Wait 2-5 minutes → Copy URL

### Step 3: Update Backend CORS

Update backend `CORS_ALLOWED_ORIGINS` with your Vercel URL:
```
https://your-app.vercel.app
```

---

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html              # HTML template
│   ├── favicon.ico             # App icon
│   └── manifest.json           # PWA manifest
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx       # Login form
│   │   │   └── Register.jsx    # Registration form
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx   # Main dashboard
│   │   │   ├── StatCard.jsx    # KPI card component
│   │   │   ├── StatusChart.jsx # Pie chart
│   │   │   ├── RecentActivity.jsx  # Recent apps list
│   │   │   └── TrendChart.jsx  # Line chart
│   │   ├── Jobs/
│   │   │   └── JobList.jsx     # Job CRUD operations
│   │   └── Layout/
│   │       └── Navbar.jsx      # Navigation bar
│   ├── services/
│   │   └── api.js              # Axios configuration & API calls
│   ├── App.jsx                 # Root component
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── .env                        # Local environment (gitignored)
├── .env.example                # Environment template
├── .env.production             # Production config (gitignored)
├── .env.production.example     # Production template
├── .gitignore                  # Git exclusions
├── package.json                # Dependencies
├── README.md                   # This file
└── vercel.json                 # Vercel configuration
```

---

## ⚙️ Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `https://api.example.com` |

**Development (.env)**
```env
REACT_APP_API_URL=http://localhost:8080
```

**Production (.env.production)**
```env
REACT_APP_API_URL=https://your-backend.onrender.com
```

---

## 🎨 Theme Configuration

The app uses a custom Material-UI theme with:

```javascript
{
  palette: {
    primary: { main: '#1976d2' },      // Blue
    secondary: { main: '#dc004e' },    // Pink
    background: {
      default: '#f5f7fa',              // Light gray
      paper: '#ffffff'                 // White
    }
  },
  components: {
    MuiCard: {
      // Hover effects on cards
    },
    MuiButton: {
      // Smooth transitions on buttons
    }
  }
}
```

### Status Colors

```javascript
APPLIED:    '#1976d2'  // Blue
OA:         '#9c27b0'  // Purple
INTERVIEW:  '#ed6c02'  // Orange
HR:         '#0288d1'  // Light Blue
OFFERED:    '#2e7d32'  // Green
REJECTED:   '#d32f2f'  // Red
```

---

## 🔌 API Integration

### API Service (`services/api.js`)

```javascript
// Axios instance with base URL
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor (adds JWT token)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor (handles errors)
api.interceptors.response.use(
  response => response,
  error => {
    toast.error(error.response?.data?.message || 'An error occurred');
    return Promise.reject(error);
  }
);
```

### Service Methods

```javascript
// Authentication
authService.register(data)
authService.login(data)

// Job Applications
jobService.getAll()
jobService.create(data)
jobService.update(id, data)
jobService.delete(id)

// Analytics
analyticsService.get()
```

---

## 📊 Dashboard Analytics Explained

### KPI Cards

1. **Total Applications**: Count of all job applications
2. **Total Interviews**: Sum of all interview rounds across jobs
3. **Total Offers**: Count of applications with status "OFFERED"
4. **Offer Rate**: `(Total Offers / Total Applications) × 100`
5. **Active Applications**: Applications not in OFFERED or REJECTED status

### Status Distribution (Pie Chart)

Shows percentage breakdown of applications by status:
- APPLIED, OA, INTERVIEW, HR, OFFERED, REJECTED

### Recent Activity

Displays last 5 applications with:
- Company name
- Role
- Applied date
- Status badge (color-coded)

### Monthly Trends (Line Chart)

6-month trend showing:
- Total applications per month
- Total interviews per month
- Total offers per month

---

## 🎯 Best Practices Implemented

- ✅ Component-based architecture
- ✅ Separation of concerns (components, services, styles)
- ✅ Environment-based configuration
- ✅ Error handling with user-friendly messages
- ✅ Loading states for better UX
- ✅ Responsive design (mobile-first)
- ✅ Accessibility considerations
- ✅ Code reusability (StatCard, API service)
- ✅ Consistent naming conventions
- ✅ Clean folder structure

---

## 🔮 Future Enhancements

- [ ] Add React Router for multi-page navigation
- [ ] Implement search and filter for job list
- [ ] Add sorting options (by date, company, status)
- [ ] Create interview round management UI
- [ ] Add export functionality (CSV, PDF)
- [ ] Implement dark mode toggle
- [ ] Add profile page with user settings
- [ ] Create notification system for upcoming interviews
- [ ] Add calendar view for interview dates
- [ ] Implement drag-and-drop for status updates
- [ ] Add company logo integration
- [ ] Create onboarding tutorial for new users

---

## 🐛 Known Issues

- None currently reported

---

## 📝 License

This project is licensed under the MIT License.

---

## 👤 Author

**Anirudh**

- GitHub: [@Anirudh1307](https://github.com/Anirudh1307)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Portfolio: [Your Portfolio](https://your-portfolio.com)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📞 Support

For support, email your-email@example.com or open an issue.

---

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) for the component library
- [Recharts](https://recharts.org/) for data visualization
- [React Toastify](https://fkhadra.github.io/react-toastify/) for notifications
- [Vercel](https://vercel.com/) for hosting

---

**⭐ Star this repository if you found it helpful!**
