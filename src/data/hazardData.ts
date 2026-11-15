import { SpaceHazard, OrganSystemInfo } from '../types';

export const NASA_FIVE_HAZARDS: SpaceHazard[] = [
  {
    id: 'hazard-radiation',
    hazardNumber: 1,
    title: 'Space Radiation',
    tagline: 'Deep Space Ionizing Fields & Solar Particle Events',
    primaryRisk: 'Immune system suppression, cellular DNA strand breaks, increased cancer risk, and ocular cataracts.',
    description: 'Beyond Earthâ€™s protective magnetosphere, astronauts are constantly bombarded by Galactic Cosmic Rays (GCRs) and unpredictable Solar Particle Events (SPEs). These high-energy protons and atomic nuclei easily penetrate spacecraft hulls, causing sub-atomic damage to human tissues.',
    detailedEffects: [
      'Chronic sub-lethal radiation damage to bone marrow stem cells, reducing white blood cell production.',
      'Cellular oxidative stress and DNA double-strand breaks impairing tissue self-repair.',
      'Premature endothelial aging and vascular stiffening inside cardiac microvasculature.',
      'Cataractogenesis in crystalline lens caused by heavy ion track transitions.'
    ],
    affectedBodySystems: ['Immune System', 'Brain & Central Nervous System', 'Cardiovascular System', 'Ocular Lens'],
    monitoredIndicators: ['White Blood Cell count (CBC)', 'Skin & Tissue Dosimetry', 'Resting Heart Rate Variability', 'Ophthalmic Visual Acuity'],
    countermeasures: [
      'Active water-wall and polyethylene storm shelters during Solar Particle Events.',
      'Antioxidant-dense nutrition regimens (polyphenols, glutathione, Vitamin C & E).',
      'Continuous personal active silicon detector badges (PADs).',
      'Daily physiological immune biomarker testing.'
    ],
    nasaReference: 'NASA Human Research Program (HRP) Radiation Risk Mitigation Roadmap (GCR-2026)',
    severityLevel: 'Critical',
    iconName: 'Radiation',
    color: '#8B3A42'
  },
  {
    id: 'hazard-isolation',
    hazardNumber: 2,
    title: 'Isolation and Confinement',
    tagline: 'Monotonous Habitation, Sensory Deprivation & Group Dynamics',
    primaryRisk: 'Behavioral health conditions, mood degradation, sleep disorders, and cognitive decline.',
    description: 'Traveling millions of miles inside a pressurized habitat with a small team produces profound psychological stressors. The loss of natural Earth circadian cues, lack of family contact, sensory monotony, and mission high-consequence stress require continuous psychological monitoring.',
    detailedEffects: [
      'Circadian rhythm desynchronization resulting in reduced slow-wave sleep and chronic daytime fatigue.',
      'Elevation of salivary cortisol and sympathetic nervous system tone, impacting mood stability.',
      'Interpersonal friction and cognitive tunneling under prolonged operational task fatigue.',
      'Altered sensory processing and spatial disorientation in uniform habitat lighting.'
    ],
    affectedBodySystems: ['Brain & Cognition', 'Neuroendocrine System', 'Sleep Architecture', 'Autonomic Nervous System'],
    monitoredIndicators: ['Sleep Duration & Stage Distribution (REM/Deep)', 'Daily Self-Reported Mood Status', 'Cognitive Assessment Battery (WinSCAT)', 'Heart Rate Variability (HRV)'],
    countermeasures: [
      'Dynamic Solid-State Circadian Lighting with high blue-wavelength morning and blue-depleted evening spectrums.',
      'Virtual Reality nature immersion therapy sessions (Earth VRscapes).',
      'Structured private psychological conferences (PPCs) with mission behavioral health flight surgeons.',
      'Autonomous cognitive micro-games to benchmark daily executive function.'
    ],
    nasaReference: 'NASA Behavioral Health and Performance (BHP) Standard 3001 Vol 1',
    severityLevel: 'High',
    iconName: 'Users',
    color: '#542B38'
  },
  {
    id: 'hazard-distance',
    hazardNumber: 3,
    title: 'Distance from Earth',
    tagline: 'Autonomous Medical Independence & Telemetry Latency',
    primaryRisk: 'Cardiovascular events and critical limitations in receiving terrestrial medical support.',
    description: 'A mission to Mars spans hundreds of millions of kilometers, introducing one-way radio latency of up to 22 minutes. There is no rapid evacuation capsule back to Earth and no resupply of medicines or whole blood. The crew must diagnose, triage, and treat cardiovascular and traumatic events autonomously.',
    detailedEffects: [
      'Inability to receive real-time surgical or telemetry consultation from Earth ground control during acute emergencies.',
      'Pharmaceutical shelf-life degradation under cumulative cosmic radiation flux over multi-year journeys.',
      'Heightened psychological pressure on the designated crew medical officer.',
      'Need for self-contained, closed-loop diagnostic ultrasound and autonomous point-of-care lab analyzers.'
    ],
    affectedBodySystems: ['Cardiovascular System', 'Autonomous Clinical Care', 'Emergency Resuscitation'],
    monitoredIndicators: ['Continuous ECG Rhythm', 'Blood Pressure (Systolic/Diastolic)', 'Troponin and Cardiac Enzymes', 'Blood Sugar & Metabolic Panel'],
    countermeasures: [
      'Automated smart clinical diagnostic decision-support software (like SOLARIS).',
      'Crew cross-training in ultrasound-guided invasive access and emergency anesthesia.',
      'Lyophilized freeze-dried shelf-stable pharmaceutical synthesis packs.',
      'Redundant closed-loop oxygen and fluid resuscitation systems.'
    ],
    nasaReference: 'NASA Exploration Medical Capability (ExMC) Autonomous Clinical Protocols',
    severityLevel: 'Critical',
    iconName: 'Orbit',
    color: '#B87D3B'
  },
  {
    id: 'hazard-gravity',
    hazardNumber: 4,
    title: 'Gravity Fields',
    tagline: 'Microgravity Transitions, Bone Resorption & Fluid Redistribution',
    primaryRisk: 'Severe bone mineral density loss, muscle sarcopenia, and fluid redistribution towards the head.',
    description: 'Astronauts encounter three distinct gravity states: microgravity in transit (0g), 1/6g on the Moon, and 3/8g on Mars. Without gravitational loading, osteoclasts break down bone matrix faster than osteoblasts can rebuild it, releasing dangerous calcium into the bloodstream and causing rapid muscular atrophy.',
    detailedEffects: [
      'Loss of 1.0% to 1.5% bone mineral density per month in weight-bearing bones (femur, spine, pelvis).',
      'Cephalic fluid shift of ~2 liters from legs toward head, causing facial puffiness, nasal congestion, and Spaceflight-Associated Neuro-ocular Syndrome (SANS).',
      'Atrophy of anti-gravity postural muscles (soleus, gastrocnemius, erector spinae) by up to 20% in 6 months.',
      'Neurovestibular ataxia and motion sickness during gravitational transition periods.'
    ],
    affectedBodySystems: ['Skeletal System', 'Muscular System', 'Venous & Cardiovascular System', 'Ophthalmic & Optic Nerve'],
    monitoredIndicators: ['Dual-energy X-ray Absorptiometry (DXA) Biomarkers', 'Urinary Calcium Excretion', 'Leg Circumference & Muscle Mass', 'Funduscopic Optic Disc Edema'],
    countermeasures: [
      'Daily 2.5 hours prescribed high-intensity resistance exercise on ARED (Advanced Resistive Exercise Device).',
      'T2 cycle ergometer and second-generation motorized treadmill with bungee harness.',
      'Bisphosphonate anti-resorption pharmaceutical therapy.',
      'Lower Body Negative Pressure (LBNP) suit sessions to draw fluid back to lower extremities.'
    ],
    nasaReference: 'NASA Human Health Countermeasures (HHC) Bone & Muscle Protocols 2026',
    severityLevel: 'Severe',
    iconName: 'Weight',
    color: '#A56F73'
  },
  {
    id: 'hazard-environment',
    hazardNumber: 5,
    title: 'Hostile Closed Environments',
    tagline: 'Confined Habitats, Toxic Atmosphere Hazards & Nutritional Depletion',
    primaryRisk: 'Inadequate nutrition, respiratory irritation, microbial shifts, and environmental toxins.',
    description: 'A space capsule is an artificial enclosed ecosystem. Everything the crew breathes, eats, and excretes must be processed in closed loops. Elevated carbon dioxide (hypercapnia), airborne lunar or Martian regolith dust, microbial biofilms on water processors, and vitamin degradation threaten crew health.',
    detailedEffects: [
      'Chronic low-grade hypercapnia (elevated cabin CO2 > 3 mmHg) triggering headaches, lethargy, and cognitive fog.',
      'Aerosolized fine abrasive planetary dust (silica regolith) causing pulmonary irritation and corneal abrasion.',
      'Accelerated degradation of vital micronutrients (Vitamin B1, C, D) in pre-packaged space food.',
      'Opportunistic virulence shifts in closed-loop habitat bacterial and fungal microbiomes.'
    ],
    affectedBodySystems: ['Respiratory System', 'Gastrointestinal & Nutrition', 'Dermatological Barrier', 'Cellular Metabolism'],
    monitoredIndicators: ['Cabin CO2 & O2 Partial Pressures', 'Body Core Temperature (Â°C)', 'Fasting Blood Glucose (mg/dL)', 'Spirometry Peak Expiratory Flow'],
    countermeasures: [
      'High-efficiency particulate air (HEPA) and trace contaminant catalytic scrubbers.',
      'Hydroponic Space Crop Production for fresh leafy microgreens rich in fresh antioxidants.',
      'Strict suit airlock washdown protocols preventing abrasive dust infiltration.',
      'Antimicrobial surface coatings and silver-biocide water reclamation purification.'
    ],
    nasaReference: 'NASA Spacecraft Environmental Health Criteria & HRP Food System Standard',
    severityLevel: 'High',
    iconName: 'ShieldAlert',
    color: '#4E7D63'
  }
];

