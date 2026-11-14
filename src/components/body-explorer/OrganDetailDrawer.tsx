import React from 'react';
import { X, Activity, AlertTriangle, ShieldCheck, BookOpen, ExternalLink } from 'lucide-react';
import { OrganSystemInfo } from '../../types';
import { sound } from '../../utils/audio';

interface OrganDetailDrawerProps {
  organ: OrganSystemInfo | null;
  onClose: () => void;
}

export default function OrganDetailDrawer({ organ, onClose }: OrganDetailDrawerProps) {
  if (!organ) return null;

  return (
    <div className="h-full flex flex-col bg-[#FFFCF8] border border-[#E4DAD0] rounded-2xl backdrop-blur-xl shadow-lg overflow-y-auto custom-scrollbar p-6">
      {/* Header */}
      <div className="flex items-start justify-between pb-4 border-b border-[#E4DAD0]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2.5 h-2.5 rounded-full ${
              organ.currentTelemetryStatus === 'alert' ? 'bg-[#8B3A42] animate-ping' :
              organ.currentTelemetryStatus === 'caution' ? 'bg-[#B87D3B]' : 'bg-[#4E7D63]'
            }`} />
            <span className="text-xs uppercase tracking-widest font-mono text-[#542B38]">
              {organ.subsystem}
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#33302E] tracking-wide">{organ.name}</h2>
        </div>
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="p-1.5 rounded-lg bg-[#F5F0E9] text-[#817A76] hover:text-[#33302E] hover:bg-[#EAE4DC] transition"
          title="Close Organ Panel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6 mt-5 text-sm text-[#33302E]">
        {/* Live Telemetry Status Banner */}
        <div className="bg-[#F5F0E9] border border-[#E4DAD0] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#542B38] flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#542B38] animate-pulse" />
              LIVE TELEMETRY STREAM
            </span>
            <span className={`text-xs px-2 py-0.5 rounded font-mono uppercase font-bold ${
              organ.currentTelemetryStatus === 'alert' ? 'bg-[#F9EBEF] text-[#8B3A42] border border-[#E8C4CB]' :
              organ.currentTelemetryStatus === 'caution' ? 'bg-[#FAF3E8] text-[#B87D3B] border border-[#EBD7BE]' :
              'bg-[#EBF3EE] text-[#4E7D63] border border-[#C6DCCF]'
            }`}>
              {organ.currentTelemetryStatus}
            </span>
          </div>
          <div className="text-base font-mono font-bold text-[#33302E]">
            {organ.currentTelemetryValue}
          </div>
        </div>

        {/* Primary Physiological Function */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#542B38] mb-1.5 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#542B38]" />
            Biological Function
          </h3>
          <p className="leading-relaxed text-[#33302E] bg-[#F5F0E9] p-3 rounded-lg border border-[#E4DAD0] text-sm">
            {organ.primaryFunction}
          </p>
        </div>

        {/* Spaceflight Risks */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#B87D3B] mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#B87D3B]" />
            Spaceflight Hazards &amp; Pathologies
          </h3>
          <ul className="space-y-2">
            {organ.spaceflightRisks.map((risk, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-[#FAF3E8] border border-[#EBD7BE] p-2.5 rounded-lg text-xs text-[#33302E]">
                <span className="text-[#B87D3B] font-bold mt-0.5">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Why Monitoring Matters */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#542B38] mb-1.5 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#542B38]" />
            Why Continuous Monitoring Matters
          </h3>
          <p className="leading-relaxed text-xs text-[#33302E] bg-[#F5F0E9] p-3 rounded-lg border border-[#E4DAD0]">
            {organ.whyMonitoringMatters}
          </p>
        </div>

        {/* Monitored Indicators */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#542B38] mb-2">
            Monitored Biomarkers &amp; Indicators
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {organ.relatedIndicators.map((ind, idx) => (
              <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-[#FAF5EE] border border-[#D5BDA4] text-[#542B38] font-mono">
                {ind}
              </span>
            ))}
          </div>
        </div>

        {/* Countermeasures & Preventive Guidance */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#4E7D63] mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#4E7D63]" />
            Preventive Flight Countermeasures
          </h3>
          <ul className="space-y-2 text-xs">
            {organ.countermeasures.map((cm, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-[#EBF3EE] border border-[#C6DCCF] p-2.5 rounded-lg text-[#33302E]">
                <span className="text-[#4E7D63] font-bold mt-0.5">✓</span>
                <span>{cm}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* NASA HRP Research Citation */}
        <div className="pt-3 border-t border-[#E4DAD0]">
          <div className="flex items-center gap-1.5 text-xs text-[#817A76] mb-1">
            <BookOpen className="w-3.5 h-3.5 text-[#817A76]" />
            <span className="font-mono">NASA Research Reference:</span>
          </div>
          <div className="text-xs text-[#542B38] font-mono bg-[#F5F0E9] p-2.5 rounded border border-[#E4DAD0]">
            {organ.nasaHrpCitation}
          </div>
        </div>
      </div>
    </div>
  );
}
