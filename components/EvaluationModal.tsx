import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { CheckCircle2, AlertTriangle, RefreshCcw } from 'lucide-react';

export interface EvaluationData {
  scores: {
    trait: string;
    score: number;
  }[];
  overallFit: number;
  strengths: string[];
  blindSpots: string[];
  unfilteredTruth: string;
}

interface EvaluationModalProps {
  isOpen: boolean;
  data: EvaluationData;
  onReset: () => void;
}

export default function EvaluationModal({ isOpen, data, onReset }: EvaluationModalProps) {
  if (!isOpen) return null;

  return (
  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
     <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[92vh] text-slate-100">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">
              Cognitive Apprenticeship Diagnostic
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">Career Reality Profile</h2>
            <p className="text-xs text-slate-400">Target Role: Junior Data / Operations Analyst</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-indigo-400">{data.overallFit}%</div>
            <div className="text-xs text-slate-400">Behavioral Job Fit</div>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {/* Radar Chart */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Cognitive Trait Matrix
            </h4>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.scores}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="trait" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis stroke="#475569" angle={30} domain={[0, 100]} />
                  <Radar
                    name="Candidate"
                    dataKey="score"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown Cards */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <CheckCircle2 size={14} /> Confirmed Strengths
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {data.strengths.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <AlertTriangle size={14} /> Cognitive Friction Points
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {data.blindSpots.map((b, i) => (
                  <li key={i}>• {b}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-900/50">
              <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
                The Unfiltered Reality Check
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{data.unfilteredTruth}"
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            onClick={onReset}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-4 py-2 rounded-lg transition"
          >
            <RefreshCcw size={14} /> Retest Another Role
          </button>
        </div>
      </div>
    </div>
  );
}