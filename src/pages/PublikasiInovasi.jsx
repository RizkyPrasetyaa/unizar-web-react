import { useState } from 'react'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import PhotoSlot from '../components/ui/PhotoSlot.jsx'
import Button from '../components/ui/Button.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { ExternalLink, Search } from 'lucide-react'

const JURNAL_ROWS = [
  { title: '[Nama jurnal hukum]', issn: 'e-ISSN [nomor]', bidang: 'Ilmu Hukum', status: 'SINTA [n]', statusVariant: 'default' },
  { title: '[Nama jurnal kedokteran & kesehatan]', issn: 'e-ISSN [nomor]', bidang: 'Kedokteran', status: 'SINTA [n]', statusVariant: 'default' },
  { title: '[Nama jurnal ekonomi & bisnis]', issn: 'e-ISSN [nomor]', bidang: 'Ekonomi', status: 'SINTA [n]', statusVariant: 'default' },
  { title: '[Nama jurnal pertanian]', issn: 'e-ISSN [nomor]', bidang: 'Pertanian', status: 'Proses akreditasi', statusVariant: 'gold' },
  { title: '[Nama jurnal teknik]', issn: 'e-ISSN [nomor]', bidang: 'Teknik', status: 'SINTA [n]', statusVariant: 'default' },
  { title: '[Nama jurnal pengabdian]', issn: 'e-ISSN [nomor]', bidang: 'Pengabdian', status: 'SINTA [n]', statusVariant: 'default' },
]

const REPOSITORI_DOCS = [
  { id: 'doc:judul-artikel-terbaru', title: '[Judul artikel terbaru]', small: '[Penulis] · Artikel · 2026' },
  { id: 'doc:judul-skripsi-terbaru', title: '[Judul skripsi terbaru]', small: '[Penulis] · Skripsi · 2026' },
  { id: 'doc:judul-laporan-penelitian', title: '[Judul laporan penelitian]', small: '[Tim peneliti] · Laporan · 2025' },
]

const KOLEKSI = [
  { value: '[n]', label: 'Artikel' },
  { value: '[n]', label: 'Skripsi & tesis' },
  { value: '[n]', label: 'Laporan riset' },
  { value: '[n]', label: 'Buku & modul' },
]

const SINTA_STATS = [
  { value: '[n]', label: 'Skor SINTA 3 tahun' },
  { value: '[n]', label: 'Artikel terindeks Scopus' },
  { value: '[n]', label: 'Artikel Garuda' },
  { value: '[n]', label: 'Sitasi Google Scholar' },
]

const SINTA_DOSEN = [
  { id: 'detail:dosen', title: '[Nama dosen]', small: '[Fakultas] · skor [n]' },
  { id: 'detail:dosen', title: '[Nama dosen]', small: '[Fakultas] · skor [n]' },
  { id: 'detail:dosen', title: '[Nama dosen]', small: '[Fakultas] · skor [n]' },
]

const HKI_ROWS = [
  { judul: '[Judul paten sederhana]', jenis: 'Paten sederhana', inventor: '[Inventor]', nomor: '[Nomor]', tahun: '2026' },
  { judul: '[Judul modul ajar]', jenis: 'Hak cipta', inventor: '[Pencipta]', nomor: '[Nomor]', tahun: '2025' },
  { judul: '[Judul aplikasi]', jenis: 'Hak cipta (program komputer)', inventor: '[Pencipta]', nomor: '[Nomor]', tahun: '2025' },
  { judul: '[Judul desain alat]', jenis: 'Desain industri', inventor: '[Pendesain]', nomor: '[Nomor]', tahun: '2024' },
]

const KOLABORASI = [
  { id: 'kol-1', pill: 'Internasional', title: '[Judul riset bersama]', desc: '[Mitra luar negeri] · 2025–2027 · luaran: artikel bereputasi' },
  { id: 'kol-2', pill: 'Nasional', title: '[Judul riset bersama]', desc: '[Perguruan tinggi nasional] · 2026 · hibah kolaborasi' },
  { id: 'kol-3', pill: 'Mitra daerah', title: '[Judul riset terapan]', desc: '[Pemerintah daerah / industri] · 2026 · rekomendasi kebijakan' },
]

const HILIRISASI = [
  {
    id: 'hilir-produk-1',
    pill: 'Kesehatan',
    photoVariant: 'default',
    caption: 'Foto: produk inovasi',
    title: '[Nama produk inovasi kesehatan]',
    desc: '[Siapa penggunanya dan manfaatnya]',
  },
  {
    id: 'hilir-produk-2',
    pill: 'Pangan',
    photoVariant: 'warm',
    caption: 'Foto: produk UMKM binaan',
    title: '[Nama produk pangan olahan]',
    desc: '[Mitra UMKM yang memproduksi]',
  },
  {
    id: 'hilir-produk-3',
    pill: 'Teknologi',
    photoVariant: 'sky',
    caption: 'Foto: demo aplikasi',
    title: '[Nama aplikasi / teknologi]',
    desc: '[Instansi pengguna]',
  },
]

