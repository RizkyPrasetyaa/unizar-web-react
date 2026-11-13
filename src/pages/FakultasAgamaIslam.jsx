import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import PhotoSlot from '../components/ui/PhotoSlot.jsx'
import Button from '../components/ui/Button.jsx'
import { ExternalLink } from 'lucide-react'

const PRODI_CARDS = [
  { pill: 'Sarjana', title: 'Ekonomi Syariah (S1)', desc: 'Ekonomi berbasis prinsip syariah dan keuangan Islam. Gelar S.E.', to: '/prodi/ekonomi-syariah' },
  { pill: 'Sarjana', title: 'Manajemen Bisnis Syariah (S1)', desc: 'Manajemen bisnis sesuai kaidah syariah. Gelar S.M.', to: '/prodi/manajemen-bisnis-syariah' },
]

const FASILITAS = [
  { id: 'fas-lab-syariah', title: 'Laboratorium Keuangan Syariah', caption: 'Foto: praktikum keuangan syariah' },
  { id: 'fas-perpustakaan', title: 'Perpustakaan Islam', caption: 'Foto: koleksi kitab & jurnal' },
  { id: 'fas-masjid', title: 'Masjid kampus', caption: 'Foto: kegiatan keagamaan' },
]

const KABAR = [
  { id: 'berita-kuliah-umum', pill: 'Akademik', title: '[Judul berita fakultas]', excerpt: '[Ringkasan satu kalimat]' },
  { id: 'berita-hibah', pill: 'Riset', title: '[Judul berita fakultas]', excerpt: '[Ringkasan satu kalimat]' },
  { id: 'berita-pengabdian', pill: 'Pengabdian', title: '[Judul berita fakultas]', excerpt: '[Ringkasan satu kalimat]' },
]

export default function FakultasAgamaIslam() {
  return (
    <div className="page animate-fade">
      <PageHero
        title="Fakultas Agama Islam"
        description="Contoh pola halaman fakultas: satu halaman yang bercerita, dengan dua program studi di dalamnya."
        crumbs={[
          { label: 'Beranda', to: '/beranda' },
          { label: 'Fakultas', to: '/fakultas' },
          { label: 'Agama Islam' },
        ]}
        photoCaption="Foto: mahasiswa di kelas ekonomi syariah"
        extra={
          <Button
            variant="ghost"
            href="#"
            title="Alamat website menyusul"
          >
            Website Fakultas Agama Islam{' '}
            <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
          </Button>
        }
      />
      <Subnav
        items={[
          { id: 'fakultas-agama-islam--tentang', label: 'Tentang' },
          { id: 'fakultas-agama-islam--prodi', label: 'Program studi' },
          { id: 'fakultas-agama-islam--fasilitas', label: 'Fasilitas' },
          { id: 'fakultas-agama-islam--kabar', label: 'Kabar' },
        ]}
      />

      <section className="sec" id="fakultas-agama-islam--tentang" data-t="Tentang">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Tentang fakultas</span>
              <h2>Ekonomi dan bisnis berbasis syariah</h2>
            </div>
          </div>
          <div className="split">
            <div style={{ display: 'grid', gap: '14px', maxWidth: '64ch' }}>
              <p className="lead">
                [Ringkasan keunggulan fakultas: fokus ekonomi syariah, keuangan Islam, dan pemberdayaan ekonomi umat di NTB.]
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

      <section className="sec" id="fakultas-agama-islam--prodi" data-t="Program studi">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Program studi</span>
              <h2>Dua program studi agama Islam</h2>
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

      <section className="sec" id="fakultas-agama-islam--fasilitas" data-t="Fasilitas">
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

      <section className="sec" id="fakultas-agama-islam--kabar" data-t="Kabar">
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
