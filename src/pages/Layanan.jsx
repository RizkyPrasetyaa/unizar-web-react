import { useMemo, useState } from 'react'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import Button from '../components/ui/Button.jsx'
import { ArrowRight, ExternalLink, Search } from 'lucide-react'

const SERVICES = [
  { id: 'siakad', pill: 'Akademik', title: 'SIAKAD', desc: 'KRS, KHS, transkrip, jadwal kuliah', kind: 'ext', aud: ['mhs', 'dsn'], cat: 'akademik' },
  { id: 'surat-aktif', pill: 'Akademik', title: 'Surat keterangan aktif kuliah', desc: 'Terbit dengan tanda tangan elektronik · 1 hari kerja', kind: 'form', aud: ['mhs'], cat: 'akademik' },
  { id: 'legalisir', pill: 'Akademik', title: 'Legalisir ijazah & transkrip', desc: 'Ajukan daring · 3 hari kerja', kind: 'form', aud: ['alumni'], cat: 'akademik' },
  { id: 'ukt', pill: 'Keuangan', title: 'Pembayaran UKT', desc: 'Virtual account berbagai bank', kind: 'ext', aud: ['mhs'], cat: 'keuangan' },
  { id: 'keringanan-ukt', pill: 'Keuangan', title: 'Keringanan UKT', desc: 'Verifikasi berkas daring · 7 hari kerja', kind: 'form', aud: ['mhs'], cat: 'keuangan' },
  { id: 'reset-sso', pill: 'TIK', title: 'Email & SSO UNIZAR', desc: 'Aktivasi akun, reset kata sandi', kind: 'form', aud: ['mhs', 'dsn'], cat: 'tik' },
  { id: 'elearning', pill: 'TIK', title: 'E-learning', desc: 'Kelas daring dan bahan ajar', kind: 'ext', aud: ['mhs', 'dsn'], cat: 'tik' },
  { id: 'perpus', pill: 'Perpustakaan', title: 'Perpustakaan digital', desc: 'Katalog, e-book, e-journal, cek kemiripan', kind: 'ext', aud: ['mhs', 'dsn', 'alumni'], cat: 'perpustakaan' },
  { id: 'konseling', pill: 'Kesehatan', title: 'Klinik & konseling', desc: 'Layanan kesehatan dan psikolog kampus', kind: 'form', aud: ['mhs', 'dsn'], cat: 'kesehatan' },
  { id: 'simpeg', pill: 'Kepegawaian', title: 'Kepegawaian & jabatan akademik', desc: 'Data dosen dan tendik, usulan kenaikan jabatan', kind: 'ext', aud: ['dsn'], cat: 'kepegawaian' },
  { id: 'peminjaman-ruang', pill: 'Sarpras', title: 'Peminjaman ruang & fasilitas', desc: 'Jadwal dan formulir daring', kind: 'form', aud: ['mhs', 'dsn', 'publik'], cat: 'sarpras' },
  { id: 'lapor-k3', pill: 'Sarpras', title: 'Lapor kerusakan / insiden K3', desc: 'Tindak lanjut dapat dipantau', kind: 'form', aud: ['mhs', 'dsn', 'publik'], cat: 'sarpras' },
]

const AUD_CHIPS = [
  { v: 'all', label: 'Semua' },
  { v: 'mhs', label: 'Mahasiswa' },
  { v: 'dsn', label: 'Dosen & tendik' },
  { v: 'alumni', label: 'Alumni' },
  { v: 'publik', label: 'Publik' },
]

const CAT_CHIPS = [
  { v: 'all', label: 'Semua kategori' },
  { v: 'akademik', label: 'Akademik' },
  { v: 'keuangan', label: 'Keuangan' },
  { v: 'tik', label: 'TIK' },
  { v: 'perpustakaan', label: 'Perpustakaan' },
  { v: 'kesehatan', label: 'Kesehatan' },
  { v: 'kepegawaian', label: 'Kepegawaian' },
  { v: 'sarpras', label: 'Sarpras & K3' },
]

const SYSTEM_STATUS = [
  { name: 'SIAKAD', uptime: '99,8%', status: 'Normal', variant: 'default' },
  { name: 'E-learning', uptime: '99,5%', status: 'Normal', variant: 'default' },
  { name: 'SSO & email', uptime: '99,9%', status: 'Normal', variant: 'default' },
  { name: 'Perpustakaan digital', uptime: '98,2%', status: 'Pemeliharaan malam ini', variant: 'gold' },
  { name: 'Portal PMB', uptime: '99,7%', status: 'Normal', variant: 'default' },
]

