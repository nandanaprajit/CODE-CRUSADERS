import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { Award, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';

export interface TraitScore {
  trait: string;
  score: number;
}

export interface EvaluationData {
  scores: TraitScore[];
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-slate-100">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">Simulation Complete</span>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
              <Award className="text-indigo-400" /> Career Reality Profile: Data Strategist
            </h2>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            <RotateCcw size={14} /> Retest Another Role
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
            <h3 className="text-sm font-semibold text-slate-300 mb-2">Cognitive Friction Index</h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.scores}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="trait" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                  <Radar name="Candidate" dataKey="score" stroke="#818cf8" fill="#6366f1" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center">
              <span className="text-xs text-slate-400">Overall Role Alignment</span>
              <p className="text-2xl font-bold text-indigo-400">{data.overallFit}%</p>
            </div>
          </div>

          <div className="space-y-4 flex flex-col justify-between">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
                <CheckCircle2 size={14} /> Observed Strengths
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                {data.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                <AlertCircle size={14} /> Friction Blind Spots
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                {data.blindSpots.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            <div className="bg-indigo-950/30 border border-indigo-500/30 p-4 rounded-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-1">
                The Unfiltered Reality
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{data.unfilteredTruth}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
