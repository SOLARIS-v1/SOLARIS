import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, HelpCircle } from 'lucide-react';
import { MetricSummary } from '../../types';

interface MetricCardProps {
  summary: MetricSummary;
  icon: React.ReactNode;
  accentColor?: string;
  onClick?: () => void;
}

export default function MetricCard({ summary, icon, onClick }: MetricCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Status badge styling with muted medical status colors
  const statusBadge = 
    summary.status === 'alert' ? 'bg-[#F9EBEF] text-[#8B3A42] border-[#E8C4CB]' :
    summary.status === 'caution' ? 'bg-[#FAF3E8] text-[#B87D3B] border-[#EBD7BE]' :
    'bg-[#EBF3EE] text-[#4E7D63] border-[#C6DCCF]';

  // SVG Sparkline calculation
  const values = summary.sparkline && summary.sparkline.length > 1 ? summary.sparkline : [10, 15, 12, 18, 14, 20];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const width = 110;
  const height = 36;
  const points = values.map((val, idx) => {
    const x = (idx / (values.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  }).join(' ');
  const fillPoints = `0,${height} ${points} ${width},${height}`;
  const gradientId = `spark-grad-${summary.name.replace(/[^a-zA-Z0-9]/g, '-')}`;

  const strokeColor = 
    summary.status === 'alert' ? '#8B3A42' :
    summary.status === 'caution' ? '#B87D3B' :
    '#4E7D63';

  return (
    <div 
      onClick={onClick}
      className="relative group bg-[#FFFCF8] hover:bg-[#FAF5EE] border border-[#E4DAD0] hover:border-[#D5BDA4] rounded-2xl p-5 transition-all duration-300 shadow-warm hover:shadow-warm-md hover:-translate-y-1 flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#542B38]"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#FAF5EE] border border-[#E4DAD0] text-[#542B38] group-hover:scale-105 transition-transform shadow-warm-sm">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-[#542B38] text-sm tracking-wide font-orbitron">{summary.name}</h3>
              <button
                type="button"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(!showTooltip);
                }}
                className="text-[#817A76] hover:text-[#542B38] transition"
                title="Telemetry details"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-[10px] font-mono tracking-wider text-[#A56F73] uppercase font-bold">
              DEMO DATA
            </span>
          </div>
        </div>

        {/* Status Pill */}
        <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border uppercase font-bold tracking-wider ${statusBadge}`}>
          {summary.statusText}
        </span>
      </div>

      {/* Tooltip Overlay */}
      {showTooltip && (
        <div className="absolute top-16 left-4 right-4 z-30 bg-[#FFFCF8] border border-[#E4DAD0] rounded-xl p-3 shadow-warm-lg text-xs text-[#33302E] animate-in fade-in">
          <p className="font-medium text-[#542B38] mb-1 font-sans">{summary.description}</p>
          <div className="text-[11px] text-[#817A76] font-mono">
            Flight Target: <span className="text-[#4E7D63] font-semibold">{summary.normalRange}</span>
          </div>
        </div>
      )}

      {/* Value & Delta Row */}
      <div className="my-3 flex items-baseline justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold text-[#33302E] font-orbitron tracking-tight">
            {summary.current}
          </span>
          <span className="text-xs font-mono font-bold text-[#403B38]">
            {summary.unit}
          </span>
        </div>

        {/* Mini Sparkline SVG with Gradient Area */}
        <div className="w-[110px] h-[36px] overflow-hidden">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity="0.35" />
                <stop offset="100%" stopColor={strokeColor} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <polygon
              fill={`url(#${gradientId})`}
              points={fillPoints}
            />
            <polyline
              fill="none"
              stroke={strokeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="flex items-center justify-between pt-2.5 border-t border-[#E4DAD0] text-xs font-mono text-[#403B38]">
        <div className="flex items-center gap-1">
          {summary.trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 text-[#542B38]" />}
          {summary.trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5 text-[#542B38]" />}
          {summary.trend === 'stable' && <Minus className="w-3.5 h-3.5 text-[#403B38]" />}
          <span className="text-[#1E1B18] font-bold">{summary.delta}</span>
        </div>

        <div className="text-[11px] text-[#403B38]">
          Prev: <span className="text-[#1E1B18] font-bold">{summary.previous} {summary.unit !== 'State' ? summary.unit : ''}</span>
        </div>
      </div>
    </div>
  );
}
