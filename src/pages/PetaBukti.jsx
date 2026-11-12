import { useState } from 'react'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Button from '../components/ui/Button.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { ChevronDown } from 'lucide-react'

const STATUS_LABEL = {
  ok: 'Lengkap',
  up: 'Perlu pembaruan',
  no: 'Belum tersedia',
}

const STATUS_STYLE = {
  ok: { background: '#E3F1EA', color: '#0A6B4F' },
  up: { background: '#FFF4CF', color: '#6B4E00' },
  no: { background: '#FBE7E8', color: '#8E1B20' },
}

const KRITERIA = [
  {
    no: 1,
    range: 'indikator 1–4',
    title: 'Budaya Mutu',
    open: true,
    indicators: [
      {
        no: 1,
        text: 'SPMI dikembangkan dengan tata kelola yang baik dan akuntabel',
        syaratPerlu: true,
        bukti: [{ to: '/penjaminan-mutu#dokumen', label: 'Dokumen SPMI →' }],
        status: 'ok',
      },
      {
        no: 2,
        text: 'Implementasi SPMI melalui siklus PPEPP',
        syaratPerlu: true,
        bukti: [
          { to: '/penjaminan-mutu#tentang', label: 'Kalender mutu →' },
          { to: '/penjaminan-mutu#dokumen', label: 'Laporan AMI, RTM & RTL →' },
        ],
        status: 'up',
      },
      {
        no: 3,
        text: 'Laporan implementasi SPMI dan kinerja berkala',
        bukti: [
          { to: '/profil#angka', label: 'UNIZAR dalam Angka →' },
          { to: '/kinerja#renstra', label: 'Portal kinerja (akun asesor) →' },
          { to: '/tata-kelola#kebijakan', label: 'Laporan tahunan →' },
        ],
        status: 'ok',
      },
      {
        no: 4,
        text: 'Pengakuan mutu: akreditasi program studi',
        syaratPerlu: true,
        bukti: [{ to: '/penjaminan-mutu#akreditasi', label: 'Tabel akreditasi →' }],
        status: 'ok',
      },
    ],
  },
  {
    no: 2,
    range: 'indikator 5–15',
    title: 'Relevansi Pendidikan',
    indicators: [
      {
        no: 5,
        text: 'Kebijakan kurikulum OBE',
        bukti: [{ to: '/pendidikan#kurikulum', label: 'Kurikulum & pembelajaran →' }],
        status: 'ok',
      },
      {
        no: 6,
        text: 'Renstra SDM dan ketersediaan tenaga kependidikan',
        bukti: [
          { to: '/pusdatin', label: 'Pusdatin →' },
          { to: '/direktori#unit', label: 'Direktori unit →' },
        ],
        status: 'ok',
      },
      {
        no: 7,
        text: 'Kecukupan dosen per program studi',
        syaratPerlu: true,
        bukti: [{ to: '/direktori#dosen', label: 'Dosen & pakar →' }],
        status: 'ok',
      },
      {
        no: 8,
        text: 'Akses sarana-prasarana dan K3',
        bukti: [{ to: '/layanan#katalog', label: 'Layanan →' }],
        status: 'ok',
      },
      {
        no: 9,
        text: 'Sarana TIK untuk pembelajaran',
        bukti: [{ to: '/layanan#status', label: 'Status sistem →' }],
        status: 'ok',
      },
      {
        no: 10,
        text: 'Perbaikan pembelajaran dan MBKM',
        bukti: [{ to: '/pendidikan#kurikulum', label: 'Kurikulum & pembelajaran →' }],
        status: 'up',
      },
      {
        no: 11,
        text: 'Jabatan akademik dosen tetap',
        syaratPerlu: true,
        bukti: [{ to: '/direktori#dosen', label: 'Dosen & pakar →' }],
        status: 'ok',
      },
      {
        no: 12,
        text: 'Analisis luaran pendidikan',
        bukti: [
          { to: '/profil#angka', label: 'UNIZAR dalam Angka →' },
          { to: '/mahasiswa-alumni#alumni', label: 'Tracer study →' },
        ],
        status: 'ok',
      },
      {
        no: 13,
        text: 'Internalisasi antikorupsi dalam pembelajaran',
        bukti: [{ to: '/pendidikan#kurikulum', label: 'Kurikulum & pembelajaran →' }],
        status: 'no',
      },
      {
        no: 14,
        text: 'Pengakuan kompetensi lulusan',
        bukti: [{ to: '/mahasiswa-alumni#alumni', label: 'Alumni & karier →' }],
        status: 'ok',
      },
      {
        no: 15,
        text: 'Prestasi mahasiswa dan keterserapan lulusan',
        bukti: [{ to: '/mahasiswa-alumni#prestasi', label: 'Prestasi →' }],
        status: 'ok',
      },
    ],
  },
  {
    no: 3,
    range: 'indikator 16–19',
    title: 'Relevansi Penelitian',
    indicators: [
      {
        no: 16,
        text: 'Peta jalan dan pedoman penelitian',
        bukti: [{ to: '/penelitian#riset', label: 'Riset UNIZAR →' }],
        status: 'ok',
      },
      {
        no: 17,
        text: 'Penyelenggaraan proses penelitian',
        bukti: [{ to: '/penelitian#tata-kelola', label: 'Tata kelola riset →' }],
        status: 'ok',
      },
      {
        no: 18,
        text: 'Hasil penelitian yang bermutu dan terbuka',
        bukti: [{ to: '/penelitian#publikasi', label: 'Publikasi & inovasi →' }],
        status: 'ok',
      },
      {
        no: 19,
        text: 'Pengakuan dan pemanfaatan hasil penelitian',
        bukti: [{ to: '/penelitian#publikasi', label: 'Publikasi & inovasi →' }],
        status: 'ok',
      },
    ],
  },
  {
    no: 4,
    range: 'indikator 20–23',
    title: 'Relevansi Pengabdian kepada Masyarakat',
    indicators: [
      {
        no: 20,
        text: 'Peta jalan dan sumber daya PkM',
        bukti: [{ to: '/pengabdian#program', label: 'Program & desa binaan →' }],
        status: 'ok',
      },
      {
        no: 21,
        text: 'Penyelenggaraan proses PkM',
        bukti: [{ to: '/pengabdian#program', label: 'Program & desa binaan →' }],
        status: 'up',
      },
      {
        no: 22,
        text: 'Hasil PkM yang bermutu',
        bukti: [{ to: '/pengabdian#dampak', label: 'Dampak & luaran →' }],
        status: 'ok',
      },
      {
        no: 23,
        text: 'Pengakuan kepakaran',
        bukti: [{ to: '/pengabdian#kepakaran', label: 'Kepakaran & kolaborasi →' }],
        status: 'ok',
      },
    ],
  },
  {
    no: 5,
    range: 'indikator 24–35',
    title: 'Akuntabilitas',
    indicators: [
      {
        no: 24,
        text: 'Renstra, statuta, dan struktur organisasi',
        bukti: [
          { to: '/pusdatin', label: 'Dokumen di Pusdatin →' },
          { to: '/profil#pimpinan', label: 'Pimpinan & organisasi →' },
        ],
        status: 'ok',
      },
      {
        no: 25,
        text: 'Tata pamong: akuntabilitas, transparansi, mitigasi risiko',
        bukti: [
          { to: '/tata-kelola#pengawasan', label: 'Pengawasan internal →' },
          { to: '/kinerja#risiko', label: 'Risk register (akun asesor) →' },
        ],
        status: 'ok',
      },
      {
        no: 26,
        text: 'Sistem informasi berbasis TIK',
        bukti: [{ to: '/layanan#status', label: 'Status sistem →' }],
        status: 'ok',
      },
      {
        no: 27,
        text: 'Renstra keuangan dan bantuan biaya mahasiswa',
        bukti: [
          { to: '/tata-kelola#kebijakan', label: 'Kebijakan & laporan →' },
          { to: '/pendidikan#penerimaan', label: 'Beasiswa →' },
        ],
        status: 'ok',
      },
      {
        no: 28,
        text: 'Praktik tata kelola, kode etik, dan kampus aman',
        bukti: [{ to: '/tata-kelola#integritas', label: 'Integritas & kampus aman →' }],
        status: 'ok',
      },
      {
        no: 29,
        text: 'Sistem pengelolaan dan pedoman bidang',
        bukti: [{ to: '/tata-kelola#kebijakan', label: 'Kebijakan & laporan →' }],
        status: 'ok',
      },
      {
        no: 30,
        text: 'Suasana akademik dan kebebasan mimbar',
        bukti: [{ to: '/pendidikan#suasana', label: 'Suasana akademik →' }],
        status: 'ok',
      },
      {
        no: 31,
        text: 'Penerimaan mahasiswa yang adil dan inklusif',
        bukti: [{ to: '/pendidikan#penerimaan', label: 'Penerimaan & beasiswa →' }],
        status: 'up',
      },
      {
        no: 32,
        text: 'Layanan mahasiswa',
        bukti: [{ to: '/mahasiswa-alumni#layanan', label: 'Layanan mahasiswa →' }],
        status: 'ok',
      },
      {
        no: 33,
        text: 'Pola pengelolaan keuangan',
        bukti: [{ to: '/tata-kelola#kebijakan', label: 'Kebijakan & laporan →' }],
        status: 'ok',
      },
      {
        no: 34,
        text: 'Kepuasan pemangku kepentingan terhadap tata pamong',
        bukti: [{ to: '/tata-kelola#kebijakan', label: 'Survei & tindak lanjut →' }],
        status: 'up',
      },
      {
        no: 35,
        text: 'Audit eksternal keuangan',
        bukti: [{ to: '/tata-kelola#kebijakan', label: 'Laporan keuangan teraudit →' }],
        status: 'ok',
      },
    ],
  },
  {
    no: 6,
    range: 'indikator 36–39',
    title: 'Diferensiasi Misi',
    indicators: [
      {
        no: 36,
        text: 'Diferensiasi misi dan peta jalan',
        bukti: [{ to: '/profil#tentang', label: 'Tentang UNIZAR →' }],
        status: 'ok',
      },
      {
        no: 37,
        text: 'Program tridharma sesuai renstra',
        bukti: [
          { to: '/pusdatin', label: 'Dokumen Renstra (Pusdatin) →' },
          { to: '/kinerja#renstra', label: 'Portal kinerja (akun asesor) →' },
        ],
        status: 'ok',
      },
      {
        no: 38,
        text: 'Penilaian capaian terhadap diferensiasi misi',
        bukti: [
          { to: '/profil#angka', label: 'UNIZAR dalam Angka →' },
          { to: '/profil#sdgs', label: 'UNIZAR untuk SDGs →' },
          { to: '/kinerja#renstra', label: 'Portal kinerja (akun asesor) →' },
        ],
        status: 'up',
      },
      {
        no: 39,
        text: 'Pengakuan eksternal atas keunggulan',
        bukti: [
          { to: '/beranda', label: 'Tiga fokus keunggulan →' },
          { to: '/mahasiswa-alumni#prestasi', label: 'Prestasi →' },
        ],
        status: 'ok',
      },
    ],
  },
]

