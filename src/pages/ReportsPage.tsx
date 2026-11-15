import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  Download,
  ShieldCheck,
  Activity,
  Heart,
  Calendar,
  AlertTriangle,
  User,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import {
  getHealthRecords,
  getAstronautProfile,
  getSelectedEnvironment,
  getRoutineTasks
} from '../utils/localStorage';
import { calculateMetricSummaries, generateSmartInsights, MEDICAL_DISCLAIMER } from '../utils/healthRules';
import { exportHealthRecordsToCSV, printMissionReport } from '../utils/exportReport';
import { HealthRecord } from '../types';
import { sound } from '../utils/audio';

export default function ReportsPage() {
  const [profile, setProfile] = useState(getAstronautProfile());
  const [environment, setEnvironment] = useState(getSelectedEnvironment());
  const [records, setRecords] = useState<HealthRecord[]>(getHealthRecords());
  const [tasks, setTasks] = useState(getRoutineTasks());
  const [reportPeriod, setReportPeriod] = useState<string>('7-days');

  useEffect(() => {
    const handleUpdate = () => {
      setProfile(getAstronautProfile());
      setEnvironment(getSelectedEnvironment());
      setRecords(getHealthRecords());
      setTasks(getRoutineTasks());
    };
    window.addEventListener('solaris_health_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('solaris_health_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const periodRecords =
    reportPeriod === 'today' ? records.slice(0, 2) :
    reportPeriod === '7-days' ? records.slice(0, 7) :
    records.slice(0, 30);

  const summaries = calculateMetricSummaries(periodRecords);
  const insights = generateSmartInsights(periodRecords);

  const handlePrint = () => {
    sound.playClick();
    printMissionReport();
  };

  const handleExportCSV = () => {
    sound.playSuccess();
    exportHealthRecordsToCSV(periodRecords, profile);
  };

  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="space-y-8 select-none">
      {/* Top action toolbar */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DAD0]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-6 h-6 text-[#542B38]" />
            <h1 className="text-2xl font-extrabold text-[#33302E] font-orbitron tracking-wide">
              Mission Health Report Dossier
            </h1>
          </div>
          <p className="text-xs font-mono text-[#817A76]">
            Generate and export mission health dossiers for flight medical officers and telemetry archives.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="bg-[#F5F0E9] border border-[#E4DAD0] focus:border-[#542B38] rounded-xl px-3 py-2 text-[#33302E] outline-none"
          >
            <option value="today">Reporting Cycle: Current Flight Day</option>
            <option value="7-days">Reporting Cycle: Past 7 Flight Days</option>
            <option value="30-days">Reporting Cycle: Past 30 Flight Days</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFFCF8] hover:bg-[#F5F0E9] border border-[#E4DAD0] hover:border-[#D5BDA4] text-[#33302E] hover:text-[#542B38] transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#542B38] hover:bg-[#6B3547] text-[#F5F0E9] font-bold transition shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="bg-[#FFFCF8] print:bg-white print:text-black print:border-none border border-[#E4DAD0] rounded-2xl p-8 shadow-sm font-mono text-xs space-y-6">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#E4DAD0] print:border-black">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#542B38] font-bold">
              NASA HUMAN RESEARCH PROGRAM â€¢ FLIGHT TELEMETRY DOSSIER
            </div>
            <h2 className="text-2xl font-extrabold text-[#33302E] print:text-black font-orbitron mt-1">
              SOLARIS MISSION REPORT
            </h2>
            <div className="text-xs text-[#817A76] print:text-gray-600 mt-1">
              Document Ref: #AHR-ARTEMIS-{profile.missionDay}-V2
            </div>
          </div>

          <div className="text-right text-[11px] text-[#33302E] print:text-black space-y-0.5">
            <div>Generated: <strong className="text-[#33302E] print:text-black">{new Date().toUTCString()}</strong></div>
            <div>Reporting Cycle: <strong className="text-[#542B38] print:text-black">{reportPeriod === 'today' ? 'Current Flight Day' : reportPeriod === '7-days' ? 'Past 7 Flight Days' : 'Past 30 Flight Days'}</strong></div>
            <div>Classification: <strong className="text-[#542B38]">NASA INTERNAL DEMO</strong></div>
            <div>Environment: <strong className="text-[#33302E] print:text-black">{environment}</strong></div>
          </div>
        </div>

        {/* Astronaut Profile Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#F5F0E9] print:bg-gray-100 border border-[#E4DAD0] print:border-gray-300">
          {[
            { label: 'Crew Member', value: profile.name, valueClass: 'text-[#33302E] font-bold text-sm' },
            { label: 'Callsign / Role', value: `${profile.callsign} â€¢ Commander`, valueClass: 'text-[#542B38] font-bold' },
            { label: 'Mission Assignment', value: `Artemis VII Day ${profile.missionDay}`, valueClass: 'text-[#33302E] font-bold' },
            { label: 'Blood Group / Age', value: `${profile.bloodType} â€¢ ${profile.age} yrs`, valueClass: 'text-[#33302E] font-bold' },
          ].map((item, i) => (
            <div key={i}>
              <span className="text-[10px] text-[#817A76] uppercase block">{item.label}</span>
              <span className={`${item.valueClass} print:text-black`}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Executive Physiological Summary */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-[#542B38] font-bold mb-3">
            1. Current Physiological Telemetry Summary (Demo Data)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Heart Rate', value: `${summaries.heartRate.current} BPM`, status: summaries.heartRate.statusText, statusClass: 'text-[#4E7D63]' },
              { label: 'Blood Pressure', value: `${summaries.bloodPressure.current} mmHg`, status: summaries.bloodPressure.statusText, statusClass: 'text-[#542B38]' },
              { label: 'Blood Sugar', value: `${summaries.bloodSugar.current} mg/dL`, status: summaries.bloodSugar.statusText, statusClass: 'text-[#B87D3B]' },
              { label: 'Core Body Temp', value: `${summaries.bodyTemperature.current} Â°C`, status: summaries.bodyTemperature.statusText, statusClass: 'text-[#4E7D63]' },
              { label: 'Sleep Duration', value: `${summaries.sleepDuration.current} Hours`, status: summaries.sleepDuration.statusText, statusClass: 'text-[#A56F73]' },
              { label: 'Subjective Mood', value: summaries.moodStatus.current, status: summaries.moodStatus.statusText, statusClass: 'text-[#542B38]' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#F5F0E9] print:bg-gray-100 border border-[#E4DAD0] print:border-gray-300">
                <span className="text-[10px] text-[#817A76] block">{item.label}</span>
                <span className="text-base font-bold text-[#33302E] print:text-black">{item.value}</span>
                <span className={`block text-[10px] ${item.statusClass} print:text-green-700`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Early Warning Observations */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-[#542B38] font-bold mb-3">
            2. Algorithmic Health Insights &amp; Early Warnings
          </h3>
          <div className="space-y-2">
            {insights.map((ins) => (
              <div key={ins.id} className="p-3 rounded-lg bg-[#F5F0E9] print:bg-gray-100 border border-[#E4DAD0] print:border-gray-300">
                <div className="flex items-center justify-between font-bold text-[#33302E] print:text-black mb-1">
                  <span>{ins.title}</span>
                  <span className="uppercase text-[10px] px-2 py-0.5 rounded bg-[#E4DAD0] border border-[#D5BDA4] text-[#33302E]">
                    {ins.severity}
                  </span>
                </div>
                <p className="text-[#33302E] print:text-gray-700 mb-1">{ins.changeDescription}</p>
                <div className="text-[11px] text-[#817A76] print:text-gray-600">
                  Implication: {ins.flightImplication}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Countermeasure Routine Compliance */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-[#542B38] font-bold mb-3">
            3. Daily Countermeasure Compliance Status
          </h3>
          <div className="p-4 rounded-xl bg-[#F5F0E9] print:bg-gray-100 border border-[#E4DAD0] print:border-gray-300 flex items-center justify-between">
            <div>
              <span className="text-[#33302E] print:text-black font-bold">
                {completedTasks.length} of {tasks.length} Daily Mission Tasks Finalized
              </span>
              <p className="text-[11px] text-[#817A76] print:text-gray-600 mt-0.5">
                Includes mandatory ARED resistive exercise, T2 aerobic cycle block, and hydration logs.
              </p>
            </div>
            <span className="text-lg font-orbitron font-extrabold text-[#542B38]">
              {Math.round((completedTasks.length / tasks.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="pt-6 border-t border-[#E4DAD0] print:border-gray-300 space-y-2 text-[10px] text-[#817A76] print:text-gray-600">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-[#542B38] flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#33302E]">SCIENTIFIC &amp; MEDICAL DISCLAIMER:</strong> All data, metrics, and trends contained in this report are simulated prototype values generated for the 2026 NASA Space Apps Challenge demonstration. This application does NOT formulate clinical diagnoses or medical prescriptions. Astronauts must comply with official NASA Flight Medicine standards and coordinate with the mission flight surgeon console.
            </p>
          </div>
          <div className="text-center pt-2 text-[#817A76]">
            SOLARIS â€¢ Artemis Mission Simulation Suite â€¢ 2026 NASA Space Apps Challenge
          </div>
        </div>
      </div>
    </div>
  );
}