export default function PublikasiInovasi() {
  const [repoQuery, setRepoQuery] = useState('')

  return (
    <div className="page animate-fade">
      <PageHero
        title="Publikasi & Inovasi"
        description="Luaran riset dosen dan mahasiswa: jurnal, repositori, kinerja SINTA, kekayaan intelektual, kolaborasi, dan produk yang dimanfaatkan masyarakat."
        crumbs={[
          { label: 'Beranda', to: '/beranda' },
          { label: 'Penelitian', to: '/penelitian' },
          { label: 'Publikasi & Inovasi' },
        ]}
        photoCaption="Foto: peneliti mempresentasikan hasil riset"
        extra={
          <Button variant="ghost" href="#" title="Alamat website menyusul">
            Website LPPM{' '}
            <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
          </Button>
        }
      />
      <Subnav
        items={[
          { id: 'publikasi-inovasi--jurnal', label: 'Jurnal UNIZAR' },
          { id: 'publikasi-inovasi--repositori', label: 'Repositori' },
          { id: 'publikasi-inovasi--sinta', label: 'Profil SINTA' },
          { id: 'publikasi-inovasi--hki', label: 'Kekayaan Intelektual' },
          { id: 'publikasi-inovasi--kolaborasi', label: 'Kolaborasi Riset' },
          { id: 'publikasi-inovasi--hilirisasi', label: 'Produk & Hilirisasi' },
        ]}
      />

      {/* === Jurnal UNIZAR === */}
      <section className="sec" id="publikasi-inovasi--jurnal" data-t="Jurnal UNIZAR">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Jurnal</span>
              <h2>Jurnal terbitan UNIZAR</h2>
              <p>Semua jurnal dikelola melalui OJS dan terbuka untuk penulis dari dalam maupun luar UNIZAR.</p>
            </div>
          </div>
          <div className="tbl-wrap" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--em-800)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Jurnal</th>
                  <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Bidang</th>
                  <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Status</th>
                  <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Frekuensi</th>
                  <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Situs</th>
                </tr>
              </thead>
              <tbody>
                {JURNAL_ROWS.map((j, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '14px' }}>
                      <b>{j.title}</b>
                      <span className="sub" style={{ display: 'block', color: 'var(--muted)', fontSize: '13px' }}>{j.issn}</span>
                    </td>
                    <td style={{ padding: '14px' }}>{j.bidang}</td>
                    <td style={{ padding: '14px' }}>
                      <Pill variant={j.statusVariant}>{j.status}</Pill>
                    </td>
                    <td style={{ padding: '14px' }}>2 terbitan/tahun</td>
                    <td style={{ padding: '14px' }}>
                      <SmartLink to="#" className="weblink" title="Alamat website menyusul">
                        Kunungi{' '}
                        <ExternalLink style={{ width: 12, height: 12 }} aria-hidden="true" />
                      </SmartLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* === Repositori === */}
      <section className="sec" id="publikasi-inovasi--repositori" data-t="Repositori">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Akses terbuka</span>
              <h2>Repositori institusi</h2>
              <p>Artikel, skripsi, tesis, dan laporan penelitian dengan lisensi terbuka.</p>
            </div>
          </div>
          <div className="split">
            <div>
              <div
                className="toolbar"
                style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}
              >
                <div className="field" style={{ flex: '1 1 280px' }}>
                  <label htmlFor="repo-q" style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--em-800)', marginBottom: '6px' }}>
                    Cari di repositori
                  </label>
                  <input
                    id="repo-q"
                    placeholder="judul, penulis, atau kata kunci"
                    value={repoQuery}
                    onChange={(e) => setRepoQuery(e.target.value)}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '14px', border: '1px solid var(--line)', fontSize: '15px' }}
                  />
                </div>
                <Button variant="dark" href="#">Cari <Search style={{ width: 16, height: 16 }} aria-hidden="true" /></Button>
              </div>
              <ul className="clean" style={{ display: 'grid', gap: '14px', marginTop: '18px' }}>
                {REPOSITORI_DOCS.map((d) => (
                  <li
                    key={d.id}
                    className="doc"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', padding: '14px 16px', background: '#f1f7f3', borderRadius: '14px' }}
                  >
                    <div>
                      <b>{d.title}</b>
                      <small style={{ display: 'block', color: 'var(--muted)', fontSize: '13px' }}>{d.small}</small>
                    </div>
                    <SmartLink to="#">Lihat dokumen →</SmartLink>
                  </li>
                ))}
              </ul>
            </div>
            <Card flat>
              <span className="eyebrow">Koleksi</span>
              <div className="grid g2" style={{ marginTop: '8px' }}>
                {KOLEKSI.map((k, i) => (
                  <div key={i}>
                    <b style={{ fontSize: '28px', color: 'var(--em-800)' }}>{k.value}</b>
                    <p>{k.label}</p>
                  </div>
                ))}
              </div>
              <Button variant="line" href="#" style={{ marginTop: '12px' }}>Buka repositori</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* === Profil SINTA === */}
      <section className="sec" id="publikasi-inovasi--sinta" data-t="Profil SINTA">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">SINTA</span>
              <h2>Kinerja publikasi di SINTA</h2>
              <p>Ringkasan dari SINTA Kemdiktisaintek. Klik untuk melihat profil lengkap institusi.</p>
            </div>
          </div>
          <div className="stats">
            {SINTA_STATS.map((s, i) => (
              <div key={i} className="stat">
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="split" style={{ marginTop: '20px' }}>
            <Card>
              <h3>Dosen dengan skor SINTA tertinggi</h3>
              <ul className="clean" style={{ display: 'grid', gap: '14px', marginTop: '14px' }}>
                {SINTA_DOSEN.map((d, i) => (
                  <li
                    key={i}
                    className="doc"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}
                  >
                    <div>
                      <b>{d.title}</b>
                      <small style={{ display: 'block', color: 'var(--muted)', fontSize: '13px' }}>{d.small}</small>
                    </div>
                    <SmartLink to="#">Profil →</SmartLink>
                  </li>
                ))}
              </ul>
            </Card>
            <Card flat>
              <h3>Profil institusi di SINTA</h3>
              <p>Peringkat, skor per bidang, dan daftar publikasi terbaru UNIZAR.</p>
              <Button variant="line" href="#" style={{ marginTop: '12px' }}>Buka profil SINTA</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* === Kekayaan Intelektual === */}
      <section className="sec" id="publikasi-inovasi--hki" data-t="Kekayaan Intelektual">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">HKI</span>
              <h2>Kekayaan intelektual</h2>
              <p>Paten, hak cipta, dan desain industri hasil riset dosen dan mahasiswa, terhubung dengan pangkalan data PDKI.</p>
            </div>
          </div>
          <div className="tbl-wrap" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--em-800)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Judul</th>
                  <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Jenis</th>
                  <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Inventor / pencipta</th>
                  <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Nomor</th>
                  <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Tahun</th>
                </tr>
              </thead>
              <tbody>
                {HKI_ROWS.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '14px' }}><b>{r.judul}</b></td>
                    <td style={{ padding: '14px' }}>{r.jenis}</td>
                    <td style={{ padding: '14px' }}>{r.inventor}</td>
                    <td style={{ padding: '14px' }}>{r.nomor}</td>
                    <td style={{ padding: '14px' }}>{r.tahun}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="btn-row" style={{ marginTop: '16px' }}>
            <Button variant="dark" href="#">Ajukan HKI</Button>
            <Button variant="line" href="#">Panduan pengajuan HKI</Button>
          </div>
        </div>
      </section>

      {/* === Kolaborasi Riset === */}
      <section className="sec" id="publikasi-inovasi--kolaborasi" data-t="Kolaborasi Riset">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Kolaborasi</span>
              <h2>Kolaborasi riset</h2>
            </div>
          </div>
          <div className="grid g3">
            {KOLABORASI.map((k) => (
              <Card key={k.id} to="/kerjasama#mitra">
                <Pill>{k.pill}</Pill>
                <h3>{k.title}</h3>
                <p>{k.desc}</p>
                <span className="more">Selengkapnya →</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* === Produk & Hilirisasi === */}
      <section className="sec" id="publikasi-inovasi--hilirisasi" data-t="Produk & Hilirisasi">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Inovasi</span>
              <h2>Produk &amp; hilirisasi</h2>
              <p>Hasil riset yang sudah dipakai masyarakat, pemerintah, atau industri.</p>
            </div>
          </div>
          <div
            className="focus"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}
          >
            {HILIRISASI.map((h) => (
              <Card key={h.id} to="#" style={{ padding: 0, overflow: 'hidden' }}>
                <PhotoSlot
                  variant={h.photoVariant}
                  caption={h.caption}
                  aria-label={`Tempat foto: ${h.caption}`}
                  style={{ height: '180px', borderRadius: 0 }}
                />
                <div style={{ padding: '18px 20px', display: 'grid', gap: '8px' }}>
                  <Pill variant="gold">{h.pill}</Pill>
                  <h3>{h.title}</h3>
                  <p>{h.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
