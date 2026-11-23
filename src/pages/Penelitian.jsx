import { useEffect, useRef, useState } from 'react'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import PhotoSlot from '../components/ui/PhotoSlot.jsx'
import Button from '../components/ui/Button.jsx'
import { ExternalLink, FileDown, X } from 'lucide-react'

const FOKUS_RISET = [
  {
    id: 'fokus-kesehatan',
    pill: 'Tema 1',
    variant: 'default',
    photoVariant: 'default',
    caption: 'Foto: riset lapangan di destinasi wisata',
    title: 'Kesehatan pariwisata',
    desc: 'Kesehatan wisatawan dan pekerja pariwisata, ergonomi, dan keselamatan kerja di destinasi.',
    bidang: 'Kesehatan & pariwisata',
    koordinator: '[Nama dosen]',
    periode: '2025–2027',
    skema: 'Hibah internal · terapan',
    uraian: '[Uraian riset: latar masalah, metode, dan hasil yang diharapkan.]',
    luaran: ['[Artikel jurnal]', '[HKI / produk]', '[Repositori terbuka]'],
  },
  {
    id: 'fokus-syariah',
    pill: 'Tema 2',
    variant: 'default',
    photoVariant: 'warm',
    caption: 'Foto: wawancara pelaku UMKM',
    title: 'Ekonomi syariah & UMKM',
    desc: 'Pembiayaan syariah, sertifikasi halal, dan daya saing usaha lokal.',
    bidang: 'Ekonomi syariah',
    koordinator: '[Nama dosen]',
    periode: '2025–2027',
    skema: 'Hibah internal · dasar',
    uraian: '[Uraian riset: latar masalah, metode, dan hasil yang diharapkan.]',
    luaran: ['[Artikel jurnal]', '[Modul / pedoman]', '[Repositori terbuka]'],
  },
  {
    id: 'fokus-pangan',
    pill: 'Tema 3',
    variant: 'default',
    photoVariant: 'sky',
    caption: 'Foto: uji tanam di lahan kering',
    title: 'Pangan lahan kering',
    desc: 'Agroekoteknologi dan agribisnis untuk lahan kering NTB.',
    bidang: 'Pertanian & pangan',
    koordinator: '[Nama dosen]',
    periode: '2025–2027',
    skema: 'Hibah internal · terapan',
    uraian: '[Uraian riset: latar masalah, metode, dan hasil yang diharapkan.]',
    luaran: ['[Artikel jurnal]', '[Varietas / produk]', '[Repositori terbuka]'],
  },
]

const PUBLIKASI_LINKS = [
  { pill: 'Jurnal', title: 'Jurnal UNIZAR', desc: 'Jurnal ilmiah terbitan universitas beserta status akreditasinya.', to: '/publikasi-inovasi#jurnal' },
  { pill: 'Akses terbuka', title: 'Repositori institusi', desc: 'Artikel, skripsi, dan laporan penelitian berlisensi terbuka.', to: '/publikasi-inovasi#repositori' },
  { pill: 'SINTA', title: 'Profil SINTA', desc: 'Kinerja publikasi dosen dan institusi di SINTA.', to: '/publikasi-inovasi#sinta' },
  { pill: 'HKI', title: 'Kekayaan intelektual', desc: 'Paten, hak cipta, dan desain industri hasil riset.', to: '/publikasi-inovasi#hki' },
  { pill: 'Kolaborasi', title: 'Kolaborasi riset', desc: 'Riset bersama mitra dalam dan luar negeri.', to: '/publikasi-inovasi#kolaborasi' },
  { pill: 'Inovasi', title: 'Produk & hilirisasi', desc: 'Hasil riset yang dimanfaatkan masyarakat dan industri.', to: '/publikasi-inovasi#hilirisasi' },
]

const STEPS = [
  { title: 'Usulan', desc: 'Unggah proposal sesuai tema peta jalan' },
  { title: 'Telaah', desc: 'Penilaian oleh reviewer yang ditetapkan' },
  { title: 'Etik & kontrak', desc: 'Kelaikan etik dan surat penugasan' },
  { title: 'Pelaksanaan & monev', desc: 'Catatan kemajuan dan seminar hasil' },
  { title: 'Luaran', desc: 'Publikasi terbuka, HKI, repositori' },
]

