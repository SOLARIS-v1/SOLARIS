import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Shield,
  HeartPulse,
  Brain,
  Orbit,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Calendar,
  FileText,
  Github
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { NASA_FIVE_HAZARDS } from '../data/hazardData';
import { sound } from '../utils/audio';
import homepageBg from '../assets/homepage-bg.jpg';
import SaturnHeroCanvas from '../components/home/SaturnHeroCanvas';
import { ThreeErrorBoundary } from '../components/body-explorer/ThreeErrorBoundary';

export default function LandingPage() {

  return (
    <div className="min-h-screen relative bg-[#F5F0E9] text-[#33302E] selection:bg-[#D5BDA4] selection:text-[#542B38] overflow-x-hidden">
      {/* Space-Themed Background Image Layer (Homepage Only) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${homepageBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Soft atmospheric gradient allowing rich space depth while maintaining text clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0E9]/30 via-[#F5F0E9]/45 to-[#F5F0E9]/80" />
      </div>

      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 min-h-[92vh] flex items-center pt-28 pb-16 px-6 overflow-hidden">
        {/* Subtle radial celestial aura */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#542B38]/10 blur-3xl pointer-events-none -z-10" />

        {/* 3D Saturn Canvas with WebGL Error Boundary & Fallback */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ThreeErrorBoundary
            fallback={
              <div className="w-full h-full flex items-center justify-end pr-16 opacity-30 pointer-events-none">
                <div className="w-72 h-72 rounded-full border border-[#D5BDA4]/50 flex items-center justify-center">
                  <div className="w-56 h-56 rounded-full border border-[#542B38]/40" />
                </div>
              </div>
            }
          >
            <SaturnHeroCanvas />
          </ThreeErrorBoundary>
        </div>

        {/* Localized soft radial glow behind text only (preserves crisp dark text without washing out Saturn) */}
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full bg-[#F5F0E9]/88 blur-3xl pointer-events-none z-10" />

        <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* NASA Space Apps 2026 Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FFFCF8]/90 backdrop-blur-md border border-[#D5BDA4] text-[#542B38] text-xs font-mono shadow-warm-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#542B38] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#542B38]" />
              </span>
              <span className="font-semibold tracking-wide">NASA Space Apps Challenge 2026 â€¢ Human Space Exploration</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E1B18] font-orbitron tracking-tight leading-[1.12]">
              Your Health. <br />
              <span className="text-[#542B38]">
                Your Mission.
              </span> <br />
              <span className="text-[#3E1F29]">
                Our Priority.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#262320] max-w-xl leading-relaxed font-sans font-medium">
              SOLARIS — Spaceflight Onboard Local Autonomous Readiness & Intelligence System — is an autonomous, mission-grade physiological monitoring platform designed for astronauts on long-duration lunar, Martian, and deep-space missions. Real-time telemetry, 3D anatomical tracking, and intelligent early warning countermeasure protocols.
            </p>

            {/* Quick stats / metrics bar */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#D5BDA4]/60 max-w-xl">
              <div className="p-3 rounded-xl bg-[#FFFCF8]/95 backdrop-blur-sm border border-[#D5BDA4] shadow-warm-sm hover:border-[#542B38] transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#383330] tracking-wider uppercase font-bold">HAZARD-TLM</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#542B38]" />
                </div>
                <div className="text-2xl font-bold font-orbitron text-[#542B38]">5</div>
                <div className="text-[11px] font-mono text-[#1E1B18] font-medium leading-tight">Space Hazards Analyzed</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FFFCF8]/95 backdrop-blur-sm border border-[#D5BDA4] shadow-warm-sm hover:border-[#542B38] transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#383330] tracking-wider uppercase font-bold">BIO-SYS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#542B38]" />
                </div>
                <div className="text-2xl font-bold font-orbitron text-[#542B38]">6</div>
                <div className="text-[11px] font-mono text-[#1E1B18] font-medium leading-tight">Organ Systems Tracked</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FFFCF8]/95 backdrop-blur-sm border border-[#D5BDA4] shadow-warm-sm hover:border-[#542B38] transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#383330] tracking-wider uppercase font-bold">OFFLINE-PWA</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2A6145]" />
                </div>
                <div className="text-2xl font-bold font-orbitron text-[#2A6145]">100%</div>
                <div className="text-[11px] font-mono text-[#1E1B18] font-medium leading-tight">Autonomous Flight Ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION A: About SOLARIS ================= */}
      <section id="about" className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-[#E4DAD0]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#542B38] bg-[#FAF5EE] border border-[#D5BDA4] px-3.5 py-1 rounded-full font-bold shadow-warm-sm">
            Project Overview
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#33302E] font-orbitron mt-3 mb-4">
            About SOLARIS
          </h2>
          <p className="text-[#262320] text-sm sm:text-base leading-relaxed font-sans">
            During deep space travel to the Moon or Mars, astronauts cannot quickly return to Earth or dial ground medical teams for instantaneous surgery advice. Radio signals take up to 22 minutes one way. SOLARIS bridges this distance with an intelligent, self-contained health platform that monitors vital signs, identifies risks early, and guides astronauts through proactive preventive routines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] transition-all duration-300 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#542B38] group-hover:scale-110 transition-transform shadow-warm-sm">
                  <HeartPulse className="w-6 h-6 text-[#542B38]" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF5EE] border border-[#E4DAD0] text-[#403B38]">
                  TLM // 01
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#542B38] mb-2 font-orbitron">Continuous Vitals Tracking</h3>
              <p className="text-xs text-[#262320] leading-relaxed">
                Track heart rate, blood pressure, blood glucose, core temperature, sleep architecture, and psychological mood with zero medical jargon required.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#E4DAD0]/60 flex items-center justify-between text-[11px] font-mono text-[#403B38]">
              <span>6 Metric Streams</span>
              <span className="text-[#4E7D63] font-semibold">Autonomous Validation</span>
            </div>
          </div>

          <div className="group relative p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] transition-all duration-300 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#A56F73] group-hover:scale-110 transition-transform shadow-warm-sm">
                  <Brain className="w-6 h-6 text-[#A56F73]" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF5EE] border border-[#E4DAD0] text-[#403B38]">
                  BIO // 02
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#542B38] mb-2 font-orbitron">Interactive 3D Body Explorer</h3>
              <p className="text-xs text-[#262320] leading-relaxed">
                Explore a 3D anatomical model with clickable organs to learn exactly how microgravity fluid shifts, cosmic radiation, and bone loss affect individual body systems.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#E4DAD0]/60 flex items-center justify-between text-[11px] font-mono text-[#403B38]">
              <span>Three.js Engine</span>
              <span className="text-[#A56F73] font-semibold">6 Organ Systems</span>
            </div>
          </div>

          <div className="group relative p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] transition-all duration-300 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#4E7D63] group-hover:scale-110 transition-transform shadow-warm-sm">
                  <Shield className="w-6 h-6 text-[#4E7D63]" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF5EE] border border-[#E4DAD0] text-[#403B38]">
                  TRG // 03
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#542B38] mb-2 font-orbitron">Smart Early Warning System</h3>
              <p className="text-xs text-[#262320] leading-relaxed">
                Algorithmic triage alerts astronauts to subtle cardiovascular or sleep trends before they develop into mission-jeopardizing medical events.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#E4DAD0]/60 flex items-center justify-between text-[11px] font-mono text-[#403B38]">
              <span>Clinical Triage</span>
              <span className="text-[#4E7D63] font-semibold">Zero Telemetry Latency</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION B: WHY MONITORING MATTERS ================= */}
      <section className="relative z-10 py-20 px-6 bg-[#FAF5EE]/80 backdrop-blur-sm border-y border-[#E4DAD0]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#542B38] bg-[#FFFCF8] border border-[#D5BDA4] px-3.5 py-1 rounded-full font-bold shadow-warm-sm">
              Mission Criticality
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#33302E] font-orbitron mt-3 mb-6">
              Why Astronaut Health Monitoring Matters
            </h2>
            <div className="space-y-4 text-sm text-[#262320]">
              <p className="leading-relaxed">
                Human physiology evolved over millions of years inside Earthâ€™s protective 1-G gravity field and atmospheric radiation shield. When those protections are stripped away, the human body begins adapting rapidly:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 bg-[#FFFCF8] p-4 rounded-xl border border-[#E4DAD0] shadow-warm-sm hover:border-[#D5BDA4] transition-colors">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#542B38] mt-1.5 flex-shrink-0" />
                  <span><strong className="text-[#542B38]">Fluid Shifts:</strong> Two liters of blood and interstitial fluid migrate from the lower limbs to the chest and head, elevating intracranial pressure and altering vision (SANS).</span>
                </li>
                <li className="flex items-start gap-3 bg-[#FFFCF8] p-4 rounded-xl border border-[#E4DAD0] shadow-warm-sm hover:border-[#D5BDA4] transition-colors">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A56F73] mt-1.5 flex-shrink-0" />
                  <span><strong className="text-[#542B38]">Bone &amp; Muscle Atrophy:</strong> Astronauts lose up to 1.5% bone mineral density per month in weight-bearing bones without daily 2.5-hour countermeasure workouts.</span>
                </li>
                <li className="flex items-start gap-3 bg-[#FFFCF8] p-4 rounded-xl border border-[#E4DAD0] shadow-warm-sm hover:border-[#D5BDA4] transition-colors">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B3A42] mt-1.5 flex-shrink-0" />
                  <span><strong className="text-[#542B38]">Deep Space Radiation:</strong> Galactic cosmic rays break DNA strands and increase cataract risks, requiring active tissue dosimetry.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-warm hover:shadow-warm-md transition-shadow space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E4DAD0]">
              <div className="text-xs font-mono font-bold text-[#542B38] tracking-wider">NASA HUMAN RESEARCH PROGRAM</div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EBF3EE] text-[#4E7D63] border border-[#C6DCCF] font-bold">VERIFIED CRITERIA</span>
            </div>
            <div className="space-y-3.5 font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[#403B38]">Monthly Bone Density Loss</span>
                  <span className="text-[#B87D3B] font-bold">1.0% â€“ 1.5%</span>
                </div>
                <div className="w-full bg-[#E4DAD0] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#B87D3B] h-full rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[#403B38]">Cephalic Fluid Shift</span>
                  <span className="text-[#542B38] font-bold">~ 2.0 Liters</span>
                </div>
                <div className="w-full bg-[#E4DAD0] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#542B38] h-full rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[#403B38]">Daily Countermeasure Exercise</span>
                  <span className="text-[#4E7D63] font-bold">2.5 Hours Mandatory</span>
                </div>
                <div className="w-full bg-[#E4DAD0] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#4E7D63] h-full rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[#403B38]">Mars Comms Latency (One-Way)</span>
                  <span className="text-[#A56F73] font-bold">Up to 22 Minutes</span>
                </div>
                <div className="w-full bg-[#E4DAD0] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#A56F73] h-full rounded-full" style={{ width: '70%' }} />
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] font-mono text-[#403B38] flex items-center justify-between border-t border-[#E4DAD0]/60">
              <span>Standard: NASA-STD-3001</span>
              <span>Autonomous AMDS Level 4</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION C: FIVE HAZARDS OF HUMAN SPACEFLIGHT ================= */}
      <section id="hazards" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#542B38] bg-[#FAF5EE] border border-[#D5BDA4] px-3.5 py-1 rounded-full font-bold shadow-warm-sm">
            NASA Challenge Core
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#33302E] font-orbitron mt-3 mb-4">
            The Five Hazards of Human Spaceflight
          </h2>
          <p className="text-[#262320] text-sm sm:text-base leading-relaxed">
            NASA's Human Research Program classifies space exploration risks into five distinct hazards. SOLARIS monitors indicators for every hazard category.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NASA_FIVE_HAZARDS.map((hazard) => (
            <div
              key={hazard.id}
              className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] transition-all duration-300 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#FAF5EE] border border-[#E4DAD0] text-[#542B38] group-hover:border-[#D5BDA4] transition-colors">
                    HAZARD 0{hazard.hazardNumber}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold text-[#8B3A42] bg-[#F9EBEF] border border-[#E8C4CB]">
                    {hazard.severityLevel}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#33302E] font-orbitron mb-1 group-hover:text-[#542B38] transition-colors">{hazard.title}</h3>
                <p className="text-xs text-[#A56F73] font-mono font-semibold mb-3">{hazard.tagline}</p>
                <div className="text-xs text-[#262320] bg-[#FAF5EE] border border-[#E4DAD0] p-2.5 rounded-lg mb-4">
                  <strong className="text-[#542B38]">Associated Risk:</strong> {hazard.primaryRisk}
                </div>
                <p className="text-xs text-[#262320] leading-relaxed mb-4">
                  {hazard.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4DAD0] flex items-center justify-between text-xs font-mono">
                <span className="text-[#403B38]">Indicators: <strong className="text-[#542B38]">{hazard.monitoredIndicators.length}</strong> monitored</span>
              </div>
            </div>
          ))}

          {/* Quick link card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#542B38] to-[#3E1F29] border border-[#6E3B4B] shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center items-center text-center text-[#F5F0E9] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#D5BDA4]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Orbit className="w-12 h-12 text-[#D5BDA4] mb-4 animate-spin group-hover:scale-110 transition-transform" style={{ animationDuration: '20s' }} />
            <h3 className="text-lg font-bold text-[#F5F0E9] font-orbitron mb-2">Interactive Hazard Matrix</h3>
            <p className="text-xs text-[#D5BDA4] mb-6 max-w-xs leading-relaxed">
              View how each hazard maps to bodily organs, preventive countermeasures, and live flight telemetry.
            </p>
            <Link
              to="/hazards"
              onClick={() => sound.playClick()}
              className="relative px-5 py-2.5 rounded-xl bg-[#D5BDA4] hover:bg-[#EAE0D5] text-[#542B38] font-bold text-xs font-mono transition-all shadow-warm-sm hover:shadow-warm hover:-translate-y-0.5"
            >
              Open Hazard Deep-Dive
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SECTION D: KEY FEATURES ================= */}
      <section id="features" className="relative z-10 py-20 px-6 bg-[#FAF5EE]/80 backdrop-blur-sm border-y border-[#E4DAD0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#542B38] bg-[#FFFCF8] border border-[#D5BDA4] px-3.5 py-1 rounded-full font-bold shadow-warm-sm">
              Platform Modules
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#33302E] font-orbitron mt-3 mb-4">
              Core Capabilities &amp; Features
            </h2>
            <p className="text-[#262320] text-sm">
              Engineered with medical clarity, offline autonomy, and clinical-grade precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#542B38] group-hover:scale-110 transition-transform shadow-warm-sm">
                    <HeartPulse className="w-5 h-5 text-[#542B38]" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF5EE] border border-[#E4DAD0] text-[#403B38]">Range Validation</span>
                </div>
                <h3 className="text-base font-bold text-[#542B38] font-orbitron mb-1.5">Health Monitoring</h3>
                <p className="text-xs text-[#262320] leading-relaxed">
                  Record resting heart rate, blood pressure, glucose, temperature, sleep, and mood with instant physiological range checks.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E4DAD0]/60 text-[11px] font-mono text-[#403B38] flex items-center justify-between">
                <span>6 Vitals</span>
                <span className="text-[#4E7D63] font-semibold">Active Monitoring</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#A56F73] group-hover:scale-110 transition-transform shadow-warm-sm">
                    <Brain className="w-5 h-5 text-[#A56F73]" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF5EE] border border-[#E4DAD0] text-[#403B38]">WebGL Three.js</span>
                </div>
                <h3 className="text-base font-bold text-[#542B38] font-orbitron mb-1.5">Interactive 3D Body</h3>
                <p className="text-xs text-[#262320] leading-relaxed">
                  Clickable 3D anatomical model with 6 organ systems: Brain, Heart, Lungs, Bones, Muscles, and Digestive system.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E4DAD0]/60 text-[11px] font-mono text-[#403B38] flex items-center justify-between">
                <span>R3F Pipeline</span>
                <span className="text-[#A56F73] font-semibold">Real-time Raycasting</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#B87D3B] group-hover:scale-110 transition-transform shadow-warm-sm">
                    <Sparkles className="w-5 h-5 text-[#B87D3B]" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF5EE] border border-[#E4DAD0] text-[#403B38]">Clinical Triage</span>
                </div>
                <h3 className="text-base font-bold text-[#542B38] font-orbitron mb-1.5">Smart Health Insights</h3>
                <p className="text-xs text-[#262320] leading-relaxed">
                  Green, Yellow, and Red rule-based triage flags physiological drift and connects readings with NASA space hazards.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E4DAD0]/60 text-[11px] font-mono text-[#403B38] flex items-center justify-between">
                <span>Tri-Color Alert</span>
                <span className="text-[#B87D3B] font-semibold">Space Hazard Mapping</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#542B38] group-hover:scale-110 transition-transform shadow-warm-sm">
                    <Activity className="w-5 h-5 text-[#542B38]" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF5EE] border border-[#E4DAD0] text-[#403B38]">Recharts Engine</span>
                </div>
                <h3 className="text-base font-bold text-[#542B38] font-orbitron mb-1.5">Dynamic Analytics</h3>
                <p className="text-xs text-[#262320] leading-relaxed">
                  Interactive charts powered by Recharts with filters for Today, 7 Days, and 30 Days with multi-stage sleep architecture.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E4DAD0]/60 text-[11px] font-mono text-[#403B38] flex items-center justify-between">
                <span>Multi-window Filter</span>
                <span className="text-[#542B38] font-semibold">Circadian Sleep Trends</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#4E7D63] group-hover:scale-110 transition-transform shadow-warm-sm">
                    <Calendar className="w-5 h-5 text-[#4E7D63]" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF5EE] border border-[#E4DAD0] text-[#403B38]">ARED Protocol</span>
                </div>
                <h3 className="text-base font-bold text-[#542B38] font-orbitron mb-1.5">Daily Mission Routine</h3>
                <p className="text-xs text-[#262320] leading-relaxed">
                  Flight checklist for vitals, ARED resistance workouts, hydration packets, and earn achievement badges like Health Guardian.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E4DAD0]/60 text-[11px] font-mono text-[#403B38] flex items-center justify-between">
                <span>Checklist Engine</span>
                <span className="text-[#4E7D63] font-semibold">Gamified Badges</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#A56F73] group-hover:scale-110 transition-transform shadow-warm-sm">
                    <FileText className="w-5 h-5 text-[#A56F73]" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF5EE] border border-[#E4DAD0] text-[#403B38]">Report Export</span>
                </div>
                <h3 className="text-base font-bold text-[#542B38] font-orbitron mb-1.5">Mission Health Reports</h3>
                <p className="text-xs text-[#262320] leading-relaxed">
                  Export telemetry to CSV and print mission reports formatted for flight surgeons and medical officers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E4DAD0]/60 text-[11px] font-mono text-[#403B38] flex items-center justify-between">
                <span>CSV &amp; Print CSS</span>
                <span className="text-[#A56F73] font-semibold">Clinical Formats</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION E: HOW IT WORKS ================= */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#542B38] bg-[#FAF5EE] border border-[#D5BDA4] px-3.5 py-1 rounded-full font-bold shadow-warm-sm">
            Operation Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#33302E] font-orbitron mt-3 mb-4">
            How It Works
          </h2>
          <p className="text-[#262320] text-sm">
            Four simple steps to maintain peak physical and psychological health in deep space.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] transition-all duration-300 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 relative group">
            <span className="text-3xl font-extrabold text-[#D5BDA4] group-hover:text-[#542B38] transition-colors font-orbitron block mb-2">01</span>
            <h3 className="text-base font-bold text-[#542B38] mb-2 font-orbitron">Enter Measurements</h3>
            <p className="text-xs text-[#262320] leading-relaxed">
              Log daily vital signs, sleep hours, and subjective mood in seconds using calibrated flight forms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] transition-all duration-300 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 relative group">
            <span className="text-3xl font-extrabold text-[#D5BDA4] group-hover:text-[#542B38] transition-colors font-orbitron block mb-2">02</span>
            <h3 className="text-base font-bold text-[#542B38] mb-2 font-orbitron">Review Indicators</h3>
            <p className="text-xs text-[#262320] leading-relaxed">
              Examine live metric cards with sparklines, status pills, and previous reading comparisons.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] transition-all duration-300 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 relative group">
            <span className="text-3xl font-extrabold text-[#D5BDA4] group-hover:text-[#542B38] transition-colors font-orbitron block mb-2">03</span>
            <h3 className="text-base font-bold text-[#542B38] mb-2 font-orbitron">Understand Trends</h3>
            <p className="text-xs text-[#262320] leading-relaxed">
              Track 7-day and 30-day analytics charts to spot gradual physiological adaptations over time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] transition-all duration-300 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 relative group">
            <span className="text-3xl font-extrabold text-[#D5BDA4] group-hover:text-[#542B38] transition-colors font-orbitron block mb-2">04</span>
            <h3 className="text-base font-bold text-[#542B38] mb-2 font-orbitron">Follow Guidance</h3>
            <p className="text-xs text-[#262320] leading-relaxed">
              Execute prescribed countermeasure workouts, hydration packs, and circadian lighting protocols.
            </p>
          </div>
        </div>

        {/* Mission Telemetry Quick-Launch Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#542B38] via-[#47242F] to-[#3A1C26] text-[#F5F0E9] border border-[#6E3B4B] shadow-warm-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-full bg-[#D5BDA4]/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4E7D63] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4E7D63]" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#D5BDA4] font-bold">
                TELEMETRY PROTOCOL ONLINE // READY FOR EVALUATION
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-orbitron tracking-tight">
              Ready to Explore Space Health Telemetry?
            </h3>
            <p className="text-xs sm:text-sm text-[#D5BDA4]/90 max-w-xl font-sans">
              Launch into the simulated Artemis III mission scenario with pre-calibrated cardiovascular telemetry, microgravity fluid shifts, and NASA research data.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <a
              href="https://github.com/SOLARIS-v1/S.O.L.A.R.I.S"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#D5BDA4] hover:bg-[#EAE0D5] text-[#542B38] font-bold text-sm tracking-wide transition-all shadow-warm-sm hover:shadow-warm hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5BDA4]"
              title="View on GitHub"
            >
              <Github className="w-5 h-5 text-[#542B38]" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= SECTION F: FOOTER ================= */}
      <footer className="relative z-10 py-12 px-6 border-t border-[#6E3B4B] bg-[#542B38] text-xs text-[#D5BDA4] font-mono shadow-warm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Orbit className="w-5 h-5 text-[#D5BDA4]" />
              <span className="text-[#F5F0E9] font-orbitron font-bold text-base">SOLARIS</span>
            </div>
            <p className="text-[#D5BDA4]/80 text-xs">
              NASA Space Apps Challenge 2026. Human Space Exploration / Healthcare Technology.
            </p>
          </div>

          <div>
            <h4 className="text-[#F5F0E9] font-bold mb-3 uppercase tracking-wider cursor-default select-text">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/health-monitoring" className="text-[#D5BDA4] hover:text-[#F5F0E9] transition">Health Monitoring</Link></li>
              <li><a href="#hazards" className="text-[#D5BDA4] hover:text-[#F5F0E9] transition">5 Space Hazards</a></li>
            </ul>
          </div>

          <div>
            <div className="text-[#F5F0E9] font-bold mb-3 uppercase tracking-wider">Scientific References</div>
            <ul className="space-y-2 text-[#D5BDA4]">
              <li>NASA Human Research Program</li>
              <li>NASA Behavioral Health (BHP) Standard</li>
              <li>NASA Exploration Medical Capability</li>
              <li>NASA Standard 3001 Vol 1 &amp; 2</li>
            </ul>
          </div>

          <div>
            <div className="text-[#F5F0E9] font-bold mb-3 uppercase tracking-wider">Hackathon Demo</div>
            <p className="text-[#D5BDA4]/80 mb-3">
              Prototype built for the 2026 NASA Space Apps Challenge simulating autonomous deep-space mission telemetry.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-[#6E3B4B] text-center text-[#D5BDA4]/70 text-[11px] leading-relaxed">
          <p className="mb-1">
            <strong className="text-[#D5BDA4]">DISCLAIMER:</strong> SOLARIS is an educational concept prototype created for the 2026 NASA Space Apps Challenge. All data shown is simulated demonstration data. This application does NOT provide real medical diagnoses or clinical prescriptions.
          </p>
          <p>Â© 2026 SOLARIS Team. Built with React, Three.js, Vite &amp; Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}


