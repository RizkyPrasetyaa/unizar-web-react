import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import Button from '../components/ui/Button.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { ExternalLink, ArrowRight } from 'lucide-react'

const INFO_CARDS = [
  { eyebrow: 'Gelar', value: 'S.M.' },
  { eyebrow: 'Masa studi', value: '8 semester' },
  { eyebrow: 'Beban', value: '[n] sks' },
]

const BELAJAR_CARDS = [
  { pill: 'CPL', title: 'Capaian pembelajaran lulusan', desc: 'Sikap, pengetahuan, keterampilan umum, dan keterampilan bidang.', flat: true },
  { pill: 'Kurikulum', title: 'Struktur kurikulum', desc: 'Kurikulum berbasis OBE dengan praktikum dan proyek.', flat: false, to: '#' },
  { pill: 'Fasilitas', title: 'Fasilitas belajar', desc: 'Laboratorium dan fasilitas pendukung pembelajaran.', flat: false, to: '/fakultas/agama-islam#fasilitas' },
]

const DOSEN = [
  { name: '[Nama dosen]', role: 'Lektor Kepala' },
  { name: '[Nama dosen]', role: 'Lektor' },
  { name: '[Nama dosen]', role: 'Lektor' },
  { name: '[Nama dosen]', role: 'Asisten Ahli' },
]

const STATS = [
  { value: '[n]%', label: 'Lulus tepat waktu' },
  { value: '[n] bln', label: 'Masa tunggu kerja' },
  { value: '[n]%', label: 'Kepuasan pengguna' },
  { value: '[n]%', label: 'Respons tracer study' },
]

export default function ProdiManajemenBisnisSyariah() {
  return (
    <div className="page animate-fade">
      <PageHero
        title="Manajemen Bisnis Syariah"
        description="Contoh pola halaman program studi. Status akreditasi tampil sebagai lencana, bukan tab terpisah."
        crumbs={[
          { label: 'Beranda', to: '/beranda' },
          { label: 'Fakultas', to: '/fakultas' },
          { label: 'Manajemen Bisnis Syariah', to: '/fakultas/agama-islam' },
          { label: 'Manajemen Bisnis Syariah' },
        ]}
        photoCaption="Foto: kegiatan pembelajaran"
        extra={
          <Button variant="ghost" href="#" title="Alamat website menyusul">
            Website Prodi Manajemen Bisnis Syariah{' '}
            <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
          </Button>
        }
      />
      <Subnav
        items={[
          { id: 'prodi-manajemen-bisnis-syariah--tentang', label: 'Tentang Prodi' },
          { id: 'prodi-manajemen-bisnis-syariah--belajar', label: 'Belajar di Sini' },
          { id: 'prodi-manajemen-bisnis-syariah--dosen', label: 'Dosen' },
          { id: 'prodi-manajemen-bisnis-syariah--lulusan', label: 'Lulusan' },
        ]}
      />

      <section className="sec" id="prodi-manajemen-bisnis-syariah--tentang" data-t="Tentang Prodi">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Tentang</span>
              <h2>Program studi Manajemen Bisnis Syariah</h2>
            </div>
          </div>
          <div className="split">
            <div style={{ display: 'grid', gap: '14px', maxWidth: '64ch' }}>
              <p className="lead">[Profil singkat prodi dan keunggulannya.]</p>
              <div className="grid g3">
                {INFO_CARDS.map((c) => (
                  <Card key={c.eyebrow} flat>
                    <span className="eyebrow">{c.eyebrow}</span>
                    <b>{c.value}</b>
                  </Card>
                ))}
              </div>
              <div className="btn-row">
                <Button variant="pri" href="/pendidikan#penerimaan">Daftar sekarang</Button>
              </div>
            </div>
            <Card>
              <span className="eyebrow">Akreditasi</span>
              <h3>[Peringkat] · BAN-PT</h3>
              <p>SK [nomor] · berlaku sampai [tanggal]</p>
              <SmartLink to="#" className="more">Lihat sertifikat →</SmartLink>
            </Card>
          </div>
        </div>
      </section>

      <section className="sec" id="prodi-manajemen-bisnis-syariah--belajar" data-t="Belajar di Sini">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Kurikulum</span>
              <h2>Belajar di Manajemen Bisnis Syariah</h2>
              <p>Capaian pembelajaran, struktur kurikulum, dan fasilitas dalam satu tempat.</p>
            </div>
          </div>
          <div className="grid g3">
            {BELAJAR_CARDS.map((b) =>
              b.flat ? (
                <Card key={b.title} flat>
                  <Pill>{b.pill}</Pill>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </Card>
              ) : (
                <Card key={b.title} to={b.to}>
                  <Pill>{b.pill}</Pill>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                  <span className="more">Selengkapnya →</span>
                </Card>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="sec" id="prodi-manajemen-bisnis-syariah--dosen" data-t="Dosen">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Dosen</span>
              <h2>Dosen pengampu</h2>
              <p>Kualifikasi dan jabatan akademik ditarik dari PD Dikti.</p>
            </div>
          </div>
          <div className="grid g4">
            {DOSEN.map((d, i) => (
              <Card key={i} to="#" style={{ flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--em-100)', flex: 'none' }} />
                <div>
                  <b style={{ fontSize: '14.5px' }}>{d.name}</b>
                  <p style={{ fontSize: '13px' }}>{d.role}</p>
                </div>
              </Card>
            ))}
          </div>
          <p style={{ marginTop: '14px' }}>
            <Button variant="line" href="/direktori#dosen">
              Semua dosen &amp; pakar <ArrowRight style={{ width: 16, height: 16 }} aria-hidden="true" />
            </Button>
          </p>
        </div>
      </section>

      <section className="sec" id="prodi-manajemen-bisnis-syariah--lulusan" data-t="Lulusan">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Lulusan</span>
              <h2>Ke mana lulusan melangkah</h2>
            </div>
          </div>
          <div className="stats">
            {STATS.map((s, i) => (
              <div key={i} className="stat">
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
