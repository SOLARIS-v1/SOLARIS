# SOLARIS

[![NASA Space Apps 2026](https://img.shields.io/badge/NASA_Space_Apps-2026_Prototype-0B3D91?style=flat-square&logo=nasa)](https://www.spaceappschallenge.org/)
[![Build](https://img.shields.io/badge/Build-Prototype_v1.0-2ea44f?style=flat-square)](https://github.com/SOLARIS-v1/SOLARIS)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

SOLARIS is a Spaceflight Onboard Local Autonomous Readiness & Intelligence System for monitoring astronaut health, triaging risk, and supporting mission decision-making during deep-space operations.

The app combines a mission dashboard, clinical telemetry visualization, 3D anatomical exploration, hazard tracking, and reporting tools in a single operational interface.

## Overview

Designed for missions with limited communication and delayed ground support, SOLARIS helps crew members and flight surgeons quickly interpret physiological telemetry and prioritize interventions.

Key capabilities include:

- Real-time health status monitoring
- Clinical triage and risk classification
- 3D body explorer for anatomical symptom mapping
- Hazard and environmental tracking
- analytics and insights dashboard
- routine and history review
- report export utilities

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts
- Framer Motion
- @react-three/fiber + drei + three

## Project Structure

```text
SOLARIS/
├── .agent/
│   └── skills/
│       └── ui_ux_pro_max/
│           ├── data/
│           ├── scripts/
│           └── SKILL.md
│   └── workflows/
│       └── ui_ux_pro_max.md
├── design-system/
│   └── astra-health/
│       └── MASTER.md
├── public/
│   └── assets/
│       └── homepage-bg.jpg
├── src/
│   ├── assets/
│   │   └── homepage-bg.jpg
│   ├── components/
│   │   ├── body-explorer/
│   │   │   ├── Anatomical3DCanvas.tsx
│   │   │   ├── OrganDetailDrawer.tsx
│   │   │   └── ThreeErrorBoundary.tsx
│   │   ├── dashboard/
│   │   │   └── MetricCard.tsx
│   │   ├── health/
│   │   │   └── HealthInputModal.tsx
│   │   ├── home/
│   │   │   └── SaturnHeroCanvas.tsx
│   │   └── layout/
│   │       ├── DashboardLayout.tsx
│   │       ├── MissionHeader.tsx
│   │       ├── Navbar.tsx
│   │       └── Sidebar.tsx
│   ├── data/
│   │   ├── demoHealthData.ts
│   │   ├── hazardData.ts
│   │   └── routineData.ts
│   ├── pages/
│   │   ├── AnalyticsPage.tsx
│   │   ├── BodyExplorerPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── HazardsPage.tsx
│   │   ├── HealthMonitoringPage.tsx
│   │   ├── HistoryPage.tsx
│   │   ├── InsightsPage.tsx
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── ReportsPage.tsx
│   │   ├── RoutinePage.tsx
│   │   ├── SettingsPage.tsx
│   │   └── SignupPage.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── audio.ts
│   │   ├── exportReport.ts
│   │   ├── healthRules.ts
│   │   └── localStorage.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── setup-node.ps1
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## Getting Started

```bash
# install dependencies
npm install

# start development server
npm run dev

# production build
npm run build
```

## Main Application Areas

- Dashboard: overview of mission health and key metrics
- Health Monitoring: telemetry and clinical state review
- Body Explorer: interactive 3D anatomical mapping
- Hazards: environmental risk and mission threat monitoring
- Analytics + Insights: trends, interpretation, and recommendations
- Routine + History: daily tasks and mission timeline tracking
- Reports + Settings: exports and user configuration

## Notes

This repository is structured as a frontend prototype and design system for a spaceflight health monitoring experience, with additional AI and design system assets in the `.agent` and `design-system` folders.

## License

This project is licensed under the MIT License.
