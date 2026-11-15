import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import {
  LineChart as ChartIcon,
  Download,
  Activity,
  Heart,
  Moon,
  Smile,
  Thermometer,
  Droplets,
  Sparkles
} from 'lucide-react';
import { getHealthRecords, getAstronautProfile } from '../utils/localStorage';
import {
  HOURLY_TODAY_TRENDS,
  SLEEP_STAGES_HISTORY,
  MOOD_AND_COGNITIVE_HISTORY,
  PHYSIOLOGICAL_RADAR_DATA
} from '../data/demoHealthData';
import { exportHealthRecordsToCSV } from '../utils/exportReport';
import { HealthRecord } from '../types';
import { sound } from '../utils/audio';

type TimeRange = 'today' | '7days' | '30days';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7days');
  const [records, setRecords] = useState<HealthRecord[]>(getHealthRecords());
  const profile = getAstronautProfile();

  useEffect(() => {
    const handleUpdate = () => setRecords(getHealthRecords());
    window.addEventListener('solaris_health_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('solaris_health_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleExport = () => {
    sound.playSuccess();
    exportHealthRecordsToCSV(records, profile);
  };

  const latest = records[0] || {
    heartRate: 72,
    bloodPressureSystolic: 118,
    bloodPressureDiastolic: 76,
    bloodSugar: 94,
    bodyTemperature: 36.7,
    sleepDuration: 7.4,
    mood: 'Focused',
    date: '2026-11-14',
    time: '08:00'
  };

  // Build Today data updated with latest readings
  const todayTrendData = HOURLY_TODAY_TRENDS.map((point) => {
    if (point.time >= '12:00' && latest.isUserEntered) {
      return {
        ...point,
        heartRate: Math.round((point.heartRate + latest.heartRate) / 2),
        bpSystolic: Math.round((point.bpSystolic + latest.bloodPressureSystolic) / 2),
        bpDiastolic: Math.round((point.bpDiastolic + latest.bloodPressureDiastolic) / 2),
        bloodSugar: Math.round((point.bloodSugar + latest.bloodSugar) / 2),
        temp: Number(((point.temp + latest.bodyTemperature) / 2).toFixed(1))
      };
    }
    return point;
  });

  // Build 7-day data from actual records in chronological order
  const recent7 = records.slice(0, 7).reverse();
  const sevenDayData = recent7.map((r, idx) => ({
    name: `D${profile.missionDay - (recent7.length - 1 - idx)} (${r.date.slice(5)})`,
    date: r.date,
    heartRate: r.heartRate,
    systolic: r.bloodPressureSystolic,
    diastolic: r.bloodPressureDiastolic,
    bloodSugar: r.bloodSugar,
    temperature: Number(r.bodyTemperature.toFixed(1)),
    sleep: Number(r.sleepDuration.toFixed(1)),
    source: r.isUserEntered ? 'User Logged' : 'Flight Baseline'
  }));

  // Build 30-day data incorporating actual records for the most recent days
  const thirtyDayData = Array.from({ length: 30 }).map((_, i) => {
    const dayNum = profile.missionDay - (29 - i);
    const matchingRec = records.find((_, idx) => idx === 29 - i);
    if (matchingRec) {
      return {
        name: `D${dayNum}`,
        heartRate: matchingRec.heartRate,
        systolic: matchingRec.bloodPressureSystolic,
        diastolic: matchingRec.bloodPressureDiastolic,
        bloodSugar: matchingRec.bloodSugar,
        temperature: Number(matchingRec.bodyTemperature.toFixed(1)),
        sleep: Number(matchingRec.sleepDuration.toFixed(1)),
        source: matchingRec.isUserEntered ? 'User Logged' : 'Baseline'
      };
    }
    const baseHR = 70 + Math.sin(i * 0.4) * 6;
    const baseSys = 117 + Math.cos(i * 0.3) * 5;
    const baseDia = 75 + Math.sin(i * 0.3) * 3;
    const baseSugar = 94 + Math.sin(i * 0.5) * 8;
    const baseTemp = 36.7 + Math.cos(i * 0.2) * 0.2;
    const baseSleep = 7.3 + Math.sin(i * 0.3) * 0.6;
    return {
      name: `D${dayNum}`,
      heartRate: Math.round(baseHR),
      systolic: Math.round(baseSys),
      diastolic: Math.round(baseDia),
      bloodSugar: Math.round(baseSugar),
      temperature: Number(baseTemp.toFixed(1)),
      sleep: Number(baseSleep.toFixed(1)),
      source: 'Flight Baseline'
    };
  });

  const activeTrendData = 
    timeRange === 'today' ? todayTrendData :
    timeRange === '7days' ? sevenDayData : thirtyDayData;

  // Dynamic Sleep Stages updated with latest record
  const dynamicSleepStages = SLEEP_STAGES_HISTORY.map((stage, idx) => {
    if (idx === SLEEP_STAGES_HISTORY.length - 1 && latest.sleepDuration) {
      const tot = Number(latest.sleepDuration.toFixed(1));
      const deep = Number((tot * 0.22).toFixed(1));
      const rem = Number((tot * 0.24).toFixed(1));
      const light = Number((tot * 0.48).toFixed(1));
      const awake = Number((tot * 0.06).toFixed(1));
      return {
        ...stage,
        total: tot,
        deep,
        rem,
        light,
        awake
      };
    }
    return stage;
  });

  // Dynamic Mood correlation updated with latest record
  const moodScoreMap: Record<string, { score: number; stress: number }> = {
    'Calm': { score: 92, stress: 15 },
    'Energetic': { score: 95, stress: 18 },
    'Focused': { score: 88, stress: 20 },
    'Fatigued': { score: 65, stress: 45 },
    'Stressed': { score: 55, stress: 62 },
    'Anxious': { score: 48, stress: 75 }
  };
  const dynamicMoodHistory = MOOD_AND_COGNITIVE_HISTORY.map((m, idx) => {
    if (idx === MOOD_AND_COGNITIVE_HISTORY.length - 1 && latest.mood) {
      const mapping = moodScoreMap[latest.mood] || { score: 85, stress: 20 };
      return {
        ...m,
        moodScore: mapping.score,
        stressLevel: mapping.stress,
        mood: latest.mood
      };
    }
    return m;
  });

  // Clean Warm-Palette Tooltip with Strong WCAG Contrast
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#FFFCF8] border border-[#542B38] p-3 rounded-xl shadow-warm-md font-mono text-xs text-[#33302E]">
          <div className="text-[#542B38] font-bold mb-1.5 border-b border-[#E4DAD0] pb-1">{label}</div>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
              <span style={{ color: entry.color }} className="font-semibold">{entry.name}:</span>
              <span className="font-bold text-[#33302E]">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 select-none">
      {/* Top Header & Range Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DAD0]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ChartIcon className="w-6 h-6 text-[#542B38]" />
            <h1 className="text-2xl font-extrabold text-[#33302E] font-orbitron tracking-wide">
              Health Analytics &amp; Dynamic Trends
            </h1>
          </div>
          <p className="text-xs font-mono text-[#817A76]">
            Interactive multi-parameter telemetry analysis powered by Recharts engine.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time range selector */}
          <div className="flex items-center p-1 rounded-xl bg-[#FFFCF8] border border-[#E4DAD0] font-mono text-xs shadow-warm-sm">
            <button
              onClick={() => {
                sound.playClick();
                setTimeRange('today');
              }}
              className={`px-3 py-1.5 rounded-lg transition ${
                timeRange === 'today'
                  ? 'bg-[#542B38] text-[#F5F0E9] font-bold shadow-warm-sm'
                  : 'text-[#817A76] hover:text-[#33302E]'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setTimeRange('7days');
              }}
              className={`px-3 py-1.5 rounded-lg transition ${
                timeRange === '7days'
                  ? 'bg-[#542B38] text-[#F5F0E9] font-bold shadow-warm-sm'
                  : 'text-[#817A76] hover:text-[#33302E]'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setTimeRange('30days');
              }}
              className={`px-3 py-1.5 rounded-lg transition ${
                timeRange === '30days'
                  ? 'bg-[#542B38] text-[#F5F0E9] font-bold shadow-warm-sm'
                  : 'text-[#817A76] hover:text-[#33302E]'
              }`}
            >
              Last 30 Days
            </button>
          </div>

          {/* Export CSV button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFFCF8] hover:bg-[#FAF5EE] border border-[#E4DAD0] hover:border-[#D5BDA4] text-[#542B38] font-mono text-xs font-semibold transition shadow-warm-sm"
            title="Download CSV spreadsheet of all telemetry records"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Heart Rate Trend Line Chart */}
        <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-warm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#8B3A42]" />
              <h3 className="font-bold text-[#33302E] text-sm font-orbitron">Heart Rate Telemetry</h3>
            </div>
            <span className="text-[10px] font-mono text-[#542B38] bg-[#FAF5EE] px-2.5 py-0.5 rounded border border-[#E4DAD0] font-semibold">
              Target: 60-85 BPM
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4DAD0" />
                <XAxis dataKey={timeRange === 'today' ? 'time' : 'name'} stroke="#817A76" tick={{ fontSize: 11, fontFamily: 'monospace', fill: '#33302E' }} />
                <YAxis domain={['auto', 'auto']} stroke="#817A76" tick={{ fontSize: 11, fontFamily: 'monospace', fill: '#33302E' }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="heartRate"
                  name="Heart Rate (BPM)"
                  stroke="#542B38"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#542B38' }}
                  activeDot={{ r: 6, fill: '#A56F73' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] font-mono text-[#817A76] text-center mt-3">
            Tracks resting pulse stability and post-exercise cardiovascular recovery.
          </div>
        </div>

        {/* 2. Blood Pressure Trends (Systolic vs Diastolic) */}
        <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-warm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#542B38]" />
              <h3 className="font-bold text-[#33302E] text-sm font-orbitron">Blood Pressure Dynamics</h3>
            </div>
            <span className="text-[10px] font-mono text-[#542B38] bg-[#FAF5EE] px-2.5 py-0.5 rounded border border-[#E4DAD0] font-semibold">
              Systolic &amp; Diastolic (mmHg)
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4DAD0" />
                <XAxis dataKey={timeRange === 'today' ? 'time' : 'name'} stroke="#817A76" tick={{ fontSize: 11, fontFamily: 'monospace', fill: '#33302E' }} />
                <YAxis domain={['auto', 'auto']} stroke="#817A76" tick={{ fontSize: 11, fontFamily: 'monospace', fill: '#33302E' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'monospace', color: '#33302E' }} />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  name="Systolic"
                  stroke="#542B38"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#542B38' }}
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  name="Diastolic"
                  stroke="#A56F73"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 2, fill: '#A56F73' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] font-mono text-[#817A76] text-center mt-3">
            Monitored for cephalic vascular hypertension and orthostatic tolerance.
          </div>
        </div>

        {/* 3. Blood Sugar Area Chart */}
        <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-warm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-[#B87D3B]" />
              <h3 className="font-bold text-[#33302E] text-sm font-orbitron">Blood Sugar &amp; Metabolic Curve</h3>
            </div>
            <span className="text-[10px] font-mono text-[#B87D3B] bg-[#FAF3E8] px-2.5 py-0.5 rounded border border-[#EBD7BE] font-semibold">
              Target: 70-110 mg/dL
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeTrendData}>
                <defs>
                  <linearGradient id="sugarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D5BDA4" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#D5BDA4" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4DAD0" />
                <XAxis dataKey={timeRange === 'today' ? 'time' : 'name'} stroke="#817A76" tick={{ fontSize: 11, fontFamily: 'monospace', fill: '#33302E' }} />
                <YAxis domain={['auto', 'auto']} stroke="#817A76" tick={{ fontSize: 11, fontFamily: 'monospace', fill: '#33302E' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="bloodSugar"
                  name="Glucose (mg/dL)"
                  stroke="#B87D3B"
                  fill="url(#sugarGrad)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] font-mono text-[#817A76] text-center mt-3">
            Continuous glucose monitoring reflecting spaceflight metabolic regulation.
          </div>
        </div>

        {/* 4. Body Core Temperature Line Chart */}
        <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-warm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-[#A56F73]" />
              <h3 className="font-bold text-[#33302E] text-sm font-orbitron">Core Body Temperature</h3>
            </div>
            <span className="text-[10px] font-mono text-[#542B38] bg-[#FAF5EE] px-2.5 py-0.5 rounded border border-[#E4DAD0] font-semibold">
              Circadian Range: 36.4 - 37.2 Â°C
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4DAD0" />
                <XAxis dataKey={timeRange === 'today' ? 'time' : 'name'} stroke="#817A76" tick={{ fontSize: 11, fontFamily: 'monospace', fill: '#33302E' }} />
                <YAxis domain={[36.0, 38.0]} stroke="#817A76" tick={{ fontSize: 11, fontFamily: 'monospace', fill: '#33302E' }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey={timeRange === 'today' ? 'temp' : 'temperature'}
                  name="Core Temp (Â°C)"
                  stroke="#A56F73"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#A56F73' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] font-mono text-[#817A76] text-center mt-3">
            Detects microgravity heat retention ("space fever") and thermal fatigue.
          </div>
        </div>

        {/* 5. Sleep Architecture Stacked Bar Chart */}
        <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-warm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-[#542B38]" />
              <h3 className="font-bold text-[#33302E] text-sm font-orbitron">Sleep Architecture &amp; Stages</h3>
            </div>
            <span className="text-[10px] font-mono text-[#542B38] bg-[#FAF5EE] px-2.5 py-0.5 rounded border border-[#E4DAD0] font-semibold">
              Deep, REM &amp; Light Sleep (Hours)
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dynamicSleepStages}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4DAD0" />
                <XAxis dataKey="day" stroke="#817A76" tick={{ fontSize: 11, fontFamily: 'monospace', fill: '#33302E' }} />
                <YAxis stroke="#817A76" tick={{ fontSize: 11, fontFamily: 'monospace', fill: '#33302E' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'monospace', color: '#33302E' }} />
                <Bar dataKey="deep" name="Deep Sleep" stackId="a" fill="#542B38" />
                <Bar dataKey="rem" name="REM Sleep" stackId="a" fill="#A56F73" />
                <Bar dataKey="light" name="Light Sleep" stackId="a" fill="#D5BDA4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] font-mono text-[#817A76] text-center mt-3">
            Restorative slow-wave deep sleep is critical for neurocognitive memory consolidation.
          </div>
        </div>

        {/* 6. Mood & Behavioral Health Correlation */}
        <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-warm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Smile className="w-4 h-4 text-[#4E7D63]" />
              <h3 className="font-bold text-[#33302E] text-sm font-orbitron">Behavioral Health &amp; Mood Score</h3>
            </div>
            <span className="text-[10px] font-mono text-[#4E7D63] bg-[#EBF3EE] px-2.5 py-0.5 rounded border border-[#C6DCCF] font-semibold">
              Score (0-100) vs Stress Index
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dynamicMoodHistory}>
                <defs>
                  <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4E7D63" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4E7D63" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4DAD0" />
                <XAxis dataKey="day" stroke="#817A76" tick={{ fontSize: 11, fontFamily: 'monospace', fill: '#33302E' }} />
                <YAxis domain={[0, 100]} stroke="#817A76" tick={{ fontSize: 11, fontFamily: 'monospace', fill: '#33302E' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'monospace', color: '#33302E' }} />
                <Area
                  type="monotone"
                  dataKey="moodScore"
                  name="Resilience Score"
                  stroke="#4E7D63"
                  fill="url(#moodGrad)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="stressLevel"
                  name="Stress Index"
                  stroke="#8B3A42"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] font-mono text-[#817A76] text-center mt-3">
            Correlates self-reported psychological wellbeing with autonomic stress indicators.
          </div>
        </div>

        {/* 7. Comprehensive Physiological Radar Assessment */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-warm flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#542B38]" />
              <h3 className="font-bold text-[#33302E] text-sm font-orbitron">Multi-System Physiological Radar Assessment</h3>
            </div>
            <span className="text-[10px] font-mono text-[#542B38] bg-[#FAF5EE] px-2.5 py-0.5 rounded border border-[#E4DAD0] font-semibold">
              Flight Readiness Benchmark
            </span>
          </div>

          <div className="w-full h-80 max-w-2xl">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={PHYSIOLOGICAL_RADAR_DATA}>
                <PolarGrid stroke="#E4DAD0" />
                <PolarAngleAxis dataKey="subject" stroke="#817A76" tick={{ fontSize: 11, fontFamily: 'monospace', fill: '#33302E' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#E4DAD0" tick={{ fontSize: 10, fontFamily: 'monospace', fill: '#817A76' }} />
                <Radar name="Current Astronaut Telemetry" dataKey="current" stroke="#542B38" fill="#542B38" fillOpacity={0.25} />
                <Radar name="NASA Mission Standard" dataKey="benchmark" stroke="#D5BDA4" fill="#D5BDA4" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'monospace', color: '#33302E' }} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] font-mono text-[#817A76] text-center mt-3">
            Holistic six-domain readiness evaluation comparing current biomarkers against NASA flight medical baselines.
          </div>
        </div>
      </div>
    </div>
  );
}