export const ANATOMICAL_BODY_SYSTEMS: OrganSystemInfo[] = [
  {
    id: 'brain',
    name: 'Brain & Central Nervous System',
    subsystem: 'Neurocognitive & Behavioral Health',
    position3D: [0, 1.62, 0.05],
    primaryFunction: 'Coordinates cognitive processing, motor execution, circadian regulation, mood balance, and autonomic homeostasis.',
    relatedIndicators: ['Sleep Duration (hrs)', 'Sleep Architecture (REM/Deep)', 'Daily Mood Self-Score', 'Cognitive Reaction Latency (ms)'],
    spaceflightRisks: [
      'Cephalic fluid shifts increase intracranial pressure, pressing on optic nerve sheaths (SANS).',
      'Cosmic radiation tracks passing through cerebral microvasculature may induce neuroinflammation.',
      'Sensory monotony and isolation induce circadian misalignment and behavioral fatigue.'
    ],
    whyMonitoringMatters: 'Mission success hinges on rapid executive decision-making. Catching subtle cognitive slowing or mood shifts early prevents operational error in hazardous operations.',
    countermeasures: [
      'Targeted blue-enriched circadian LED schedule during work shifts.',
      'Virtual Reality immersive psychological respite sessions.',
      'Regular sleep architecture tracking and guided relaxation protocols.'
    ],
    currentTelemetryStatus: 'nominal',
    currentTelemetryValue: 'Cognitive Score: 92/100 | REM: 1.8 hrs',
    nasaHrpCitation: 'NASA HRP Behavioral Health & Performance (BHP) Standard 3001'
  },
  {
    id: 'heart',
    name: 'Heart & Cardiovascular System',
    subsystem: 'Hemodynamics & Microcirculation',
    position3D: [0.12, 0.95, 0.22],
    primaryFunction: 'Pumps oxygenated blood, hormones, and immune cells throughout the body while maintaining vascular perfusion.',
    relatedIndicators: ['Heart Rate (BPM)', 'Blood Pressure (Systolic/Diastolic)', 'Heart Rate Variability (HRV)', 'Cardiac Output (L/min)'],
    spaceflightRisks: [
      'Without gravitational hydrostatic pressure, cardiac workload drops, causing ~8-10% myocardial mass reduction over 6 months.',
      'Cephalic fluid shifting fools cardiac baroreceptors into sensing fluid overload, triggering fluid loss and dehydration.',
      'Severe orthostatic intolerance occurs upon return to planetary gravity (inability to stand without fainting).'
    ],
    whyMonitoringMatters: 'Cardiovascular stability is critical for surviving high-G reentry forces, lunar surface EVAs, and emergency physical tasks.',
    countermeasures: [
      'Prescribed high-intensity interval cardiovascular training on cycle ergometer.',
      'Salt and electrolyte fluid loading protocol 2 hours prior to gravity transitions.',
      'Lower Body Negative Pressure (LBNP) conditioning to maintain venous return elasticity.'
    ],
    currentTelemetryStatus: 'nominal',
    currentTelemetryValue: '72 BPM | 118/76 mmHg',
    nasaHrpCitation: 'NASA Cardiovascular Adaptation to Microgravity (HHC-CV-01)'
  },
  {
    id: 'lungs',
    name: 'Lungs & Respiratory System',
    subsystem: 'Gas Exchange & Environmental Shielding',
    position3D: [-0.02, 0.95, 0.2],
    primaryFunction: 'Transfers oxygen into blood and removes carbon dioxide while filtering inhaled micro-particulates.',
    relatedIndicators: ['Cabin O2 % (Nominal 21%)', 'Cabin CO2 % (Target < 0.3%)', 'Respiration Rate (breaths/min)', 'Core Body Temperature (Â°C)'],
    spaceflightRisks: [
      'In microgravity, air does not circulate by natural thermal convection; stagnant CO2 pockets can form around sleeping astronauts.',
      'Extraterrestrial regolith dust (sharp jagged silica particles from Moon/Mars) inhaled through airlocks causes severe alveolar irritation.',
      'Reduced lymphatic clearance in upper lungs due to lack of gravity drainage.'
    ],
    whyMonitoringMatters: 'Respiratory irritation or chronic hypercapnia rapidly causes debilitating headaches, disorientation, and sleep disruption.',
    countermeasures: [
      'Continuous acoustic cabin airflow fans maintaining minimum 15-40 ft/min velocity.',
      'Sub-micron regenerative particulate scrubbers in air revitalizer loops.',
      'Routine spirometry and air quality gas chromatograph analysis.'
    ],
    currentTelemetryStatus: 'nominal',
    currentTelemetryValue: 'SpO2: 99% | Resp: 14 rpm | CO2: 0.28%',
    nasaHrpCitation: 'NASA Environmental Health & Atmospheric Criteria (ISS-ECLSS-04)'
  },
  {
    id: 'bones',
    name: 'Skeletal System & Bone Matrix',
    subsystem: 'Musculoskeletal Structural Integrity',
    position3D: [0.18, 0.35, 0.05],
    primaryFunction: 'Provides structural scaffolding, anchors muscles, protects vital organs, and regulates calcium metabolism.',
    relatedIndicators: ['Bone Mineral Density (DXA T-score)', 'Urinary Calcium Concentration (mg/day)', 'Serum Vitamin D Level', 'Biochemical Bone Turnover Markers'],
    spaceflightRisks: [
      'Astronauts lose 1.0% to 1.5% bone density per month in trabecular load-bearing bones (hip, lumbar spine, calcaneus).',
      'Massive calcium leeching into bloodstream dramatically elevates the risk of painful, mission-jeopardizing renal kidney stones.',
      'Prolonged spinal elongation (up to 5-7 cm) due to uncompressed intervertebral discs causes severe lumbar pain and herniation risks.'
    ],
    whyMonitoringMatters: 'Unmitigated bone loss can lead to pathological fractures during heavy surface operations on Mars and lifelong osteoporosis upon return.',
    countermeasures: [
      'ARED (Advanced Resistive Exercise Device) supplying up to 600 lbs of load for squats, deadlifts, and heel raises.',
      'Antiresorptive bisphosphonates (alendronate / zoledronic acid) combined with active Vitamin D supplements.',
      'High-resolution peripheral quantitative computed tomography (HR-pQCT) monitoring.'
    ],
    currentTelemetryStatus: 'nominal',
    currentTelemetryValue: 'Bone Resorption Index: Stable (-0.2% variance)',
    nasaHrpCitation: 'NASA Musculoskeletal Countermeasures Team Standard (HHC-BONE-2026)'
  },
  {
    id: 'muscles',
    name: 'Muscular System & Motor Control',
    subsystem: 'Locomotor & Anti-Gravity Posture',
    position3D: [-0.22, 0.2, 0.08],
    primaryFunction: 'Generates physical force, enables EVA locomotion, pumps venous blood back to heart, and maintains posture.',
    relatedIndicators: ['Peak Isometric Knee Extension Torque', 'Daily Exercise Kilocalorie Burn', 'Core Body Temperature (Â°C)', 'Electrolyte Hydration Balance'],
    spaceflightRisks: [
      'Disuse atrophy: slow-twitch (Type I) oxidative endurance fibers quickly transform into fatigable fast-twitch (Type IIx) fibers.',
      'Loss of up to 20% calf muscle volume and 30% muscle power during a standard 6-month mission if workouts are missed.',
      'Decreased neuromuscular coordination causing gait instability upon transitioning between gravity regimes.'
    ],
    whyMonitoringMatters: 'Astronauts must have full muscular strength to egress independently from a landing vehicle in an off-nominal emergency on Mars.',
    countermeasures: [
      'Strict daily 2.5-hour countermeasure workout block on the flight schedule.',
      'Optimized leucine-rich branched-chain amino acid (BCAA) protein supplementation.',
      'Neuromuscular electrical stimulation (NMES) protocols for deep posture muscle bundles.'
    ],
    currentTelemetryStatus: 'nominal',
    currentTelemetryValue: 'Workload Completed: 100% | 2.5 hrs logged',
    nasaHrpCitation: 'NASA Human Performance & Exercise Physiology Protocols (HHC-MUSCLE-03)'
  },
  {
    id: 'digestive',
    name: 'Digestive System & Nutrition',
    subsystem: 'Metabolic Energy & Microbiome Barrier',
    position3D: [0.0, 0.65, 0.15],
    primaryFunction: 'Breaks down nutrients, sustains caloric metabolism, produces essential vitamins, and shields immune barrier.',
    relatedIndicators: ['Fasting Blood Glucose (mg/dL)', 'Total Caloric Intake (kcal/day)', 'Daily Water Hydration Volume (liters)', 'Body Weight / Mass Trend (kg)'],
    spaceflightRisks: [
      'Space motion sickness and cephalic fluid fullness cause acute appetite loss and hypocaloric malnutrition in initial flight days.',
      'Spaceflight conditions alter the gut bacterial microbiome, reducing beneficial short-chain fatty acid (SCFA) producing strains.',
      'Degradation of vital micronutrients (Vitamin B12, folate, ascorbic acid) in retort space-pack storage over 1-3 years.'
    ],
    whyMonitoringMatters: 'Nutritional inadequacy directly depresses immune defense, accelerates muscle wasting, and induces cognitive fatigue.',
    countermeasures: [
      'Personalized caloric prescriptions (averaging 2,800 to 3,200 kcal/day for active mission tasks).',
      'Targeted synbiotics (probiotics + prebiotics) to preserve gut barrier integrity and immune resistance.',
      'Fresh microgreens harvested from onboard Veggie / Advanced Plant Habitat units.'
    ],
    currentTelemetryStatus: 'nominal',
    currentTelemetryValue: 'Blood Sugar: 94 mg/dL | Caloric Intake: 2,850 kcal',
    nasaHrpCitation: 'NASA Space Food Systems & Clinical Nutrition Guidelines (HRP-NUTR-2026)'
  }
];