export default function PetaBukti() {
  const [view, setView] = useState('public')
  const isInternal = view === 'internal'

  return (
    <div className="page animate-fade">
      <PageHero
        title="Peta Bukti BAN-PT"
        description="Ke-39 indikator Instrumen Akreditasi Perguruan Tinggi (IAPT 4.1) beserta tautan langsung ke buktinya di website ini."
        crumbs={[
          { label: 'Beranda', to: '/beranda' },
          { label: 'Penjaminan Mutu', to: '/penjaminan-mutu' },
          { label: 'Peta Bukti' },
        ]}
        photoCaption="Foto: tim mutu menyusun dokumen"
      />
      <Subnav items={[{ id: 'peta-bukti--peta', label: 'Peta 39 indikator' }]} />

      {/* === Peta 39 indikator === */}
      <section className="sec" id="peta-bukti--peta" data-t="Peta 39 indikator">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">IAPT 4.1 · PerBAN-PT No. 35 Tahun 2025</span>
              <h2>Enam kriteria, tiga puluh sembilan indikator</h2>
              <p>
                Dokumen bertanda gembok terbuka setelah asesor masuk dengan akun berbatas waktu.
              </p>
            </div>
          </div>

          {/* Simulasi tampilan + view toggle */}
          <div
            className="slim"
            style={{
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              background: '#F1F7F3',
              borderRadius: '14px',
              padding: '14px 20px',
            }}
          >
            <p style={{ margin: 0, fontSize: '14.5px' }}>
              <b style={{ color: '#13231c' }}>Simulasi tampilan:</b> kolom status kelengkapan
              hanya terlihat oleh tim internal yang sudah masuk.
            </p>
            <div
              className="chips"
              role="group"
              aria-label="Tampilan"
              style={{ display: 'inline-flex', gap: '6px' }}
            >
              <button
                type="button"
                aria-pressed={view === 'public'}
                onClick={() => setView('public')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: 700,
                  border: '1px solid #DCE6E0',
                  background: view === 'public' ? '#064E3B' : '#fff',
                  color: view === 'public' ? '#fff' : '#4A5E55',
                  cursor: 'pointer',
                }}
              >
                Publik &amp; asesor
              </button>
              <button
                type="button"
                aria-pressed={isInternal}
                onClick={() => setView('internal')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: 700,
                  border: '1px solid #DCE6E0',
                  background: isInternal ? '#064E3B' : '#fff',
                  color: isInternal ? '#fff' : '#4A5E55',
                  cursor: 'pointer',
                }}
              >
                Tim internal
              </button>
            </div>
          </div>

          {/* Daftar kriteria */}
          <div style={{ display: 'grid', gap: '12px' }}>
            {KRITERIA.map((k) => (
              <details
                key={k.no}
                className="crit"
                open={k.open}
                style={{
                  border: '1px solid #DCE6E0',
                  borderRadius: '14px',
                  background: '#fff',
                  overflow: 'hidden',
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    listStyle: 'none',
                    padding: '18px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                  }}
                >
                  <span>
                    <small style={{ color: '#4A5E55', fontSize: '13px' }}>
                      Kriteria {k.no} · {k.range}
                    </small>
                    <br />
                    <b style={{ fontSize: '20px', color: '#13231c' }}>{k.title}</b>
                  </span>
                  <ChevronDown
                    style={{ width: 20, height: 20, color: '#4A5E55' }}
                    aria-hidden="true"
                  />
                </summary>

                <div
                  className="tbl-wrap"
                  style={{
                    border: '0',
                    borderTop: '1px solid #DCE6E0',
                    borderRadius: '0',
                    overflowX: 'auto',
                  }}
                >
                  <table
                    style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}
                  >
                    <thead>
                      <tr style={{ background: '#F1F7F3', textAlign: 'left' }}>
                        <th
                          style={{
                            padding: '10px 12px',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            color: '#4A5E55',
                            width: '56px',
                          }}
                        >
                          No
                        </th>
                        <th
                          style={{
                            padding: '10px 12px',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            color: '#4A5E55',
                          }}
                        >
                          Indikator (ringkas)
                        </th>
                        <th
                          style={{
                            padding: '10px 12px',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            color: '#4A5E55',
                          }}
                        >
                          Bukti di website
                        </th>
                        {isInternal && (
                          <th
                            className="st"
                            style={{
                              padding: '10px 12px',
                              fontSize: '12px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              color: '#4A5E55',
                            }}
                          >
                            Status internal
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {k.indicators.map((ind) => (
                        <tr
                          key={ind.no}
                          style={{ borderBottom: '1px solid #E8EFEB', color: '#13231c' }}
                        >
                          <td style={{ padding: '12px 12px', width: '56px' }}>
                            <b
                              style={{
                                fontSize: '17px',
                                color: '#064E3B',
                              }}
                            >
                              {ind.no}
                            </b>
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            {ind.text}{' '}
                            {ind.syaratPerlu && (
                              <span
                                style={{
                                  display: 'inline-flex',
                                  fontSize: '10.5px',
                                  fontWeight: 700,
                                  padding: '2px 8px',
                                  borderRadius: '999px',
                                  background: '#13231c',
                                  color: '#fff',
                                  marginLeft: '4px',
                                  verticalAlign: 'middle',
                                }}
                              >
                                Syarat perlu
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            <div style={{ display: 'grid', gap: '2px' }}>
                              {ind.bukti.map((b, i) => (
                                <SmartLink
                                  key={i}
                                  to={b.to}
                                  className="text-em-700 font-semibold text-[14.5px]"
                                >
                                  {b.label}
                                </SmartLink>
                              ))}
                            </div>
                          </td>
                          {isInternal && (
                            <td
                              className="st"
                              style={{ padding: '12px 14px', verticalAlign: 'middle' }}
                            >
                              <span
                                style={{
                                  display: 'inline-flex',
                                  padding: '4px 10px',
                                  borderRadius: '999px',
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  ...STATUS_STYLE[ind.status],
                                }}
                              >
                                {STATUS_LABEL[ind.status]}
                              </span>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            ))}
          </div>

          <div className="btn-row" style={{ marginTop: '18px' }}>
            <Button variant="dark" href="#">
              Masuk sebagai asesor
            </Button>
            <Button variant="line" href="/pusdatin">
              Pusdatin
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
