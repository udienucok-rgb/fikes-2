import React, { useState } from 'react';
import { researchPublications } from '../data/fikesData';
import { BookOpen, Award, FileText, Search, ExternalLink, Copy, Check, ArrowUpDown } from 'lucide-react';
import { ResearchPublication } from '../types';

interface RisetPublikasiViewProps {
  onShowToast?: (title: string, message?: string) => void;
}

export const RisetPublikasiView: React.FC<RisetPublikasiViewProps> = ({ onShowToast }) => {
  const [filterType, setFilterType] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = researchPublications
    .filter((pub) => {
      const matchType =
        filterType === 'semua' ||
        (filterType === 'sinta' && pub.type.includes('SINTA')) ||
        (filterType === 'internasional' && pub.type.includes('Internasional')) ||
        (filterType === 'pkm' && pub.type.includes('Pengabdian'));

      const matchQuery =
        searchQuery.trim() === '' ||
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchType && matchQuery;
    })
    .sort((a, b) => {
      if (sortOrder === 'desc') return Number(b.year) - Number(a.year);
      return Number(a.year) - Number(b.year);
    });

  const generateCitation = (pub: ResearchPublication) => {
    return `${pub.authors} (${pub.year}). ${pub.title}. ${pub.journal}${pub.doi ? `. DOI: ${pub.doi}` : ''}.`;
  };

  const handleCopyCitation = (pub: ResearchPublication) => {
    const citation = generateCitation(pub);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(citation);
      setCopiedId(pub.id);
      setTimeout(() => setCopiedId(null), 2500);
      if (onShowToast) {
        onShowToast('Sitasi Disalin', 'Format sitasi ilmiah berhasil disalin ke clipboard.');
      }
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* 1. Header Info */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-2 font-mono">
          Tri Dharma Perguruan Tinggi
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Riset, Publikasi Ilmiah & Pengabdian Masyarakat
        </h1>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-left max-w-3xl">
          Sivitas akademika Fakultas Ilmu Kesehatan Universitas Ichsan Satya secara aktif mengembangkan riset terapan di bidang asuhan keperawatan berbasis bukti, kesehatan maternal neonatal, serta inovasi pencegahan stunting dan penyakit degeneratif.
        </p>
      </div>

      {/* 2. Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Type tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType('semua')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              filterType === 'semua'
                ? 'bg-blue-700 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Semua Publikasi ({researchPublications.length})
          </button>
          <button
            onClick={() => setFilterType('sinta')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              filterType === 'sinta'
                ? 'bg-blue-700 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Jurnal SINTA
          </button>
          <button
            onClick={() => setFilterType('internasional')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              filterType === 'internasional'
                ? 'bg-blue-700 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Internasional
          </button>
          <button
            onClick={() => setFilterType('pkm')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              filterType === 'pkm'
                ? 'bg-blue-700 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Pengabdian (PkM)
          </button>
        </div>

        {/* Sort & Search Inputs */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs flex items-center gap-1 shrink-0"
            title={sortOrder === 'desc' ? 'Urutkan dari Terlama' : 'Urutkan dari Terbaru'}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono">{sortOrder === 'desc' ? 'Terbaru' : 'Terlama'}</span>
          </button>

          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul, peneliti..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 3. Publications Feed with Citation Copying */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((pub) => {
            const isCopied = copiedId === pub.id;
            return (
              <div
                key={pub.id}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs text-left hover:border-blue-500/40 transition-colors space-y-3"
              >
                {/* Unboxed Metadata Header */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-blue-700 dark:text-blue-400 font-mono">
                    {pub.type}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{pub.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{pub.category}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {pub.title}
                </h3>

                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Penulis: </span>
                  {pub.authors}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex flex-wrap items-center gap-3 text-slate-500 dark:text-slate-400">
                    <span className="font-medium italic">{pub.journal}</span>
                    {pub.doi && (
                      <span className="font-mono text-[11px] text-blue-700 dark:text-blue-400">
                        DOI: {pub.doi}
                      </span>
                    )}
                  </div>

                  {/* Copy citation button */}
                  <button
                    onClick={() => handleCopyCitation(pub)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-blue-700 dark:text-blue-400 font-semibold">Sitasi Disalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Salin Sitasi (APA)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Tidak ada publikasi yang cocok dengan pencarian
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Silakan ganti kata kunci pencarian atau pilih kategori lainnya.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
