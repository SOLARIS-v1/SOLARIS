import { AstronautProfile, HealthRecord, DailyRoutineTask, SpaceEnvironment, AchievementBadge } from '../types';
import { DEFAULT_ASTRONAUT_PROFILE, INITIAL_HEALTH_RECORDS, INITIAL_ACHIEVEMENT_BADGES } from '../data/demoHealthData';
import { INITIAL_DAILY_ROUTINE_TASKS } from '../data/routineData';

const KEYS = {
  AUTH_USER: 'astra_health_auth_user',
  ASTRONAUT_PROFILE: 'astra_health_profile',
  HEALTH_RECORDS: 'astra_health_records',
  ROUTINE_TASKS: 'astra_health_routine_tasks',
  ENVIRONMENT: 'astra_health_environment',
  BADGES: 'astra_health_badges',
  APP_THEME: 'astra_health_theme',
  SOUND_ENABLED: 'astra_health_sound',
  UNITS: 'astra_health_units',
};

// Custom event dispatcher to keep all pages instantly synchronized
export function notifyStateChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('astra_health_update'));
  }
}

// Safe JSON parser
function safeParse<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn(`Error reading localStorage key ${key}:`, e);
    return fallback;
  }
}

// Authentication
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isDemo: boolean;
}

export function getAuthUser(): AuthUser | null {
  return safeParse<AuthUser | null>(KEYS.AUTH_USER, null);
}

export function setAuthUser(user: AuthUser): void {
  localStorage.setItem(KEYS.AUTH_USER, JSON.stringify(user));
  notifyStateChange();
}

export function clearAuthUser(): void {
  localStorage.removeItem(KEYS.AUTH_USER);
  notifyStateChange();
}

// Astronaut Profile
export function getAstronautProfile(): AstronautProfile {
  return safeParse<AstronautProfile>(KEYS.ASTRONAUT_PROFILE, DEFAULT_ASTRONAUT_PROFILE);
}

export function setAstronautProfile(profile: AstronautProfile): void {
  localStorage.setItem(KEYS.ASTRONAUT_PROFILE, JSON.stringify(profile));
  notifyStateChange();
}

// Health Records
export function getHealthRecords(): HealthRecord[] {
  return safeParse<HealthRecord[]>(KEYS.HEALTH_RECORDS, INITIAL_HEALTH_RECORDS);
}

export function saveHealthRecords(records: HealthRecord[]): void {
  localStorage.setItem(KEYS.HEALTH_RECORDS, JSON.stringify(records));
  notifyStateChange();
}

export function addHealthRecord(newRecord: Omit<HealthRecord, 'id' | 'timestamp'>): HealthRecord {
  const records = getHealthRecords();
  const id = `rec-user-${Date.now()}`;
  const timestamp = new Date().toISOString();
  
  const record: HealthRecord = {
    ...newRecord,
    id,
    timestamp,
    isUserEntered: true,
  };

  // Add to beginning of array
  const updated = [record, ...records];
  saveHealthRecords(updated);
  return record;
}

export function deleteHealthRecord(id: string): void {
  const records = getHealthRecords();
  const updated = records.filter(r => r.id !== id);
  saveHealthRecords(updated);
}

// Daily Routine Tasks
export function getRoutineTasks(): DailyRoutineTask[] {
  return safeParse<DailyRoutineTask[]>(KEYS.ROUTINE_TASKS, INITIAL_DAILY_ROUTINE_TASKS);
}

export function saveRoutineTasks(tasks: DailyRoutineTask[]): void {
  localStorage.setItem(KEYS.ROUTINE_TASKS, JSON.stringify(tasks));
  notifyStateChange();
}

export function toggleRoutineTask(taskId: string): DailyRoutineTask[] {
  const tasks = getRoutineTasks();
  const updated = tasks.map(t => {
    if (t.id === taskId) {
      const completed = !t.completed;
      return {
        ...t,
        completed,
        completedAt: completed ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined
      };
    }
    return t;
  });
  saveRoutineTasks(updated);
  return updated;
}

// Environment
export function getSelectedEnvironment(): SpaceEnvironment {
  return safeParse<SpaceEnvironment>(KEYS.ENVIRONMENT, 'Spacecraft');
}

export function setSelectedEnvironment(env: SpaceEnvironment): void {
  localStorage.setItem(KEYS.ENVIRONMENT, JSON.stringify(env));
  
  // also update profile
  const profile = getAstronautProfile();
  profile.environment = env;
  setAstronautProfile(profile);
}

// Badges
export function getAchievementBadges(): AchievementBadge[] {
  return safeParse<AchievementBadge[]>(KEYS.BADGES, INITIAL_ACHIEVEMENT_BADGES);
}

export function unlockBadge(badgeId: string): void {
  const badges = getAchievementBadges();
  const updated = badges.map(b => {
    if (b.id === badgeId && !b.unlocked) {
      return { ...b, unlocked: true, unlockedDate: new Date().toISOString().split('T')[0] };
    }
    return b;
  });
  localStorage.setItem(KEYS.BADGES, JSON.stringify(updated));
  notifyStateChange();
}

// Audio preference
export function getSoundEnabled(): boolean {
  return safeParse<boolean>(KEYS.SOUND_ENABLED, true);
}

export function setSoundEnabled(val: boolean): void {
  localStorage.setItem(KEYS.SOUND_ENABLED, JSON.stringify(val));
}

// Units (metric / imperial)
export function getUnitsPreference(): 'metric' | 'imperial' {
  return safeParse<'metric' | 'imperial'>(KEYS.UNITS, 'metric');
}

export function setUnitsPreference(val: 'metric' | 'imperial'): void {
  localStorage.setItem(KEYS.UNITS, JSON.stringify(val));
}

// Complete Judge Demo Reset
export function resetDemoData(): void {
  localStorage.setItem(KEYS.ASTRONAUT_PROFILE, JSON.stringify(DEFAULT_ASTRONAUT_PROFILE));
  localStorage.setItem(KEYS.HEALTH_RECORDS, JSON.stringify(INITIAL_HEALTH_RECORDS));
  localStorage.setItem(KEYS.ROUTINE_TASKS, JSON.stringify(INITIAL_DAILY_ROUTINE_TASKS));
  localStorage.setItem(KEYS.ENVIRONMENT, JSON.stringify('Spacecraft'));
  localStorage.setItem(KEYS.BADGES, JSON.stringify(INITIAL_ACHIEVEMENT_BADGES));
  localStorage.setItem(KEYS.SOUND_ENABLED, JSON.stringify(true));
  localStorage.setItem(KEYS.UNITS, JSON.stringify('metric'));
  
  // set active demo login
  setAuthUser({
    id: DEFAULT_ASTRONAUT_PROFILE.id,
    name: DEFAULT_ASTRONAUT_PROFILE.name,
    email: DEFAULT_ASTRONAUT_PROFILE.email,
    role: DEFAULT_ASTRONAUT_PROFILE.role,
    isDemo: true
  });
  notifyStateChange();
}
