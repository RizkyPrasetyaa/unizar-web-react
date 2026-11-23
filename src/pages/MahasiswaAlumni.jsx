import { useEffect, useRef, useState } from 'react'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import PhotoSlot from '../components/ui/PhotoSlot.jsx'
import Button from '../components/ui/Button.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { ArrowRight, X, Download, ExternalLink, Copy, Lock, LogIn, Mail, Phone } from 'lucide-react'

/* ─── data kartu layanan ─── */
const PMB_ITEMS = [
  { pill: 'Keuangan', title: 'Beasiswa', desc: 'Informasi dan pendaftaran beasiswa.', to: '/pendidikan#penerimaan' },
  { pill: 'Mahasiswa baru', title: 'PKKMB', desc: 'Pengenalan kehidupan kampus bagi mahasiswa baru.', popup: 'pkkmb' },
]

const KDLK_ITEMS = [
  { pill: 'Kesehatan', title: 'Konseling', desc: 'Psikolog kampus, kerahasiaan terjaga.', popup: 'konseling' },
]

const MINAT_BAKAT_ITEMS = [
  { pill: 'Komunitas', title: 'ORMAWA', desc: 'BEM, DPM, dan unit kegiatan mahasiswa.', popup: 'ormawa' },
  { pill: 'Inkubator', title: 'Kewirausahaan', desc: 'Inkubasi bisnis dan pendanaan usaha mahasiswa di ITe.', popup: 'kewirausahaan' },
]

const LAYANAN_LAINNYA = [
  { pill: 'Inklusi', title: 'Layanan disabilitas', desc: 'Akomodasi belajar dan aksesibilitas.', popup: 'disabilitas' },
]

/* ─── data popup ─── */
const POPUP_DATA = {
  disabilitas: {
    eyebrow: 'Layanan mahasiswa',
    title: 'Unit layanan disabilitas',
    photoCaption: 'Foto: pendampingan mahasiswa',
    photoVariant: 'default',
    type: 'layanan',
    meta: [
      ['Kontak', '[email] · [WhatsApp]'],
      ['Lokasi', '[Gedung]'],
    ],
    description: 'Pendampingan sejak pendaftaran: akomodasi ujian, akses gedung, dan materi belajar yang aksesibel.',
    listTitle: 'Layanan',
    listItems: [
      'Pendamping belajar',
      'Materi format aksesibel',
      'Akomodasi ujian',
      'Akses gedung & parkir',
    ],
  },
  ormawa: {
    eyebrow: 'Kemahasiswaan',
    title: 'Organisasi mahasiswa & UKM',
    photoCaption: 'Foto: kegiatan UKM',
    photoVariant: 'warm',
    type: 'organisasi',
    meta: [
      ['Pembina', 'Biro Kemahasiswaan'],
    ],
    description: 'Wadah pengembangan minat, bakat, dan kepemimpinan mahasiswa.',
    listTitle: 'Organisasi',
    listItems: [
      'BEM Universitas',
      'DPM',
      'UKM Kerohanian',
      'UKM Tahfidz',
      'UKM Olahraga',
      'UKM Seni & Budaya',
      'UKM Pecinta Alam',
      'UKM Jurnalistik',
      'UKM Penelitian',
      'UKM Kewirausahaan',
      'UKM Bahasa Asing',
      'KSR PMI',
    ],
  },
  kewirausahaan: {
    eyebrow: 'Direktori · UPT',
    title: 'Inkubator Bisnis dan Teknologi (ITe)',
    photoCaption: 'Foto: kantor Inkubator Bisnis dan Teknologi (ITe)',
    photoVariant: 'sky',
    type: 'unit',
    meta: [
      ['Email', '[email]'],
      ['Lokasi', '[lokasi]'],
      ['Jam layanan', 'Senin–Jumat, 08.00–16.00 WITA'],
      ['Kepala unit', '[Nama]'],
    ],
    description: '[Tugas dan fungsi unit sesuai Statuta dan OTK.]',
    listTitle: 'Layanan utama',
    listItems: [
      '[Layanan 1]',
      '[Layanan 2]',
      '[Layanan 3]',
    ],
    actions: [
      { label: 'Kunjungi website', kind: 'dark', href: '#' },
      { label: 'Hubungi unit', kind: 'line', href: '#' },
    ],
  },
  pkkmb: {
    eyebrow: 'Pusdatin · Publik',
    title: 'Panduan PKKMB 2027',
    photoCaption: null,
    type: 'dokumen',
    docTitle: 'Panduan PKKMB 2027',
    meta: [
      ['Keterangan', 'Biro Kemahasiswaan'],
      ['Nomor', 'SK [nomor]'],
      ['Tanggal penetapan', '[tanggal]'],
      ['Versi', '[V]'],
      ['Status', 'Berlaku'],
      ['Akses', 'Publik'],
    ],
    riwayatTitle: 'Riwayat versi',
    riwayatItems: [
      { label: '[v terbaru]', note: 'Berlaku sejak [tanggal]' },
      { label: '[v sebelumnya]', note: 'Diganti setelah evaluasi dan RTM' },
    ],
    actions: [
      { label: 'Unduh PDF', kind: 'dark', icon: 'download', href: '/download/panduan-pkkmb-2027.pdf' },
      { label: 'Salin tautan', kind: 'line', icon: 'copy' },
    ],
  },
  konseling: {
    eyebrow: 'Layanan mahasiswa',
    title: 'Layanan konseling',
    photoCaption: 'Foto: ruang konseling kampus',
    photoVariant: 'warm',
    type: 'login-required',
    description: 'Layanan konseling bersifat rahasia dan hanya dapat diakses oleh mahasiswa aktif UNIZAR. Silakan masuk dengan akun mahasiswa untuk membuka layanan.',
  },
}

