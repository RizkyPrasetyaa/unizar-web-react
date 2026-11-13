import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import PhotoSlot from '../components/ui/PhotoSlot.jsx'
import Button from '../components/ui/Button.jsx'
import ProdiSwitcher from '../components/ui/ProdiSwitcher.jsx'
import { ExternalLink } from 'lucide-react'

const PRODI_CARDS = [
  { pill: 'Sarjana', title: 'Akuntansi (S1)', desc: 'Akuntansi keuangan, manajemen, dan audit yang relevan dengan kebutuhan dunia usaha. Gelar S.Ak.', to: '/prodi/akuntansi' },
  { pill: 'Sarjana', title: 'Ekonomi Pembangunan (S1)', desc: 'Analisis pembangunan ekonomi daerah dan kebijakan publik. Gelar S.E.', to: '/prodi/ekonomi-pembangunan' },
]

const FASILITAS = [
  { id: 'fas-lab-akuntansi', title: 'Laboratorium Akuntansi', caption: 'Foto: praktikum akuntansi' },
  { id: 'fas-lab-ekonomi', title: 'Laboratorium Ekonomi', caption: 'Foto: ruang simulasi ekonomi' },
  { id: 'fas-inkubator', title: 'Inkubator bisnis', caption: 'Foto: ruang inkubasi UMKM' },
]

const KABAR = [
  { id: 'berita-kuliah-umum', pill: 'Akademik', title: '[Judul berita fakultas]', excerpt: '[Ringkasan satu kalimat]' },
  { id: 'berita-hibah', pill: 'Riset', title: '[Judul berita fakultas]', excerpt: '[Ringkasan satu kalimat]' },
  { id: 'berita-pengabdian', pill: 'Pengabdian', title: '[Judul berita fakultas]', excerpt: '[Ringkasan satu kalimat]' },
]

export default function FakultasEkonomiBisnis() {
  return (
    <div className="page animate-fade">
      <PageHero
        title="Fakultas Ekonomi & Bisnis"
        description="Contoh pola halaman fakultas: satu halaman yang bercerita, dengan dua program studi di dalamnya."
        crumbs={[
          { label: 'Beranda', to: '/beranda' },
          { label: 'Fakultas', to: '/fakultas' },
          { label: 'Ekonomi & Bisnis' },
        ]}
        photoCaption="Foto: mahasiswa di laboratorium akuntansi"
        extra={
          <Button
            variant="ghost"
            href="#"
            title="Alamat website menyusul"
          >
            Website Fakultas Ekonomi & Bisnis{' '}
            <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
          </Button>
        }
      />
      <Subnav
        items={[
          { id: 'fakultas-ekonomi-bisnis--tentang', label: 'Tentang' },
          { id: 'fakultas-ekonomi-bisnis--prodi', label: 'Program studi' },
          { id: 'fakultas-ekonomi-bisnis--fasilitas', label: 'Fasilitas' },
          { id: 'fakultas-ekonomi-bisnis--kabar', label: 'Kabar' },
        ]}
      />

      <section className="sec" id="fakultas-ekonomi-bisnis--tentang" data-t="Tentang">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Tentang fakultas</span>
              <h2>Ekonom dan akuntan siap membangun ekonomi NTB</h2>
            </div>
          </div>
          <div className="split">
            <div style={{ display: 'grid', gap: '14px', maxWidth: '64ch' }}>
              <p className="lead">
                [Ringkasan keunggulan fakultas: fokus ekonomi daerah, kewirausahaan, dan akuntabilitas keuangan untuk pembangunan NTB.]
              </p>
              <p className="muted">
                Halaman fakultas memakai templat yang sama dengan universitas sehingga tim fakultas cukup mengisi teks, foto, dan berita.
              </p>
              <ProdiSwitcher
                items={[
                  { label: 'Akuntansi', to: '/prodi/akuntansi' },
                  { label: 'Ekonomi Pembangunan', to: '/prodi/ekonomi-pembangunan' },
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

      <section className="sec" id="fakultas-ekonomi-bisnis--prodi" data-t="Program studi">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Program studi</span>
              <h2>Dua program studi ekonomi & bisnis</h2>
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

      <section className="sec" id="fakultas-ekonomi-bisnis--fasilitas" data-t="Fasilitas">
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

      <section className="sec" id="fakultas-ekonomi-bisnis--kabar" data-t="Kabar">
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
