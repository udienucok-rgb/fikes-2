import React, { useState, useRef } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Award,
  Users,
  Building2,
  ArrowRight,
  ChevronRight,
  Calendar,
  ExternalLink,
  BookOpen,
  HeartPulse,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  Stethoscope,
  MapPin,
  Quote,
  Star,
  Activity,
  ArrowUpRight,
  HelpCircle,
  FlaskConical,
  CreditCard,
  Wallet,
  Check,
  Calculator,
  ClipboardPen,
  Image as ImageIcon,
  Upload,
  Sliders,
  RotateCcw,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationTab, NewsArticle, ProgramStudi } from '../types';
import {
  siteConfig,
  programStudiList,
  newsArticles,
  historyTimeline,
  facilitiesList,
  hospitalPartners,
  alumniStories,
  admissionTracks,
} from '../data/fikesData';

interface HomeViewProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenArticle: (article: NewsArticle) => void;
  onSelectProdi: (prodiId: string) => void;
  onOpenQuickRegistration?: (prodiId?: string, jalurId?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateTab,
  onOpenArticle,
  onSelectProdi,
  onOpenQuickRegistration,
}) => {
  const latestNews = newsArticles.slice(0, 3);

  // Active tuition prodi tab for interactive fee breakdown section
  const [activeTuitionProdiId, setActiveTuitionProdiId] = useState<string>('s1-keperawatan');
  const activeTuitionProdi = programStudiList.find((p) => p.id === activeTuitionProdiId) || programStudiList[0];

  // Quick Finder interactive state (inspired by modern Dribbble property/program search)
  const [finderLevel, setFinderLevel] = useState<'all' | 's1' | 'profesi' | 'd3'>('all');
  const [selectedProdiFilter, setSelectedProdiFilter] = useState<string>('all');
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<string>('all');

  // Hero Background Customization (JPG/PNG upload + Preset + Configurable Blur)
  const heroPresets = [
    {
      id: 'default-campus',
      name: 'Gedung Kampus Bintaro',
      url: '/src/assets/images/fikes_campus_hero_1791442646758.jpg',
      type: 'JPG',
    },
    {
      id: 'lab-nursing',
      name: 'Laboratorium Mini Hospital',
      url: '/src/assets/images/nursing_clinical_lab_1791442660064.jpg',
      type: 'JPG',
    },
    {
      id: 'lab-midwifery',
      name: 'Klinik Simulasi Kebidanan',
      url: '/src/assets/images/midwifery_care_lab_1791442674296.jpg',
      type: 'JPG',
    },
    {
      id: 'students-collab',
      name: 'Diskusi Mahasiswa Kesehatan',
      url: '/src/assets/images/fikes_students_discussion_1791442687439.jpg',
      type: 'JPG',
    },
  ];

  const [heroBgUrl, setHeroBgUrl] = useState<string>(heroPresets[0].url);
  const [heroBgName, setHeroBgName] = useState<string>('Gedung Kampus Bintaro');
  const [heroBlurLevel, setHeroBlurLevel] = useState<number>(3); // default 3px blur
  const [heroOpacity, setHeroOpacity] = useState<number>(70); // 70% opacity, clear view
  const [showBgSettings, setShowBgSettings] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleHeroFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type: jpg/png/webp
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type)) {
        alert('Format file harus berupa JPG, PNG, atau WEBP.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (loadEvent.target?.result) {
          setHeroBgUrl(loadEvent.target.result as string);
          setHeroBgName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLevelChange = (lvl: 'all' | 's1' | 'profesi' | 'd3') => {
    setFinderLevel(lvl);
    if (lvl === 's1') setSelectedProdiFilter('s1-keperawatan');
    else if (lvl === 'profesi') setSelectedProdiFilter('profesi-ners');
    else if (lvl === 'd3') setSelectedProdiFilter('d3-kebidanan');
    else setSelectedProdiFilter('all');
  };

  const filteredProdi = programStudiList.filter((p) => {
    if (selectedProdiFilter !== 'all') {
      return p.id === selectedProdiFilter;
    }
    if (finderLevel === 's1') return p.id === 's1-keperawatan';
    if (finderLevel === 'profesi') return p.id === 'profesi-ners';
    if (finderLevel === 'd3') return p.id === 'd3-kebidanan';
    return true;
  });

  const handleFinderSearch = () => {
    if (selectedProdiFilter !== 'all') {
      onSelectProdi(selectedProdiFilter);
      onNavigateTab(selectedProdiFilter as NavigationTab);
    } else if (finderLevel === 's1') {
      onSelectProdi('s1-keperawatan');
      onNavigateTab('s1-keperawatan');
    } else if (finderLevel === 'profesi') {
      onSelectProdi('profesi-ners');
      onNavigateTab('profesi-ners');
    } else if (finderLevel === 'd3') {
      onSelectProdi('d3-kebidanan');
      onNavigateTab('d3-kebidanan');
    } else {
      const target = document.getElementById('programs-section');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 lg:space-y-20">
      {/* 1. HERO SECTION (Clean Architectural Aesthetic with Custom Image & Blur Controls - No Navy Blue) */}
      <section className="relative pt-2 sm:pt-4">
        <div className="relative rounded-3xl lg:rounded-[36px] overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-950 text-white shadow-xl">
          {/* Background Photography with configurable Blur effect & neutral scrim */}
          <div className="min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] w-full relative flex items-center overflow-hidden">
            <img
              src={heroBgUrl}
              alt={heroBgName}
              style={{
                filter: `blur(${heroBlurLevel}px)`,
                opacity: heroOpacity / 100,
                transform: `scale(${1 + heroBlurLevel * 0.02})`, // prevent white blurry borders when blurred
              }}
              className="absolute inset-0 w-full h-full object-cover select-none transition-all duration-500 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* Neutral cinematic dark gradient overlays (NO navy blue, pure neutral scrim for perfect contrast) */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/65 to-neutral-950/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/20 pointer-events-none" />

            {/* Quick Hero Image & Blur Customizer Trigger (Top Right Floating Badge) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
              <button
                onClick={() => setShowBgSettings(!showBgSettings)}
                className="px-3 py-1.5 rounded-full bg-neutral-900/85 hover:bg-neutral-900 text-neutral-200 hover:text-white border border-white/20 text-xs font-medium backdrop-blur-md transition-all shadow-md flex items-center gap-2 cursor-pointer"
                title="Ganti Gambar & Efek Blur Hero"
              >
                <Sliders className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Kustomisasi Background & Blur</span>
                <span className="sm:hidden">Background</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#0066B2]/30 text-sky-300">
                  {heroBlurLevel}px Blur
                </span>
              </button>
            </div>

            {/* Backdrop settings dropdown panel if toggled */}
            <AnimatePresence>
              {showBgSettings && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  className="absolute top-16 right-4 sm:right-6 z-30 w-80 sm:w-96 rounded-2xl bg-neutral-900/95 border border-neutral-700/80 p-4 sm:p-5 text-white shadow-2xl backdrop-blur-xl space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-sky-400" />
                      <span className="text-xs sm:text-sm font-bold text-white">
                        Atur Gambar Hero & Blur
                      </span>
                    </div>
                    <button
                      onClick={() => setShowBgSettings(false)}
                      className="text-neutral-400 hover:text-white p-1 rounded-md text-xs cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>

                  {/* Brand Color Note */}
                  <div className="px-2.5 py-1.5 rounded-lg bg-[#0066B2]/15 border border-[#0066B2]/30 text-sky-200 text-[10px] flex items-center justify-between">
                    <span>Identitas Resmi: Biru Universitas Ichsan Satya</span>
                    <span className="font-mono font-bold bg-[#0066B2] text-white px-1.5 py-0.5 rounded text-[9px]">
                      #0066B2
                    </span>
                  </div>

                  {/* Upload Custom JPG / PNG */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-neutral-300 flex items-center justify-between">
                      <span>Upload Gambar Sendiri (JPG / PNG)</span>
                      <span className="text-[10px] text-sky-400 font-mono">JPG / PNG / WEBP</span>
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleHeroFileUpload}
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2.5 px-3 rounded-xl border border-dashed border-sky-400/50 hover:border-sky-400 bg-[#0066B2]/10 hover:bg-[#0066B2]/20 text-sky-200 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-sky-400" />
                      <span>Pilih File JPG / PNG dari Perangkat</span>
                    </button>
                    {heroBgName && (
                      <p className="text-[10px] text-neutral-400 truncate">
                        File aktif: <span className="text-sky-300 font-mono">{heroBgName}</span>
                      </p>
                    )}
                  </div>

                  {/* Presets Gallery */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-neutral-300">
                      Pilihan Gambar Koleksi FIKES:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {heroPresets.map((preset) => {
                        const isSelected = heroBgUrl === preset.url;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => {
                              setHeroBgUrl(preset.url);
                              setHeroBgName(preset.name);
                            }}
                            className={`p-2 rounded-xl text-left border transition-all text-[11px] flex items-center gap-2 cursor-pointer ${
                              isSelected
                                ? 'border-[#0066B2] bg-[#0066B2]/25 text-white font-medium ring-1 ring-[#0066B2]'
                                : 'border-neutral-800 bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300'
                            }`}
                          >
                            <img
                              src={preset.url}
                              alt={preset.name}
                              className="w-8 h-8 rounded-lg object-cover shrink-0"
                            />
                            <div className="truncate">
                              <p className="truncate font-semibold">{preset.name}</p>
                              <span className="text-[9px] text-neutral-400 font-mono uppercase">
                                {preset.type}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Blur Effect Slider */}
                  <div className="space-y-2 pt-1 border-t border-neutral-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-300 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-sky-400" />
                        Efek Blur Background
                      </span>
                      <span className="font-mono text-sky-300 bg-[#0066B2]/25 px-2 py-0.5 rounded text-[11px]">
                        {heroBlurLevel} px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={24}
                      step={1}
                      value={heroBlurLevel}
                      onChange={(e) => setHeroBlurLevel(Number(e.target.value))}
                      className="w-full accent-[#0066B2] h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-400">
                      <span>0px (Jernih/Tajam)</span>
                      <span>8px (Sedang)</span>
                      <span>16px (Halus)</span>
                      <span>24px (Maksimal)</span>
                    </div>
                  </div>

                  {/* Opacity Slider */}
                  <div className="space-y-2 pt-1 border-t border-neutral-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-300">
                        Intensitas Gambar (Opacity)
                      </span>
                      <span className="font-mono text-sky-300 bg-[#0066B2]/25 px-2 py-0.5 rounded text-[11px]">
                        {heroOpacity}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={90}
                      step={5}
                      value={heroOpacity}
                      onChange={(e) => setHeroOpacity(Number(e.target.value))}
                      className="w-full accent-[#0066B2] h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="pt-2 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setHeroBgUrl(heroPresets[0].url);
                        setHeroBgName(heroPresets[0].name);
                        setHeroBlurLevel(3);
                        setHeroOpacity(70);
                      }}
                      className="text-[11px] text-neutral-400 hover:text-neutral-200 flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Awal</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBgSettings(false)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#0066B2] hover:bg-[#00508C] text-white text-xs font-semibold cursor-pointer"
                    >
                      Selesai
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hero Main Content with comfortable padding-top ensuring the main title is never clipped */}
            <div className="relative z-10 w-full pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 px-6 sm:px-10 lg:px-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Narrative (7 cols) */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="lg:col-span-7 space-y-6 text-left"
                >
                  {/* Subtle top indicator with Ichsan Satya Blue */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066B2]/20 border border-[#0066B2]/40 text-sky-200 text-xs font-medium backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    <span>Penerimaan Mahasiswa Baru 2026/2027 Telah Dibuka</span>
                  </div>

                  {/* High impact typography with signature blue */}
                  <div className="space-y-2.5 pt-1">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-300 block font-mono">
                      Fakultas Ilmu Kesehatan
                    </span>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-[1.15]">
                      Universitas <span className="font-extrabold text-[#38BDF8]">Ichsan Satya</span>
                    </h1>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-200 leading-relaxed max-w-xl text-left">
                    Pusat pendidikan kesehatan unggulan di Bintaro yang memadukan kurikulum berbasis luaran (OBE), simulasi klinis rumah sakit terpadu, serta jejaring rumah sakit pendidikan terakreditasi guna melahirkan ners dan bidan kompeten berdaya saing global.
                  </p>

                  {/* Primary Call to Action buttons in signature Biru Ichsan Satya */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {onOpenQuickRegistration ? (
                      <button
                        onClick={() => onOpenQuickRegistration()}
                        className="px-6 py-3.5 rounded-2xl bg-[#0066B2] hover:bg-[#00508C] text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-[#0066B2]/30 flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                      >
                        <ClipboardPen className="w-4 h-4" />
                        <span>Formulir Pendaftaran Cepat</span>
                      </button>
                    ) : null}

                    <a
                      href={siteConfig.portals.pmbOnline}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm transition-all border border-white/20 backdrop-blur-md flex items-center gap-2 hover:-translate-y-0.5"
                    >
                      <span>PMB Online</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => {
                        const el = document.getElementById('programs-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white font-semibold text-xs sm:text-sm transition-all border border-white/10 backdrop-blur-md flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span>Lihat Program Studi</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>

                {/* Right Floating Highlight Badges (5 cols) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5"
                >
                  {/* Floating Card 1: Akreditasi & UKOM */}
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.15 } }}
                    className="p-4 sm:p-5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 hover:border-white/35 shadow-xl shadow-black/20 text-left transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-9 h-9 rounded-xl bg-[#0066B2]/30 backdrop-blur-md text-sky-300 flex items-center justify-center border border-white/10">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-[#0066B2]/30 backdrop-blur-md text-sky-100 font-semibold border border-white/15">
                        LAM-PTKes
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white drop-shadow-xs">
                      Baik Sekali
                    </div>
                    <p className="text-xs text-blue-100/90 mt-0.5">
                      Status akreditasi program studi keperawatan dan kebidanan
                    </p>
                  </motion.div>

                  {/* Floating Card 2: Kelulusan UKOM */}
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.15 } }}
                    className="p-4 sm:p-5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 hover:border-white/35 shadow-xl shadow-black/20 text-left transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-9 h-9 rounded-xl bg-sky-500/25 backdrop-blur-md text-sky-300 flex items-center justify-center border border-white/10">
                        <Activity className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-sky-500/25 backdrop-blur-md text-sky-100 font-semibold border border-white/15">
                        Nasional
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white drop-shadow-xs">
                      96.8% First-Taker
                    </div>
                    <p className="text-xs text-blue-100/90 mt-0.5">
                      Tingkat kelulusan Uji Kompetensi Nasional Ners & Bidan
                    </p>
                  </motion.div>

                  {/* Floating Card 3: RS Jejaring */}
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.15 } }}
                    className="p-4 sm:p-5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 hover:border-white/35 shadow-xl shadow-black/20 text-left sm:col-span-2 lg:col-span-1 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#0066B2]/30 backdrop-blur-md text-sky-300 flex items-center justify-center shrink-0 border border-white/10">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white drop-shadow-xs">
                          20+ Rumah Sakit Jejaring
                        </div>
                        <div className="text-xs text-blue-100/90">
                          RS IMC Bintaro, RSUP Fatmawati, RS Premier & RSUD Tangsel
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Dribbble-Style Smart Finder Strip (Floating Card overlapping hero bottom) */}
        <div className="max-w-5xl mx-auto -mt-6 sm:-mt-8 px-4 relative z-20">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-xl text-left">
            {/* Quick Segmented Tabs */}
            <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-1 border-b border-slate-100 dark:border-slate-800">
              <button
                onClick={() => handleLevelChange('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  finderLevel === 'all'
                    ? 'bg-slate-900 dark:bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Semua Jenjang
              </button>
              <button
                onClick={() => handleLevelChange('s1')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  finderLevel === 's1'
                    ? 'bg-slate-900 dark:bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                S1 Keperawatan (S.Kep.)
              </button>
              <button
                onClick={() => handleLevelChange('profesi')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  finderLevel === 'profesi'
                    ? 'bg-slate-900 dark:bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Profesi Ners (Ns.)
              </button>
              <button
                onClick={() => handleLevelChange('d3')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  finderLevel === 'd3'
                    ? 'bg-slate-900 dark:bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                D3 Kebidanan (A.Md.Keb.)
              </button>
            </div>

            {/* Inputs & Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 items-center">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Pilih Program Studi
                </label>
                <select
                  value={selectedProdiFilter}
                  onChange={(e) => setSelectedProdiFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Program Studi FIKES</option>
                  <option value="s1-keperawatan">S1 Keperawatan (144 SKS)</option>
                  <option value="profesi-ners">Pendidikan Profesi Ners (36 SKS)</option>
                  <option value="d3-kebidanan">D3 Kebidanan (110 SKS)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Jalur Pendaftaran
                </label>
                <select
                  value={selectedTrackFilter}
                  onChange={(e) => setSelectedTrackFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Jalur PMB Online</option>
                  <option value="prestasi">Jalur Prestasi Rapor (Bebas Tes)</option>
                  <option value="reguler">Jalur CBT Online Cepat</option>
                  <option value="alih">Jalur Alih Jenjang / Profesi</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Lokasi Kampus
                </label>
                <div className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="truncate">Kampus Bintaro Jaya Sektor IX</span>
                </div>
              </div>

              <div className="sm:col-span-3 lg:col-span-1 pt-2 sm:pt-0">
                <label className="hidden lg:block text-[11px] font-semibold text-transparent mb-1">
                  Aksi
                </label>
                <button
                  onClick={handleFinderSearch}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Jelajahi Program</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAM STUDI SHOWCASE (Dribbble Card Grid with High Aesthetic) */}
      <section id="programs-section" className="space-y-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="text-left">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
              Kurikulum Berstandar OBE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Program Studi Unggulan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mt-1 leading-relaxed text-left">
              Pilihan jenjang akademik dan vokasi kesehatan dengan akreditasi Baik Sekali LAM-PTKes, didukung sarana laboratorium klinis modern.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 dark:text-slate-400">Total:</span>
            <span className="font-mono font-bold text-[#0066B2] dark:text-sky-300 bg-blue-50 dark:bg-neutral-800 px-2.5 py-1 rounded-md border border-blue-100 dark:border-neutral-700">
              {filteredProdi.length} Program
            </span>
          </div>
        </div>

        {filteredProdi.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {filteredProdi.map((prodi) => (
              <motion.div
                key={prodi.id}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left"
              >
                {/* Image Frame with Badge Overlays */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={prodi.bannerImage}
                    alt={prodi.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-neutral-900/90 text-sky-300 backdrop-blur-md shadow-xs">
                      {prodi.degree}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-[#0066B2] text-white shadow-xs">
                      LAM-PTKes
                    </span>
                  </div>

                  {/* Bottom stats inside image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sky-400" />
                      <span>{prodi.duration}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-sky-400" />
                      <span>{prodi.credits}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#0066B2] dark:group-hover:text-sky-400 transition-colors">
                      {prodi.name}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed text-left">
                      {prodi.overview}
                    </p>

                    {/* Highlights tag list */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                        Laboratorium & Praktik:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {prodi.laboratories.slice(0, 2).map((lab, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 truncate max-w-[200px]"
                          >
                            {lab}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tuition Fee Callout per Semester */}
                    {prodi.tuitionInfo && (
                      <div className="mt-4 p-3 rounded-2xl bg-blue-50/60 dark:bg-neutral-800/80 border border-blue-100 dark:border-neutral-700/80 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-mono font-bold text-[#0066B2] dark:text-sky-400 block">
                            Biaya SPP / 1 Semester:
                          </span>
                          <span className="font-extrabold text-sm text-slate-900 dark:text-white font-mono tabular-nums">
                            {prodi.tuitionInfo.sppSemester}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded-md bg-blue-100 dark:bg-neutral-700 text-[#0066B2] dark:text-sky-300">
                          Bisa Diangsur
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Action Footers */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => {
                        onSelectProdi(prodi.id);
                        onNavigateTab(prodi.id as NavigationTab);
                      }}
                      className="text-xs font-bold text-[#0066B2] dark:text-sky-400 hover:text-blue-800 dark:hover:text-sky-300 flex items-center gap-1"
                    >
                      <span>Detail Biaya & Kurikulum</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {onOpenQuickRegistration && (
                        <button
                          onClick={() => onOpenQuickRegistration(prodi.id)}
                          className="px-3 py-1.5 rounded-xl bg-[#0066B2] hover:bg-[#00508C] text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs cursor-pointer"
                          title={`Daftar Cepat ${prodi.name}`}
                        >
                          <ClipboardPen className="w-3.5 h-3.5" />
                          <span>Daftar Cepat</span>
                        </button>
                      )}
                      <a
                        href={siteConfig.portals.pmbOnline}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#0066B2] hover:bg-blue-50 dark:hover:bg-neutral-700 transition-colors"
                        title="Portal PMB Online UIS"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Tidak ada program yang sesuai dengan filter
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
              Silakan atur kembali kata kunci atau jenjang pilihan Anda.
            </p>
            <button
              onClick={() => handleLevelChange('all')}
              className="px-4 py-2 rounded-xl bg-blue-700 text-white text-xs font-semibold"
            >
              Reset Filter Program
            </button>
          </div>
        )}

        {/* 3.1. INFORMASI BIAYA KULIAH / 1 SEMESTER SELURUH JURUSAN FIKES */}
        <div className="bg-gradient-to-br from-[#0066B2] via-[#005a9e] to-[#004b87] text-white rounded-3xl p-6 sm:p-10 border border-blue-400/30 shadow-2xl shadow-[#0066B2]/20 space-y-8 text-left relative overflow-hidden">
          {/* Subtle ambient light effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-sky-100 font-mono text-xs font-semibold backdrop-blur-xs border border-white/20">
                <CreditCard className="w-3.5 h-3.5 text-sky-200" />
                <span>Transparansi Biaya Pendidikan TA 2026/2027</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Informasi Biaya Kuliah per 1 Semester
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl leading-relaxed">
                Biaya perkuliahan di FIKES Universitas Ichsan Satya dirancang transparan dengan skema cicilan hingga 3 kali per semester untuk mendukung kelancaran studi calon perawat dan bidan.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {onOpenQuickRegistration && (
                <button
                  onClick={() => onOpenQuickRegistration(activeTuitionProdiId)}
                  className="py-3 px-5 rounded-xl bg-white hover:bg-blue-50 text-[#0066B2] font-bold text-xs transition-colors shadow-lg shadow-black/10 inline-flex items-center gap-2 cursor-pointer"
                >
                  <ClipboardPen className="w-3.5 h-3.5" />
                  <span>Daftar Cepat Prodi Ini</span>
                </button>
              )}
              <a
                href={siteConfig.portals.pmbOnline}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs transition-colors border border-white/25 inline-flex items-center gap-1.5 backdrop-blur-xs"
              >
                <span>PMB Online</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3 Program Fee Cards with Motion */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {programStudiList.map((prodi) => {
              const isSelectedTab = activeTuitionProdiId === prodi.id;
              return (
                <motion.div
                  key={prodi.id}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`rounded-2xl p-6 backdrop-blur-md transition-all flex flex-col justify-between space-y-4 shadow-lg ${
                    isSelectedTab
                      ? 'bg-white/20 border-2 border-white ring-2 ring-white/30 shadow-black/20'
                      : 'bg-white/10 border border-white/20 hover:border-white/40 hover:bg-white/15'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/20 text-white font-bold">
                        {prodi.degree}
                      </span>
                      <span className="text-[10px] text-sky-200 font-semibold">
                        {prodi.accreditation.replace('Terakreditasi ', '')}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white">
                      {prodi.name}
                    </h4>

                    <div className="mt-4 p-4 rounded-xl bg-black/20 border border-white/15 space-y-1">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-sky-200 block font-semibold">
                        Biaya SPP / 1 Semester:
                      </span>
                      <div className="text-2xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                        {prodi.tuitionInfo?.sppSemester}
                      </div>
                      <span className="text-[11px] text-blue-100/80 block font-mono tabular-nums">
                        Durasi: {prodi.duration} ({prodi.tuitionInfo?.totalSemester} Semester)
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-xs text-blue-100">
                      <div className="flex justify-between py-1 border-b border-white/15">
                        <span className="text-blue-100/70">Dana Pengembangan:</span>
                        <strong className="font-mono tabular-nums text-white">
                          {prodi.tuitionInfo?.danaPengembangan.split('(')[0]}
                        </strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/15">
                        <span className="text-blue-100/70">Total Estimasi SPP:</span>
                        <strong className="font-mono tabular-nums text-sky-200">
                          {prodi.tuitionInfo?.estimasiTotalSpp || '-'}
                        </strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/15">
                        <span className="text-blue-100/70">Opsi Cicilan:</span>
                        <span className="text-sky-200 font-semibold font-mono tabular-nums">
                          {prodi.id === 'profesi-ners' ? '2x per semester' : '3x per semester'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={() => setActiveTuitionProdiId(prodi.id)}
                      className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 ${
                        isSelectedTab
                          ? 'bg-white text-[#0066B2] shadow-md'
                          : 'bg-white/15 hover:bg-white/25 text-white'
                      }`}
                    >
                      <span>{isSelectedTab ? '✓ Sedang Dilihat di Bawah' : 'Buka Rincian Semester'}</span>
                    </button>
                    <button
                      onClick={() => {
                        onSelectProdi(prodi.id);
                        onNavigateTab(prodi.id as NavigationTab);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-transparent hover:bg-white/10 text-blue-100 hover:text-white font-medium text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Halaman Lengkap Prodi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Semester-by-Semester Fee Breakdown Inspector */}
          <div className="relative z-10 p-6 sm:p-8 rounded-2xl bg-black/20 backdrop-blur-md border border-white/20 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/15">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-sky-200 font-bold block mb-1">
                  Rincian Tiap Semester: {activeTuitionProdi.name}
                </span>
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-sky-200" />
                  <span>Jadwal & Besaran Biaya SPP Tiap Semester</span>
                </h4>
              </div>

              {/* Major Selector Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-black/30 rounded-xl border border-white/15">
                {programStudiList.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveTuitionProdiId(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      activeTuitionProdiId === p.id
                        ? 'bg-white text-[#0066B2] shadow-sm font-bold'
                        : 'text-blue-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {p.name.replace('Pendidikan ', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Animated Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTuitionProdiId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Table of all semesters for this active prodi */}
                <div className="overflow-x-auto rounded-xl border border-white/15 bg-black/25">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-white/10 border-b border-white/15 text-[11px] font-mono uppercase text-sky-200">
                        <th className="py-3 px-3.5 font-semibold">Semester</th>
                        <th className="py-3 px-3.5 font-semibold">Biaya SPP / Semester</th>
                        <th className="py-3 px-3.5 font-semibold hidden sm:table-cell">Status Lab / SKS</th>
                        <th className="py-3 px-3.5 font-semibold">Fokus Perkuliahan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {activeTuitionProdi.tuitionInfo?.semesterFeeBreakdown?.map((item) => (
                        <tr key={item.semester} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-3.5 whitespace-nowrap">
                            <span className="font-mono font-bold text-sky-200 bg-white/15 border border-white/20 px-2 py-0.5 rounded-md">
                              {item.label}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 font-mono tabular-nums font-bold text-white whitespace-nowrap text-sm">
                            {item.spp}
                          </td>
                          <td className="py-3 px-3.5 text-sky-200 font-medium whitespace-nowrap hidden sm:table-cell">
                            {item.biayaSksPraktikum}
                          </td>
                          <td className="py-3 px-3.5 text-blue-100 text-[11px]">
                            {item.keterangan}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 3-Stage Installment Breakdown Card */}
                <div>
                  <h5 className="text-xs font-bold text-blue-100 uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-sky-200" />
                    <span>Skema Pembayaran Cicilan per 1 Semester ({activeTuitionProdi.name})</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeTuitionProdi.tuitionInfo?.skemaCicilan?.map((cicilan, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white/10 border border-white/15 text-left"
                      >
                        <span className="text-[10px] font-mono text-sky-200 uppercase font-bold block mb-1">
                          Tahap {idx + 1}
                        </span>
                        <p className="text-xs font-semibold text-white font-mono tabular-nums">
                          {cicilan}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Installment Banner Note */}
          <div className="relative z-10 p-4 rounded-2xl bg-white/10 border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-100">
            <div className="flex items-center gap-2.5">
              <Wallet className="w-4 h-4 text-sky-200 shrink-0" />
              <span>
                <strong className="text-white">Skema Cicilan Ringan:</strong> SPP per semester dapat dibayarkan dalam skema cicilan bertahap (Tahap 1: Registrasi/KRS, Tahap 2: Jelang UTS, Tahap 3: Jelang UAS).
              </span>
            </div>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20Admin%20FIKES%20UIS,%20saya%20ingin%20tanya%20informasi%20biaya%20kuliah%20per%20semester`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-sky-200 font-bold underline whitespace-nowrap"
            >
              Hubungi Helpdesk PMB
            </a>
          </div>
        </div>
      </section>

      {/* 3.1. EKOSISTEM FAKULTAS UNIVERSITAS ICHSAN SATYA (PRD Section 14) */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-xs text-left space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
              Struktur Institusi Universitas
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Fakultas di Universitas Ichsan Satya
            </h2>
          </div>
          <a
            href={siteConfig.portals.universityWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Kunjungi Website Universitas Ichsan Satya</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed text-left">
          Sebagai universitas multidisiplin terkemuka di Tangerang Selatan, Universitas Ichsan Satya menaungi tiga fakultas strategis yang saling bersinergi dalam inovasi akademik, riset, dan pengabdian masyarakat.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Card 1: FIKES (Active Faculty) */}
          <div className="p-6 rounded-2xl bg-blue-50/70 dark:bg-neutral-800/80 border-2 border-[#0066B2]/70 dark:border-[#0066B2]/60 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#0066B2] text-white">
                  Fakultas Utama
                </span>
                <HeartPulse className="w-5 h-5 text-[#0066B2] dark:text-sky-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Fakultas Ilmu Kesehatan (FIKES)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed text-left">
                Pusat keunggulan pendidikan tenaga kesehatan dengan kurikulum OBE, simulasi klinis rumah sakit, dan akreditasi LAM-PTKes.
              </p>
              <div className="mt-4 pt-3 border-t border-blue-200/60 dark:border-neutral-700 space-y-1.5 text-xs">
                <button
                  onClick={() => {
                    onSelectProdi('s1-keperawatan');
                    onNavigateTab('s1-keperawatan');
                  }}
                  className="w-full text-left font-semibold text-[#0066B2] dark:text-sky-300 hover:underline flex items-center justify-between py-1"
                >
                  <span>• S1 Keperawatan (S.Kep.)</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => {
                    onSelectProdi('profesi-ners');
                    onNavigateTab('profesi-ners');
                  }}
                  className="w-full text-left font-semibold text-[#0066B2] dark:text-sky-300 hover:underline flex items-center justify-between py-1"
                >
                  <span>• Pendidikan Profesi Ners (Ns.)</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => {
                    onSelectProdi('d3-kebidanan');
                    onNavigateTab('d3-kebidanan');
                  }}
                  className="w-full text-left font-semibold text-[#0066B2] dark:text-sky-300 hover:underline flex items-center justify-between py-1"
                >
                  <span>• D3 Kebidanan (A.Md.Keb.)</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: FASILKOM */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  Fakultas Sains & Teknologi
                </span>
                <FlaskConical className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Fakultas Ilmu Komputer (FASILKOM)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed text-left">
                Membina talenta digital dalam bidang rekayasa perangkat lunak, kecerdasan buatan, sistem informasi, dan komputasi awan.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="py-1">• S1 Informatika</div>
                <div className="py-1">• S1 Sistem Informasi</div>
              </div>
            </div>
            <a
              href={siteConfig.portals.universityWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-between"
            >
              <span>Info Fasilkom di Portal UIS</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Card 3: FEB */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  Fakultas Bisnis
                </span>
                <Building2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Fakultas Ekonomi & Bisnis (FEB)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed text-left">
                Mengembangkan calon pemimpin bisnis, akuntan profesional, dan wirausahawan adaptif terhadap era ekonomi digital modern.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="py-1">• S1 Manajemen Bisnis</div>
                <div className="py-1">• S1 Akuntansi Keuangan</div>
              </div>
            </div>
            <a
              href={siteConfig.portals.universityWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center justify-between"
            >
              <span>Info FEB di Portal UIS</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. FASILITAS LABORATORIUM (Dribbble Bento Grid Aesthetic) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="text-left">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
              Infrastruktur Pembelajaran
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Fasilitas Laboratorium Simulasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mt-1 leading-relaxed text-left">
              Menghadirkan lingkungan simulasi menyerupai rumah sakit nyata untuk melatih kesiapan klinis sebelum mahasiswa terjun ke stase praktik.
            </p>
          </div>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilitiesList.map((fac, idx) => (
            <div
              key={fac.id}
              className={`rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left ${
                idx === 0 || idx === 3 ? 'lg:col-span-2' : 'lg:col-span-1'
              }`}
            >
              <div className="h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                <img
                  src={fac.image}
                  alt={fac.name}
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-900/80 text-blue-300 backdrop-blur-xs">
                  {fac.category}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {fac.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed text-left">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <ul className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                    {fac.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. JEJARING RUMAH SAKIT PENDIDIKAN & KLINIK (Trust Grid) */}
      <section className="bg-slate-100/70 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 text-left space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
              Rumah Sakit Pendidikan & Jejaring
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Kemitraan Praktik Klinis Paripurna
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Mahasiswa menjalani rotasi klinik nyata di bawah bimbingan Clinical Instructor bersertifikat.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hospitalPartners.map((hosp) => (
            <div
              key={hosp.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-neutral-800 text-[#0066B2] dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="text-left overflow-hidden">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {hosp.name}
                </h4>
                <div className="text-[11px] font-medium text-[#0066B2] dark:text-sky-300 mt-0.5">
                  {hosp.type}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                  {hosp.stase}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. JALUR PENERIMAAN MAHASISWA BARU (PMB Online Tracks) */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-100 dark:bg-neutral-800 text-[#0066B2] dark:text-sky-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#0066B2] dark:text-sky-400" />
              <span>Penerimaan Mahasiswa Baru & Program Beasiswa</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Jalur Masuk & Beasiswa FIKES UIS
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mt-1.5 leading-relaxed">
              Tersedia 5 jalur pendaftaran unggulan TA 2026/2027: Beasiswa Penuh KIP Kuliah Kemendikbudristek (Bebas SPP 100%), Jalur Prestasi Non-Akademik (Seni/Olahraga/Tahfidz), Jalur Prestasi Rapor Bebas Tes, Reguler CBT Online Cepat, serta Alih Jenjang Ners.
            </p>
          </div>

          {onOpenQuickRegistration && (
            <button
              onClick={() => onOpenQuickRegistration('s1-keperawatan', 'jalur-kip-kuliah')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0066B2] hover:bg-[#00508C] text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <ClipboardPen className="w-4 h-4" />
              <span>Daftar Cepat Sekarang</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {admissionTracks.map((track) => (
            <div
              key={track.id}
              className={`rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between text-left ${
                track.id === 'jalur-kip-kuliah'
                  ? 'bg-gradient-to-br from-[#00477D] via-[#0066B2] to-[#0284C7] text-white border-sky-300 shadow-xl ring-2 ring-sky-400/40'
                  : track.id === 'jalur-prestasi-non-akademik'
                  ? 'bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-500/40 shadow-md ring-1 ring-amber-400/30'
                  : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-xs'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md ${
                      track.id === 'jalur-kip-kuliah'
                        ? 'bg-white/20 text-white border border-white/30'
                        : track.id === 'jalur-prestasi-non-akademik'
                        ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        : 'bg-blue-50 dark:bg-neutral-800 text-[#0066B2] dark:text-sky-300'
                    }`}
                  >
                    {track.tag}
                  </span>
                  {track.id === 'jalur-kip-kuliah' && (
                    <span className="text-[10px] font-bold text-amber-200 flex items-center gap-1 bg-amber-400/25 border border-amber-300/40 px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span>Beasiswa 100%</span>
                    </span>
                  )}
                  {track.id === 'jalur-prestasi-non-akademik' && (
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">
                      <Award className="w-3 h-3" />
                      <span>Seni & Olahraga</span>
                    </span>
                  )}
                  {track.id === 'jalur-prestasi' && (
                    <span className="text-[10px] font-bold text-[#0066B2] dark:text-sky-300 flex items-center gap-1 bg-blue-50 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Bebas Tes</span>
                    </span>
                  )}
                </div>

                <h3
                  className={`text-lg sm:text-xl font-bold tracking-tight ${
                    track.id === 'jalur-kip-kuliah' ? 'text-white' : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {track.title}
                </h3>

                <p
                  className={`text-xs leading-relaxed ${
                    track.id === 'jalur-kip-kuliah'
                      ? 'text-sky-100'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {track.description}
                </p>

                {/* Scholarship benefit badge */}
                {track.scholarshipBenefit && (
                  <div
                    className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                      track.id === 'jalur-kip-kuliah'
                        ? 'bg-white/15 text-white border border-white/25'
                        : track.id === 'jalur-prestasi-non-akademik'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
                        : 'bg-blue-50 dark:bg-neutral-800 text-[#0066B2] dark:text-sky-300 border border-blue-200 dark:border-neutral-700'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-300" />
                    <span className="font-semibold text-[11px] leading-tight">
                      {track.scholarshipBenefit}
                    </span>
                  </div>
                )}

                <div className={`pt-3 border-t space-y-2 ${track.id === 'jalur-kip-kuliah' ? 'border-white/20' : 'border-slate-200/50 dark:border-slate-800'}`}>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider block ${
                      track.id === 'jalur-kip-kuliah' ? 'text-sky-200' : 'text-slate-400'
                    }`}
                  >
                    Persyaratan Utama:
                  </span>
                  <ul className="space-y-1.5 text-xs">
                    {track.requirements.map((req, rIdx) => (
                      <li key={rIdx} className="flex items-center gap-2">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 ${
                            track.id === 'jalur-kip-kuliah'
                              ? 'text-sky-200'
                              : track.id === 'jalur-prestasi-non-akademik'
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-[#0066B2] dark:text-sky-400'
                          }`}
                        />
                        <span
                          className={
                            track.id === 'jalur-kip-kuliah'
                              ? 'text-white'
                              : 'text-slate-700 dark:text-slate-300'
                          }
                        >
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={`pt-5 mt-5 border-t space-y-3 ${track.id === 'jalur-kip-kuliah' ? 'border-white/20' : 'border-slate-200/50 dark:border-slate-800'}`}>
                <div
                  className={`text-[11px] font-mono ${
                    track.id === 'jalur-kip-kuliah'
                      ? 'text-sky-200'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {track.deadline}
                </div>

                {onOpenQuickRegistration ? (
                  <button
                    onClick={() =>
                      onOpenQuickRegistration(
                        track.id === 'jalur-alih-jenjang' ? 'profesi-ners' : 's1-keperawatan',
                        track.id
                      )
                    }
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                      track.id === 'jalur-kip-kuliah'
                        ? 'bg-white hover:bg-sky-50 text-[#0066B2] shadow-md font-extrabold'
                        : track.id === 'jalur-prestasi-non-akademik'
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-[#0066B2] hover:bg-[#00508C] text-white'
                    }`}
                  >
                    <ClipboardPen className="w-3.5 h-3.5" />
                    <span>Daftar Cepat Jalur Ini</span>
                  </button>
                ) : (
                  <a
                    href={siteConfig.portals.pmbOnline}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm ${
                      track.id === 'jalur-kip-kuliah'
                        ? 'bg-white hover:bg-sky-50 text-[#0066B2] font-extrabold'
                        : 'bg-[#0066B2] hover:bg-[#00508C] text-white'
                    }`}
                  >
                    <span>Daftar Jalur Ini</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. KISAH SUKSES ALUMNI (Testimonial Cards) */}
      <section className="space-y-8">
        <div className="text-left">
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
            Jejak Prestasi Lulusan
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Kisah Sukses Alumni FIKES UIS
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mt-1 leading-relaxed text-left">
            Lulusan Fakultas Ilmu Kesehatan Universitas Ichsan Satya tersebar di rumah sakit rujukan nasional hingga fasilitas kesehatan internasional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {alumniStories.map((story) => (
            <div
              key={story.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between text-left space-y-4"
            >
              <div className="space-y-3">
                <Quote className="w-7 h-7 text-blue-600/40 dark:text-blue-400/40" />
                <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed text-left">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {story.name}
                </h4>
                <div className="text-[11px] font-semibold text-blue-700 dark:text-blue-400">
                  {story.role}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {story.workplace} · <span className="font-mono">{story.graduationYear}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. KILASAN SEJARAH & TRANSFORMASI (Timeline Stepper) */}
      <section className="bg-gradient-to-br from-[#0066B2] via-[#005a9e] to-[#004b87] text-white rounded-3xl lg:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-blue-400/30 shadow-2xl shadow-[#0066B2]/20 text-left relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold tracking-wider uppercase text-sky-200">
              Transformasi Institusi
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Dari STIKes Menuju Universitas Ichsan Satya
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed text-left">
              Perjalanan lebih dari satu setengah dekade dalam mencetak tenaga kesehatan berintegritas moral luhur, berawal dari STIKes HMS Bintaro (2007) hingga bertransformasi menjadi Universitas Ichsan Satya (2022).
            </p>
            <button
              onClick={() => onNavigateTab('sejarah')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-blue-50 text-[#0066B2] font-bold text-xs transition-colors shadow-lg shadow-black/10 cursor-pointer"
            >
              <span>Lihat Timeline Sejarah Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {historyTimeline.map((item) => (
              <div
                key={item.year}
                className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-xl font-bold text-white mb-1">
                    {item.year}
                  </div>
                  <div className="text-xs font-bold text-white mb-1 leading-snug">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-blue-100/80 line-clamp-3">
                    {item.subtitle}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-white/15 text-[9px] font-mono text-sky-200">
                  {item.milestoneBadge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BERITA & AGENDA KAMPUS TERKINI */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="text-left">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
              Publikasi & Agenda Resmi
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Kabar Kampus Terkini
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mt-1 leading-relaxed text-left">
              Kumpulan artikel berita, pengumuman surat edaran, serta agenda seminar nasional FIKES UIS.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('berita')}
            className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Arsip Berita Lengkap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((article) => (
            <div
              key={article.id}
              onClick={() => onOpenArticle(article)}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between text-left hover:-translate-y-1"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenArticle(article);
                }
              }}
            >
              <div className="h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-white/90 dark:bg-slate-900/90 text-blue-800 dark:text-blue-300 backdrop-blur-xs">
                  {article.categoryLabel}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-2 font-mono">
                    <Calendar className="w-3 h-3 text-blue-600" />
                    <span>{article.date}</span>
                    <span>·</span>
                    <Clock className="w-3 h-3 text-blue-600" />
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed text-left">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-700 dark:text-blue-400">
                  <span className="text-[11px] text-slate-400 font-normal">
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Baca Selengkapnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
