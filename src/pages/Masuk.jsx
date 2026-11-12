import { useMemo, useState } from 'react'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { ArrowRight, KeyRound, Lock, LogIn, Mail, ShieldCheck } from 'lucide-react'

const ROLE_OPTIONS = [
  { v: 'mhs', label: 'Mahasiswa' },
  { v: 'dsn', label: 'Dosen / tendik' },
  { v: 'op-kmhs', label: 'Operator Biro Kemahasiswaan' },
  { v: 'unit', label: 'Operator unit kerja / pemilik risiko' },
  { v: 'renbang', label: 'Koordinator kinerja & risiko (WR IV / Biro Perencanaan)' },
  { v: 'spi', label: 'Satuan Pengawasan Internal' },
  { v: 'mutu', label: 'Tim mutu internal' },
]

const UNIT_OPTIONS = [
  { v: 'REK', label: 'REK · Pimpinan Universitas (Rektor dan Wakil Rektor I-IV)' },
  { v: 'BAK', label: 'BAK · Biro Akademik' },
  { v: 'BKM', label: 'BKM · Biro Kemahasiswaan' },
  { v: 'BKU', label: 'BKU · Biro Keuangan' },
  { v: 'SDM', label: 'SDM · Biro Sumber Daya Manusia' },
  { v: 'BUM', label: 'BUM · Biro Umum' },
  { v: 'LPPM', label: 'LPPM · Lembaga Penelitian dan Pengabdian kepada Masyarakat (LPPM)' },
  { v: 'HKA', label: 'HKA · Biro Humas, Kerjasama dan Alumni (HKA)' },
  { v: 'RSB', label: 'RSB · Biro Perencanaan dan Pengembangan Institusi' },
  { v: 'TI', label: 'TI · Bagian Teknologi Informasi' },
  { v: 'HUK', label: 'HUK · Biro Hukum dan Administrasi Umum' },
  { v: 'BPM', label: 'BPM · Badan Penjaminan Mutu (BPM)' },
  { v: 'SPI', label: 'SPI · Satuan Pengawas Internal (SPI)' },
  { v: 'ETIK', label: 'ETIK · Dewan Etik dan Satgas PPKPT' },
  { v: 'SAU', label: 'SAU · Senat Akademik Universitas (SAU)' },
  { v: 'DEWPEN', label: 'DEWPEN · Dewan Penasehat' },
  { v: 'UPTPUS', label: 'UPTPUS · Unit Pelaksana Teknis Perpustakaan' },
  { v: 'UPTBIS', label: 'UPTBIS · UPT Inkubator Bisnis Teknologi dan Unit Bisnis' },
  { v: 'UPTBHS', label: 'UPTBHS · UPT Pusat Bahasa (UNIZAR Learning Center)' },
  { v: 'UPTK3', label: 'UPTK3 · UPT Keselamatan dan Kesehatan Kerja (K3)' },
  { v: 'FAK', label: 'FAK · Fakultas (template generik)' },
  { v: 'PPS', label: 'PPS · Program Pascasarjana (template generik)' },
  { v: 'PRODI', label: 'PRODI · Program Studi (template generik)' },
]

const ACCESS_LIST = [
  'Dokumen bertanda gembok di Pusdatin',
  'Laporan audit, RTM, dan RTL',
  'Layanan akademik, keuangan, dan kepegawaian',
  'Kolom status kelengkapan bukti (tim internal)',
]

const TABS = [
  { key: 'sivitas', label: 'Sivitas (SSO)' },
  { key: 'asesor', label: 'Asesor / mitra' },
]

const FIELD_STYLE = {
  display: 'grid',
  gap: '6px',
}

const INPUT_STYLE = {
  border: '1px solid #dce6e0',
  background: '#fff',
  borderRadius: '10px',
  padding: '11px 14px',
  fontSize: '15px',
  color: '#13231c',
  width: '100%',
  outline: 'none',
}

const LABEL_STYLE = {
  fontSize: '13px',
  fontWeight: 700,
  color: '#4a5e55',
}

const TABS_L_STYLE = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
  borderBottom: '1px solid #dce6e0',
  marginBottom: '14px',
}

