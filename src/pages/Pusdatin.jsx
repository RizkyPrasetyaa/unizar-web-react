import { useMemo, useState } from 'react'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import Button from '../components/ui/Button.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { ExternalLink, Lock } from 'lucide-react'

const DOC_ROWS = [
  { id: 'doc:statuta-universitas-islam-al-azhar', kind: 'peraturan', title: 'Statuta Universitas Islam Al-Azhar', sub: 'Yayasan · SK [nomor] · v3.0', jenis: 'Peraturan', aksesLabel: 'Lihat →' },
  { id: 'doc:rencana-induk-pengembangan-2025-2045', kind: 'rencana', title: 'Rencana Induk Pengembangan 2025–2045', sub: 'Rektor · SK [nomor] · ringkasan publik', jenis: 'Rencana', aksesLabel: 'Ringkasan →' },
  { id: 'doc:renstra-2025-2029', kind: 'rencana', title: 'Renstra 2025–2029', sub: 'Rektor · SK [nomor] · v1.2', jenis: 'Rencana', aksesLabel: 'Lihat →' },
  { id: 'doc:struktur-organisasi-tata-kerja', kind: 'peraturan', title: 'Struktur Organisasi & Tata Kerja', sub: 'Rektor · SK [nomor] · v2.0', jenis: 'Peraturan', aksesLabel: 'Lihat →' },
  { id: 'doc:kode-etik-dosen-tendik-mahasiswa', kind: 'pedoman', title: 'Kode Etik Dosen, Tendik & Mahasiswa', sub: 'Rektor · SK [nomor]', jenis: 'Pedoman', aksesLabel: 'Lihat →' },
  { id: 'doc:pedoman-pencegahan-penanganan-kekerasan-ppkpt', kind: 'pedoman', title: 'Pedoman Pencegahan & Penanganan Kekerasan (PPKPT)', sub: 'Satgas PPKPT · SK [nomor]', jenis: 'Pedoman', aksesLabel: 'Lihat →' },
  { id: 'doc:pedoman-kurikulum-obe', kind: 'pedoman', title: 'Pedoman Kurikulum OBE', sub: 'WR I · SK [nomor] · v2.1', jenis: 'Pedoman', aksesLabel: 'Lihat →' },
  { id: 'doc:kebijakan-manual-standar-spmi', kind: 'mutu', title: 'Kebijakan, Manual & Standar SPMI', sub: 'BPM · SK [nomor] · v4.0', jenis: 'Mutu', locked: true, aksesLabel: 'Masuk' },
  { id: 'doc:ikhtisar-kebijakan-standar-spmi', kind: 'mutu', title: 'Ikhtisar Kebijakan & Standar SPMI', sub: 'BPM · ringkasan 4 halaman', jenis: 'Mutu', aksesLabel: 'Lihat →' },
  { id: 'doc:laporan-audit-mutu-internal-2025', kind: 'mutu', title: 'Laporan Audit Mutu Internal 2025', sub: 'BPM · siklus 2025', jenis: 'Mutu', locked: true, aksesLabel: 'Masuk' },
  { id: 'doc:laporan-tahunan-2025', kind: 'laporan', title: 'Laporan Tahunan 2025', sub: 'Rektor · ringkasan publik', jenis: 'Laporan', aksesLabel: 'Ringkasan →' },
  { id: 'doc:laporan-keuangan-teraudit-2025', kind: 'laporan', title: 'Laporan Keuangan Teraudit 2025', sub: 'KAP [nama] · opini dan ikhtisar', jenis: 'Laporan', aksesLabel: 'Ringkasan →' },
  { id: 'doc:renstra-penelitian-pkm-2025-2029', kind: 'rencana', title: 'Renstra Penelitian & PkM 2025–2029', sub: 'LPPM · SK [nomor]', jenis: 'Rencana', aksesLabel: 'Lihat →' },
  { id: 'doc:data-pribadi-pegawai', kind: 'laporan', title: 'Data Pribadi Pegawai', sub: 'Biro SDM', jenis: 'Laporan', locked: true, aksesLabel: 'Masuk' },
]

const DOC_CHIPS = [
  { v: 'all', label: 'Semua' },
  { v: 'peraturan', label: 'Peraturan' },
  { v: 'rencana', label: 'Rencana' },
  { v: 'pedoman', label: 'Pedoman' },
  { v: 'mutu', label: 'Mutu' },
  { v: 'laporan', label: 'Laporan' },
]

