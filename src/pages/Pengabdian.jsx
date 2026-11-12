import { useState } from 'react'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import PhotoSlot from '../components/ui/PhotoSlot.jsx'
import Button from '../components/ui/Button.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { ExternalLink, Lock } from 'lucide-react'

const PROGRAM_CARDS = [
  {
    pill: 'Kesehatan',
    title: 'Desa binaan kesehatan',
    desc: 'Pendampingan posyandu dan kesehatan ibu-anak bersama puskesmas.',
  },
  {
    pill: 'Ekonomi',
    title: 'Klinik UMKM halal',
    desc: 'Pendampingan legalitas, sertifikasi halal, dan pemasaran digital.',
  },
  {
    pill: 'Pangan',
    title: 'Sekolah lapang petani',
    desc: 'Teknik budidaya lahan kering dan pascapanen.',
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

const DAMPAK_DOCS = [
  {
    title: 'Laporan monev PkM 2025',
    small: 'LPPM · ringkasan publik',
    label: 'Lihat ringkasan →',
    locked: false,
  },
  {
    title: 'Luaran PkM 3 tahun',
    small: 'Artikel, modul, produk, HKI',
    label: 'Lihat dokumen →',
    locked: false,
  },
  {
    title: 'Laporan akhir per judul',
    small: 'Untuk sivitas dan asesor',
    label: 'Masuk untuk membuka',
    locked: true,
  },
]

export default function Pengabdian() {
  // === Form state for kolaborasi ===
  const [org, setOrg] = useState('')
  const [kab, setKab] = useState(KABUPATEN_OPTIONS[0])
  const [need, setNeed] = useState('')
  const [cp, setCp] = useState('')
  const [msg, setMsg] = useState('')

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
          { id: 'pengabdian--program', label: 'Program & Desa Binaan' },
          { id: 'pengabdian--kepakaran', label: 'Kepakaran & Kolaborasi' },
          { id: 'pengabdian--dampak', label: 'Dampak & Luaran' },
        ]}
      />

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
                <Card key={p.title} to="#" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Pill>{p.pill}</Pill>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <span className="more">Selengkapnya →</span>
                </Card>
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
          <div className="sec-h">
            <div>
              <span className="eyebrow">Kolaborasi</span>
              <h2>Ajukan kolaborasi dengan pakar UNIZAR</h2>
              <p>
                Untuk pemerintah desa dan daerah, sekolah, komunitas, UMKM, dan industri.
                Permintaan dicocokkan dengan pakar dalam 7 hari kerja.
              </p>
            </div>
          </div>

          <form
            className="card"
            onSubmit={handleSubmit}
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
                  borderRadius: '10px',
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
                  borderRadius: '10px',
                  fontSize: '15px',
                  background: '#fff',
                  color: '#13231c',
                }}
              >
                {KABUPATEN_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div className="field" style={{ gridColumn: '1 / -1', display: 'grid', gap: '6px' }}>
              <label htmlFor="k-need">Kebutuhan atau permasalahan</label>
              <textarea
                id="k-need"
                rows={3}
                required
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #DCE6E0',
                  borderRadius: '10px',
                  fontSize: '15px',
                  background: '#fff',
                  color: '#13231c',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                }}
              />
            </div>

            <div className="field" style={{ display: 'grid', gap: '6px' }}>
              <label htmlFor="k-cp">Narahubung</label>
              <input
                id="k-cp"
                placeholder="email atau WhatsApp"
                value={cp}
                onChange={(e) => setCp(e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #DCE6E0',
                  borderRadius: '10px',
                  fontSize: '15px',
                  background: '#fff',
                  color: '#13231c',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <Button variant="dark" asButton type="submit">
                Kirim permintaan
              </Button>
              {msg && (
                <span className="form-msg" aria-live="polite" style={{ marginTop: 0 }}>
                  {msg}
                </span>
              )}
            </div>
          </form>
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
            <Card
              to="#"
              className="story"
              style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              <PhotoSlot
                caption="Foto: ibu dan balita di posyandu binaan"
                aria-label="Tempat foto: ibu dan balita di posyandu binaan"
                style={{ height: '240px', borderRadius: 0 }}
              />
              <div className="t" style={{ padding: '18px 20px', display: 'grid', gap: '8px' }}>
                <Pill variant="red">Kisah</Pill>
                <h3>[Judul kisah dampak program pengabdian]</h3>
                <p className="muted">
                  [Ringkasan perubahan yang terjadi, siapa yang terbantu, dan apa yang berlanjut.]
                </p>
              </div>
            </Card>

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
          </div>
        </div>
      </section>
    </div>
  )
}
