import { useMemo, useState } from 'react'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import Button from '../components/ui/Button.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Clock,
  FileText,
  LayoutDashboard,
  Lock,
  ShieldCheck,
} from 'lucide-react'

const PROFILES = {
  mhs: {
    v: 'mhs',
    label: 'Mahasiswa',
    name: 'Andi Pratama',
    sub: 'Pendidikan Dokter · Angkatan 2024 · NIM 240101001',
    lastLogin: 'Hari ini, 07.42 WITA',
    greeting: 'Selamat pagi, Andi',
  },
  dsn: {
    v: 'dsn',
    label: 'Dosen / tendik',
    name: 'dr. Siti Rahmawati, M.Kes.',
    sub: 'Dosen Pendidikan Dokter · NIDN 0812098001',
    lastLogin: 'Hari ini, 06.15 WITA',
    greeting: 'Selamat pagi, dr. Siti',
  },
  unit: {
    v: 'unit',
    label: 'Operator unit kerja',
    name: 'Biro Akademik (BAK)',
    sub: 'Operator unit kerja · pemilik risiko',
    lastLogin: 'Kemarin, 16.30 WITA',
    greeting: 'Selamat datang, Operator BAK',
  },
  mutu: {
    v: 'mutu',
    label: 'Tim mutu internal',
    name: 'Tim Penjaminan Mutu (BPM)',
    sub: 'Audit Mutu Internal siklus 2026',
    lastLogin: 'Hari ini, 05.50 WITA',
    greeting: 'Selamat pagi, Tim Mutu',
  },
}

const STATS = {
  mhs: [
    { label: 'SKS semester ini', value: '20', hint: 'Beban penuh' },
    { label: 'IPS terakhir', value: '3,68', hint: 'Semester ganjil 2025/2026' },
    { label: 'Permohonan aktif', value: '2', hint: '1 menunggu, 1 selesai' },
    { label: 'Tagihan UKT', value: 'Lunas', hint: 'Semester ganjil 2025/2026' },
  ],
  dsn: [
    { label: 'Beban mengajar', value: '14 SKS', hint: 'Semester ganjil 2025/2026' },
    { label: 'Penelitian aktif', value: '3', hint: '2 internal, 1 eksternal' },
    { label: 'Usulan jabatan', value: 'Lektor', hint: 'Diproses Biro SDM' },
    { label: 'Notifikasi baru', value: '5', hint: '3 tugas, 2 pengumuman' },
  ],
  unit: [
    { label: 'Risiko aktif', value: '7', hint: '2 tinggi, 5 sedang' },
    { label: 'SPI terbuka', value: '3', hint: 'Target kuartal ini' },
    { label: 'Permohonan masuk', value: '12', hint: '4 menunggu tindak lanjut' },
    { label: 'Dokumen rahasia', value: '21', hint: 'Akses tercatat' },
  ],
  mutu: [
    { label: 'Indikator AMI', value: '39', hint: 'IAPT 4.1 standar BAN-PT' },
    { label: 'Bukti terisi', value: '78%', hint: 'Siklus 2026' },
    { label: 'RTM terjadwal', value: '2', hint: 'Fakultas Kedokteran & FH' },
    { label: 'Temuan belum RTL', value: '4', hint: 'Prioritas tindak lanjut' },
  ],
}

