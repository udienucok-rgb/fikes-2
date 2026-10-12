import React from 'react';
import {
  Bell,
  ExternalLink,
  Tag,
  Calendar,
  GraduationCap,
  ChevronRight,
  BookOpen,
  Globe,
  UserCheck,
  FileCheck,
  CreditCard,
} from 'lucide-react';
import { AnnouncementItem, ArticleCategory, NavigationTab } from '../types';
import { siteConfig } from '../data/fikesData';

interface SidebarProps {
  announcements: AnnouncementItem[];
  selectedCategory: ArticleCategory;
  onSelectCategory: (category: ArticleCategory) => void;
  onNavigateTab: (tab: NavigationTab) => void;
  onAnnouncementClick: (announcement: AnnouncementItem) => void;
  layout?: 'vertical' | 'grid';
}

export const Sidebar: React.FC<SidebarProps> = ({
  announcements,
  selectedCategory,
  onSelectCategory,
  onNavigateTab,
  onAnnouncementClick,
  layout = 'vertical',
}) => {
  const categories: { key: ArticleCategory; label: string; countDesc: string }[] = [
    { key: 'semua', label: 'Semua Kategori', countDesc: 'Arsip Lengkap' },
    { key: 'berita', label: 'Berita', countDesc: 'Seputar Kampus' },
    { key: 'pengumuman', label: 'Pengumuman', countDesc: 'Surat & Edaran' },
    { key: 'event', label: 'Event', countDesc: 'Seminar & Workshop' },
    { key: 'informasi-akademik', label: 'Informasi Akademik', countDesc: 'KRS, Kalender, UKOM' },
  ];

  return (
    <aside className={layout === 'grid' ? 'w-full grid grid-cols-1 md:grid-cols-3 gap-6' : 'w-full space-y-6'}>
      {/* 1. Pengumuman Widget */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-neutral-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-none">
                Pengumuman
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Pemberitahuan Resmi Fakultas
              </p>
            </div>
          </div>
          <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
            Terbaru
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {announcements.length > 0 ? (
            announcements.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => onAnnouncementClick(item)}
                className="group cursor-pointer p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:border-blue-300 dark:hover:border-blue-700/60 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800/80 transition-all text-left"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onAnnouncementClick(item);
                  }
                }}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 mb-1">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    <span>{item.date}</span>
                  </span>
                  {item.important && (
                    <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                      Penting
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {item.title}
                </h4>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>

                <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-blue-700 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Baca selengkapnya</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 px-4 text-center rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
              <Bell className="w-6 h-6 text-slate-400 mx-auto mb-2 opacity-60" />
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Belum ada pengumuman terbaru
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                Silakan periksa kembali beberapa saat lagi.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 2. Tautan Terkait / Sistem Terintegrasi */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs transition-colors">
        <div className="flex items-center gap-2 pb-3.5 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-none">
              Tautan Terkait
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Portal Layanan Digital Kampus
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <a
            href={siteConfig.portals.portalMahasiswa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                  Portal Mahasiswa
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">
                  SIAKAD, KRS & Nilai Online
                </div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </a>

          <a
            href={siteConfig.portals.portalDosen}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                  Portal Dosen
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">
                  Bimbingan PA & Input Nilai
                </div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
          </a>

          <a
            href={siteConfig.portals.universityWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                  Website Universitas
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">
                  Universitas Ichsan Satya
                </div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
          </a>

          <a
            href={siteConfig.portals.pmbOnline}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <FileCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-700 dark:group-hover:text-amber-300">
                  PMB Online UIS
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">
                  Pendaftaran Mahasiswa Baru
                </div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
          </a>

          <a
            href={siteConfig.portals.eLibrary}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                  Perpustakaan Digital
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">
                  E-Books & Jurnal Kesehatan
                </div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </a>

          <button
            onClick={() => onNavigateTab('s1-keperawatan')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-emerald-200/90 dark:border-neutral-700 hover:border-emerald-400 bg-emerald-50/80 dark:bg-neutral-800 hover:bg-emerald-100/60 dark:hover:bg-neutral-700 transition-colors group text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                  Biaya Kuliah / Semester
                </div>
                <div className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80 font-mono">
                  SPP S1, Profesi Ners & D3
                </div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 3. Kategori & Filter Tag System */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs transition-colors">
        <div className="flex items-center gap-2 pb-3.5 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center text-sky-700 dark:text-sky-400">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-none">
              Kategori Artikel
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Filter Berita & Informasi
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  onSelectCategory(cat.key);
                  onNavigateTab('berita');
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-xs font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] ${
                    isActive ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {cat.countDesc}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
