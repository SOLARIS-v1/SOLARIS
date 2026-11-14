import { DailyRoutineTask } from '../types';

export const INITIAL_DAILY_ROUTINE_TASKS: DailyRoutineTask[] = [
  {
    id: 'task-01',
    category: 'Vitals',
    title: 'Morning Resting Vital Signs Capture',
    description: 'Record baseline resting heart rate, blood pressure, and core temperature before morning caloric intake.',
    scheduledTime: '07:30',
    durationMinutes: 10,
    points: 25,
    completed: true,
    completedAt: '07:38'
  },
  {
    id: 'task-02',
    category: 'Sleep',
    title: 'Sleep Architecture & Rest Log',
    description: 'Sync wearable sleep sensor data; verify deep sleep and REM durations against flight standards.',
    scheduledTime: '07:45',
    durationMinutes: 5,
    points: 20,
    completed: true,
    completedAt: '07:46'
  },
  {
    id: 'task-03',
    category: 'Nutrition',
    title: 'Electrolyte Hydration & Breakfast Log',
    description: 'Consume morning balanced nutrient pack and 500 mL water containing prescribed sodium/potassium electrolyte ratio.',
    scheduledTime: '08:00',
    durationMinutes: 20,
    points: 15,
    completed: true,
    completedAt: '08:22'
  },
  {
    id: 'task-04',
    category: 'Psychological',
    title: 'Cognitive Battery & Mood Assessment',
    description: 'Perform 3-minute executive reaction test and log psychological readiness status for flight operations.',
    scheduledTime: '08:30',
    durationMinutes: 10,
    points: 30,
    completed: true,
    completedAt: '08:41'
  },
  {
    id: 'task-05',
    category: 'Exercise',
    title: 'ARED High-Load Resistive Workout',
    description: 'Perform scheduled heavy resistance sets (squat, deadlift, heel-raise) on the Advanced Resistive Exercise Device.',
    scheduledTime: '13:00',
    durationMinutes: 75,
    points: 50,
    completed: false
  },
  {
    id: 'task-06',
    category: 'Exercise',
    title: 'T2 Cardiovascular Treadmill / Cycle Block',
    description: 'Continuous aerobic interval training at 75-85% VO2max to preserve cardiac stroke volume and vascular tone.',
    scheduledTime: '14:30',
    durationMinutes: 45,
    points: 40,
    completed: false
  },
  {
    id: 'task-07',
    category: 'Vitals',
    title: 'Post-Exercise Metabolic & Glucose Check',
    description: 'Measure blood sugar and hydration biomarkers following physical exertion to confirm glycemic recovery.',
    scheduledTime: '15:30',
    durationMinutes: 10,
    points: 20,
    completed: false
  },
  {
    id: 'task-08',
    category: 'Nutrition',
    title: 'Dinner Caloric & Calcium Review',
    description: 'Ensure daily caloric target (2,800 kcal) is met along with adequate calcium/Vitamin D to offset bone resorption.',
    scheduledTime: '19:00',
    durationMinutes: 30,
    points: 15,
    completed: false
  },
  {
    id: 'task-09',
    category: 'Psychological',
    title: 'Circadian Wind-Down & Evening Telemetry',
    description: 'Engage blue-depleted cabin lighting mode; 15 minutes VR Earthscape relaxation or personal video uplink.',
    scheduledTime: '21:30',
    durationMinutes: 20,
    points: 25,
    completed: false
  }
];
