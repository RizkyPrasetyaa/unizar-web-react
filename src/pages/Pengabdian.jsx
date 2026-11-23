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

const PKM_PER_TAHUN = [
  { tahun: '2021', jumlah: 36 },
  { tahun: '2022', jumlah: 48 },
  { tahun: '2023', jumlah: 62 },
  { tahun: '2024', jumlah: 74 },
  { tahun: '2025', jumlah: 81 },
]

export default function Pengabdian() {
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
      <section className="sec" id="pengabdian--grafik" data-t="Grafik Pengabdian">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Grafik pengabdian</span>
              <h2>Jumlah pengabdian per tahun</h2>
              <p>Tren kegiatan pengabdian kepada masyarakat yang dilaksanakan di UNIZAR.</p>
            </div>
          </div>
          <Card flat style={{ padding: '24px 28px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '16px',
                height: '220px',
                borderBottom: '1px solid var(--line)',
                paddingBottom: '8px',
              }}
              role="img"
              aria-label="Grafik batang jumlah pengabdian per tahun"
            >
              {(() => {
                const max = Math.max(...PKM_PER_TAHUN.map((d) => d.jumlah))
                return PKM_PER_TAHUN.map((d) => {
                  const h = Math.round((d.jumlah / max) * 180)
                  return (
                    <div
                      key={d.tahun}
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '8px',
                        height: '100%',
                      }}
                    >
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--em-700)' }}>
                        {d.jumlah}
                      </span>
                      <div
                        style={{
                          width: '100%',
                          maxWidth: '56px',
                          height: `${h}px`,
                          borderRadius: '10px 10px 4px 4px',
                          background: 'linear-gradient(180deg, var(--em-700) 0%, #0d6b4c 100%)',
                          minHeight: '8px',
                        }}
                        title={`${d.tahun}: ${d.jumlah} kegiatan`}
                      />
                      <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{d.tahun}</span>
                    </div>
                  )
                })
              })()}
            </div>
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
              <Button variant="pri" href="#">
                Ajukan kolaborasi{' '}
                <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
              </Button>
              <Button variant="ghost" href="#">
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
