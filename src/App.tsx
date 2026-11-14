import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import HealthMonitoringPage from './pages/HealthMonitoringPage';
import BodyExplorerPage from './pages/BodyExplorerPage';
import AnalyticsPage from './pages/AnalyticsPage';
import HazardsPage from './pages/HazardsPage';
import InsightsPage from './pages/InsightsPage';
import RoutinePage from './pages/RoutinePage';
import HistoryPage from './pages/HistoryPage';
import ReportsPage from './pages/ReportsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import { SpaceEnvironment } from './types';
import { getSelectedEnvironment } from './utils/localStorage';

export default function App() {
  const [currentEnvironment, setCurrentEnvironment] = useState<SpaceEnvironment>(getSelectedEnvironment());

  return (
    <Router>
      <Routes>
        {/* Public Landing & Auth */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Mission Control Dashboard Layout */}
        <Route
          element={
            <DashboardLayout
              onEnvironmentChange={(env) => setCurrentEnvironment(env)}
            />
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/health-monitoring" element={<HealthMonitoringPage />} />
          <Route path="/body-explorer" element={<BodyExplorerPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/hazards" element={<HazardsPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/routine" element={<RoutinePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