const PRESTASI_DOCS = [
  { title: '[Prestasi internasional]', small: '[Nama · prodi]' },
  { title: '[Prestasi nasional]', small: '[Nama · prodi]' },
  { title: '[Prestasi wilayah]', small: '[Nama · prodi]' },
]

const ALUMNI_STATS = [
  { big: '[n] bln', span: 'Masa tunggu kerja' },
  { big: '[n]%', span: 'Bekerja sesuai bidang' },
  { big: '[n]%', span: 'Berwirausaha' },
  { big: '[n]%', span: 'Kepuasan pengguna lulusan' },
]

/* ─── LayananGrid — grid kartu layanan ─── */
function LayananGrid({ items, onPopup }) {
  return (
    <div className="grid g3">
      {items.map((l) => (
        <Card
          key={l.title}
          to={l.popup ? undefined : l.to}
          onClick={l.popup ? () => onPopup(l.popup) : undefined}
          style={l.popup ? { cursor: 'pointer' } : undefined}
        >
          <Pill>{l.pill}</Pill>
          <h3>{l.title}</h3>
          <p>{l.desc}</p>
          <span className="more">Selengkapnya →</span>
        </Card>
      ))}
    </div>
  )
}

/* ─── DocPreview — preview dokumen PKKMB ─── */
function DocPreview({ title }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid var(--line)',
        borderRadius: '12px',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      {/* Logo UNIZAR placeholder */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(140deg, #0a6b4f, #064e3b)',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <span style={{ color: '#f2c230', fontWeight: 800, fontSize: '11px' }}>UZ</span>
      </div>
      <b style={{ fontSize: '15px', color: 'var(--ink)', textAlign: 'center' }}>{title}</b>
      {/* Placeholder lines */}
      {[100, 85, 90, 70].map((w, i) => (
        <div
          key={i}
          style={{
            width: `${w}%`,
            height: '8px',
            background: '#e3ece7',
            borderRadius: '4px',
          }}
        />
      ))}
      <small style={{ color: 'var(--muted)', fontSize: '11px', marginTop: '8px' }}>
        Pratinjau dokumen
      </small>
    </div>
  )
}

/* ─── LoginGate — popup login untuk konseling ─── */
function LoginGate({ onClose }) {
  const [nim, setNim] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div
        style={{
          background: '#f1f7f3',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'linear-gradient(140deg, #0a6b4f, #064e3b)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Lock size={22} color="#f2c230" />
        </div>
        <div>
          <b style={{ fontSize: '16px', color: 'var(--ink)' }}>Masuk diperlukan</b>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>
            Layanan konseling bersifat rahasia dan hanya dapat diakses oleh mahasiswa aktif UNIZAR.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label
            htmlFor="nim"
            style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', display: 'block', marginBottom: '6px' }}
          >
            NIM
          </label>
          <input
            id="nim"
            type="text"
            placeholder="Masukkan NIM"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1.5px solid var(--line)',
              borderRadius: '10px',
              fontSize: '15px',
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#0a6b4f' }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--line)' }}
          />
        </div>
        <div>
          <label
            htmlFor="pwd"
            style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', display: 'block', marginBottom: '6px' }}
          >
            Kata sandi
          </label>
          <input
            id="pwd"
            type="password"
            placeholder="Masukkan kata sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1.5px solid var(--line)',
              borderRadius: '10px',
              fontSize: '15px',
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#0a6b4f' }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--line)' }}
          />
        </div>
      </div>

      <button
        className="btn btn-dark"
        style={{ width: '100%', justifyContent: 'center' }}
        onClick={(e) => {
          e.preventDefault()
          alert('Fitur login belum tersedia. Hubungi Biro Kemahasiswaan untuk informasi lebih lanjut.')
        }}
      >
        <LogIn size={18} />
        Masuk
      </button>

      <p style={{ color: 'var(--muted)', fontSize: '13px', textAlign: 'center' }}>
        Lupa kata sandi?{' '}
        <a href="#" style={{ fontWeight: 700 }}>Reset di sini</a>
      </p>
    </div>
  )
}

/* ─── DetailPopup — panel samping kanan ─── */
function DetailPopup({ data, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!data) return null

  const renderBody = () => {
    switch (data.type) {
      /* ── Layanan disabilitas / organisasi ── */
      case 'layanan':
      case 'organisasi':
        return (
          <>
            <PhotoSlot
              variant={data.photoVariant}
              caption={data.photoCaption}
              className="h-[230px] rounded-none"
              aria-label={data.photoCaption}
            />
            <dl className="pop-meta">
              {data.meta.map(([label, value]) => (
                <div key={label} className="contents">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p>{data.description}</p>
            <div className="pop-list">
              <b>{data.listTitle}</b>
              <ul className="clean">
                {data.listItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </>
        )

      /* ── Unit / Inkubator ── */
      case 'unit':
        return (
          <>
            <PhotoSlot
              variant={data.photoVariant}
              caption={data.photoCaption}
              className="h-[230px] rounded-none"
              aria-label={data.photoCaption}
            />
            <dl className="pop-meta">
              {data.meta.map(([label, value]) => (
                <div key={label} className="contents">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p>{data.description}</p>
            {data.listTitle && (
              <div className="pop-list">
                <b>{data.listTitle}</b>
                <ul className="clean">
                  {data.listItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )

      /* ── Dokumen PKKMB ── */
      case 'dokumen':
        return (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                gap: '18px',
                alignItems: 'start',
              }}
            >
              <DocPreview title={data.docTitle} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <dl className="pop-meta" style={{ gridTemplateColumns: '120px minmax(0, 1fr)' }}>
                  {data.meta.map(([label, value]) => (
                    <div key={label} className="contents">
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            {data.riwayatTitle && (
              <div className="pop-list">
                <b>{data.riwayatTitle}</b>
                <ul className="clean">
                  {data.riwayatItems.map((item) => (
                    <li key={item.label}>
                      <b style={{ fontSize: '14px' }}>{item.label}</b>{' '}
                      <span style={{ color: 'var(--muted)', fontSize: '14px' }}>{item.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )

      /* ── Login required (konseling) ── */
      case 'login-required':
        return (
          <>
            <PhotoSlot
              variant={data.photoVariant}
              caption={data.photoCaption}
              className="h-[180px] rounded-none"
              aria-label={data.photoCaption}
            />
            <LoginGate onClose={onClose} />
          </>
        )

      default:
        return null
    }
  }

  const hasFooterActions = data.actions && data.actions.length > 0

  return (
    <div className="pop-root">
      <div className="pop-backdrop" onClick={onClose} />
      <aside className="pop" role="dialog" aria-modal="true" aria-label={data.title}>
        <header className="pop-hd">
          <span className="eyebrow">{data.eyebrow}</span>
          <h3>{data.title}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pop-x"
            onClick={onClose}
            aria-label="Tutup panel detail"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </header>

        <div className="pop-bd">{renderBody()}</div>

        {hasFooterActions && (
          <footer className="pop-ft">
            <div style={{ display: 'flex', gap: '10px' }}>
              {data.actions.map((act) => {
                const icon =
                  act.icon === 'download' ? <Download size={16} /> :
                  act.icon === 'copy' ? <Copy size={16} /> :
                  act.icon === 'external' ? <ExternalLink size={16} /> : null

                if (act.icon === 'copy') {
                  return (
                    <button
                      key={act.label}
                      className={`btn btn-${act.kind}`}
                      style={{ flex: act.kind === 'dark' ? 1 : undefined, justifyContent: 'center' }}
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href)
                        alert('Tautan disalin!')
                      }}
                    >
                      {icon}
                      {act.label}
                    </button>
                  )
                }

                if (act.icon === 'download') {
                  return (
                    <a
                      key={act.label}
                      href={act.href}
                      download
                      className={`btn btn-${act.kind}`}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      {icon}
                      {act.label}
                    </a>
                  )
                }

                return (
                  <a
                    key={act.label}
                    href={act.href || '#'}
                    className={`btn btn-${act.kind}`}
                    style={{ flex: act.kind === 'dark' ? 1 : undefined, justifyContent: 'center' }}
                  >
                    {icon}
                    {act.label}
                  </a>
                )
              })}
            </div>
          </footer>
        )}
      </aside>
    </div>
  )
}

/* ═════════════════════════════════════════════
   Halaman utama Mahasiswa & Alumni
   ═════════════════════════════════════════════ */
export default function MahasiswaAlumni() {
  const [activePopup, setActivePopup] = useState(null)

  const openPopup = (key) => setActivePopup(POPUP_DATA[key] || null)
  const closePopup = () => setActivePopup(null)

  return (
    <div className="page animate-fade">
      <PageHero
        title="Mahasiswa & Alumni"
        description="Tumbuh selama kuliah, tetap terhubung setelah lulus."
        crumbs={[{ label: 'Beranda', to: '/beranda' }, { label: 'Mahasiswa & Alumni' }]}
        photoCaption="Foto: kegiatan UKM mahasiswa"
      />
      <Subnav
        items={[
          { id: 'mahasiswa-alumni--layanan', label: 'Layanan Mahasiswa' },
          { id: 'mahasiswa-alumni--prestasi', label: 'Prestasi' },
          { id: 'mahasiswa-alumni--alumni', label: 'Alumni & Karier' },
        ]}
      />

      {/* === Layanan mahasiswa === */}
      <section className="sec" id="mahasiswa-alumni--layanan" data-t="Layanan mahasiswa">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Layanan</span>
              <h2>Untuk mahasiswa</h2>
            </div>
          </div>

          {/* PMB */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ marginBottom: '16px' }}>
              <span className="eyebrow">PMB</span>
              <h3 style={{ fontSize: '20px', marginTop: '4px' }}>Penerimaan & mahasiswa baru</h3>
            </div>
            <LayananGrid items={PMB_ITEMS} onPopup={openPopup} />
          </div>

          {/* KDLK */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ marginBottom: '16px' }}>
              <span className="eyebrow">KDLK</span>
              <h3 style={{ fontSize: '20px', marginTop: '4px' }}>Konseling & dukungan layanan kemahasiswaan</h3>
            </div>
            <LayananGrid items={KDLK_ITEMS} onPopup={openPopup} />
          </div>

          {/* Minat & Bakat */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ marginBottom: '16px' }}>
              <span className="eyebrow">Minat &amp; Bakat</span>
              <h3 style={{ fontSize: '20px', marginTop: '4px' }}>Organisasi & kewirausahaan</h3>
            </div>
            <LayananGrid items={MINAT_BAKAT_ITEMS} onPopup={openPopup} />
          </div>

          {/* Layanan lainnya */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span className="eyebrow">Layanan lainnya</span>
              <h3 style={{ fontSize: '20px', marginTop: '4px' }}>Dukungan tambahan</h3>
            </div>
            <LayananGrid items={LAYANAN_LAINNYA} onPopup={openPopup} />
          </div>
        </div>
      </section>

      {/* === Prestasi === */}
      <section className="sec" id="mahasiswa-alumni--prestasi" data-t="Prestasi">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Prestasi</span>
              <h2>Prestasi mahasiswa</h2>
            </div>
          </div>

          <div
            className="stories"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
              gap: '20px',
              alignItems: 'start',
            }}
          >
            <Card
              to="#"
              className="story"
              style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
              }}
            >
              <PhotoSlot
                variant="warm"
                caption="Foto: tim juara di atas panggung"
                aria-label="Tempat foto: tim juara di atas panggung"
                style={{ height: '300px', borderRadius: 0 }}
              />
              <div className="t" style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Pill variant="gold">Nasional</Pill>
                <h3 style={{ fontSize: '22px' }}>[Judul prestasi terbaru]</h3>
                <p className="muted">[Nama tim · prodi · bulan]</p>
              </div>
            </Card>

            <div
              className="story-stack"
              style={{ display: 'grid', gap: '20px', alignItems: 'start' }}
            >
              <ul
                className="clean"
                style={{
                  display: 'grid',
                  gap: '0',
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '14px',
                  padding: '6px 18px',
                }}
              >
                {PRESTASI_DOCS.map((d) => (
                  <li
                    key={d.title}
                    className="doc"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px 0',
                      borderBottom: '1px solid var(--line)',
                    }}
                  >
                    <div>
                      <b style={{ fontSize: '15px', color: 'var(--ink)' }}>{d.title}</b>
                      <small style={{ display: 'block', color: 'var(--muted)', fontSize: '13px' }}>
                        {d.small}
                      </small>
                    </div>
                    <SmartLink to="#" className="text-em-700 font-bold text-sm whitespace-nowrap">
                      Detail →
                    </SmartLink>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'grid', gap: '0' }}>
                <Button variant="line" href="#">
                  Unggah Prestasi Mahasiswa{' '}
                  <ArrowRight style={{ width: 16, height: 16 }} aria-hidden="true" />
                </Button>
                <p className="note">
                  Diunggah oleh operator Biro Kemahasiswaan setelah verifikasi bukti.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Alumni & karier === */}
      <section className="sec" id="mahasiswa-alumni--alumni" data-t="Alumni & karier">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Alumni</span>
              <h2>Alumni &amp; karier</h2>
              <p>Hasil tracer study digunakan untuk memperbaiki kurikulum setiap tahun.</p>
            </div>
          </div>

          <div className="stats" style={{ border: '1px solid var(--line)', borderRadius: '14px', background: '#fff', overflow: 'hidden' }}>
            {ALUMNI_STATS.map((s) => (
              <div key={s.span} className="stat">
                <b>{s.big}</b>
                <span>{s.span}</span>
              </div>
            ))}
          </div>

          <div className="btn-row" style={{ marginTop: '18px' }}>
            <Button variant="dark" href="#">
              Isi tracer study
            </Button>
            <Button variant="line" href="#">
              Lowongan &amp; magang
            </Button>
            <Button variant="line" href="#">
              Gabung ikatan alumni
            </Button>
            <Button variant="line" href="#">
              Legalisir ijazah
            </Button>
          </div>
        </div>
      </section>

      {/* === Detail popup panel samping === */}
      {activePopup && <DetailPopup data={activePopup} onClose={closePopup} />}
    </div>
  )
}
