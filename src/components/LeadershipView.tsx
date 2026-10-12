import React from 'react';
import { facultyLeaders } from '../data/fikesData';
import { User, Award, BookOpen, Quote } from 'lucide-react';

export const LeadershipView: React.FC = () => {
  const dekan = facultyLeaders[0];
  const otherLeaders = facultyLeaders.slice(1);

  return (
    <div className="space-y-8">
      {/* Dekan Featured Box */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs text-left">
        <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-2 font-mono">
          Pimpinan Fakultas
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
          Dekan Fakultas Ilmu Kesehatan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-1 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/60 border border-blue-100 dark:border-slate-700 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-blue-700 dark:bg-blue-600 text-white flex items-center justify-center text-2xl font-extrabold tracking-tight shadow-md mb-4">
              RS
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {dekan.name}
            </h3>
            <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mt-1">
              {dekan.role}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-mono">
              {dekan.qualification}
            </p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-neutral-800 border border-blue-100 dark:border-neutral-700">
              <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-400">
                <Quote className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">
                  Sambutan Dekan
                </span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic text-left">
                "{dekan.message}"
              </p>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pt-2">
              <strong className="block text-slate-800 dark:text-slate-200">
                Bidang Kepakaran & Fokus Riset:
              </strong>
              <p className="text-left">{dekan.expertise}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Jajaran Wakil Dekan & Ketua Program Studi */}
      <div className="text-left">
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          Wakil Dekan & Ketua Program Studi
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {otherLeaders.map((leader, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {leader.name}
                  </h4>
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mt-0.5">
                    {leader.role}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                    {leader.qualification}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 text-left">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Fokus: </span>
                    {leader.expertise}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
