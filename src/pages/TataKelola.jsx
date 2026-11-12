import { useState } from 'react'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import Button from '../components/ui/Button.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { ExternalLink, Lock } from 'lucide-react'

const YEAR_REPORTS = [
  {
    year: '2025',
    eyebrowLabel: 'Tahun 2025',
    title: 'Laporan 2025',
    ringkasan: { id: 'doc:laporan-tahunan-2025-ringkasan', label: 'Laporan tahunan (ringkasan) →' },
    ikhtisar: { id: 'doc:ikhtisar-laporan-keuangan-teraudit-2025', label: 'Ikhtisar keuangan & opini auditor →' },
    lengkap: { id: 'doc:laporan-tahunan-keuangan-lengkap-2025', label: 'Dokumen lengkap' },
  },
  {
    year: '2024',
    eyebrowLabel: 'Tahun 2024',
    title: 'Laporan 2024',
    ringkasan: { id: 'doc:laporan-tahunan-2024-ringkasan', label: 'Laporan tahunan (ringkasan) →' },
    ikhtisar: { id: 'doc:ikhtisar-laporan-keuangan-teraudit-2024', label: 'Ikhtisar keuangan & opini auditor →' },
    lengkap: { id: 'doc:laporan-tahunan-keuangan-lengkap-2024', label: 'Dokumen lengkap' },
  },
  {
    year: '2023',
    eyebrowLabel: 'Tahun 2023',
    title: 'Laporan 2023',
    ringkasan: { id: 'doc:laporan-tahunan-2023-ringkasan', label: 'Laporan tahunan (ringkasan) →' },
    ikhtisar: { id: 'doc:ikhtisar-laporan-keuangan-teraudit-2023', label: 'Ikhtisar keuangan & opini auditor →' },
    lengkap: { id: 'doc:laporan-tahunan-keuangan-lengkap-2023', label: 'Dokumen lengkap' },
  },
]

const PPID_TABS = [
  {
    key: 'berkala',
    label: 'Berkala',
    docs: [
      { id: 'doc:profil-struktur-organisasi-dan-pimpinan', title: 'Profil, struktur organisasi, dan pimpinan', small: 'Diperbarui setiap 6 bulan', akses: 'Lihat dokumen →' },
      { id: 'doc:laporan-tahunan-dan-ikhtisar-keuangan', title: 'Laporan tahunan dan ikhtisar keuangan', small: 'Tiap tahun', akses: 'Lihat ringkasan →' },
      { id: 'doc:laporan-layanan-informasi-publik', title: 'Laporan layanan informasi publik', small: 'Tiap tahun', akses: 'Lihat dokumen →' },
    ],
  },
  {
    key: 'serta-merta',
    label: 'Serta-merta',
    docs: [
      { id: 'doc:peringatan-dini-bencana-prosedur-evakuasi', title: 'Peringatan dini bencana & prosedur evakuasi', small: 'Diumumkan tanpa penundaan', akses: 'Lihat dokumen →' },
      { id: 'doc:gangguan-layanan-sistem-penting', title: 'Gangguan layanan sistem penting', small: 'Status sistem', akses: 'Lihat dokumen →' },
    ],
  },
  {
    key: 'setiap-saat',
    label: 'Setiap saat',
    docs: [
      { id: 'doc:statuta-peraturan-dan-keputusan-pimpinan', title: 'Statuta, peraturan, dan keputusan pimpinan', small: 'Pusdatin', akses: 'Lihat dokumen →' },
      { id: 'doc:daftar-kerja-sama', title: 'Daftar kerja sama', small: 'Kerjasama', akses: 'Lihat dokumen →' },
      { id: 'doc:kebijakan-penerimaan-dan-biaya-pendidikan', title: 'Kebijakan penerimaan dan biaya pendidikan', small: 'Pendidikan', akses: 'Lihat dokumen →' },
    ],
  },
  {
    key: 'dikecualikan',
    label: 'Dikecualikan',
    docs: [
      { id: 'doc:data-pribadi-sivitas', title: 'Data pribadi sivitas', small: 'Dilindungi UU Pelindungan Data Pribadi', akses: 'Masuk untuk membuka', locked: true },
      { id: 'doc:laporan-audit-rinci', title: 'Laporan audit rinci', small: 'Untuk pimpinan dan asesor', akses: 'Masuk untuk membuka', locked: true },
      { id: 'doc:identitas-pelapor', title: 'Identitas pelapor', small: 'Dirahasiakan', akses: 'Masuk untuk membuka', locked: true },
    ],
  },
]

