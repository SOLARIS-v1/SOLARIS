import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  HeartPulse,
  LineChart,
  Zap,
  CheckSquare,
  History,
  FileText,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Orbit
} from 'lucide-react';
import { clearAuthUser, getAstronautProfile } from '../../utils/localStorage';
import { sound } from '../../utils/audio';

interface NavItem {
  to: string;
  label: string;
  icon: any;
  highlight?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/health-monitoring', label: 'Health Monitoring', icon: HeartPulse },
  { to: '/analytics', label: 'Health Analytics', icon: LineChart },
  { to: '/insights', label: 'Smart Health Insights', icon: Zap },
  { to: '/routine', label: 'Daily Mission Routine', icon: CheckSquare },
  { to: '/history', label: 'Health History', icon: History },
  { to: '/reports', label: 'Mission Reports', icon: FileText },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profile, setProfile] = useState(getAstronautProfile());
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleUpdate = () => setProfile(getAstronautProfile());
    window.addEventListener('solaris_health_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('solaris_health_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleLogout = () => {
    sound.playClick();
    clearAuthUser();
    setShowLogoutModal(false);
    navigate('/');
  };

  return (
    <>
      <aside className={`h-screen sticky top-0 flex flex-col bg-[#542B38] text-[#F5F0E9] border-r border-[#6E3B4B] z-40 transition-all duration-300 shadow-warm ${
        collapsed ? 'w-20' : 'w-64'
      }`}>
        {/* Brand header */}
        <div className="p-4 border-b border-[#6E3B4B] flex items-center justify-between">
          <NavLink to="/" onClick={() => sound.playClick()} className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-[#3E1F29] border border-[#D5BDA4]/40 flex-shrink-0 flex items-center justify-center shadow-warm-sm">
              <Orbit className="w-5 h-5 text-[#D5BDA4]" />
            </div>
            {!collapsed && (
              <div className="transition-opacity duration-200">
                <span className="font-orbitron font-extrabold text-sm text-[#FFFFFF] tracking-wider">
                  SOLARIS
                </span>
                <span className="block text-[9px] font-mono text-[#FFF3E3] font-semibold uppercase tracking-wider">
                  Health System
                </span>
              </div>
            )}
          </NavLink>

          <button
            onClick={() => {
              sound.playClick();
              setCollapsed(!collapsed);
            }}
            className="p-1 rounded-lg text-[#D5BDA4] hover:text-[#F5F0E9] hover:bg-[#3E1F29] transition"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Astronaut Quick Info Card */}
        {!collapsed && (
          <div className="p-3 mx-3 my-2 rounded-xl bg-[#3E1F29] border border-[#6E3B4B]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D5BDA4] text-[#542B38] flex items-center justify-center font-bold text-xs shadow-warm-sm">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-[#F5F0E9] truncate">{profile.name}</div>
                <div className="text-[10px] font-mono text-[#D5BDA4] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4E7D63]" />
                  {profile.callsign} â€¢ Day {profile.missionDay}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => sound.playClick()}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group
                  ${isActive
                    ? 'bg-[#3E1F29] border border-[#D5BDA4]/40 text-[#F5F0E9] shadow-warm-sm'
                    : 'text-[#D5BDA4]/80 hover:text-[#F5F0E9] hover:bg-[#3E1F29]/60'
                  }
                  ${item.highlight && !collapsed ? 'ring-1 ring-[#D5BDA4]/30' : ''}
                `}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                  item.highlight ? 'text-[#D5BDA4]' : ''
                }`} />
                {!collapsed && (
                  <span className="truncate flex-1 tracking-wide">{item.label}</span>
                )}
                {!collapsed && item.highlight && (
                  <Sparkles className="w-3 h-3 text-[#D5BDA4]" />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Logout button at bottom */}
        <div className="p-3 border-t border-[#6E3B4B]">
          <button
            onClick={() => {
              sound.playClick();
              setShowLogoutModal(true);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-[#C9A4A7] hover:text-[#F5F0E9] hover:bg-[#3E1F29] transition group"
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className="w-4 h-4 flex-shrink-0 group-hover:-translate-x-0.5 transition-transform" />
            {!collapsed && <span className="truncate">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-[#FFFCF8] text-[#33302E] border border-[#E4DAD0] rounded-2xl p-6 max-w-sm w-full shadow-warm-lg animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 mb-3 text-[#8B3A42]">
              <LogOut className="w-6 h-6" />
              <h3 className="text-lg font-bold text-[#542B38] font-orbitron">Exit Mission Session?</h3>
            </div>
            <p className="text-xs text-[#817A76] leading-relaxed mb-6 font-sans">
              Logging out will end your current astronaut telemetry session. You can easily sign back in using demo mode.
            </p>
            <div className="flex justify-end gap-3 font-mono text-xs">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-[#F5F0E9] text-[#33302E] hover:bg-[#EAE0D5] border border-[#E4DAD0] font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-[#542B38] hover:bg-[#3E1F29] text-[#F5F0E9] font-bold transition shadow-warm"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


