import React from 'react';
import {
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  ChevronRight,
  Globe,
  Award,
} from 'lucide-react';
import { NavigationTab, ArticleCategory } from '../types';
import { siteConfig } from '../data/fikesData';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
  onSelectCategory?: (category: ArticleCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  const handleCategoryNav = (cat: ArticleCategory) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    onNavigate('berita');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-14 pb-8 border-t border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-neutral-800">
          {/* Col 1 & 2: Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight leading-none block">
                  FIKES UIS
                </span>
                <span className="text-xs text-emerald-400 font-medium mt-1 block">
                  {siteConfig.facultyName} · {siteConfig.universityName}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-md text-left">
              Fakultas Ilmu Kesehatan Universitas Ichsan Satya berdedikasi menyelenggarakan pendidikan tinggi kesehatan berkualitas guna melahirkan ners dan bidan profesional berintegritas tinggi serta berdaya saing global.
            </p>

            <div className="space-y-2 pt-2 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-left">{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-emerald-300 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{siteConfig.phone} / WA: {siteConfig.whatsapp}</span>
              </div>
            </div>

            {/* Social media icons */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                Media Sosial Resmi
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
                  aria-label="Instagram FIKES UIS"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
                <a
                  href={siteConfig.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
                  aria-label="Facebook Universitas Ichsan Satya"
                >
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
                <a
                  href={siteConfig.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
                  aria-label="YouTube Universitas Ichsan Satya"
                >
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Program Studi */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Program Studi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('s1-keperawatan')}
                  className="hover:text-blue-300 text-slate-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-blue-500" />
                  <span>S1 Keperawatan (S.Kep.)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('profesi-ners')}
                  className="hover:text-blue-300 text-slate-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-blue-500" />
                  <span>Pendidikan Profesi Ners (Ns.)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('d3-kebidanan')}
                  className="hover:text-blue-300 text-slate-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-blue-500" />
                  <span>D3 Kebidanan (A.Md.Keb.)</span>
                </button>
              </li>
            </ul>

            <h4 className="text-xs font-bold text-white uppercase tracking-wider pt-3">
              Riset & Publikasi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('riset-publikasi')}
                  className="hover:text-blue-300 text-slate-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-blue-500" />
                  <span>Riset</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('riset-publikasi')}
                  className="hover:text-blue-300 text-slate-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-blue-500" />
                  <span>Publikasi</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Informasi & Profil */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Informasi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleCategoryNav('berita')}
                  className="hover:text-blue-300 text-slate-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-blue-500" />
                  <span>Berita</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('pengumuman')}
                  className="hover:text-blue-300 text-slate-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-blue-500" />
                  <span>Pengumuman</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('event')}
                  className="hover:text-blue-300 text-slate-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-blue-500" />
                  <span>Event</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('akademik')}
                  className="hover:text-blue-300 text-slate-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-blue-500" />
                  <span>Informasi Akademik</span>
                </button>
              </li>
            </ul>

            <h4 className="text-xs font-bold text-white uppercase tracking-wider pt-3">
              Profil
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('sejarah')}
                  className="hover:text-blue-300 text-slate-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-blue-500" />
                  <span>Sejarah Institusi</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('visi-misi')}
                  className="hover:text-blue-300 text-slate-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-blue-500" />
                  <span>Visi & Misi</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('struktur-organisasi')}
                  className="hover:text-blue-300 text-slate-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-blue-500" />
                  <span>Struktur Organisasi</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pimpinan')}
                  className="hover:text-blue-300 text-slate-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-blue-500" />
                  <span>Pimpinan</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('kontak')}
                  className="hover:text-blue-300 text-slate-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <ChevronRight className="w-3 h-3 text-blue-500" />
                  <span>Kontak & Lokasi</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Google Maps Interactive Embed */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Lokasi Kampus
            </h4>
            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-inner h-40 bg-slate-900">
              <iframe
                title="Peta Lokasi FIKES Universitas Ichsan Satya"
                src={siteConfig.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <p className="text-[11px] text-slate-400 text-left">
              Dekat Bintaro Jaya Sektor IX, Tangerang Selatan. Akses mudah dari Stasiun Jurang Mangu dan Tol Pondok Ranji.
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-left">
            <p>© {new Date().getFullYear()} {siteConfig.universityName}. Seluruh hak cipta dilindungi.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Fakultas Ilmu Kesehatan (FIKES UIS) · Komitmen Mutu Pendidikan Tenaga Kesehatan
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={siteConfig.portals.universityWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <span>Universitas Ichsan Satya</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">·</span>
            <a
              href={siteConfig.portals.portalMahasiswa}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              SIAKAD
            </a>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => onNavigate('kontak')}
              className="hover:text-blue-400 transition-colors"
            >
              Bantuan
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
