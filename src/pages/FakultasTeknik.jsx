import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import PhotoSlot from '../components/ui/PhotoSlot.jsx'
import Button from '../components/ui/Button.jsx'
import ProdiSwitcher from '../components/ui/ProdiSwitcher.jsx'
import { ExternalLink } from 'lucide-react'

const PRODI_CARDS = [
  { pill: 'Sarjana', title: 'Teknik Sipil (S1)', desc: 'Perencanaan, konstruksi, dan manajemen infrastruktur. Gelar S.T.', to: '/prodi/teknik-sipil' },
  { pill: 'Sarjana', title: 'Ilmu Komputer (S1)', desc: 'Pengembangan perangkat lunak, data, dan sistem cerdas. Gelar S.Kom.', to: '/prodi/ilmu-komputer' },
]

const FASILITAS = [
  { id: 'fas-lab-sipil', title: 'Laboratorium Teknik Sipil', caption: 'Foto: praktikum struktur' },
  { id: 'fas-lab-komputer', title: 'Laboratorium Komputer', caption: 'Foto: ruang praktikum pemrograman' },
  { id: 'fas-bengkel', title: 'Bengkel & studio', caption: 'Foto: studio desain' },
]

const KABAR = [
  { id: 'berita-kuliah-umum', pill: 'Akademik', title: '[Judul berita fakultas]', excerpt: '[Ringkasan satu kalimat]' },
  { id: 'berita-hibah', pill: 'Riset', title: '[Judul berita fakultas]', excerpt: '[Ringkasan satu kalimat]' },
  { id: 'berita-pengabdian', pill: 'Pengabdian', title: '[Judul berita fakultas]', excerpt: '[Ringkasan satu kalimat]' },
]

export default function FakultasTeknik() {
  return (
    <div className="page animate-fade">
      <PageHero
        title="Fakultas Teknik"
        description="Contoh pola halaman fakultas: satu halaman yang bercerita, dengan dua program studi di dalamnya."
        crumbs={[
          { label: 'Beranda', to: '/beranda' },
          { label: 'Fakultas', to: '/fakultas' },
          { label: 'Teknik' },
        ]}
        photoCaption="Foto: mahasiswa di laboratorium teknik"
        extra={
          <Button
            variant="ghost"
            href="#"
            title="Alamat website menyusul"
          >
            Website Fakultas Teknik{' '}
            <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
          </Button>
        }
      />
      <Subnav
        items={[
          { id: 'fakultas-teknik--tentang', label: 'Tentang' },
          { id: 'fakultas-teknik--prodi', label: 'Program studi' },
          { id: 'fakultas-teknik--fasilitas', label: 'Fasilitas' },
          { id: 'fakultas-teknik--kabar', label: 'Kabar' },
        ]}
      />

      {/* === Tentang === */}
      <section className="sec" id="fakultas-teknik--tentang" data-t="Tentang">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Tentang fakultas</span>
              <h2>Insinyur dan ilmuwan komputer siap membangun NTB</h2>
            </div>
          </div>
          <div className="split">
            <div style={{ display: 'grid', gap: '14px', maxWidth: '64ch' }}>
              <p className="lead">
                [Ringkasan keunggulan fakultas: fokus infrastruktur berkelanjutan, digitalisasi, dan rekayasa berbasis kebutuhan lokal NTB.]
              </p>
              <p className="muted">
                Halaman fakultas memakai templat yang sama dengan universitas sehingga tim fakultas cukup mengisi teks, foto, dan berita.
              </p>
              <ProdiSwitcher
                items={[
                  { label: 'Teknik Sipil', to: '/prodi/teknik-sipil' },
                  { label: 'Ilmu Komputer', to: '/prodi/ilmu-komputer' },
                ]}
              />
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
      <section className="sec" id="fakultas-teknik--prodi" data-t="Program studi">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Program studi</span>
              <h2>Dua program studi teknik</h2>
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
      <section className="sec" id="fakultas-teknik--fasilitas" data-t="Fasilitas">
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
      <section className="sec" id="fakultas-teknik--kabar" data-t="Kabar">
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