const REQUESTS = {
  mhs: [
    {
      id: 'r1',
      title: 'Surat keterangan aktif kuliah',
      ref: 'BAK-2026-00128',
      date: '10 Nov 2026',
      status: 'selesai',
      statusLabel: 'Siap diunduh',
    },
    {
      id: 'r2',
      title: 'Keringanan UKT semester ganjil',
      ref: 'BKU-2026-00451',
      date: '05 Nov 2026',
      status: 'proses',
      statusLabel: 'Verifikasi berkas',
    },
    {
      id: 'r3',
      title: 'Legalisir transkrip sementara',
      ref: 'BAK-2026-00114',
      date: '02 Nov 2026',
      status: 'perlu',
      statusLabel: 'Lengkapi berkas',
    },
  ],
  dsn: [
    {
      id: 'r1',
      title: 'Usulan kenaikan jabatan ke Lektor',
      ref: 'SDM-2026-00077',
      date: '08 Nov 2026',
      status: 'proses',
      statusLabel: 'Tinjau tim penilai',
    },
    {
      id: 'r2',
      title: 'Hibah riset internal 2027',
      ref: 'LPPM-2026-00033',
      date: '01 Nov 2026',
      status: 'selesai',
      statusLabel: 'Disetujui',
    },
    {
      id: 'r3',
      title: 'Akses dokumen Audit Mutu Internal 2025',
      ref: 'BPM-2026-00019',
      date: '28 Okt 2026',
      status: 'perlu',
      statusLabel: 'Masuk untuk membuka',
    },
  ],
  unit: [
    {
      id: 'r1',
      title: 'Pemetaan risiko unit 2026',
      ref: 'RSB-2026-00012',
      date: '11 Nov 2026',
      status: 'proses',
      statusLabel: 'Validasi WR IV',
    },
    {
      id: 'r2',
      title: 'SPI pengadaan laboratorium',
      ref: 'SPI-2026-00008',
      date: '06 Nov 2026',
      status: 'proses',
      statusLabel: 'Tinjau SPI',
    },
    {
      id: 'r3',
      title: 'Laporan kinerja triwulan III',
      ref: 'RSB-2026-00009',
      date: '30 Okt 2026',
      status: 'selesai',
      statusLabel: 'Disahkan',
    },
  ],
  mutu: [
    {
      id: 'r1',
      title: 'Audit Mutu Internal siklus 2026',
      ref: 'BPM-2026-AMI-04',
      date: '12 Nov 2026',
      status: 'proses',
      statusLabel: 'Berjalan di 7 fakultas',
    },
    {
      id: 'r2',
      title: 'RTM Fakultas Kedokteran',
      ref: 'BPM-2026-RTM-02',
      date: '18 Nov 2026',
      status: 'perlu',
      statusLabel: 'Siapkan notulensi',
    },
    {
      id: 'r3',
      title: 'RTL temuan AMI 2025',
      ref: 'BPM-2026-RTL-01',
      date: '20 Okt 2026',
      status: 'selesai',
      statusLabel: 'Ditutup',
    },
  ],
}

const QUICK_LINKS = {
  mhs: [
    { id: 'siakad', label: 'SIAKAD', desc: 'KRS, KHS, jadwal, transkrip', to: '/layanan', icon: 'dash' },
    { id: 'ukt', label: 'Pembayaran UKT', desc: 'Virtual account', to: '/layanan', icon: 'file' },
    { id: 'elearning', label: 'E-learning', desc: 'Kelas dan bahan ajar', to: '/layanan', icon: 'file' },
    { id: 'perpus', label: 'Perpustakaan digital', desc: 'Katalog & e-journal', to: '/layanan', icon: 'lock' },
  ],
  dsn: [
    { id: 'simpeg', label: 'SIMPEG', desc: 'Data kepegawaian & jabatan', to: '/layanan', icon: 'dash' },
    { id: 'sinta', label: 'SINTA', desc: 'Produksi publikasi', to: '/publikasi-inovasi', icon: 'file' },
    { id: 'lppm', label: 'Portal LPPM', desc: 'Hibah & luaran', to: '/penelitian', icon: 'file' },
    { id: 'mutu', label: 'Dokumen mutu', desc: 'Manual & standar SPMI', to: '/pusdatin', icon: 'lock' },
  ],
  unit: [
    { id: 'risiko', label: 'Register risiko', desc: 'Pemetaan & SPI', to: '/tata-kelola', icon: 'shield' },
    { id: 'ppid', label: 'PPID', desc: 'Daftar informasi publik', to: '/tata-kelola', icon: 'file' },
    { id: 'pusdatin', label: 'Pusdatin', desc: 'Dokumen & statistik', to: '/pusdatin', icon: 'lock' },
    { id: 'layanan', label: 'Layanan unit', desc: 'Tiket & permohonan', to: '/layanan', icon: 'dash' },
  ],
  mutu: [
    { id: 'peta', label: 'Peta Bukti BAN-PT', desc: '39 indikator IAPT 4.1', to: '/peta-bukti', icon: 'shield' },
    { id: 'spmi', label: 'SPMI & AMI', desc: 'Siklus PPEPP', to: '/penjaminan-mutu', icon: 'file' },
    { id: 'akreditasi', label: 'Akreditasi', desc: 'Institusi & prodi', to: '/penjaminan-mutu', icon: 'file' },
    { id: 'pusdatin', label: 'Dokumen mutu', desc: 'Manual & laporan AMI', to: '/pusdatin', icon: 'lock' },
  ],
}