const RISET_PER_TAHUN = [
  { tahun: '2021', jumlah: 42 },
  { tahun: '2022', jumlah: 58 },
  { tahun: '2023', jumlah: 71 },
  { tahun: '2024', jumlah: 86 },
  { tahun: '2025', jumlah: 95 },
]


const PANDUAN_HIBAH = {
  title: 'Panduan hibah penelitian internal',
  eyebrow: 'Pusdatin · Publik',
  keterangan: 'LPPM · panduan hibah',
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
    } catch {}
  }

  const riwayat = doc.riwayat || []

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="pd pd--wide" role="dialog" aria-modal="true" aria-label={doc.title}>
        <div className="pd-head">
          <span className="eyebrow" style={{ color: '#f2c230' }}>
            {doc.eyebrow || 'Pusdatin · Publik'}
          </span>
          <h3>{doc.title}</h3>
          <button ref={closeRef} type="button" className="pd-close" onClick={onClose} aria-label="Tutup dokumen">
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
                <div><dt>Keterangan</dt><dd>{doc.keterangan}</dd></div>
                <div><dt>Nomor</dt><dd>{doc.nomor}</dd></div>
                <div><dt>Tanggal penetapan</dt><dd>{doc.tanggal}</dd></div>
                <div><dt>Versi</dt><dd>{doc.versi}</dd></div>
                <div><dt>Status</dt><dd>{doc.status}</dd></div>
                <div><dt>Akses</dt><dd>{doc.akses}</dd></div>
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

function ProposalDrawer({ open, onClose }) {
  const closeRef = useRef(null)
  const [judul, setJudul] = useState('')
  const [skema, setSkema] = useState('Dasar')
  const [ketua, setKetua] = useState('')
  const [ringkas, setRingkas] = useState('')
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
    if (!judul.trim() || !ketua.trim()) {
      setMsg('Lengkapi judul dan ketua peneliti terlebih dahulu.')
      return
    }
    setMsg(`Terima kasih. Usulan "${judul.trim()}" tercatat dan akan ditelaah sesuai jadwal hibah.`)
    setJudul('')
    setSkema('Dasar')
    setKetua('')
    setRingkas('')
  }

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="pd" role="dialog" aria-modal="true" aria-label="Ajukan proposal penelitian">
        <div className="pd-head">
          <span className="eyebrow" style={{ color: '#f2c230' }}>Hibah internal 2027</span>
          <h3>Ajukan proposal penelitian</h3>
          <button ref={closeRef} type="button" className="pd-close" onClick={onClose} aria-label="Tutup formulir">
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <p className="pd-bio" style={{ marginBottom: '16px' }}>
            Skema dasar, terapan, dan kolaborasi internasional. Proposal wajib selaras peta jalan
            dan melibatkan mahasiswa.
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
            <div className="field" style={{ display: 'grid', gap: '6px' }}>
              <label htmlFor="p-judul">Judul usulan</label>
              <input
                id="p-judul"
                required
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #DCE6E0',
                  borderRadius: '14px',
                  fontSize: '15px',
                  background: '#fff',
                }}
              />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '14px',
              }}
            >
              <div className="field" style={{ display: 'grid', gap: '6px' }}>
                <label htmlFor="p-skema">Skema</label>
                <select
                  id="p-skema"
                  value={skema}
                  onChange={(e) => setSkema(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid #DCE6E0',
                    borderRadius: '14px',
                    fontSize: '15px',
                    background: '#fff',
                  }}
                >
                  <option>Dasar</option>
                  <option>Terapan</option>
                  <option>Kolaborasi internasional</option>
                </select>
              </div>
              <div className="field" style={{ display: 'grid', gap: '6px' }}>
                <label htmlFor="p-ketua">Ketua peneliti</label>
                <input
                  id="p-ketua"
                  required
                  value={ketua}
                  onChange={(e) => setKetua(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid #DCE6E0',
                    borderRadius: '14px',
                    fontSize: '15px',
                    background: '#fff',
                  }}
                />
              </div>
            </div>
            <div className="field" style={{ display: 'grid', gap: '6px' }}>
              <label htmlFor="p-ringkas">Ringkasan singkat</label>
              <textarea
                id="p-ringkas"
                rows={4}
                value={ringkas}
                onChange={(e) => setRingkas(e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #DCE6E0',
                  borderRadius: '14px',
                  fontSize: '15px',
                  background: '#fff',
                  resize: 'vertical',
                }}
              />
            </div>
            <div className="btn-row">
              <Button variant="dark" asButton type="submit">
                Kirim usulan
              </Button>
              <Button variant="line" asButton onClick={onClose}>
                Batal
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

