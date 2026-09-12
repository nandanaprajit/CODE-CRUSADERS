import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, Clock, Filter, AlertTriangle, CheckCircle } from 'lucide-react';

const INITIAL_ROWS = [
  { id: 'CUST-8821', tier: 'Enterprise', mrr: '$4,200', churn_prob: '88%', status: 'Flagged', flag: 'High Risk' },
  { id: 'CUST-8822', tier: 'ENT (dup)', mrr: '-$150', churn_prob: '12%', status: 'Error', flag: 'Negative Rev' },
  { id: 'CUST-8823', tier: 'Pro', mrr: '$890', churn_prob: '94%', status: 'Flagged', flag: 'Zero Logins' },
  { id: 'CUST-8824', tier: 'Starter', mrr: 'NULL', churn_prob: '45%', status: 'Missing', flag: 'Missing Data' },
  { id: 'CUST-8825', tier: 'Enterprise', mrr: '$6,100', churn_prob: '91%', status: 'Flagged', flag: 'Contract End' },
  { id: 'CUST-8826', tier: 'pro', mrr: '$890', churn_prob: '15%', status: 'Active', flag: 'Healthy' },
];

export default function Workspace() {
  const [seconds, setSeconds] = useState(600);
  const [filterActive, setFilterActive] = useState(false);
  const [showIncident, setShowIncident] = useState(false);
  const [incidentApplied, setIncidentApplied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleAcknowledge = () => {
    setShowIncident(false);
    setIncidentApplied(true); // Applies the schema change directly to the table
  };

  const currentRows = filterActive
    ? INITIAL_ROWS.filter((r) => r.status === 'Flagged')
    : INITIAL_ROWS;

  return (
    <div className="flex-1 h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg border border-indigo-500/30">
            <FileSpreadsheet size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white">churn_data_raw.csv</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${
                incidentApplied 
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
                  : 'bg-red-500/20 text-red-400 border-red-500/30'
              }`}>
                {incidentApplied ? 'Schema Adjusted (v2)' : 'P1 - Incident Active'}
              </span>
            </div>
            <p className="text-xs text-slate-400">Triage missing rows and reconcile Q3 drop</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs font-mono text-amber-300">
          <Clock size={14} className="text-amber-400" />
          <span>Sprint Deadline: {formatTime(seconds)}</span>
        </div>
      </div>

      {/* Incident Pop-up Banner */}
      {showIncident && (
        <div className="bg-red-950/90 border-b border-red-800 p-3 px-6 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2 text-xs text-red-200">
            <AlertTriangle size={16} className="text-red-400 flex-shrink-0" />
            <span>
              <strong>CRITICAL SPEC CHANGE:</strong> Marketing deprecated the traditional <code className="bg-red-900/60 px-1 py-0.5 rounded">Account Tier</code> taxonomy. Schema requires instant recalibration!
            </span>
          </div>
          <button
            onClick={handleAcknowledge}
            className="text-xs bg-red-600 hover:bg-red-500 font-bold px-3 py-1 rounded text-white shadow transition"
          >
            Acknowledge & Re-index
          </button>
        </div>
      )}

      {/* Post-Incident Notification Tag */}
      {incidentApplied && (
        <div className="bg-emerald-950/40 border-b border-emerald-800/60 px-6 py-2 flex items-center gap-2 text-xs text-emerald-300">
          <CheckCircle size={14} />
          <span>Schema Re-indexed: Deprecated tier tags struck through. Now evaluate enterprise risk with updated baseline.</span>
        </div>
      )}

      {/* Toolbar */}
      <div className="p-3 border-b border-slate-800 bg-slate-900/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterActive(!filterActive)}
            className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
              filterActive
                ? 'bg-indigo-600 border-indigo-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Filter size={13} /> {filterActive ? 'Showing At-Risk (Filtered)' : 'Filter At-Risk Churn'}
          </button>
          {!incidentApplied && (
            <button
              onClick={() => setShowIncident(true)}
              className="text-xs px-3 py-1.5 rounded-lg border border-red-700/60 bg-red-950/40 hover:bg-red-900/60 text-red-200 transition flex items-center gap-1"
            >
              <AlertTriangle size={13} /> Trigger Mid-Sprint Pivot
            </button>
          )}
        </div>
        <span className="text-xs text-slate-400 font-mono">Showing {currentRows.length} records</span>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto p-4">
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-mono border-b border-slate-800">
              <tr>
                <th className="p-3">Customer ID</th>
                <th className="p-3">Account Tier {incidentApplied && <span className="text-red-400 text-[10px]">(Deprecated)</span>}</th>
                <th className="p-3">MRR</th>
                <th className="p-3">Churn Probability</th>
                <th className="p-3">Audit Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {currentRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/30 transition">
                  <td className="p-3 text-slate-200 font-semibold">{row.id}</td>
                  <td className="p-3">
                    <span className={`
                      ${incidentApplied ? 'line-through text-slate-500' : ''} 
                      ${row.tier.includes('(dup)') ? 'text-amber-400' : 'text-slate-300'}
                    `}>
                      {row.tier}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">
                    <span className={row.mrr.startsWith('-') || row.mrr === 'NULL' ? 'text-red-400 font-bold' : ''}>
                      {row.mrr}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">{row.churn_prob}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-sans ${
                      row.status === 'Flagged'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : row.status === 'Error' || row.status === 'Missing'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {row.flag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}