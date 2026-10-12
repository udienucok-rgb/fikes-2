import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  Navigation,
} from 'lucide-react';
import { siteConfig, frequentlyAskedQuestions } from '../data/fikesData';

interface ContactSectionProps {
  onShowToast?: (title: string, message?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Informasi Pendaftaran PMB',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onShowToast) {
        onShowToast('Pesan Terkirim', 'Terima kasih, tim layanan FIKES UIS akan segera membalas email Anda.');
      }
    }, 600);
  };

  return (
    <div className="space-y-10 text-left">
      {/* 1. Header Info */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-2 font-mono">
            Layanan Informasi & Kontak Resmi
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Hubungi Fakultas Ilmu Kesehatan Universitas Ichsan Satya
          </h1>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-left">
            Kami siap memberikan informasi terkait program studi, proses penerimaan mahasiswa baru (PMB), kerjasama institusi pelayanan kesehatan, serta layanan administrasi akademik.
          </p>
        </div>
      </div>

      {/* 2. Grid: Contact Information Cards + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Direct Contacts & Hours */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sekretariat & Lokasi Kampus
            </h2>

            <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white text-xs mb-0.5">
                    Alamat Kampus:
                  </strong>
                  <span className="text-xs leading-relaxed block text-left">
                    {siteConfig.address}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white text-xs mb-0.5">
                    Email Resmi:
                  </strong>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-xs text-blue-700 dark:text-blue-400 hover:underline block"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white text-xs mb-0.5">
                    Telepon & WhatsApp Layanan:
                  </strong>
                  <span className="text-xs block text-left">
                    Telp: {siteConfig.phone} | WA: {siteConfig.whatsapp}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white text-xs mb-0.5">
                    Jam Layanan Akademik:
                  </strong>
                  <span className="text-xs block text-left">
                    Senin – Jumat: 08.00 – 16.00 WIB (Sabtu: 08.00 – 12.00 WIB)
                  </span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 block">
                  Konsultasi Pendaftaran Cepat
                </span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Chat langsung dengan staf penerimaan mahasiswa baru.
                </span>
              </div>
              <a
                href="https://wa.me/6281288882022?text=Halo%20Admin%20FIKES%20UIS,%20saya%20ingin%20konsultasi%20mengenai%20pendaftaran%20program%20studi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat WhatsApp</span>
              </a>
            </div>

            {/* Social media links */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 font-mono">
                Kanal Media Sosial Resmi
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href={siteConfig.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Instagram @fikes.ichsansatya</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <a
                  href={siteConfig.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Facebook UIS</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <a
                  href={siteConfig.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <span>YouTube Official</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            Kirim Pertanyaan / Layanan Informasi
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 text-left">
            Silakan lengkapi formulir berikut. Tim administrasi FIKES UIS akan merespons pesan Anda ke alamat email yang dicantumkan.
          </p>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50/70 dark:bg-neutral-800 border border-emerald-200 dark:border-neutral-700 text-center animate-in fade-in duration-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Pesan Berhasil Dikirimkan
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto mb-4">
                Terima kasih telah menghubungi Fakultas Ilmu Kesehatan Universitas Ichsan Satya. Tim kami akan segera menindaklanjuti pesan Anda.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: 'Informasi Pendaftaran PMB',
                    message: '',
                  });
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-700 text-white hover:bg-blue-800 transition-colors"
              >
                Kirim Pesan Lainnya
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Alamat Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nomor WhatsApp / HP
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0812xxxxxxx"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Topik / Keperluan *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Informasi Pendaftaran PMB">Informasi Pendaftaran Mahasiswa Baru (PMB)</option>
                  <option value="Informasi Program Studi S1 Keperawatan">Informasi Program Studi S1 Keperawatan</option>
                  <option value="Informasi Program Profesi Ners">Informasi Pendidikan Profesi Ners</option>
                  <option value="Informasi Program D3 Kebidanan">Informasi Program D3 Kebidanan</option>
                  <option value="Layanan Administrasi Akademik">Layanan Administrasi Akademik & Legalisir</option>
                  <option value="Kerjasama Praktik RS & Riset">Kerjasama Praktik Rumah Sakit & Riset</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pesan / Pertanyaan *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan pertanyaan atau kebutuhan informasi Anda secara jelas..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                {loading ? (
                  <span>Mengirimkan...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Pesan</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3. Interactive FAQ Section (Accordion) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-left">
          Jawaban resmi atas pertanyaan seputar pendaftaran, akreditasi, beasiswa, dan stase praktik klinis di FIKES UIS.
        </p>

        <div className="space-y-3 pt-2">
          {frequentlyAskedQuestions.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-slate-50/40 dark:bg-slate-800/20"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-1 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-left">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Google Maps & Petunjuk Arah Transit */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Peta Lokasi Kampus Universitas Ichsan Satya
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-left">
              Terletak strategis di Jl. Jombang Raya No. 56, Bintaro Jaya Sektor IX, Pondok Aren, Tangerang Selatan.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Universitas+Ichsan+Satya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
          >
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            <span>Petunjuk Arah Google Maps</span>
          </a>
        </div>

        <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shadow-inner">
          <iframe
            title="Google Maps Lokasi FIKES Universitas Ichsan Satya"
            src={siteConfig.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full"
          />
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <strong className="text-slate-700 dark:text-slate-300">Akses Transportasi: </strong>
          10 menit dari Stasiun KRL Jurang Mangu · 5 menit dari Gerbang Tol Pondok Ranji / Parigi · Terkoneksi angkutan umum koridor Bintaro - Ciputat.
        </div>
      </div>
    </div>
  );
};
