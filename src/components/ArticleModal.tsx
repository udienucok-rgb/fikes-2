import React from 'react';
import { X, Calendar, Clock, User, Share2, Tag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsArticle, AnnouncementItem } from '../types';

interface ArticleModalProps {
  item: NewsArticle | AnnouncementItem | null;
  onClose: () => void;
  onShowToast?: (title: string, message?: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ item, onClose, onShowToast }) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  const isNews = item && 'categoryLabel' in item;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (onShowToast) {
        onShowToast('Tautan Disalin', 'Tautan informasi berhasil disalin ke clipboard.');
      }
    }
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-y-auto text-slate-900 dark:text-slate-100 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
              <span className="font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-neutral-800 px-2.5 py-0.5 rounded-md">
                {isNews ? (item as NewsArticle).categoryLabel : 'Pengumuman Resmi'}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date}</span>
              </span>
              {isNews && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{(item as NewsArticle).readTime}</span>
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 pr-6 leading-snug">
              {item.title}
            </h2>

            {/* Image if available */}
            {isNews && (item as NewsArticle).image && (
              <div className="rounded-2xl overflow-hidden mb-6 h-56 sm:h-64 bg-slate-100 dark:bg-slate-800">
                <img
                  src={(item as NewsArticle).image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Author / Source */}
            {isNews && (
              <div className="flex items-center gap-2 py-3 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 mb-5">
                <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Rilis oleh: <strong className="text-slate-800 dark:text-slate-200">{(item as NewsArticle).author}</strong></span>
              </div>
            )}

            {/* Article Body */}
            <div className="space-y-3.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed text-left">
              {isNews ? (
                (item as NewsArticle).content.map((p, i) => (
                  <p key={i} className="text-left">{p}</p>
                ))
              ) : (
                <>
                  <p className="text-left font-medium text-slate-800 dark:text-slate-200">
                    {(item as AnnouncementItem).summary}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-left pt-2">
                    Pemberitahuan resmi ini diterbitkan untuk seluruh sivitas akademika Fakultas Ilmu Kesehatan Universitas Ichsan Satya. Apabila memiliki pertanyaan lebih lanjut, silakan menghubungi Bagian Tata Usaha & Kemahasiswaan FIKES UIS pada jam kerja layanan.
                  </p>
                </>
              )}
            </div>

            {/* Footer Actions */}
            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tautan Disalin!' : 'Bagikan Tautan'}</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors cursor-pointer shadow-sm"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
