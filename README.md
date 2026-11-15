# SOLARIS: Spaceflight Onboard Local Autonomous Readiness & Intelligence System

[![NASA Space Apps 2026](https://img.shields.io/badge/NASA_Space_Apps-2026_Prototype-0B3D91?style=flat-square&logo=nasa)](https://www.spaceappschallenge.org/)
[![Status](https://img.shields.io/badge/Build-Prototype_v1.0-2ea44f?style=flat-square)](https://github.com/SOLARIS-v1/demo-repository)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

**SOLARIS (Spaceflight Onboard Local Autonomous Readiness & Intelligence System)** is an autonomous clinical decision-support and health monitoring platform built for the **2026 NASA Space Apps Challenge** (*"Create Health Monitoring Software for Astronauts on Space Missions"*). 

Designed for deep-space missions operating under high communication latency or complete ground-link blackouts, SOLARIS combines a real-time clinical triage engine, an interactive 3D anatomical hazard mapper, and machine learning diagnostic pipelines grounded in NASA Open Science Data Repository (OSDR) and Space Omics and Medical Atlas (SOMA) datasets.

---

## Live Resources

* **Repository:** [https://github.com/SOLARIS-v1/demo-repository](https://github.com/SOLARIS-v1/demo-repository)

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

SOLARIS monitors six core physiological and behavioral indicators continuously, triggering automated crew countermeasures when values cross nominal spaceflight boundaries:

| Indicator | Metric Key | Green (Nominal) | Yellow (Caution) | Red (Critical) |
| :--- | :--- | :--- | :--- | :--- |
| **Blood Pressure** | `systolic_bp_mmhg` / `diastolic_bp_mmhg` | 90â€“119 / 60â€“79 mmHg | 120â€“139 / 80â€“89 mmHg | >= 140 / >= 90 or < 90 / < 60 mmHg |
| **Heart Rate** | `heart_rate_bpm` | 55â€“85 bpm | 86â€“100 or 48â€“54 bpm | > 100 or < 48 bpm |
| **Blood Sugar (Fasting)** | `blood_sugar_mg_dl` | 70â€“99 mg/dL | 100â€“125 or 60â€“69 mg/dL | >= 126 or < 60 mg/dL |
| **Body Temperature** | `body_temp_c` | 36.1â€“37.2 Â°C | 37.3â€“38.0 or 35.5â€“36.0 Â°C | > 38.0 or < 35.5 Â°C |
| **Sleep Duration** | `sleep_hours` | 7.0â€“8.5 hrs/day | 5.5â€“6.9 or 8.6â€“9.5 hrs/day | < 5.5 or > 9.5 hrs/day |
| **Mood & Readiness** | `mood_score_1_10` | 7â€“10 | 4â€“6 | 1â€“3 |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/SOLARIS-v1/SOLARIS.git
cd demo-repository

# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```

---

## Repository Structure

```text
demo-repository/
â”œâ”€â”€ data/
â”‚   â”œâ”€â”€ astronaut_telemetry_14d.csv      # 14-day simulated crew vitals, radiation & ARED logs
â”‚   â”œâ”€â”€ anatomy_hazard_mapping.json      # 3D UI region mapping & clinical exam instructions
â”‚   â””â”€â”€ osdr_reference_metadata.json     # Cached metadata from NASA OSD-569, OSD-570 & OSD-575
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ components/                      # UI components (3D canvas, telemetry, layout)
â”‚   â”œâ”€â”€ pages/                           # Dashboard, Hazards, Telemetry, Reports
â”‚   â””â”€â”€ utils/                           # Storage, triage & export utilities
â”œâ”€â”€ public/                              # 3D models and static assets
â””â”€â”€ README.md
```

