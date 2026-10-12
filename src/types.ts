export type NavigationTab = 
  | 'beranda'
  | 'sejarah'
  | 'visi-misi'
  | 'struktur-organisasi'
  | 'pimpinan'
  | 's1-keperawatan'
  | 'profesi-ners'
  | 'd3-kebidanan'
  | 'akademik'
  | 'berita'
  | 'riset-publikasi'
  | 'kontak';

export type ArticleCategory = 'semua' | 'berita' | 'pengumuman' | 'event' | 'informasi-akademik';

export interface SiteConfig {
  siteName: string;
  facultyName: string;
  universityName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  googleMapsEmbedUrl: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  portals: {
    portalMahasiswa: string;
    portalDosen: string;
    universityWebsite: string;
    pmbOnline: string;
    eLibrary: string;
  };
}

export interface TimelineMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  milestoneBadge: string;
  highlights: string[];
}

export interface CourseItem {
  code: string;
  name: string;
  sks: number;
  type: 'Teori' | 'Praktikum' | 'Stase Klinik';
}

export interface SemesterCurriculum {
  semester: number;
  title: string;
  totalSks: number;
  courses: CourseItem[];
}

export interface SemesterFeeItem {
  semester: number;
  label: string;
  spp: string;
  biayaSksPraktikum: string;
  keterangan: string;
}

export interface TuitionInfo {
  biayaPendaftaran: string;
  danaPengembangan: string;
  sppSemester: string;
  potonganBeasiswa: string;
  keterangan: string;
  totalSemester?: number;
  estimasiTotalSpp?: string;
  skemaCicilan?: string[];
  semesterFeeBreakdown?: SemesterFeeItem[];
}

export interface ProgramStudi {
  id: string;
  slug: string;
  name: string;
  degree: string;
  accreditation: string;
  duration: string;
  credits: string;
  overview: string;
  vision: string;
  mission: string[];
  graduateProfiles: { title: string; desc: string }[];
  careerProspects: string[];
  coreCompetencies: string[];
  laboratories: string[];
  bannerImage: string;
  curriculum?: SemesterCurriculum[];
  tuitionInfo?: TuitionInfo;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: 'berita' | 'pengumuman' | 'event' | 'informasi-akademik';
  categoryLabel: string;
  date: string;
  author: string;
  readTime: string;
  summary: string;
  content: string[];
  image: string;
  isFeatured?: boolean;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  category: 'akademik' | 'kemahasiswaan' | 'administrasi' | 'klinik';
  summary: string;
  important?: boolean;
  linkText?: string;
  actionTab?: NavigationTab;
}

export interface LeadershipMember {
  name: string;
  role: string;
  qualification: string;
  expertise: string;
  message?: string;
}

export interface ResearchPublication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  type: 'Jurnal Nasional Terakreditasi (SINTA)' | 'Prosiding Ilmiah Internasional' | 'Pengabdian Kepada Masyarakat';
  doi?: string;
  category: string;
}

export interface FacilityItem {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  image: string;
}

export interface HospitalPartner {
  id: string;
  name: string;
  type: string;
  location: string;
  stase: string;
}

export interface AlumniStory {
  id: string;
  name: string;
  program: string;
  graduationYear: string;
  role: string;
  workplace: string;
  quote: string;
}

export interface AdmissionTrack {
  id: string;
  title: string;
  tag: string;
  description: string;
  requirements: string[];
  deadline: string;
  isPopular?: boolean;
  scholarshipBenefit?: string;
  categoryType?: 'akademik' | 'non-akademik' | 'beasiswa-pemerintah' | 'reguler' | 'alih-jenjang';
}

export interface AcademicEventItem {
  id: string;
  title: string;
  category: 'registrasi' | 'kuliah' | 'ujian' | 'stase-klinik' | 'ukom' | 'libur';
  categoryLabel: string;
  period: string;
  audience: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  description?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'pmb' | 'akreditasi' | 'stase' | 'beasiswa' | 'karir';
}

export interface QuickRegistrationRecord {
  id: string;
  registrationNumber: string;
  submissionDate: string;
  prodiId: string;
  prodiName: string;
  degree: string;
  sppSemester: string;
  jalurId: string;
  jalurName: string;
  fullName: string;
  nik: string;
  gender: 'Laki-laki' | 'Perempuan';
  birthPlace: string;
  birthDate: string;
  religion: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  previousSchool: string;
  schoolMajor: string;
  graduationYear: string;
  gpaOrScore: string;
  parentName: string;
  parentPhone: string;
  parentJob: string;
  selectionDate: string;
  status: 'Menunggu Verifikasi Berkas' | 'Jadwal Tes Kesehatan' | 'Lulus Administrasi';
  notes?: string;
  // Specific data for KIP Kuliah
  kipNumber?: string;
  kipCategory?: string;
  // Specific data for Non-Academic Achievement
  prestasiField?: string;
  prestasiLevel?: string;
  prestasiTitle?: string;
  prestasiRank?: string;
}