export default function TataKelola() {
  const [tab, setTab] = useState(0)

  return (
    <div className="page animate-fade">
      <PageHero
        title="Tata Kelola"
        description="Kami melaporkan apa yang kami kerjakan, menjaga integritas, dan membuka informasi publik."
        crumbs={[{ label: 'Beranda', to: '/beranda' }, { label: 'Tata Kelola' }]}
        photoCaption="Foto: rapat senat universitas"
      />
      <Subnav
        items={[
          { id: 'tata-kelola--kebijakan', label: 'Kebijakan & Laporan' },
          { id: 'tata-kelola--integritas', label: 'Integritas & Kampus Aman' },
          { id: 'tata-kelola--pengawasan', label: 'Pengawasan Internal' },
          { id: 'tata-kelola--ppid', label: 'Transparansi & PPID' },
        ]}
      />

      {/* === Kebijakan & Laporan === */}
      <section className="sec" id="tata-kelola--kebijakan" data-t="Kebijakan & Laporan">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Akuntabilitas</span>
              <h2>Kebijakan &amp; laporan</h2>
              <p>
                Laporan tahunan dan keuangan teraudit tiga tahun terakhir, beserta hasil survei
                kepuasan.
              </p>
            </div>
          </div>

          <div className="grid g3">
            {YEAR_REPORTS.map((y) => (
              <Card key={y.year}>
                <span className="eyebrow">{y.eyebrowLabel}</span>
                <h3>{y.title}</h3>
                <SmartLink to="#">{y.ringkasan.label}</SmartLink>
                <SmartLink to="#">{y.ikhtisar.label}</SmartLink>
                <SmartLink to="#" className="lock">
                  <Lock style={{ width: 14, height: 14 }} aria-hidden="true" /> {y.lengkap.label}
                </SmartLink>
              </Card>
            ))}
          </div>

          <div className="split" style={{ marginTop: '22px' }}>
            <Card>
              <span className="eyebrow">Survei kepuasan tata kelola</span>
              <h3>Yang kami ubah dari masukan Anda</h3>
              <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--muted)' }}>
                <li>[Contoh: layanan surat akademik kini selesai dalam 1 hari kerja]</li>
                <li>[Contoh: ikhtisar keuangan terbit setiap triwulan]</li>
                <li>[Contoh: forum dengar pendapat mahasiswa tiap semester]</li>
              </ul>
              <SmartLink to="#" className="more">
                Isi survei kepuasan →
              </SmartLink>
            </Card>
            <Card flat>
              <span className="eyebrow">Kebijakan pengelolaan</span>
              <p>
                Pedoman pengelolaan di sebelas bidang, pola pengelolaan keuangan, dan renstra
                keuangan tersedia di Pusdatin.
              </p>
              <SmartLink to="/pusdatin" className="more">
                Buka Pusdatin →
              </SmartLink>
            </Card>
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

      {/* === Integritas & Kampus Aman === */}
      <section className="sec" id="tata-kelola--integritas" data-t="Integritas & Kampus Aman">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Integritas</span>
              <h2>Kampus yang aman dan berintegritas</h2>
            </div>
          </div>

          <div className="grid g2">
            <Card to="#">
              <Pill>Pedoman</Pill>
              <h3>Kode etik</h3>
              <p>
                Berlaku untuk dosen, tenaga kependidikan, dan mahasiswa, beserta mekanisme
                penegakannya.
              </p>
              <span className="more">Selengkapnya →</span>
            </Card>
            <Card to="#">
              <Pill>Satgas</Pill>
              <h3>Satgas PPKPT</h3>
              <p>
                Pencegahan dan penanganan kekerasan di lingkungan kampus, termasuk perundungan dan
                intoleransi.
              </p>
              <span className="more">Selengkapnya →</span>
            </Card>
          </div>

          <div className="band" style={{ background: 'var(--red-ink)', marginTop: '20px' }}>
            <div>
              <span className="eyebrow" style={{ color: '#FFD2D4' }}>
                Kanal rahasia
              </span>
              <h2>Laporkan pelanggaran atau kekerasan</h2>
              <p>
                Identitas pelapor dirahasiakan. Setiap laporan mendapat nomor tiket untuk
                dipantau.
              </p>
            </div>
            <div className="btn-row">
              <Button variant="pri" href="#">
                Lapor ke Satgas PPKPT
              </Button>
              <Button variant="ghost" href="#">
                Whistleblowing System
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* === Pengawasan Internal === */}
      <section className="sec" id="tata-kelola--pengawasan" data-t="Pengawasan Internal">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Pengawasan</span>
              <h2>Pengawasan internal &amp; manajemen risiko</h2>
            </div>
          </div>

          <div className="grid g3">
            <Card to="#">
              <Pill>SPI</Pill>
              <h3>Satuan Pengawasan Internal</h3>
              <p>Audit internal non-akademik, konsultasi, dan pendampingan unit kerja.</p>
              <span className="more">Selengkapnya →</span>
            </Card>
            <Card to="#">
              <Pill>Pedoman</Pill>
              <h3>Manajemen risiko</h3>
              <p>
                Diterapkan di seluruh unit kerja sesuai SNI ISO 31000:2018, dipantau tiap
                triwulan, dan direviu SPI setiap tahun.
              </p>
              <span className="more">Selengkapnya →</span>
            </Card>
            <Card to="#">
              <Pill>WBK/WBBM</Pill>
              <h3>Zona integritas</h3>
              <p>
                Program menuju Wilayah Bebas dari Korupsi (WBK) dan Wilayah Birokrasi Bersih dan
                Melayani (WBBM), beserta capaiannya.
              </p>
              <span className="more">Selengkapnya →</span>
            </Card>
          </div>
        </div>
      </section>

      {/* === Transparansi & PPID === */}
      <section className="sec" id="tata-kelola--ppid" data-t="Transparansi & PPID">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Informasi publik</span>
              <h2>Transparansi &amp; PPID</h2>
              <p>
                Kami terbuka secara bawaan dan hanya mengecualikan informasi yang dilindungi
                peraturan.
              </p>
            </div>
          </div>

          <div className="split">
            <div data-tabs>
              <div className="tabs-l" role="tablist" aria-label="Kategori informasi">
                {PPID_TABS.map((t, i) => (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    aria-selected={i === tab}
                    onClick={() => setTab(i)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {PPID_TABS.map((t, i) => (
                <div
                  key={t.key}
                  role="tabpanel"
                  hidden={i !== tab}
                  style={{ marginTop: '12px' }}
                >
                  <ul className="clean">
                    {t.docs.map((d) => (
                      <li key={d.id} className="doc">
                        <div>
                          <b>{d.title}</b>
                          <small>{d.small}</small>
                        </div>
                        {d.locked ? (
                          <SmartLink to="#" className="lock">
                            <Lock style={{ width: 14, height: 14 }} aria-hidden="true" /> {d.akses}
                          </SmartLink>
                        ) : (
                          <SmartLink to="#">{d.akses}</SmartLink>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Card>
              <h3>Ajukan permohonan informasi</h3>
              <ol
                className="clean steps"
                style={{ gridTemplateColumns: 'minmax(0,1fr)', gap: '8px' }}
              >
                <li style={{ padding: '12px 14px' }}>
                  <b>Ajukan</b>
                  <p>Isi formulir daring</p>
                </li>
                <li style={{ padding: '12px 14px' }}>
                  <b>Registrasi</b>
                  <p>Nomor permohonan dikirim ke email</p>
                </li>
                <li style={{ padding: '12px 14px' }}>
                  <b>Jawaban</b>
                  <p>Paling lambat 10 hari kerja</p>
                </li>
                <li style={{ padding: '12px 14px' }}>
                  <b>Keberatan</b>
                  <p>Bila tidak puas, ajukan ke atasan PPID</p>
                </li>
              </ol>
              <div className="btn-row">
                <Button variant="dark" href="#">
                  Ajukan permohonan
                </Button>
                <Button variant="line" href="#">
                  Lacak permohonan
                </Button>
                <Button variant="line" href="#">
                  Ajukan keberatan
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