const NOTIFICATIONS = {
  mhs: [
    { id: 'n1', title: 'Surat keterangan aktif kuliah siap diunduh', meta: 'BAK · 10 Nov 2026', kind: 'ok' },
    { id: 'n2', title: 'Pengingat: ujian tengah semester 18 November', meta: 'Akademik · 09 Nov 2026', kind: 'info' },
    { id: 'n3', title: 'Lengkapi berkas legalisir transkrip', meta: 'BAK · 02 Nov 2026', kind: 'perlu' },
  ],
  dsn: [
    { id: 'n1', title: 'Hibah riset internal 2027 disetujui', meta: 'LPPM · 01 Nov 2026', kind: 'ok' },
    { id: 'n2', title: 'Jadwal penilaian usulan jabatan 22 November', meta: 'Biro SDM · 08 Nov 2026', kind: 'info' },
    { id: 'n3', title: 'Buka dokumen AMI 2025 (akses tercatat)', meta: 'BPM · 28 Okt 2026', kind: 'perlu' },
  ],
  unit: [
    { id: 'n1', title: 'Laporan kinerja triwulan III disahkan', meta: 'RSB · 30 Okt 2026', kind: 'ok' },
    { id: 'n2', title: 'SPI pengadaan laboratorium menunggu tinjauan', meta: 'SPI · 06 Nov 2026', kind: 'info' },
    { id: 'n3', title: 'Validasi pemetaan risiko oleh WR IV', meta: 'RSB · 11 Nov 2026', kind: 'perlu' },
  ],
  mutu: [
    { id: 'n1', title: 'AMI siklus 2026 berjalan di 7 fakultas', meta: 'BPM · 12 Nov 2026', kind: 'info' },
    { id: 'n2', title: 'RTM Fakultas Kedokteran 18 November', meta: 'BPM · 12 Nov 2026', kind: 'perlu' },
    { id: 'n3', title: 'RTL temuan AMI 2025 ditutup', meta: 'BPM · 20 Okt 2026', kind: 'ok' },
  ],
}

const ROLE_OPTIONS = [
  { v: 'mhs', label: 'Mahasiswa' },
  { v: 'dsn', label: 'Dosen / tendik' },
  { v: 'unit', label: 'Operator unit kerja' },
  { v: 'mutu', label: 'Tim mutu internal' },
]

function notifPill(kind) {
  if (kind === 'ok') return <Pill>Selesai</Pill>
  if (kind === 'perlu') return <Pill variant="gold">Perlu tindak lanjut</Pill>
  return <Pill variant="red">Info</Pill>
}

function notifIcon(kind) {
  if (kind === 'ok') return <CheckCircle2 style={{ width: 16, height: 16, color: '#064e3b' }} aria-hidden="true" />
  if (kind === 'perlu') return <Clock style={{ width: 16, height: 16, color: '#6b4e00' }} aria-hidden="true" />
  return <Bell style={{ width: 16, height: 16, color: '#8e1b20' }} aria-hidden="true" />
}

