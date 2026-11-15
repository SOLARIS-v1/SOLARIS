import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Radiation,
  Users,
  Orbit,
  Weight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Brain,
  Heart,
  Activity,
  Layers
} from 'lucide-react';
import { NASA_FIVE_HAZARDS } from '../data/hazardData';
import { SpaceHazard } from '../types';
import { sound } from '../utils/audio';

type Destination = 'iss' | 'moon' | 'mars_transit' | 'mars_surface';

export default function HazardsPage() {
  const [selectedHazard, setSelectedHazard] = useState<SpaceHazard>(NASA_FIVE_HAZARDS[0]);
  const [destination, setDestination] = useState<Destination>('mars_transit');

  const destinationData: Record<Destination, { name: string; distance: string; latency: string; radLevel: string; gravity: string; desc: string }> = {
    iss: {
      name: 'Low Earth Orbit (ISS)',
      distance: '400 km',
      latency: '< 0.5 seconds',
      radLevel: 'Moderate (~300 ÂµSv/day, partial magnetosphere shielding)',
      gravity: '0.0001g microgravity',
      desc: 'Rapid emergency evacuation to Earth possible within 24 hours.'
    },
    moon: {
      name: 'Lunar Gateway & Surface Base',
      distance: '384,400 km',
      latency: '1.3 seconds',
      radLevel: 'High (~700 ÂµSv/day, zero magnetic shielding)',
      gravity: '0.166g (1/6 Earth gravity)',
      desc: 'Evacuation requires 3-5 days. High regolith dust toxicity hazard.'
    },
    mars_transit: {
      name: 'Deep Space Mars Transit Cruise',
      distance: '55,000,000 to 400,000,000 km',
      latency: '3 to 22 minutes (one-way)',
      radLevel: 'Extreme (~1,200 ÂµSv/day, GCR & SPE exposure)',
      gravity: '0.0g microgravity cruise',
      desc: 'Zero emergency return capability. Autonomous medical triage mandatory.'
    },
    mars_surface: {
      name: 'Mars Surface Outpost',
      distance: 'Up to 400,000,000 km',
      latency: 'Up to 22 minutes',
      radLevel: 'Substantial (~540 ÂµSv/day, thin atmospheric shielding)',
      gravity: '0.38g (3/8 Earth gravity)',
      desc: 'Long stay mission (500+ days). Closed ecosystem ECLSS dependency.'
    }
  };

  const currentDest = destinationData[destination];

  return (
    <div className="space-y-10 select-none">
      {/* Page Header */}
      <div className="pb-6 border-b border-[#E4DAD0]">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="w-6 h-6 text-[#8B3A42]" />
          <h1 className="text-2xl font-extrabold text-[#33302E] font-orbitron tracking-wide">
            The Five Hazards of Human Spaceflight
          </h1>
        </div>
        <p className="text-xs font-mono text-[#817A76] max-w-2xl">
          NASA Human Research Program classification of physiological challenges encountered during deep space exploration and their countermeasure protocols.
        </p>
      </div>

      {/* Destination Risk Simulator */}
      <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#D5BDA4] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#542B38] bg-[#FAF5EE] px-2.5 py-0.5 rounded border border-[#D5BDA4]">
              Interactive Mission Simulator
            </span>
            <h2 className="text-lg font-bold text-[#33302E] font-orbitron mt-1">
              Mission Destination Risk Profile
            </h2>
          </div>

          {/* Destination Selector Tabs */}
          <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-[#F5F0E9] border border-[#E4DAD0] font-mono text-xs">
            {(['iss', 'moon', 'mars_transit', 'mars_surface'] as Destination[]).map((d) => (
              <button
                key={d}
                onClick={() => {
                  sound.playClick();
                  setDestination(d);
                }}
                className={`px-3 py-1.5 rounded-lg transition ${
                  destination === d
                    ? 'bg-[#542B38] text-[#F5F0E9] font-bold shadow-sm'
                    : 'text-[#817A76] hover:text-[#33302E]'
                }`}
              >
                {d === 'iss' ? 'ISS (LEO)' : d === 'moon' ? 'Moon' : d === 'mars_transit' ? 'Mars Transit' : 'Mars Surface'}
              </button>
            ))}
          </div>
        </div>

        {/* Telemetry metrics for current destination */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs mb-3">
          <div className="p-3 rounded-xl bg-[#F5F0E9] border border-[#E4DAD0]">
            <span className="text-[#817A76] block text-[10px] uppercase">Destination</span>
            <span className="text-[#33302E] font-bold">{currentDest.name}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#F5F0E9] border border-[#E4DAD0]">
            <span className="text-[#817A76] block text-[10px] uppercase">Comms Delay (1-Way)</span>
            <span className="text-[#542B38] font-bold" dangerouslySetInnerHTML={{ __html: currentDest.latency }} />
          </div>
          <div className="p-3 rounded-xl bg-[#F5F0E9] border border-[#E4DAD0]">
            <span className="text-[#817A76] block text-[10px] uppercase">Gravity Regime</span>
            <span className="text-[#B87D3B] font-bold">{currentDest.gravity}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#F5F0E9] border border-[#E4DAD0]">
            <span className="text-[#817A76] block text-[10px] uppercase">Radiation Threat</span>
            <span className="text-[#8B3A42] font-bold">{currentDest.radLevel.split('(')[0]}</span>
          </div>
        </div>
        <p className="text-xs text-[#33302E] font-mono">
          <strong className="text-[#542B38]">Mission Impact:</strong> {currentDest.desc}
        </p>
      </div>

      {/* Hazard Selector Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {NASA_FIVE_HAZARDS.map((hazard) => (
          <button
            key={hazard.id}
            onClick={() => {
              sound.playClick();
              setSelectedHazard(hazard);
            }}
            className={`p-4 rounded-xl border text-left transition ${
              selectedHazard.id === hazard.id
                ? 'bg-[#FAF5EE] border-[#542B38] shadow-sm'
                : 'bg-[#FFFCF8] border-[#E4DAD0] hover:border-[#D5BDA4]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F5F0E9] border border-[#E4DAD0] text-[#542B38] font-bold">
                0{hazard.hazardNumber}
              </span>
              <span className={`w-2 h-2 rounded-full ${
                hazard.severityLevel === 'Critical' ? 'bg-[#8B3A42] animate-ping' :
                hazard.severityLevel === 'Severe' ? 'bg-[#B87D3B]' : 'bg-[#4E7D63]'
              }`} />
            </div>
            <h3 className="font-bold text-[#33302E] text-xs font-orbitron truncate">{hazard.title}</h3>
            <span className="text-[10px] text-[#817A76] font-mono block mt-1 truncate">{hazard.tagline}</span>
          </button>
        ))}
      </div>

      {/* Selected Hazard Detailed Dossier */}
      <div className="p-8 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#E4DAD0]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#F9EBEF] border border-[#E8C4CB] text-[#8B3A42] font-bold uppercase">
                HAZARD 0{selectedHazard.hazardNumber} â€¢ {selectedHazard.severityLevel} SEVERITY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#33302E] font-orbitron">
              {selectedHazard.title}
            </h2>
            <p className="text-sm font-mono text-[#542B38] mt-1">
              {selectedHazard.tagline}
            </p>
          </div>

          <Link
            to="/body-explorer"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5F0E9] hover:bg-[#EAE4DC] border border-[#D5BDA4] text-[#542B38] text-xs font-mono font-bold transition shadow-sm"
          >
            <Brain className="w-4 h-4 text-[#542B38]" />
            <span>View Affected Organs in 3D</span>
          </Link>
        </div>

        {/* Core Description & Associated Risk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#817A76] mb-2">
                Hazard Physics &amp; Physiological Etiology
              </h4>
              <p className="text-sm text-[#33302E] leading-relaxed bg-[#F5F0E9] p-4 rounded-xl border border-[#E4DAD0]">
                {selectedHazard.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#B87D3B] mb-2">
                Detailed Biological Complications
              </h4>
              <ul className="space-y-2">
                {selectedHazard.detailedEffects.map((eff, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#33302E] bg-[#FAF3E8] p-2.5 rounded-lg border border-[#EBD7BE]">
                    <span className="text-[#B87D3B] font-bold mt-0.5">â€¢</span>
                    <span>{eff}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {/* Associated Risk Callout */}
            <div className="p-4 rounded-xl bg-[#F9EBEF] border border-[#E8C4CB] text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8B3A42] block mb-1 font-bold">
                Primary Associated Risk
              </span>
              <p className="text-[#8B3A42] font-medium leading-relaxed">
                {selectedHazard.primaryRisk}
              </p>
            </div>

            {/* Affected Body Systems */}
            <div className="p-4 rounded-xl bg-[#F5F0E9] border border-[#E4DAD0] text-xs font-mono">
              <span className="text-[#817A76] block text-[10px] uppercase mb-2">Affected Body Systems</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedHazard.affectedBodySystems.map((sys, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-[#FFFCF8] border border-[#E4DAD0] text-[#33302E]">
                    {sys}
                  </span>
                ))}
              </div>
            </div>

            {/* Monitored Biomarkers */}
            <div className="p-4 rounded-xl bg-[#F5F0E9] border border-[#E4DAD0] text-xs font-mono">
              <span className="text-[#817A76] block text-[10px] uppercase mb-2">Monitored Telemetry Biomarkers</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedHazard.monitoredIndicators.map((ind, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-[#FAF5EE] border border-[#D5BDA4] text-[#542B38]">
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Countermeasures & Preventative Protocols */}
        <div className="pt-6 border-t border-[#E4DAD0]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#4E7D63] mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#4E7D63]" />
            Approved NASA Countermeasures &amp; Preventative Protocols
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            {selectedHazard.countermeasures.map((cm, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#EBF3EE] border border-[#C6DCCF] text-[#33302E]">
                <span className="text-[#4E7D63] font-bold mt-0.5">âœ“</span>
                <span className="leading-relaxed">{cm}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#E4DAD0] flex items-center justify-between text-[11px] font-mono text-[#817A76]">
            <span>NASA Research Source: <strong className="text-[#542B38]">{selectedHazard.nasaReference}</strong></span>
          </div>
        </div>
      </div>

      {/* Hazard-to-Body-System Relationship Matrix Diagram */}
      <div className="p-8 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-[#542B38]" />
          <h3 className="text-base font-bold text-[#33302E] font-orbitron">
            Hazard-to-Body-System Relationship Matrix
          </h3>
        </div>
        <p className="text-xs font-mono text-[#817A76] mb-6">
          How each spaceflight hazard directly links to organ systems and telemetry sensors in SOLARIS.
        </p>

        <div className="space-y-3 font-mono text-xs">
          {[
            { hazard: 'Altered Gravity (0g / 1/6g / 3/8g)', system: 'Bones & Musculoskeletal Matrix', monitor: 'ARED Resistive Load & Bone Density Monitoring' },
            { hazard: 'Isolation & Confinement', system: 'Brain, Cognition & Circadian Clock', monitor: 'Sleep Architecture (REM/Deep) & Mood Assessment' },
            { hazard: 'Distance from Earth (22m Latency)', system: 'Cardiovascular & Autonomous Triage', monitor: 'Continuous Heart Rate & Blood Pressure Telemetry' },
            { hazard: 'Space Radiation (GCRs / SPEs)', system: 'Immune Cells & Ocular Lens', monitor: 'Tissue Dosimetry & Biomarker Stress Panels' },
            { hazard: 'Hostile Closed Environments', system: 'Lungs, Nutrition & Core Metabolism', monitor: 'Cabin CO2 / O2 Ratios & Blood Sugar Logging' },
          ].map((row, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-[#F5F0E9] border border-[#E4DAD0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[#542B38] font-bold">
                <span>{row.hazard}</span>
              </div>
              <span className="text-[#817A76]">â†’</span>
              <div className="text-[#A56F73] font-medium">{row.system}</div>
              <span className="text-[#817A76]">â†’</span>
              <div className="text-[#4E7D63]">{row.monitor}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

