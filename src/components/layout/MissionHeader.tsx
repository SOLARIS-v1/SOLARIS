import React, { useState, useEffect } from 'react';
import {
  Bell,
  Clock,
  Radio,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  Globe2,
  X
} from 'lucide-react';
import { SpaceEnvironment } from '../../types';
import {
  getAstronautProfile,
  getSelectedEnvironment,
  setSelectedEnvironment,
  getSoundEnabled,
  setSoundEnabled,
  resetDemoData
} from '../../utils/localStorage';
import { ENVIRONMENT_TELEMETRY_MAP } from '../../data/demoHealthData';
import { sound } from '../../utils/audio';

interface MissionHeaderProps {
  onEnvironmentChange?: (env: SpaceEnvironment) => void;
}

const ENVIRONMENTS: SpaceEnvironment[] = [
  'Spacecraft',
  'Space Station',
  'Lunar Base',
  'Mars Base',
  'Rover'
];

export default function MissionHeader({ onEnvironmentChange }: MissionHeaderProps) {
  const [profile, setProfile] = useState(getAstronautProfile());
  const [currentEnv, setCurrentEnv] = useState<SpaceEnvironment>(getSelectedEnvironment());
  const [soundOn, setSoundOn] = useState(getSoundEnabled());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEnvMenu, setShowEnvMenu] = useState(false);
  const [showResetNotice, setShowResetNotice] = useState(false);

  // Live mission clock (UTC & MET) and state sync
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const handleUpdate = () => {
      setProfile(getAstronautProfile());
      setCurrentEnv(getSelectedEnvironment());
      setSoundOn(getSoundEnabled());
    };
    window.addEventListener('astra_health_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      clearInterval(timer);
      window.removeEventListener('astra_health_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleEnvSelect = (env: SpaceEnvironment) => {
    sound.playClick();
    setSelectedEnvironment(env);
    setCurrentEnv(env);
    setShowEnvMenu(false);
    if (onEnvironmentChange) onEnvironmentChange(env);
  };

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundEnabled(next);
    setSoundOn(next);
    if (next) sound.playClick();
  };

  const handleResetDemo = () => {
    sound.playSuccess();
    resetDemoData();
    setShowResetNotice(true);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const envTelemetry = ENVIRONMENT_TELEMETRY_MAP[currentEnv] || ENVIRONMENT_TELEMETRY_MAP['Spacecraft'];

  const notifications = [
    { id: 1, type: 'info', text: 'Daily circadian lighting sequence updated to evening wavelength spectrum.', time: '10m ago' },
    { id: 2, type: 'warning', text: 'Telemetry sync: Rest period sleep duration recorded under target threshold.', time: '1h ago' },
    { id: 3, type: 'success', text: 'ARED countermeasure exercise protocol scheduled for 13:00 UTC.', time: '2h ago' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FFFCF8] text-[#33302E] border-b border-[#E4DAD0] px-6 py-3 shadow-warm-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Left Section: Mission Info & Live Clock */}
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4E7D63]" />
              <h1 className="text-sm font-bold text-[#542B38] font-orbitron tracking-wide">
                {profile.missionName}
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EBF3EE] border border-[#C6DCCF] text-[#4E7D63] font-semibold">
                ACTIVE
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-[#817A76] mt-0.5">
              <span>Commander Alex (Demo)</span>
              <span>•</span>
              <span className="text-[#542B38] font-semibold">MET Day {profile.missionDay}</span>
            </div>
          </div>

          {/* Mission Digital Elapsed Clock */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF5EE] border border-[#E4DAD0] font-mono text-xs">
            <Clock className="w-3.5 h-3.5 text-[#542B38]" />
            <span className="text-[#817A76]">UTC:</span>
            <span className="text-[#33302E] font-bold">
              {currentTime.toUTCString().slice(17, 25)}
            </span>
            <span className="text-[#D5BDA4]">|</span>
            <span className="text-[#542B38] font-bold">
              T+{profile.missionDay}:14:32:08
            </span>
          </div>
        </div>

        {/* Right Section: Environment Selector, Telemetry Pill, Audio & Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Environment Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playClick();
                setShowEnvMenu(!showEnvMenu);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF5EE] hover:bg-[#F5F0E9] border border-[#E4DAD0] hover:border-[#D5BDA4] text-xs font-mono text-[#542B38] transition shadow-warm-sm"
            >
              <Globe2 className="w-3.5 h-3.5 text-[#542B38]" />
              <span className="text-[#817A76]">Env:</span>
              <span className="font-bold text-[#542B38]">{currentEnv}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#817A76]" />
            </button>

            {showEnvMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-warm-md p-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#817A76] px-2 py-1 border-b border-[#E4DAD0]">
                  Select Mission Habitat
                </div>
                {ENVIRONMENTS.map((env) => (
                  <button
                    key={env}
                    onClick={() => handleEnvSelect(env)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono flex items-center justify-between transition ${
                      currentEnv === env
                        ? 'bg-[#542B38] text-[#F5F0E9] font-bold'
                        : 'text-[#33302E] hover:bg-[#FAF5EE]'
                    }`}
                  >
                    <span>{env}</span>
                    <span className={`text-[10px] ${currentEnv === env ? 'text-[#D5BDA4]' : 'text-[#817A76]'}`}>
                      {env === 'Spacecraft' || env === 'Space Station' ? '0.0g' : env === 'Lunar Base' ? '0.16g' : '0.38g'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Environment Telemetry Pill */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#FAF5EE] border border-[#E4DAD0] text-[11px] font-mono text-[#817A76]">
            <span>Grav: <strong className="text-[#542B38]">{envTelemetry.gravityG}g</strong></span>
            <span>•</span>
            <span>Rad: <strong className="text-[#B87D3B]">{envTelemetry.radiationRateDailyMicroSv} µSv/d</strong></span>
          </div>

          {/* Audio toggle button */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-lg border transition ${
              soundOn
                ? 'bg-[#FAF5EE] border-[#D5BDA4] text-[#542B38]'
                : 'bg-[#FAF5EE] border-[#E4DAD0] text-[#817A76]'
            }`}
            title={soundOn ? "Mute Mission SFX" : "Enable Mission SFX"}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playClick();
                setShowNotifications(!showNotifications);
              }}
              className="relative p-2 rounded-lg bg-[#FAF5EE] border border-[#E4DAD0] hover:border-[#D5BDA4] text-[#542B38] transition"
              title="Mission Telemetry Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#A56F73]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-warm-lg p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-[#E4DAD0] mb-2">
                  <span className="text-xs font-mono font-bold text-[#542B38] flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-[#542B38]" />
                    Telemetry Uplink Alerts
                  </span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-[#817A76] hover:text-[#33302E] p-1 rounded"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-lg bg-[#FAF5EE] border border-[#E4DAD0] text-xs">
                      <div className="flex items-start gap-2">
                        {n.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-[#B87D3B] flex-shrink-0 mt-0.5" />}
                        {n.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-[#4E7D63] flex-shrink-0 mt-0.5" />}
                        {n.type === 'info' && <Info className="w-3.5 h-3.5 text-[#542B38] flex-shrink-0 mt-0.5" />}
                        <div className="flex-1 font-sans">
                          <p className="text-[#33302E]">{n.text}</p>
                          <span className="text-[10px] text-[#817A76] font-mono">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={handleResetDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D5BDA4] hover:bg-[#C9AE94] border border-[#BBA086]/40 text-[#542B38] text-xs font-mono font-bold transition shadow-warm-sm"
            title="Reset simulated data to pristine demo state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>

      {showResetNotice && (
        <div className="fixed top-16 right-6 z-50 bg-[#EBF3EE] border border-[#C6DCCF] rounded-xl px-4 py-2.5 text-[#4E7D63] text-xs font-mono shadow-warm-md flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-[#4E7D63] animate-spin" />
          <span>Demo database restored to default Artemis scenario! Reloading...</span>
        </div>
      )}
    </header>
  );
}
