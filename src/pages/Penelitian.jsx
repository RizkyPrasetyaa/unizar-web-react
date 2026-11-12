import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import PhotoSlot from '../components/ui/PhotoSlot.jsx'
import Button from '../components/ui/Button.jsx'
import { ExternalLink } from 'lucide-react'

const FOKUS_RISET = [
  {
    id: 'fokus-kesehatan',
    pill: 'Tema 1',
    variant: 'default',
    photoVariant: 'default',
    caption: 'Foto: riset lapangan di destinasi wisata',
    title: 'Kesehatan pariwisata',
    desc: 'Kesehatan wisatawan dan pekerja pariwisata, ergonomi, dan keselamatan kerja di destinasi.',
  },
  {
    id: 'fokus-syariah',
    pill: 'Tema 2',
    variant: 'default',
    photoVariant: 'warm',
    caption: 'Foto: wawancara pelaku UMKM',
    title: 'Ekonomi syariah & UMKM',
    desc: 'Pembiayaan syariah, sertifikasi halal, dan daya saing usaha lokal.',
  },
  {
    id: 'fokus-pangan',
    pill: 'Tema 3',
    variant: 'default',
    photoVariant: 'sky',
    caption: 'Foto: uji tanam di lahan kering',
    title: 'Pangan lahan kering',
    desc: 'Agroekoteknologi dan agribisnis untuk lahan kering NTB.',
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

export default function Penelitian() {
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
          { id: 'penelitian--riset', label: 'Riset UNIZAR' },
          { id: 'penelitian--publikasi', label: 'Publikasi & Inovasi' },
          { id: 'penelitian--tata-kelola', label: 'Tata Kelola Riset' },
        ]}
      />

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
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}
          >
            {FOKUS_RISET.map((f) => (
              <Card key={f.id} to="#" style={{ padding: 0, overflow: 'hidden' }}>
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
                </div>
              </Card>
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
              <p>Skema dasar, terapan, dan kolaborasi internasional. Proposal wajib selaras peta jalan dan melibatkan mahasiswa.</p>
            </div>
            <div className="btn-row">
              <Button variant="pri" href="#">
                Ajukan proposal{' '}
                <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
              </Button>
              <Button variant="ghost" href="#">Panduan hibah</Button>
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
            <Button variant="line" href="#">Pedoman penelitian</Button>
            <Button variant="line" href="#">Kode etik penelitian</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
