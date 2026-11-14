import { HealthRecord, MetricSummary, HealthInsight, VitalStatus } from '../types';

export const MEDICAL_DISCLAIMER = 
  "Educational demo insights, not medical diagnoses. Follow approved flight medical protocols and contact the flight surgeon when necessary.";

/**
 * Calculates MetricSummary for each of the 6 key health indicators based on the latest records
 */
export function calculateMetricSummaries(records: HealthRecord[]): {
  heartRate: MetricSummary;
  bloodPressure: MetricSummary;
  bloodSugar: MetricSummary;
  bodyTemperature: MetricSummary;
  sleepDuration: MetricSummary;
  moodStatus: MetricSummary;
} {
  const current = records[0] || {
    heartRate: 72,
    bloodPressureSystolic: 118,
    bloodPressureDiastolic: 76,
    bloodSugar: 94,
    bodyTemperature: 36.7,
    sleepDuration: 7.4,
    mood: 'Focused',
    status: 'nominal'
  };

  const prev = records[1] || current;

  // Extract sparkline values (up to 7 most recent in chronological order)
  const recent7 = records.slice(0, 7).reverse();
  const hrSparkline = recent7.map(r => r.heartRate);
  const bpSparkline = recent7.map(r => r.bloodPressureSystolic);
  const bsSparkline = recent7.map(r => r.bloodSugar);
  const tempSparkline = recent7.map(r => r.bodyTemperature);
  const sleepSparkline = recent7.map(r => r.sleepDuration);
  const moodScoreMap: Record<string, number> = {
    'Calm': 90,
    'Energetic': 95,
    'Focused': 88,
    'Fatigued': 65,
    'Stressed': 55,
    'Anxious': 48
  };
  const moodSparkline = recent7.map(r => moodScoreMap[r.mood] || 80);

  // Heart Rate
  const hrDelta = current.heartRate - prev.heartRate;
  const hrTrend = hrDelta > 1 ? 'up' : hrDelta < -1 ? 'down' : 'stable';
  const hrStatus: VitalStatus = 
    current.heartRate > 100 || current.heartRate < 50 ? 'alert' :
    current.heartRate > 85 || current.heartRate < 55 ? 'caution' : 'nominal';

  // Blood Pressure
  const bpSysDelta = current.bloodPressureSystolic - prev.bloodPressureSystolic;
  const bpTrend = bpSysDelta > 2 ? 'up' : bpSysDelta < -2 ? 'down' : 'stable';
  const bpStatus: VitalStatus = 
    current.bloodPressureSystolic >= 140 || current.bloodPressureDiastolic >= 90 || current.bloodPressureSystolic < 90 ? 'alert' :
    current.bloodPressureSystolic >= 125 || current.bloodPressureDiastolic >= 82 ? 'caution' : 'nominal';

  // Blood Sugar
  const bsDelta = current.bloodSugar - prev.bloodSugar;
  const bsTrend = bsDelta > 3 ? 'up' : bsDelta < -3 ? 'down' : 'stable';
  const bsStatus: VitalStatus = 
    current.bloodSugar > 140 || current.bloodSugar < 65 ? 'alert' :
    current.bloodSugar > 115 || current.bloodSugar < 75 ? 'caution' : 'nominal';

  // Temperature
  const tempDelta = Number((current.bodyTemperature - prev.bodyTemperature).toFixed(1));
  const tempTrend = tempDelta > 0.2 ? 'up' : tempDelta < -0.2 ? 'down' : 'stable';
  const tempStatus: VitalStatus = 
    current.bodyTemperature >= 38.0 || current.bodyTemperature < 35.5 ? 'alert' :
    current.bodyTemperature >= 37.3 || current.bodyTemperature < 36.0 ? 'caution' : 'nominal';

  // Sleep
  const sleepDelta = Number((current.sleepDuration - prev.sleepDuration).toFixed(1));
  const sleepTrend = sleepDelta > 0.3 ? 'up' : sleepDelta < -0.3 ? 'down' : 'stable';
  const sleepStatus: VitalStatus = 
    current.sleepDuration < 5.0 ? 'alert' :
    current.sleepDuration < 6.5 ? 'caution' : 'nominal';

  // Mood
  const moodStatus: VitalStatus = 
    current.mood === 'Anxious' ? 'alert' :
    current.mood === 'Fatigued' || current.mood === 'Stressed' ? 'caution' : 'nominal';

  return {
    heartRate: {
      name: 'Heart Rate',
      current: current.heartRate,
      previous: prev.heartRate,
      unit: 'BPM',
      delta: `${hrDelta >= 0 ? '+' : ''}${hrDelta} bpm`,
      trend: hrTrend,
      status: hrStatus,
      statusText: hrStatus === 'nominal' ? 'Optimal Rhythm' : hrStatus === 'caution' ? 'Mild Elevation' : 'Review Required',
      description: 'Resting pulse rate measured in beats per minute.',
      normalRange: '60 – 85 BPM (Flight baseline: 65-78 BPM)',
      sparkline: hrSparkline.length > 0 ? hrSparkline : [70, 72, 71, 73, 69, 72]
    },
    bloodPressure: {
      name: 'Blood Pressure',
      current: `${current.bloodPressureSystolic}/${current.bloodPressureDiastolic}`,
      previous: `${prev.bloodPressureSystolic}/${prev.bloodPressureDiastolic}`,
      unit: 'mmHg',
      delta: `${bpSysDelta >= 0 ? '+' : ''}${bpSysDelta} systolic`,
      trend: bpTrend,
      status: bpStatus,
      statusText: bpStatus === 'nominal' ? 'Normotensive' : bpStatus === 'caution' ? 'Slightly Elevated' : 'Check Hydration/Stress',
      description: 'Systemic arterial pressure during contraction and resting phases.',
      normalRange: '< 120/80 mmHg',
      sparkline: bpSparkline.length > 0 ? bpSparkline : [118, 117, 120, 116, 121, 118]
    },
    bloodSugar: {
      name: 'Blood Sugar',
      current: current.bloodSugar,
      previous: prev.bloodSugar,
      unit: 'mg/dL',
      delta: `${bsDelta >= 0 ? '+' : ''}${bsDelta} mg/dL`,
      trend: bsTrend,
      status: bsStatus,
      statusText: bsStatus === 'nominal' ? 'Normal Glycemia' : bsStatus === 'caution' ? 'Post-Prandial High' : 'Elevated Glucose',
      description: 'Plasma glucose concentration reflecting metabolic equilibrium.',
      normalRange: '70 – 110 mg/dL (fasting)',
      sparkline: bsSparkline.length > 0 ? bsSparkline : [92, 94, 96, 95, 98, 94]
    },
    bodyTemperature: {
      name: 'Body Temperature',
      current: current.bodyTemperature.toFixed(1),
      previous: prev.bodyTemperature.toFixed(1),
      unit: '°C',
      delta: `${tempDelta >= 0 ? '+' : ''}${tempDelta} °C`,
      trend: tempTrend,
      status: tempStatus,
      statusText: tempStatus === 'nominal' ? 'Core Nominal' : tempStatus === 'caution' ? 'Slight Pyrexia' : 'Elevated Temperature',
      description: 'Internal core thermal regulation balance.',
      normalRange: '36.4 – 37.2 °C (Spacecraft thermal range)',
      sparkline: tempSparkline.length > 0 ? tempSparkline : [36.6, 36.7, 36.6, 36.8, 36.7, 36.7]
    },
    sleepDuration: {
      name: 'Sleep Duration',
      current: current.sleepDuration.toFixed(1),
      previous: prev.sleepDuration.toFixed(1),
      unit: 'Hours',
      delta: `${sleepDelta >= 0 ? '+' : ''}${sleepDelta} hrs`,
      trend: sleepTrend,
      status: sleepStatus,
      statusText: sleepStatus === 'nominal' ? 'Restorative Rest' : sleepStatus === 'caution' ? 'Deficit Warning' : 'Sleep Deprivation',
      description: 'Total duration of consolidated restorative sleep cycle.',
      normalRange: '7.0 – 8.5 Hours prescribed by NASA Flight Surgeons',
      sparkline: sleepSparkline.length > 0 ? sleepSparkline : [7.2, 7.5, 7.3, 5.8, 7.6, 7.4]
    },
    moodStatus: {
      name: 'Mood & Wellbeing',
      current: current.mood,
      previous: prev.mood,
      unit: 'State',
      delta: current.mood === prev.mood ? 'Unchanged' : `Shift from ${prev.mood}`,
      trend: 'stable',
      status: moodStatus,
      statusText: moodStatus === 'nominal' ? 'High Mission Focus' : moodStatus === 'caution' ? 'Operational Fatigue' : 'Psychological Support Flag',
      description: 'Daily behavioral self-assessment and mental resilience.',
      normalRange: 'Calm, Focused, or Energetic',
      sparkline: moodSparkline.length > 0 ? moodSparkline : [85, 88, 90, 68, 86, 88]
    }
  };
}

