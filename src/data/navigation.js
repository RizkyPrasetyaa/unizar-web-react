// Navigasi utama — diambil dari mockup v9
// Dipakai di Header (desktop) + MobileDrawer + Footer

export const NAV_LEFT = [
  {
    key: 'profil',
    label: 'Profil',
    labelEn: 'Profile',
    to: '/profil',
    mega: {
      intro: 'Mengenal UNIZAR',
      links: [
        { title: 'Tentang UNIZAR', desc: 'Sambutan rektor, visi, misi, dan keunggulan', to: '/profil#tentang' },
        { title: 'Sejarah', desc: 'Perjalanan sejak 1981', to: '/profil#sejarah' },
        { title: 'Pimpinan & Struktur', desc: 'Rektor, wakil rektor, dan struktur organisasi', to: '/profil#struktur' },
        { title: 'UNIZAR dalam Angka', desc: 'Fakta ringkas yang selalu mutakhir', to: '/profil/angka' },
        { title: 'UNIZAR untuk SDGs', desc: 'Lima SDGs yang kami tekuni', to: '/profil/sdgs' },
      ],
      feat: { caption: 'Foto: Kampus UNIZAR', to: '/profil#tentang' },
    },
  },
  {
    key: 'fakultas',
    label: 'Fakultas',
    labelEn: 'Faculties',
    to: '/fakultas',
    mega: {
      intro: 'Tujuh fakultas, tiga belas program studi',
      links: [
        { title: 'Kedokteran', desc: 'Pendidikan Dokter · Profesi Dokter', to: '/fakultas/kedokteran' },
        { title: 'Teknik', desc: 'Teknik Sipil · Ilmu Komputer', to: '/fakultas#ft' },
        { title: 'Hukum', desc: 'Ilmu Hukum', to: '/fakultas#fh' },
        { title: 'Ekonomi & Bisnis', desc: 'Akuntansi · Ekonomi Pembangunan', to: '/fakultas#feb' },
        { title: 'Pertanian', desc: 'Agribisnis · Agroekoteknologi', to: '/fakultas#fp' },
        { title: 'MIPA', desc: 'Biologi', to: '/fakultas#fmipa' },
        { title: 'Agama Islam', desc: 'Ekonomi Syariah · Manajemen Bisnis Syariah', to: '/fakultas#fai' },
      ],
      feat: { caption: 'Foto: Fakultas UNIZAR', to: '/fakultas' },
    },
  },
  {
    key: 'direktori',
    label: 'Direktori',
    labelEn: 'Directory',
    to: '/direktori',
    mega: {
      intro: 'Orang, unit, dan dokumen',
      links: [
        { title: 'Unit kerja', desc: 'Biro, lembaga, badan, UPT, dan satgas', to: '/direktori#unit' },
        { title: 'Dosen & Tendik', desc: 'Cari berdasarkan nama atau bidang keilmuan', to: '/direktori#dosen' },
        { title: 'Pusdatin', desc: 'Dokumen resmi, data, statistik, dan JDIH', to: '/pusdatin' },
        { title: 'Kontak & Peta', desc: 'Alamat, telepon, dan peta gedung', to: '/direktori#kontak' },
      ],
      feat: { caption: 'Foto: Unit Kerja UNIZAR', to: '/direktori' },
    },
  },
  {
    key: 'tata-kelola',
    label: 'Tata Kelola',
    labelEn: 'Governance',
    to: '/tata-kelola',
    mega: {
      intro: 'Transparansi & akuntabilitas',
      links: [
        { title: 'Laporan publik', desc: 'Laporan tahunan, keuangan teraudit, survei', to: '/tata-kelola#laporan' },
        { title: 'Integritas', desc: 'Kode etik, Satgas PPKPT, pelaporan', to: '/tata-kelola#integritas' },
        { title: 'Manajemen risiko', desc: 'SPI, manajemen risiko, zona integritas', to: '/tata-kelola#risiko' },
        { title: 'PPID', desc: 'Daftar informasi publik dan permohonan', to: '/tata-kelola#ppid' },
      ],
      feat: { caption: 'Foto: Fasilitas UNIZAR', to: '/tata-kelola' },
    },
  },
]

