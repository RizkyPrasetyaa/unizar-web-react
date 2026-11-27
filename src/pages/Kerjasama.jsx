import { useEffect, useMemo, useRef, useState } from 'react'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import PhotoSlot from '../components/ui/PhotoSlot.jsx'
import Button from '../components/ui/Button.jsx'
import { ArrowRight, Copy, Download, ExternalLink, FileDown, Lock, X } from 'lucide-react'

const MITRA = [
  {
    id: 'mitra-0',
    name: '[Universitas mitra, Malaysia]',
    bidang: 'Pendidikan',
    kegiatan: 'Pertukaran mahasiswa',
    realisasi: 'Berjalan',
    variant: 'gold',
    cakupan: 'ln',
    jenisNaskah: 'MoA',
    masaBerlaku: '[tanggal]–[tanggal]',
    deskripsi: '[Ruang lingkup kerja sama dan manfaat bagi kedua pihak.]',
    kegiatanList: [
      'Pertukaran mahasiswa · [tahun] · [jumlah peserta]',
      '[Kegiatan lain] · [tahun]',
    ],
    photoCaption: 'Foto: kegiatan bersama mitra',
  },
  {
    id: 'mitra-1',
    name: '[Universitas mitra, Jepang]',
    bidang: 'Penelitian',
    kegiatan: 'Riset bersama',
    realisasi: 'Berjalan',
    variant: 'gold',
    cakupan: 'ln',
    jenisNaskah: 'MoU',
    masaBerlaku: '[tanggal]–[tanggal]',
    deskripsi: '[Ruang lingkup kerja sama dan manfaat bagi kedua pihak.]',
    kegiatanList: [
      'Riset bersama · [tahun] · [jumlah peneliti]',
      '[Kegiatan lain] · [tahun]',
    ],
    photoCaption: 'Foto: kegiatan bersama mitra',
  },
  {
    id: 'mitra-2',
    name: '[Rumah sakit jejaring]',
    bidang: 'Pendidikan',
    kegiatan: 'Kepaniteraan klinik',
    realisasi: 'Terealisasi',
    variant: 'default',
    cakupan: 'dn',
    jenisNaskah: 'MoA',
    masaBerlaku: '[tanggal]–[tanggal]',
    deskripsi: '[Ruang lingkup kerja sama dan manfaat bagi kedua pihak.]',
    kegiatanList: [
      'Kepaniteraan klinik · [tahun] · [jumlah peserta]',
      '[Kegiatan lain] · [tahun]',
    ],
    photoCaption: 'Foto: kegiatan bersama mitra',
  },
  {
    id: 'mitra-3',
    name: '[Pemerintah Provinsi NTB]',
    bidang: 'Pengabdian',
    kegiatan: 'Desa binaan',
    realisasi: 'Terealisasi',
    variant: 'default',
    cakupan: 'dn',
    jenisNaskah: 'MoU',
    masaBerlaku: '[tanggal]–[tanggal]',
    deskripsi: '[Ruang lingkup kerja sama dan manfaat bagi kedua pihak.]',
    kegiatanList: [
      'Desa binaan · [tahun]',
      '[Kegiatan lain] · [tahun]',
    ],
    photoCaption: 'Foto: kegiatan bersama mitra',
  },
  {
    id: 'mitra-4',
    name: '[Perusahaan mitra]',
    bidang: 'Magang',
    kegiatan: 'Magang MBKM',
    realisasi: 'Berjalan',
    variant: 'gold',
    cakupan: 'dn',
    jenisNaskah: 'MoA',
    masaBerlaku: '[tanggal]–[tanggal]',
    deskripsi: '[Ruang lingkup kerja sama dan manfaat bagi kedua pihak.]',
    kegiatanList: [
      'Magang MBKM · [tahun] · [jumlah peserta]',
      '[Kegiatan lain] · [tahun]',
    ],
    photoCaption: 'Foto: kegiatan bersama mitra',
  },
  {
    id: 'mitra-5',
    name: '[Perguruan tinggi nasional]',
    bidang: 'Penelitian',
    kegiatan: 'Hibah kolaborasi',
    realisasi: 'Terealisasi',
    variant: 'default',
    cakupan: 'dn',
    jenisNaskah: 'MoU',
    masaBerlaku: '[tanggal]–[tanggal]',
    deskripsi: '[Ruang lingkup kerja sama dan manfaat bagi kedua pihak.]',
    kegiatanList: [
      'Hibah kolaborasi · [tahun]',
      '[Kegiatan lain] · [tahun]',
    ],
    photoCaption: 'Foto: kegiatan bersama mitra',
  },
]

