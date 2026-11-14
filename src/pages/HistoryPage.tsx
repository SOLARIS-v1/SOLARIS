import React, { useState, useEffect } from 'react';
import {
  History,
  Search,
  ArrowUpDown,
  Filter,
  Download,
  Trash2,
  Calendar,
  Clock,
  Sparkles,
  Heart,
  Activity,
  Droplets,
  Thermometer,
  Moon,
  Smile
} from 'lucide-react';
import { getHealthRecords, deleteHealthRecord, getAstronautProfile } from '../utils/localStorage';
import { exportHealthRecordsToCSV } from '../utils/exportReport';
import { HealthRecord } from '../types';
import { sound } from '../utils/audio';

export default function HistoryPage() {
  const [records, setRecords] = useState<HealthRecord[]>(getHealthRecords());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const profile = getAstronautProfile();

  const refreshData = () => {
    setRecords(getHealthRecords());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleDelete = (id: string) => {
    sound.playWarning();
    deleteHealthRecord(id);
    refreshData();
  };

  const handleExport = () => {
    sound.playSuccess();
    exportHealthRecordsToCSV(records, profile);
  };

  const filtered = records
    .filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return r.date.includes(q) || r.mood.toLowerCase().includes(q) || (r.notes || '').toLowerCase().includes(q);
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DAD0]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <History className="w-6 h-6 text-[#542B38]" />
            <h1 className="text-2xl font-extrabold text-[#33302E] font-orbitron tracking-wide">
              Complete Flight Health History
            </h1>
          </div>
          <p className="text-xs font-mono text-[#817A76]">
            Immutable log of all simulated baseline and user-entered physiological readings.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFFCF8] hover:bg-[#F5F0E9] border border-[#E4DAD0] hover:border-[#D5BDA4] text-[#33302E] hover:text-[#542B38] font-mono text-xs transition shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export History CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] shadow-sm flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-[#817A76] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search records by date, notes, or mood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5F0E9] border border-[#E4DAD0] focus:border-[#542B38] rounded-xl pl-9 pr-3 py-2 text-[#33302E] placeholder-[#817A76] outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#817A76]">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F5F0E9] border border-[#E4DAD0] focus:border-[#542B38] rounded-lg px-2.5 py-1.5 text-[#33302E] outline-none"
          >
            <option value="all">All States</option>
            <option value="nominal">Nominal (Green)</option>
            <option value="caution">Caution (Yellow)</option>
            <option value="alert">Alert (Red)</option>
          </select>
        </div>

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

      {/* History Timeline Cards */}
      <div className="space-y-3 font-mono text-xs">
        {filtered.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#FFFCF8] border border-[#E4DAD0] text-center text-[#817A76]">
            No telemetry records match query.
          </div>
        ) : (
          filtered.map((record) => (
            <div
              key={record.id}
              className="p-5 rounded-xl bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] transition shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E4DAD0] mb-3">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    record.status === 'alert' ? 'bg-[#8B3A42] animate-ping' :
                    record.status === 'caution' ? 'bg-[#B87D3B]' : 'bg-[#4E7D63]'
                  }`} />
                  <div>
                    <span className="text-[#33302E] font-bold">{record.date}</span>
                    <span className="text-[#817A76] ml-2">@ {record.time} UTC</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                    record.status === 'alert' ? 'bg-[#F9EBEF] text-[#8B3A42] border-[#E8C4CB]' :
                    record.status === 'caution' ? 'bg-[#FAF3E8] text-[#B87D3B] border-[#EBD7BE]' :
                    'bg-[#EBF3EE] text-[#4E7D63] border-[#C6DCCF]'
                  }`}>
                    {record.status}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[#817A76]">
                    {record.isUserEntered ? 'User Logged' : 'Flight Baseline'}
                  </span>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="p-1 rounded text-[#817A76] hover:text-[#8B3A42] hover:bg-[#F9EBEF] transition"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Vitals row */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-[#33302E]">
                <div className="p-2 rounded bg-[#F5F0E9] border border-[#E4DAD0] text-center">
                  <span className="text-[#817A76] block text-[9px]">HEART RATE</span>
                  <span className="text-[#33302E] font-bold">{record.heartRate} BPM</span>
                </div>
                <div className="p-2 rounded bg-[#F5F0E9] border border-[#E4DAD0] text-center">
                  <span className="text-[#817A76] block text-[9px]">BLOOD PRESSURE</span>
                  <span className="text-[#33302E] font-bold">{record.bloodPressureSystolic}/{record.bloodPressureDiastolic}</span>
                </div>
                <div className="p-2 rounded bg-[#F5F0E9] border border-[#E4DAD0] text-center">
                  <span className="text-[#817A76] block text-[9px]">BLOOD SUGAR</span>
                  <span className="text-[#33302E] font-bold">{record.bloodSugar} mg/dL</span>
                </div>
                <div className="p-2 rounded bg-[#F5F0E9] border border-[#E4DAD0] text-center">
                  <span className="text-[#817A76] block text-[9px]">CORE TEMP</span>
                  <span className="text-[#33302E] font-bold">{record.bodyTemperature.toFixed(1)} °C</span>
                </div>
                <div className="p-2 rounded bg-[#F5F0E9] border border-[#E4DAD0] text-center">
                  <span className="text-[#817A76] block text-[9px]">SLEEP DURATION</span>
                  <span className="text-[#33302E] font-bold">{record.sleepDuration.toFixed(1)} hrs</span>
                </div>
                <div className="p-2 rounded bg-[#F5F0E9] border border-[#E4DAD0] text-center">
                  <span className="text-[#817A76] block text-[9px]">MOOD</span>
                  <span className="text-[#542B38] font-bold">{record.mood}</span>
                </div>
              </div>

              {record.notes && (
                <div className="mt-3 text-[11px] text-[#33302E] font-sans">
                  <strong className="text-[#542B38]">Notes:</strong> {record.notes}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
