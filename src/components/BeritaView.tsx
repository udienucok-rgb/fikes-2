import React, { useState } from 'react';
import { NewsArticle, ArticleCategory } from '../types';
import { newsArticles } from '../data/fikesData';
import { Search, Calendar, Clock, ChevronRight, User, Tag, ChevronLeft, X } from 'lucide-react';

interface BeritaViewProps {
  selectedCategory: ArticleCategory;
  onSelectCategory: (cat: ArticleCategory) => void;
  onOpenArticle: (article: NewsArticle) => void;
}

export const BeritaView: React.FC<BeritaViewProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenArticle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const categories: { key: ArticleCategory; label: string }[] = [
    { key: 'semua', label: 'Semua Kategori' },
    { key: 'berita', label: 'Berita' },
    { key: 'pengumuman', label: 'Pengumuman' },
    { key: 'event', label: 'Event' },
    { key: 'informasi-akademik', label: 'Informasi Akademik' },
  ];

  // Calculate counts for each category
  const getCategoryCount = (key: ArticleCategory) => {
    if (key === 'semua') return newsArticles.length;
    return newsArticles.filter((item) => item.category === key).length;
  };

  const filteredArticles = newsArticles.filter((item) => {
    const matchCategory =
      selectedCategory === 'semua' || item.category === selectedCategory;

    const matchQuery =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchQuery;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (cat: ArticleCategory) => {
    onSelectCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8 text-left">
      {/* 1. Header Info */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-2 font-mono">
          Kanal Publikasi & Kabar Kampus
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Berita, Event & Pengumuman FIKES UIS
        </h1>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-left max-w-3xl">
          Ikuti perkembangan terkini seputar kegiatan akademik, prestasi mahasiswa, seminar nasional, pengabdian masyarakat, dan kebijakan resmi Fakultas Ilmu Kesehatan Universitas Ichsan Satya.
        </p>
      </div>

      {/* 2. Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((c) => {
            const isActive = selectedCategory === c.key;
            const count = getCategoryCount(c.key);
            return (
              <button
                key={c.key}
                onClick={() => handleCategoryChange(c.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-700 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{c.label}</span>
                <span
                  className={`text-[10px] font-mono ${
                    isActive ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Cari kabar atau surat edaran..."
            className="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Hapus pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Articles Grid */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedArticles.length > 0 ? (
            paginatedArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onOpenArticle(article)}
                className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-500/50 transition-all duration-300 flex flex-col text-left"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenArticle(article);
                  }
                }}
              >
                {/* Thumbnail Image */}
                <div className="h-44 sm:h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-900/85 text-blue-300 backdrop-blur-xs">
                    {article.categoryLabel}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Unboxed metadata per Section 1.A zero-pill rule */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mb-2">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        <span>{article.date}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed text-left">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-700 dark:text-blue-400">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Baca Rilis</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Tag className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Belum ada artikel pada kriteria ini
              </p>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                Silakan ganti kata kunci pencarian atau pilih kategori lainnya.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  onSelectCategory('semua');
                }}
                className="px-4 py-2 rounded-xl bg-blue-700 text-white text-xs font-semibold"
              >
                Tampilkan Semua Kabar
              </button>
            </div>
          )}
        </div>

        {/* 4. Pagination Controls */}
        {filteredArticles.length > itemsPerPage && (
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              Halaman <strong className="font-mono text-slate-800 dark:text-slate-200">{currentPage}</strong> dari <strong className="font-mono text-slate-800 dark:text-slate-200">{totalPages}</strong> ({filteredArticles.length} artikel)
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Halaman Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Halaman Selanjutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