const CAKUPAN_CHIPS = [
  { v: 'all', label: 'Semua' },
  { v: 'dn', label: 'Dalam negeri' },
  { v: 'ln', label: 'Luar negeri' },
]

const INTERNASIONAL = [
  {
    id: 'int-mhs',
    pill: 'Mahasiswa',
    title: 'Mobilitas mahasiswa',
    desc: 'Pertukaran pelajar, summer course, dan magang luar negeri.',
    pengelola: 'Biro Humas, Kerja Sama & Alumni',
    batas: '[tanggal]',
    detail:
      'Pertukaran pelajar, summer course, dan magang luar negeri bersama universitas mitra.',
    catatan: '[Syarat, jadwal, dan pendanaan.]',
    program: ['[Program 1] · [Mitra]', '[Program 2] · [Mitra]'],
    photoCaption: 'Foto: Mobilitas mahasiswa',
  },
  {
    id: 'int-dosen',
    pill: 'Dosen',
    title: 'Mobilitas dosen',
    desc: 'Visiting lecturer, riset bersama, dan konferensi.',
    pengelola: 'Biro Humas, Kerja Sama & Alumni',
    batas: '[tanggal]',
    detail: 'Visiting lecturer, riset bersama, dan konferensi internasional.',
    catatan: '[Syarat, jadwal, dan pendanaan.]',
    program: ['[Program 1] · [Mitra]', '[Program 2] · [Mitra]'],
    photoCaption: 'Foto: Mobilitas dosen',
  },
  {
    id: 'int-pendaftar',
    pill: 'Pendaftar',
    title: 'Mahasiswa internasional',
    desc: 'Informasi pendaftaran, visa, dan pendampingan.',
    pengelola: 'Biro Akademik & Biro Humas',
    batas: '[tanggal]',
    detail: 'Informasi pendaftaran, visa, dan pendampingan mahasiswa internasional.',
    catatan: '[Syarat, jadwal, dan biaya.]',
    program: ['[Program gelar] · [Fakultas]', '[Program non-gelar] · [Unit]'],
    photoCaption: 'Foto: Mahasiswa internasional',
  },
]

const PEDOMAN_KS = {
  title: 'Pedoman kerja sama UNIZAR',
  keterangan: 'Rektor · SK [nomor]',
  nomor: 'SK [nomor]',
  tanggal: '[tanggal]',
  versi: '[v]',
  status: 'Berlaku',
  akses: 'Publik',
  riwayat: [
    { versi: '[v terbaru]', desc: 'Berlaku sejak [tanggal]' },
    { versi: '[v sebelumnya]', desc: 'Diganti setelah evaluasi' },
  ],
}

function useDrawerClose(open, onClose) {
  const closeRef = useRef(null)
  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])
  return closeRef
}

