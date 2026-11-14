import { AstronautProfile, HealthRecord, EnvironmentTelemetry, AchievementBadge, MetricSummary } from '../types';

export const DEFAULT_ASTRONAUT_PROFILE: AstronautProfile = {
  id: 'astro-alex-001',
  name: 'Alex Vance',
  callsign: 'Astra-1',
  role: 'Mission Commander & Flight Engineer',
  missionName: 'Artemis VII Lunar-Mars Forward Transit',
  missionDay: 124,
  environment: 'Spacecraft',
  email: 'commander.alex@artemis.nasa.gov',
  age: 38,
  bloodType: 'O Rh-Positive',
  flightHours: 1840,
  avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=300',
  status: 'Nominal'
};

export const INITIAL_HEALTH_RECORDS: HealthRecord[] = [
  {
    id: 'rec-124-02',
    timestamp: '2026-11-14T08:00:00Z',
    date: '2026-11-14',
    time: '08:00',
    heartRate: 72,
    bloodPressureSystolic: 118,
    bloodPressureDiastolic: 76,
    bloodSugar: 94,
    bodyTemperature: 36.7,
    sleepDuration: 7.4,
    mood: 'Focused',
    notes: 'Post-wake cycle. Resting vitals nominal. Zero vestibular discomfort reported.',
    status: 'nominal',
    isUserEntered: false
  },
  {
    id: 'rec-124-01',
    timestamp: '2026-11-13T20:30:00Z',
    date: '2026-11-13',
    time: '20:30',
    heartRate: 69,
    bloodPressureSystolic: 116,
    bloodPressureDiastolic: 75,
    bloodSugar: 102,
    bodyTemperature: 36.8,
    sleepDuration: 6.8,
    mood: 'Calm',
    notes: 'Evening wind-down vitals following 2.5 hr ARED resistance workout.',
    status: 'nominal',
    isUserEntered: false
  },
  {
    id: 'rec-123-02',
    timestamp: '2026-11-13T08:15:00Z',
    date: '2026-11-13',
    time: '08:15',
    heartRate: 74,
    bloodPressureSystolic: 121,
    bloodPressureDiastolic: 78,
    bloodSugar: 98,
    bodyTemperature: 36.9,
    sleepDuration: 7.1,
    mood: 'Energetic',
    notes: 'Morning vitals check. Electrolyte hydration pack #1 consumed.',
    status: 'nominal',
    isUserEntered: false
  },
  {
    id: 'rec-122-02',
    timestamp: '2026-11-12T08:00:00Z',
    date: '2026-11-12',
    time: '08:00',
    heartRate: 70,
    bloodPressureSystolic: 117,
    bloodPressureDiastolic: 74,
    bloodSugar: 92,
    bodyTemperature: 36.6,
    sleepDuration: 7.6,
    mood: 'Calm',
    notes: 'Routine baseline telemetry. Circadian lighting phase synchronized.',
    status: 'nominal',
    isUserEntered: false
  },
  {
    id: 'rec-121-02',
    timestamp: '2026-11-11T08:30:00Z',
    date: '2026-11-11',
    time: '08:30',
    heartRate: 82,
    bloodPressureSystolic: 126,
    bloodPressureDiastolic: 82,
    bloodSugar: 105,
    bodyTemperature: 37.1,
    sleepDuration: 5.8,
    mood: 'Fatigued',
    notes: 'Shortened sleep window due to orbital docking navigation maneuver.',
    status: 'caution',
    isUserEntered: false
  },
  {
    id: 'rec-120-02',
    timestamp: '2026-11-10T08:00:00Z',
    date: '2026-11-10',
    time: '08:00',
    heartRate: 71,
    bloodPressureSystolic: 119,
    bloodPressureDiastolic: 76,
    bloodSugar: 95,
    bodyTemperature: 36.7,
    sleepDuration: 7.2,
    mood: 'Focused',
    notes: 'Morning telemetry nominal. Pre-EVA physical readiness check cleared.',
    status: 'nominal',
    isUserEntered: false
  },
  {
    id: 'rec-119-02',
    timestamp: '2026-11-09T08:00:00Z',
    date: '2026-11-09',
    time: '08:00',
    heartRate: 73,
    bloodPressureSystolic: 118,
    bloodPressureDiastolic: 75,
    bloodSugar: 96,
    bodyTemperature: 36.8,
    sleepDuration: 7.5,
    mood: 'Focused',
    notes: 'Post-sleep telemetry sync.',
    status: 'nominal',
    isUserEntered: false
  },
  {
    id: 'rec-118-02',
    timestamp: '2026-11-08T08:00:00Z',
    date: '2026-11-08',
    time: '08:00',
    heartRate: 70,
    bloodPressureSystolic: 115,
    bloodPressureDiastolic: 73,
    bloodSugar: 91,
    bodyTemperature: 36.6,
    sleepDuration: 7.9,
    mood: 'Calm',
    notes: 'Optimal rest metrics. Low cabin ambient noise level.',
    status: 'nominal',
    isUserEntered: false
  },
  {
    id: 'rec-117-02',
    timestamp: '2026-11-07T08:00:00Z',
    date: '2026-11-07',
    time: '08:00',
    heartRate: 76,
    bloodPressureSystolic: 122,
    bloodPressureDiastolic: 79,
    bloodSugar: 101,
    bodyTemperature: 36.9,
    sleepDuration: 6.9,
    mood: 'Focused',
    notes: 'Normal physiological status.',
    status: 'nominal',
    isUserEntered: false
  },
  {
    id: 'rec-116-02',
    timestamp: '2026-11-06T08:00:00Z',
    date: '2026-11-06',
    time: '08:00',
    heartRate: 72,
    bloodPressureSystolic: 117,
    bloodPressureDiastolic: 75,
    bloodSugar: 94,
    bodyTemperature: 36.7,
    sleepDuration: 7.3,
    mood: 'Calm',
    notes: 'Baseline stable.',
    status: 'nominal',
    isUserEntered: false
  }
];

