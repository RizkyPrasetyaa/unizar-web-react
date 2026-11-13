import { useState } from 'react'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import Button from '../components/ui/Button.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import {
  ExternalLink,
  Lock,
  ChevronDown,
  FileText,
} from 'lucide-react'

// === PPEPP cycle ===
const PPEPP_STEPS = [
  { letter: 'P', label: 'Penetapan', small: 'Jan–Feb · revisi standar', bg: '#053B2C' },
  { letter: 'P', label: 'Pelaksanaan', small: 'Mar–Des · seluruh unit', bg: '#0A6B4F' },
  { letter: 'E', label: 'Evaluasi', small: 'Apr & Agu–Sep · monev dan AMI', bg: '#8A6A10' },
  { letter: 'P', label: 'Pengendalian', small: 'Okt–Nov · RTM dan RTL', bg: '#8E1B20' },
  { letter: 'P', label: 'Peningkatan', small: 'Des · standar naik', bg: '#064E3B' },
]

const MUTU_STATS = [
  { eyebrow: 'AMI 2025', title: '[n] temuan', desc: '[n]% sudah ditindaklanjuti' },
  { eyebrow: 'RTM 2025', title: '[n] keputusan', desc: 'Dilaksanakan [tanggal]' },
  { eyebrow: 'Survei 2025', title: '[n]% puas', desc: 'Dari [n] responden' },
]

// === Dokumen SPMI ===
const DOKUMEN_MUTU = [
  {
    title: 'Ikhtisar Kebijakan & Standar SPMI',
    small: 'Ringkasan publik · 4 halaman',
    label: 'Lihat dokumen →',
    locked: false,
  },
  {
    title: 'Kebijakan, Manual & Standar SPMI',
    small: 'SK [nomor] · v4.0',
    label: 'Masuk untuk membuka',
    locked: true,
  },
  {
    title: 'Formulir & pendokumentasian',
    small: 'Template unit kerja',
    label: 'Masuk untuk membuka',
    locked: true,
  },
  {
    title: 'Laporan Monev & AMI 2025',
    small: 'Akademik dan non-akademik',
    label: 'Masuk untuk membuka',
    locked: true,
  },
  {
    title: 'Laporan RTM & RTL 2025',
    small: 'Keputusan dan status tindak lanjut',
    label: 'Masuk untuk membuka',
    locked: true,
  },
  {
    title: 'Pedoman AMI & daftar auditor',
    small: 'SK penugasan 2026',
    label: 'Masuk untuk membuka',
    locked: true,
  },
]

