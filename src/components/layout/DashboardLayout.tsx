import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MissionHeader from './MissionHeader';
import { SpaceEnvironment } from '../../types';

interface DashboardLayoutProps {
  onEnvironmentChange?: (env: SpaceEnvironment) => void;
}

export default function DashboardLayout({ onEnvironmentChange }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-[#F5F0E9] text-[#33302E] selection:bg-[#D5BDA4] selection:text-[#542B38]">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main Mission Control Content area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden relative">
        {/* Subtle warm background ambient accents */}
        <div className="fixed top-0 right-1/4 w-96 h-96 bg-[#D5BDA4]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="fixed bottom-10 left-1/3 w-[30rem] h-[30rem] bg-[#A56F73]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Sticky top header */}
        <MissionHeader onEnvironmentChange={onEnvironmentChange} />

        {/* Dynamic page content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-300">
          <Outlet />
        </main>

        {/* Footer with NASA Space Apps Challenge 2026 branding */}
        <footer className="mt-auto px-6 py-4 border-t border-[#E4DAD0] text-center text-xs font-mono text-[#817A76] flex flex-col sm:flex-row items-center justify-between gap-2 bg-[#FFFCF8]">
          <div className="font-semibold text-[#542B38]">
            SOLARIS â€¢ NASA Space Apps Challenge 2026 Prototype
          </div>
          <div className="text-[11px] text-[#817A76]">
            Simulated Prototype Telemetry â€¢ Not For Real Medical Diagnoses
          </div>
        </footer>
      </div>
    </div>
  );
}

