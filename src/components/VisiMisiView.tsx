import React from 'react';
import { facultyVisiMisi } from '../data/fikesData';
import { Target, Compass, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const VisiMisiView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Visi */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-neutral-800 flex items-center justify-center text-blue-700 dark:text-blue-400">
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider font-mono">
            Visi Fakultas
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Visi FIKES Universitas Ichsan Satya
        </h2>

        <blockquote className="p-5 sm:p-6 rounded-2xl bg-blue-50/60 dark:bg-neutral-800 border border-blue-200/80 dark:border-neutral-700 text-base sm:text-lg font-medium italic text-slate-800 dark:text-slate-200 leading-relaxed text-left">
          "{facultyVisiMisi.visi}"
        </blockquote>
      </div>

      {/* Misi & Tujuan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Misi */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
              Misi Fakultas
            </h3>
          </div>

          <ul className="space-y-3.5">
            {facultyVisiMisi.misi.map((m, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-neutral-700 text-emerald-800 dark:text-emerald-200 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-left">{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tujuan */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center text-sky-700 dark:text-sky-400">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
              Tujuan Strategis
            </h3>
          </div>

          <ul className="space-y-3.5">
            {facultyVisiMisi.tujuan.map((t, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-left">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