function quickLinkIcon(name) {
  if (name === 'lock') return <Lock style={{ width: 18, height: 18 }} aria-hidden="true" />
  if (name === 'shield') return <ShieldCheck style={{ width: 18, height: 18 }} aria-hidden="true" />
  if (name === 'file') return <FileText style={{ width: 18, height: 18 }} aria-hidden="true" />
  return <LayoutDashboard style={{ width: 18, height: 18 }} aria-hidden="true" />
}

export default function Dasbor() {
  const [role, setRole] = useState('mhs')

  const profile = PROFILES[role]
  const stats = STATS[role]
  const requests = REQUESTS[role]
  const links = QUICK_LINKS[role]
  const notifs = NOTIFICATIONS[role]

  const reqSummary = useMemo(() => {
    const proses = requests.filter((r) => r.status === 'proses').length
    const perlu = requests.filter((r) => r.status === 'perlu').length
    const selesai = requests.filter((r) => r.status === 'selesai').length
    return { proses, perlu, selesai }
  }, [requests])

  return (
    <div className="page animate-fade">
      <PageHero
        title="Dasbor saya"
        description="Permohonan, akses cepat, dan dokumen sesuai peran Anda."
        crumbs={[{ label: 'Beranda', to: '/beranda' }, { label: 'Dasbor' }]}
        photoCaption="Foto: ruang kerja"
        extra={
          <Button variant="ghost" href="/masuk">
            Ganti akun
          </Button>
        }
      />
      <Subnav items={[{ id: 'dasbor--utama', label: 'Dasbor' }]} />

      <section className="sec" id="dasbor--utama" data-t="Dasbor">
        <div className="wrap">
          <div id="dash">
            {/* User banner */}
            <Card style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '18px',
                }}
              >
                <div style={{ minWidth: 0, flex: '1 1 260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Pill>{profile.label}</Pill>
                    <span className="muted" style={{ fontSize: '13px' }}>
                      Masuk terakhir: {profile.lastLogin}
                    </span>
                  </div>
                  <h2 style={{ margin: '8px 0 4px', fontSize: '24px', color: '#064e3b' }}>
                    {profile.greeting}
                  </h2>
                  <p style={{ margin: 0, color: '#4a5e55', fontSize: '14.5px' }}>
                    {profile.name} · {profile.sub}
                  </p>
                </div>
                <div
                  className="field"
                  style={{ display: 'grid', gap: '6px', flex: '0 1 260px' }}
                >
                  <label
                    htmlFor="dash-role"
                    style={{ fontSize: '13px', fontWeight: 700, color: '#4a5e55' }}
                  >
                    Simulasi peran (demo)
                  </label>
                  <select
                    id="dash-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                      border: '1px solid #dce6e0',
                      background: '#fff',
                      borderRadius: '10px',
                      padding: '11px 14px',
                      fontSize: '15px',
                      width: '100%',
                      outline: 'none',
                    }}
                  >
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r.v} value={r.v}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Stats row */}
            <div
              className="stats"
              style={{
                border: '1px solid #dce6e0',
                borderRadius: '14px',
                background: '#fff',
                overflow: 'hidden',
                marginBottom: '24px',
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="stat"
                  style={{
                    borderRight:
                      i < stats.length - 1 ? '1px solid #dce6e0' : undefined,
                  }}
                >
                  <b style={{ fontSize: '34px' }}>{s.value}</b>
                  <span>{s.label}</span>
                  <small className="muted" style={{ display: 'block', marginTop: '4px', fontSize: '12px' }}>
                    {s.hint}
                  </small>
                </div>
              ))}
            </div>

            {/* Split: requests + quick links */}
            <div className="split" style={{ marginBottom: '24px' }}>
              {/* Requests */}
              <Card>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: '19px' }}>Permohonan saya</h3>
                  <span className="muted" style={{ fontSize: '13px' }}>
                    {reqSummary.proses} diproses · {reqSummary.perlu} perlu tindak lanjut ·{' '}
                    {reqSummary.selesai} selesai
                  </span>
                </div>
                <div className="tbl-wrap" style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #dce6e0', textAlign: 'left' }}>
                        <th style={{ padding: '10px 12px', fontWeight: 700, color: '#4a5e55' }}>
                          Permohonan
                        </th>
                        <th style={{ padding: '10px 12px', fontWeight: 700, color: '#4a5e55' }}>
                          Nomor
                        </th>
                        <th style={{ padding: '10px 12px', fontWeight: 700, color: '#4a5e55' }}>
                          Tanggal
                        </th>
                        <th style={{ padding: '10px 12px', fontWeight: 700, color: '#4a5e55' }}>
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((r) => (
                        <tr key={r.id} style={{ borderBottom: '1px solid #dce6e0' }}>
                          <td style={{ padding: '12px' }}>
                            <SmartLink to="#" className="text-em-700">
                              <b style={{ fontSize: '14.5px' }}>{r.title}</b>
                            </SmartLink>
                          </td>
                          <td style={{ padding: '12px', color: '#4a5e55', fontSize: '13px' }}>
                            {r.ref}
                          </td>
                          <td style={{ padding: '12px', color: '#4a5e55', fontSize: '13px' }}>
                            {r.date}
                          </td>
                          <td style={{ padding: '12px' }}>
                            {r.status === 'selesai' ? (
                              <Pill>{r.statusLabel}</Pill>
                            ) : r.status === 'perlu' ? (
                              <Pill variant="gold">{r.statusLabel}</Pill>
                            ) : (
                              <Pill variant="red">{r.statusLabel}</Pill>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="btn-row" style={{ marginTop: '14px' }}>
                  <Button variant="line" href="/layanan">
                    Ajukan permohonan baru{' '}
                    <ArrowRight style={{ width: 14, height: 14 }} aria-hidden="true" />
                  </Button>
                  <Button variant="ghost" href="#">
                    Lacak permohonan
                  </Button>
                </div>
              </Card>

              {/* Quick links */}
              <div>
                <Card flat style={{ marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '19px' }}>Akses cepat</h3>
                  <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#4a5e55' }}>
                    Layanan yang paling sering Anda buka untuk peran ini.
                  </p>
                </Card>
                <div className="grid g2">
                  {links.map((l) => (
                    <Card key={l.id} to={l.to}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          color: '#064e3b',
                          marginBottom: '6px',
                        }}
                      >
                        {quickLinkIcon(l.icon)}
                        <h3 style={{ margin: 0, fontSize: '16px' }}>{l.label}</h3>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: '#4a5e55' }}>{l.desc}</p>
                      <span className="more">
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          Buka{' '}
                          <ArrowRight style={{ width: 14, height: 14 }} aria-hidden="true" />
                        </span>
                      </span>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <Card flat>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '12px',
                }}
              >
                <Bell style={{ width: 18, height: 18, color: '#064e3b' }} aria-hidden="true" />
                <h3 style={{ margin: 0, fontSize: '19px' }}>Notifikasi</h3>
              </div>
              <ul className="clean" style={{ display: 'grid', gap: '10px', margin: 0, padding: 0 }}>
                {notifs.map((n) => (
                  <li
                    key={n.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '24px minmax(0, 1fr) auto',
                      gap: '12px',
                      alignItems: 'center',
                      padding: '12px 14px',
                      background: '#fff',
                      border: '1px solid #dce6e0',
                      borderRadius: '12px',
                    }}
                  >
                    <span style={{ display: 'grid', placeItems: 'center' }}>
                      {notifIcon(n.kind)}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <SmartLink to="#" className="no-underline text-ink hover:text-em-700">
                        <b style={{ fontSize: '14.5px' }}>{n.title}</b>
                      </SmartLink>
                      <div className="muted" style={{ fontSize: '12.5px', marginTop: '2px' }}>
                        {n.meta}
                      </div>
                    </div>
                    {notifPill(n.kind)}
                  </li>
                ))}
              </ul>
              <div className="btn-row" style={{ marginTop: '14px' }}>
                <Button variant="ghost" href="#">
                  Tandai semua dibaca
                </Button>
                <Button variant="line" href="#">
                  Pengaturan notifikasi
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
