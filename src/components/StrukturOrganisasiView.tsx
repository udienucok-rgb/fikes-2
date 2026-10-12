import React from 'react';
import { Building2, Users, Network, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/fikesData';

export const StrukturOrganisasiView: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs text-left">
        <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-2 font-mono">
          Tata Kelola Institusi
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Struktur Organisasi FIKES UIS
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-left max-w-3xl">
          Fakultas Ilmu Kesehatan Universitas Ichsan Satya dipimpin oleh Dekan yang bertanggung jawab kepada Rektor Universitas Ichsan Satya, didukung oleh jajaran Wakil Dekan, Senat Fakultas, Unit Penjaminan Mutu, serta Ketua Program Studi.
        </p>
      </div>

      {/* Visual Organizational Hierarchy Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6">
          {/* Top: Dekan */}
          <div className="w-full sm:w-80 p-4 rounded-2xl bg-blue-700 text-white text-center shadow-md">
            <span className="text-[10px] uppercase font-mono tracking-wider opacity-80 block">
              Pimpinan Fakultas
            </span>
            <div className="text-base font-bold mt-1">
              Dekan FIKES UIS
            </div>
            <div className="text-xs opacity-90 mt-0.5">
              Dr. Ns. Hj. Ratna Sari, M.Kep., Sp.Kep.MB.
            </div>
          </div>

          <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />

          {/* Tier 2: Senat Fakultas & GPM (Gugus Penjaminan Mutu) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-[500px]">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center">
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono block">
                Pertimbangan & Norma
              </span>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                Senat Fakultas
              </div>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-center">
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono block">
                Pengawasan Internal
              </span>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                Gugus Penjaminan Mutu (GPM)
              </div>
            </div>
          </div>

          <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />

          {/* Tier 3: Wakil Dekan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-[600px]">
            <div className="p-4 rounded-xl border border-blue-200 dark:border-neutral-700 bg-blue-50/50 dark:bg-neutral-800 text-center">
              <span className="text-[10px] text-blue-700 dark:text-blue-400 font-mono font-semibold block">
                Wakil Dekan I
              </span>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                Bidang Akademik & Riset
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                Ns. Hendra Wijaya, S.Kep., M.Kep.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 dark:border-neutral-700 bg-blue-50/50 dark:bg-neutral-800 text-center">
              <span className="text-[10px] text-blue-700 dark:text-blue-400 font-mono font-semibold block">
                Wakil Dekan II
              </span>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                Bidang Kemahasiswaan & Kerjasama
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                Bdn. Sri Wahyuni, SST., M.Keb.
              </div>
            </div>
          </div>

          <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />

          {/* Tier 4: Program Studi */}
          <div className="w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center block mb-3 font-mono">
              Unsur Pelaksana Akademik (Program Studi)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs text-center">
                <div className="text-xs font-bold text-blue-700 dark:text-blue-400">
                  Prodi S1 Keperawatan
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Ketua: Ns. Fitria Nurul, M.Kep.
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs text-center">
                <div className="text-xs font-bold text-blue-700 dark:text-blue-400">
                  Prodi Profesi Ners
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Koordinator Tahap Profesi Klinis
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs text-center">
                <div className="text-xs font-bold text-blue-700 dark:text-blue-400">
                  Prodi D3 Kebidanan
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Ketua: Bdn. Rina Marlina, M.Kes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
