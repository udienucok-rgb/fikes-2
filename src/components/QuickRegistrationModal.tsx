import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  ClipboardPen,
  Send,
  Printer,
  Copy,
  ChevronRight,
  ChevronLeft,
  Calendar,
  User,
  GraduationCap,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Search,
  ShieldCheck,
  Award,
  Trophy,
  Star,
  BookOpen,
  FileCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProgramStudi, QuickRegistrationRecord } from '../types';
import { siteConfig } from '../data/fikesData';

interface QuickRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  programStudiList: ProgramStudi[];
  initialProdiId?: string;
  initialJalurId?: string;
  onSuccessToast?: (msg: string) => void;
}

const STORAGE_KEY = 'fikes_uis_registrations_v1';

export const QuickRegistrationModal: React.FC<QuickRegistrationModalProps> = ({
  isOpen,
  onClose,
  programStudiList,
  initialProdiId = 's1-keperawatan',
  initialJalurId,
  onSuccessToast,
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'status'>('form');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchedRecord, setSearchedRecord] = useState<QuickRegistrationRecord | null>(null);
  const [searchNotFound, setSearchNotFound] = useState<boolean>(false);
  const [savedRecords, setSavedRecords] = useState<QuickRegistrationRecord[]>([]);
  const [completedRecord, setCompletedRecord] = useState<QuickRegistrationRecord | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    prodiId: initialProdiId,
    jalurId: initialJalurId || 'jalur-kip-kuliah',
    gelombang: 'Gelombang 1 (TA 2026/2027) - Kuota Beasiswa Aktif',
    fullName: '',
    nik: '',
    gender: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    birthPlace: '',
    birthDate: '',
    religion: 'Islam',
    whatsapp: '',
    email: '',
    address: '',
    city: '',
    previousSchool: '',
    schoolMajor: 'IPA / Kesehatan',
    graduationYear: '2026',
    gpaOrScore: '',
    parentName: '',
    parentPhone: '',
    parentJob: '',
    agreeTerms: true,
    // Data Khusus KIP Kuliah
    kipNumber: '',
    kipCategory: 'Pemegang KIP Siswa',
    // Data Khusus Prestasi Non-Akademik
    prestasiField: 'Olahraga',
    prestasiLevel: 'Provinsi',
    prestasiTitle: '',
    prestasiRank: 'Juara 1 (Emas)',
    prestasiYear: '2026',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Synchronize initial prodi & jalur when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        prodiId: initialProdiId || prev.prodiId,
        jalurId: initialJalurId || prev.jalurId,
      }));
    }
  }, [initialProdiId, initialJalurId, isOpen]);

  // Load saved registrations from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as QuickRegistrationRecord[];
        setSavedRecords(parsed);
      }
    } catch {
      // Ignore storage errors
    }
  }, [isOpen]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedProdi =
    programStudiList.find((p) => p.id === formData.prodiId) || programStudiList[0];

  const jalurOptions = [
    {
      id: 'jalur-kip-kuliah',
      title: 'Jalur Beasiswa KIP Kuliah (Kemendikbudristek)',
      badge: 'Beasiswa 100% SPP Gratis',
      desc: 'Bantuan biaya kuliah penuh & biaya hidup bagi lulusan SMA/SMK pemegang KIP/KKS/PKH/DTKS.',
      benefit: 'Bebas biaya kuliah 100% s.d. lulus + bantuan biaya hidup resmi.',
      category: 'beasiswa-pemerintah',
      tagColor: 'blue',
      isPopular: true,
    },
    {
      id: 'jalur-prestasi-non-akademik',
      title: 'Jalur Prestasi Non-Akademik (Seni & Olahraga)',
      badge: 'Bebas Tes + Beasiswa Juara',
      desc: 'Bagi atlet, pegiat seni budaya, dan penghafal Al-Qur\'an (Tahfidz/MTQ) minimal tingkat Kota.',
      benefit: 'Bebas tes tertulis + Subsidi SPP 25% – 50% selama masa studi.',
      category: 'non-akademik',
      tagColor: 'amber',
      isPopular: false,
    },
    {
      id: 'jalur-prestasi',
      title: 'Jalur Prestasi Rapor & Kemitraan',
      badge: 'Bebas Tes Tertulis',
      desc: 'Nilai rapor semester 1-5 rata-rata ≥ 80.00 tanpa ujian tulis.',
      benefit: 'Potongan biaya gedung awal & bebas ujian tertulis.',
      category: 'akademik',
      tagColor: 'emerald',
      isPopular: false,
    },
    {
      id: 'jalur-cbt-reguler',
      title: 'Jalur Reguler CBT Online',
      badge: 'Hasil Cepat 1 Hari',
      desc: 'Tes potensi akademik online fleksibel dari rumah atau di CBT Center kampus FIKES UIS.',
      benefit: 'Jalur umum bagi seluruh lulusan SMA/SMK/MA sederajat.',
      category: 'reguler',
      tagColor: 'slate',
      isPopular: false,
    },
    {
      id: 'jalur-alih-jenjang',
      title: 'Jalur Alih Jenjang & Profesi Ners',
      badge: 'Khusus Lulusan D3 / S.Kep',
      desc: 'Untuk lulusan D3 Keperawatan lanjut S1, atau sarjana S.Kep lanjut Pendidikan Profesi Ners.',
      benefit: 'Konversi SKS rekognisi lampau (RPL) & jadwal kuliah adaptif.',
      category: 'alih-jenjang',
      tagColor: 'purple',
      isPopular: false,
    },
  ];

  const selectedJalur =
    jalurOptions.find((j) => j.id === formData.jalurId) || jalurOptions[0];

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.prodiId) errs.prodiId = 'Pilih salah satu program studi.';
      if (!formData.jalurId) errs.jalurId = 'Pilih salah satu jalur pendaftaran.';
    } else if (step === 2) {
      if (!formData.fullName.trim()) errs.fullName = 'Nama lengkap wajib diisi.';
      if (!formData.nik.trim() || formData.nik.length < 16) {
        errs.nik = 'NIK harus 16 digit sesuai KTP/KK.';
      }
      if (!formData.birthPlace.trim()) errs.birthPlace = 'Tempat lahir wajib diisi.';
      if (!formData.birthDate) errs.birthDate = 'Tanggal lahir wajib diisi.';
      if (!formData.whatsapp.trim() || formData.whatsapp.length < 10) {
        errs.whatsapp = 'Nomor WhatsApp aktif minimal 10 digit.';
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        errs.email = 'Format email tidak valid.';
      }
      if (!formData.address.trim()) errs.address = 'Alamat domisili wajib diisi.';
      if (!formData.city.trim()) errs.city = 'Kota/Kabupaten wajib diisi.';
    } else if (step === 3) {
      if (!formData.previousSchool.trim()) errs.previousSchool = 'Asal sekolah/institusi wajib diisi.';
      if (!formData.graduationYear.trim()) errs.graduationYear = 'Tahun lulus wajib diisi.';
      if (!formData.parentName.trim()) errs.parentName = 'Nama orang tua/wali wajib diisi.';
      if (!formData.parentPhone.trim()) errs.parentPhone = 'Nomor telepon orang tua wajib diisi.';

      // Jalur-specific validations
      if (formData.jalurId === 'jalur-kip-kuliah') {
        if (!formData.kipNumber.trim()) {
          errs.kipNumber = 'Nomor Pendaftaran KIP Kuliah / No. KIP / KKS / PKH wajib diisi.';
        }
      }
      if (formData.jalurId === 'jalur-prestasi-non-akademik') {
        if (!formData.prestasiTitle.trim()) {
          errs.prestasiTitle = 'Nama kejuaraan / piagam penghargaan prestasi wajib diisi.';
        }
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const regNumber = `PMB-UIS-${new Date().getFullYear()}-${randomSuffix}`;
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(now);

    const isKip = formData.jalurId === 'jalur-kip-kuliah';
    const isPrestasiNonAkademik = formData.jalurId === 'jalur-prestasi-non-akademik';

    const newRecord: QuickRegistrationRecord = {
      id: `reg-${Date.now()}`,
      registrationNumber: regNumber,
      submissionDate: `${formattedDate} WIB`,
      prodiId: selectedProdi.id,
      prodiName: selectedProdi.name,
      degree: selectedProdi.degree,
      sppSemester: isKip
        ? 'Gratis Rp 0 (Beasiswa 100% KIP Kuliah)'
        : isPrestasiNonAkademik
        ? `Subsidi s.d. 50% (${selectedProdi.tuitionInfo?.sppSemester || 'Rp 5.250.000'})`
        : selectedProdi.tuitionInfo?.sppSemester || 'Rp 5.250.000',
      jalurId: selectedJalur.id,
      jalurName: selectedJalur.title,
      fullName: formData.fullName,
      nik: formData.nik,
      gender: formData.gender,
      birthPlace: formData.birthPlace,
      birthDate: formData.birthDate,
      religion: formData.religion,
      whatsapp: formData.whatsapp,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      previousSchool: formData.previousSchool,
      schoolMajor: formData.schoolMajor,
      graduationYear: formData.graduationYear,
      gpaOrScore: formData.gpaOrScore || '84.50',
      parentName: formData.parentName,
      parentPhone: formData.parentPhone,
      parentJob: formData.parentJob || 'Wiraswasta / Karyawan',
      selectionDate: isKip ? '30 April 2027 (Seleksi Kuota KIP)' : '30 November 2026',
      status: 'Menunggu Verifikasi Berkas',
      notes: isKip
        ? 'Pendaftaran Jalur KIP Kuliah. Verifikasi data terhubung dengan sistem KIP Kemendikbudristek.'
        : isPrestasiNonAkademik
        ? 'Pendaftaran Jalur Prestasi Non-Akademik. Sertifikat kejuaraan divalidasi oleh panitia PMB.'
        : 'Formulir terverifikasi sistem online FIKES UIS. Panitia PMB akan menghubungi dalam 1x24 jam kerja.',
      kipNumber: isKip ? formData.kipNumber : undefined,
      kipCategory: isKip ? formData.kipCategory : undefined,
      prestasiField: isPrestasiNonAkademik ? formData.prestasiField : undefined,
      prestasiLevel: isPrestasiNonAkademik ? formData.prestasiLevel : undefined,
      prestasiTitle: isPrestasiNonAkademik ? formData.prestasiTitle : undefined,
      prestasiRank: isPrestasiNonAkademik ? formData.prestasiRank : undefined,
    };

    // Save to localStorage
    const updated = [newRecord, ...savedRecords];
    setSavedRecords(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setCompletedRecord(newRecord);
    if (onSuccessToast) {
      onSuccessToast(`Pendaftaran berhasil! No. Registrasi: ${regNumber}`);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const handleSendToWhatsApp = (record: QuickRegistrationRecord) => {
    const waNumber = siteConfig.whatsapp.replace(/[^0-9]/g, '');
    let extraJalurInfo = '';
    if (record.jalurId === 'jalur-kip-kuliah' && record.kipNumber) {
      extraJalurInfo = `\n• No. Pendaftaran KIP Kuliah: ${record.kipNumber} (${record.kipCategory || 'KIP Siswa'})`;
    } else if (record.jalurId === 'jalur-prestasi-non-akademik' && record.prestasiTitle) {
      extraJalurInfo = `\n• Prestasi Non-Akademik: ${record.prestasiTitle} (${record.prestasiRank || 'Juara'}, Tingkat ${record.prestasiLevel || 'Provinsi'} - ${record.prestasiField || 'Seni/Olahraga'})`;
    }

    const message = encodeURIComponent(
      `Halo Panitia PMB FIKES Universitas Ichsan Satya,\n\nSaya telah mendaftar melalui Formulir Pendaftaran Cepat Online:\n` +
        `• No. Registrasi: ${record.registrationNumber}\n` +
        `• Nama Lengkap: ${record.fullName}\n` +
        `• Program Studi: ${record.prodiName} (${record.degree})\n` +
        `• Jalur Masuk: ${record.jalurName}${extraJalurInfo}\n` +
        `• Status Biaya SPP: ${record.sppSemester}\n` +
        `• No. WhatsApp: ${record.whatsapp}\n\n` +
        `Mohon informasi terkait verifikasi berkas dan jadwal tes kesehatan selanjutnya. Terima kasih!`
    );
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
  };

  const handleSearchRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.trim().toLowerCase();
    const found = savedRecords.find(
      (r) =>
        r.registrationNumber.toLowerCase().includes(q) ||
        r.fullName.toLowerCase().includes(q) ||
        r.whatsapp.includes(q)
    );
    if (found) {
      setSearchedRecord(found);
      setSearchNotFound(false);
    } else {
      setSearchedRecord(null);
      setSearchNotFound(true);
    }
  };

  const resetForm = () => {
    setCompletedRecord(null);
    setCurrentStep(1);
    setFormData({
      prodiId: 's1-keperawatan',
      jalurId: 'jalur-kip-kuliah',
      gelombang: 'Gelombang 1 (TA 2026/2027) - Kuota Beasiswa Aktif',
      fullName: '',
      nik: '',
      gender: 'Laki-laki',
      birthPlace: '',
      birthDate: '',
      religion: 'Islam',
      whatsapp: '',
      email: '',
      address: '',
      city: '',
      previousSchool: '',
      schoolMajor: 'IPA / Kesehatan',
      graduationYear: '2026',
      gpaOrScore: '',
      parentName: '',
      parentPhone: '',
      parentJob: '',
      agreeTerms: true,
      kipNumber: '',
      kipCategory: 'Pemegang KIP Siswa',
      prestasiField: 'Olahraga',
      prestasiLevel: 'Provinsi',
      prestasiTitle: '',
      prestasiRank: 'Juara 1 (Emas)',
      prestasiYear: '2026',
    });
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/75 backdrop-blur-sm transition-opacity"
      />

      {/* Main Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 14 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-hidden z-10"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xs shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0066B2] text-white flex items-center justify-center shadow-sm shrink-0">
              <ClipboardPen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Formulir Pendaftaran Cepat PMB
                </h2>
                <span className="text-[10px] font-semibold text-[#0066B2] dark:text-sky-300 bg-blue-50 dark:bg-neutral-800 px-2 py-0.5 rounded-md border border-blue-100 dark:border-neutral-700">
                  TA 2026/2027
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Fakultas Ilmu Kesehatan · Universitas Ichsan Satya Bintaro
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch */}
            <div className="hidden sm:flex items-center p-1 bg-slate-200 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('form');
                  setSearchedRecord(null);
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'form'
                    ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Pendaftaran Baru
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('status');
                  if (savedRecords.length > 0) {
                    setSearchedRecord(savedRecords[0]);
                  }
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'status'
                    ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Cek Status</span>
                {savedRecords.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-mono">
                    {savedRecords.length}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Tutup Formulir"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Subheader Tab Switcher */}
        <div className="sm:hidden px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/60 flex items-center justify-around text-xs font-medium shrink-0">
          <button
            onClick={() => setActiveTab('form')}
            className={`py-1 px-3 rounded-lg font-semibold ${
              activeTab === 'form'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Pendaftaran Baru
          </button>
          <button
            onClick={() => {
              setActiveTab('status');
              if (savedRecords.length > 0) setSearchedRecord(savedRecords[0]);
            }}
            className={`py-1 px-3 rounded-lg font-semibold flex items-center gap-1.5 ${
              activeTab === 'status'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>Cek Status ({savedRecords.length})</span>
          </button>
        </div>

        {/* Modal Body with scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          {activeTab === 'form' && !completedRecord && (
            <div>
              {/* Step Indicators */}
              <div className="mb-6">
                <div className="grid grid-cols-4 gap-2 sm:gap-4">
                  {[
                    { step: 1, label: 'Pilihan & Jalur', icon: GraduationCap },
                    { step: 2, label: 'Data Pribadi', icon: User },
                    { step: 3, label: 'Pendidikan & Berkas', icon: BookOpen },
                    { step: 4, label: 'Konfirmasi', icon: CheckCircle2 },
                  ].map((s) => {
                    const isActive = currentStep === s.step;
                    const isDone = currentStep > s.step;
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.step}
                        onClick={() => {
                          if (isDone) setCurrentStep(s.step);
                        }}
                        className={`flex flex-col items-center sm:items-start p-2.5 sm:p-3 rounded-2xl border transition-all ${
                          isDone ? 'cursor-pointer' : ''
                        } ${
                          isActive
                            ? 'bg-emerald-50/80 dark:bg-neutral-800 border-emerald-600 dark:border-emerald-500 shadow-xs ring-1 ring-emerald-500/40'
                            : isDone
                            ? 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800'
                            : 'bg-transparent border-slate-200 dark:border-slate-800/60 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-bold ${
                              isDone
                                ? 'bg-emerald-600 text-white'
                                : isActive
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {isDone ? <Check className="w-3.5 h-3.5" /> : s.step}
                          </div>
                          <Icon className="w-3.5 h-3.5 hidden sm:block text-slate-500 dark:text-slate-400" />
                        </div>
                        <span className="text-[11px] sm:text-xs font-semibold text-slate-900 dark:text-white text-center sm:text-left line-clamp-1">
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* STEP 1: Program & Jalur */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        1. Pilih Program Studi Pilihan
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {programStudiList.map((p) => {
                          const isSelected = formData.prodiId === p.id;
                          return (
                            <div
                              key={p.id}
                              onClick={() => setFormData({ ...formData, prodiId: p.id })}
                              className={`cursor-pointer rounded-2xl p-4 border transition-all relative ${
                                isSelected
                                  ? 'bg-emerald-50/70 dark:bg-neutral-800 border-emerald-600 dark:border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                                  : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                                  {p.degree}
                                </span>
                                {isSelected && (
                                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                    <Check className="w-3 h-3" />
                                  </div>
                                )}
                              </div>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                                {p.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                                {p.accreditation}
                              </p>
                              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex flex-col gap-0.5">
                                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                  SPP per 1 Semester:
                                </span>
                                <span className="text-xs font-extrabold text-blue-700 dark:text-blue-400 font-mono">
                                  {p.tuitionInfo?.sppSemester || 'Rp 5.250.000'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {errors.prodiId && (
                        <p className="text-xs text-rose-600 mt-1">{errors.prodiId}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                          2. Pilih Jalur Seleksi & Beasiswa (Tersedia 5 Jalur)
                        </label>
                        <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                          Termasuk KIP Kuliah & Prestasi Non-Akademik
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {jalurOptions.map((j) => {
                          const isSelected = formData.jalurId === j.id;
                          return (
                            <div
                              key={j.id}
                              onClick={() => setFormData({ ...formData, jalurId: j.id })}
                              className={`cursor-pointer rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                                isSelected
                                  ? j.id === 'jalur-kip-kuliah'
                                    ? 'bg-emerald-50/80 dark:bg-neutral-800 border-emerald-600 dark:border-emerald-400 shadow-md ring-2 ring-emerald-500'
                                    : j.id === 'jalur-prestasi-non-akademik'
                                    ? 'bg-amber-50/80 dark:bg-amber-950/50 border-amber-500 dark:border-amber-400 shadow-md ring-2 ring-amber-400'
                                    : 'bg-emerald-50/60 dark:bg-neutral-800 border-emerald-600 dark:border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                                  : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                                  <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                      j.id === 'jalur-kip-kuliah'
                                        ? 'bg-emerald-100 dark:bg-neutral-700 text-emerald-800 dark:text-emerald-200 font-extrabold'
                                        : j.id === 'jalur-prestasi-non-akademik'
                                        ? 'bg-amber-100 dark:bg-amber-900/80 text-amber-800 dark:text-amber-200 font-extrabold'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                    }`}
                                  >
                                    {j.badge}
                                  </span>
                                  {isSelected && (
                                    <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                                      <Check className="w-2.5 h-2.5" />
                                    </div>
                                  )}
                                </div>
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1 leading-snug">
                                  {j.title}
                                </h4>
                                <p className="text-[11px] text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
                                  {j.desc}
                                </p>
                              </div>

                              <span className="text-[10px] font-semibold block pt-2 border-t border-slate-100 dark:border-slate-800/80 text-emerald-700 dark:text-emerald-400">
                                ✓ {j.benefit}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      {errors.jalurId && (
                        <p className="text-xs text-rose-600 mt-1">{errors.jalurId}</p>
                      )}
                    </div>

                    {/* Dynamic info callout for the selected jalur */}
                    {formData.jalurId === 'jalur-kip-kuliah' && (
                      <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-neutral-800 border border-emerald-200 dark:border-neutral-700 text-xs space-y-1.5">
                        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-emerald-200">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          <span>Informasi Beasiswa Jalur KIP Kuliah Kemendikbudristek:</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                          Jalur ini ditujukan bagi siswa berprestasi lulusan SMA/SMK/MA (2024–2026) pemegang Kartu Indonesia Pintar (KIP), KKS, PKH, atau terdata di DTKS Kemensos RI. Biaya pendaftaran dan SPP 100% dibebaskan, ditambah bantuan biaya hidup bulanan dari pemerintah setelah lolos verifikasi berkas.
                        </p>
                        <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold">
                          * Anda akan diminta menginput Nomor Pendaftaran KIP Kuliah pada Tahap 3 (Data Pendidikan & KIP).
                        </div>
                      </div>
                    )}

                    {formData.jalurId === 'jalur-prestasi-non-akademik' && (
                      <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs space-y-1.5">
                        <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-amber-200">
                          <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <span>Informasi Jalur Prestasi Non-Akademik (Seni & Olahraga / MTQ):</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                          Jalur khusus bagi siswa berprestasi Juara 1, 2, atau 3 tingkat Kota/Kabupaten, Provinsi, maupun Nasional dalam bidang Olahraga, Seni Budaya/Musik/Tari, Bela Diri, atau Keagamaan (Tahfidz Al-Qur'an / MTQ). Bebas ujian tertulis dan mendapatkan beasiswa subsidi biaya SPP 25% – 50%.
                        </p>
                        <div className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold">
                          * Detail cabang prestasi dan piagam penghargaan akan diinput pada Tahap 3.
                        </div>
                      </div>
                    )}

                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                          Periode Pendaftaran Berjalan:
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {formData.gelombang}
                          </span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                          Biaya Formulir Pendaftaran:
                        </span>
                        {formData.jalurId === 'jalur-kip-kuliah' ? (
                          <span className="text-sm font-extrabold text-blue-700 dark:text-blue-400 font-mono">
                            Gratis Rp 0 <span className="text-[10px] font-normal text-emerald-600">(Subsidi KIP Kuliah)</span>
                          </span>
                        ) : (
                          <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                            Rp 350.000 <span className="text-[10px] font-normal text-slate-400 line-through">Rp 500.000</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Biodata Diri */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Nama Lengkap (sesuai Ijazah/KTP) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="contoh: Siti Nurhaliza Putri"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.fullName && (
                          <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Nomor Induk Kependudukan (NIK) *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={16}
                          value={formData.nik}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nik: e.target.value.replace(/[^0-9]/g, ''),
                            })
                          }
                          placeholder="16 digit angka NIK KTP / KK"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.nik && (
                          <p className="text-xs text-rose-600 mt-1">{errors.nik}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Tempat Lahir *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.birthPlace}
                          onChange={(e) =>
                            setFormData({ ...formData, birthPlace: e.target.value })
                          }
                          placeholder="Kota kelahiran"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.birthPlace && (
                          <p className="text-xs text-rose-600 mt-1">{errors.birthPlace}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Tanggal Lahir *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.birthDate}
                          onChange={(e) =>
                            setFormData({ ...formData, birthDate: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.birthDate && (
                          <p className="text-xs text-rose-600 mt-1">{errors.birthDate}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Jenis Kelamin *
                        </label>
                        <select
                          value={formData.gender}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              gender: e.target.value as 'Laki-laki' | 'Perempuan',
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option value="Perempuan">Perempuan</option>
                          <option value="Laki-laki">Laki-laki</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          No. WhatsApp Calon Mahasiswa (Aktif) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.whatsapp}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              whatsapp: e.target.value.replace(/[^0-9+]/g, ''),
                            })
                          }
                          placeholder="contoh: 081298765432"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <span className="text-[10px] text-slate-400 mt-0.5 block">
                          Bukti pendaftaran & info seleksi dikirimkan ke nomor ini.
                        </span>
                        {errors.whatsapp && (
                          <p className="text-xs text-rose-600 mt-1">{errors.whatsapp}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Alamat Email Aktif *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="nama@email.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.email && (
                          <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Alamat Domisili Lengkap *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Nama jalan, RT/RW, Kelurahan, Kecamatan"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.address && (
                          <p className="text-xs text-rose-600 mt-1">{errors.address}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Kota / Kabupaten *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="contoh: Tangerang Selatan"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.city && (
                          <p className="text-xs text-rose-600 mt-1">{errors.city}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Pendidikan & Berkas Khusus Jalur */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="space-y-5"
                  >
                    {/* A. Riwayat Pendidikan Terakhir */}
                    <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4" />
                        <span>A. Riwayat Pendidikan Terakhir</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Asal Sekolah / Kampus Sebelumnya *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.previousSchool}
                            onChange={(e) =>
                              setFormData({ ...formData, previousSchool: e.target.value })
                            }
                            placeholder="contoh: SMAN 2 Tangerang Selatan / SMK Kesehatan"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                          {errors.previousSchool && (
                            <p className="text-xs text-rose-600 mt-1">{errors.previousSchool}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Jurusan Asal
                            </label>
                            <input
                              type="text"
                              value={formData.schoolMajor}
                              onChange={(e) =>
                                setFormData({ ...formData, schoolMajor: e.target.value })
                              }
                              placeholder="IPA / Keperawatan"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Tahun Lulus *
                            </label>
                            <input
                              type="text"
                              value={formData.graduationYear}
                              onChange={(e) =>
                                setFormData({ ...formData, graduationYear: e.target.value })
                              }
                              placeholder="2026"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Nilai Rata-rata Rapor (Skala 100) / IPK Sebelumnya (Opsional)
                        </label>
                        <input
                          type="text"
                          value={formData.gpaOrScore}
                          onChange={(e) =>
                            setFormData({ ...formData, gpaOrScore: e.target.value })
                          }
                          placeholder="contoh: 85.50 (Pertimbangan seleksi prestasi)"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* B. Bagian Khusus: KIP KULIAH */}
                    {formData.jalurId === 'jalur-kip-kuliah' && (
                      <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-neutral-800 border border-emerald-300 dark:border-neutral-700 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-emerald-200 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <span>B. Data Kartu Indonesia Pintar (KIP) Kuliah Kemendikbudristek *</span>
                          </h4>
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-neutral-700 px-2 py-0.5 rounded-md">
                            Wajib Diisi
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                              Nomor Pendaftaran KIP Kuliah / No. KIP / KKS / PKH *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.kipNumber}
                              onChange={(e) =>
                                setFormData({ ...formData, kipNumber: e.target.value })
                              }
                              placeholder="contoh: 24.01.XXXXX atau No. KIP Siswa"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.kipNumber && (
                              <p className="text-xs text-rose-600 mt-1">{errors.kipNumber}</p>
                            )}
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                              Dapat dilihat pada akun portal https://kip-kuliah.kemdikbud.go.id
                            </span>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                              Kategori Status Bantuan / Kepemilikan Dokumen *
                            </label>
                            <select
                              value={formData.kipCategory}
                              onChange={(e) =>
                                setFormData({ ...formData, kipCategory: e.target.value })
                              }
                              className="w-full px-3.5 py-2.5 rounded-xl border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                              <option value="Pemegang KIP Siswa">Pemegang Kartu Indonesia Pintar (KIP) SMA/SMK</option>
                              <option value="Terdaftar DTKS Kemensos">Keluarga Terdaftar di DTKS Kemensos RI</option>
                              <option value="Pemegang Kartu KKS / PKH">Pemegang Kartu Keluarga Sejahtera (KKS) / PKH</option>
                              <option value="SKTM / Panti Sosial">Surat Keterangan Tidak Mampu (SKTM) / Asal Panti Asuhan</option>
                            </select>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                              Digunakan untuk prioritas penetapan kuota Kemendikbudristek.
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* B. Bagian Khusus: PRESTASI NON-AKADEMIK */}
                    {formData.jalurId === 'jalur-prestasi-non-akademik' && (
                      <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                            <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span>B. Detail Prestasi Non-Akademik (Seni / Olahraga / Keagamaan) *</span>
                          </h4>
                          <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded-md">
                            Beasiswa Prestasi
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                              Bidang Prestasi *
                            </label>
                            <select
                              value={formData.prestasiField}
                              onChange={(e) =>
                                setFormData({ ...formData, prestasiField: e.target.value })
                              }
                              className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                            >
                              <option value="Olahraga (Atletik/Bola/Renang/dll)">Olahraga (Atletik, Bola, Renang, Senam, dsb.)</option>
                              <option value="Bela Diri (Pencak Silat/Karate/Taekwondo)">Bela Diri (Pencak Silat, Karate, Taekwondo, Judo)</option>
                              <option value="Seni Budaya (Tari/Musik/Vokal/Teater)">Seni Budaya (Tari Tradisional/Modern, Musik, Vokal)</option>
                              <option value="Keagamaan (Tahfidz Al-Qur'an / MTQ)">Keagamaan (Tahfidz Al-Qur'an ≥ 3 Juz / Juara MTQ)</option>
                              <option value="PMR / Pramuka / Kepemimpinan OSIS">PMR / KSR, Pramuka Garuda, Pengurus OSIS Unggul</option>
                              <option value="Sains Kreatif & Robotika / Desain">Sains Kreatif, Robotika, atau Lomba Desain Kreatif</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                              Tingkat Kejuaraan / Sertifikat *
                            </label>
                            <select
                              value={formData.prestasiLevel}
                              onChange={(e) =>
                                setFormData({ ...formData, prestasiLevel: e.target.value })
                              }
                              className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                            >
                              <option value="Kabupaten / Kota">Tingkat Kota / Kabupaten</option>
                              <option value="Provinsi">Tingkat Provinsi</option>
                              <option value="Nasional">Tingkat Nasional (Kejurnas / O2SN / FLS2N)</option>
                              <option value="Internasional">Tingkat Internasional</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                              Nama Kejuaraan / Piagam Penghargaan *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.prestasiTitle}
                              onChange={(e) =>
                                setFormData({ ...formData, prestasiTitle: e.target.value })
                              }
                              placeholder="contoh: Kejuaraan Daerah Karate Pelajar Jawa Barat / MTQ Pelajar"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                            />
                            {errors.prestasiTitle && (
                              <p className="text-xs text-rose-600 mt-1">{errors.prestasiTitle}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                              Peringkat Juara *
                            </label>
                            <select
                              value={formData.prestasiRank}
                              onChange={(e) =>
                                setFormData({ ...formData, prestasiRank: e.target.value })
                              }
                              className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                            >
                              <option value="Juara 1 (Emas)">Juara 1 (Medali Emas)</option>
                              <option value="Juara 2 (Perak)">Juara 2 (Medali Perak)</option>
                              <option value="Juara 3 (Perunggu)">Juara 3 (Medali Perunggu)</option>
                              <option value="Juara Harapan / Finalis">Juara Harapan / Finalis Unggulan</option>
                              <option value="Tahfidz 3-5 Juz">Tahfidz Al-Qur'an (3 - 5 Juz)</option>
                              <option value="Tahfidz > 5 Juz">Tahfidz Al-Qur'an (&gt; 5 Juz)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* C. Kontak Orang Tua / Wali */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>C. Kontak Orang Tua / Wali</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Nama Orang Tua / Wali *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.parentName}
                            onChange={(e) =>
                              setFormData({ ...formData, parentName: e.target.value })
                            }
                            placeholder="contoh: H. Bambang Susanto"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                          {errors.parentName && (
                            <p className="text-xs text-rose-600 mt-1">{errors.parentName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Nomor Telepon / WA Orang Tua *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.parentPhone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                parentPhone: e.target.value.replace(/[^0-9+]/g, ''),
                              })
                            }
                            placeholder="0813xxxxxxxx"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                          {errors.parentPhone && (
                            <p className="text-xs text-rose-600 mt-1">{errors.parentPhone}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Pekerjaan Orang Tua
                          </label>
                          <input
                            type="text"
                            value={formData.parentJob}
                            onChange={(e) =>
                              setFormData({ ...formData, parentJob: e.target.value })
                            }
                            placeholder="PNS / Swasta / Wiraswasta"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Konfirmasi & Review */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="space-y-4"
                  >
                    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-mono block">
                            Program Studi Pilihan:
                          </span>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            {selectedProdi.name} ({selectedProdi.degree})
                          </span>
                        </div>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-lg ${
                            formData.jalurId === 'jalur-kip-kuliah'
                              ? 'bg-emerald-100 dark:bg-neutral-700 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-neutral-600'
                              : formData.jalurId === 'jalur-prestasi-non-akademik'
                              ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                              : 'bg-emerald-100 dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400'
                          }`}
                        >
                          {selectedJalur.title}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 text-[10px] block">Nama Lengkap</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {formData.fullName || '-'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">NIK</span>
                          <span className="font-semibold font-mono text-slate-800 dark:text-slate-200">
                            {formData.nik || '-'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">WhatsApp Aktif</span>
                          <span className="font-semibold font-mono text-slate-800 dark:text-slate-200">
                            {formData.whatsapp || '-'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">Domisili</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {formData.city || '-'}
                          </span>
                        </div>
                      </div>

                      {/* Specialized details preview */}
                      {formData.jalurId === 'jalur-kip-kuliah' && (
                        <div className="p-3 rounded-xl bg-emerald-100/70 dark:bg-neutral-800 border border-emerald-200 dark:border-neutral-700 text-xs grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <span className="text-[10px] text-emerald-700 dark:text-emerald-300 block font-semibold">
                              No. Pendaftaran KIP Kuliah:
                            </span>
                            <span className="font-mono font-bold text-slate-900 dark:text-white">
                              {formData.kipNumber || '-'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-emerald-700 dark:text-emerald-300 block font-semibold">
                              Kategori Kepesertaan:
                            </span>
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {formData.kipCategory}
                            </span>
                          </div>
                        </div>
                      )}

                      {formData.jalurId === 'jalur-prestasi-non-akademik' && (
                        <div className="p-3 rounded-xl bg-amber-100/70 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800 text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <span className="text-[10px] text-amber-700 dark:text-amber-300 block font-semibold">
                              Bidang & Tingkat:
                            </span>
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {formData.prestasiField} ({formData.prestasiLevel})
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-amber-700 dark:text-amber-300 block font-semibold">
                              Nama Kejuaraan:
                            </span>
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {formData.prestasiTitle || '-'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-amber-700 dark:text-amber-300 block font-semibold">
                              Peringkat Juara:
                            </span>
                            <span className="font-bold text-amber-800 dark:text-amber-200">
                              {formData.prestasiRank}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-3 border-t border-slate-200 dark:border-slate-700">
                        <div>
                          <span className="text-slate-400 text-[10px] block">Asal Sekolah</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {formData.previousSchool} ({formData.graduationYear})
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">Nama Orang Tua</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {formData.parentName}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">Estimasi Biaya SPP</span>
                          {formData.jalurId === 'jalur-kip-kuliah' ? (
                            <span className="font-bold text-blue-700 dark:text-blue-400 font-mono">
                              Bebas Biaya 100% (KIP)
                            </span>
                          ) : formData.jalurId === 'jalur-prestasi-non-akademik' ? (
                            <span className="font-bold text-amber-700 dark:text-amber-400 font-mono">
                              Subsidi s.d. 50% SPP
                            </span>
                          ) : (
                            <span className="font-bold text-blue-700 dark:text-blue-400 font-mono">
                              {selectedProdi.tuitionInfo?.sppSemester}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Dokumen yang perlu disiapkan */}
                    <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-neutral-800/80 border border-emerald-200 dark:border-neutral-700 text-xs">
                      <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-emerald-300 mb-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Dokumen Persyaratan Seleksi Lanjutan (Disiapkan saat tes):</span>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-600 dark:text-slate-300 text-[11px] list-disc list-inside">
                        <li>Pas Foto resmi 3x4 latar belakang merah (2 lembar)</li>
                        <li>Fotokopi Ijazah / SKL / Rapor yang telah dilegalisir</li>
                        <li>Fotokopi KTP dan Kartu Keluarga (KK)</li>
                        <li>Surat Keterangan Bebas Buta Warna dari RS / Puskesmas</li>
                        {formData.jalurId === 'jalur-kip-kuliah' && (
                          <li className="font-semibold text-blue-800 dark:text-blue-300">
                            Kartu Peserta KIP Kuliah & Bukti Terdaftar DTKS / KKS / PKH
                          </li>
                        )}
                        {formData.jalurId === 'jalur-prestasi-non-akademik' && (
                          <li className="font-semibold text-amber-800 dark:text-amber-300">
                            Sertifikat / Piagam Kejuaraan Prestasi Asli & Legalisir
                          </li>
                        )}
                      </ul>
                    </div>

                    <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer pt-2">
                      <input
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={(e) =>
                          setFormData({ ...formData, agreeTerms: e.target.checked })
                        }
                        className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>
                        Saya menyatakan data yang diisikan adalah benar dan bersedia mengikuti
                        tahapan verifikasi berkas dan tes kesehatan PMB FIKES Universitas Ichsan Satya.
                      </span>
                    </label>
                  </motion.div>
                )}

                {/* Form Footer Buttons */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Kembali</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Lanjut Tahap {currentStep + 1}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!formData.agreeTerms}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim Pendaftaran Cepat</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* SUCCESS SLIP: Displayed immediately after submit */}
          {activeTab === 'form' && completedRecord && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Success Banner */}
              <div className="text-center p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-2 shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-emerald-950 dark:text-emerald-200">
                  Formulir Pendaftaran Cepat Berhasil Dikirim!
                </h3>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1 max-w-lg mx-auto">
                  Data calon mahasiswa telah terdata pada sistem registrasi FIKES Universitas Ichsan
                  Satya. Simpan bukti pendaftaran ini untuk verifikasi berkas dan tes kesehatan.
                </p>
              </div>

              {/* Printable Official Registration Slip */}
              <div
                id="registration-slip-print"
                className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden"
              >
                {/* Watermark badge */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    No. Registrasi:
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm sm:text-base font-extrabold font-mono text-blue-700 dark:text-blue-400">
                      {completedRecord.registrationNumber}
                    </span>
                    <button
                      onClick={() => handleCopyCode(completedRecord.registrationNumber)}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      title="Salin No. Registrasi"
                    >
                      {copiedCode ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Slip Header */}
                <div className="border-b-2 border-slate-900/10 dark:border-slate-700 pb-4 mb-6 pr-32">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-black text-lg shrink-0">
                      UIS
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
                        FAKULTAS ILMU KESEHATAN
                      </h4>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        UNIVERSITAS ICHSAN SATYA (FIKES UIS)
                      </p>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        Jl. Jombang Raya No. 56, Bintaro Jaya Sektor IX, Tangerang Selatan
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    KARTU BUKTI PENDAFTARAN MAHASISWA BARU
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Waktu Pendaftaran: {completedRecord.submissionDate}
                  </span>
                </div>

                {/* Details Table */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2.5">
                    <div className="flex">
                      <span className="w-32 text-slate-500 dark:text-slate-400 shrink-0">
                        Nama Lengkap
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        : {completedRecord.fullName}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-32 text-slate-500 dark:text-slate-400 shrink-0">NIK</span>
                      <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                        : {completedRecord.nik}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-32 text-slate-500 dark:text-slate-400 shrink-0">
                        Tempat/Tgl Lahir
                      </span>
                      <span className="text-slate-800 dark:text-slate-200">
                        : {completedRecord.birthPlace}, {completedRecord.birthDate}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-32 text-slate-500 dark:text-slate-400 shrink-0">
                        Jenis Kelamin
                      </span>
                      <span className="text-slate-800 dark:text-slate-200">
                        : {completedRecord.gender}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-32 text-slate-500 dark:text-slate-400 shrink-0">
                        WhatsApp / Telp
                      </span>
                      <span className="font-mono text-slate-800 dark:text-slate-200">
                        : {completedRecord.whatsapp}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-32 text-slate-500 dark:text-slate-400 shrink-0">
                        Alamat Domisili
                      </span>
                      <span className="text-slate-800 dark:text-slate-200">
                        : {completedRecord.address}, {completedRecord.city}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex">
                      <span className="w-32 text-slate-500 dark:text-slate-400 shrink-0">
                        Program Studi
                      </span>
                      <span className="font-bold text-blue-700 dark:text-blue-400">
                        : {completedRecord.prodiName} ({completedRecord.degree})
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-32 text-slate-500 dark:text-slate-400 shrink-0">
                        Jalur Seleksi
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        : {completedRecord.jalurName}
                      </span>
                    </div>

                    {/* Show KIP number if present */}
                    {completedRecord.kipNumber && (
                      <div className="flex">
                        <span className="w-32 text-blue-600 dark:text-blue-400 shrink-0 font-semibold">
                          No. KIP Kuliah
                        </span>
                        <span className="font-mono font-bold text-blue-700 dark:text-blue-300">
                          : {completedRecord.kipNumber} ({completedRecord.kipCategory || 'KIP'})
                        </span>
                      </div>
                    )}

                    {/* Show Prestasi info if present */}
                    {completedRecord.prestasiTitle && (
                      <div className="flex">
                        <span className="w-32 text-amber-600 dark:text-amber-400 shrink-0 font-semibold">
                          Prestasi Kejuaraan
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          : {completedRecord.prestasiTitle} ({completedRecord.prestasiRank})
                        </span>
                      </div>
                    )}

                    <div className="flex">
                      <span className="w-32 text-slate-500 dark:text-slate-400 shrink-0">
                        Asal Sekolah/Kampus
                      </span>
                      <span className="text-slate-800 dark:text-slate-200">
                        : {completedRecord.previousSchool} ({completedRecord.graduationYear})
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-32 text-slate-500 dark:text-slate-400 shrink-0">
                        Orang Tua / Wali
                      </span>
                      <span className="text-slate-800 dark:text-slate-200">
                        : {completedRecord.parentName} ({completedRecord.parentPhone})
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-32 text-slate-500 dark:text-slate-400 shrink-0">
                        Status Biaya SPP
                      </span>
                      <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        : {completedRecord.sppSemester}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-32 text-slate-500 dark:text-slate-400 shrink-0">
                        Status Seleksi
                      </span>
                      <span className="font-semibold text-amber-700 dark:text-amber-400">
                        : {completedRecord.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step info guide */}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl text-xs space-y-1.5">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Instruksi Tahapan Selanjutnya:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                    1. Konfirmasi nomor registrasi ke Panitia PMB melalui tombol WhatsApp di bawah.
                    <br />
                    2. Tim PMB akan mengirimkan jadwal tes kesehatan dan wawancara dalam 1x24 jam kerja.
                    <br />
                    3. Bawa cetakan kartu ini beserta kelengkapan berkas asli (dan kartu KIP / sertifikat juara jika melalui jalur prestasi) saat verifikasi di Kampus FIKES UIS Bintaro.
                  </p>
                </div>
              </div>

              {/* Action Buttons for Completed Slip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={resetForm}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Daftar Calon Lain
                </button>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handlePrintSlip}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak Kartu Slip</span>
                  </button>

                  <button
                    onClick={() => handleSendToWhatsApp(completedRecord)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Konfirmasi ke WhatsApp PMB</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Cek Status Pendaftaran */}
          {activeTab === 'status' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Search Bar */}
              <form onSubmit={handleSearchRegistration} className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Cari Nomor Registrasi / Nama Calon Mahasiswa
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Masukkan No. Registrasi (contoh: PMB-UIS-2026-xxxx) atau Nama"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    Cari Status
                  </button>
                </div>
                {searchNotFound && (
                  <p className="text-xs text-rose-600">
                    Nomor registrasi atau nama tidak ditemukan di riwayat perangkat ini.
                  </p>
                )}
              </form>

              {/* Saved Records List */}
              {savedRecords.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Riwayat Pendaftaran di Perangkat Ini ({savedRecords.length})
                  </h4>
                  <div className="space-y-2">
                    {savedRecords.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => setSearchedRecord(rec)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          searchedRecord?.id === rec.id
                            ? 'bg-emerald-50/80 dark:bg-neutral-800 border-emerald-600 dark:border-emerald-500 shadow-xs'
                            : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-neutral-700 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">
                            {rec.prodiId === 's1-keperawatan'
                              ? 'S1'
                              : rec.prodiId === 'profesi-ners'
                              ? 'Ns'
                              : 'D3'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900 dark:text-white">
                                {rec.fullName}
                              </span>
                              <span className="text-[10px] font-mono font-semibold text-blue-700 dark:text-blue-400">
                                {rec.registrationNumber}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {rec.prodiName} · {rec.jalurName}
                            </p>
                          </div>
                        </div>

                        <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-md shrink-0">
                          {rec.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Searched / Selected Record Detail View */}
              {searchedRecord && (
                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">
                        Kartu Pendaftaran Aktif
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {searchedRecord.fullName} ({searchedRecord.registrationNumber})
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
                      {searchedRecord.status}
                    </span>
                  </div>

                  {/* Information summary */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Program Studi</span>
                      <span className="font-bold text-blue-700 dark:text-blue-400">
                        {searchedRecord.prodiName}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Jalur Masuk</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {searchedRecord.jalurName}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">No. WhatsApp</span>
                      <span className="font-mono text-slate-800 dark:text-slate-200">
                        {searchedRecord.whatsapp}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Biaya SPP</span>
                      <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        {searchedRecord.sppSemester}
                      </span>
                    </div>
                  </div>

                  {searchedRecord.kipNumber && (
                    <div className="p-3 rounded-xl bg-emerald-100/70 dark:bg-neutral-800 border border-emerald-200 dark:border-neutral-700 text-xs">
                      <span className="font-bold text-slate-900 dark:text-emerald-200">
                        No. KIP Kuliah: {searchedRecord.kipNumber}
                      </span>{' '}
                      <span className="text-slate-600 dark:text-slate-300">
                        ({searchedRecord.kipCategory || 'KIP Siswa'})
                      </span>
                    </div>
                  )}

                  {searchedRecord.prestasiTitle && (
                    <div className="p-3 rounded-xl bg-amber-100/70 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800 text-xs">
                      <span className="font-bold text-amber-900 dark:text-amber-200">
                        Prestasi: {searchedRecord.prestasiTitle}
                      </span>{' '}
                      <span className="text-slate-600 dark:text-slate-300">
                        ({searchedRecord.prestasiRank}, Tingkat {searchedRecord.prestasiLevel})
                      </span>
                    </div>
                  )}

                  {/* Progress stages */}
                  <div className="py-2">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-3">
                      Tahapan Proses Seleksi:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200">
                        <div className="flex items-center gap-1 font-bold text-[11px] mb-0.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>1. Pendaftaran</span>
                        </div>
                        <span className="text-[10px] text-emerald-800 dark:text-emerald-300">
                          Formulir selesai
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200">
                        <div className="flex items-center gap-1 font-bold text-[11px] mb-0.5">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>2. Verifikasi Berkas</span>
                        </div>
                        <span className="text-[10px] text-amber-800 dark:text-amber-300">
                          Sedang proses tim PMB
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1 font-bold text-[11px] mb-0.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>3. Tes Kesehatan</span>
                        </div>
                        <span className="text-[10px]">Jadwal menyusul via WA</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1 font-bold text-[11px] mb-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>4. Registrasi Ulang</span>
                        </div>
                        <span className="text-[10px]">Pengumuman resmi</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => handleCopyCode(searchedRecord.registrationNumber)}
                      className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedCode ? 'Tersalin!' : 'Salin Nomor'}</span>
                    </button>
                    <button
                      onClick={() => handleSendToWhatsApp(searchedRecord)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Chat Panitia PMB</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
