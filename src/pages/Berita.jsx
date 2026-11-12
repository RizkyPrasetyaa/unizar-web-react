import { useMemo, useState } from 'react'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import PhotoSlot from '../components/ui/PhotoSlot.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { ArrowRight, CalendarDays, Search } from 'lucide-react'

const NEWS = [
  {
    id: 'berita-posyandu',
    cat: 'pengabdian',
    label: 'Pengabdian',
    title: 'Mahasiswa kedokteran dampingi posyandu di tiga desa binaan',
    date: '12 November 2026',
    photo: 'Foto: posyandu di desa binaan Lombok Tengah',
    photoVariant: 'default',
  },
  {
    id: 'berita-hibah',
    cat: 'penelitian',
    label: 'Penelitian',
    title: 'Dosen UNIZAR raih hibah riset kolaborasi internasional',
    date: '08 November 2026',
    photo: 'Foto: laboratorium biologi',
    photoVariant: 'sky',
  },
  {
    id: 'berita-juara',
    cat: 'prestasi',
    label: 'Prestasi',
    title: 'Tim mahasiswa juara kompetisi ilmiah tingkat nasional',
    date: '02 November 2026',
    photo: 'Foto: tim debat di panggung',
    photoVariant: 'warm',
  },
  {
    id: 'berita-ami',
    cat: 'penjaminan-mutu',
    label: 'Penjaminan Mutu',
    title: 'BPM gelar Audit Mutu Internal siklus 2026 di seluruh fakultas',
    date: '28 Oktober 2026',
    photo: 'Foto: pembukaan audit mutu internal',
    photoVariant: 'red',
  },
  {
    id: 'berita-kuliah-umum',
    cat: 'akademik',
    label: 'Akademik',
    title: 'Kuliah umum kesehatan wisatawan di destinasi super prioritas',
    date: '21 Oktober 2026',
    photo: 'Foto: kuliah umum di Aula Rektorat',
    photoVariant: 'default',
  },
  {
    id: 'berita-expo-umkm',
    cat: 'kemahasiswaan',
    label: 'Kemahasiswaan',
    title: 'Expo UMKM halal mahasiswa FAI dan FEB',
    date: '15 Oktober 2026',
    photo: 'Foto: stan UMKM mahasiswa',
    photoVariant: 'sky',
  },
]

const CAT_CHIPS = [
  { v: 'all', label: 'Semua' },
  { v: 'pengabdian', label: 'Pengabdian' },
  { v: 'penelitian', label: 'Penelitian' },
  { v: 'prestasi', label: 'Prestasi' },
  { v: 'penjaminan-mutu', label: 'Penjaminan Mutu' },
  { v: 'akademik', label: 'Akademik' },
  { v: 'kemahasiswaan', label: 'Kemahasiswaan' },
]

const AGENDA = [
  {
    id: 'agenda-kuliah-umum',
    day: '20',
    month: 'NOV',
    title: 'Kuliah umum: Kesehatan wisatawan di destinasi super prioritas',
    meta: 'Aula Rektorat · 09.00–12.00 WITA · terbuka untuk umum',
  },
  {
    id: 'agenda-expo',
    day: '28',
    month: 'NOV',
    title: 'Expo UMKM halal mahasiswa FAI & FEB',
    meta: 'Halaman kampus · 08.00–16.00 WITA',
  },
  {
    id: 'agenda-wisuda',
    day: '05',
    month: 'DES',
    title: 'Wisuda Periode II 2026',
    meta: 'Gedung Serbaguna · siaran langsung di kanal YouTube UNIZAR',
  },
]

const CHIPS_STYLE = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '18px',
}

function chipStyle(pressed) {
  return {
    border: `1px solid ${pressed ? '#064e3b' : '#dce6e0'}`,
    background: pressed ? '#064e3b' : '#fff',
    color: pressed ? '#fff' : '#4a5e55',
    borderRadius: '999px',
    padding: '7px 14px',
    fontSize: '13.5px',
    fontWeight: 700,
    cursor: 'pointer',
  }
}

