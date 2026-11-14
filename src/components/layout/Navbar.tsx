import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Orbit, Sparkles, LogIn, Compass } from 'lucide-react';
import { resetDemoData } from '../../utils/localStorage';
import { sound } from '../../utils/audio';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLaunchDemo = () => {
    sound.playSuccess();
    resetDemoData();
    navigate('/dashboard');
  };

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick();
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#542B38] text-[#F5F0E9] border-b border-[#6E3B4B] px-6 py-3.5 transition-all shadow-warm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={() => sound.playClick()}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-[#3E1F29] border border-[#D5BDA4]/40 flex items-center justify-center group-hover:border-[#D5BDA4] transition shadow-warm-sm">
            <Orbit className="w-5 h-5 text-[#D5BDA4] animate-spin" style={{ animationDuration: '16s' }} />
            <Activity className="w-3.5 h-3.5 text-[#F5F0E9] absolute" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-extrabold tracking-wider text-lg text-[#F5F0E9]">
                ASTRA<span className="text-[#D5BDA4]">HEALTH</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#3E1F29] border border-[#6E3B4B] text-[#D5BDA4] font-semibold">
                NASA 2026
              </span>
            </div>
            <p className="text-[10px] text-[#D5BDA4]/80 font-mono tracking-tight hidden sm:block">
              Your Health. Your Mission. Our Priority.
            </p>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#D5BDA4]">
          <a href="#about" onClick={(e) => scrollToSection('about', e)} className="hover:text-[#F5F0E9] transition">About</a>
          <a href="#hazards" onClick={(e) => scrollToSection('hazards', e)} className="hover:text-[#F5F0E9] transition">5 Space Hazards</a>
          <a href="#features" onClick={(e) => scrollToSection('features', e)} className="hover:text-[#F5F0E9] transition">Capabilities</a>
          <Link to="/body-explorer" onClick={() => sound.playClick()} className="hover:text-[#F5F0E9] transition flex items-center gap-1.5 text-[#D5BDA4]">
            <Sparkles className="w-4 h-4 text-[#D5BDA4]" />
            3D Human Explorer
          </Link>
          <Link to="/hazards" onClick={() => sound.playClick()} className="hover:text-[#F5F0E9] transition">NASA Research</Link>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          {/* Judge Demo Quick Access Button - Secondary Champagne */}
          <button
            onClick={handleLaunchDemo}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#D5BDA4] hover:bg-[#C9AE94] text-[#542B38] text-xs font-mono font-bold tracking-wide transition shadow-warm-sm"
            title="Pre-loads full Artemis Commander Alex dataset"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#542B38]" />
            <span>Judge Demo Mode</span>
          </button>

          {/* Launch Mission Control - Primary Burgundy highlight */}
          <Link
            to="/dashboard"
            onClick={() => sound.playClick()}
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#3E1F29] hover:bg-[#2E151E] border border-[#D5BDA4]/30 text-[#F5F0E9] font-bold text-xs tracking-wide transition shadow-warm-sm"
          >
            <Compass className="w-4 h-4 text-[#D5BDA4]" />
            <span>Mission Control</span>
          </Link>

          {/* Login Link */}
          <Link
            to="/login"
            onClick={() => sound.playClick()}
            className="p-2 rounded-lg bg-[#3E1F29] hover:bg-[#2E151E] border border-[#6E3B4B] text-[#D5BDA4] hover:text-[#F5F0E9] transition"
            title="Astronaut Sign In"
          >
            <LogIn className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
