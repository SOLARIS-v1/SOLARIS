import React, { useState, useEffect } from 'react';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { getHealthRecords } from '../utils/localStorage';
import { generateSmartInsights, calculateMetricSummaries, MEDICAL_DISCLAIMER } from '../utils/healthRules';
import { HealthRecord, HealthInsight } from '../types';
import { sound } from '../utils/audio';

export default function InsightsPage() {
  const [records, setRecords] = useState<HealthRecord[]>(getHealthRecords());
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  useEffect(() => {
    const handleUpdate = () => setRecords(getHealthRecords());
    window.addEventListener('astra_health_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('astra_health_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const insights = generateSmartInsights(records);
  const summaries = calculateMetricSummaries(records);

  const filteredInsights = insights.filter((ins) => {
    if (filterSeverity === 'all') return true;
    return ins.severity === filterSeverity;
  });

  return (
    <div className="space-y-8 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DAD0]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-6 h-6 text-[#542B38]" />
            <h1 className="text-2xl font-extrabold text-[#33302E] font-orbitron tracking-wide">
              Smart Health Insights &amp; Early Warning
            </h1>
          </div>
          <p className="text-xs font-mono text-[#817A76]">
            Algorithmic rule-based physiological triage detecting biomarker drift during spaceflight.
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-[#817A76]">Triage Level:</span>
          <select
            value={filterSeverity}
            onChange={(e) => {
              sound.playClick();
              setFilterSeverity(e.target.value);
            }}
            className="bg-[#F5F0E9] border border-[#E4DAD0] focus:border-[#542B38] rounded-lg px-3 py-1.5 text-[#33302E] outline-none"
          >
            <option value="all">All Triage Insights</option>
            <option value="alert">Alert (Red)</option>
            <option value="caution">Caution (Yellow)</option>
            <option value="nominal">Nominal (Green)</option>
          </select>
        </div>
      </div>

      {/* Mandatory Medical Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-[#FAF5EE] border border-[#D5BDA4] text-xs font-mono text-[#33302E] flex items-start gap-3">
        <Info className="w-5 h-5 text-[#542B38] flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#542B38] block mb-0.5 uppercase tracking-wide">Flight Medicine Protocol Disclaimer</strong>
          <p className="text-[#33302E] leading-relaxed">
            {MEDICAL_DISCLAIMER} Real-time flight thresholds depend on NASA-approved clinical mission guidelines and individual astronaut baselines.
          </p>
        </div>
      </div>

      {/* Triage Status System Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-[#EBF3EE] border border-[#C6DCCF] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#4E7D63] font-bold">
            <ShieldCheck className="w-5 h-5" />
            <span>GREEN / NOMINAL</span>
          </div>
          <span className="text-[#33302E]">No unusual pattern detected</span>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF3E8] border border-[#EBD7BE] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#B87D3B] font-bold">
            <AlertTriangle className="w-5 h-5" />
            <span>YELLOW / CAUTION</span>
          </div>
          <span className="text-[#33302E]">Requires attention/recheck</span>
        </div>

        <div className="p-4 rounded-xl bg-[#F9EBEF] border border-[#E8C4CB] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#8B3A42] font-bold">
            <AlertCircle className="w-5 h-5" />
            <span>RED / ALERT</span>
          </div>
          <span className="text-[#33302E]">Escalate to Flight Surgeon</span>
        </div>
      </div>

      {/* Detailed Insights Feed */}
      <div className="space-y-4">
        {filteredInsights.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] text-center text-[#817A76] font-mono text-xs">
            No insights currently matching the selected triage filter.
          </div>
        ) : (
          filteredInsights.map((insight) => (
            <div
              key={insight.id}
              className={`p-6 rounded-2xl border shadow-sm transition-all font-mono text-xs ${
                insight.severity === 'alert'
                  ? 'bg-[#FDF3F5] border-[#E8C4CB]'
                  : insight.severity === 'caution'
                  ? 'bg-[#FDF8F0] border-[#EBD7BE]'
                  : 'bg-[#F2F9F5] border-[#C6DCCF]'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E4DAD0] mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border ${
                    insight.severity === 'alert' ? 'bg-[#F9EBEF] border-[#E8C4CB] text-[#8B3A42]' :
                    insight.severity === 'caution' ? 'bg-[#FAF3E8] border-[#EBD7BE] text-[#B87D3B]' :
                    'bg-[#EBF3EE] border-[#C6DCCF] text-[#4E7D63]'
                  }`}>
                    {insight.severity === 'alert' && <AlertCircle className="w-5 h-5" />}
                    {insight.severity === 'caution' && <AlertTriangle className="w-5 h-5" />}
                    {insight.severity === 'nominal' && <ShieldCheck className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#33302E] font-orbitron">{insight.title}</h3>
                    <div className="flex items-center gap-2 text-[#817A76] text-[11px] mt-0.5">
                      <span>Indicator: <strong className="text-[#542B38]">{insight.metric}</strong></span>
                      {insight.hazardCorrelation && (
                        <>
                          <span>•</span>
                          <span className="text-[#A56F73] font-semibold">{insight.hazardCorrelation}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  insight.severity === 'alert' ? 'bg-[#F9EBEF] text-[#8B3A42] border-[#E8C4CB]' :
                  insight.severity === 'caution' ? 'bg-[#FAF3E8] text-[#B87D3B] border-[#EBD7BE]' :
                  'bg-[#EBF3EE] text-[#4E7D63] border-[#C6DCCF]'
                }`}>
                  {insight.severity} Triage
                </span>
              </div>

              {/* Body Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#817A76] block mb-1">
                      1. Observation / What Changed:
                    </span>
                    <p className="text-[#33302E] bg-[#F5F0E9] p-3 rounded-lg border border-[#E4DAD0]">
                      {insight.changeDescription}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#817A76] block mb-1">
                      2. Spaceflight Physiological Implication:
                    </span>
                    <p className="text-[#33302E] bg-[#F5F0E9] p-3 rounded-lg border border-[#E4DAD0] leading-relaxed font-sans text-xs">
                      {insight.flightImplication}
                    </p>
                  </div>
                </div>

                {/* What Astronaut Can Do Next */}
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#542B38] block mb-1 font-bold">
                    3. Recommended Autonomous Countermeasures / Protocol Checklist:
                  </span>
                  <div className="space-y-2 bg-[#F5F0E9] p-3.5 rounded-lg border border-[#E4DAD0]">
                    {insight.actionProtocol.map((action, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#33302E]">
                        <span className="text-[#542B38] font-bold mt-0.5">•</span>
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
