import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Award,
  Sparkles,
  Zap,
  Clock,
  ShieldCheck,
  Moon,
  Droplets,
  Star,
  Activity,
  CheckCircle2,
  Lock,
  RotateCcw
} from 'lucide-react';
import {
  getRoutineTasks,
  toggleRoutineTask,
  getAchievementBadges,
  unlockBadge
} from '../utils/localStorage';
import { DailyRoutineTask, AchievementBadge } from '../types';
import { sound } from '../utils/audio';

export default function RoutinePage() {
  const [tasks, setTasks] = useState<DailyRoutineTask[]>(getRoutineTasks());
  const [badges, setBadges] = useState<AchievementBadge[]>(getAchievementBadges());
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const refreshData = () => {
    setTasks(getRoutineTasks());
    setBadges(getAchievementBadges());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleToggle = (taskId: string) => {
    sound.playSuccess();
    const updated = toggleRoutineTask(taskId);
    setTasks(updated);

    const allDone = updated.every(t => t.completed);
    if (allDone) {
      unlockBadge('badge-04');
      setBadges(getAchievementBadges());
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);
  const totalPoints = tasks.filter(t => t.completed).reduce((acc, t) => acc + t.points, 0);

  const filteredTasks = tasks.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DAD0]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CheckSquare className="w-6 h-6 text-[#4E7D63]" />
            <h1 className="text-2xl font-extrabold text-[#33302E] font-orbitron tracking-wide">
              Daily Mission Health Routine
            </h1>
          </div>
          <p className="text-xs font-mono text-[#817A76]">
            Mandatory flight countermeasure schedule, vitals checklist, and achievement badges.
          </p>
        </div>

        {/* Total Points Badge */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-sm font-mono text-xs">
          <Zap className="w-4 h-4 text-[#542B38]" />
          <span className="text-[#817A76]">Mission Health XP:</span>
          <span className="text-[#542B38] font-extrabold font-orbitron text-sm">{totalPoints} PTS</span>
        </div>
      </div>

      {/* Progress Card */}
      <div className="p-6 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-mono text-[#542B38] font-bold uppercase tracking-wider">
              DAILY FLIGHT CHECKLIST COMPLETION
            </span>
            <div className="text-2xl font-extrabold text-[#33302E] font-orbitron mt-0.5">
              {completedCount} of {tasks.length} Tasks Finalized ({progressPercent}%)
            </div>
          </div>
          <span className="text-xs font-mono text-[#817A76]">
            Saved continuously to local onboard storage
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#F5F0E9] rounded-full h-3 overflow-hidden border border-[#E4DAD0]">
          <div
            className="bg-gradient-to-r from-[#542B38] via-[#A56F73] to-[#4E7D63] h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Task Filters */}
      <div className="flex flex-wrap gap-2 font-mono text-xs">
        {['all', 'vitals', 'exercise', 'nutrition', 'psychological', 'sleep'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.playClick();
              setActiveCategory(cat);
            }}
            className={`px-3 py-1.5 rounded-xl border capitalize transition ${
              activeCategory === cat
                ? 'bg-[#542B38] border-[#542B38] text-[#F5F0E9] font-bold shadow-sm'
                : 'bg-[#FFFCF8] border-[#E4DAD0] text-[#33302E] hover:border-[#D5BDA4]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Routine Task Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleToggle(task.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer font-mono text-xs flex items-start gap-3 ${
              task.completed
                ? 'bg-[#F2F9F5] border-[#C6DCCF] opacity-90'
                : 'bg-[#FFFCF8] border-[#E4DAD0] hover:border-[#D5BDA4] shadow-sm'
            }`}
          >
            {/* Custom Checkbox */}
            <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition ${
              task.completed
                ? 'bg-[#4E7D63] border-[#4E7D63] text-white'
                : 'bg-[#F5F0E9] border-[#E4DAD0] hover:border-[#542B38]'
            }`}>
              {task.completed && <CheckCircle2 className="w-4 h-4" />}
            </div>

            {/* Task Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  task.category === 'Exercise' ? 'bg-[#FAF3E8] text-[#B87D3B] border border-[#EBD7BE]' :
                  task.category === 'Vitals' ? 'bg-[#FAF5EE] text-[#542B38] border border-[#D5BDA4]' :
                  task.category === 'Nutrition' ? 'bg-[#FAF5EE] text-[#B87D3B] border border-[#EBD7BE]' :
                  task.category === 'Psychological' ? 'bg-[#FDF3F5] text-[#A56F73] border border-[#E8C4CB]' :
                  'bg-[#EBF3EE] text-[#4E7D63] border border-[#C6DCCF]'
                }`}>
                  {task.category}
                </span>

                <span className="text-[#817A76] flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3 text-[#817A76]" />
                  {task.scheduledTime} UTC ({task.durationMinutes}m)
                </span>
              </div>

              <h3 className={`text-sm font-bold tracking-wide ${task.completed ? 'line-through text-[#817A76]' : 'text-[#33302E]'}`}>
                {task.title}
              </h3>
              <p className="text-[#817A76] text-[11px] leading-relaxed mt-1 font-sans">
                {task.description}
              </p>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E4DAD0] text-[10px]">
                <span className="text-[#542B38] font-bold">+{task.points} PTS</span>
                {task.completedAt && (
                  <span className="text-[#4E7D63]">Completed @ {task.completedAt} UTC</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Badges Section */}
      <div className="pt-8 border-t border-[#E4DAD0]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-[#A56F73]" />
            <h2 className="text-xl font-bold text-[#33302E] font-orbitron tracking-wide">
              Flight Readiness Achievement Badges
            </h2>
          </div>
          <span className="text-xs font-mono text-[#817A76]">
            {badges.filter(b => b.unlocked).length} of {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border font-mono text-xs transition ${
                badge.unlocked
                  ? 'bg-[#FFFCF8] border-[#D5BDA4] shadow-sm'
                  : 'bg-[#FAF7F4] border-[#E4DAD0] opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 rounded-xl border ${
                  badge.unlocked
                    ? 'bg-[#FAF5EE] border-[#D5BDA4] text-[#542B38]'
                    : 'bg-[#F5F0E9] border-[#E4DAD0] text-[#817A76]'
                }`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  badge.rarity === 'Legendary' ? 'bg-[#FAF3E8] text-[#B87D3B] border border-[#EBD7BE]' :
                  badge.rarity === 'Epic' ? 'bg-[#FDF3F5] text-[#A56F73] border border-[#E8C4CB]' :
                  'bg-[#FAF5EE] text-[#542B38] border border-[#D5BDA4]'
                }`}>
                  {badge.rarity}
                </span>
              </div>

              <h3 className="font-bold text-[#33302E] text-sm mb-1">{badge.name}</h3>
              <p className="text-[#817A76] text-[11px] leading-relaxed mb-3 font-sans">
                {badge.description}
              </p>

              <div className="pt-2 border-t border-[#E4DAD0] flex items-center justify-between text-[10px]">
                <span className="text-[#817A76]">{badge.category}</span>
                {badge.unlocked ? (
                  <span className="text-[#4E7D63] font-bold">Unlocked {badge.unlockedDate}</span>
                ) : (
                  <span className="text-[#817A76] flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
