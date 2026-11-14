export type SpaceEnvironment = 'Spacecraft' | 'Space Station' | 'Lunar Base' | 'Mars Base' | 'Rover';

export type VitalStatus = 'nominal' | 'caution' | 'alert';

export type MoodType = 'Calm' | 'Focused' | 'Energetic' | 'Fatigued' | 'Stressed' | 'Anxious';

export interface AstronautProfile {
  id: string;
  name: string;
  callsign: string;
  role: string;
  missionName: string;
  missionDay: number;
  environment: SpaceEnvironment;
  email: string;
  age: number;
  bloodType: string;
  flightHours: number;
  avatarUrl: string;
  status: 'Nominal' | 'Monitoring' | 'Alert';
}

export interface HealthRecord {
  id: string;
  timestamp: string; // ISO string
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  heartRate: number; // BPM
  bloodPressureSystolic: number; // mmHg
  bloodPressureDiastolic: number; // mmHg
  bloodSugar: number; // mg/dL
  bodyTemperature: number; // °C
  sleepDuration: number; // Hours
  mood: MoodType;
  notes?: string;
  status: VitalStatus;
  isUserEntered?: boolean;
}

export interface MetricSummary {
  name: string;
  current: string | number;
  previous: string | number;
  unit: string;
  delta: string;
  trend: 'up' | 'down' | 'stable';
  status: VitalStatus;
  statusText: string;
  description: string;
  normalRange: string;
  sparkline: number[];
}

export interface SpaceHazard {
  id: string;
  hazardNumber: number;
  title: string;
  tagline: string;
  primaryRisk: string;
  description: string;
  detailedEffects: string[];
  affectedBodySystems: string[];
  monitoredIndicators: string[];
  countermeasures: string[];
  nasaReference: string;
  severityLevel: 'High' | 'Critical' | 'Severe';
  iconName: string;
  color: string;
}

export interface HealthInsight {
  id: string;
  severity: VitalStatus;
  title: string;
  metric: string;
  changeDescription: string;
  flightImplication: string;
  actionProtocol: string[];
  timestamp: string;
  hazardCorrelation?: string;
}

export interface DailyRoutineTask {
  id: string;
  category: 'Vitals' | 'Exercise' | 'Nutrition' | 'Psychological' | 'Sleep';
  title: string;
  description: string;
  scheduledTime: string;
  durationMinutes: number;
  points: number;
  completed: boolean;
  completedAt?: string;
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface EnvironmentTelemetry {
  environment: SpaceEnvironment;
  gravityG: number;
  cabinPressureKpa: number;
  oxygenPercent: number;
  co2Percent: number;
  temperatureC: number;
  radiationRateDailyMicroSv: number;
  shieldingIntegrity: number; // percentage
}

export interface OrganSystemInfo {
  id: string;
  name: string;
  subsystem: string;
  position3D: [number, number, number];
  rotation3D?: [number, number, number];
  scale3D?: [number, number, number];
  primaryFunction: string;
  relatedIndicators: string[];
  spaceflightRisks: string[];
  whyMonitoringMatters: string;
  countermeasures: string[];
  currentTelemetryStatus: VitalStatus;
  currentTelemetryValue: string;
  nasaHrpCitation: string;
}