export default function Berita() {
  const [cat, setCat] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return NEWS.filter((n) => {
      const matchCat = cat === 'all' || n.cat === cat
      const matchText = !q || n.title.toLowerCase().includes(q) || n.label.toLowerCase().includes(q)
      return matchCat && matchText
    })
  }, [cat, query])

  return (
    <div className="page animate-fade">
      <PageHero
        title="Berita & Agenda"
        description="Kabar terbaru dari kampus dan acara yang akan datang."
        crumbs={[{ label: 'Beranda', to: '/beranda' }, { label: 'Berita & Agenda' }]}
        photoCaption="Foto: liputan kegiatan kampus"
      />
      <Subnav
        items={[
          { id: 'berita--berita', label: 'Berita' },
          { id: 'berita--agenda', label: 'Agenda' },
        ]}
      />

      {/* === Berita === */}
      <section className="sec" id="berita--berita" data-t="Berita">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Berita</span>
              <h2>Berita terbaru</h2>
            </div>
          </div>

          <div data-filter>
            <div
              className="field"
              style={{
                position: 'relative',
                maxWidth: '420px',
                marginBottom: '14px',
              }}
            >
              <label
                htmlFor="b-q"
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#4a5e55',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                Cari berita
              </label>
              <div style={{ position: 'relative' }}>
                <Search
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 16,
                    height: 16,
                    color: 'var(--muted, #4a5e55)',
                    pointerEvents: 'none',
                  }}
                  aria-hidden="true"
                />
                <input
                  id="b-q"
                  placeholder="Cari judul atau kategori berita"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{
                    border: '1px solid #dce6e0',
                    background: '#fff',
                    borderRadius: '10px',
                    padding: '11px 14px 11px 34px',
                    fontSize: '15px',
                    width: '100%',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div className="chips" role="group" aria-label="Kategori berita" style={CHIPS_STYLE}>
              {CAT_CHIPS.map((c) => (
                <button
                  key={c.v}
                  type="button"
                  aria-pressed={cat === c.v}
                  style={chipStyle(cat === c.v)}
                  onClick={() => setCat(c.v)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="grid g3">
              {filtered.map((n) => (
                <Card
                  key={n.id}
                  to="#"
                  style={{ padding: 0, overflow: 'hidden' }}
                >
                  <PhotoSlot
                    variant={n.photoVariant}
                    caption={n.photo}
                    aria-label={n.photo}
                    style={{ height: '180px', borderRadius: 0 }}
                  />
                  <div className="t" style={{ padding: '18px 20px', display: 'grid', gap: '8px' }}>
                    <Pill>{n.label}</Pill>
                    <h3 style={{ fontSize: '17px', margin: 0 }}>{n.title}</h3>
                    <small className="muted" style={{ fontSize: '13px' }}>
                      {n.date}
                    </small>
                  </div>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="muted" style={{ marginTop: '16px' }}>
                Tidak ada berita yang cocok dengan pencarian Anda.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* === Agenda === */}
      <section className="sec" id="berita--agenda" data-t="Agenda">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Agenda</span>
              <h2>Agenda kampus</h2>
            </div>
            <div className="btn-row">
              <SmartLink
                to="#"
                className="text-em-700"
                ariaLabel="Lihat kalender akademik lengkap"
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '14px' }}>
                  <CalendarDays style={{ width: 14, height: 14 }} aria-hidden="true" />
                  Kalender akademik
                </span>
              </SmartLink>
            </div>
          </div>

          <ul className="clean agenda" style={{ display: 'grid', gap: '12px' }}>
            {AGENDA.map((a) => (
              <li
                key={a.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '76px minmax(0, 1fr)',
                  gap: '18px',
                  alignItems: 'center',
                  padding: '18px 20px',
                  border: '1px solid #dce6e0',
                  borderRadius: '14px',
                  background: '#fff',
                }}
              >
                <span
                  className="d"
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    background: '#e3f1ea',
                    color: '#064e3b',
                    borderRadius: '12px',
                    padding: '10px 6px',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    fontSize: '22px',
                    textAlign: 'center',
                  }}
                >
                  {a.day}
                  <small
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      color: '#064e3b',
                      marginTop: '2px',
                    }}
                  >
                    {a.month}
                  </small>
                </span>
                <div>
                  <SmartLink to="#" className="no-underline text-ink hover:text-em-700">
                    <b style={{ fontSize: '16px' }}>{a.title}</b>
                  </SmartLink>
                  <div className="muted" style={{ fontSize: '14px', marginTop: '4px' }}>
                    {a.meta}
                  </div>
                  <SmartLink
                    to="#"
                    className="text-em-700"
                    ariaLabel={`Detail agenda ${a.title}`}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '8px',
                        fontWeight: 700,
                        fontSize: '13.5px',
                      }}
                    >
                      Detail agenda
                      <ArrowRight style={{ width: 14, height: 14 }} aria-hidden="true" />
                    </span>
                  </SmartLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
