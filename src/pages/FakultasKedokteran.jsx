import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import PhotoSlot from '../components/ui/PhotoSlot.jsx'
import Button from '../components/ui/Button.jsx'
import { ExternalLink } from 'lucide-react'

const PRODI_CARDS = [
  { pill: 'Sarjana', title: 'Pendidikan Dokter (S1)', desc: 'Tahap akademik 7 semester, berbasis blok dan OBE. Gelar S.Ked.', to: '/prodi/pendidikan-dokter' },
  { pill: 'Profesi', title: 'Profesi Dokter', desc: 'Kepaniteraan klinik di rumah sakit pendidikan dan jejaring. Gelar dr.', to: '/prodi/profesi-dokter' },
]

const FASILITAS = [
  { id: 'fas-skills-lab', title: 'Skills Lab', caption: 'Foto: ruang keterampilan klinis' },
  { id: 'fas-lab-terpadu', title: 'Laboratorium terpadu', caption: 'Foto: praktikum anatomi' },
  { id: 'fas-rs-jejaring', title: 'Rumah sakit jejaring', caption: 'Foto: kepaniteraan klinik' },
]

const KABAR = [
  { id: 'berita-kuliah-umum', pill: 'Akademik', title: '[Judul berita fakultas]', excerpt: '[Ringkasan satu kalimat]' },
  { id: 'berita-hibah', pill: 'Riset', title: '[Judul berita fakultas]', excerpt: '[Ringkasan satu kalimat]' },
  { id: 'berita-posyandu', pill: 'Pengabdian', title: '[Judul berita fakultas]', excerpt: '[Ringkasan satu kalimat]' },
]

export default function FakultasKedokteran() {
  return (
    <div className="page animate-fade">
      <PageHero
        title="Fakultas Kedokteran"
        description="Contoh pola halaman fakultas: satu halaman yang bercerita, dengan dua program studi di dalamnya."
        crumbs={[
          { label: 'Beranda', to: '/beranda' },
          { label: 'Fakultas', to: '/fakultas' },
          { label: 'Kedokteran' },
        ]}
        photoCaption="Foto: mahasiswa di skills lab"
        extra={
          <Button
            variant="ghost"
            href="#"
            title="Alamat website menyusul"
          >
            Website Fakultas Kedokteran{' '}
            <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
          </Button>
        }
      />
      <Subnav
        items={[
          { id: 'fakultas-kedokteran--tentang', label: 'Tentang' },
          { id: 'fakultas-kedokteran--prodi', label: 'Program studi' },
          { id: 'fakultas-kedokteran--fasilitas', label: 'Fasilitas' },
          { id: 'fakultas-kedokteran--kabar', label: 'Kabar' },
        ]}
      />

      {/* === Tentang === */}
      <section className="sec" id="fakultas-kedokteran--tentang" data-t="Tentang">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Tentang fakultas</span>
              <h2>Dokter yang siap melayani NTB</h2>
            </div>
          </div>
          <div className="split">
            <div style={{ display: 'grid', gap: '14px', maxWidth: '64ch' }}>
              <p className="lead">
                [Ringkasan keunggulan fakultas: fokus kesehatan pariwisata dan pariwisata kesehatan, jejaring rumah sakit pendidikan, dan kedokteran berbasis komunitas.]
              </p>
              <p className="muted">
                Halaman fakultas memakai templat yang sama dengan universitas sehingga tim fakultas cukup mengisi teks, foto, dan berita.
              </p>
            </div>
            <PhotoSlot
              caption="Foto: Dekan bersama mahasiswa"
              aria-label="Tempat foto: Dekan bersama mahasiswa"
              style={{ height: '260px' }}
            />
          </div>
        </div>
      </section>

      {/* === Program studi === */}
      <section className="sec" id="fakultas-kedokteran--prodi" data-t="Program studi">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Program studi</span>
              <h2>Dua tahap menjadi dokter</h2>
            </div>
          </div>
          <div className="grid g2">
            {PRODI_CARDS.map((p) => (
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

      {/* === Fasilitas === */}
      <section className="sec" id="fakultas-kedokteran--fasilitas" data-t="Fasilitas">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Fasilitas</span>
              <h2>Tempat belajar</h2>
            </div>
          </div>
          <div className="grid g3">
            {FASILITAS.map((f) => (
              <Card key={f.id} to="#" style={{ padding: 0, overflow: 'hidden' }}>
                <PhotoSlot
                  caption={f.caption}
                  aria-label={`Tempat foto: ${f.caption}`}
                  style={{ height: '160px', borderRadius: 0 }}
                />
                <div style={{ padding: '16px 18px' }}>
                  <h3 style={{ fontSize: '17px' }}>{f.title}</h3>
                  <span className="more">Detail fasilitas →</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* === Kabar === */}
      <section className="sec" id="fakultas-kedokteran--kabar" data-t="Kabar">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Kabar fakultas</span>
              <h2>Berita terbaru</h2>
            </div>
          </div>
          <div className="grid g3">
            {KABAR.map((k) => (
              <Card key={k.id} to="#">
                <Pill>{k.pill}</Pill>
                <h3>{k.title}</h3>
                <p>{k.excerpt}</p>
                <span className="more">Selengkapnya →</span>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
