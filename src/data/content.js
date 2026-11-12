// Data dummy untuk fakultas, berita, agenda, dll.

export const FACULTIES = [
  {
    abbr: 'FK',
    name: 'Kedokteran',
    to: '/fakultas/kedokteran',
    prodi: ['Pendidikan Dokter', 'Profesi Dokter'],
    color: 'default',
  },
  {
    abbr: 'FT',
    name: 'Teknik',
    to: '/fakultas#ft',
    prodi: ['Teknik Sipil', 'Ilmu Komputer'],
    color: 'sky',
  },
  {
    abbr: 'FH',
    name: 'Hukum',
    to: '/fakultas#fh',
    prodi: ['Ilmu Hukum'],
    color: 'warm',
  },
  {
    abbr: 'FEB',
    name: 'Ekonomi & Bisnis',
    to: '/fakultas#feb',
    prodi: ['Akuntansi', 'Ekonomi Pembangunan'],
    color: 'red',
  },
  {
    abbr: 'FP',
    name: 'Pertanian',
    to: '/fakultas#fp',
    prodi: ['Agribisnis', 'Agroekoteknologi'],
    color: 'default',
  },
  {
    abbr: 'FMIPA',
    name: 'MIPA',
    to: '/fakultas#fmipa',
    prodi: ['Biologi'],
    color: 'sky',
  },
  {
    abbr: 'FAI',
    name: 'Agama Islam',
    to: '/fakultas#fai',
    prodi: ['Ekonomi Syariah', 'Manajemen Bisnis Syariah'],
    color: 'warm',
  },
]

export const CAMPUS_STATS = [
  { value: '1981', label: 'Berdiri di Mataram', labelEn: 'Founded in Mataram' },
  { value: '7', label: 'Fakultas', labelEn: 'Faculties' },
  { value: '13', label: 'Program studi', labelEn: 'Study programmes' },
]

