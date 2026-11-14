import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
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
  FileText
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { resetDemoData } from '../utils/localStorage';
import { NASA_FIVE_HAZARDS } from '../data/hazardData';
import { sound } from '../utils/audio';

// 3D Orbital Earth & Spacecraft Scene in Hero
function Hero3DScene() {
  const earthRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const probeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = t * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.04;
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.2) * 0.1;
    }
    if (probeRef.current) {
      probeRef.current.position.x = Math.cos(t * 0.5) * 2.8;
      probeRef.current.position.z = Math.sin(t * 0.5) * 2.8;
      probeRef.current.position.y = Math.sin(t) * 0.4;
      probeRef.current.rotation.y = -t * 0.5;
    }
  });

  return (
    <>
      <Stars radius={50} depth={50} count={2500} factor={3} saturation={0} fade speed={0.8} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#FFFDF9" />
      <pointLight position={[-10, -5, -5]} intensity={0.6} color="#D5BDA4" />

      {/* Earth Sphere - Deep Burgundy Ocean & Warm Continental Tones */}
      <mesh ref={earthRef} position={[1.8, -0.6, -1]}>
        <sphereGeometry args={[2.0, 48, 48]} />
        <meshStandardMaterial
          color="#3A1C26"
          emissive="#200D14"
          roughness={0.65}
          metalness={0.15}
        />
      </mesh>

      {/* Subtle Warm Atmosphere Halo */}
      <mesh position={[1.8, -0.6, -1]}>
        <sphereGeometry args={[2.05, 32, 32]} />
        <meshBasicMaterial color="#D5BDA4" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>

      {/* Orbital Telemetry Rings in Champagne */}
      <mesh ref={ringRef} position={[1.8, -0.6, -1]}>
        <ringGeometry args={[2.6, 2.64, 64]} />
        <meshBasicMaterial color="#D5BDA4" side={THREE.DoubleSide} transparent opacity={0.5} />
      </mesh>

      {/* Orbiting Medical Telemetry Station */}
      <group ref={probeRef}>
        <mesh>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#D5BDA4" emissive="#A56F73" emissiveIntensity={0.5} wireframe />
        </mesh>
        <pointLight intensity={1.5} distance={3} color="#D5BDA4" />
      </group>
    </>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLaunchJudgeDemo = () => {
    sound.playSuccess();
    resetDemoData();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F0E9] text-[#33302E] selection:bg-[#D5BDA4] selection:text-[#542B38]">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 px-6 overflow-hidden">
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <Hero3DScene />
          </Canvas>
        </div>

        {/* Soft Warm Radial Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E9] via-[#F5F0E9]/85 to-transparent pointer-events-none z-10" />

        <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* NASA Space Apps 2026 Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFCF8] border border-[#D5BDA4] text-[#542B38] text-xs font-mono shadow-warm-sm">
              <span className="w-2 h-2 rounded-full bg-[#542B38] animate-ping" />
              <span className="font-semibold tracking-wide">NASA Space Apps Challenge 2026 • Human Space Exploration</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#33302E] font-orbitron tracking-tight leading-tight">
              Your Health. <br />
              <span className="text-[#542B38]">
                Your Mission.
              </span> <br />
              <span className="text-[#A56F73]">
                Our Priority.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#33302E] max-w-xl leading-relaxed font-sans">
              ASTRA HEALTH is an autonomous, mission-grade physiological monitoring platform designed for astronauts on long-duration lunar, Martian, and deep-space missions. Real-time telemetry, 3D anatomical tracking, and intelligent early warning countermeasure protocols.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleLaunchJudgeDemo}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#542B38] hover:bg-[#3E1F29] text-[#F5F0E9] font-bold text-sm tracking-wide transition shadow-warm hover:shadow-warm-md group"
              >
                <Sparkles className="w-4 h-4 text-[#D5BDA4] group-hover:rotate-12 transition-transform" />
                <span>Explore Judge Demo Mode</span>
                <ArrowRight className="w-4 h-4 text-[#F5F0E9] group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                to="/body-explorer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFFCF8] hover:bg-[#FAF5EE] border border-[#E4DAD0] hover:border-[#D5BDA4] text-[#542B38] font-bold text-sm tracking-wide transition shadow-warm-sm"
              >
                <Brain className="w-4 h-4 text-[#542B38]" />
                <span>Explore 3D Body</span>
              </Link>
            </div>

            {/* Quick stats / metrics bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E4DAD0] max-w-lg">
              <div>
                <div className="text-2xl font-bold font-orbitron text-[#542B38]">5</div>
                <div className="text-xs font-mono text-[#817A76]">Space Hazards Analyzed</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-orbitron text-[#A56F73]">6</div>
                <div className="text-xs font-mono text-[#817A76]">Anatomical Organ Systems</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-orbitron text-[#4E7D63]">100%</div>
                <div className="text-xs font-mono text-[#817A76]">Offline Autonomous Ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION A: ABOUT ASTRA HEALTH ================= */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#E4DAD0]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#542B38] bg-[#FAF5EE] border border-[#D5BDA4] px-3 py-1 rounded-full font-bold">
            Project Overview
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#33302E] font-orbitron mt-3 mb-4">
            About ASTRA HEALTH
          </h2>
          <p className="text-[#33302E] text-sm sm:text-base leading-relaxed font-sans">
            During deep space travel to the Moon or Mars, astronauts cannot quickly return to Earth or dial Mission Control for instantaneous surgery advice. Radio signals take up to 22 minutes one way. ASTRA HEALTH bridges this distance with an intelligent, self-contained health platform that monitors vital signs, identifies risks early, and guides astronauts through proactive preventive routines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] transition shadow-warm hover:shadow-warm-md">
            <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#542B38] w-fit mb-4">
              <HeartPulse className="w-6 h-6 text-[#542B38]" />
            </div>
            <h3 className="text-lg font-bold text-[#542B38] mb-2 font-orbitron">Continuous Vitals Tracking</h3>
            <p className="text-xs text-[#33302E] leading-relaxed">
              Track heart rate, blood pressure, blood glucose, core temperature, sleep architecture, and psychological mood with zero medical jargon required.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] transition shadow-warm hover:shadow-warm-md">
            <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#A56F73] w-fit mb-4">
              <Brain className="w-6 h-6 text-[#A56F73]" />
            </div>
            <h3 className="text-lg font-bold text-[#542B38] mb-2 font-orbitron">Interactive 3D Body Explorer</h3>
            <p className="text-xs text-[#33302E] leading-relaxed">
              Explore a 3D anatomical model with clickable organs to learn exactly how microgravity fluid shifts, cosmic radiation, and bone loss affect individual body systems.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] transition shadow-warm hover:shadow-warm-md">
            <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#4E7D63] w-fit mb-4">
              <Shield className="w-6 h-6 text-[#4E7D63]" />
            </div>
            <h3 className="text-lg font-bold text-[#542B38] mb-2 font-orbitron">Smart Early Warning System</h3>
            <p className="text-xs text-[#33302E] leading-relaxed">
              Algorithmic triage alerts astronauts to subtle cardiovascular or sleep trends before they develop into mission-jeopardizing medical events.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION B: WHY MONITORING MATTERS ================= */}
      <section className="py-20 px-6 bg-[#FAF5EE] border-y border-[#E4DAD0]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#542B38] bg-[#FFFCF8] border border-[#D5BDA4] px-3 py-1 rounded-full font-bold">
              Mission Criticality
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#33302E] font-orbitron mt-3 mb-6">
              Why Astronaut Health Monitoring Matters
            </h2>
            <div className="space-y-4 text-sm text-[#33302E]">
              <p className="leading-relaxed">
                Human physiology evolved over millions of years inside Earth’s protective 1-G gravity field and atmospheric radiation shield. When those protections are stripped away, the human body begins adapting rapidly:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 bg-[#FFFCF8] p-3.5 rounded-xl border border-[#E4DAD0] shadow-warm-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#542B38] mt-1.5 flex-shrink-0" />
                  <span><strong className="text-[#542B38]">Fluid Shifts:</strong> Two liters of blood and interstitial fluid migrate from the lower limbs to the chest and head, elevating intracranial pressure and altering vision (SANS).</span>
                </li>
                <li className="flex items-start gap-3 bg-[#FFFCF8] p-3.5 rounded-xl border border-[#E4DAD0] shadow-warm-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A56F73] mt-1.5 flex-shrink-0" />
                  <span><strong className="text-[#542B38]">Bone &amp; Muscle Atrophy:</strong> Astronauts lose up to 1.5% bone mineral density per month in weight-bearing bones without daily 2.5-hour countermeasure workouts.</span>
                </li>
                <li className="flex items-start gap-3 bg-[#FFFCF8] p-3.5 rounded-xl border border-[#E4DAD0] shadow-warm-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B3A42] mt-1.5 flex-shrink-0" />
                  <span><strong className="text-[#542B38]">Deep Space Radiation:</strong> Galactic cosmic rays break DNA strands and increase cataract risks, requiring active tissue dosimetry.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-warm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E4DAD0]">
              <div className="text-xs font-mono font-bold text-[#542B38]">NASA HUMAN RESEARCH PROGRAM</div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EBF3EE] text-[#4E7D63] border border-[#C6DCCF] font-bold">VERIFIED CRITERIA</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center p-3 rounded-lg bg-[#FAF5EE] border border-[#E4DAD0]">
                <span className="text-[#817A76]">Monthly Bone Density Loss</span>
                <span className="text-[#B87D3B] font-bold">1.0% – 1.5%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-[#FAF5EE] border border-[#E4DAD0]">
                <span className="text-[#817A76]">Cephalic Fluid Shift</span>
                <span className="text-[#542B38] font-bold">~ 2.0 Liters</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-[#FAF5EE] border border-[#E4DAD0]">
                <span className="text-[#817A76]">Daily Countermeasure Exercise</span>
                <span className="text-[#4E7D63] font-bold">2.5 Hours Mandatory</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-[#FAF5EE] border border-[#E4DAD0]">
                <span className="text-[#817A76]">Mars Comms Latency (One-Way)</span>
                <span className="text-[#A56F73] font-bold">Up to 22 Minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION C: FIVE HAZARDS OF HUMAN SPACEFLIGHT ================= */}
      <section id="hazards" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#542B38] bg-[#FAF5EE] border border-[#D5BDA4] px-3 py-1 rounded-full font-bold">
            NASA Challenge Core
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#33302E] font-orbitron mt-3 mb-4">
            The Five Hazards of Human Spaceflight
          </h2>
          <p className="text-[#33302E] text-sm sm:text-base leading-relaxed">
            NASA's Human Research Program classifies space exploration risks into five distinct hazards. ASTRA HEALTH monitors indicators for every hazard category.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NASA_FIVE_HAZARDS.map((hazard) => (
            <div
              key={hazard.id}
              className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] transition shadow-warm hover:shadow-warm-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#FAF5EE] border border-[#E4DAD0] text-[#542B38]">
                    HAZARD 0{hazard.hazardNumber}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold text-[#8B3A42] bg-[#F9EBEF] border border-[#E8C4CB]">
                    {hazard.severityLevel}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#33302E] font-orbitron mb-1">{hazard.title}</h3>
                <p className="text-xs text-[#A56F73] font-mono font-semibold mb-3">{hazard.tagline}</p>
                <div className="text-xs text-[#33302E] bg-[#FAF5EE] border border-[#E4DAD0] p-2.5 rounded-lg mb-4">
                  <strong className="text-[#542B38]">Associated Risk:</strong> {hazard.primaryRisk}
                </div>
                <p className="text-xs text-[#33302E] leading-relaxed mb-4">
                  {hazard.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4DAD0] flex items-center justify-between text-xs font-mono">
                <span className="text-[#817A76]">Indicators: {hazard.monitoredIndicators.length} monitored</span>
                <Link
                  to="/hazards"
                  onClick={() => sound.playClick()}
                  className="text-[#542B38] hover:text-[#A56F73] font-bold flex items-center gap-1 transition"
                >
                  <span>Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}

          {/* Quick link card */}
          <div className="p-6 rounded-2xl bg-[#542B38] border border-[#6E3B4B] shadow-warm flex flex-col justify-center items-center text-center text-[#F5F0E9]">
            <Orbit className="w-12 h-12 text-[#D5BDA4] mb-4 animate-spin" style={{ animationDuration: '20s' }} />
            <h3 className="text-lg font-bold text-[#F5F0E9] font-orbitron mb-2">Interactive Hazard Matrix</h3>
            <p className="text-xs text-[#D5BDA4] mb-6 max-w-xs">
              View how each hazard maps to bodily organs, preventive countermeasures, and live flight telemetry.
            </p>
            <Link
              to="/hazards"
              onClick={() => sound.playClick()}
              className="px-5 py-2.5 rounded-xl bg-[#D5BDA4] hover:bg-[#C9AE94] text-[#542B38] font-bold text-xs font-mono transition shadow-warm-sm"
            >
              Open Hazard Deep-Dive
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SECTION D: KEY FEATURES ================= */}
      <section id="features" className="py-20 px-6 bg-[#FAF5EE] border-y border-[#E4DAD0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#542B38] bg-[#FFFCF8] border border-[#D5BDA4] px-3 py-1 rounded-full font-bold">
              Platform Modules
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#33302E] font-orbitron mt-3 mb-4">
              Core Capabilities &amp; Features
            </h2>
            <p className="text-[#33302E] text-sm">
              Engineered with medical clarity, offline autonomy, and mission control precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] shadow-warm transition">
              <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#542B38] w-fit mb-3">
                <HeartPulse className="w-5 h-5 text-[#542B38]" />
              </div>
              <h3 className="text-base font-bold text-[#542B38] font-orbitron mb-1.5">Health Monitoring</h3>
              <p className="text-xs text-[#33302E] leading-relaxed">
                Record resting heart rate, blood pressure, glucose, temperature, sleep, and mood with instant physiological range checks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] shadow-warm transition">
              <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#A56F73] w-fit mb-3">
                <Brain className="w-5 h-5 text-[#A56F73]" />
              </div>
              <h3 className="text-base font-bold text-[#542B38] font-orbitron mb-1.5">Interactive 3D Body</h3>
              <p className="text-xs text-[#33302E] leading-relaxed">
                Clickable 3D anatomical model with 6 organ systems: Brain, Heart, Lungs, Bones, Muscles, and Digestive system.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] shadow-warm transition">
              <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#B87D3B] w-fit mb-3">
                <Sparkles className="w-5 h-5 text-[#B87D3B]" />
              </div>
              <h3 className="text-base font-bold text-[#542B38] font-orbitron mb-1.5">Smart Health Insights</h3>
              <p className="text-xs text-[#33302E] leading-relaxed">
                Green, Yellow, and Red rule-based triage flags physiological drift and connects readings with NASA space hazards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] shadow-warm transition">
              <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#542B38] w-fit mb-3">
                <Activity className="w-5 h-5 text-[#542B38]" />
              </div>
              <h3 className="text-base font-bold text-[#542B38] font-orbitron mb-1.5">Dynamic Analytics</h3>
              <p className="text-xs text-[#33302E] leading-relaxed">
                Interactive charts powered by Recharts with filters for Today, 7 Days, and 30 Days with multi-stage sleep architecture.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] shadow-warm transition">
              <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#4E7D63] w-fit mb-3">
                <Calendar className="w-5 h-5 text-[#4E7D63]" />
              </div>
              <h3 className="text-base font-bold text-[#542B38] font-orbitron mb-1.5">Daily Mission Routine</h3>
              <p className="text-xs text-[#33302E] leading-relaxed">
                Flight checklist for vitals, ARED resistance workouts, hydration packets, and earn achievement badges like Health Guardian.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] shadow-warm transition">
              <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#A56F73] w-fit mb-3">
                <FileText className="w-5 h-5 text-[#A56F73]" />
              </div>
              <h3 className="text-base font-bold text-[#542B38] font-orbitron mb-1.5">Mission Health Reports</h3>
              <p className="text-xs text-[#33302E] leading-relaxed">
                Export telemetry to CSV and print mission dossiers formatted for flight surgeons and medical officers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION E: HOW IT WORKS ================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#542B38] bg-[#FAF5EE] border border-[#D5BDA4] px-3 py-1 rounded-full font-bold">
            Operation Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#33302E] font-orbitron mt-3 mb-4">
            How It Works
          </h2>
          <p className="text-[#33302E] text-sm">
            Four simple steps to maintain peak physical and psychological health in deep space.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-warm relative">
            <span className="text-3xl font-extrabold text-[#D5BDA4] font-orbitron block mb-2">01</span>
            <h3 className="text-base font-bold text-[#542B38] mb-2 font-orbitron">Enter Measurements</h3>
            <p className="text-xs text-[#33302E] leading-relaxed">
              Log daily vital signs, sleep hours, and subjective mood in seconds using calibrated flight forms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-warm relative">
            <span className="text-3xl font-extrabold text-[#D5BDA4] font-orbitron block mb-2">02</span>
            <h3 className="text-base font-bold text-[#542B38] mb-2 font-orbitron">Review Indicators</h3>
            <p className="text-xs text-[#33302E] leading-relaxed">
              Examine live metric cards with sparklines, status pills, and previous reading comparisons.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-warm relative">
            <span className="text-3xl font-extrabold text-[#D5BDA4] font-orbitron block mb-2">03</span>
            <h3 className="text-base font-bold text-[#542B38] mb-2 font-orbitron">Understand Trends</h3>
            <p className="text-xs text-[#33302E] leading-relaxed">
              Track 7-day and 30-day analytics charts to spot gradual physiological adaptations over time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-warm relative">
            <span className="text-3xl font-extrabold text-[#D5BDA4] font-orbitron block mb-2">04</span>
            <h3 className="text-base font-bold text-[#542B38] mb-2 font-orbitron">Follow Guidance</h3>
            <p className="text-xs text-[#33302E] leading-relaxed">
              Execute prescribed countermeasure workouts, hydration packs, and circadian lighting protocols.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION F: FOOTER ================= */}
      <footer className="py-12 px-6 border-t border-[#6E3B4B] bg-[#542B38] text-xs text-[#D5BDA4] font-mono shadow-warm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Orbit className="w-5 h-5 text-[#D5BDA4]" />
              <span className="text-[#F5F0E9] font-orbitron font-bold text-base">ASTRA HEALTH</span>
            </div>
            <p className="text-[#D5BDA4]/80 text-xs">
              NASA Space Apps Challenge 2026. Human Space Exploration / Healthcare Technology.
            </p>
          </div>

          <div>
            <div className="text-[#F5F0E9] font-bold mb-3 uppercase tracking-wider">Navigation</div>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-[#D5BDA4] hover:text-[#F5F0E9] transition">Mission Control</Link></li>
              <li><Link to="/body-explorer" className="text-[#D5BDA4] hover:text-[#F5F0E9] transition">3D Body Explorer</Link></li>
              <li><Link to="/health-monitoring" className="text-[#D5BDA4] hover:text-[#F5F0E9] transition">Health Monitoring</Link></li>
              <li><Link to="/hazards" className="text-[#D5BDA4] hover:text-[#F5F0E9] transition">5 Space Hazards</Link></li>
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
              One-click preset loads Commander Alex profile and Artemis mission scenario.
            </p>
            <button
              onClick={handleLaunchJudgeDemo}
              className="px-3.5 py-1.5 rounded-lg bg-[#3E1F29] border border-[#D5BDA4]/40 text-[#F5F0E9] hover:bg-[#D5BDA4] hover:text-[#542B38] font-bold transition shadow-warm-sm"
            >
              Launch Judge Demo Mode
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-[#6E3B4B] text-center text-[#D5BDA4]/70 text-[11px] leading-relaxed">
          <p className="mb-1">
            <strong className="text-[#D5BDA4]">DISCLAIMER:</strong> ASTRA HEALTH is an educational concept prototype created for the 2026 NASA Space Apps Challenge. All data shown is simulated demonstration data. This application does NOT provide real medical diagnoses or clinical prescriptions.
          </p>
          <p>© 2026 ASTRA HEALTH Team. Built with React, Three.js, Vite &amp; Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
