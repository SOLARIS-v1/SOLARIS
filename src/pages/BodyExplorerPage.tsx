import React, { useState } from 'react';
import {
  Brain,
  Heart,
  Activity,
  Layers,
  Sparkles,
  Info,
  Maximize2,
  RefreshCw,
  Eye,
  Sliders,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import Anatomical3DCanvas from '../components/body-explorer/Anatomical3DCanvas';
import OrganDetailDrawer from '../components/body-explorer/OrganDetailDrawer';
import { ThreeErrorBoundary } from '../components/body-explorer/ThreeErrorBoundary';
import { ANATOMICAL_BODY_SYSTEMS } from '../data/hazardData';
import { OrganSystemInfo } from '../types';
import { sound } from '../utils/audio';

export default function BodyExplorerPage() {
  const [selectedOrgan, setSelectedOrgan] = useState<OrganSystemInfo | null>(ANATOMICAL_BODY_SYSTEMS[1]);
  const [visualMode, setVisualMode] = useState<'hologram' | 'sensors' | 'xray'>('hologram');
  const [is2DFallback, setIs2DFallback] = useState(false);

  const handleSelectOrgan = (organ: OrganSystemInfo) => {
    sound.playClick();
    setSelectedOrgan(organ);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col select-none">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-2 border-b border-[#E4DAD0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#542B38] animate-ping" />
            <h1 className="text-xl font-bold text-[#33302E] font-orbitron tracking-wide">
              3D Human Anatomical Body Explorer
            </h1>
          </div>
          <p className="text-xs font-mono text-[#817A76] mt-0.5">
            Interactive biomechanical model: click organs to inspect spaceflight physiological hazards and countermeasures.
          </p>
        </div>

        {/* View mode buttons */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Visual Mode selector */}
          <div className="flex items-center p-1 rounded-xl bg-[#F5F0E9] border border-[#E4DAD0]">
            {[
              { key: 'hologram', label: 'Hologram' },
              { key: 'sensors', label: 'Biometrics' },
              { key: 'xray', label: 'X-Ray' },
            ].map((mode) => (
              <button
                key={mode.key}
                onClick={() => {
                  sound.playClick();
                  setVisualMode(mode.key as any);
                }}
                className={`px-3 py-1.5 rounded-lg transition ${
                  visualMode === mode.key
                    ? 'bg-[#542B38] text-[#F5F0E9] font-bold shadow-sm'
                    : 'text-[#817A76] hover:text-[#33302E]'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* 2D / 3D Fallback Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setIs2DFallback(!is2DFallback);
            }}
            className="px-3 py-2 rounded-xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] text-[#33302E] text-xs font-mono transition"
            title="Toggle between 3D WebGL and 2D Schematic mode"
          >
            {is2DFallback ? 'Switch to 3D View' : '2D Fallback Mode'}
          </button>
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 relative">
        {/* 3D Canvas / 2D Schematic Container */}
        <div className="lg:col-span-7 xl:col-span-8 rounded-2xl bg-[#200D14] border border-[#6E3B4B] overflow-hidden relative shadow-warm-lg flex flex-col">
          {/* Organ Quick Selector Pills */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap gap-1.5 pointer-events-auto">
            {ANATOMICAL_BODY_SYSTEMS.map((organ) => (
              <button
                key={organ.id}
                onClick={() => handleSelectOrgan(organ)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition backdrop-blur-md ${
                  selectedOrgan?.id === organ.id
                    ? 'bg-[#D5BDA4] text-[#542B38] font-bold shadow-warm-sm'
                    : 'bg-[#2E151E]/90 border border-[#D5BDA4]/30 text-[#F5F0E9] hover:border-[#D5BDA4]'
                }`}
              >
                {organ.name.split('&')[0]}
              </button>
            ))}
          </div>

          {/* Instructions banner at bottom */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none text-[11px] font-mono text-[#D5BDA4] bg-[#2E151E]/90 px-3 py-1.5 rounded-lg border border-[#D5BDA4]/30 backdrop-blur-md">
            Click pulsing nodes to inspect • Drag to rotate • Scroll to zoom
          </div>

          {is2DFallback ? (
            /* 2D Fallback Schematic */
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#FAF5EE] overflow-y-auto">
              <div className="w-16 h-16 rounded-full bg-[#F5F0E9] border border-[#D5BDA4] flex items-center justify-center text-[#542B38] mb-4 shadow-sm">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#33302E] font-orbitron mb-2">2D Anatomical System Map</h3>
              <p className="text-xs text-[#817A76] max-w-md mb-6 font-mono">
                High-contrast accessibility mode for tablets, mobile screens, or performance-constrained systems.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl">
                {ANATOMICAL_BODY_SYSTEMS.map((organ) => (
                  <button
                    key={organ.id}
                    onClick={() => handleSelectOrgan(organ)}
                    className={`p-4 rounded-xl border text-left transition ${
                      selectedOrgan?.id === organ.id
                        ? 'bg-[#FAF5EE] border-[#542B38] shadow-sm'
                        : 'bg-[#FFFCF8] border-[#E4DAD0] hover:border-[#D5BDA4]'
                    }`}
                  >
                    <div className="text-xs font-mono text-[#542B38] uppercase mb-1">
                      {organ.subsystem.split('&')[0]}
                    </div>
                    <div className="text-sm font-bold text-[#33302E] mb-2">{organ.name}</div>
                    <div className="text-[10px] font-mono text-[#817A76] truncate">
                      {organ.currentTelemetryValue}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* 3D WebGL Canvas with ErrorBoundary */
            <ThreeErrorBoundary>
              <Anatomical3DCanvas
                selectedOrgan={selectedOrgan}
                onSelectOrgan={handleSelectOrgan}
                visualMode={visualMode}
              />
            </ThreeErrorBoundary>
          )}
        </div>

        {/* Right Drawer: Organ Clinical Dossier */}
        <div className="lg:col-span-5 xl:col-span-4 rounded-2xl overflow-hidden">
          <OrganDetailDrawer
            organ={selectedOrgan}
            onClose={() => setSelectedOrgan(null)}
          />
        </div>
      </div>
    </div>
  );
}
