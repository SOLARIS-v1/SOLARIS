import { HealthRecord, AstronautProfile } from '../types';

export function exportHealthRecordsToCSV(records: HealthRecord[], profile: AstronautProfile): void {
  const headers = [
    'Record_ID',
    'Date',
    'Time',
    'Heart_Rate_BPM',
    'BP_Systolic_mmHg',
    'BP_Diastolic_mmHg',
    'Blood_Sugar_mg_dL',
    'Body_Temp_Celsius',
    'Sleep_Duration_Hours',
    'Mood_Status',
    'Triage_Status',
    'Data_Source',
    'Clinical_Notes'
  ];

  const rows = records.map(r => [
    `"${r.id}"`,
    `"${r.date}"`,
    `"${r.time}"`,
    r.heartRate,
    r.bloodPressureSystolic,
    r.bloodPressureDiastolic,
    r.bloodSugar,
    r.bodyTemperature.toFixed(1),
    r.sleepDuration.toFixed(1),
    `"${r.mood}"`,
    `"${r.status.toUpperCase()}"`,
    r.isUserEntered ? '"User Entered (Demo)"' : '"Simulated Flight Baseline (Demo)"',
    `"${(r.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [
    '# SOLARIS DEMO DATA EXPORT — EDUCATIONAL PROTOTYPE ONLY',
    `# Astronaut: ${profile.name} (${profile.callsign}) | Mission: ${profile.missionName} | Day: ${profile.missionDay}`,
    `# Environment: ${profile.environment} | Export Timestamp: ${new Date().toISOString()}`,
    '# NOTICE: All records are simulated sample values or manually entered demo readings. This export is not live spacecraft telemetry and is not for medical decisions.',
    '# This educational prototype is not a medical device and does not provide medical advice.',
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `SOLARIS_DEMO_Telemetry_${profile.name.replace(/\s+/g, '_')}_Day${profile.missionDay}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function printMissionReport(): void {
  window.print();
}