// === Akreditasi institusi & prodi ===
const PRODI_AKR = [
  {
    name: 'Pendidikan Dokter',
    jenjang: 'S1',
    lembaga: 'LAM-PTKes',
    records: [
      { from: 2004, to: 2008, jenis: 'Izin / status terdaftar', lembaga: 'Kementerian', status: 'SK izin' },
      { from: 2008, to: 2013, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2013, to: 2018, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2018, to: 2023, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2023, to: 2028, jenis: 'Akreditasi', lembaga: 'LAM-PTKes', status: '[peringkat]' },
    ],
  },
  {
    name: 'Profesi Dokter',
    jenjang: 'Profesi',
    lembaga: 'LAM-PTKes',
    records: [
      { from: 2010, to: 2014, jenis: 'Izin / status terdaftar', lembaga: 'Kementerian', status: 'SK izin' },
      { from: 2014, to: 2019, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2019, to: 2024, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2024, to: 2029, jenis: 'Akreditasi', lembaga: 'LAM-PTKes', status: '[peringkat]' },
    ],
  },
  {
    name: 'Teknik Sipil',
    jenjang: 'S1',
    lembaga: 'LAM Teknik',
    records: [
      { from: 1981, to: 1998, jenis: 'Izin / status terdaftar', lembaga: 'Kementerian', status: 'SK izin' },
      { from: 1998, to: 2003, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2003, to: 2008, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2008, to: 2013, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2013, to: 2018, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2018, to: 2023, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2023, to: 2028, jenis: 'Akreditasi', lembaga: 'LAM Teknik', status: '[peringkat]' },
    ],
  },
  {
    name: 'Ilmu Komputer',
    jenjang: 'S1',
    lembaga: 'LAM INFOKOM',
    records: [
      { from: 2022, to: 2026, jenis: 'Izin / status terdaftar', lembaga: 'Kementerian', status: 'SK izin' },
      { from: 2026, to: 2031, jenis: 'Akreditasi', lembaga: 'LAM INFOKOM', status: '[peringkat]' },
    ],
  },
  {
    name: 'Ilmu Hukum',
    jenjang: 'S1',
    lembaga: 'BAN-PT',
    records: [
      { from: 1981, to: 1998, jenis: 'Izin / status terdaftar', lembaga: 'Kementerian', status: 'SK izin' },
      { from: 1998, to: 2003, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2003, to: 2008, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2008, to: 2013, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2013, to: 2018, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2018, to: 2023, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2023, to: 2028, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
    ],
  },
  {
    name: 'Akuntansi',
    jenjang: 'S1',
    lembaga: 'LAMEMBA',
    records: [
      { from: 2016, to: 2020, jenis: 'Izin / status terdaftar', lembaga: 'Kementerian', status: 'SK izin' },
      { from: 2020, to: 2025, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2025, to: 2030, jenis: 'Akreditasi', lembaga: 'LAMEMBA', status: '[peringkat]' },
    ],
  },
  {
    name: 'Ekonomi Pembangunan',
    jenjang: 'S1',
    lembaga: 'LAMEMBA',
    records: [
      { from: 1981, to: 1998, jenis: 'Izin / status terdaftar', lembaga: 'Kementerian', status: 'SK izin' },
      { from: 1998, to: 2003, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2003, to: 2008, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2008, to: 2013, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2013, to: 2018, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2018, to: 2023, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2023, to: 2028, jenis: 'Akreditasi', lembaga: 'LAMEMBA', status: '[peringkat]' },
    ],
  },
  {
    name: 'Agribisnis',
    jenjang: 'S1',
    lembaga: 'BAN-PT',
    records: [
      { from: 1981, to: 1998, jenis: 'Izin / status terdaftar', lembaga: 'Kementerian', status: 'SK izin' },
      { from: 1998, to: 2003, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2003, to: 2008, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2008, to: 2013, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2013, to: 2018, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2018, to: 2023, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2023, to: 2028, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
    ],
  },
  {
    name: 'Agroekoteknologi',
    jenjang: 'S1',
    lembaga: 'BAN-PT',
    records: [
      { from: 2020, to: 2024, jenis: 'Izin / status terdaftar', lembaga: 'Kementerian', status: 'SK izin' },
      { from: 2024, to: 2029, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
    ],
  },
  {
    name: 'Biologi',
    jenjang: 'S1',
    lembaga: 'LAMSAMA',
    records: [
      { from: 1992, to: 1998, jenis: 'Izin / status terdaftar', lembaga: 'Kementerian', status: 'SK izin' },
      { from: 1998, to: 2003, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2003, to: 2008, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2008, to: 2013, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2013, to: 2018, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2018, to: 2023, jenis: 'Akreditasi', lembaga: 'BAN-PT', status: '[peringkat]' },
      { from: 2023, to: 2028, jenis: 'Akreditasi', lembaga: 'LAMSAMA', status: '[peringkat]' },
    ],
  },
  {
    name: 'Ekonomi Syariah',
    jenjang: 'S1',
    lembaga: 'LAMEMBA',
    records: [
      { from: 2023, to: 2030, jenis: 'Izin / status terdaftar', lembaga: 'Kementerian', status: 'SK izin' },
    ],
  },
  {
    name: 'Manajemen Bisnis Syariah',
    jenjang: 'S1',
    lembaga: 'LAMEMBA',
    records: [
      { from: 2023, to: 2030, jenis: 'Izin / status terdaftar', lembaga: 'Kementerian', status: 'SK izin' },
    ],
  },
]

const INSTITUSI_AKR = [
  { from: 1981, to: 1984, jenis: 'Pendirian', lembaga: 'Yayasan', status: 'SK 01/YPLA/1981' },
  { from: 1984, to: 2013, jenis: 'Status terdaftar', lembaga: 'Mendikbud', status: 'SK 0378/0/1984' },
  { from: 2013, to: 2018, jenis: 'Akreditasi institusi', lembaga: 'BAN-PT', status: '[peringkat]' },
  { from: 2018, to: 2023, jenis: 'Akreditasi institusi', lembaga: 'BAN-PT', status: '[peringkat]' },
  { from: 2023, to: 2028, jenis: 'Akreditasi institusi', lembaga: 'BAN-PT', status: '[peringkat]' },
]

export default function PenjaminanMutu() {
  // === Arsip form state ===
  const [akrProdi, setAkrProdi] = useState(PRODI_AKR[0].name)
  const [akrYear, setAkrYear] = useState(2015)
  const [akrResult, setAkrResult] = useState(null)

  function handleAkrSubmit(e) {
    e.preventDefault()
    const prodi = PRODI_AKR.find((p) => p.name === akrProdi)
    if (!prodi) return
    const record = prodi.records.find((r) => akrYear >= r.from && akrYear < r.to)
    if (!record) {
      setAkrResult({ prodi: prodi.name, year: akrYear, notFound: true })
    } else {
      setAkrResult({ prodi: prodi.name, year: akrYear, record })
    }
  }

  return (
    <div className="page animate-fade">
      <PageHero
        title="Penjaminan Mutu"
        description="Sistem mutu yang berjalan sepanjang tahun: menetapkan, melaksanakan, mengevaluasi, mengendalikan, dan meningkatkan."
        crumbs={[{ label: 'Beranda', to: '/beranda' }, { label: 'Penjaminan Mutu' }]}
        photoCaption="Foto: rapat tinjauan manajemen"
        extra={
          <Button variant="ghost" href="#" title="Alamat website menyusul">
            Website BPM{' '}
            <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
          </Button>
        }
      />
      <Subnav
        items={[
          { id: 'penjaminan-mutu--tentang', label: 'Kalender Mutu' },
          { id: 'penjaminan-mutu--dokumen', label: 'Dokumen & Audit' },
          { id: 'penjaminan-mutu--akreditasi', label: 'Akreditasi' },
          { id: 'penjaminan-mutu--bukti', label: 'Peta Bukti' },
        ]}
      />

      {/* === Kalender Mutu (PPEPP) === */}
      <section className="sec" id="penjaminan-mutu--tentang" data-t="Kalender Mutu">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Siklus PPEPP</span>
              <h2>Kalender mutu 2026</h2>
              <p>Setiap tahap tercatat waktunya dan hasilnya dapat dilihat.</p>
            </div>
          </div>

          <div
            className="ppepp"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '14px',
            }}
          >
            {PPEPP_STEPS.map((s, i) => (
              <div
                key={i}
                style={{
                  background: s.bg,
                  color: '#fff',
                  borderRadius: '14px',
                  padding: '18px 20px',
                  display: 'grid',
                  gap: '4px',
                }}
              >
                <b style={{ fontSize: '28px', lineHeight: 1 }}>{s.letter}</b>
                <span style={{ fontWeight: 800, fontSize: '16px' }}>{s.label}</span>
                <small style={{ color: '#DCEFE5', fontSize: '13px' }}>{s.small}</small>
              </div>
            ))}
          </div>

          <div className="grid g3" style={{ marginTop: '22px' }}>
            {MUTU_STATS.map((s) => (
              <Card key={s.eyebrow} flat>
                <span className="eyebrow">{s.eyebrow}</span>
                <h3 style={{ fontSize: '22px' }}>{s.title}</h3>
                <p>{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* === Dokumen SPMI & Audit === */}
      <section className="sec" id="penjaminan-mutu--dokumen" data-t="Dokumen & Audit">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Dokumen mutu</span>
              <h2>Dokumen SPMI &amp; hasil audit</h2>
              <p>
                Dokumen inti dapat dibuka oleh sivitas dan asesor setelah masuk. Publik dapat
                membaca ikhtisarnya.
              </p>
            </div>
          </div>

          <ul
            className="clean"
            style={{
              display: 'grid',
              gap: '0',
              background: '#fff',
              border: '1px solid #DCE6E0',
              borderRadius: '14px',
              overflow: 'hidden',
            }}
          >
            {DOKUMEN_MUTU.map((d, i) => (
              <li
                key={d.title}
                className="doc"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                  padding: '16px 22px',
                  borderBottom:
                    i < DOKUMEN_MUTU.length - 1 ? '1px solid #E8EFEB' : 'none',
                }}
              >
                <div style={{ display: 'grid', gap: '2px' }}>
                  <b style={{ color: '#13231c' }}>{d.title}</b>
                  <small style={{ color: '#4A5E55' }}>{d.small}</small>
                </div>
                {d.locked ? (
                  <SmartLink
                    to="#"
                    className="lock inline-flex items-center gap-1 text-muted text-sm font-bold"
                    ariaLabel={`${d.label} (perlu masuk)`}
                  >
                    <Lock style={{ width: 14, height: 14 }} aria-hidden="true" /> {d.label}
                  </SmartLink>
                ) : (
                  <SmartLink
                    to="#"
                    className="text-em-700 text-sm font-bold"
                  >
                    {d.label}
                  </SmartLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* === Akreditasi === */}
      <section className="sec" id="penjaminan-mutu--akreditasi" data-t="Akreditasi">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Akreditasi</span>
              <h2>Akreditasi institusi &amp; program studi</h2>
              <p>
                Diambil dari BAN-PT, LAM, dan PD Dikti. Setiap baris menampilkan nomor SK, masa
                berlaku, dan sertifikat.
              </p>
            </div>
          </div>

          {/* Institusi */}
          <div
            className="slim"
            style={{
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              background: '#F1F7F3',
              borderRadius: '14px',
              padding: '16px 22px',
            }}
          >
            <p style={{ margin: 0 }}>
              <b style={{ color: '#13231c' }}>Akreditasi institusi:</b>{' '}
              [status sesuai SK BAN-PT] · SK [nomor] · berlaku sampai [tanggal]
            </p>
            <Button variant="line" href="#">
              Sertifikat{' '}
              <FileText style={{ width: 16, height: 16 }} aria-hidden="true" />
            </Button>
          </div>

          {/* Tabel akreditasi prodi terkini */}
          <div
            className="tbl-wrap"
            style={{
              border: '1px solid #DCE6E0',
              borderRadius: '14px',
              overflow: 'hidden',
              overflowX: 'auto',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
              <thead>
                <tr style={{ background: '#064E3B', color: '#fff', textAlign: 'left' }}>
                  {['Program studi', 'Jenjang', 'Lembaga', 'Peringkat', 'Berlaku sampai', 'Sertifikat'].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          padding: '12px 14px',
                          fontSize: '13px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {PRODI_AKR.map((p) => {
                  const latest = p.records[p.records.length - 1]
                  return (
                    <tr
                      key={p.name}
                      style={{ borderBottom: '1px solid #E8EFEB', color: '#13231c' }}
                    >
                      <td style={{ padding: '12px 14px' }}>
                        <b>{p.name}</b>
                      </td>
                      <td style={{ padding: '12px 14px' }}>{p.jenjang}</td>
                      <td style={{ padding: '12px 14px' }}>{p.lembaga}</td>
                      <td style={{ padding: '12px 14px' }}>{latest.status}</td>
                      <td style={{ padding: '12px 14px' }}>{latest.to}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <SmartLink
                          to="#"
                          className="text-em-700 font-bold"
                        >
                          Lihat →
                        </SmartLink>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <p className="note" style={{ marginTop: '12px' }}>
            Nama lembaga akreditasi pada tabel ini masih contoh. Isi sesuai SK yang berlaku untuk
            tiap prodi.
          </p>

          {/* Arsip sertifikat akreditasi */}
          <div
            id="penjaminan-mutu--arsip"
            style={{ marginTop: '44px', scrollMarginTop: '150px' }}
          >
            <span className="eyebrow">Arsip</span>
            <h3 style={{ fontSize: '26px', margin: '6px 0 8px' }}>
              Arsip sertifikat akreditasi
            </h3>
            <p className="muted" style={{ maxWidth: '64ch' }}>
              Seluruh sertifikat sejak UNIZAR berdiri. Alumni dapat langsung mengunduh sertifikat
              yang berlaku saat mereka lulus.
            </p>

            {/* Form pencarian */}
            <form
              className="card akr-find"
              onSubmit={handleAkrSubmit}
              style={{
                marginTop: '18px',
                display: 'grid',
                gap: '14px',
              }}
            >
              <h3>Cari sertifikat berdasarkan tahun lulus</h3>
              <div
                className="toolbar"
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  alignItems: 'flex-end',
                  margin: 0,
                }}
              >
                <div className="field" style={{ display: 'grid', gap: '6px', flex: '1 1 220px' }}>
                  <label htmlFor="akr-p">Program studi</label>
                  <select
                    id="akr-p"
                    value={akrProdi}
                    onChange={(e) => setAkrProdi(e.target.value)}
                    style={{
                      padding: '10px 12px',
                      border: '1px solid #DCE6E0',
                      borderRadius: '14px',
                      fontSize: '15px',
                      background: '#fff',
                      color: '#13231c',
                    }}
                  >
                    {PRODI_AKR.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className="field"
                  style={{ display: 'grid', gap: '6px', flex: '0 1 180px' }}
                >
                  <label htmlFor="akr-y">Tahun lulus</label>
                  <input
                    id="akr-y"
                    type="number"
                    min={1985}
                    max={2026}
                    value={akrYear}
                    onChange={(e) => setAkrYear(Number(e.target.value) || 0)}
                    inputMode="numeric"
                    style={{
                      padding: '10px 12px',
                      border: '1px solid #DCE6E0',
                      borderRadius: '14px',
                      fontSize: '15px',
                      background: '#fff',
                      color: '#13231c',
                    }}
                  />
                </div>
                <Button variant="dark" asButton type="submit">
                  Tampilkan sertifikat
                </Button>
              </div>

              {/* Hasil pencarian */}
              <div className="akr-result" aria-live="polite">
                {akrResult === null ? (
                  <span className="muted" style={{ fontSize: '14px' }}>
                    Pilih program studi dan tahun lulus, lalu tekan tombol di atas.
                  </span>
                ) : akrResult.notFound ? (
                  <span style={{ fontSize: '14px', color: '#8E1B20', fontWeight: 700 }}>
                    Tidak ada sertifikat untuk{' '}
                    <b>{akrResult.prodi}</b> pada tahun lulus{' '}
                    <b>{akrResult.year}</b>. Periksa kembali tahun yang dimasukkan.
                  </span>
                ) : (
                  <>
                    <div style={{ display: 'grid', gap: '2px' }}>
                      <b style={{ color: '#13231c', fontSize: '15px' }}>
                        {akrResult.prodi} · lulus {akrResult.year}
                      </b>
                      <span style={{ color: '#4A5E55', fontSize: '14px' }}>
                        Berlaku {akrResult.record.from}–{akrResult.record.to} ·{' '}
                        {akrResult.record.jenis} · {akrResult.record.lembaga} ·{' '}
                        {akrResult.record.status}
                      </span>
                    </div>
                    <SmartLink
                      to="#"
                      className="text-em-800 font-extrabold text-sm inline-flex items-center gap-1"
                    >
                      Unduh sertifikat →
                    </SmartLink>
                  </>
                )}
              </div>
            </form>

            {/* Daftar arsip per kategori */}
            <div style={{ marginTop: '20px', display: 'grid', gap: '10px' }}>
              {/* Institusi */}
              <details
                className="crit"
                style={{
                  border: '1px solid #DCE6E0',
                  borderRadius: '14px',
                  background: '#fff',
                  overflow: 'hidden',
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    listStyle: 'none',
                    padding: '16px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                  }}
                >
                  <span>
                    <b>Institusi (Perguruan Tinggi)</b>
                    <br />
                    <small style={{ color: '#4A5E55' }}>
                      {INSTITUSI_AKR.length} dokumen · sejak{' '}
                      {INSTITUSI_AKR[0].from}
                    </small>
                  </span>
                  <ChevronDown
                    style={{ width: 18, height: 18, color: '#4A5E55' }}
                    aria-hidden="true"
                  />
                </summary>
                <div
                  className="tbl-wrap"
                  style={{
                    border: '0',
                    borderTop: '1px solid #DCE6E0',
                    borderRadius: '0',
                    overflowX: 'auto',
                  }}
                >
                  <table
                    style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14.5px' }}
                  >
                    <thead>
                      <tr style={{ background: '#F1F7F3', textAlign: 'left' }}>
                        {['Periode', 'Jenis', 'Lembaga', 'Status', 'Nomor SK', 'Sertifikat'].map(
                          (h) => (
                            <th
                              key={h}
                              style={{
                                padding: '10px 12px',
                                fontSize: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                color: '#4A5E55',
                              }}
                            >
                              {h}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {INSTITUSI_AKR.map((r, i) => {
                        const isLatest = i === INSTITUSI_AKR.length - 1
                        return (
                          <tr
                            key={i}
                            style={{ borderBottom: '1px solid #E8EFEB', color: '#13231c' }}
                          >
                            <td style={{ padding: '10px 12px' }}>
                              {r.from}–{r.to}{' '}
                              {isLatest && (
                                <Pill
                                  className="ml-2 text-[10.5px]"
                                >
                                  Terkini
                                </Pill>
                              )}
                            </td>
                            <td style={{ padding: '10px 12px' }}>{r.jenis}</td>
                            <td style={{ padding: '10px 12px' }}>{r.lembaga}</td>
                            <td style={{ padding: '10px 12px' }}>{r.status}</td>
                            <td style={{ padding: '10px 12px' }}>SK [nomor]</td>
                            <td style={{ padding: '10px 12px' }}>
                              <SmartLink
                                to="#"
                                className="text-em-700 font-bold"
                              >
                                Lihat →
                              </SmartLink>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </details>

              {/* Tiap prodi */}
              {PRODI_AKR.map((p) => (
                <details
                  key={p.name}
                  className="crit"
                  style={{
                    border: '1px solid #DCE6E0',
                    borderRadius: '14px',
                    background: '#fff',
                    overflow: 'hidden',
                  }}
                >
                  <summary
                    style={{
                      cursor: 'pointer',
                      listStyle: 'none',
                      padding: '16px 22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '14px',
                    }}
                  >
                    <span>
                      <b>{p.name}</b>
                      <br />
                      <small style={{ color: '#4A5E55' }}>
                        {p.records.length} dokumen · sejak {p.records[0].from}
                      </small>
                    </span>
                    <ChevronDown
                      style={{ width: 18, height: 18, color: '#4A5E55' }}
                      aria-hidden="true"
                    />
                  </summary>
                  <div
                    className="tbl-wrap"
                    style={{
                      border: '0',
                      borderTop: '1px solid #DCE6E0',
                      borderRadius: '0',
                      overflowX: 'auto',
                    }}
                  >
                    <table
                      style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14.5px' }}
                    >
                      <thead>
                        <tr style={{ background: '#F1F7F3', textAlign: 'left' }}>
                          {['Periode', 'Jenis', 'Lembaga', 'Status', 'Nomor SK', 'Sertifikat'].map(
                            (h) => (
                              <th
                                key={h}
                                style={{
                                  padding: '10px 12px',
                                  fontSize: '12px',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.08em',
                                  color: '#4A5E55',
                                }}
                              >
                                {h}
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {p.records.map((r, i) => {
                          const isLatest = i === p.records.length - 1
                          return (
                            <tr
                              key={i}
                              style={{ borderBottom: '1px solid #E8EFEB', color: '#13231c' }}
                            >
                              <td style={{ padding: '10px 12px' }}>
                                {r.from}–{r.to}{' '}
                                {isLatest && (
                                  <Pill className="text-[10.5px]">Terkini</Pill>
                                )}
                              </td>
                              <td style={{ padding: '10px 12px' }}>{r.jenis}</td>
                              <td style={{ padding: '10px 12px' }}>{r.lembaga}</td>
                              <td style={{ padding: '10px 12px' }}>{r.status}</td>
                              <td style={{ padding: '10px 12px' }}>SK [nomor]</td>
                              <td style={{ padding: '10px 12px' }}>
                                <SmartLink
                                  to="#"
                                  className="text-em-700 font-bold"
                                >
                                  Lihat →
                                </SmartLink>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </details>
              ))}
            </div>
          </div>

          <p className="note" style={{ marginTop: '12px' }}>
            Periode pada arsip ini masih contoh untuk memperlihatkan pola. BAN-PT berdiri tahun
            1994, sehingga dokumen sebelum masa itu berupa SK pendirian atau status terdaftar.
          </p>
        </div>
      </section>

      {/* === Peta Bukti BAN-PT (link) === */}
      <section className="sec" id="penjaminan-mutu--bukti" data-t="Peta Bukti">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Untuk asesor</span>
              <h2>Peta Bukti BAN-PT</h2>
            </div>
          </div>

          <div
            className="band"
            style={{
              padding: '32px 36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h2 style={{ color: '#fff' }}>39 indikator IAPT 4.1, satu halaman</h2>
              <p style={{ color: '#DCEFE5', marginTop: '6px' }}>
                Setiap indikator menautkan langsung ke bagian website atau dokumen yang menjadi
                buktinya.
              </p>
            </div>
            <Button variant="pri" href="/peta-bukti">
              Buka Peta Bukti →
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
