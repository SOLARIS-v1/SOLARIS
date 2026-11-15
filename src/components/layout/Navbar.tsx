import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Orbit, Sparkles, LogIn, Compass, Menu, X, ChevronRight, Github } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <span className="font-orbitron font-extrabold tracking-wider text-lg text-[#FFFFFF]">
                SOLARIS
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3E1F29] border border-[#D5BDA4]/60 text-[#FFF3E3] font-bold tracking-wider">
                NASA 2026
              </span>
            </div>
            <p className="text-[11px] text-[#FFFFFF] font-mono tracking-tight font-semibold hidden sm:block drop-shadow-sm">
              Your Health. Your Mission. Our Priority.
            </p>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-1.5 text-xs lg:text-sm font-semibold">
          <a href="#about" onClick={(e) => scrollToSection('about', e)} className="px-3 py-1.5 rounded-lg hover:bg-[#3E1F29] text-[#FFFFFF] hover:text-[#FFF3E3] transition-all">About</a>
          <a href="#hazards" onClick={(e) => scrollToSection('hazards', e)} className="px-3 py-1.5 rounded-lg hover:bg-[#3E1F29] text-[#FFFFFF] hover:text-[#FFF3E3] transition-all">5 Space Hazards</a>
          <a href="#features" onClick={(e) => scrollToSection('features', e)} className="px-3 py-1.5 rounded-lg hover:bg-[#3E1F29] text-[#FFFFFF] hover:text-[#FFF3E3] transition-all">Capabilities</a>
          <Link to="/body-explorer" onClick={() => sound.playClick()} className="px-3 py-1.5 rounded-lg hover:bg-[#3E1F29] text-[#FFF3E3] hover:text-[#FFFFFF] transition-all flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#FFF3E3]" />
            <span>3D Human Explorer</span>
          </Link>
          <Link to="/hazards" onClick={() => sound.playClick()} className="px-3 py-1.5 rounded-lg hover:bg-[#3E1F29] text-[#FFFFFF] hover:text-[#FFF3E3] transition-all">NASA Research</Link>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* GitHub Repository Button */}
          <a
            href="https://github.com/SOLARIS-v1/S.O.L.A.R.I.S"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-lg bg-[#3E1F29] hover:bg-[#2E151E] border border-[#D5BDA4]/40 hover:border-[#D5BDA4] text-[#F5F0E9] hover:text-[#FFFFFF] font-bold text-xs tracking-wide transition-all shadow-warm-sm hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5BDA4]"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4 text-[#D5BDA4] shrink-0" />
            <span>GitHub</span>
          </a>

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
          <a
            href="https://github.com/SOLARIS-v1/S.O.L.A.R.I.S"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#3E1F29] text-[#D5BDA4] hover:text-[#F5F0E9] transition"
          >
            <span className="flex items-center gap-2">
              <Github className="w-3.5 h-3.5 text-[#D5BDA4]" />
              GitHub Repository
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </nav>
  );
}