function MitraDrawer({ mitra, onClose, onAjukan, onNaskah }) {
  const closeRef = useDrawerClose(!!mitra, onClose)
  if (!mitra) return null

  const cakupanLabel = mitra.cakupan === 'ln' ? 'Luar negeri' : 'Dalam negeri'

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="pd" role="dialog" aria-modal="true" aria-label={`Mitra ${mitra.name}`}>
        <div className="pd-head">
          <span className="eyebrow" style={{ color: '#f2c230' }}>
            Kerja sama · {cakupanLabel}
          </span>
          <h3>{mitra.name}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup detail mitra"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <PhotoSlot
            caption={mitra.photoCaption || 'Foto: kegiatan bersama mitra'}
            aria-label="Tempat foto: kegiatan bersama mitra"
            style={{ height: '210px' }}
          />
          <dl className="pd-meta">
            <div>
              <dt>Bidang</dt>
              <dd>{mitra.bidang}</dd>
            </div>
            <div>
              <dt>Jenis naskah</dt>
              <dd>{mitra.jenisNaskah}</dd>
            </div>
            <div>
              <dt>Masa berlaku</dt>
              <dd>{mitra.masaBerlaku}</dd>
            </div>
            <div>
              <dt>Status realisasi</dt>
              <dd>{mitra.realisasi}</dd>
            </div>
          </dl>
          <p className="pd-bio">{mitra.deskripsi}</p>
          <div className="pd-sec">
            <h4>Kegiatan yang terealisasi</h4>
            <ul className="clean">
              {(mitra.kegiatanList || []).map((k, i) => (
                <li key={i} className="pd-row">
                  {k}
                </li>
              ))}
            </ul>
          </div>
          <div className="btn-row" style={{ marginTop: '18px' }}>
            <Button
              variant="dark"
              asButton
              onClick={() => {
                onNaskah?.(mitra)
              }}
            >
              Naskah kerja sama
            </Button>
            <Button
              variant="line"
              asButton
              onClick={() => {
                onClose()
                onAjukan?.()
              }}
            >
              Ajukan kerja sama baru
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

function InternasionalDrawer({ item, onClose, onMitraLn, onDaftar }) {
  const closeRef = useDrawerClose(!!item, onClose)
  if (!item) return null

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="pd" role="dialog" aria-modal="true" aria-label={item.title}>
        <div className="pd-head">
          <span className="eyebrow" style={{ color: '#f2c230' }}>
            Internasional
          </span>
          <h3>{item.title}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup detail"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <PhotoSlot
            caption={item.photoCaption}
            aria-label={`Tempat foto: ${item.title}`}
            style={{ height: '210px' }}
          />
          <dl className="pd-meta">
            <div>
              <dt>Pengelola</dt>
              <dd>{item.pengelola}</dd>
            </div>
            <div>
              <dt>Batas pendaftaran</dt>
              <dd>{item.batas}</dd>
            </div>
          </dl>
          <p className="pd-bio">{item.detail}</p>
          <p className="pd-bio" style={{ marginTop: '6px' }}>
            {item.catatan}
          </p>
          <div className="pd-sec">
            <h4>Program tersedia</h4>
            <ul className="clean">
              {(item.program || []).map((p, i) => (
                <li key={i} className="pd-row">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="btn-row" style={{ marginTop: '18px' }}>
            <Button
              variant="dark"
              asButton
              onClick={() => {
                onDaftar?.(item)
              }}
            >
              Ajukan / daftar
            </Button>
            <Button
              variant="line"
              asButton
              onClick={() => {
                onClose()
                onMitraLn?.()
              }}
            >
              Mitra luar negeri
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

const JENIS_INSTITUSI = ['Perguruan tinggi', 'Pemerintah', 'Industri', 'Lembaga / LSM']

function AjukanDrawer({ open, onClose }) {
  const closeRef = useDrawerClose(open, onClose)
  const [step, setStep] = useState(1)
  const [nama, setNama] = useState('')
  const [kota, setKota] = useState('')
  const [jenis, setJenis] = useState('')
  const [rencana, setRencana] = useState('')
  const [bidang, setBidang] = useState('Pendidikan')
  const [cpNama, setCpNama] = useState('')
  const [cpKontak, setCpKontak] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!open) {
      setStep(1)
      setMsg('')
    }
  }, [open])

  if (!open) return null

  function next(e) {
    e.preventDefault()
    if (step === 1) {
      if (!nama.trim()) {
        setMsg('Isi nama institusi.')
        return
      }
      setMsg('')
      setStep(2)
      return
    }
    if (step === 2) {
      if (!rencana.trim()) {
        setMsg('Isi rencana kerja sama.')
        return
      }
      setMsg('')
      setStep(3)
      return
    }
    if (!cpNama.trim() || !cpKontak.trim()) {
      setMsg('Lengkapi narahubung.')
      return
    }
    setMsg(
      `Terima kasih, ${nama.trim()}. Pengajuan tercatat dan akan direspons dalam 5 hari kerja.`,
    )
  }

  const steps = [
    { n: 1, label: 'Institusi' },
    { n: 2, label: 'Rencana kerja sama' },
    { n: 3, label: 'Narahubung' },
  ]

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd"
        role="dialog"
        aria-modal="true"
        aria-label="Pengajuan Kerja Sama"
      >
        <div className="pd-head">
          <span className="eyebrow" style={{ color: '#f2c230' }}>
            Biro Humas, Kerja Sama &amp; Alumni
          </span>
          <h3>Pengajuan Kerja Sama</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup formulir"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <p className="pd-bio">
            Untuk perguruan tinggi, pemerintah, industri, dan lembaga di dalam maupun luar negeri.
          </p>
          <p
            style={{
              marginTop: '10px',
              color: 'var(--em-700)',
              fontWeight: 600,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span aria-hidden="true">✓</span> Respons dalam 5 hari kerja
          </p>

          {/* Steps */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              margin: '18px 0 16px',
              alignItems: 'center',
            }}
          >
            {steps.map((s) => {
              const active = step === s.n
              const done = step > s.n
              return (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => setStep(s.n)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: active ? '8px 14px' : '8px 12px',
                    borderRadius: '999px',
                    border: active ? 'none' : '1px solid var(--line)',
                    background: active ? 'var(--em-700)' : done ? '#f1f7f3' : '#fff',
                    color: active ? '#fff' : 'var(--ink)',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      background: active ? 'rgba(255,255,255,0.2)' : '#e3ece7',
                      fontSize: '12px',
                    }}
                  >
                    {s.n}
                  </span>
                  {s.label}
                </button>
              )
            })}
          </div>

          <form onSubmit={next} style={{ display: 'grid', gap: '14px' }}>
            {step === 1 && (
              <>
                <h4 style={{ margin: 0 }}>Institusi</h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: '14px',
                  }}
                >
                  <div className="field" style={{ display: 'grid', gap: '6px' }}>
                    <label htmlFor="ks-nama">Nama institusi</label>
                    <input
                      id="ks-nama"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      style={{
                        padding: '10px 12px',
                        border: '1px solid #DCE6E0',
                        borderRadius: '14px',
                        fontSize: '15px',
                      }}
                    />
                  </div>
                  <div className="field" style={{ display: 'grid', gap: '6px' }}>
                    <label htmlFor="ks-kota">Kota / negara</label>
                    <input
                      id="ks-kota"
                      value={kota}
                      onChange={(e) => setKota(e.target.value)}
                      style={{
                        padding: '10px 12px',
                        border: '1px solid #DCE6E0',
                        borderRadius: '14px',
                        fontSize: '15px',
                      }}
                    />
                  </div>
                </div>
                <div className="field" style={{ display: 'grid', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>Jenis institusi</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {JENIS_INSTITUSI.map((j) => (
                      <button
                        key={j}
                        type="button"
                        onClick={() => setJenis(j)}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '999px',
                          border: jenis === j ? '2px solid var(--em-700)' : '1px solid var(--line)',
                          background: jenis === j ? '#f1f7f3' : '#fff',
                          fontWeight: 600,
                          fontSize: '14px',
                          cursor: 'pointer',
                        }}
                      >
                        {j}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h4 style={{ margin: 0 }}>Rencana kerja sama</h4>
                <div className="field" style={{ display: 'grid', gap: '6px' }}>
                  <label htmlFor="ks-bidang">Bidang</label>
                  <select
                    id="ks-bidang"
                    value={bidang}
                    onChange={(e) => setBidang(e.target.value)}
                    style={{
                      padding: '10px 12px',
                      border: '1px solid #DCE6E0',
                      borderRadius: '14px',
                      fontSize: '15px',
                    }}
                  >
                    <option>Pendidikan</option>
                    <option>Penelitian</option>
                    <option>Pengabdian</option>
                    <option>Magang</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div className="field" style={{ display: 'grid', gap: '6px' }}>
                  <label htmlFor="ks-rencana">Uraian rencana</label>
                  <textarea
                    id="ks-rencana"
                    rows={4}
                    value={rencana}
                    onChange={(e) => setRencana(e.target.value)}
                    style={{
                      padding: '10px 12px',
                      border: '1px solid #DCE6E0',
                      borderRadius: '14px',
                      fontSize: '15px',
                      resize: 'vertical',
                    }}
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h4 style={{ margin: 0 }}>Narahubung</h4>
                <div className="field" style={{ display: 'grid', gap: '6px' }}>
                  <label htmlFor="ks-cp-nama">Nama</label>
                  <input
                    id="ks-cp-nama"
                    value={cpNama}
                    onChange={(e) => setCpNama(e.target.value)}
                    style={{
                      padding: '10px 12px',
                      border: '1px solid #DCE6E0',
                      borderRadius: '14px',
                      fontSize: '15px',
                    }}
                  />
                </div>
                <div className="field" style={{ display: 'grid', gap: '6px' }}>
                  <label htmlFor="ks-cp-kontak">Email / WhatsApp</label>
                  <input
                    id="ks-cp-kontak"
                    value={cpKontak}
                    onChange={(e) => setCpKontak(e.target.value)}
                    style={{
                      padding: '10px 12px',
                      border: '1px solid #DCE6E0',
                      borderRadius: '14px',
                      fontSize: '15px',
                    }}
                  />
                </div>
              </>
            )}

            <div className="btn-row" style={{ justifyContent: 'flex-end' }}>
              {step > 1 && (
                <Button variant="line" asButton type="button" onClick={() => setStep((s) => s - 1)}>
                  Kembali
                </Button>
              )}
              <Button variant="dark" asButton type="submit">
                {step < 3 ? 'Lanjut' : 'Kirim pengajuan'}
              </Button>
            </div>
            {msg && (
              <p className="form-msg" aria-live="polite" style={{ margin: 0, fontSize: '14px' }}>
                {msg}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

function PedomanDrawer({ open, onClose }) {
  const closeRef = useDrawerClose(open, onClose)
  const [copied, setCopied] = useState(false)
  if (!open) return null

  const doc = PEDOMAN_KS
  const salin = () => {
    try {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="pop-root">
      <div className="pop-backdrop" onClick={onClose} />
      <aside className="pop" role="dialog" aria-modal="true" aria-label={doc.title}>
        <header className="pop-hd">
          <span className="eyebrow">Pusdatin · Publik</span>
          <h3>{doc.title}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pop-x"
            onClick={onClose}
            aria-label="Tutup panel detail"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </header>

        <div className="pop-bd">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
              gap: '18px',
              alignItems: 'start',
            }}
          >
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(140deg, #0a6b4f, #064e3b)',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <span style={{ color: '#f2c230', fontWeight: 800, fontSize: '11px' }}>UZ</span>
              </div>
              <b style={{ fontSize: '15px', color: 'var(--ink)', textAlign: 'center' }}>
                {doc.title}
              </b>
              {[100, 85, 90, 70].map((w, i) => (
                <div
                  key={i}
                  style={{
                    width: `${w}%`,
                    height: '8px',
                    background: '#e3ece7',
                    borderRadius: '4px',
                  }}
                />
              ))}
              <small style={{ color: 'var(--muted)', fontSize: '11px', marginTop: '8px' }}>
                Pratinjau dokumen
              </small>
            </div>

            <div>
              <dl className="pop-meta" style={{ gridTemplateColumns: '120px minmax(0, 1fr)' }}>
                <div className="contents">
                  <dt>Keterangan</dt>
                  <dd>{doc.keterangan}</dd>
                </div>
                <div className="contents">
                  <dt>Nomor</dt>
                  <dd>{doc.nomor}</dd>
                </div>
                <div className="contents">
                  <dt>Tanggal penetapan</dt>
                  <dd>{doc.tanggal}</dd>
                </div>
                <div className="contents">
                  <dt>Versi</dt>
                  <dd>{doc.versi}</dd>
                </div>
                <div className="contents">
                  <dt>Status</dt>
                  <dd>{doc.status}</dd>
                </div>
                <div className="contents">
                  <dt>Akses</dt>
                  <dd>{doc.akses}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="pop-list" style={{ marginTop: '8px' }}>
            <b>Riwayat versi</b>
            <ul className="clean">
              {(doc.riwayat || []).map((r, i) => (
                <li key={i}>
                  <b style={{ fontSize: '14px' }}>{r.versi}</b>
                  <br />
                  <span style={{ color: 'var(--muted)', fontSize: '14px' }}>{r.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="pop-ft">
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="#"
              download
              className="btn btn-dark"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={(e) => e.preventDefault()}
            >
              <Download size={16} />
              Unduh PDF
            </a>
            <button
              type="button"
              className="btn btn-line"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={salin}
            >
              <Copy size={16} />
              {copied ? 'Tautan disalin ✓' : 'Salin tautan'}
            </button>
          </div>
        </footer>
      </aside>
    </div>
  )
}

function LockedNaskahDrawer({ mitra, onClose }) {
  const closeRef = useDrawerClose(!!mitra, onClose)
  if (!mitra) return null

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd"
        role="dialog"
        aria-modal="true"
        aria-label={`Naskah kerja sama ${mitra.name}`}
      >
        <div className="pd-head">
          <span className="eyebrow" style={{ color: '#f2c230' }}>
            Dokumen terbatas
          </span>
          <h3>Naskah kerja sama {mitra.name}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div
          className="pd-body"
          style={{ textAlign: 'center', paddingTop: '28px', paddingBottom: '28px' }}
        >
          <Lock
            size={36}
            strokeWidth={1.6}
            style={{ color: 'var(--em-700)', margin: '0 auto 16px' }}
            aria-hidden="true"
          />
          <p className="pd-bio" style={{ maxWidth: '36ch', margin: '0 auto 20px' }}>
            Silakan masuk terlebih dahulu. Layanan ini untuk sivitas atau asesor.
          </p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <Button variant="dark" href="/masuk">
              Masuk
            </Button>
            <Button variant="line" asButton onClick={onClose}>
              Nanti saja
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

function DaftarDrawer({ program, onClose }) {
  const closeRef = useDrawerClose(!!program, onClose)
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [topik, setTopik] = useState('')
  const [pesan, setPesan] = useState('')
  const [msg, setMsg] = useState('')

  if (!program) return null

  function handleSubmit(e) {
    e.preventDefault()
    if (!nama.trim() || !email.trim() || !pesan.trim()) {
      setMsg('Lengkapi nama, email, dan pesan.')
      return
    }
    setMsg(`Terima kasih, ${nama.trim()}. Pengajuan Anda untuk "${program.title}" telah tercatat.`)
    setNama('')
    setEmail('')
    setTopik('')
    setPesan('')
  }

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd"
        role="dialog"
        aria-modal="true"
        aria-label={`Ajukan / daftar ${program.title}`}
      >
        <div className="pd-head">
          <span className="eyebrow" style={{ color: '#f2c230' }}>
            Internasional · Pendaftaran
          </span>
          <h3>Ajukan / daftar — {program.title}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup formulir"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <p className="pd-bio">
            Pendaftaran program internasional. Tim akan menghubungi Anda sesuai jadwal seleksi.
          </p>
          <p
            style={{
              marginTop: '10px',
              color: 'var(--em-700)',
              fontWeight: 600,
              fontSize: '14px',
            }}
          >
            ✓ Respons sesuai batas pendaftaran program
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              margin: '18px 0 14px',
              padding: '8px 14px',
              borderRadius: '999px',
              background: 'var(--em-700)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '13px',
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                background: 'rgba(255,255,255,0.2)',
                fontSize: '12px',
              }}
            >
              1
            </span>
            Data pendaftar
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '14px',
              }}
            >
              <div className="field" style={{ display: 'grid', gap: '6px' }}>
                <label htmlFor="df-nama">Nama</label>
                <input
                  id="df-nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid #DCE6E0',
                    borderRadius: '14px',
                    fontSize: '15px',
                  }}
                />
              </div>
              <div className="field" style={{ display: 'grid', gap: '6px' }}>
                <label htmlFor="df-email">Email</label>
                <input
                  id="df-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    border: '1px solid #DCE6E0',
                    borderRadius: '14px',
                    fontSize: '15px',
                  }}
                />
              </div>
            </div>
            <div className="field" style={{ display: 'grid', gap: '6px' }}>
              <label htmlFor="df-topik">Program / minat</label>
              <select
                id="df-topik"
                value={topik}
                onChange={(e) => setTopik(e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #DCE6E0',
                  borderRadius: '14px',
                  fontSize: '15px',
                }}
              >
                <option value="">Pilih…</option>
                {(program.program || []).map((pr) => (
                  <option key={pr} value={pr}>
                    {pr}
                  </option>
                ))}
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div className="field" style={{ display: 'grid', gap: '6px' }}>
              <label htmlFor="df-pesan">Pesan / motivasi singkat</label>
              <textarea
                id="df-pesan"
                rows={4}
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #DCE6E0',
                  borderRadius: '14px',
                  fontSize: '15px',
                  resize: 'vertical',
                }}
              />
            </div>
            <div className="btn-row" style={{ justifyContent: 'flex-end' }}>
              <Button variant="dark" asButton type="submit">
                Kirim
              </Button>
            </div>
            {msg && (
              <p className="form-msg" aria-live="polite" style={{ margin: 0, fontSize: '14px' }}>
                {msg}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default function Kerjasama() {
  const [cakupan, setCakupan] = useState('all')
  const [mitraDetail, setMitraDetail] = useState(null)
  const [intDetail, setIntDetail] = useState(null)
  const [ajukanOpen, setAjukanOpen] = useState(false)
  const [pedomanOpen, setPedomanOpen] = useState(false)
  const [naskahMitra, setNaskahMitra] = useState(null)
  const [daftarProgram, setDaftarProgram] = useState(null)

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
                    <th
                      style={{
                        padding: '12px 14px',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--em-800)',
                      }}
                    >
                      Mitra
                    </th>
                    <th
                      style={{
                        padding: '12px 14px',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--em-800)',
                      }}
                    >
                      Bidang
                    </th>
                    <th
                      style={{
                        padding: '12px 14px',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--em-800)',
                      }}
                    >
                      Kegiatan
                    </th>
                    <th
                      style={{
                        padding: '12px 14px',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--em-800)',
                      }}
                    >
                      Realisasi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMitra.map((m) => (
                    <tr key={m.id} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '14px' }}>
                        <button
                          type="button"
                          onClick={() => setMitraDetail(m)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            color: 'var(--em-700)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            textAlign: 'left',
                          }}
                        >
                          {m.name}
                        </button>
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
              <button
                key={p.id}
                type="button"
                className="card"
                style={{
                  textAlign: 'left',
                  cursor: 'pointer',
                  width: '100%',
                  border: '1px solid var(--line)',
                  background: '#fff',
                }}
                onClick={() => setIntDetail(p)}
                aria-haspopup="dialog"
              >
                <Pill>{p.pill}</Pill>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="more">Selengkapnya →</span>
              </button>
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
              <Button variant="pri" asButton onClick={() => setAjukanOpen(true)}>
                Ajukan kerja sama{' '}
                <ArrowRight style={{ width: 16, height: 16 }} aria-hidden="true" />
              </Button>
              <Button variant="ghost" asButton onClick={() => setPedomanOpen(true)}>
                Pedoman kerja sama{' '}
                <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <MitraDrawer
        mitra={mitraDetail}
        onClose={() => setMitraDetail(null)}
        onAjukan={() => setAjukanOpen(true)}
        onNaskah={(m) => {
          setMitraDetail(null)
          setNaskahMitra(m)
        }}
      />
      <InternasionalDrawer
        item={intDetail}
        onClose={() => setIntDetail(null)}
        onMitraLn={() => setCakupan('ln')}
        onDaftar={(item) => {
          setIntDetail(null)
          setDaftarProgram(item)
        }}
      />
      <AjukanDrawer open={ajukanOpen} onClose={() => setAjukanOpen(false)} />
      <PedomanDrawer open={pedomanOpen} onClose={() => setPedomanOpen(false)} />
      <LockedNaskahDrawer mitra={naskahMitra} onClose={() => setNaskahMitra(null)} />
      <DaftarDrawer program={daftarProgram} onClose={() => setDaftarProgram(null)} />
    </div>
  )
}
