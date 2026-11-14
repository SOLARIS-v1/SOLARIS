import React, { useState } from 'react';
import {
  User,
  Shield,
  Award,
  Clock,
  Orbit,
  Mail,
  Edit2,
  Save,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { getAstronautProfile, setAstronautProfile, getSelectedEnvironment } from '../utils/localStorage';
import { AstronautProfile } from '../types';
import { sound } from '../utils/audio';

export default function ProfilePage() {
  const [profile, setProfile] = useState<AstronautProfile>(getAstronautProfile());
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [callsign, setCallsign] = useState(profile.callsign);
  const [role, setRole] = useState(profile.role);
  const [savedBanner, setSavedBanner] = useState(false);

  const environment = getSelectedEnvironment();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    const updated = {
      ...profile,
      name,
      callsign,
      role
    };
    setAstronautProfile(updated);
    setProfile(updated);
    setIsEditing(false);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  return (
    <div className="space-y-8 select-none max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="pb-6 border-b border-[#E4DAD0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <User className="w-6 h-6 text-[#542B38]" />
            <h1 className="text-2xl font-extrabold text-[#33302E] font-orbitron tracking-wide">
              Astronaut Flight Profile
            </h1>
          </div>
          <p className="text-xs font-mono text-[#817A76]">
            Crew member medical credentials, mission role, and telemetry assignments.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => {
              sound.playClick();
              setIsEditing(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFFCF8] hover:bg-[#F5F0E9] border border-[#E4DAD0] hover:border-[#D5BDA4] text-[#33302E] hover:text-[#542B38] font-mono text-xs transition shadow-sm"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {savedBanner && (
        <div className="p-3 rounded-xl bg-[#EBF3EE] border border-[#C6DCCF] text-[#4E7D63] text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#4E7D63]" />
          <span>Profile changes updated in onboard memory!</span>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="p-8 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-[#E4DAD0]">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-[#542B38] border-2 border-[#A56F73] flex items-center justify-center font-orbitron font-extrabold text-2xl text-[#F5F0E9] shadow-lg">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-[#4E7D63] text-white text-[10px] font-mono font-bold">
              ACTIVE
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-xl sm:text-2xl font-extrabold text-[#33302E] font-orbitron">
                {profile.name}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#FAF5EE] border border-[#D5BDA4] text-[#542B38] font-bold">
                {profile.callsign}
              </span>
            </div>
            <div className="text-xs font-mono text-[#817A76] mb-3">{profile.role}</div>
            <div className="text-xs font-mono text-[#817A76] flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <span>Mission: <strong className="text-[#33302E]">{profile.missionName}</strong></span>
              <span>•</span>
              <span>Day: <strong className="text-[#542B38]">{profile.missionDay}</strong></span>
              <span>•</span>
              <span>Habitat: <strong className="text-[#33302E]">{environment}</strong></span>
            </div>
          </div>
        </div>

        {/* Profile Details or Edit Form */}
        {isEditing ? (
          <form onSubmit={handleSave} className="mt-6 space-y-4 font-mono text-xs">
            {[
              { label: 'Astronaut Full Name', value: name, setter: setName },
              { label: 'Mission Callsign', value: callsign, setter: setCallsign },
              { label: 'Mission Role & Assignment', value: role, setter: setRole },
            ].map((field, i) => (
              <div key={i}>
                <label className="block text-[#33302E] font-semibold mb-1">{field.label}</label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  className="w-full bg-[#F5F0E9] border border-[#E4DAD0] focus:border-[#542B38] rounded-xl px-3 py-2 text-[#33302E] placeholder-[#817A76] outline-none"
                  required
                />
              </div>
            ))}

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-[#F5F0E9] text-[#33302E] hover:bg-[#EAE4DC] border border-[#E4DAD0] transition font-mono text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#542B38] hover:bg-[#6B3547] text-[#F5F0E9] font-bold transition shadow-md font-mono text-xs"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 font-mono text-xs">
            {[
              { label: 'Flight Hours Logged', value: `${profile.flightHours} Hours`, valueClass: 'text-[#33302E]' },
              { label: 'Blood Type / Rh', value: profile.bloodType, valueClass: 'text-[#33302E]' },
              { label: 'Age', value: `${profile.age} Years Old`, valueClass: 'text-[#33302E]' },
              { label: 'Onboard Email', value: profile.email, valueClass: 'text-[#542B38] truncate' },
              { label: 'Medical Clearance', value: 'Class 1 Long-Duration Certified', valueClass: 'text-[#4E7D63]' },
              { label: 'Telemetry Node ID', value: 'NODE-ARTEMIS-001', valueClass: 'text-[#817A76]' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#F5F0E9] border border-[#E4DAD0]">
                <span className="text-[10px] uppercase text-[#817A76] block">{item.label}</span>
                <span className={`text-sm font-bold mt-1 block ${item.valueClass}`}>{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
