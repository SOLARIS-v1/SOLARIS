import React, { useState, useEffect } from 'react';
import {
  HeartPulse,
  PlusCircle,
  Filter,
  ArrowUpDown,
  Search,
  Trash2,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Activity,
  Heart,
  Droplets,
  Thermometer,
  Moon,
  Smile,
  ChevronDown
} from 'lucide-react';
import HealthInputModal from '../components/health/HealthInputModal';
import { getHealthRecords, deleteHealthRecord } from '../utils/localStorage';
import { HealthRecord, VitalStatus } from '../types';
import { sound } from '../utils/audio';

export default function HealthMonitoringPage() {
  const [records, setRecords] = useState<HealthRecord[]>(getHealthRecords());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [metricFilter, setMetricFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState<HealthRecord | null>(null);

  const refreshRecords = () => {
    setRecords(getHealthRecords());
  };

  useEffect(() => {
    refreshRecords();
    const handleUpdate = () => refreshRecords();
    window.addEventListener('astra_health_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('astra_health_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playWarning();
    deleteHealthRecord(id);
    refreshRecords();
  };

  const filteredRecords = records
    .filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (metricFilter !== 'all') {
        if (metricFilter === 'heartRate' && (r.heartRate === undefined || r.heartRate === null)) return false;
        if (metricFilter === 'bloodPressure' && (!r.bloodPressureSystolic || !r.bloodPressureDiastolic)) return false;
        if (metricFilter === 'bloodSugar' && !r.bloodSugar) return false;
        if (metricFilter === 'temperature' && !r.bodyTemperature) return false;
        if (metricFilter === 'sleep' && !r.sleepDuration) return false;
        if (metricFilter === 'mood' && !r.mood) return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesDate = r.date.includes(query);
        const matchesMood = r.mood.toLowerCase().includes(query);
        const matchesNotes = (r.notes || '').toLowerCase().includes(query);
        if (!matchesDate && !matchesMood && !matchesNotes) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const timeA = new Date(`${a.date}T${a.time}`).getTime();
      const timeB = new Date(`${b.date}T${b.time}`).getTime();
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });

  return (
    <div className="space-y-8 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DAD0]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HeartPulse className="w-6 h-6 text-[#542B38]" />
            <h1 className="text-2xl font-extrabold text-[#33302E] font-orbitron tracking-wide">
              Health Monitoring Console
            </h1>
          </div>
          <p className="text-xs font-mono text-[#817A76]">
            Log physiological telemetry and review historical mission biomarker trends.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#542B38] hover:bg-[#6B3547] text-[#F5F0E9] font-bold text-xs font-mono tracking-wider transition shadow-md"
        >
          <PlusCircle className="w-4 h-4 text-[#F5F0E9]" />
          <span>LOG NEW MEASUREMENT</span>
        </button>
      </div>

      {/* Physiological Indicators Reference Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: <Heart className="w-4 h-4 text-[#8B3A42]" />, label: 'Heart Rate (BPM)', desc: 'Normal flight resting pulse: 60-85 BPM. Monitored for tachycardia caused by microgravity fluid loss and cardiovascular deconditioning.' },
          { icon: <Activity className="w-4 h-4 text-[#542B38]" />, label: 'Blood Pressure (mmHg)', desc: 'Target < 120/80 mmHg. Cephalic fluid shifts increase upper venous and intracranial pressure, placing tension on optic nerves.' },
          { icon: <Droplets className="w-4 h-4 text-[#B87D3B]" />, label: 'Blood Sugar (mg/dL)', desc: 'Fasting glycemia target: 70-110 mg/dL. Microgravity affects insulin sensitivity and carbohydrate metabolism during spaceflight.' },
          { icon: <Thermometer className="w-4 h-4 text-[#A56F73]" />, label: 'Core Temperature (°C)', desc: 'Baseline: 36.4 - 37.2 °C. Absence of natural convection in weightlessness causes heat accumulation ("space pyrexia").' },
          { icon: <Moon className="w-4 h-4 text-[#542B38]" />, label: 'Sleep Duration (Hours)', desc: 'Flight minimum: 7.0 hours. Sleep deprivation impairs critical EVA reaction time and dampens immune function against cosmic rays.' },
          { icon: <Smile className="w-4 h-4 text-[#4E7D63]" />, label: 'Mood Status', desc: 'Daily self-rating. Tracks behavioral resilience and operational fatigue caused by sensory confinement and distance from Earth.' },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-sm">
            <div className="flex items-center gap-2 text-[#542B38] font-mono text-xs font-bold mb-1">
              {item.icon}
              <span>{item.label}</span>
            </div>
            <p className="text-xs text-[#33302E]">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-sm flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-[#817A76] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search records by date, notes, or mood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5F0E9] border border-[#E4DAD0] focus:border-[#542B38] rounded-xl pl-9 pr-3 py-2 text-[#33302E] placeholder-[#817A76] outline-none"
          />
        </div>

        {/* Indicator filter */}
        <div className="flex items-center gap-2">
          <span className="text-[#817A76]">Indicator:</span>
          <select
            value={metricFilter}
            onChange={(e) => setMetricFilter(e.target.value)}
            className="bg-[#F5F0E9] border border-[#E4DAD0] focus:border-[#542B38] rounded-lg px-2.5 py-1.5 text-[#33302E] outline-none"
          >
            <option value="all">All Indicators</option>
            <option value="heartRate">Heart Rate</option>
            <option value="bloodPressure">Blood Pressure</option>
            <option value="bloodSugar">Blood Sugar</option>
            <option value="temperature">Temperature</option>
            <option value="sleep">Sleep Duration</option>
            <option value="mood">Mood Status</option>
          </select>
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          <span className="text-[#817A76]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F5F0E9] border border-[#E4DAD0] focus:border-[#542B38] rounded-lg px-2.5 py-1.5 text-[#33302E] outline-none"
          >
            <option value="all">All Triage States</option>
            <option value="nominal">Nominal (Green)</option>
            <option value="caution">Caution (Yellow)</option>
            <option value="alert">Alert (Red)</option>
          </select>
        </div>

        {/* Sort order */}
        <button
          onClick={() => {
            sound.playClick();
            setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F0E9] hover:bg-[#EAE4DC] border border-[#E4DAD0] text-[#33302E] transition"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span>{sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
        </button>
      </div>

      {/* Health History Table */}
      <div className="rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#F5F0E9] text-[#817A76] uppercase tracking-wider border-b border-[#E4DAD0]">
              <tr>
                <th className="px-5 py-3.5 text-[#542B38]">Timestamp</th>
                <th className="px-4 py-3.5">Heart Rate</th>
                <th className="px-4 py-3.5">Blood Pressure</th>
                <th className="px-4 py-3.5">Blood Sugar</th>
                <th className="px-4 py-3.5">Body Temp</th>
                <th className="px-4 py-3.5">Sleep</th>
                <th className="px-4 py-3.5">Mood</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DAD0]">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-[#817A76]">
                    No matching flight health records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedRecordForDetail(record);
                    }}
                    className="hover:bg-[#FAF5EE] transition cursor-pointer"
                  >
                    <td className="px-5 py-3.5 text-[#33302E] font-medium">
                      <div>{record.date}</div>
                      <div className="text-[10px] text-[#817A76]">{record.time} UTC</div>
                    </td>
                    <td className="px-4 py-3.5 text-[#33302E]">
                      <span className="font-bold text-[#33302E]">{record.heartRate}</span> BPM
                    </td>
                    <td className="px-4 py-3.5 text-[#33302E]">
                      <span className="font-bold text-[#33302E]">{record.bloodPressureSystolic}/{record.bloodPressureDiastolic}</span> mmHg
                    </td>
                    <td className="px-4 py-3.5 text-[#33302E]">
                      <span className="font-bold text-[#33302E]">{record.bloodSugar}</span> mg/dL
                    </td>
                    <td className="px-4 py-3.5 text-[#33302E]">
                      <span className="font-bold text-[#33302E]">{record.bodyTemperature.toFixed(1)}</span> °C
                    </td>
                    <td className="px-4 py-3.5 text-[#33302E]">
                      <span className="font-bold text-[#33302E]">{record.sleepDuration.toFixed(1)}</span> hrs
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded bg-[#F5F0E9] border border-[#E4DAD0] text-[#542B38] font-semibold">
                        {record.mood}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        record.status === 'alert' ? 'bg-[#F9EBEF] text-[#8B3A42] border-[#E8C4CB]' :
                        record.status === 'caution' ? 'bg-[#FAF3E8] text-[#B87D3B] border-[#EBD7BE]' :
                        'bg-[#EBF3EE] text-[#4E7D63] border-[#C6DCCF]'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={(e) => handleDelete(record.id, e)}
                        className="p-1.5 rounded-lg text-[#817A76] hover:text-[#8B3A42] hover:bg-[#F9EBEF] transition"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Detail Modal */}
      {selectedRecordForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-[#FFFCF8] border border-[#E4DAD0] rounded-2xl p-6 max-w-lg w-full shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4DAD0] mb-4">
              <span className="font-bold text-[#33302E] text-sm">
                Record Dossier: {selectedRecordForDetail.id}
              </span>
              <button
                onClick={() => setSelectedRecordForDetail(null)}
                className="text-[#817A76] hover:text-[#33302E] transition font-bold text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-[#33302E]">
                <div className="p-2.5 rounded bg-[#F5F0E9] border border-[#E4DAD0]">
                  <span className="text-[#817A76] block text-[10px]">Date / Time:</span>
                  <span className="text-[#33302E] font-bold">{selectedRecordForDetail.date} @ {selectedRecordForDetail.time} UTC</span>
                </div>
                <div className="p-2.5 rounded bg-[#F5F0E9] border border-[#E4DAD0]">
                  <span className="text-[#817A76] block text-[10px]">Triage Status:</span>
                  <span className="text-[#542B38] font-bold uppercase">{selectedRecordForDetail.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'HR', value: `${selectedRecordForDetail.heartRate} BPM` },
                  { label: 'BP', value: `${selectedRecordForDetail.bloodPressureSystolic}/${selectedRecordForDetail.bloodPressureDiastolic}` },
                  { label: 'Glucose', value: `${selectedRecordForDetail.bloodSugar} mg/dL` },
                  { label: 'Temp', value: `${selectedRecordForDetail.bodyTemperature.toFixed(1)} °C` },
                  { label: 'Sleep', value: `${selectedRecordForDetail.sleepDuration.toFixed(1)} hrs` },
                  { label: 'Mood', value: selectedRecordForDetail.mood },
                ].map((item, i) => (
                  <div key={i} className="p-2 rounded bg-[#F5F0E9] text-center border border-[#E4DAD0]">
                    <span className="text-[#817A76] block text-[9px]">{item.label}</span>
                    <span className="text-[#33302E] font-bold">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded bg-[#F5F0E9] border border-[#E4DAD0]">
                <span className="text-[#817A76] block text-[10px] mb-1">Clinical Flight Notes:</span>
                <p className="text-[#33302E]">{selectedRecordForDetail.notes || 'No specific operational notes recorded.'}</p>
              </div>

              <div className="text-[10px] text-[#817A76] text-center pt-2">
                {selectedRecordForDetail.isUserEntered ? 'Entered manually during mission flight demo.' : 'Simulated Artemis flight baseline reading.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Input Modal */}
      <HealthInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => refreshRecords()}
      />
    </div>
  );
}
