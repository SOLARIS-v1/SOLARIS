import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Orbit, Sparkles, LogIn, Compass, Menu, X, ChevronRight } from 'lucide-react';
import { resetDemoData } from '../../utils/localStorage';
import { sound } from '../../utils/audio';

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLaunchDemo = () => {
    sound.playSuccess();
    resetDemoData();
    setMobileMenuOpen(false);
    navigate('/dashboard');
  };

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick();
    setMobileMenuOpen(false);
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#542B38]/92 backdrop-blur-md text-[#F5F0E9] border-b border-[#6E3B4B]/80 px-4 sm:px-6 py-3 transition-all shadow-warm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={() => sound.playClick()}
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5BDA4] rounded-xl"
        >
          <div className="relative w-10 h-10 rounded-xl bg-[#3E1F29] border border-[#D5BDA4]/40 flex items-center justify-center group-hover:border-[#D5BDA4] transition shadow-warm-sm group-hover:scale-105">
            <Orbit className="w-5 h-5 text-[#D5BDA4] animate-spin" style={{ animationDuration: '16s' }} />
            <Activity className="w-3.5 h-3.5 text-[#F5F0E9] absolute" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-extrabold tracking-wider text-lg text-[#F5F0E9]">
                SOLARIS
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
        <div className="hidden md:flex items-center gap-1.5 text-xs lg:text-sm font-medium">
          <a href="#about" onClick={(e) => scrollToSection('about', e)} className="px-3 py-1.5 rounded-lg hover:bg-[#3E1F29] text-[#F5F0E9]/90 hover:text-[#F5F0E9] transition-all">About</a>
          <a href="#hazards" onClick={(e) => scrollToSection('hazards', e)} className="px-3 py-1.5 rounded-lg hover:bg-[#3E1F29] text-[#F5F0E9]/90 hover:text-[#F5F0E9] transition-all">5 Space Hazards</a>
          <a href="#features" onClick={(e) => scrollToSection('features', e)} className="px-3 py-1.5 rounded-lg hover:bg-[#3E1F29] text-[#F5F0E9]/90 hover:text-[#F5F0E9] transition-all">Capabilities</a>
          <Link to="/body-explorer" onClick={() => sound.playClick()} className="px-3 py-1.5 rounded-lg hover:bg-[#3E1F29] text-[#D5BDA4] hover:text-[#F5F0E9] transition-all flex items-center gap-1.5 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#D5BDA4]" />
            <span>3D Human Explorer</span>
          </Link>
          <Link to="/hazards" onClick={() => sound.playClick()} className="px-3 py-1.5 rounded-lg hover:bg-[#3E1F29] text-[#F5F0E9]/90 hover:text-[#F5F0E9] transition-all">NASA Research</Link>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Judge Demo Quick Access Button - Secondary Champagne with subtle glow */}
          <button
            onClick={handleLaunchDemo}
            className="relative group flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#D5BDA4] hover:bg-[#EAE0D5] text-[#542B38] text-xs font-mono font-bold tracking-wide transition-all shadow-warm-sm hover:shadow-warm hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5BDA4]"
            title="Pre-loads full Artemis Commander Alex dataset"
          >
            <span className="absolute -inset-0.5 rounded-lg bg-[#D5BDA4]/30 blur-sm group-hover:bg-[#D5BDA4]/60 transition opacity-75" />
            <span className="relative flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#542B38] group-hover:rotate-12 transition-transform" />
              <span>Judge Demo Mode</span>
            </span>
          </button>

          {/* Launch Mission Control - Primary Burgundy highlight */}
          <Link
            to="/dashboard"
            onClick={() => sound.playClick()}
            className="hidden sm:flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-lg bg-[#3E1F29] hover:bg-[#2E151E] border border-[#D5BDA4]/30 hover:border-[#D5BDA4]/60 text-[#F5F0E9] font-bold text-xs tracking-wide transition-all shadow-warm-sm hover:-translate-y-0.5"
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

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-lg bg-[#3E1F29] hover:bg-[#2E151E] border border-[#6E3B4B] text-[#D5BDA4] hover:text-[#F5F0E9] transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-3 px-2 border-t border-[#6E3B4B]/80 mt-3 space-y-2 font-mono text-xs animate-in fade-in slide-in-from-top-2">
          <a
            href="#about"
            onClick={(e) => scrollToSection('about', e)}
            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#3E1F29] text-[#D5BDA4] hover:text-[#F5F0E9] transition"
          >
            <span>Project Overview</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="#hazards"
            onClick={(e) => scrollToSection('hazards', e)}
            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#3E1F29] text-[#D5BDA4] hover:text-[#F5F0E9] transition"
          >
            <span>5 Space Hazards</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="#features"
            onClick={(e) => scrollToSection('features', e)}
            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#3E1F29] text-[#D5BDA4] hover:text-[#F5F0E9] transition"
          >
            <span>Capabilities &amp; Features</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
          <Link
            to="/body-explorer"
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#3E1F29] text-[#D5BDA4] hover:text-[#F5F0E9] transition"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D5BDA4]" />
              3D Human Explorer
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/dashboard"
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#3E1F29] text-[#F5F0E9] font-bold transition"
          >
            <span className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#D5BDA4]" />
              Launch Mission Control
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </nav>
  );
}

