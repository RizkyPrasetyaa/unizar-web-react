import { useEffect, useRef, useState } from 'react'
import YearBars from '../components/ui/YearBars.jsx'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import PhotoSlot from '../components/ui/PhotoSlot.jsx'
import Button from '../components/ui/Button.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { ExternalLink, FileDown, Lock, X } from 'lucide-react'

const PROGRAM_CARDS = [
  {
    id: 'pkm-kesehatan',
    pill: 'Kesehatan',
    title: 'Desa binaan kesehatan',
    desc: 'Pendampingan posyandu dan kesehatan ibu-anak bersama puskesmas.',
    lokasi: '[Desa, kabupaten]',
    mitra: '[Mitra]',
    periode: '2025–2027',
    ketua: '[Nama dosen]',
    uraian: '[Uraian program: latar masalah, kegiatan, dan hasil.]',
    luaran: ['[Modul / produk]', '[Artikel pengabdian]', '[Liputan media]'],
    photoCaption: 'Foto: kegiatan program',
  },
  {
    id: 'pkm-umkm',
    pill: 'Ekonomi',
    title: 'Klinik UMKM halal',
    desc: 'Pendampingan legalitas, sertifikasi halal, dan pemasaran digital.',
    lokasi: '[Desa / pasar, kabupaten]',
    mitra: '[Dinas / komunitas UMKM]',
    periode: '2025–2027',
    ketua: '[Nama dosen]',
    uraian: '[Uraian program: latar masalah, kegiatan, dan hasil.]',
    luaran: ['[Modul / produk]', '[Artikel pengabdian]', '[Liputan media]'],
    photoCaption: 'Foto: kegiatan program',
  },
  {
    id: 'pkm-pangan',
    pill: 'Pangan',
    title: 'Sekolah lapang petani',
    desc: 'Teknik budidaya lahan kering dan pascapanen.',
    lokasi: '[Desa, kabupaten]',
    mitra: '[Kelompok tani / dinas pertanian]',
    periode: '2025–2027',
    ketua: '[Nama dosen]',
    uraian: '[Uraian program: latar masalah, kegiatan, dan hasil.]',
    luaran: ['[Modul / produk]', '[Artikel pengabdian]', '[Liputan media]'],
    photoCaption: 'Foto: kegiatan program',
  },
]


const DAMPAK_DOCS = [
  {
    title: 'Laporan monev PkM 2025',
    small: 'LPPM · ringkasan publik',
    label: 'Lihat ringkasan →',
    locked: false,
    eyebrow: 'Pusdatin · Ringkasan publik',
    keterangan: 'LPPM · ringkasan publik',
    nomor: 'SK [nomor]',
    tanggal: '[tanggal]',
    versi: '[v]',
    status: 'Berlaku',
    akses: 'Ringkasan publik',
    riwayat: [
      { versi: '[v terbaru]', desc: 'Berlaku sejak [tanggal]' },
      { versi: '[v sebelumnya]', desc: 'Diganti setelah evaluasi dan RTM' },
    ],
  },
  {
    title: 'Luaran PkM 3 tahun',
    small: 'Artikel, modul, produk, HKI',
    label: 'Lihat dokumen →',
    locked: false,
    eyebrow: 'Pusdatin · Publik',
    keterangan: 'LPPM · rekap luaran',
    nomor: 'SK [nomor]',
    tanggal: '[tanggal]',
    versi: '[v]',
    status: 'Berlaku',
    akses: 'Publik',
    riwayat: [
      { versi: '[v terbaru]', desc: 'Berlaku sejak [tanggal]' },
      { versi: '[v sebelumnya]', desc: 'Diganti setelah evaluasi dan RTM' },
    ],
  },
  {
    title: 'Laporan akhir per judul',
    small: 'Untuk sivitas dan asesor',
    label: 'Masuk untuk membuka',
    locked: true,
    eyebrow: 'Dokumen terbatas',
  },
]

const PANDUAN_KOLABORASI = {
  title: 'Panduan kolaborasi pengabdian',
  eyebrow: 'Pusdatin · Publik',
  keterangan: 'LPPM · panduan mitra',
  nomor: 'SK [nomor]',
  tanggal: '[tanggal]',
  versi: '[v]',
  status: 'Berlaku',
  akses: 'Publik',
  riwayat: [
    { versi: '[v terbaru]', desc: 'Berlaku sejak [tanggal]' },
    { versi: '[v sebelumnya]', desc: 'Diganti setelah evaluasi dan RTM' },
  ],
}

