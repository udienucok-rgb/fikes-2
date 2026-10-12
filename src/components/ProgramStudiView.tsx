import React, { useState } from 'react';
import { ProgramStudi } from '../types';
import { programStudiList, siteConfig } from '../data/fikesData';
import {
  GraduationCap,
  Award,
  Clock,
  BookOpen,
  CheckCircle2,
  Briefcase,
  Layers,
  FlaskConical,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Calculator,
  ChevronDown,
  Download,
  Info,
  Wallet,
  Calendar,
  ArrowRight,
  Sparkles,
  Check,
  ClipboardPen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProgramStudiViewProps {
  initialProdiId?: string;
  onSelectProdi?: (id: string) => void;
  onShowToast?: (title: string, message?: string) => void;
  onOpenQuickRegistration?: (prodiId: string, jalurId?: string) => void;
}

export const ProgramStudiView: React.FC<ProgramStudiViewProps> = ({
  initialProdiId = 's1-keperawatan',
  onSelectProdi,
  onShowToast,
  onOpenQuickRegistration,
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialProdiId);
  const [activeSubTab, setActiveSubTab] = useState<'ringkasan' | 'kurikulum' | 'biaya'>('ringkasan');
  const [openSemester, setOpenSemester] = useState<number>(1);
  const [raporScore, setRaporScore] = useState<number>(85);

  const activeProdi =
    programStudiList.find((p) => p.id === selectedId) || programStudiList[0];

  const handleProdiChange = (id: string) => {
    setSelectedId(id);
    setOpenSemester(1);
    if (onSelectProdi) {
      onSelectProdi(id);
    }
  };

  // Scholarship calculation estimate based on average report score
  const calculateScholarship = (score: number) => {
    if (score >= 90) return { discountPercent: 50, note: 'Potongan 50% Dana Pengembangan (Prestasi Unggul)' };
    if (score >= 85) return { discountPercent: 35, note: 'Potongan 35% Dana Pengembangan (Prestasi Madya)' };
    if (score >= 80) return { discountPercent: 20, note: 'Potongan 20% Dana Pengembangan (Prestasi Pratama)' };
    return { discountPercent: 0, note: 'Syarat minimal rata-rata rapor 80 untuk jalur beasiswa prestasi' };
  };

  const scholarshipResult = calculateScholarship(raporScore);

  return (
    <div className="space-y-8 text-left">
      {/* 1. Top Program Switcher Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-wrap sm:flex-nowrap gap-1">
        {programStudiList.map((prodi) => {
          const isActive = prodi.id === activeProdi.id;
          return (
            <button
              key={prodi.id}
              onClick={() => handleProdiChange(prodi.id)}
              className={`flex-1 py-3 px-4 rounded-xl text-left transition-all ${
                isActive
                  ? 'bg-blue-700 text-white shadow-sm font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold">{prodi.name}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-blue-800 text-blue-100'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {prodi.degree}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Hero Banner of Selected Program */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm bg-slate-900 text-white">
        <div className="h-60 sm:h-72 w-full relative">
          <img
            src={activeProdi.bannerImage}
            alt={activeProdi.name}
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-300 mb-3">
            <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{activeProdi.accreditation}</span>
            </span>
            <span className="text-slate-500" aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-blue-200 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeProdi.duration}</span>
            </span>
            <span className="text-slate-500" aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-sky-200 font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{activeProdi.credits}</span>
            </span>
            {activeProdi.tuitionInfo && (
              <>
                <span className="text-slate-500" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-amber-300 font-mono tabular-nums font-bold bg-amber-500/20 px-2.5 py-0.5 rounded-lg border border-amber-400/30">
                  <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                  <span>SPP: {activeProdi.tuitionInfo.sppSemester}</span>
                </span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            Program Studi {activeProdi.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed text-left">
            Gelar Akademik: <span className="text-blue-300 font-semibold">{activeProdi.degree}</span> · Fakultas Ilmu Kesehatan Universitas Ichsan Satya
          </p>
        </div>
      </div>

      {/* 3. Section Navigation Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('ringkasan')}
          className={`pb-3 border-b-2 transition-colors ${
            activeSubTab === 'ringkasan'
              ? 'border-blue-700 text-blue-700 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Ringkasan & Profil Lulusan
        </button>
        <button
          onClick={() => setActiveSubTab('kurikulum')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'kurikulum'
              ? 'border-blue-700 text-blue-700 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>Struktur Kurikulum ({activeProdi.credits})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('biaya')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'biaya'
              ? 'border-blue-700 text-blue-700 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>Biaya Kuliah & Beasiswa</span>
        </button>
      </div>

      {/* 4. Sub-Tab Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSubTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeSubTab === 'ringkasan' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 cols): Overview, Vision & Mission, Graduate Profile */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Deskripsi & Profil Program
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-left">
                {activeProdi.overview}
              </p>
            </div>

            {/* Visi & Misi Prodi */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2 font-mono">
                  Visi Program Studi
                </h3>
                <blockquote className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-neutral-800/80 border border-emerald-200/80 dark:border-neutral-700 text-sm italic text-slate-800 dark:text-slate-200 leading-relaxed text-left">
                  "{activeProdi.vision}"
                </blockquote>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 font-mono">
                  Misi Program Studi
                </h3>
                <ul className="space-y-2.5">
                  {activeProdi.mission.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-neutral-700 text-emerald-800 dark:text-emerald-200 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-left">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Profil Lulusan */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Profil Lulusan & Capaian Pembelajaran
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeProdi.graduateProfiles.map((prof, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {prof.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed text-left">
                      {prof.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (1 col): Key Details, Labs, Career Prospects */}
          <div className="space-y-6">
            {/* PMB Card Action */}
            <div className="bg-gradient-to-br from-blue-800 to-emerald-900 text-white rounded-3xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-2">
                Pendaftaran Mahasiswa Baru
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed mb-5 text-left">
                Penerimaan Mahasiswa Baru Gelombang Berjalan telah dibuka. Daftarkan diri Anda sekarang untuk menjadi calon tenaga kesehatan unggulan.
              </p>
              {onOpenQuickRegistration && (
                <button
                  onClick={() => onOpenQuickRegistration(activeProdi.id)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-emerald-900 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-sm cursor-pointer mb-2.5"
                >
                  <ClipboardPen className="w-3.5 h-3.5 text-blue-700" />
                  <span>Formulir Pendaftaran Cepat</span>
                </button>
              )}
              <a
                href={siteConfig.portals.pmbOnline}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-900/80 hover:bg-emerald-900 text-emerald-100 font-medium text-xs transition-colors border border-emerald-700/50"
              >
                <span>Portal PMB Online UIS</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Quick Tuition Box */}
            {activeProdi.tuitionInfo && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5 font-mono">
                    <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Biaya SPP / Semester</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold">
                    Dapat Diangsur
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-800/80 border border-slate-200 dark:border-neutral-700">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                    Biaya SPP Kuliah per 1 Semester:
                  </span>
                  <div className="text-2xl font-extrabold text-blue-800 dark:text-blue-300 font-mono tabular-nums mt-1">
                    {activeProdi.tuitionInfo.sppSemester}
                  </div>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 block mt-1.5 font-mono tabular-nums">
                    Total Durasi: {activeProdi.duration} ({activeProdi.tuitionInfo.totalSemester} Semester)
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                  <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Dana Pengembangan:</span>
                    <strong className="font-mono tabular-nums text-slate-900 dark:text-white">{activeProdi.tuitionInfo.danaPengembangan}</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Biaya Pendaftaran:</span>
                    <strong className="font-mono tabular-nums text-slate-900 dark:text-white">{activeProdi.tuitionInfo.biayaPendaftaran}</strong>
                  </div>
                </div>

                <button
                  onClick={() => setActiveSubTab('biaya')}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-neutral-700 text-emerald-700 dark:text-emerald-400 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Lihat Rincian Lengkap per Semester</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Kompetensi Utama */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Kompetensi Unggulan</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                {activeProdi.coreCompetencies.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-left">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fasilitas Laboratorium */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Laboratorium & Praktikum</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {activeProdi.laboratories.map((lab, i) => (
                  <li key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-left">
                    {lab}
                  </li>
                ))}
              </ul>
            </div>

            {/* Peluang Karir */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Prospek Karir Lulusan</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {activeProdi.careerProspects.map((car, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">›</span>
                    <span className="text-left">{car}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 5. Sub-Tab: Struktur Kurikulum */}
      {activeSubTab === 'kurikulum' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                  Distribusi Mata Kuliah Berbasis OBE
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                  Kurikulum Akademik {activeProdi.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Total Beban Studi: <span className="font-mono font-bold text-blue-700 dark:text-blue-400">{activeProdi.credits}</span> · Masa Studi: {activeProdi.duration}
                </p>
              </div>

              <button
                onClick={() => {
                  if (onShowToast) {
                    onShowToast('Silabus Disalin', `Informasi kurikulum ${activeProdi.name} siap dicetak atau disimpan.`);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Simpan Panduan Kurikulum</span>
              </button>
            </div>

            {/* Semester Accordion List */}
            <div className="mt-6 space-y-3">
              {activeProdi.curriculum && activeProdi.curriculum.length > 0 ? (
                activeProdi.curriculum.map((sem) => {
                  const isOpen = openSemester === sem.semester;
                  return (
                    <div
                      key={sem.semester}
                      className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/20"
                    >
                      <button
                        onClick={() => setOpenSemester(isOpen ? 0 : sem.semester)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-100/60 dark:hover:bg-slate-800/50 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                            {sem.semester}
                          </span>
                          <div>
                            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                              {sem.title}
                            </h3>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                              {sem.courses.length} Mata Kuliah · {sem.totalSks} SKS
                            </span>
                          </div>
                        </div>

                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left">
                              <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase font-mono">
                                  <th className="py-2.5 px-3">Kode</th>
                                  <th className="py-2.5 px-3">Nama Mata Kuliah</th>
                                  <th className="py-2.5 px-3">SKS</th>
                                  <th className="py-2.5 px-3">Bentuk Pembelajaran</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {sem.courses.map((course, cIdx) => (
                                  <tr key={cIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                    <td className="py-2.5 px-3 font-mono font-semibold text-blue-700 dark:text-blue-400">
                                      {course.code}
                                    </td>
                                    <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200">
                                      {course.name}
                                    </td>
                                    <td className="py-2.5 px-3 font-mono">
                                      {course.sks} SKS
                                    </td>
                                    <td className="py-2.5 px-3">
                                      <span
                                        className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                                          course.type === 'Stase Klinik'
                                            ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300'
                                            : course.type === 'Praktikum'
                                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                        }`}
                                      >
                                        {course.type}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-500 py-4">Data kurikulum sedang dimuat...</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. Sub-Tab: Biaya Kuliah & Simulasi Beasiswa */}
      {activeSubTab === 'biaya' && (
        <div className="space-y-8">
          {/* Top KPI Cards for Active Program Fees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-500/30 dark:border-blue-700/50 shadow-xs text-left">
              <span className="text-[11px] font-mono uppercase font-bold text-blue-700 dark:text-blue-400 block mb-1">
                SPP / 1 Semester
              </span>
              <div className="text-2xl font-extrabold font-mono tabular-nums text-blue-800 dark:text-blue-300">
                {activeProdi.tuitionInfo?.sppSemester}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                Paket perkuliahan & praktikum lab
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs text-left">
              <span className="text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">
                Durasi & Total Semester
              </span>
              <div className="text-2xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
                {activeProdi.duration}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                Total {activeProdi.tuitionInfo?.totalSemester} Semester ({activeProdi.credits})
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs text-left">
              <span className="text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">
                Dana Pengembangan
              </span>
              <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                {activeProdi.tuitionInfo?.danaPengembangan.split('(')[0]}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                Dapat diangsur selama masa studi
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs text-left">
              <span className="text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">
                Estimasi Total SPP
              </span>
              <div className="text-xl font-bold font-mono tabular-nums text-blue-700 dark:text-blue-400">
                {activeProdi.tuitionInfo?.estimasiTotalSpp || '-'}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                Formula all-in tanpa biaya SKS tambahan
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (8 cols): Semester Fee Breakdown Table & Installment Scheme */}
            <div className="lg:col-span-8 space-y-6">
              {/* Detailed Breakdown per Semester Table */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Rincian Biaya Kuliah / 1 Semester ({activeProdi.name})
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Biaya SPP tetap dan transparan untuk setiap semester perkuliahan tanpa kenaikan di tengah jalan.
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-semibold self-start sm:self-auto">
                    <Check className="w-3.5 h-3.5" />
                    Paket SKS & Lab Termasuk
                  </span>
                </div>

                {/* Table Breakdown */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200/90 dark:border-slate-800">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">
                        <th className="py-3 px-3.5 font-semibold">Semester</th>
                        <th className="py-3 px-3.5 font-semibold">Biaya SPP / Semester</th>
                        <th className="py-3 px-3.5 font-semibold hidden sm:table-cell">Status Lab / SKS</th>
                        <th className="py-3 px-3.5 font-semibold">Fokus Perkuliahan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {activeProdi.tuitionInfo?.semesterFeeBreakdown?.map((item) => (
                        <tr key={item.semester} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-3.5 whitespace-nowrap">
                            <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
                              {item.label}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap text-sm">
                            {item.spp}
                          </td>
                          <td className="py-3 px-3.5 text-emerald-700 dark:text-emerald-400 font-medium whitespace-nowrap hidden sm:table-cell">
                            {item.biayaSksPraktikum}
                          </td>
                          <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 text-[11px]">
                            {item.keterangan}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Skema Cicilan */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Skema Pembayaran Cicilan per Semester</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeProdi.tuitionInfo?.skemaCicilan?.map((cicilan, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-left"
                      >
                        <span className="text-[10px] font-mono text-blue-700 dark:text-blue-400 uppercase font-bold block mb-1">
                          Tahapan {idx + 1}
                        </span>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {cicilan}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional notes */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed space-y-1">
                  <p>
                    <strong>Catatan:</strong> {activeProdi.tuitionInfo?.keterangan}
                  </p>
                  <p>
                    Biaya pendaftaran formulir mahasiswa baru: <span className="font-mono font-bold text-slate-900 dark:text-white">{activeProdi.tuitionInfo?.biayaPendaftaran}</span>.
                  </p>
                </div>
              </div>

              {/* Comparison Table Across All FIKES Majors */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                      Tabel Perbandingan Biaya SPP per Semester Seluruh Jurusan FIKES UIS
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Perbandingan langsung besaran SPP 1 semester untuk seluruh pilihan program studi kesehatan.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200/90 dark:border-slate-800">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">
                        <th className="py-3 px-3.5 font-semibold">Program Studi</th>
                        <th className="py-3 px-3.5 font-semibold">Jenjang</th>
                        <th className="py-3 px-3.5 font-semibold">Biaya SPP / Semester</th>
                        <th className="py-3 px-3.5 font-semibold">Durasi Studi</th>
                        <th className="py-3 px-3.5 font-semibold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {programStudiList.map((p) => {
                        const isCurrent = p.id === activeProdi.id;
                        return (
                          <tr
                            key={p.id}
                            className={`${
                              isCurrent
                                ? 'bg-emerald-50/50 dark:bg-neutral-800/50'
                                : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
                            } transition-colors`}
                          >
                            <td className="py-3 px-3.5">
                              <div className="font-semibold text-slate-900 dark:text-white">
                                {p.name}
                              </div>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                {p.degree} · {p.accreditation}
                              </span>
                            </td>
                            <td className="py-3 px-3.5 font-mono">
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                {p.id === 'profesi-ners' ? 'Profesi' : p.id === 'd3-kebidanan' ? 'D3 Vokasi' : 'S1 Sarjana'}
                              </span>
                            </td>
                            <td className="py-3 px-3.5 font-mono font-bold text-blue-800 dark:text-blue-300 text-sm whitespace-nowrap">
                              {p.tuitionInfo?.sppSemester}
                            </td>
                            <td className="py-3 px-3.5 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                              {p.duration} ({p.tuitionInfo?.totalSemester} smstr)
                            </td>
                            <td className="py-3 px-3.5 text-right whitespace-nowrap">
                              {isCurrent ? (
                                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 font-mono px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-neutral-700">
                                  Sedang Dilihat
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleProdiChange(p.id)}
                                  className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                                >
                                  Pilih Jurusan Ini
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column (4 cols): Interactive Scholarship Calculator & Consultation CTA */}
            <div className="lg:col-span-4 space-y-6">
              {/* Scholarship Calculator */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-blue-500/30 dark:border-blue-700/50 shadow-xs space-y-5 text-left">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Simulasi Beasiswa Rapor
                  </h3>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed text-left">
                  Geser nilai rata-rata rapor SMA/SMK Anda untuk menghitung potensi diskon biaya kuliah awal.
                </p>

                <div>
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                      Nilai Rapor:
                    </label>
                    <span className="font-mono font-bold text-blue-700 dark:text-blue-400 text-sm">
                      {raporScore}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="100"
                    value={raporScore}
                    onChange={(e) => setRaporScore(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>70</span>
                    <span>80 (Batas)</span>
                    <span>100</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-neutral-800/80 border border-emerald-200/80 dark:border-neutral-700 text-left space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Estimasi Potongan:</span>
                    <span className="font-mono font-bold text-blue-800 dark:text-blue-300 text-sm">
                      {scholarshipResult.discountPercent}%
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-800 dark:text-blue-200 leading-relaxed">
                    {scholarshipResult.note}
                  </p>
                </div>

                {onOpenQuickRegistration ? (
                  <button
                    onClick={() => onOpenQuickRegistration(activeProdi.id, 'jalur-prestasi')}
                    className="w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <ClipboardPen className="w-3.5 h-3.5" />
                    <span>Daftar Cepat Jalur Prestasi</span>
                  </button>
                ) : (
                  <a
                    href={siteConfig.portals.pmbOnline}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Daftar Jalur Prestasi Sekarang</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Direct Help / Consultation Card */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xs text-left space-y-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase font-bold tracking-wider">
                    Konsultasi Keuangan & PMB
                  </span>
                </div>
                <h4 className="text-base font-bold">
                  Butuh Rincian Skema Cicilan Khusus?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tim Admisi dan Keuangan FIKES UIS siap membantu simulasi pembayaran bertahap sesuai kondisi calon mahasiswa.
                </p>
                <div className="pt-2 flex flex-col gap-2.5">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20Admin%20FIKES%20UIS,%20saya%20ingin%20konsultasi%20mengenai%20rincian%20biaya%20kuliah%20dan%20skema%20cicilan%20untuk%20jurusan%20${encodeURIComponent(activeProdi.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Konsultasi via WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      if (onShowToast) {
                        onShowToast('Informasi Biaya Tersimpan', `Rincian SPP ${activeProdi.name} siap dicetak atau diunduh.`);
                      }
                      window.print();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Cetak Rincian Biaya</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
