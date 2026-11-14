import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Activity,
  Droplets,
  Thermometer,
  Moon,
  Smile,
  PlusCircle,
  AlertTriangle,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Compass,
  CheckCircle2,
  Orbit,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import MetricCard from '../components/dashboard/MetricCard';
import HealthInputModal from '../components/health/HealthInputModal';
import {
  getHealthRecords,
  getAstronautProfile,
  getSelectedEnvironment,
  getRoutineTasks
} from '../utils/localStorage';
import {
  calculateMetricSummaries,
  generateSmartInsights,
  getOverallMissionHealthStatus,
  MEDICAL_DISCLAIMER
} from '../utils/healthRules';
import { ENVIRONMENT_TELEMETRY_MAP } from '../data/demoHealthData';
import { HealthRecord, SpaceEnvironment } from '../types';
import { sound } from '../utils/audio';

export default function DashboardPage() {
  const [records, setRecords] = useState<HealthRecord[]>(getHealthRecords());
  const [profile, setProfile] = useState(getAstronautProfile());
  const [environment, setEnvironment] = useState<SpaceEnvironment>(getSelectedEnvironment());
  const [tasks, setTasks] = useState(getRoutineTasks());
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);

  const refreshData = () => {
    setRecords(getHealthRecords());
    setProfile(getAstronautProfile());
    setEnvironment(getSelectedEnvironment());
    setTasks(getRoutineTasks());
  };

  useEffect(() => {
    refreshData();
    const handleStorage = () => refreshData();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('astra_health_update', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('astra_health_update', handleStorage);
    };
  }, []);

  const summaries = calculateMetricSummaries(records);
  const insights = generateSmartInsights(records);
  const overallStatus = getOverallMissionHealthStatus(records);
  const envTelemetry = ENVIRONMENT_TELEMETRY_MAP[environment] || ENVIRONMENT_TELEMETRY_MAP['Spacecraft'];

  const completedCount = tasks.filter(t => t.completed).length;
  const routinePercent = Math.round((completedCount / tasks.length) * 100);

  const handleRecordSaved = (newRec: HealthRecord) => {
    refreshData();
  };

  return (
    <div className="space-y-8 select-none">
      {/* ================= 1. MISSION STATUS PANEL ================= */}
      <div className="relative overflow-hidden rounded-2xl bg-[#542B38] border border-[#6B3547] p-6 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-full bg-[#D5BDA4]/5 blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D5BDA4]/20 border border-[#D5BDA4]/40 text-[#D5BDA4] font-bold uppercase tracking-wider">
                NASA MISSION CONTROL TELEMETRY
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F5F0E9]/10 border border-[#F5F0E9]/30 text-[#F5F0E9] font-bold uppercase tracking-wider">
                DEMO ENVIRONMENT
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F0E9] font-orbitron tracking-wide">
              {profile.missionName}
            </h1>
            <p className="text-xs font-mono text-[#D5BDA4] mt-1">
              Active mission profile for <span className="text-[#FFFCF8] font-bold">{profile.name}</span> ({profile.callsign}) • Continuous Autonomous Health Monitoring
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setIsInputModalOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D5BDA4] hover:bg-[#C4A890] text-[#542B38] font-bold text-xs font-mono tracking-wider transition shadow-md group"
            >
              <PlusCircle className="w-4 h-4 text-[#542B38] group-hover:rotate-90 transition-transform" />
              <span>LOG NEW VITALS</span>
            </button>
          </div>
        </div>

        {/* Status Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-5 border-t border-[#F5F0E9]/20 font-mono text-xs">
          <div className="bg-[#F5F0E9]/10 p-3 rounded-xl border border-[#F5F0E9]/20">
            <span className="text-[#D5BDA4] block text-[10px] uppercase">Mission Status</span>
            <span className="text-[#4E7D63] font-bold flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#4E7D63] animate-ping" />
              {profile.status} (Demo)
            </span>
          </div>

          <div className="bg-[#F5F0E9]/10 p-3 rounded-xl border border-[#F5F0E9]/20">
            <span className="text-[#D5BDA4] block text-[10px] uppercase">Mission Day</span>
            <span className="text-[#FFFCF8] font-bold mt-0.5 block">
              Day {profile.missionDay} <span className="text-[#D5BDA4] font-normal">(Sample)</span>
            </span>
          </div>

          <div className="bg-[#F5F0E9]/10 p-3 rounded-xl border border-[#F5F0E9]/20">
            <span className="text-[#D5BDA4] block text-[10px] uppercase">Environment</span>
            <span className="text-[#D5BDA4] font-bold mt-0.5 block truncate">
              {environment}
            </span>
          </div>

          <div className="bg-[#F5F0E9]/10 p-3 rounded-xl border border-[#F5F0E9]/20">
            <span className="text-[#D5BDA4] block text-[10px] uppercase">Crew Commander</span>
            <span className="text-[#FFFCF8] font-bold mt-0.5 block truncate">
              Alex (Demo)
            </span>
          </div>

          <div className="bg-[#F5F0E9]/10 p-3 rounded-xl border border-[#F5F0E9]/20">
            <span className="text-[#D5BDA4] block text-[10px] uppercase">Physiological Triage</span>
            <span className={`font-bold mt-0.5 inline-block text-[11px] px-2 py-0.5 rounded uppercase ${
              overallStatus === 'alert' ? 'bg-[#F9EBEF] text-[#8B3A42]' :
              overallStatus === 'caution' ? 'bg-[#FAF3E8] text-[#B87D3B]' : 'bg-[#EBF3EE] text-[#4E7D63]'
            }`}>
              {overallStatus === 'nominal' ? 'Nominal • Go' : overallStatus === 'caution' ? 'Caution • Drift' : 'Alert • Attention'}
            </span>
          </div>
        </div>
      </div>

      {/* ================= 2. SIX HEALTH METRIC CARDS ================= */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#542B38] font-orbitron tracking-wide flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#542B38]" />
              Physiological Telemetry Overview
            </h2>
            <p className="text-xs font-mono text-[#817A76]">
              Live astronaut sample readings • All values labeled as DEMO DATA
            </p>
          </div>
          <Link
            to="/health-monitoring"
            onClick={() => sound.playClick()}
            className="text-xs font-mono text-[#542B38] hover:text-[#A56F73] flex items-center gap-1 transition font-semibold"
          >
            <span>Full History Table</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <MetricCard summary={summaries.heartRate} icon={<Heart className="w-5 h-5 text-[#8B3A42]" />} onClick={() => setIsInputModalOpen(true)} />
          <MetricCard summary={summaries.bloodPressure} icon={<Activity className="w-5 h-5 text-[#542B38]" />} onClick={() => setIsInputModalOpen(true)} />
          <MetricCard summary={summaries.bloodSugar} icon={<Droplets className="w-5 h-5 text-[#B87D3B]" />} onClick={() => setIsInputModalOpen(true)} />
          <MetricCard summary={summaries.bodyTemperature} icon={<Thermometer className="w-5 h-5 text-[#A56F73]" />} onClick={() => setIsInputModalOpen(true)} />
          <MetricCard summary={summaries.sleepDuration} icon={<Moon className="w-5 h-5 text-[#542B38]" />} onClick={() => setIsInputModalOpen(true)} />
          <MetricCard summary={summaries.moodStatus} icon={<Smile className="w-5 h-5 text-[#4E7D63]" />} onClick={() => setIsInputModalOpen(true)} />
        </div>
      </div>

      {/* ================= 3. LOWER SPLIT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 3D Body Explorer Feature Teaser */}
        <div className="lg:col-span-5 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#542B38] border border-[#542B38] text-[#F5F0E9] font-bold uppercase">
                SIGNATURE 3D FEATURE
              </span>
              <span className="text-xs font-mono text-[#817A76]">6 Organ Systems</span>
            </div>

            <h3 className="text-xl font-bold text-[#33302E] font-orbitron mb-2">
              Interactive 3D Human Body Explorer
            </h3>
            <p className="text-xs text-[#817A76] leading-relaxed mb-4">
              Inspect how space radiation, microgravity fluid shifts, bone loss, and muscle atrophy affect the Brain, Heart, Lungs, Bones, Muscles, and Digestive system in interactive 3D.
            </p>

            <div className="space-y-2 mb-6 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F5F0E9] border border-[#E4DAD0]">
                <span className="text-[#33302E] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4E7D63]" />
                  Cardiovascular System
                </span>
                <span className="text-[#542B38] font-bold">{summaries.heartRate.current} BPM</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F5F0E9] border border-[#E4DAD0]">
                <span className="text-[#33302E] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A56F73]" />
                  Neurocognitive &amp; Sleep
                </span>
                <span className="text-[#542B38] font-bold">{summaries.sleepDuration.current} hrs</span>
              </div>
            </div>
          </div>

          <Link
            to="/body-explorer"
            onClick={() => sound.playClick()}
            className="w-full py-3 rounded-xl bg-[#542B38] hover:bg-[#6B3547] text-[#F5F0E9] font-bold text-xs font-mono tracking-wider transition shadow-md flex items-center justify-center gap-2"
          >
            <span>LAUNCH 3D ANATOMICAL EXPLORER</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right: Smart Health Insights Feed & Routine Progress */}
        <div className="lg:col-span-7 space-y-6">
          {/* Smart Insights preview */}
          <div className="rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4DAD0] mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#542B38]" />
                <h3 className="text-base font-bold text-[#33302E] font-orbitron">
                  Smart Spaceflight Health Insights
                </h3>
              </div>
              <Link
                to="/insights"
                onClick={() => sound.playClick()}
                className="text-xs font-mono text-[#542B38] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {insights.slice(0, 2).map((ins) => (
                <div
                  key={ins.id}
                  className={`p-3.5 rounded-xl border text-xs font-mono transition ${
                    ins.severity === 'alert' ? 'bg-[#F9EBEF] border-[#E8C4CB] text-[#8B3A42]' :
                    ins.severity === 'caution' ? 'bg-[#FAF3E8] border-[#EBD7BE] text-[#B87D3B]' :
                    'bg-[#EBF3EE] border-[#C6DCCF] text-[#4E7D63]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#33302E] text-xs flex items-center gap-1.5">
                      {ins.severity === 'alert' && <AlertTriangle className="w-3.5 h-3.5 text-[#8B3A42]" />}
                      {ins.severity === 'caution' && <AlertTriangle className="w-3.5 h-3.5 text-[#B87D3B]" />}
                      {ins.severity === 'nominal' && <ShieldCheck className="w-3.5 h-3.5 text-[#4E7D63]" />}
                      {ins.title}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/60">
                      {ins.severity}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#33302E] leading-relaxed mb-2 font-sans">
                    {ins.flightImplication}
                  </p>
                  <div className="text-[10px] text-[#542B38] font-semibold">
                    Next step: {ins.actionProtocol[0]}
                  </div>
                </div>
              ))}
            </div>

            {/* Medical Disclaimer Banner */}
            <div className="mt-4 p-2.5 rounded-lg bg-[#F5F0E9] border border-[#E4DAD0] text-[10px] text-[#817A76] font-mono">
              ⚠️ {MEDICAL_DISCLAIMER}
            </div>
          </div>

          {/* Today's Routine Task Tracker */}
          <div className="rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4E7D63]" />
                <h3 className="text-base font-bold text-[#33302E] font-orbitron">
                  Daily Mission Routine Progress
                </h3>
              </div>
              <span className="text-xs font-mono text-[#542B38] font-bold">
                {completedCount} / {tasks.length} Completed ({routinePercent}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#F5F0E9] rounded-full h-2.5 overflow-hidden mb-4 border border-[#E4DAD0]">
              <div
                className="bg-gradient-to-r from-[#542B38] to-[#A56F73] h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${routinePercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#817A76]">Next: 13:00 UTC ARED Heavy Resistive Workout</span>
              <Link
                to="/routine"
                onClick={() => sound.playClick()}
                className="text-[#542B38] hover:text-[#A56F73] font-bold flex items-center gap-1 transition"
              >
                <span>Open Routine Checklist</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Input Modal */}
      <HealthInputModal
        isOpen={isInputModalOpen}
        onClose={() => setIsInputModalOpen(false)}
        onSuccess={handleRecordSaved}
      />
    </div>
  );
}