export const ENVIRONMENT_TELEMETRY_MAP: Record<string, EnvironmentTelemetry> = {
  'Spacecraft': {
    environment: 'Spacecraft',
    gravityG: 0.0001,
    cabinPressureKpa: 101.3,
    oxygenPercent: 21.0,
    co2Percent: 0.28,
    temperatureC: 22.4,
    radiationRateDailyMicroSv: 420,
    shieldingIntegrity: 98.4
  },
  'Space Station': {
    environment: 'Space Station',
    gravityG: 0.0002,
    cabinPressureKpa: 101.3,
    oxygenPercent: 21.2,
    co2Percent: 0.32,
    temperatureC: 23.1,
    radiationRateDailyMicroSv: 380,
    shieldingIntegrity: 99.1
  },
  'Lunar Base': {
    environment: 'Lunar Base',
    gravityG: 0.166,
    cabinPressureKpa: 70.3,
    oxygenPercent: 28.0,
    co2Percent: 0.25,
    temperatureC: 21.8,
    radiationRateDailyMicroSv: 680,
    shieldingIntegrity: 94.2
  },
  'Mars Base': {
    environment: 'Mars Base',
    gravityG: 0.38,
    cabinPressureKpa: 56.5,
    oxygenPercent: 32.0,
    co2Percent: 0.22,
    temperatureC: 20.5,
    radiationRateDailyMicroSv: 540,
    shieldingIntegrity: 96.8
  },
  'Rover': {
    environment: 'Rover',
    gravityG: 0.166,
    cabinPressureKpa: 65.0,
    oxygenPercent: 30.0,
    co2Percent: 0.35,
    temperatureC: 19.8,
    radiationRateDailyMicroSv: 820,
    shieldingIntegrity: 91.5
  }
};

export const INITIAL_ACHIEVEMENT_BADGES: AchievementBadge[] = [
  {
    id: 'badge-01',
    name: 'Health Guardian',
    description: 'Maintained consecutive vital signs logging for 7 flight days.',
    category: 'Vitals Compliance',
    icon: 'ShieldCheck',
    unlocked: true,
    unlockedDate: '2026-11-12',
    rarity: 'Rare'
  },
  {
    id: 'badge-02',
    name: 'Sleep Champion',
    description: 'Logged 7.0+ hours of restorative sleep across 5 consecutive orbital cycles.',
    category: 'Circadian Health',
    icon: 'Moon',
    unlocked: true,
    unlockedDate: '2026-11-10',
    rarity: 'Epic'
  },
  {
    id: 'badge-03',
    name: 'Mission Ready',
    description: 'Completed 100% of scheduled countermeasure workouts (ARED + T2).',
    category: 'Physical Resilience',
    icon: 'Zap',
    unlocked: true,
    unlockedDate: '2026-11-14',
    rarity: 'Legendary'
  },
  {
    id: 'badge-04',
    name: 'Consistency Star',
    description: 'Completed all morning and evening daily flight checklist tasks.',
    category: 'Operational Discipline',
    icon: 'Star',
    unlocked: false,
    rarity: 'Rare'
  },
  {
    id: 'badge-05',
    name: 'Hydration Sentinel',
    description: 'Met or exceeded water and electrolyte intake targets for 10 days.',
    category: 'Nutrition',
    icon: 'Droplets',
    unlocked: true,
    unlockedDate: '2026-11-08',
    rarity: 'Common'
  },
  {
    id: 'badge-06',
    name: 'Cognitive Ace',
    description: 'Completed scheduled Spaceflight Cognitive Assessment Battery with zero latency deficit.',
    category: 'Behavioral Health',
    icon: 'Brain',
    unlocked: false,
    rarity: 'Epic'
  }
];

