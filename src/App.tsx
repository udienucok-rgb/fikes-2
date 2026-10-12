import React, { useState, useEffect } from 'react';
import { NavigationTab, ArticleCategory, NewsArticle, AnnouncementItem } from './types';
import { announcements, newsArticles, siteConfig } from './data/fikesData';
import { Header } from './components/Header';
import { Breadcrumb } from './components/Breadcrumb';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { TimelineSejarah } from './components/TimelineSejarah';
import { VisiMisiView } from './components/VisiMisiView';
import { StrukturOrganisasiView } from './components/StrukturOrganisasiView';
import { LeadershipView } from './components/LeadershipView';
import { ProgramStudiView } from './components/ProgramStudiView';
import { AkademikView } from './components/AkademikView';
import { BeritaView } from './components/BeritaView';
import { RisetPublikasiView } from './components/RisetPublikasiView';
import { ContactSection } from './components/ContactSection';
import { ArticleModal } from './components/ArticleModal';
import { QuickRegistrationModal } from './components/QuickRegistrationModal';
import { Toast, ToastMessage } from './components/Toast';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardPen } from 'lucide-react';
import { programStudiList } from './data/fikesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('beranda');
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(false);
  const [registrationProdiId, setRegistrationProdiId] = useState<string>('s1-keperawatan');
  const [registrationJalurId, setRegistrationJalurId] = useState<string | undefined>(undefined);

  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({
      id: Date.now().toString(),
      title,
      message,
      type,
    });
  };

  const handleOpenRegistration = (prodiId?: string, jalurId?: string) => {
    if (prodiId) {
      setRegistrationProdiId(prodiId);
    }
    if (jalurId) {
      setRegistrationJalurId(jalurId);
    }
    setIsRegistrationOpen(true);
  };
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fikes_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>('semua');
  const [selectedProdiId, setSelectedProdiId] = useState<string>('s1-keperawatan');
  const [modalItem, setModalItem] = useState<NewsArticle | AnnouncementItem | null>(null);

  // Sync dark mode class with html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fikes_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fikes_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleNavigate = (tab: NavigationTab) => {
    setActiveTab(tab);
    if (tab === 's1-keperawatan' || tab === 'profesi-ners' || tab === 'd3-kebidanan') {
      setSelectedProdiId(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate breadcrumb items according to active tab
  const getBreadcrumbItems = () => {
    switch (activeTab) {
      case 'sejarah':
        return [
          { label: 'Profil' },
          { label: 'Sejarah Institusi', tab: 'sejarah' as NavigationTab },
        ];
      case 'visi-misi':
        return [
          { label: 'Profil' },
          { label: 'Visi & Misi', tab: 'visi-misi' as NavigationTab },
        ];
      case 'struktur-organisasi':
        return [
          { label: 'Profil' },
          { label: 'Struktur Organisasi', tab: 'struktur-organisasi' as NavigationTab },
        ];
      case 'pimpinan':
        return [
          { label: 'Profil' },
          { label: 'Pimpinan Fakultas', tab: 'pimpinan' as NavigationTab },
        ];
      case 's1-keperawatan':
        return [
          { label: 'Program Studi' },
          { label: 'S1 Keperawatan', tab: 's1-keperawatan' as NavigationTab },
        ];
      case 'profesi-ners':
        return [
          { label: 'Program Studi' },
          { label: 'Pendidikan Profesi Ners', tab: 'profesi-ners' as NavigationTab },
        ];
      case 'd3-kebidanan':
        return [
          { label: 'Program Studi' },
          { label: 'D3 Kebidanan', tab: 'd3-kebidanan' as NavigationTab },
        ];
      case 'akademik':
        return [
          { label: 'Akademik & Portals', tab: 'akademik' as NavigationTab },
        ];
      case 'berita':
        return [
          { label: 'Informasi & Berita', tab: 'berita' as NavigationTab },
        ];
      case 'riset-publikasi':
        return [
          { label: 'Riset & Publikasi', tab: 'riset-publikasi' as NavigationTab },
        ];
      case 'kontak':
        return [
          { label: 'Kontak & Lokasi', tab: 'kontak' as NavigationTab },
        ];
      default:
        return [];
    }
  };

  const isHome = activeTab === 'beranda';
  const breadcrumbItems = getBreadcrumbItems();

  // Dynamic SEO meta and document.title synchronization (PRD Section 27)
  useEffect(() => {
    const seoMap: Record<NavigationTab, { title: string; desc: string }> = {
      beranda: {
        title: 'FIKES Universitas Ichsan Satya | Fakultas Ilmu Kesehatan',
        desc: 'Website resmi Fakultas Ilmu Kesehatan Universitas Ichsan Satya (FIKES UIS) - informasi program studi S1 Keperawatan, Profesi Ners, D3 Kebidanan, profil institusi, sejarah, akademik, dan PMB.',
      },
      sejarah: {
        title: 'Sejarah Institusi FIKES - Universitas Ichsan Satya',
        desc: 'Informasi sejarah dan rekam jejak transformasi Fakultas Ilmu Kesehatan Universitas Ichsan Satya dari STIKes HMS Bintaro (2007) hingga Universitas Ichsan Satya (2022).',
      },
      'visi-misi': {
        title: 'Visi & Misi FIKES - Universitas Ichsan Satya',
        desc: 'Visi, misi, dan tujuan strategis Fakultas Ilmu Kesehatan Universitas Ichsan Satya dalam menghasilkan tenaga kesehatan profesional berintegritas tinggi.',
      },
      'struktur-organisasi': {
        title: 'Struktur Organisasi - FIKES Universitas Ichsan Satya',
        desc: 'Tata kelola kepemimpinan dan bagan struktur organisasi Fakultas Ilmu Kesehatan Universitas Ichsan Satya.',
      },
      pimpinan: {
        title: 'Pimpinan Fakultas - FIKES Universitas Ichsan Satya',
        desc: 'Profil Dekan, Wakil Dekan, dan Ketua Program Studi Fakultas Ilmu Kesehatan Universitas Ichsan Satya.',
      },
      's1-keperawatan': {
        title: 'Program Studi S1 Keperawatan - FIKES Universitas Ichsan Satya',
        desc: 'Program Studi S1 Keperawatan (S.Kep.) FIKES UIS, akreditasi Baik Sekali LAM-PTKes, kurikulum OBE, simulasi klinis rumah sakit, dan prospek karir perawat global.',
      },
      'profesi-ners': {
        title: 'Pendidikan Profesi Ners - FIKES Universitas Ichsan Satya',
        desc: 'Program Studi Pendidikan Profesi Ners (Ns.) FIKES UIS, rotasi klinik rumah sakit pendidikan terakreditasi, dan persentase kelulusan UKOM 96.8%.',
      },
      'd3-kebidanan': {
        title: 'Program Studi D3 Kebidanan - FIKES Universitas Ichsan Satya',
        desc: 'Program Studi D3 Kebidanan (A.Md.Keb.) FIKES UIS, asuhan kebidanan fisiologis, penanganan kegawatdaruratan maternal neonatal, dan laboratorium APN.',
      },
      akademik: {
        title: 'Informasi Akademik & Portals - FIKES Universitas Ichsan Satya',
        desc: 'Layanan administrasi akademik, akses Portal Mahasiswa SIAKAD, Portal Dosen, dan Kalender Akademik TA 2026/2027 FIKES UIS.',
      },
      berita: {
        title: 'Berita & Pengumuman - FIKES Universitas Ichsan Satya',
        desc: 'Kumpulan berita resmi, kegiatan pengabdian masyarakat, agenda seminar nasional, dan pengumuman akademik Fakultas Ilmu Kesehatan Universitas Ichsan Satya.',
      },
      'riset-publikasi': {
        title: 'Riset & Publikasi Ilmiah - FIKES Universitas Ichsan Satya',
        desc: 'Publikasi jurnal ilmiah kesehatan terakreditasi SINTA, prosiding internasional, dan karya pengabdian masyarakat dosen serta mahasiswa FIKES UIS.',
      },
      kontak: {
        title: 'Kontak & Lokasi Kampus - FIKES Universitas Ichsan Satya',
        desc: 'Alamat kampus Bintaro Tangerang Selatan, email resmi fikes@ichsansatya.ac.id, kontak telepon layanan, WhatsApp, dan peta lokasi FIKES UIS.',
      },
    };

    const currentSeo = seoMap[activeTab] || seoMap.beranda;
    document.title = currentSeo.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', currentSeo.desc);

    // Sync window hash for deep-linking
    const newHash = activeTab === 'beranda' ? '' : `#${activeTab}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash || window.location.pathname);
    }
  }, [activeTab]);

  // Listen to hashchange event for back/forward browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavigationTab;
      const validTabs: NavigationTab[] = [
        'beranda',
        'sejarah',
        'visi-misi',
        'struktur-organisasi',
        'pimpinan',
        's1-keperawatan',
        'profesi-ners',
        'd3-kebidanan',
        'akademik',
        'berita',
        'riset-publikasi',
        'kontak',
      ];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      } else if (!hash) {
        setActiveTab('beranda');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-neutral-100 font-sans transition-colors duration-200">
      {/* 1. Header with brand, nav, dark mode toggle, mobile drawer */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onSelectCategory={(cat) => setSelectedCategory(cat as ArticleCategory)}
        onOpenQuickRegistration={handleOpenRegistration}
      />

      {/* 2. Breadcrumb (Shown on internal views) */}
      {!isHome && (
        <Breadcrumb
          items={breadcrumbItems}
          onNavigate={handleNavigate}
        />
      )}

      {/* 3. Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 focus:outline-none overflow-x-clip">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            {isHome ? (
              <div className="space-y-12">
                <HomeView
                  onNavigateTab={handleNavigate}
                  onOpenArticle={(art) => setModalItem(art)}
                  onSelectProdi={(prodiId) => {
                    setSelectedProdiId(prodiId);
                    setActiveTab(prodiId as NavigationTab);
                  }}
                  onOpenQuickRegistration={handleOpenRegistration}
                />

                {/* Quick interactive sidebar section on home */}
                <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
                  <div className="mb-6">
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block font-mono">
                      Layanan & Agenda
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                      Pusat Informasi & Tautan Cepat
                    </h2>
                  </div>
                  <div>
                    <Sidebar
                      announcements={announcements}
                      selectedCategory={selectedCategory}
                      onSelectCategory={(cat) => {
                        setSelectedCategory(cat);
                        handleNavigate('berita');
                      }}
                      onNavigateTab={handleNavigate}
                      onAnnouncementClick={(ann) => setModalItem(ann)}
                      layout="grid"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Internal Pages: Main Content | Sidebar Layout */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Main Content (8 cols on lg) */}
                <div className="lg:col-span-8 space-y-6">
                  {activeTab === 'sejarah' && <TimelineSejarah />}
                  {activeTab === 'visi-misi' && <VisiMisiView />}
                  {activeTab === 'struktur-organisasi' && <StrukturOrganisasiView />}
                  {activeTab === 'pimpinan' && <LeadershipView />}
                  {(activeTab === 's1-keperawatan' ||
                    activeTab === 'profesi-ners' ||
                    activeTab === 'd3-kebidanan') && (
                    <ProgramStudiView
                      initialProdiId={selectedProdiId}
                      onSelectProdi={(id) => setSelectedProdiId(id)}
                      onShowToast={showToast}
                      onOpenQuickRegistration={handleOpenRegistration}
                    />
                  )}
                  {activeTab === 'akademik' && <AkademikView onShowToast={showToast} />}
                  {activeTab === 'berita' && (
                    <BeritaView
                      selectedCategory={selectedCategory}
                      onSelectCategory={setSelectedCategory}
                      onOpenArticle={(art) => setModalItem(art)}
                    />
                  )}
                  {activeTab === 'riset-publikasi' && <RisetPublikasiView onShowToast={showToast} />}
                  {activeTab === 'kontak' && <ContactSection onShowToast={showToast} />}
                </div>

                {/* Sticky Sidebar (4 cols on lg) */}
                <div className="lg:col-span-4 lg:sticky lg:top-24">
                  <Sidebar
                    announcements={announcements}
                    selectedCategory={selectedCategory}
                    onSelectCategory={(cat) => {
                      setSelectedCategory(cat);
                      handleNavigate('berita');
                    }}
                    onNavigateTab={handleNavigate}
                    onAnnouncementClick={(ann) => setModalItem(ann)}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Official Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* 5. Modal Reader for News & Announcements */}
      <ArticleModal
        item={modalItem}
        onClose={() => setModalItem(null)}
        onShowToast={showToast}
      />

      {/* 6. Quick Registration Modal */}
      <QuickRegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        programStudiList={programStudiList}
        initialProdiId={registrationProdiId}
        initialJalurId={registrationJalurId}
        onSuccessToast={(msg) => showToast('Pendaftaran Berhasil!', msg, 'success')}
      />

      {/* 7. Floating Quick Registration Trigger */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleOpenRegistration()}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3 sm:px-4 sm:py-3 rounded-2xl shadow-xl shadow-emerald-950/30 flex items-center gap-2 border border-emerald-400/30 cursor-pointer backdrop-blur-md transition-colors"
        aria-label="Formulir Pendaftaran Cepat PMB"
        title="Buka Formulir Pendaftaran Cepat PMB"
      >
        <div className="relative">
          <ClipboardPen className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold text-blue-200 tracking-wider leading-none">
            PMB 2026/2027
          </span>
          <span className="text-xs font-extrabold text-white leading-tight">
            Daftar Cepat
          </span>
        </div>
      </motion.button>

      {/* 8. Global Feedback Toast */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