const CERITA_DAMPAK = [
  {
    id: 'cerita-1',
    title: 'Mahasiswa kedokteran dampingi posyandu di tiga desa binaan',
    summary: 'Program berkelanjutan bersama puskesmas setempat ini berfokus pada gizi balita dan kesehatan ibu.',
    isi: '[Isi berita: kegiatan, kutipan dosen pendamping dan kepala desa, capaian, dan rencana lanjutan.]',
    tanggal: '[tanggal]',
    penulis: 'Humas UNIZAR',
    photoCaption: 'Foto: posyandu di desa binaan Lombok Tengah',
  },
]

const KABUPATEN_OPTIONS = [
  'Pilih…',
  'Kota Mataram',
  'Lombok Barat',
  'Lombok Tengah',
  'Lombok Timur',
  'Lombok Utara',
  'Sumbawa',
]

const PKM_PER_TAHUN = [
  { tahun: '2021', jumlah: 36 },
  { tahun: '2022', jumlah: 48 },
  { tahun: '2023', jumlah: 64 },
  { tahun: '2024', jumlah: 74 },
  { tahun: '2025', jumlah: 81 },
]



function DocDrawer({ doc, onClose }) {
  const closeRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!doc) return
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [doc, onClose])

  if (!doc) return null

  const salinTautan = () => {
    try {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard tidak tersedia
    }
  }

  const riwayat = doc.riwayat || []

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd pd--wide"
        role="dialog"
        aria-modal="true"
        aria-label={doc.title}
      >
        <div className="pd-head">
          <span className="eyebrow" style={{ color: '#f2c230' }}>
            {doc.eyebrow || 'Pusdatin · Publik'}
          </span>
          <h3>{doc.title}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup dokumen"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <div className="pd-doc-grid">
            <div className="pd-doc">
              <img src="/logo.png" alt="Logo UNIZAR" />
              <b>{doc.title}</b>
              <div className="pd-doc-lines" aria-hidden="true">
                <span style={{ width: '88%' }} />
                <span style={{ width: '72%' }} />
                <span style={{ width: '80%' }} />
                <span style={{ width: '62%' }} />
              </div>
              <small>Pratinjau dokumen</small>
            </div>
            <div>
              <dl className="pd-meta">
                <div>
                  <dt>Keterangan</dt>
                  <dd>{doc.keterangan}</dd>
                </div>
                <div>
                  <dt>Nomor</dt>
                  <dd>{doc.nomor}</dd>
                </div>
                <div>
                  <dt>Tanggal penetapan</dt>
                  <dd>{doc.tanggal}</dd>
                </div>
                <div>
                  <dt>Versi</dt>
                  <dd>{doc.versi}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{doc.status}</dd>
                </div>
                <div>
                  <dt>Akses</dt>
                  <dd>{doc.akses}</dd>
                </div>
              </dl>
              <div className="pd-sec">
                <h4>Riwayat versi</h4>
                <ul className="clean">
                  {riwayat.map((r, i) => (
                    <li key={i} className="pd-row pd-versi">
                      <b>{r.versi}</b> {r.desc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="btn-row">
                <Button variant="dark" asButton onClick={() => {}}>
                  <FileDown size={17} strokeWidth={1.9} /> Unduh PDF
                </Button>
                <Button variant="line" asButton onClick={salinTautan}>
                  {copied ? 'Tautan disalin ✓' : 'Salin tautan'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function LockedDrawer({ doc, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!doc) return
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [doc, onClose])

  if (!doc) return null

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd"
        role="dialog"
        aria-modal="true"
        aria-label={`Dokumen terbatas: ${doc.title}`}
      >
        <div className="pd-head">
          <span className="eyebrow" style={{ color: '#f2c230' }}>
            Dokumen terbatas
          </span>
          <h3>{doc.title}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body" style={{ textAlign: 'center', paddingTop: '28px', paddingBottom: '28px' }}>
          <Lock size={36} strokeWidth={1.6} style={{ color: 'var(--em-700)', margin: '0 auto 16px' }} aria-hidden="true" />
          <p className="pd-bio" style={{ maxWidth: '36ch', margin: '0 auto 20px' }}>
            Silakan masuk terlebih dahulu. Layanan ini untuk sivitas atau asesor.
          </p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <Button variant="dark" href="/masuk">
              Masuk
            </Button>
            <Button variant="line" asButton onClick={onClose}>
              Nanti saja
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

function ProgramDrawer({ program, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!program) return
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [program, onClose])

  if (!program) return null

  const luaran = program.luaran || ['[Modul / produk]', '[Artikel pengabdian]', '[Liputan media]']

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd"
        role="dialog"
        aria-modal="true"
        aria-label={`Detail program ${program.title}`}
      >
        <div className="pd-head">
          <span className="eyebrow" style={{ color: '#f2c230' }}>
            Program pengabdian
          </span>
          <h3>{program.title}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup detail program"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <PhotoSlot
            caption={program.photoCaption || 'Foto: kegiatan program'}
            aria-label={`Tempat foto: ${program.photoCaption || 'kegiatan program'}`}
            style={{ height: '210px' }}
          />
          <dl className="pd-meta">
            <div>
              <dt>Lokasi</dt>
              <dd>{program.lokasi}</dd>
            </div>
            <div>
              <dt>Mitra</dt>
              <dd>{program.mitra}</dd>
            </div>
            <div>
              <dt>Periode</dt>
              <dd>{program.periode}</dd>
            </div>
            <div>
              <dt>Ketua tim</dt>
              <dd>{program.ketua}</dd>
            </div>
          </dl>
          <p className="pd-bio">{program.desc}</p>
          <p className="pd-bio" style={{ marginTop: '8px' }}>
            {program.uraian}
          </p>
          <div className="pd-sec">
            <h4>Luaran</h4>
            <ul className="clean">
              {luaran.map((l, i) => (
                <li key={i} className="pd-row">
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="btn-row" style={{ marginTop: '18px' }}>
            <Button variant="dark" href="#">
              Ajukan program serupa
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}


function CeritaDrawer({ cerita, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!cerita) return
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [cerita, onClose])

  if (!cerita) return null

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd"
        role="dialog"
        aria-modal="true"
        aria-label={`Berita: ${cerita.title}`}
      >
        <div className="pd-head">
          <span className="eyebrow" style={{ color: '#f2c230' }}>
            Pengabdian
          </span>
          <h3>{cerita.title}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup berita"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <PhotoSlot
            caption={cerita.photoCaption}
            aria-label={`Tempat foto: ${cerita.photoCaption}`}
            style={{ height: '210px' }}
          />
          <dl className="pd-meta">
            <div>
              <dt>Tanggal</dt>
              <dd>{cerita.tanggal}</dd>
            </div>
            <div>
              <dt>Penulis</dt>
              <dd>{cerita.penulis}</dd>
            </div>
          </dl>
          <p className="pd-bio">{cerita.summary}</p>
          <p className="pd-bio" style={{ marginTop: '8px' }}>
            {cerita.isi}
          </p>
          <div className="btn-row" style={{ marginTop: '18px' }}>
            <Button variant="line" href="#">
              Bagikan berita
            </Button>
            <Button variant="line" href="#">
              Berita lainnya
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}


function KolaborasiDrawer({ open, onClose }) {
  const closeRef = useRef(null)
  const [org, setOrg] = useState('')
  const [kab, setKab] = useState(KABUPATEN_OPTIONS[0])
  const [need, setNeed] = useState('')
  const [cp, setCp] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()
    if (!org.trim() || !need.trim()) {
      setMsg('Lengkapi nama lembaga dan kebutuhan terlebih dahulu.')
      return
    }
    setMsg(
      `Terima kasih, ${org.trim()}. Permintaan tercatat dan akan dicocokkan dengan pakar dalam 7 hari kerja.`,
    )
    setOrg('')
    setKab(KABUPATEN_OPTIONS[0])
    setNeed('')
    setCp('')
  }

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd"
        role="dialog"
        aria-modal="true"
        aria-label="Ajukan kolaborasi dengan pakar UNIZAR"
      >
        <div className="pd-head">
          <span className="eyebrow" style={{ color: '#f2c230' }}>
            Kolaborasi
          </span>
          <h3>Ajukan kolaborasi dengan pakar UNIZAR</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup formulir"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <p className="pd-bio" style={{ marginBottom: '16px' }}>
            Untuk pemerintah desa dan daerah, sekolah, komunitas, UMKM, dan industri.
            Permintaan dicocokkan dengan pakar dalam 7 hari kerja.
          </p>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'grid', gap: '14px' }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '14px',
              }}
            >
              <div className="field" style={{ display: 'grid', gap: '6px' }}>
                <label htmlFor="k-org">Nama lembaga / komunitas</label>
                <input
                  id="k-org"
                  required
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
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
              <div className="field" style={{ display: 'grid', gap: '6px' }}>
                <label htmlFor="k-kab">Kabupaten / kota</label>
                <select
                  id="k-kab"
                  value={kab}
                  onChange={(e) => setKab(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid #DCE6E0',
                    borderRadius: '14px',
                    fontSize: '15px',
                    background: '#fff',
                    color: '#13231c',
                  }}
                >
                  {KABUPATEN_OPTIONS.map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field" style={{ display: 'grid', gap: '6px' }}>
              <label htmlFor="k-need">Kebutuhan atau permasalahan</label>
              <textarea
                id="k-need"
                required
                rows={4}
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #DCE6E0',
                  borderRadius: '14px',
                  fontSize: '15px',
                  background: '#fff',
                  color: '#13231c',
                  resize: 'vertical',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'flex-end',
              }}
            >
              <div className="field" style={{ display: 'grid', gap: '6px', flex: '1 1 220px' }}>
                <label htmlFor="k-cp">Narahubung</label>
                <input
                  id="k-cp"
                  placeholder="email atau WhatsApp"
                  value={cp}
                  onChange={(e) => setCp(e.target.value)}
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
                Kirim permintaan
              </Button>
            </div>
            {msg && (
              <p className="form-msg" aria-live="polite" style={{ margin: 0, fontSize: '14px' }}>
                {msg}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default function Pengabdian() {
  const [programDetail, setProgramDetail] = useState(null)
  const [ceritaDetail, setCeritaDetail] = useState(null)
  const [kolaborasiOpen, setKolaborasiOpen] = useState(false)
  const [docDetail, setDocDetail] = useState(null)
  const [lockedDoc, setLockedDoc] = useState(null)

  return (
    <div className="page animate-fade">
      <PageHero
        title="Pengabdian kepada Masyarakat"
        description="Ilmu yang hadir di desa, sekolah, puskesmas, dan pasar di seluruh Nusa Tenggara Barat."
        crumbs={[{ label: 'Beranda', to: '/beranda' }, { label: 'Pengabdian' }]}
        photoCaption="Foto: kegiatan di desa binaan"
        extra={
          <Button variant="ghost" href="#" title="Alamat website menyusul">
            Website LPPM{' '}
            <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
          </Button>
        }
      />
      <Subnav
        items={[
          { id: 'pengabdian--grafik', label: 'Grafik Pengabdian' },
          { id: 'pengabdian--program', label: 'Program & Desa Binaan' },
          { id: 'pengabdian--kepakaran', label: 'Kepakaran & Kolaborasi' },
          { id: 'pengabdian--dampak', label: 'Dampak & Luaran' },
        ]}
      />


      {/* === Grafik Pengabdian === */}
     
{/* === Grafik Pengabdian === */}
<section
  className="sec"
  id="pengabdian--grafik"
  data-t="Grafik Pengabdian"
>
  <div className="wrap">
    {/* Judul dan deskripsi di atas grafik */}
    <div className="sec-h">
      <div>
        <span className="eyebrow">Grafik Pengabdian</span>
        <h2>Jumlah pengabdian per tahun</h2>
        <p>
          Tren kegiatan pengabdian kepada masyarakat yang
          dilaksanakan di UNIZAR.
        </p>
      </div>
    </div>

    {/* Grafik di bawah judul */}
    <Card
      flat
      style={{
        padding: '28px 32px',
        background: '#f3faf6',
        maxWidth: 720,
      }}
    >
      <YearBars
        data={PKM_PER_TAHUN}
        ariaLabel="Grafik batang jumlah pengabdian per tahun"
      />
    </Card>
  </div>
</section>


      {/* === Program & Desa Binaan === */}
      <section className="sec" id="pengabdian--program" data-t="Program & Desa Binaan">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Program</span>
              <h2>Program unggulan &amp; desa binaan</h2>
            </div>
          </div>

          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: '20px', alignItems: 'stretch' }}
          >
                        <div className="grid g2">
              {PROGRAM_CARDS.map((p) => (
                <button
                  key={p.id || p.title}
                  type="button"
                  className="card"
                  style={{
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    width: '100%',
                    border: '1px solid var(--line)',
                    background: '#fff',
                  }}
                  onClick={() => setProgramDetail(p)}
                  aria-haspopup="dialog"
                  aria-label={`Detail program ${p.title}`}
                >
                  <Pill>{p.pill}</Pill>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <span className="more">Selengkapnya →</span>
                </button>
              ))}
            </div>
            <PhotoSlot
              variant="sky"
              caption="Foto: peta sebaran program di NTB (interaktif)"
              aria-label="Tempat foto: peta sebaran program di NTB (interaktif)"
              style={{ height: '100%', minHeight: '320px' }}
            />
          </div>

        </div>
      </section>

      {/* === Kepakaran & Kolaborasi === */}
      <section className="sec" id="pengabdian--kepakaran" data-t="Kepakaran & Kolaborasi">
        <div className="wrap">
          <div
            className="band"
            style={{
              marginBottom: '22px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span className="eyebrow" style={{ color: 'var(--gold)' }}>Kemitraan</span>
              <h2>Ajukan kolaborasi</h2>
              <p>
                Untuk pemerintah desa dan daerah, sekolah, komunitas, UMKM, dan industri.
                Permintaan dicocokkan dengan pakar dalam 7 hari kerja.
              </p>
            </div>
            <div className="btn-row">
              <Button variant="pri" asButton onClick={() => setKolaborasiOpen(true)}>
                Ajukan kolaborasi{' '}
                <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
              </Button>
              <Button variant="ghost" asButton onClick={() => setDocDetail(PANDUAN_KOLABORASI)}>
                Panduan kolaborasi
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* === Dampak & Luaran === */}
      <section className="sec" id="pengabdian--dampak" data-t="Dampak & Luaran">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Dampak</span>
              <h2>Cerita perubahan</h2>
            </div>
          </div>

          <div
            className="stories"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
              gap: '20px',
              alignItems: 'start',
            }}
          >
            <button
              type="button"
              className="card story"
              style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                textAlign: 'left',
                cursor: 'pointer',
                width: '100%',
                border: '1px solid var(--line)',
                background: '#fff',
              }}
              onClick={() => setCeritaDetail(CERITA_DAMPAK[0])}
              aria-haspopup="dialog"
              aria-label={`Baca cerita: ${CERITA_DAMPAK[0].title}`}
            >
              <PhotoSlot
                caption={CERITA_DAMPAK[0].photoCaption}
                aria-label={`Tempat foto: ${CERITA_DAMPAK[0].photoCaption}`}
                style={{ height: '240px', borderRadius: 0 }}
              />
              <div className="t" style={{ padding: '18px 20px', display: 'grid', gap: '8px' }}>
                <Pill variant="red">Kisah</Pill>
                <h3>{CERITA_DAMPAK[0].title}</h3>
                <p className="muted">{CERITA_DAMPAK[0].summary}</p>
              </div>
            </button>

            <div
              className="story-stack"
              style={{ display: 'grid', gap: '0', alignItems: 'start' }}
            >
              <div
                className="band"
                style={{
                  marginBottom: '22px',
                  padding: '28px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <span className="eyebrow" style={{ color: '#F2C230' }}>
                    UNIZAR untuk SDGs
                  </span>
                  <h2 style={{ color: '#fff', marginTop: '6px' }}>
                    Lima SDGs yang kami tekuni
                  </h2>
                  <p style={{ color: '#DCEFE5', marginTop: '6px' }}>
                    Tanpa kemiskinan, pendidikan berkualitas, pekerjaan layak, kelembagaan yang
                    tangguh, dan kemitraan.
                  </p>
                </div>
                <div className="btn-row">
                  <Button variant="pri" href="/profil#sdgs">
                    Lihat capaian SDGs
                  </Button>
                </div>
              </div>

              <ul
                className="clean"
                style={{
                  display: 'grid',
                  gap: '10px',
                  background: '#fff',
                  border: '1px solid #DCE6E0',
                  borderRadius: '14px',
                  padding: '14px 18px',
                }}
              >
                {DAMPAK_DOCS.map((d) => (
                  <li
                    key={d.title}
                    className="doc"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '14px',
                      padding: '10px 0',
                      borderBottom: '1px solid #E8EFEB',
                    }}
                  >
                    <div>
                      <b style={{ color: '#13231c' }}>{d.title}</b>
                      <br />
                      <small style={{ color: '#4A5E55' }}>{d.small}</small>
                    </div>
                    {d.locked ? (
                      <button
                        type="button"
                        className="lock inline-flex items-center gap-1 text-muted text-sm font-bold"
                        onClick={() => setLockedDoc(d)}
                        aria-haspopup="dialog"
                      >
                        <Lock style={{ width: 14, height: 14 }} aria-hidden="true" /> {d.label}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-em-700 text-sm font-bold"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        onClick={() => setDocDetail(d)}
                        aria-haspopup="dialog"
                      >
                        {d.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <ProgramDrawer program={programDetail} onClose={() => setProgramDetail(null)} />
      <CeritaDrawer cerita={ceritaDetail} onClose={() => setCeritaDetail(null)} />
      <KolaborasiDrawer open={kolaborasiOpen} onClose={() => setKolaborasiOpen(false)} />
      <DocDrawer doc={docDetail} onClose={() => setDocDetail(null)} />
      <LockedDrawer doc={lockedDoc} onClose={() => setLockedDoc(null)} />
    </div>
  )
}
