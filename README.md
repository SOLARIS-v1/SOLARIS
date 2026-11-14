# ASTRA-V1: Astronaut Health Monitoring Without Earth

[![NASA Space Apps 2026](https://img.shields.io/badge/NASA_Space_Apps-2026_Prototype-0B3D91?style=flat-square&logo=nasa)](https://www.spaceappschallenge.org/)
[![Status](https://img.shields.io/badge/Build-Prototype_v1.0-2ea44f?style=flat-square)](https://github.com/ASTRA-V1/demo-repository)
[![YouTube Demo](https://img.shields.io/badge/Demo-Watch_on_YouTube-FF0000?style=flat-square&logo=youtube)](https://www.youtube.com/watch?v=bbZLEXe4MnQ)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

**ASTRA (Autonomous Spaceflight Triage & Risk Assessment)** is an autonomous clinical decision-support and health monitoring platform built for the **2026 NASA Space Apps Challenge** (*"Create Health Monitoring Software for Astronauts on Space Missions"*). 

Designed for deep-space missions operating under high communication latency or complete ground-link blackouts, ASTRA combines a real-time clinical triage engine, an interactive 3D anatomical hazard mapper, and machine learning diagnostic pipelines grounded in NASA Open Science Data Repository (OSDR) and Space Omics and Medical Atlas (SOMA) datasets.

---

## Live Resources

* **Repository:** [https://github.com/ASTRA-V1/demo-repository](https://github.com/ASTRA-V1/demo-repository)
* **Video Walkthrough & UI Prototype Demo:** [Watch ASTRA on YouTube](https://www.youtube.com/watch?v=bbZLEXe4MnQ)

---

## Core Architecture & Features

1. **Autonomous Clinical Triage Engine**
   Evaluates six primary physiological and behavioral telemetry streams in real time, classifying crew status into **Green (Nominal)**, **Yellow (Caution)**, and **Red (Critical)** states without requiring Earth-based flight surgeon intervention.
2. **Interactive 3D Anatomy & Spaceflight Hazard Mapping**
   Integrates 3D anatomical meshes (derived from BodyParts3D / Z-Anatomy) with a structured JSON clinical schema that maps localized symptoms and biometric anomalies to documented microgravity and deep-space hazards (e.g., Spaceflight-Associated Neuro-ocular Syndrome, cardiovascular deconditioning, radiation exposure).
3. **NASA OSDR & SOMA Data Integration**
   Ingests reference multi-omics, biospecimen metadata, and physiological baselines from NASA OSDR REST APIs (`OSD-569`, `OSD-570`, `OSD-575`), SOMA validation cohorts, and standardized NASA Human Research Program (HRP) measures.
4. **Time-Series Telemetry & ML Diagnostic Pipeline**
   Includes a 14-day multi-parameter astronaut telemetry dataset incorporating daily radiation dosimetry (`radiation_mgy_day`) and ARED resistive exercise logs (`ared_exercise_mins`) for anomaly detection and predictive triage model training.

---

## Clinical Triage Thresholds

ASTRA monitors six core physiological and behavioral indicators continuously, triggering automated crew countermeasures when values cross nominal spaceflight boundaries:

| Indicator | Metric Key | Green (Nominal) | Yellow (Caution) | Red (Critical) |
| :--- | :--- | :--- | :--- | :--- |
| **Blood Pressure** | `systolic_bp_mmhg` / `diastolic_bp_mmhg` | 90–119 / 60–79 mmHg | 120–139 / 80–89 mmHg | >= 140 / >= 90 or < 90 / < 60 mmHg |
| **Heart Rate** | `heart_rate_bpm` | 55–85 bpm | 86–100 or 48–54 bpm | > 100 or < 48 bpm |
| **Blood Sugar (Fasting)** | `blood_sugar_mg_dl` | 70–99 mg/dL | 100–125 or 60–69 mg/dL | >= 126 or < 60 mg/dL |
| **Body Temperature** | `body_temp_c` | 36.1–37.2 °C | 37.3–38.0 or 35.5–36.0 °C | > 38.0 or < 35.5 °C |
| **Sleep Duration** | `sleep_hours` | 7.0–8.5 hrs/day | 5.5–6.9 or 8.6–9.5 hrs/day | < 5.5 or > 9.5 hrs/day |
| **Mood & Readiness** | `mood_score_1_10` | 7–10 | 4–6 | 1–3 |

---

## Repository Structure

```text
demo-repository/
├── data/
│   ├── astronaut_telemetry_14d.csv      # 14-day simulated crew vitals, radiation & ARED logs
│   ├── anatomy_hazard_mapping.json      # 3D UI region mapping & clinical exam instructions
│   └── osdr_reference_metadata.json     # Cached metadata from NASA OSD-569, OSD-570 & OSD-575
├── src/
│   ├── triage_engine/                   # Rule-based & ML clinical triage classification logic
│   ├── api_clients/                     # NASA OSDR & GeneLab REST API connectors
│   └── dashboard/                       # Interactive 3D anatomy viewer & telemetry UI
├── notebooks/
│   └── ml_triage_training.ipynb         # Baseline anomaly detection & triage model training
├── docs/
│   └── architecture.md                  # System block diagrams & offline autonomy protocols
└── README.md
