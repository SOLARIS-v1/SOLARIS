import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Orbit, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { setAuthUser, setAstronautProfile, getAstronautProfile } from '../utils/localStorage';
import { sound } from '../utils/audio';

export default function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [callsign, setCallsign] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all mission onboarding fields.');
      sound.playWarning();
      return;
    }

    if (password !== confirmPassword) {
      setError('Passcodes do not match.');
      sound.playWarning();
      return;
    }

    if (password.length < 6) {
      setError('Passcode must be at least 6 characters.');
      sound.playWarning();
      return;
    }

    sound.playSuccess();
    setSuccess(true);

    const currentProfile = getAstronautProfile();
    const updatedProfile = {
      ...currentProfile,
      name: fullName,
      callsign: callsign || 'Astra-New',
      email: email,
    };
    setAstronautProfile(updatedProfile);

    setAuthUser({
      id: `astro-${Date.now()}`,
      name: fullName,
      email: email,
      role: 'Flight Crew Member',
      isDemo: true
    });

    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E9] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D5BDA4]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A56F73]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-[#FFFCF8] border border-[#E4DAD0] rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <Link to="/" onClick={() => sound.playClick()} className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#542B38] flex items-center justify-center shadow-md">
              <Orbit className="w-5 h-5 text-[#F5F0E9]" />
            </div>
            <span className="font-orbitron font-extrabold text-xl text-[#542B38] tracking-wider">
              ASTRA<span className="text-[#A56F73]">HEALTH</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-[#33302E] tracking-wide">Crew Member Onboarding</h2>
          <p className="text-xs font-mono text-[#817A76] mt-1">
            Register your profile to begin logging spaceflight health measurements.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-[#F9EBEF] border border-[#E8C4CB] text-[#8B3A42] text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-[#EBF3EE] border border-[#C6DCCF] text-[#4E7D63] text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Account initialized! Preparing mission control...</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-3.5 text-xs font-mono">
          <div>
            <label className="block text-[#33302E] font-semibold mb-1">Full Astronaut Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#817A76] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="e.g. Commander Sarah Chen"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#F5F0E9] border border-[#E4DAD0] focus:border-[#542B38] rounded-xl pl-9 pr-3 py-2 text-[#33302E] placeholder-[#817A76] outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#33302E] font-semibold mb-1">Mission Callsign (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Phoenix-1"
              value={callsign}
              onChange={(e) => setCallsign(e.target.value)}
              className="w-full bg-[#F5F0E9] border border-[#E4DAD0] focus:border-[#542B38] rounded-xl px-3 py-2 text-[#33302E] placeholder-[#817A76] outline-none"
            />
          </div>

          <div>
            <label className="block text-[#33302E] font-semibold mb-1">Mission Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#817A76] absolute left-3 top-3" />
              <input
                type="email"
                placeholder="astronaut@nasa.gov"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F5F0E9] border border-[#E4DAD0] focus:border-[#542B38] rounded-xl pl-9 pr-3 py-2 text-[#33302E] placeholder-[#817A76] outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#33302E] font-semibold mb-1">Passcode</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#817A76] absolute left-3 top-3" />
                <input
                  type="password"
                  placeholder="Min 6 chars"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F5F0E9] border border-[#E4DAD0] focus:border-[#542B38] rounded-xl pl-9 pr-3 py-2 text-[#33302E] placeholder-[#817A76] outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[#33302E] font-semibold mb-1">Confirm Passcode</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#817A76] absolute left-3 top-3" />
                <input
                  type="password"
                  placeholder="Confirm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#F5F0E9] border border-[#E4DAD0] focus:border-[#542B38] rounded-xl pl-9 pr-3 py-2 text-[#33302E] placeholder-[#817A76] outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2.5 rounded-xl bg-[#542B38] hover:bg-[#6B3547] text-[#F5F0E9] font-bold text-xs tracking-wider transition shadow-md flex items-center justify-center gap-2"
          >
            <span>Initialize Crew Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-[#817A76]">
          <span>Already registered? </span>
          <Link to="/login" onClick={() => sound.playClick()} className="text-[#542B38] hover:underline font-semibold">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
