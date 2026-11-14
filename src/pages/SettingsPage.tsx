import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Volume2,
  VolumeX,
  RotateCcw,
  LogOut,
  Moon,
  Sun,
  Shield,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import {
  getSoundEnabled,
  setSoundEnabled,
  getUnitsPreference,
  setUnitsPreference,
  resetDemoData,
  clearAuthUser
} from '../utils/localStorage';
import { sound } from '../utils/audio';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [soundOn, setSoundOn] = useState(getSoundEnabled());
  const [units, setUnits] = useState<'metric' | 'imperial'>(getUnitsPreference());
  const [hudScanlines, setHudScanlines] = useState(true);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundEnabled(next);
    setSoundOn(next);
    if (next) sound.playClick();
  };

  const handleUnitsChange = (val: 'metric' | 'imperial') => {
    sound.playClick();
    setUnitsPreference(val);
    setUnits(val);
  };

  const handleResetDemoData = () => {
    sound.playSuccess();
    resetDemoData();
    setResetSuccess(true);
    setTimeout(() => {
      window.location.reload();
    }, 900);
  };

  const handleLogout = () => {
    sound.playClick();
    clearAuthUser();
    navigate('/login');
  };

  return (
    <div className="space-y-8 select-none max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-6 border-b border-[#E4DAD0]">
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-6 h-6 text-[#542B38]" />
          <h1 className="text-2xl font-extrabold text-[#33302E] font-orbitron tracking-wide">
            Platform Settings &amp; Mission Preferences
          </h1>
        </div>
        <p className="text-xs font-mono text-[#817A76]">
          Configure telemetry units, auditory HUD alerts, theme settings, and simulated local database.
        </p>
      </div>

      {resetSuccess && (
        <div className="p-3.5 rounded-xl bg-[#EBF3EE] border border-[#C6DCCF] text-[#4E7D63] text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#4E7D63]" />
          <span>Demo storage completely refreshed to default Artemis scenario! Reloading...</span>
        </div>
      )}

      {/* Settings Grid */}
      <div className="space-y-6">
        {/* Telemetry Units */}
        <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-sm font-mono text-xs">
          <h2 className="text-sm font-bold text-[#33302E] font-orbitron mb-1">Measurement System Units</h2>
          <p className="text-[#817A76] mb-4">
            Select standard physiological measurement conventions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
            <button
              onClick={() => handleUnitsChange('metric')}
              className={`p-3 rounded-xl border text-left transition ${
                units === 'metric'
                  ? 'bg-[#FAF5EE] border-[#D5BDA4] shadow-sm'
                  : 'bg-[#F5F0E9] border-[#E4DAD0] hover:border-[#D5BDA4]'
              }`}
            >
              <div className={`font-bold mb-0.5 ${units === 'metric' ? 'text-[#542B38]' : 'text-[#33302E]'}`}>Metric System (NASA Standard)</div>
              <div className="text-[10px] text-[#817A76]">Celsius (°C) • Kilograms (kg) • mmHg</div>
            </button>

            <button
              onClick={() => handleUnitsChange('imperial')}
              className={`p-3 rounded-xl border text-left transition ${
                units === 'imperial'
                  ? 'bg-[#FAF5EE] border-[#D5BDA4] shadow-sm'
                  : 'bg-[#F5F0E9] border-[#E4DAD0] hover:border-[#D5BDA4]'
              }`}
            >
              <div className={`font-bold mb-0.5 ${units === 'imperial' ? 'text-[#542B38]' : 'text-[#33302E]'}`}>Imperial System</div>
              <div className="text-[10px] text-[#817A76]">Fahrenheit (°F) • Pounds (lbs) • mmHg</div>
            </button>
          </div>
        </div>

        {/* Audio HUD feedback */}
        <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-sm font-mono text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#33302E] font-orbitron mb-1">Auditory Mission SFX &amp; HUD Clicks</h2>
              <p className="text-[#817A76] max-w-md">
                Synthesized Web Audio API feedback for interactive scanning, telemetry saves, and warning chimes.
              </p>
            </div>
            <button
              onClick={handleToggleSound}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition ${
                soundOn
                  ? 'bg-[#FAF5EE] border-[#D5BDA4] text-[#542B38]'
                  : 'bg-[#F5F0E9] border-[#E4DAD0] text-[#817A76]'
              }`}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundOn ? 'Sound Active' : 'Sound Muted'}</span>
            </button>
          </div>
        </div>

        {/* Visual Effects */}
        <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-sm font-mono text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#33302E] font-orbitron mb-1">Medical Research Platform Ambient Effects</h2>
              <p className="text-[#817A76] max-w-md">
                Soft warm shadows, glassmorphic cards, and orbital 3D background particles.
              </p>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#EBF3EE] border border-[#C6DCCF] text-[#4E7D63] font-bold">
              OPTIMIZED ON
            </span>
          </div>
        </div>

        {/* Demo Data Management for Judges */}
        <div className="p-6 rounded-2xl bg-[#FAF5EE] border border-[#D5BDA4] shadow-sm font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-[#542B38] font-orbitron mb-1">
                Judge Demonstration Data Reset
              </h2>
              <p className="text-[#817A76] max-w-md">
                Clears any test measurements you entered and restores pristine Artemis Commander Alex records.
              </p>
            </div>
            <button
              onClick={handleResetDemoData}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D5BDA4] hover:bg-[#C4A890] border border-[#A56F73]/30 text-[#542B38] font-bold transition shadow-sm whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Simulated Data</span>
            </button>
          </div>
        </div>

        {/* Session Logout */}
        <div className="p-6 rounded-2xl bg-[#FDF3F5] border border-[#E8C4CB] shadow-sm font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-[#8B3A42] font-orbitron mb-1">Exit Telemetry Session</h2>
              <p className="text-[#817A76] max-w-md">
                Logs out of Commander Alex session and returns to login gate.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B3A42] hover:bg-[#9E4049] text-white font-bold transition shadow-md whitespace-nowrap"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout Session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