export const NAV_RIGHT = [
  {
    key: 'pendidikan',
    label: 'Pendidikan',
    labelEn: 'Education',
    to: '/pendidikan',
    mega: {
      intro: 'Belajar di UNIZAR',
      links: [
        { title: 'Penerimaan mahasiswa baru', desc: 'Jalur masuk, biaya, dan beasiswa', to: '/pendidikan#penerimaan' },
        { title: 'Kurikulum & pembelajaran', desc: 'OBE, MBKM, RPL, dan e-learning', to: '/pendidikan#kurikulum' },
        { title: 'Kalender akademik', desc: 'Kalender akademik dan panduan studi', to: '/pendidikan#kalender' },
        { title: 'Akademik & kemahasiswaan', desc: 'Kuliah umum, integritas akademik', to: '/pendidikan#akademik' },
      ],
      feat: { caption: 'Foto: Fasilitas UNIZAR', to: '/pendidikan' },
    },
  },
  {
    key: 'penelitian',
    label: 'Penelitian',
    labelEn: 'Research',
    to: '/penelitian',
    mega: {
      intro: 'Riset & inovasi',
      links: [
        { title: 'Riset unggulan', desc: 'Tema unggulan, peta jalan, hibah', to: '/penelitian#unggulan' },
        { title: 'Publikasi & inovasi', desc: 'Jurnal, repositori, SINTA, HKI, hilirisasi', to: '/publikasi-inovasi' },
        { title: 'Etik penelitian', desc: 'Alur, etik, dan pedoman', to: '/penelitian#etik' },
      ],
      feat: { caption: 'Foto: Penelitian UNIZAR', to: '/penelitian' },
    },
  },
  {
    key: 'pengabdian',
    label: 'Pengabdian',
    labelEn: 'Community Service',
    to: '/pengabdian',
    mega: {
      intro: 'Mengabdi pada masyarakat',
      links: [
        { title: 'Program unggulan', desc: 'Program unggulan dan lokasinya', to: '/pengabdian#program' },
        { title: 'Kolaborasi pakar', desc: 'Ajukan kerja sama dengan pakar', to: '/pengabdian#kolaborasi' },
        { title: 'Cerita dampak', desc: 'Cerita perubahan dan luaran', to: '/pengabdian#dampak' },
      ],
      feat: { caption: 'Foto: Pengabdian UNIZAR', to: '/pengabdian' },
    },
  },
  {
    key: 'penjaminan-mutu',
    label: 'Penjaminan Mutu',
    labelEn: 'Quality Assurance',
    to: '/penjaminan-mutu',
    mega: {
      intro: 'Siklus mutu sepanjang tahun',
      links: [
        { title: 'Siklus PPEPP', desc: 'Siklus PPEPP sepanjang tahun', to: '/penjaminan-mutu#ppepp' },
        { title: 'SPMI & AMI', desc: 'SPMI, AMI, RTM, dan RTL', to: '/penjaminan-mutu#spmi' },
        { title: 'Akreditasi', desc: 'Institusi dan program studi', to: '/penjaminan-mutu#akreditasi' },
        { title: 'Peta Bukti BAN-PT', desc: '39 indikator IAPT 4.1', to: '/peta-bukti' },
      ],
      feat: { caption: 'Foto: Kegiatan UNIZAR', to: '/penjaminan-mutu' },
    },
  },
]

export const ALL_MENUS = [...NAV_LEFT, ...NAV_RIGHT]

export const RAIL_LINKS = [
  { to: '/masuk', label: 'Masuk', labelEn: 'Sign in', variant: 'login' },
  { to: '/layanan', label: 'Layanan', labelEn: 'Services' },
  { to: '/kerjasama', label: 'Kerjasama & Internasional', labelEn: 'Partnerships' },
  { to: '/mahasiswa-alumni', label: 'Mahasiswa & Alumni', labelEn: 'Students & Alumni' },
]

export const FOOTER_GROUPS = [
  {
    title: 'Universitas',
    titleEn: 'University',
    links: [
      { label: 'Profil', to: '/profil' },
      { label: 'Fakultas', to: '/fakultas' },
      { label: 'Direktori', to: '/direktori' },
      { label: 'Tata Kelola', to: '/tata-kelola' },
    ],
  },
  {
    title: 'Akademik',
    titleEn: 'Academics',
    links: [
      { label: 'Pendidikan', to: '/pendidikan' },
      { label: 'Penelitian', to: '/penelitian' },
      { label: 'Pengabdian', to: '/pengabdian' },
      { label: 'Penjaminan Mutu', to: '/penjaminan-mutu' },
    ],
  },
  {
    title: 'Akses cepat',
    titleEn: 'Quick access',
    links: [
      { label: 'Layanan', to: '/layanan' },
      { label: 'Kerjasama', to: '/kerjasama' },
      { label: 'Mahasiswa & Alumni', to: '/mahasiswa-alumni' },
      { label: 'Pusdatin', to: '/pusdatin' },
      { label: 'JDIH UNIZAR ↗', to: '/pusdatin#jdih', external: true },
    ],
  },
  {
    title: 'Sistem nasional',
    titleEn: 'National systems',
    links: [
      { label: 'PD Dikti ↗', to: 'https://pddikti.kemdikbud.go.id', external: true },
      { label: 'SINTA ↗', to: 'https://sinta.kemdikbud.go.id', external: true },
      { label: 'SPADA ↗', to: 'https://spada.kemdikbud.go.id', external: true },
      { label: 'SIERRA (RPL) ↗', to: '#', external: true },
    ],
  },
]