// Tombol aksi per kartu fokus (dipakai footer popup detail):
// kind 'download' → unduh dokumen; kind 'link' → navigasi internal via toHref.
export const FOCUS_AREAS = [
  {
    key: 'pendidikan',
    pill: 'Pendidikan',
    pillVariant: 'default',
    title: 'Misi Pendidikan Berkualitas',
    desc: 'Kurikulum berbasis luaran, pembelajaran berbasis kasus dan proyek, serta dosen yang terus bertumbuh. Setiap lulusan kami siapkan kompeten, beretika, dan siap bersaing.',
    photoCaption: 'Foto: mahasiswa berdiskusi di kelas',
    photoVariant: 'default',
    detail: {
      paragraphs: [
        'Kurikulum berbasis luaran (OBE) di semua program studi, pembelajaran berbasis kasus dan proyek, serta dosen yang terus meningkatkan kualifikasi dan sertifikasinya.',
        'Mutu dijaga melalui siklus SPMI, akreditasi program studi, dan umpan balik dari mahasiswa serta pengguna lulusan, sehingga setiap lulusan kompeten, beretika, dan siap bersaing.',
      ],
      meta: [
        ['Diampu oleh', 'Wakil Rektor I bersama seluruh fakultas'],
        ['Selaras dengan', 'SDG 4 · Pendidikan berkualitas'],
      ],
      wujudNyata: [
        'Kurikulum OBE dan RPS berbasis capaian pembelajaran',
        'Pembelajaran case method dan team-based project',
        'MBKM dan rekognisi pembelajaran lampau (RPL)',
        'Tracer study dan survei kepuasan pengguna lulusan',
      ],
    },
    action: {
      kind: 'download',
      label: 'SK Rektor Tentang Diferensiasi Misi',
      href: '/download/sk-rektor-diferensiasi-misi.pdf',
    },
  },
  {
    key: 'rahmatan',
    pill: 'Nilai',
    pillVariant: 'gold',
    title: "Kampus Rahmatan lil 'Alamin",
    desc: 'Islam yang menebar rahmat bagi semua. Kampus yang aman, inklusif, dan berintegritas, terbuka bagi siapa pun tanpa memandang suku, agama, dan latar belakang.',
    photoCaption: 'Foto: sivitas lintas latar belakang di masjid kampus',
    photoVariant: 'warm',
    detail: {
      paragraphs: [
        "Nilai Islam yang menebar rahmat bagi semua menjadi falsafah penyelenggaraan UNIZAR: kampus yang aman, inklusif, dan berintegritas.",
        'Kampus terbuka bagi siapa pun tanpa memandang suku, agama, asal daerah, maupun disabilitas, dengan tata kelola yang bersih dan kode etik yang ditegakkan.',
      ],
      meta: [
        ['Diampu oleh', 'Rektor dan seluruh pimpinan'],
        ['Selaras dengan', 'SDG 16 · Kelembagaan yang tangguh'],
      ],
      wujudNyata: [
        'Falsafah KEUNIZARAN dalam tata kelola',
        'Kode etik dan Satgas PPKPT untuk kampus aman',
        'Layanan disabilitas dan beasiswa afirmasi',
        'Kanal pelaporan rahasia (WBS)',
      ],
    },
    action: {
      kind: 'download',
      label: 'SK YPLA Tentang KEUNIZARAN',
      href: '/download/sk-ypla-keunizaran.pdf',
    },
  },
  {
    key: 'pariwisata',
    pill: 'Pariwisata',
    pillVariant: 'default',
    title: 'Berwawasan Kepariwisataan Berkelanjutan',
    desc: 'Lombok adalah rumah kami sekaligus destinasi dunia. Setiap prodi menghadirkan wawasan kepariwisataan, dari kesehatan wisata dan ekonomi halal sampai pelestarian alam dan budaya Sasak.',
    photoCaption: 'Foto: pantai dan desa wisata di Lombok',
    photoVariant: 'sky',
    detail: {
      paragraphs: [
        'Lombok adalah rumah kami sekaligus destinasi dunia. Setiap program studi menghadirkan mata kuliah berwawasan kepariwisataan, sehingga lulusan dari bidang apa pun siap berkontribusi pada pariwisata yang berkelanjutan.',
        'Riset dan pengabdian diarahkan pada kesehatan wisatawan dan pekerja pariwisata, ekonomi dan wisata halal, desa wisata binaan, serta pelestarian alam dan budaya Sasak.',
      ],
      meta: [
        ['Diampu oleh', 'Seluruh fakultas, dikoordinasikan Wakil Rektor I dan III'],
        ['Selaras dengan', 'SDG 8 · Pekerjaan layak dan pertumbuhan ekonomi'],
      ],
      wujudNyata: [
        'Minimal 2 SKS mata kuliah berwawasan kepariwisataan di setiap prodi',
        'Kesehatan pariwisata dan pariwisata kesehatan (Fakultas Kedokteran)',
        'Pendampingan UMKM halal dan desa wisata binaan',
        'Kemitraan dengan pemerintah daerah dan pelaku industri pariwisata',
      ],
    },
    action: {
      kind: 'link',
      label: 'Kurikulum OBE',
      to: '/pendidikan#kurikulum',
    },
  },
]

export const STORIES = [
  {
    key: 'posyandu',
    size: 'lg',
    pill: 'Pengabdian',
    pillVariant: 'red',
    photoCaption: 'Foto: posyandu di desa binaan Lombok Tengah',
    title: 'Mahasiswa kedokteran dampingi posyandu di tiga desa binaan',
    excerpt: 'Program berkelanjutan bersama puskesmas setempat, berfokus pada gizi balita dan kesehatan ibu.',
    dateLabel: '[tanggal]',
    to: '/berita#posyandu',
  },
  {
    key: 'hibah',
    size: 'sm',
    pill: 'Penelitian',
    pillVariant: 'default',
    photoCaption: 'Foto: laboratorium biologi',
    photoVariant: 'sky',
    title: 'Dosen UNIZAR raih hibah riset kolaborasi internasional',
    dateLabel: '[tanggal]',
    to: '/berita#hibah',
  },
  {
    key: 'juara',
    size: 'sm',
    pill: 'Prestasi',
    pillVariant: 'gold',
    photoCaption: 'Foto: tim debat di panggung',
    photoVariant: 'warm',
    title: 'Tim mahasiswa juara kompetisi ilmiah tingkat nasional',
    dateLabel: '[tanggal]',
    to: '/berita#juara',
  },
]