/**
 * Intelligent rule-based engine generating smart early warnings tied to NASA hazards
 */
export function generateSmartInsights(records: HealthRecord[]): HealthInsight[] {
  if (!records || records.length === 0) return [];
  const insights: HealthInsight[] = [];
  const current = records[0];
  const previous = records[1] || current;

  // 1. Cardiovascular / Microgravity Orthostatic Stress Rule
  if (current.heartRate > 85 || (current.heartRate - previous.heartRate >= 10)) {
    const isAlert = current.heartRate > 100;
    insights.push({
      id: 'ins-cardio-1',
      severity: isAlert ? 'alert' : 'caution',
      title: isAlert ? 'Tachycardia / Cardiovascular Strain Flagged' : 'Resting Heart Rate Drift Detected',
      metric: 'Heart Rate',
      changeDescription: `Current reading (${current.heartRate} BPM) is ${current.heartRate - previous.heartRate >= 0 ? '+' : ''}${current.heartRate - previous.heartRate} BPM higher than previous flight baseline.`,
      flightImplication: 'In microgravity, reduced blood volume (hypovolemia) and cephalic fluid redistribution reduce ventricular stroke volume, prompting a compensatory rise in resting heart rate.',
      actionProtocol: [
        'Perform targeted rehydration with 500 mL electrolyte pack #2.',
        'Verify cabin carbon dioxide (CO2) level is below 0.35%.',
        'Re-check resting heart rate in 45 minutes.',
        'If persistent, notify Flight Surgeon telemetry console.'
      ],
      timestamp: current.timestamp,
      hazardCorrelation: 'Hazard 4: Gravity Fields & Hazard 3: Distance from Earth'
    });
  }

  // 2. Blood Pressure / Vascular Rule
  if (current.bloodPressureSystolic >= 130 || current.bloodPressureDiastolic >= 85) {
    insights.push({
      id: 'ins-bp-1',
      severity: current.bloodPressureSystolic >= 140 ? 'alert' : 'caution',
      title: 'Elevated Systemic Arterial Pressure',
      metric: 'Blood Pressure',
      changeDescription: `Systolic pressure is ${current.bloodPressureSystolic} mmHg (diastolic ${current.bloodPressureDiastolic} mmHg), above the ideal flight target of 120/80 mmHg.`,
      flightImplication: 'Cephalic fluid shift elevates central venous pressure and intracranial pressure. Prolonged high vascular tension in space flight can exacerbate Spaceflight-Associated Neuro-ocular Syndrome (SANS).',
      actionProtocol: [
        'Engage 30-minute Lower Body Negative Pressure (LBNP) chamber session if available.',
        'Limit dietary sodium intake for the upcoming meal cycle.',
        'Avoid high-load isometric strain during next ARED workout until re-checked.'
      ],
      timestamp: current.timestamp,
      hazardCorrelation: 'Hazard 4: Gravity Fields & Microgravity Fluid Shift'
    });
  }

  // 3. Sleep & Circadian Rhythm Rule
  if (current.sleepDuration < 6.5) {
    const isSevere = current.sleepDuration < 5.0;
    insights.push({
      id: 'ins-sleep-1',
      severity: isSevere ? 'alert' : 'caution',
      title: isSevere ? 'Severe Sleep Deprivation Alert' : 'Sub-Optimal Sleep Duration Recorded',
      metric: 'Sleep Duration',
      changeDescription: `Astronaut logged only ${current.sleepDuration} hours of sleep, falling below the mandatory 7.0-hour flight minimum.`,
      flightImplication: 'Loss of slow-wave sleep impairs cognitive processing speed, slows EVA decision reaction time by up to 25%, and suppresses cellular immune responses already weakened by cosmic radiation.',
      actionProtocol: [
        'Schedule a 45-minute tactical power nap prior to afternoon operational duties.',
        'Adjust cabin lighting: activate melatonin-supportive blue-depleted mode 60 minutes before scheduled bedtime.',
        'Conduct a 3-minute WinSCAT cognitive battery to verify operational flight readiness.'
      ],
      timestamp: current.timestamp,
      hazardCorrelation: 'Hazard 2: Isolation & Confinement & Hazard 1: Space Radiation'
    });
  }

  // 4. Mood & Behavioral Health Rule
  if (current.mood === 'Fatigued' || current.mood === 'Stressed' || current.mood === 'Anxious') {
    insights.push({
      id: 'ins-mood-1',
      severity: current.mood === 'Anxious' ? 'alert' : 'caution',
      title: 'Behavioral Strain & Fatigue Indicator',
      metric: 'Mood Status',
      changeDescription: `Self-reported psychological state: "${current.mood}". Noticeable shift from calm baseline operational posture.`,
      flightImplication: 'Prolonged confinement in confined space habitats, distance from home support networks, and high mission workloads elevate sympathetic tone and neuroendocrine stress markers.',
      actionProtocol: [
        'Engage 15-minute Earth VR nature immersion therapy or listen to personalized audio log.',
        'Review mission timeline with Capcom to adjust non-critical EVA maintenance tasks.',
        'Schedule a confidential private psychological consultation (PPC) during upcoming communications pass.'
      ],
      timestamp: current.timestamp,
      hazardCorrelation: 'Hazard 2: Isolation and Confinement'
    });
  }

  // 5. Thermal Regulation Rule
  if (current.bodyTemperature >= 37.3) {
    insights.push({
      id: 'ins-temp-1',
      severity: current.bodyTemperature >= 38.0 ? 'alert' : 'caution',
      title: 'Core Temperature Elevation (Space Pyrexia)',
      metric: 'Body Temperature',
      changeDescription: `Core temperature recorded at ${current.bodyTemperature.toFixed(1)} °C, above normal flight threshold (36.6 - 37.0 °C).`,
      flightImplication: 'In weightlessness, perspiration does not drip away from the body naturally and convection cooling is diminished, predisposing astronauts to chronic low-grade space hyperthermia.',
      actionProtocol: [
        'Increase habitat cabin personal ventilation fan airflow.',
        'Hydrate with chilled electrolyte liquid.',
        'Re-evaluate core temperature after 30 minutes of rest.'
      ],
      timestamp: current.timestamp,
      hazardCorrelation: 'Hazard 5: Hostile Closed Environments'
    });
  }

  // 6. Blood Sugar Metabolic Rule
  if (current.bloodSugar > 120 || current.bloodSugar < 70) {
    insights.push({
      id: 'ins-sugar-1',
      severity: 'caution',
      title: current.bloodSugar > 120 ? 'Elevated Post-Prandial Glycemia' : 'Mild Hypoglycemia Detected',
      metric: 'Blood Sugar',
      changeDescription: `Blood glucose is ${current.bloodSugar} mg/dL.`,
      flightImplication: 'Microgravity insulin sensitivity fluctuations and altered gut microbiome absorption can cause metabolic variability during spaceflight.',
      actionProtocol: [
        current.bloodSugar > 120 
          ? 'Engage in moderate aerobic cycle ergometer cooldown.'
          : 'Consume a complex carbohydrate snack pack (dried fruit & nut ration).'
      ],
      timestamp: current.timestamp,
      hazardCorrelation: 'Hazard 5: Hostile Closed Environments & Nutrition'
    });
  }

  // If no warnings triggered, provide a reassuring Nominal Flight Status insight!
  if (insights.length === 0) {
    insights.push({
      id: 'ins-nominal-1',
      severity: 'nominal',
      title: 'All Physiological Telemetry Within Nominal Flight Envelope',
      metric: 'System Wide',
      changeDescription: 'All recorded vitals match established Artemis mission baseline parameters with no significant deviations.',
      flightImplication: 'Cardiovascular tone, sleep architecture, metabolic status, and psychological markers demonstrate optimal adaptation to the current flight environment.',
      actionProtocol: [
        'Maintain scheduled countermeasure exercise on ARED (2.5 hrs/day).',
        'Continue standard hydration and nutrient logging.',
        'Proceed with planned mission timeline.'
      ],
      timestamp: current.timestamp,
      hazardCorrelation: 'Nominal Mission Readiness'
    });
  }

  return insights;
}

/**
 * Calculates overall status of the astronaut: 'nominal' | 'caution' | 'alert'
 */
export function getOverallMissionHealthStatus(records: HealthRecord[]): VitalStatus {
  const summaries = calculateMetricSummaries(records);
  const statuses = [
    summaries.heartRate.status,
    summaries.bloodPressure.status,
    summaries.bloodSugar.status,
    summaries.bodyTemperature.status,
    summaries.sleepDuration.status,
    summaries.moodStatus.status,
  ];

  if (statuses.includes('alert')) return 'alert';
  if (statuses.includes('caution')) return 'caution';
  return 'nominal';
}