function RisetDrawer({ tema, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!tema) return
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
  }, [tema, onClose])

  if (!tema) return null

  const luaran = tema.luaran || ['[Artikel jurnal]', '[HKI / produk]', '[Repositori terbuka]']

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd"
        role="dialog"
        aria-modal="true"
        aria-label={`Detail riset ${tema.title}`}
      >
        <div className="pd-head">
          <span className="eyebrow" style={{ color: '#f2c230' }}>
            Tema riset unggulan
          </span>
          <h3>{tema.title}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup detail riset"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <PhotoSlot
            variant={tema.photoVariant}
            caption={tema.caption}
            aria-label={`Tempat foto: ${tema.caption}`}
            style={{ height: '210px' }}
          />
          <dl className="pd-meta">
            <div>
              <dt>Bidang</dt>
              <dd>{tema.bidang}</dd>
            </div>
            <div>
              <dt>Koordinator</dt>
              <dd>{tema.koordinator}</dd>
            </div>
            <div>
              <dt>Periode</dt>
              <dd>{tema.periode}</dd>
            </div>
            <div>
              <dt>Skema</dt>
              <dd>{tema.skema}</dd>
            </div>
          </dl>
          <p className="pd-bio">{tema.desc}</p>
          <p className="pd-bio" style={{ marginTop: '8px' }}>
            {tema.uraian}
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
              Ajukan riset serupa
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Penelitian() {
  const [risetDetail, setRisetDetail] = useState(null)
  const [proposalOpen, setProposalOpen] = useState(false)
  const [docDetail, setDocDetail] = useState(null)

  return (
    <div className="page animate-fade">
      <PageHero
        title="Penelitian"
        description="Riset yang berangkat dari persoalan Nusa Tenggara Barat dan berbicara di tingkat nasional maupun internasional."
        crumbs={[{ label: 'Beranda', to: '/beranda' }, { label: 'Penelitian' }]}
        photoCaption="Foto: peneliti di laboratorium"
        extra={
          <Button variant="ghost" href="#" title="Alamat website menyusul">
            Website LPPM{' '}
            <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
          </Button>
        }
      />
      <Subnav
        items={[
          { id: 'penelitian--grafik', label: 'Grafik Penelitian' },
          { id: 'penelitian--riset', label: 'Riset UNIZAR' },
          { id: 'penelitian--publikasi', label: 'Publikasi & Inovasi' },
          { id: 'penelitian--tata-kelola', label: 'Tata Kelola Riset' },
        ]}
      />

     
{/* === Grafik Penelitian === */}
<section
  className="sec"
  id="penelitian--grafik"
  data-t="Grafik Penelitian"
>
  <div className="wrap">
    <div className="sec-h">
      <div>
        <span className="eyebrow">Grafik penelitian</span>
        <h2>Jumlah penelitian per tahun</h2>
        <p>
          Tren judul penelitian yang didanai dan dilaksanakan di UNIZAR.
        </p>
      </div>
    </div>

    <Card
      flat
      style={{
        padding: '28px 32px',
        background: '#f3faf6',
        maxWidth: 720,
      }}
    >
      <div
        role="img"
        aria-label="Grafik batang jumlah penelitian per tahun"
        style={{
          display: 'grid',
          gap: 8,
        }}
      >
        {[...RISET_PER_TAHUN].reverse().map((d) => {
          const max = Math.max(
            ...RISET_PER_TAHUN.map((item) => item.jumlah),
            1
          )
          const pct = (d.jumlah / max) * 78

          return (
            <div
              key={d.tahun}
              style={{
                display: 'grid',
                gridTemplateColumns: '52px minmax(0, 1fr)',
                columnGap: 14,
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#13231c',
                }}
              >
                {d.tahun}
              </span>

              <div
                style={{
                  position: 'relative',
                  height: 36,
                }}
              >
                <div
                  title={`${d.tahun}: ${d.jumlah}`}
                  style={{
                    width: `${pct}%`,
                    height: '100%',
                    border: '1.75px solid #0C6B4D',
                    background: '#0C6B4D',
                    boxSizing: 'border-box',
                  }}
                />

                <span
                  style={{
                    position: 'absolute',
                    left: `calc(${pct}% + 10px)`,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#0C6B4D',
                    lineHeight: 1,
                  }}
                >
                  {d.jumlah}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  </div>
</section>


      {/* === Riset UNIZAR === */}
      <section className="sec" id="penelitian--riset" data-t="Riset UNIZAR">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Tema unggulan</span>
              <h2>Riset yang kami tekuni</h2>
              <p>Tema mengikuti peta jalan penelitian dan fokus diferensiasi universitas.</p>
            </div>
          </div>

          <div
            className="focus"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '18px',
            }}
          >
            {FOKUS_RISET.map((f) => (
              <button
                key={f.id}
                type="button"
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  textAlign: 'left',
                  cursor: 'pointer',
                  width: '100%',
                  border: '1px solid var(--line)',
                  background: '#fff',
                  display: 'block',
                }}
                onClick={() => setRisetDetail(f)}
                aria-haspopup="dialog"
                aria-label={`Detail riset ${f.title}`}
              >
                <PhotoSlot
                  variant={f.photoVariant}
                  caption={f.caption}
                  aria-label={`Tempat foto: ${f.caption}`}
                  style={{ height: '180px', borderRadius: 0 }}
                />
                <div style={{ padding: '18px 20px', display: 'grid', gap: '8px' }}>
                  <Pill variant={f.variant}>{f.pill}</Pill>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                  <span className="more">Selengkapnya →</span>
                </div>
              </button>
            ))}
          </div>

          <div
            className="band"
            style={{
              marginTop: '22px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span className="eyebrow" style={{ color: 'var(--gold)' }}>Hibah internal 2027</span>
              <h2>Ajukan proposal penelitian</h2>
              <p>
                Skema dasar, terapan, dan kolaborasi internasional. Proposal wajib selaras peta
                jalan dan melibatkan mahasiswa.
              </p>
            </div>
            <div className="btn-row">
              <Button variant="pri" asButton onClick={() => setProposalOpen(true)}>
                Ajukan proposal{' '}
                <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
              </Button>
              <Button variant="ghost" asButton onClick={() => setDocDetail(PANDUAN_HIBAH)}>
                Panduan hibah
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* === Publikasi & Inovasi === */}
      <section className="sec" id="penelitian--publikasi" data-t="Publikasi & Inovasi">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Luaran</span>
              <h2>Publikasi &amp; inovasi</h2>
            </div>
          </div>
          <div className="grid g3">
            {PUBLIKASI_LINKS.map((p) => (
              <Card key={p.title} to={p.to}>
                <Pill>{p.pill}</Pill>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="more">Selengkapnya →</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* === Tata Kelola Riset === */}
      <section className="sec" id="penelitian--tata-kelola" data-t="Tata Kelola Riset">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Tata kelola</span>
              <h2>Alur penelitian di UNIZAR</h2>
            </div>
          </div>
          <ol
            className="clean steps"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
              listStyle: 'none',
              counterReset: 'step',
            }}
          >
            {STEPS.map((s, i) => (
              <li
                key={i}
                style={{
                  background: '#f1f7f3',
                  borderRadius: '14px',
                  padding: '18px 20px',
                  display: 'grid',
                  gap: '6px',
                  counterIncrement: 'step',
                }}
              >
                <b style={{ color: 'var(--em-800)', fontSize: '16px' }}>
                  <span style={{ color: 'var(--gold-ink)', marginRight: '6px' }}>{i + 1}.</span>
                  {s.title}
                </b>
                <p style={{ color: 'var(--muted)', fontSize: '14px' }}>{s.desc}</p>
              </li>
            ))}
          </ol>
          <div className="btn-row" style={{ marginTop: '18px' }}>
            <Button variant="line" href="#">
              Pedoman penelitian
            </Button>
            <Button variant="line" href="#">
              Kode etik penelitian
            </Button>
          </div>
        </div>
      </section>

      <RisetDrawer tema={risetDetail} onClose={() => setRisetDetail(null)} />
      <ProposalDrawer open={proposalOpen} onClose={() => setProposalOpen(false)} />
      <DocDrawer doc={docDetail} onClose={() => setDocDetail(null)} />
    </div>
  )
}
