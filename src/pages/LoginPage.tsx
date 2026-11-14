import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Orbit, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { setAuthUser, resetDemoData } from '../utils/localStorage';
import { sound } from '../utils/audio';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('commander.alex@artemis.nasa.gov');
  const [password, setPassword] = useState('demo12345');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide mission credentials.');
      sound.playWarning();
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      sound.playWarning();
      return;
    }

    sound.playSuccess();
    setAuthUser({
      id: 'astro-alex-001',
      name: 'Alex Vance',
      email: email,
      role: 'Mission Commander',
      isDemo: true
    });

    navigate('/dashboard');
  };

  const handleOneClickDemo = () => {
    sound.playSuccess();
    resetDemoData();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F0E9] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
      {/* Background ambient */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D5BDA4]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A56F73]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md bg-[#FFFCF8] border border-[#E4DAD0] rounded-2xl shadow-xl p-8">
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link to="/" onClick={() => sound.playClick()} className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#542B38] flex items-center justify-center shadow-md">
              <Orbit className="w-5 h-5 text-[#F5F0E9]" />
            </div>
            <span className="font-orbitron font-extrabold text-xl text-[#542B38] tracking-wider">
              ASTRA<span className="text-[#A56F73]">HEALTH</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-[#33302E] tracking-wide">Astronaut Mission Access</h2>
          <p className="text-xs font-mono text-[#817A76] mt-1">
            Sign in to access your onboard physiological telemetry dashboard.
          </p>
        </div>

        {/* Demo Credentials Hint Box */}
        <div className="mb-6 p-3.5 rounded-xl bg-[#F5F0E9] border border-[#E4DAD0] text-xs font-mono">
          <div className="flex items-center justify-between text-[#542B38] font-semibold mb-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#542B38]" />
              Preloaded Demo Credentials
            </span>
            <span className="text-[10px] bg-[#542B38] px-2 py-0.5 rounded text-[#F5F0E9] font-bold">JUDGE READY</span>
          </div>
          <div className="text-[#817A76] space-y-0.5 text-[11px]">
            <div>Email: <span className="text-[#33302E] font-semibold">commander.alex@artemis.nasa.gov</span></div>
            <div>Password: <span className="text-[#33302E] font-semibold">demo12345</span></div>
          </div>
          <button
            type="button"
            onClick={handleOneClickDemo}
            className="w-full mt-2.5 py-1.5 px-3 rounded-lg bg-[#542B38] hover:bg-[#6B3547] border border-[#A56F73]/30 text-[#F5F0E9] text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D5BDA4]" />
            <span>1-Click Launch Judge Demo</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
          {error && (
            <div className="p-3 rounded-lg bg-[#F9EBEF] border border-[#E8C4CB] text-[#8B3A42] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-[#33302E] font-semibold mb-1">Mission Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#817A76] absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F5F0E9] border border-[#E4DAD0] focus:border-[#542B38] rounded-xl pl-9 pr-3 py-2.5 text-[#33302E] placeholder-[#817A76] outline-none transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#33302E] font-semibold mb-1">Access Passcode</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#817A76] absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F5F0E9] border border-[#E4DAD0] focus:border-[#542B38] rounded-xl pl-9 pr-10 py-2.5 text-[#33302E] placeholder-[#817A76] outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#817A76] hover:text-[#542B38] transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <label className="flex items-center gap-2 cursor-pointer text-[#33302E]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#E4DAD0] text-[#542B38] focus:ring-0 accent-[#542B38]"
              />
              <span>Remember mission token</span>
            </label>
            <button
              type="button"
              onClick={() => setShowForgotNotice(true)}
              className="text-[#542B38] hover:underline font-semibold"
            >
              Forgot password?
            </button>
          </div>

          {showForgotNotice && (
            <div className="p-2.5 rounded-lg bg-[#F5F0E9] border border-[#E4DAD0] text-[11px] text-[#33302E]">
              In this frontend demo prototype, password recovery is simulated. Use the preloaded password: <strong>demo12345</strong>.
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#542B38] hover:bg-[#6B3547] text-[#F5F0E9] font-bold text-xs tracking-wider transition shadow-md flex items-center justify-center gap-2"
          >
            <span>Sign In to Mission Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center text-xs text-[#817A76]">
          <span>Need a new crew profile? </span>
          <Link to="/signup" onClick={() => sound.playClick()} className="text-[#542B38] hover:underline font-semibold">
            Create Account
          </Link>
        </div>

        {/* Security Disclaimer */}
        <div className="mt-6 pt-4 border-t border-[#E4DAD0] text-[10px] text-center text-[#817A76] font-mono">
          Prototype Simulation • Uses localStorage • Not a production authentication server
        </div>
      </div>
    </div>
  );
}