const DATA_CARDS = [
  { id: 'data-angka', pill: 'Ringkasan', title: 'UNIZAR dalam Angka', desc: 'Ringkasan fakta universitas yang selalu mutakhir.', to: '/profil#angka' },
  { id: 'data-mhs', pill: 'Tabel', title: 'Mahasiswa per prodi', desc: 'Jumlah mahasiswa aktif, baru, dan lulusan per tahun akademik.', to: '#' },
  { id: 'data-dosen', pill: 'Tabel', title: 'Dosen & tenaga kependidikan', desc: 'Jumlah, kualifikasi, dan jabatan akademik per prodi.', to: '#' },
  { id: 'data-akreditasi', pill: 'Akreditasi', title: 'Akreditasi', desc: 'Status akreditasi terkini dan arsip sertifikat.', to: '#' },
  { id: 'data-riset', pill: 'Tabel', title: 'Penelitian & pengabdian', desc: 'Judul, pendanaan, dan luaran per tahun.', to: '#' },
  { id: 'data-permintaan', pill: 'Layanan', title: 'Permintaan data', desc: 'Ajukan permintaan data untuk riset atau keperluan resmi.', to: '#' },
]

export default function Pusdatin() {
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return DOC_ROWS.filter((d) => {
      const matchKind = kind === 'all' || d.kind === kind
      const matchText =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.sub.toLowerCase().includes(q) ||
        d.jenis.toLowerCase().includes(q)
      return matchKind && matchText
    })
  }, [query, kind])

  return (
    <div className="page animate-fade">
      <PageHero
        title="Pusat Data dan Informasi"
        description="Dokumen resmi, data, dan statistik universitas di satu tempat. Dokumen bertanda gembok dapat dibuka oleh sivitas dan asesor setelah masuk."
        crumbs={[
          { label: 'Beranda', to: '/beranda' },
          { label: 'Direktori', to: '/direktori' },
          { label: 'Pusdatin' },
        ]}
        photoCaption="Foto: arsip dokumen"
      />
      <Subnav
        items={[
          { id: 'pusdatin--daftar', label: 'Daftar dokumen' },
          { id: 'pusdatin--data', label: 'Data & statistik' },
          { id: 'pusdatin--jdih', label: 'JDIH' },
        ]}
      />

      {/* === Daftar dokumen === */}
      <section className="sec" id="pusdatin--daftar" data-t="Daftar dokumen">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Cari dokumen</span>
              <h2>Temukan dokumen resmi</h2>
            </div>
          </div>

          <div data-filter>
            <div className="toolbar">
              <div className="field">
                <label htmlFor="pd-q">Judul, nomor SK, atau unit</label>
                <input
                  id="pd-q"
                  placeholder="mis. Statuta, SPMI, keuangan"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="chips" role="group" aria-label="Jenis dokumen">
                {DOC_CHIPS.map((c) => (
                  <button
                    key={c.v}
                    type="button"
                    aria-pressed={kind === c.v}
                    onClick={() => setKind(c.v)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="muted" style={{ marginBottom: '10px' }}>
              Menampilkan <b>{filtered.length}</b> dokumen
            </p>

            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Dokumen</th>
                    <th>Jenis</th>
                    <th>Akses</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d.id}>
                      <td>
                        <SmartLink to="#" className="card-link">
                          <b>{d.title}</b>
                        </SmartLink>
                        <span className="sub">{d.sub}</span>
                      </td>
                      <td>{d.jenis}</td>
                      <td>
                        {d.locked ? (
                          <SmartLink to="#" className="lock">
                            <Lock style={{ width: 14, height: 14 }} aria-hidden="true" /> {d.aksesLabel}
                          </SmartLink>
                        ) : (
                          <SmartLink to="#">{d.aksesLabel}</SmartLink>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={3} className="muted" style={{ padding: '14px' }}>
                        Tidak ada dokumen yang cocok dengan pencarian Anda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* === Data & statistik === */}
      <section className="sec" id="pusdatin--data" data-t="Data & statistik">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Data</span>
              <h2>Data &amp; statistik universitas</h2>
              <p>
                Data utama yang sering diminta, diperbarui dari PD Dikti dan sistem internal.
                Setiap tabel dapat diunduh.
              </p>
            </div>
          </div>
          <div className="grid g3">
            {DATA_CARDS.map((d) => (
              <Card key={d.id} to={d.to}>
                <Pill>{d.pill}</Pill>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
                <span className="more">Selengkapnya →</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* === JDIH === */}
      <section className="sec" id="pusdatin--jdih" data-t="JDIH">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Produk hukum</span>
              <h2>Jaringan Dokumentasi dan Informasi Hukum</h2>
            </div>
          </div>
          <div className="slim jdih" style={{ marginTop: '22px' }}>
            <div>
              <span className="eyebrow">JDIH UNIZAR</span>
              <p style={{ marginTop: '4px' }}>
                <b style={{ color: 'var(--ink)' }}>
                  Jaringan Dokumentasi dan Informasi Hukum.
                </b>{' '}
                Statuta, peraturan rektor, keputusan, dan produk hukum lain dikelola di website
                JDIH.
              </p>
            </div>
            <Button variant="dark" href="#">
              Buka JDIH UNIZAR{' '}
              <ExternalLink style={{ width: 16, height: 16 }} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
