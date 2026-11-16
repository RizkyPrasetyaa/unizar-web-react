import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import PhotoSlot from '../components/ui/PhotoSlot.jsx'
import Button from '../components/ui/Button.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { ArrowRight } from 'lucide-react'

const PMB_ITEMS = [
  { pill: 'Keuangan', title: 'Beasiswa', desc: 'Informasi dan pendaftaran beasiswa.', to: '/pendidikan#penerimaan' },
  { pill: 'Mahasiswa baru', title: 'PKKMB', desc: 'Pengenalan kehidupan kampus bagi mahasiswa baru.', to: '#' },
]

const KDLK_ITEMS = [
  { pill: 'Kesehatan', title: 'Konseling', desc: 'Psikolog kampus, kerahasiaan terjaga.', to: '#' },
]

const MINAT_BAKAT_ITEMS = [
  { pill: 'Komunitas', title: 'ORMAWA', desc: 'BEM, DPM, dan unit kegiatan mahasiswa.', to: '#' },
  { pill: 'Inkubator', title: 'Kewirausahaan', desc: 'Inkubasi bisnis dan pendanaan usaha mahasiswa di ITe.', to: '#' },
]

const LAYANAN_LAINNYA = [
  { pill: 'Inklusi', title: 'Layanan disabilitas', desc: 'Akomodasi belajar dan aksesibilitas.', to: '#' },
]

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

function LayananGrid({ items }) {
  return (
    <div className="grid g3">
      {items.map((l) => (
        <Card key={l.title} to={l.to}>
          <Pill>{l.pill}</Pill>
          <h3>{l.title}</h3>
          <p>{l.desc}</p>
          <span className="more">Selengkapnya →</span>
        </Card>
      ))}
    </div>
  )
}

export default function MahasiswaAlumni() {
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
            <LayananGrid items={PMB_ITEMS} />
          </div>

          {/* KDLK */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ marginBottom: '16px' }}>
              <span className="eyebrow">KDLK</span>
              <h3 style={{ fontSize: '20px', marginTop: '4px' }}>Konseling & dukungan layanan kemahasiswaan</h3>
            </div>
            <LayananGrid items={KDLK_ITEMS} />
          </div>

          {/* Minat & Bakat */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ marginBottom: '16px' }}>
              <span className="eyebrow">Minat &amp; Bakat</span>
              <h3 style={{ fontSize: '20px', marginTop: '4px' }}>Organisasi & kewirausahaan</h3>
            </div>
            <LayananGrid items={MINAT_BAKAT_ITEMS} />
          </div>

          {/* Layanan lainnya */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span className="eyebrow">Layanan lainnya</span>
              <h3 style={{ fontSize: '20px', marginTop: '4px' }}>Dukungan tambahan</h3>
            </div>
            <LayananGrid items={LAYANAN_LAINNYA} />
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
    </div>
  )
}