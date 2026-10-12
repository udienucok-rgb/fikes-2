import React, { useState } from 'react';
import { historyTimeline } from '../data/fikesData';
import {
  Calendar,
  CheckCircle2,
  Building,
  GraduationCap,
  Sparkles,
  ArrowDown,
  ChevronRight,
  Award,
} from 'lucide-react';

export const TimelineSejarah: React.FC = () => {
  const [activeMilestone, setActiveMilestone] = useState<string>(historyTimeline[3].year);

  return (
    <div className="space-y-10">
      {/* Introduction Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-2 font-mono">
            Kilasan Transformasi 2007 – 2022
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Perjalanan Sejarah Fakultas Ilmu Kesehatan Universitas Ichsan Satya
          </h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-left">
            Bermula dari komitmen mulia untuk memenuhi kebutuhan tenaga perawat dan bidan berkompeten di kawasan Bintaro dan Banten, institusi telah menempuh perjalanan transformasi berkelanjutan selama lebih dari satu setengah dekade, berevolusi dari sekolah tinggi kesehatan hingga menjadi fakultas unggulan di bawah naungan Universitas Ichsan Satya.
          </p>
        </div>
      </div>

      {/* Visual Timeline Section */}
      <div className="relative">
        {/* Desktop Step Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {historyTimeline.map((item) => {
            const isSelected = activeMilestone === item.year;
            return (
              <button
                key={item.year}
                onClick={() => setActiveMilestone(item.year)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/70 dark:bg-neutral-800 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xl font-bold text-emerald-800 dark:text-emerald-300">
                    {item.year}
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {item.milestoneBadge}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {item.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Vertical Connected Flow */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 md:before:left-8 before:h-full before:w-0.5 before:bg-emerald-200 dark:before:bg-neutral-700 before:z-0">
          {historyTimeline.map((item, index) => {
            const isHighlight = activeMilestone === item.year;
            return (
              <div
                key={item.year}
                className={`relative z-10 pl-16 md:pl-20 transition-all duration-200 ${
                  isHighlight ? 'scale-[1.01]' : 'opacity-90 hover:opacity-100'
                }`}
              >
                {/* Year Marker Badge */}
                <div
                  className={`absolute left-0 top-3 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-xs md:text-sm shadow-md transition-colors ${
                    isHighlight
                      ? 'bg-emerald-700 text-white ring-4 ring-emerald-100 dark:ring-neutral-800'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className="text-[9px] md:text-[10px] text-emerald-200 dark:text-emerald-400 font-sans font-medium">Tahun</span>
                  <span>{item.year}</span>
                </div>

                {/* Content Box */}
                <div
                  className={`rounded-2xl p-6 border transition-all ${
                    isHighlight
                      ? 'bg-white dark:bg-slate-900 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/20'
                      : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-neutral-800 text-emerald-800 dark:text-emerald-300 font-mono">
                      {item.milestoneBadge}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-left">
                    {item.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      Pencapaian & Jejak Penting:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span className="text-left">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
