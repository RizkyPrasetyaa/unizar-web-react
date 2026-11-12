import { useMemo, useState } from 'react'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import Button from '../components/ui/Button.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { ArrowRight, ExternalLink } from 'lucide-react'

const MITRA = [
  { id: 'mitra-0', name: '[Universitas mitra, Malaysia]', bidang: 'Pendidikan', kegiatan: 'Pertukaran mahasiswa', realisasi: 'Berjalan', variant: 'gold', cakupan: 'ln' },
  { id: 'mitra-1', name: '[Universitas mitra, Jepang]', bidang: 'Penelitian', kegiatan: 'Riset bersama', realisasi: 'Berjalan', variant: 'gold', cakupan: 'ln' },
  { id: 'mitra-2', name: '[Rumah sakit jejaring]', bidang: 'Pendidikan', kegiatan: 'Kepaniteraan klinik', realisasi: 'Terealisasi', variant: 'default', cakupan: 'dn' },
  { id: 'mitra-3', name: '[Pemerintah Provinsi NTB]', bidang: 'Pengabdian', kegiatan: 'Desa binaan', realisasi: 'Terealisasi', variant: 'default', cakupan: 'dn' },
  { id: 'mitra-4', name: '[Perusahaan mitra]', bidang: 'Magang', kegiatan: 'Magang MBKM', realisasi: 'Berjalan', variant: 'gold', cakupan: 'dn' },
  { id: 'mitra-5', name: '[Perguruan tinggi nasional]', bidang: 'Penelitian', kegiatan: 'Hibah kolaborasi', realisasi: 'Terealisasi', variant: 'default', cakupan: 'dn' },
]

const CAKUPAN_CHIPS = [
  { v: 'all', label: 'Semua' },
  { v: 'dn', label: 'Dalam negeri' },
  { v: 'ln', label: 'Luar negeri' },
]

const INTERNASIONAL = [
  { pill: 'Mahasiswa', title: 'Mobilitas mahasiswa', desc: 'Pertukaran pelajar, summer course, dan magang luar negeri.' },
  { pill: 'Dosen', title: 'Mobilitas dosen', desc: 'Visiting lecturer, riset bersama, dan konferensi.' },
  { pill: 'Pendaftar', title: 'Mahasiswa internasional', desc: 'Informasi pendaftaran, visa, dan pendampingan.' },
]

export default function Kerjasama() {
  const [cakupan, setCakupan] = useState('all')

  const filteredMitra = useMemo(() => {
    return MITRA.filter((m) => cakupan === 'all' || m.cakupan === cakupan)
  }, [cakupan])

  return (
    <div className="page animate-fade">
      <PageHero
        title="Kerjasama & Internasional"
        description="Setiap kerja sama ditampilkan bersama kegiatannya, karena yang penting adalah hasilnya."
        crumbs={[{ label: 'Beranda', to: '/beranda' }, { label: 'Kerjasama & Internasional' }]}
        photoCaption="Foto: penandatanganan kerja sama"
      />
      <Subnav
        items={[
          { id: 'kerjasama--mitra', label: 'Mitra' },
          { id: 'kerjasama--internasional', label: 'Internasional' },
          { id: 'kerjasama--ajukan', label: 'Ajukan Kerja Sama' },
        ]}
      />

      {/* === Mitra === */}
      <section className="sec" id="kerjasama--mitra" data-t="Mitra">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Mitra</span>
              <h2>Mitra kerja sama</h2>
            </div>
          </div>

          <div data-filter>
            <div
              className="chips"
              role="group"
              aria-label="Cakupan"
              style={{ marginBottom: '16px' }}
            >
              {CAKUPAN_CHIPS.map((c) => (
                <button
                  key={c.v}
                  type="button"
                  aria-pressed={cakupan === c.v}
                  onClick={() => setCakupan(c.v)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="tbl-wrap" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--em-800)', textAlign: 'left' }}>
                    <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Mitra</th>
                    <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Bidang</th>
                    <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Kegiatan</th>
                    <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Realisasi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMitra.map((m) => (
                    <tr key={m.id} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '14px' }}>
                        <SmartLink to="#" className="text-em-700 font-bold">
                          {m.name}
                        </SmartLink>
                      </td>
                      <td style={{ padding: '14px', color: 'var(--ink)' }}>{m.bidang}</td>
                      <td style={{ padding: '14px', color: 'var(--ink)' }}>{m.kegiatan}</td>
                      <td style={{ padding: '14px' }}>
                        <Pill variant={m.variant}>{m.realisasi}</Pill>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredMitra.length === 0 && (
              <p className="muted" style={{ marginTop: '16px' }}>
                Tidak ada mitra pada cakupan ini.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* === Internasional === */}
      <section className="sec" id="kerjasama--internasional" data-t="Internasional">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Internasional</span>
              <h2>Peluang internasional</h2>
            </div>
          </div>

          <div className="grid g3">
            {INTERNASIONAL.map((p) => (
              <Card key={p.title} to="#">
                <Pill>{p.pill}</Pill>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="more">Selengkapnya →</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* === Ajukan kerja sama === */}
      <section className="sec" id="kerjasama--ajukan" data-t="Ajukan kerja sama">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Bermitra</span>
              <h2>Ingin bermitra dengan UNIZAR?</h2>
            </div>
          </div>

          <div
            className="band"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h2>Ajukan kerja sama</h2>
              <p style={{ color: '#DCEFE5', marginTop: '6px' }}>
                Pendidikan, penelitian, pengabdian, atau magang. Tim kerja sama merespons dalam 5
                hari kerja.
              </p>
            </div>
            <div className="btn-row">
              <Button variant="pri" href="#">
                Ajukan kerja sama{' '}
                <ArrowRight style={{ width: 16, height: 16 }} aria-hidden="true" />
              </Button>
              <Button variant="ghost" href="#">
                Pedoman kerja sama{' '}
                <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
