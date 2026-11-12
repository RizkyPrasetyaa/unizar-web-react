# Website UNIZAR — Universitas Islam Al-Azhar

Website institusi UNIZAR yang dibangun dari mockup v9. React + Vite + Tailwind CSS, 21 halaman lengkap.

## Stack

- **React 18** (JavaScript, bukan TypeScript)
- **Vite 5** — dev server & bundler
- **Tailwind CSS 3** — styling
- **lucide-react** — icon set
- **@fontsource/plus-jakarta-sans** — font (di-load via CSS @font-face, reliable di semua browser)

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Build

```bash
npm run build      # output ke dist/
npm run preview    # preview build production
```

## Struktur

```
src/
├── main.jsx              # entry point
├── App.jsx               # hash router + page selector
├── index.css            # design tokens + komponen class
├── lib/
│   ├── cn.js            # className merge utility
│   └── router.js        # hash-based router hook
├── data/
│   ├── navigation.js    # menu utama + footer groups
│   └── content.js       # fakultas, stories, agenda, search index
├── components/
│   ├── layout/          # Layout, Header, MegaMenu, Footer, MobileDrawer,
│   │                    # QuickRail, SearchOverlay, UtilityBar, Subnav, PageHero
│   ├── ui/              # Button, Card, Pill, PhotoSlot, SmartLink
│   └── home/            # Hero, AudienceBar, StatsSection, FocusSection,
│                        # FacultyChips, StoriesSection, AgendaSection, PartnersSection
└── pages/               # 21 halaman
    ├── Beranda.jsx
    ├── Profil.jsx
    ├── Fakultas.jsx
    ├── FakultasKedokteran.jsx
    ├── ProdiPendidikanDokter.jsx
    ├── Direktori.jsx
    ├── Pusdatin.jsx
    ├── TataKelola.jsx
    ├── Kinerja.jsx
    ├── Pendidikan.jsx
    ├── Penelitian.jsx
    ├── PublikasiInovasi.jsx
    ├── Pengabdian.jsx
    ├── PenjaminanMutu.jsx
    ├── PetaBukti.jsx
    ├── Layanan.jsx
    ├── Kerjasama.jsx
    ├── MahasiswaAlumni.jsx
    ├── Masuk.jsx
    ├── Berita.jsx
    └── Dasbor.jsx
```

## Routing

Routing pakai URL hash (misal `#profil`, `#fakultas/kedokteran`, `#profil--tentang`).

- `#beranda` → Beranda
- `#profil` → Profil
- `#profil--tentang` → Profil, scroll ke section "tentang"
- `#fakultas/kedokteran` → Fakultas Kedokteran

Mega menu di header (desktop) dan drawer (mobile) sudah terhubung ke router.

## Design tokens

Warna utama UNIZAR: emerald (`em-50` s/d `em-950`), gold, brand-red. Lihat `tailwind.config.js` untuk palet lengkap dan `src/index.css` untuk komponen class (`.btn`, `.card`, `.pill`, `.ph`, `.sec`, dll).

## Font

Plus Jakarta Sans di-load via `@fontsource/plus-jakarta-sans` (CSS @font-face import di `src/index.css`). Semua weight 400–800 tersedia. Font ini otomatis dipakai di seluruh elemen (`body`, `h1`–`h4`, tombol, card, mega menu, dll).

## Halaman

| Halaman | Route | Section |
|---------|-------|---------|
| Beranda | `#beranda` | Hero, Stats, Focus, Fakultas, Stories, Agenda, Partners |
| Profil | `#profil` | Tentang, Sejarah, Pimpinan, Angka, SDGs |
| Fakultas | `#fakultas` | Daftar 7 fakultas |
| Fakultas Kedokteran | `#fakultas/kedokteran` | Tentang, Prodi, Fasilitas, Kabar |
| Pendidikan Dokter | `#prodi/pendidikan-dokter` | Tentang, Belajar, Dosen, Lulusan |
| Direktori | `#direktori` | Unit, Dosen, Pusdatin, Kontak |
| Pusdatin | `#pusdatin` | Dokumen, Data, JDIH |
| Tata Kelola | `#tata-kelola` | Kebijakan, Integritas, Pengawasan, PPID |
| Kinerja | `#kinerja` | Renstra, Kementerian, SDGs, Risiko |
| Pendidikan | `#pendidikan` | Penerimaan, Kurikulum, Kalender, Suasana |
| Penelitian | `#penelitian` | Riset, Publikasi, Tata Kelola |
| Publikasi & Inovasi | `#publikasi-inovasi` | Jurnal, Repositori, SINTA, HKI, Kolaborasi, Hilirisasi |
| Pengabdian | `#pengabdian` | Program, Kepakaran, Dampak |
| Penjaminan Mutu | `#penjaminan-mutu` | Tentang, Dokumen, Akreditasi, Bukti |
| Peta Bukti | `#peta-bukti` | 39 indikator IAPT 4.1 |
| Layanan | `#layanan` | Katalog, Status |
| Kerjasama | `#kerjasama` | Mitra, Internasional, Ajukan |
| Mahasiswa & Alumni | `#mahasiswa-alumni` | Layanan, Prestasi, Alumni |
| Masuk | `#masuk` | Form SSO + Asesor |
| Berita | `#berita` | Berita, Agenda |
| Dasbor | `#dasbor` | Role simulator |

## Lisensi

© 2026 Universitas Islam Al-Azhar.