function tabButtonStyle(selected) {
  return {
    border: 0,
    background: 'transparent',
    padding: '10px 14px',
    fontWeight: 700,
    color: selected ? '#064e3b' : '#4a5e55',
    cursor: 'pointer',
    borderBottom: `2px solid ${selected ? '#f2c230' : 'transparent'}`,
    fontSize: '14px',
  }
}

export default function Masuk() {
  const [tab, setTab] = useState('sivitas')

  // Sivitas form state
  const [sId, setSId] = useState('')
  const [sPw, setSPw] = useState('')
  const [role, setRole] = useState('mhs')
  const [unit, setUnit] = useState('BAK')
  const [sivitasMsg, setSivitasMsg] = useState(null)

  // Asesor form state
  const [aId, setAId] = useState('')
  const [aPw, setAPw] = useState('')
  const [asesorMsg, setAsesorMsg] = useState(null)

  const showUnitField = role === 'unit'

  const roleLabel = useMemo(
    () => ROLE_OPTIONS.find((r) => r.v === role)?.label ?? 'Mahasiswa',
    [role],
  )

  function handleSivitasSubmit(e) {
    e.preventDefault()
    if (!sId.trim() || !sPw.trim()) {
      setSivitasMsg({
        kind: 'err',
        text: 'Email/NIDN/NIM dan kata sandi wajib diisi.',
      })
      return
    }
    setSivitasMsg({
      kind: 'ok',
      text: `Masuk berhasil (simulasi). Peran aktif: ${roleLabel}${showUnitField ? ` · unit ${unit}` : ''}. Dashboard belum terhubung di tampilan ini.`,
    })
  }

  function handleAsesorSubmit(e) {
    e.preventDefault()
    if (!aId.trim() || !aPw.trim()) {
      setAsesorMsg({
        kind: 'err',
        text: 'ID asesor dan kode akses wajib diisi.',
      })
      return
    }
    setAsesorMsg({
      kind: 'ok',
      text: 'Akses asesor diberikan (simulasi). Peta Bukti BAN-PT dapat dibuka, setiap unduhan tercatat.',
    })
  }

  return (
    <div className="page animate-fade">
      <PageHero
        title="Masuk ke UNIZAR"
        description="Satu akun untuk layanan dan dokumen terbatas. Asesor menggunakan akun berbatas waktu dari Penjaminan Mutu."
        crumbs={[{ label: 'Beranda', to: '/beranda' }, { label: 'Masuk' }]}
        photoCaption="Foto: gedung kampus malam hari"
      />
      <Subnav items={[{ id: 'masuk--form', label: 'Masuk' }]} />

      <section className="sec" id="masuk--form" data-t="Masuk">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Akun</span>
              <h2>Pilih jenis akun</h2>
            </div>
          </div>

          <div className="split">
            <Card style={{ maxWidth: '520px' }}>
              <div className="tabs-l" role="tablist" aria-label="Jenis akun" style={TABS_L_STYLE}>
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    aria-selected={tab === t.key}
                    style={tabButtonStyle(tab === t.key)}
                    onClick={() => setTab(t.key)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {tab === 'sivitas' ? (
                <form
                  role="tabpanel"
                  onSubmit={handleSivitasSubmit}
                  style={{ display: 'grid', gap: '14px', marginTop: '14px' }}
                >
                  <div className="field" style={FIELD_STYLE}>
                    <label htmlFor="l-id" style={LABEL_STYLE}>
                      Email UNIZAR / NIDN / NIM
                    </label>
                    <input
                      id="l-id"
                      autoComplete="username"
                      placeholder="nama@unizar.ac.id"
                      value={sId}
                      onChange={(e) => setSId(e.target.value)}
                      style={INPUT_STYLE}
                    />
                  </div>

                  <div className="field" style={FIELD_STYLE}>
                    <label htmlFor="l-pw" style={LABEL_STYLE}>
                      Kata sandi
                    </label>
                    <input
                      id="l-pw"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={sPw}
                      onChange={(e) => setSPw(e.target.value)}
                      style={INPUT_STYLE}
                    />
                  </div>

                  <div className="field" style={FIELD_STYLE}>
                    <label htmlFor="l-role" style={LABEL_STYLE}>
                      Masuk sebagai (simulasi peran)
                    </label>
                    <select
                      id="l-role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      style={INPUT_STYLE}
                    >
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r.v} value={r.v}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {showUnitField && (
                    <div className="field" style={FIELD_STYLE}>
                      <label htmlFor="l-unit" style={LABEL_STYLE}>
                        Unit kerja
                      </label>
                      <select
                        id="l-unit"
                        name="unit"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        style={INPUT_STYLE}
                      >
                        {UNIT_OPTIONS.map((u) => (
                          <option key={u.v} value={u.v}>
                            {u.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <Button variant="dark" asButton className="!justify-center">
                    <LogIn style={{ width: 16, height: 16 }} aria-hidden="true" />
                    Masuk
                  </Button>

                  <SmartLink
                    to="#"
                    className="text-em-700"
                    ariaLabel="Lupa kata sandi atau belum punya akun"
                    onClick={() =>
                      setSivitasMsg({
                        kind: 'err',
                        text: 'Pengaturan akun belum tersedia di tampilan ini. Hubungi Bagian Teknologi Informasi.',
                      })
                    }
                  >
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>
                      Lupa kata sandi atau belum punya akun?
                    </span>
                  </SmartLink>

                  {sivitasMsg && (
                    <span
                      className="form-msg"
                      aria-live="polite"
                      style={
                        sivitasMsg.kind === 'err'
                          ? { background: '#fbe7e8', color: '#8e1b20' }
                          : undefined
                      }
                    >
                      {sivitasMsg.text}
                    </span>
                  )}
                </form>
              ) : (
                <form
                  role="tabpanel"
                  onSubmit={handleAsesorSubmit}
                  style={{ display: 'grid', gap: '14px', marginTop: '14px' }}
                >
                  <div className="field" style={FIELD_STYLE}>
                    <label htmlFor="a-id" style={LABEL_STYLE}>
                      ID asesor
                    </label>
                    <input
                      id="a-id"
                      autoComplete="username"
                      placeholder="mis. ASR-2026-001"
                      value={aId}
                      onChange={(e) => setAId(e.target.value)}
                      style={INPUT_STYLE}
                    />
                  </div>

                  <div className="field" style={FIELD_STYLE}>
                    <label htmlFor="a-pw" style={LABEL_STYLE}>
                      Kode akses
                    </label>
                    <input
                      id="a-pw"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={aPw}
                      onChange={(e) => setAPw(e.target.value)}
                      style={INPUT_STYLE}
                    />
                  </div>

                  <Button variant="dark" asButton className="!justify-center">
                    <ShieldCheck style={{ width: 16, height: 16 }} aria-hidden="true" />
                    Masuk sebagai asesor
                  </Button>

                  {asesorMsg ? (
                    <span
                      className="form-msg"
                      aria-live="polite"
                      style={
                        asesorMsg.kind === 'err'
                          ? { background: '#fbe7e8', color: '#8e1b20' }
                          : undefined
                      }
                    >
                      {asesorMsg.text}
                    </span>
                  ) : (
                    <span className="form-msg" aria-live="polite" style={{ display: 'none' }} />
                  )}

                  <p className="note" style={{ marginTop: '4px' }}>
                    Akun asesor hanya-baca, berlaku selama masa asesmen, dan langsung membuka Peta
                    Bukti. Setiap unduhan tercatat.
                  </p>
                </form>
              )}
            </Card>

            <Card flat>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#064e3b',
                  }}
                >
                  <Lock style={{ width: 18, height: 18 }} aria-hidden="true" />
                  <h3 style={{ margin: 0, fontSize: '19px' }}>Yang terbuka setelah masuk</h3>
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: '18px',
                    color: 'var(--muted, #4a5e55)',
                    display: 'grid',
                    gap: '6px',
                  }}
                >
                  {ACCESS_LIST.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="btn-row" style={{ marginTop: '6px' }}>
                  <Button variant="line" href="/pusdatin">
                    Buka Pusdatin{' '}
                    <ArrowRight style={{ width: 14, height: 14 }} aria-hidden="true" />
                  </Button>
                  <Button variant="line" href="/peta-bukti">
                    <KeyRound style={{ width: 14, height: 14 }} aria-hidden="true" />
                    Buka Peta Bukti
                  </Button>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '6px',
                    color: '#4a5e55',
                    fontSize: '13px',
                  }}
                >
                  <Mail style={{ width: 14, height: 14 }} aria-hidden="true" />
                  <span>Bantuan akun: Bagian Teknologi Informasi.</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