export default function Layanan() {
  const [query, setQuery] = useState('')
  const [aud, setAud] = useState('all')
  const [cat, setCat] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SERVICES.filter((s) => {
      const matchAud = aud === 'all' || s.aud.includes(aud)
      const matchCat = cat === 'all' || s.cat === cat
      const matchText =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.pill.toLowerCase().includes(q)
      return matchAud && matchCat && matchText
    })
  }, [query, aud, cat])

  return (
    <div className="page animate-fade">
      <PageHero
        title="Layanan"
        description="Semua layanan kampus di satu tempat, dipilah sesuai kebutuhan Anda."
        crumbs={[{ label: 'Beranda', to: '/beranda' }, { label: 'Layanan' }]}
        photoCaption="Foto: loket layanan terpadu"
      />
      <Subnav
        items={[
          { id: 'layanan--katalog', label: 'Katalog Layanan' },
          { id: 'layanan--status', label: 'Status Sistem' },
        ]}
      />

      {/* === Katalog layanan === */}
      <section className="sec" id="layanan--katalog" data-t="Katalog layanan">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Katalog</span>
              <h2>Layanan apa yang Anda perlukan?</h2>
            </div>
          </div>

          <div data-filter className="mb-6 space-y-3.5">
            <div className="w-full">
              <label htmlFor="ly-q" className="block text-xs font-bold text-[#4a5e55] mb-1.5">
                Cari layanan
              </label>
              <div style={{ position: 'relative', width: '100%' }}>
                <Search
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 17,
                    height: 17,
                    color: 'var(--muted)',
                    pointerEvents: 'none',
                  }}
                  aria-hidden="true"
                />
                <input
                  id="ly-q"
                  placeholder="mis. legalisir, UKT, reset password"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-card border border-line bg-white py-2.5 pl-11 pr-4 text-sm font-[inherit] text-ink outline-none transition-all focus:border-em-600 focus:ring-1 focus:ring-em-600"
                />
              </div>
            </div>

            <div
              className="chips"
              role="group"
              aria-label="Untuk siapa"
              style={{ marginBottom: '10px' }}
            >
              {AUD_CHIPS.map((c) => (
                <button
                  key={c.v}
                  type="button"
                  aria-pressed={aud === c.v}
                  onClick={() => setAud(c.v)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div
              className="chips"
              role="group"
              aria-label="Kategori"
              style={{ marginBottom: '22px' }}
            >
              {CAT_CHIPS.map((c) => (
                <button
                  key={c.v}
                  type="button"
                  aria-pressed={cat === c.v}
                  onClick={() => setCat(c.v)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="grid g3">
              {filtered.map((s) => (
                <Card key={s.id} to="#">
                  <Pill>{s.pill}</Pill>
                  <h3 style={{ fontSize: '17px' }}>{s.title}</h3>
                  <p style={{ fontSize: '14px' }}>{s.desc}</p>
                  <span className="more">
                    {s.kind === 'ext' ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        Buka sistem{' '}
                        <ExternalLink style={{ width: 14, height: 14 }} aria-hidden="true" />
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        Ajukan{' '}
                        <ArrowRight style={{ width: 14, height: 14 }} aria-hidden="true" />
                      </span>
                    )}
                  </span>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="muted" style={{ marginTop: '16px' }}>
                Tidak ada layanan yang cocok dengan pencarian Anda. Coba ubah kata kunci atau
                filter, atau buat tiket helpdesk di bawah.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* === Status sistem === */}
      <section className="sec" id="layanan--status" data-t="Status sistem">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Status</span>
              <h2>Status sistem informasi</h2>
              <p>Diperbarui otomatis. Gangguan terjadwal diumumkan sehari sebelumnya.</p>
            </div>
          </div>

          <div className="tbl-wrap" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--em-800)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Sistem</th>
                  <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Uptime 30 hari</th>
                  <th style={{ padding: '12px 14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--em-800)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {SYSTEM_STATUS.map((r) => (
                  <tr key={r.name} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '14px' }}>
                      <b>{r.name}</b>
                    </td>
                    <td style={{ padding: '14px', color: 'var(--muted)' }}>{r.uptime}</td>
                    <td style={{ padding: '14px' }}>
                      <Pill variant={r.variant}>{r.status}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="slim"
            style={{
              marginTop: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              padding: '18px 22px',
              borderRadius: '14px',
              background: '#fff',
              border: '1px solid var(--line)',
            }}
          >
            <p style={{ color: 'var(--muted)', fontSize: '15px', margin: 0 }}>
              Tidak menemukan layanan yang Anda cari?
            </p>
            <div className="btn-row">
              <Button variant="dark" href="#">
                Buat tiket helpdesk
              </Button>
              <Button variant="line" href="#">
                Lacak permohonan
              </Button>
              <Button variant="line" href="/direktori#kontak">
                Kontak kami
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