export const HOURLY_TODAY_TRENDS = [
  { time: '00:00', heartRate: 58, bpSystolic: 110, bpDiastolic: 70, bloodSugar: 88, temp: 36.4 },
  { time: '02:00', heartRate: 55, bpSystolic: 108, bpDiastolic: 68, bloodSugar: 86, temp: 36.3 },
  { time: '04:00', heartRate: 54, bpSystolic: 107, bpDiastolic: 67, bloodSugar: 84, temp: 36.2 },
  { time: '06:00', heartRate: 62, bpSystolic: 112, bpDiastolic: 72, bloodSugar: 90, temp: 36.5 },
  { time: '08:00', heartRate: 72, bpSystolic: 118, bpDiastolic: 76, bloodSugar: 94, temp: 36.7 },
  { time: '10:00', heartRate: 78, bpSystolic: 122, bpDiastolic: 78, bloodSugar: 108, temp: 36.8 },
  { time: '12:00', heartRate: 75, bpSystolic: 120, bpDiastolic: 77, bloodSugar: 112, temp: 36.8 },
  { time: '14:00', heartRate: 88, bpSystolic: 128, bpDiastolic: 80, bloodSugar: 104, temp: 37.0 },
  { time: '16:00', heartRate: 115, bpSystolic: 138, bpDiastolic: 84, bloodSugar: 98, temp: 37.3 }, // Post-exercise
  { time: '18:00', heartRate: 76, bpSystolic: 121, bpDiastolic: 78, bloodSugar: 99, temp: 36.9 },
  { time: '20:00', heartRate: 70, bpSystolic: 116, bpDiastolic: 75, bloodSugar: 101, temp: 36.8 },
  { time: '22:00', heartRate: 64, bpSystolic: 113, bpDiastolic: 72, bloodSugar: 92, temp: 36.5 }
];

export const SLEEP_STAGES_HISTORY = [
  { day: 'Day 118', total: 7.9, deep: 1.8, rem: 1.9, light: 3.8, awake: 0.4 },
  { day: 'Day 119', total: 7.5, deep: 1.6, rem: 1.8, light: 3.7, awake: 0.4 },
  { day: 'Day 120', total: 7.2, deep: 1.5, rem: 1.7, light: 3.6, awake: 0.4 },
  { day: 'Day 121', total: 5.8, deep: 1.1, rem: 1.2, light: 3.0, awake: 0.5 },
  { day: 'Day 122', total: 7.6, deep: 1.7, rem: 1.8, light: 3.7, awake: 0.4 },
  { day: 'Day 123', total: 7.1, deep: 1.5, rem: 1.6, light: 3.6, awake: 0.4 },
  { day: 'Day 124', total: 7.4, deep: 1.6, rem: 1.8, light: 3.6, awake: 0.4 }
];

export const MOOD_AND_COGNITIVE_HISTORY = [
  { day: 'Day 118', moodScore: 90, stressLevel: 15, mood: 'Calm', alertness: 92 },
  { day: 'Day 119', moodScore: 88, stressLevel: 18, mood: 'Focused', alertness: 89 },
  { day: 'Day 120', moodScore: 85, stressLevel: 22, mood: 'Focused', alertness: 87 },
  { day: 'Day 121', moodScore: 68, stressLevel: 45, mood: 'Fatigued', alertness: 72 },
  { day: 'Day 122', moodScore: 86, stressLevel: 20, mood: 'Calm', alertness: 88 },
  { day: 'Day 123', moodScore: 92, stressLevel: 16, mood: 'Energetic', alertness: 94 },
  { day: 'Day 124', moodScore: 88, stressLevel: 18, mood: 'Focused', alertness: 90 }
];

export const PHYSIOLOGICAL_RADAR_DATA = [
  { subject: 'Cardiovascular', current: 94, benchmark: 90, fullMark: 100 },
  { subject: 'Musculoskeletal', current: 88, benchmark: 85, fullMark: 100 },
  { subject: 'Cognitive Focus', current: 91, benchmark: 88, fullMark: 100 },
  { subject: 'Circadian Rhythm', current: 89, benchmark: 85, fullMark: 100 },
  { subject: 'Metabolic Balance', current: 95, benchmark: 90, fullMark: 100 },
  { subject: 'Psychological State', current: 87, benchmark: 85, fullMark: 100 },
];