export const AGENDA = [
  {
    day: '20',
    month: 'NOV',
    title: 'Kuliah umum: Kesehatan wisatawan di destinasi super prioritas',
    meta: 'Aula Rektorat · 09.00–12.00 WITA · terbuka untuk umum',
    to: '/berita#agenda-kuliah-umum',
  },
  {
    day: '28',
    month: 'NOV',
    title: 'Expo UMKM halal mahasiswa FAI & FEB',
    meta: 'Halaman kampus · 08.00–16.00 WITA',
    to: '/berita#agenda-expo',
  },
  {
    day: '05',
    month: 'DES',
    title: 'Wisuda Periode II 2026',
    meta: 'Gedung Serbaguna · siaran langsung di kanal YouTube UNIZAR',
    to: '/berita#agenda-wisuda',
  },
]

export const AUDIENCES = [
  { label: 'Calon mahasiswa', labelEn: 'Prospective student', to: '/pendidikan#penerimaan' },
  { label: 'Mahasiswa', labelEn: 'Student', to: '/layanan' },
  { label: 'Dosen & tendik', labelEn: 'Lecturer & staff', to: '/layanan' },
  { label: 'Alumni', labelEn: 'Alumni', to: '/mahasiswa-alumni#alumni' },
  { label: 'Mitra & industri', labelEn: 'Partner', to: '/kerjasama' },
]

export const PARTNERS = Array.from({ length: 6 }, (_, i) => ({
  label: `[Logo mitra ${i + 1}]`,
  to: '/kerjasama',
}))

export const SEARCH_INDEX = [
  { t: 'Penerimaan Mahasiswa Baru 2027', g: 'Pendidikan', to: '/pendidikan#penerimaan' },
  { t: 'Sambutan Rektor', g: 'Profil', to: '/profil#tentang' },
  { t: 'Fakultas Kedokteran', g: 'Fakultas', to: '/fakultas/kedokteran' },
  { t: 'Beasiswa KIP-Kuliah', g: 'Pendidikan', to: '/pendidikan#penerimaan' },
  { t: 'Pusdatin — Dokumen & Data', g: 'Direktori', to: '/pusdatin' },
  { t: 'PPID — Permohonan Informasi', g: 'Tata Kelola', to: '/tata-kelola#ppid' },
  { t: 'Laporan Tahunan UNIZAR', g: 'Tata Kelola', to: '/tata-kelola#laporan' },
  { t: 'Peta Bukti BAN-PT (39 indikator)', g: 'Penjaminan Mutu', to: '/peta-bukti' },
  { t: 'Kalender Akademik 2026/2027', g: 'Pendidikan', to: '/pendidikan#kalender' },
  { t: 'JDIH UNIZAR', g: 'Direktori', to: '/pusdatin#jdih' },
  { t: 'Riset Hibah Internal 2027', g: 'Penelitian', to: '/penelitian#hibah' },
  { t: "Kampus Rahmatan lil 'Alamin", g: 'Profil', to: '/profil#tentang' },
  { t: 'Agenda Wisuda Periode II 2026', g: 'Berita', to: '/berita#agenda-wisuda' },
  { t: 'Manajemen Risiko & SPI', g: 'Tata Kelola', to: '/tata-kelola#risiko' },
]
