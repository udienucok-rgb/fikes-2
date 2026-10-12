import React, { useState } from 'react';
import {
  Calendar,
  FileText,
  UserCheck,
  GraduationCap,
  ExternalLink,
  BookOpen,
  Search,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  Printer,
  Sparkles,
  CreditCard,
} from 'lucide-react';
import { siteConfig, academicEvents } from '../data/fikesData';

interface AkademikViewProps {
  onShowToast?: (title: string, message?: string) => void;
}

export const AkademikView: React.FC<AkademikViewProps> = ({ onShowToast }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventCategory, setSelectedEventCategory] = useState<string>('semua');

  const categories = [
    { key: 'semua', label: 'Semua Agenda' },
    { key: 'registrasi', label: 'Registrasi & KRS' },
    { key: 'kuliah', label: 'Perkuliahan' },
    { key: 'ujian', label: 'Ujian UTS/UAS' },
    { key: 'stase-klinik', label: 'Stase Klinik RS' },
    { key: 'ukom', label: 'UKOM Nasional' },
  ];

  const filteredEvents = academicEvents.filter((ev) => {
    const matchCat = selectedEventCategory === 'semua' || ev.category === selectedEventCategory;
    const matchQuery =
      searchQuery.trim() === '' ||
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.audience.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleDownloadDoc = (docName: string) => {
    if (onShowToast) {
      onShowToast('Dokumen Diunduh', `${docName} berhasil disimpan.`);
    }
  };

  const handlePrintCalendar = () => {
    window.print();
  };

  return (
    <div className="space-y-8 text-left">
      {/* 1. Header Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-2 font-mono">
          Layanan & Administrasi Perkuliahan
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Informasi Akademik FIKES UIS
        </h1>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-left max-w-3xl">
          Fakultas Ilmu Kesehatan Universitas Ichsan Satya menyediakan sistem informasi akademik terintegrasi untuk mendukung kelancaran studi mahasiswa, mulai dari perencanaan studi (KRS), perkuliahan teori, praktikum laboratorium, rotasi klinik rumah sakit, hingga kelulusan uji kompetensi nasional.
        </p>
      </div>

      {/* 2. Direct Portal Access Grid (High Elevation Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-zinc-900 text-white border border-neutral-700/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-300">
                Layanan Mahasiswa
              </span>
              <UserCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              Portal Mahasiswa (SIAKAD UIS)
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed text-left mb-6">
              Akses kartu rencana studi (KRS), jadwal kuliah semester berjalan, nilai studi (KHS), transkrip sementara, dan bimbingan dosen penasihat akademik online.
            </p>
          </div>
          <a
            href={siteConfig.portals.portalMahasiswa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-sky-50 text-[#0066B2] font-extrabold text-xs transition-colors shadow-sm"
          >
            <span>Masuk ke SIAKAD Mahasiswa</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-zinc-900 text-white border border-neutral-700/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-sky-300">
                Layanan Dosen & Pengajar
              </span>
              <GraduationCap className="w-5 h-5 text-sky-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              Portal Dosen (SIAKAD Dosen)
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed text-left mb-6">
              Akses persetujuan rencana studi mahasiswa bimbingan PA, presensi kelas teori & praktikum, input nilai berkala, dan jadwal mengajar terintegrasi.
            </p>
          </div>
          <a
            href={siteConfig.portals.portalDosen}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0066B2] hover:bg-[#00508C] text-white font-bold text-xs transition-colors shadow-sm"
          >
            <span>Masuk ke SIAKAD Dosen</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 3. Interactive Kalender Akademik TA 2026/2027 */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-neutral-800 text-blue-700 dark:text-blue-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Kalender Akademik TA 2026/2027
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Jadwal resmi perkuliahan, praktikum, ujian, dan stase klinik
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintCalendar}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Jadwal</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedEventCategory(c.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedEventCategory === c.key
                    ? 'bg-blue-700 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kegiatan akademik..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Events Table / Card Feed */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-b border-slate-200/80 dark:border-slate-700/80 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Kegiatan Akademik</th>
                <th className="py-3 px-4">Jadwal / Periode</th>
                <th className="py-3 px-4">Sasaran Mahasiswa</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {ev.title}
                      </div>
                      {ev.description && (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {ev.description}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-blue-700 dark:text-blue-400 whitespace-nowrap">
                      {ev.period}
                    </td>
                    <td className="py-3.5 px-4">
                      {ev.audience}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold ${
                          ev.status === 'ongoing'
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/40'
                            : 'bg-blue-50 dark:bg-neutral-800 text-blue-700 dark:text-blue-300'
                        }`}
                      >
                        {ev.status === 'ongoing' ? 'Sedang Berjalan' : 'Mendatang'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    Tidak ada agenda akademik yang sesuai dengan pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Dokumen & Pedoman Akademik Resmi */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Pedoman & Panduan Akademik Resmi
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-left">
          Unduh dokumen acuan tata tertib, prosedur penulisan karya ilmiah, serta logbook praktik klinis mahasiswa FIKES UIS.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-5 rounded-2xl border border-blue-200/90 dark:border-neutral-700 bg-blue-50/50 dark:bg-neutral-800 flex flex-col justify-between space-y-3">
            <div>
              <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Panduan SPP & Cicilan Semester
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                Rincian SPP per semester (S1: 5.25 Jt, Ners: 7.5 Jt, D3: 4.75 Jt) dan tata cara bayar Virtual Account.
              </p>
            </div>
            <button
              onClick={() => handleDownloadDoc('Panduan SPP dan Skema Cicilan Semester FIKES')}
              className="mt-3 inline-flex items-center justify-between text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline pt-2 border-t border-blue-200/60 dark:border-neutral-700"
            >
              <span>Unduh PDF (1.1 MB)</span>
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col justify-between space-y-3">
            <div>
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Buku Pedoman Akademik FIKES
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Aturan beban SKS, kode etik mahasiswa tenaga kesehatan, dan evaluasi hasil studi.
              </p>
            </div>
            <button
              onClick={() => handleDownloadDoc('Buku Pedoman Akademik FIKES UIS')}
              className="mt-3 inline-flex items-center justify-between text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline pt-2 border-t border-slate-200/60 dark:border-slate-700"
            >
              <span>Unduh PDF (2.4 MB)</span>
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col justify-between space-y-3">
            <div>
              <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2" />
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Buku Logbook Praktik Klinik & OSCE
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Standar operasional stase RS Pendidikan, format SOAP, dan target kompetensi klinis.
              </p>
            </div>
            <button
              onClick={() => handleDownloadDoc('Logbook Praktik Klinik & OSCE')}
              className="mt-3 inline-flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline pt-2 border-t border-slate-200/60 dark:border-slate-700"
            >
              <span>Unduh PDF (1.8 MB)</span>
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col justify-between space-y-3">
            <div>
              <GraduationCap className="w-5 h-5 text-sky-600 dark:text-sky-400 mb-2" />
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Pedoman Skripsi & Tugas Akhir
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Format baku proposal penelitian kesehatan, etika riset biomedis, dan uji plagiarisme.
              </p>
            </div>
            <button
              onClick={() => handleDownloadDoc('Pedoman Skripsi & LTA')}
              className="mt-3 inline-flex items-center justify-between text-xs font-semibold text-sky-700 dark:text-sky-400 hover:underline pt-2 border-t border-slate-200/60 dark:border-slate-700"
            >
              <span>Unduh PDF (1.5 MB)</span>
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
