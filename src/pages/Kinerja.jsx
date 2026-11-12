import { useState } from 'react'
import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Pill from '../components/ui/Pill.jsx'
import Button from '../components/ui/Button.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import { Lock } from 'lucide-react'

const KIN_FLOW = [
  { title: 'Unit mengisi', desc: 'Operator bidang memperbarui realisasi kumulatif tiap triwulan, plus bukti dukung.' },
  { title: 'Belum tercapai? Wajib jelaskan', desc: 'Faktor penghambat dan tindak lanjut menjadi isian wajib.' },
  { title: 'Koordinator memverifikasi', desc: 'WR IV / Biro Perencanaan memverifikasi atau minta revisi.' },
  { title: 'Unduh kapan saja', desc: 'Rekap akhir tahun, format Kementerian, dan rekap SDGs langsung jadi Excel.' },
]

const KIN_PANELS = [
  {
    id: 'renstra',
    eyebrow: 'Capaian kinerja',
    title: 'Tabel IKU & IKT Renstra',
    note: '120 IKU dan 71 IKT beserta realisasi kumulatif tiap triwulan. Rekap akhir tahun dapat diunduh sebagai Excel.',
    empty: 'Tabel akan dimuat di portal kinerja.unizar.ac.id setelah masuk.',
  },
  {
    id: 'km',
    eyebrow: 'Laporan triwulan',
    title: 'Laporan IKU Kementerian',
    note: 'Rekap per triwulan dalam format Kementerian, lengkap dengan narasi capaian.',
    empty: 'Tabel laporan Kementerian akan dimuat setelah masuk.',
  },
  {
    id: 'sdg',
    eyebrow: 'Sustainable Development Goals',
    title: 'Capaian implementasi SDGs',
    note: 'Setiap IKU yang berkontribusi pada SDGs diberi tag tujuan SDG terkait.',
    empty: 'Tabel capaian SDGs akan dimuat setelah masuk.',
  },
  {
    id: 'risk',
    eyebrow: 'Risk register',
    title: 'Risk register & laporan manajemen risiko',
    note: 'Daftar risiko, penilaian, pemilik risiko, mitigasi, dan status pemantauan.',
    empty: 'Risk register akan dimuat setelah masuk.',
  },
]

export default function Kinerja() {
  const [signedIn] = useState(false)

  return (
    <div className="page animate-fade">
      <PageHero
        title="Portal Kinerja & Risiko"
        description="Ruang kerja internal untuk mengisi capaian IKU/IKT, menyusun laporan Kementerian dan SDGs, serta mengelola risk register. Contoh layar: pada implementasi, portal ini berjalan di kinerja.unizar.ac.id dengan SSO."
        crumbs={[
          { label: 'Beranda', to: '/beranda' },
          { label: 'Dasbor', to: '/dasbor' },
          { label: 'Portal Kinerja & Risiko' },
        ]}
        photoCaption="Foto: ruang kerja unit"
        extra={<Pill variant="gold">Internal · perlu masuk</Pill>}
      />
      <Subnav
        items={[
          { id: 'kinerja--renstra', label: 'IKU & IKT Renstra' },
          { id: 'kinerja--kementerian', label: 'IKU Kementerian' },
          { id: 'kinerja--sdgs', label: 'SDGs' },
          { id: 'kinerja--risiko', label: 'Risk Register' },
        ]}
      />

      <div className="wrap kin-gate">
        <div className="gate">
          <Lock style={{ width: 24, height: 24 }} aria-hidden="true" />
          <p>
            <b>Portal ini khusus sivitas yang berwenang.</b>
            <br />
            Masuk sebagai operator unit, koordinator, SPI, tim mutu, atau asesor. Ringkasan
            publik ada di{' '}
            <SmartLink to="/profil#angka" className="card-link">
              Profil › UNIZAR dalam Angka
            </SmartLink>
            .
          </p>
          <Button variant="dark" href="#masuk">
            Masuk
          </Button>
        </div>
      </div>

      {/* === IKU & IKT Renstra === */}
      <section className="sec" id="kinerja--renstra" data-t="IKU & IKT Renstra">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Renstra 2026–2027</span>
              <h2>Capaian IKU &amp; IKT Renstra</h2>
              <p>
                Sesuai SK Rektor No. 076B/SK/REK/UNIZAR-012/III/2026: 120 IKU dan 71 IKT beserta
                penanggung jawab dan target 2026–2027.
              </p>
            </div>
          </div>

          <ol className="kin-flow">
            {KIN_FLOW.map((f, i) => (
              <li key={i}>
                <b>{f.title}</b>
                <small>{f.desc}</small>
              </li>
            ))}
          </ol>

          <Card flat style={{ marginTop: '16px' }}>
            <span className="eyebrow">{KIN_PANELS[0].eyebrow}</span>
            <h3 style={{ fontSize: '17px' }}>{KIN_PANELS[0].title}</h3>
            <p className="muted">{KIN_PANELS[0].note}</p>
            {!signedIn && (
              <p className="note" style={{ marginTop: '8px' }}>
                {KIN_PANELS[0].empty}
              </p>
            )}
            <div className="btn-row" style={{ marginTop: '12px' }}>
              <Button variant="line" href="#masuk">
                Masuk untuk mengisi
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* === IKU Kementerian === */}
      <section className="sec" id="kinerja--kementerian" data-t="IKU Kementerian">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Kemdiktisaintek</span>
              <h2>Laporan IKU Kementerian per triwulan</h2>
            </div>
          </div>

          <Card flat>
            <span className="eyebrow">{KIN_PANELS[1].eyebrow}</span>
            <h3 style={{ fontSize: '17px' }}>{KIN_PANELS[1].title}</h3>
            <p className="muted">{KIN_PANELS[1].note}</p>
            <p className="note" style={{ marginTop: '8px' }}>
              {KIN_PANELS[1].empty}
            </p>
          </Card>
        </div>
      </section>

      {/* === SDGs === */}
      <section className="sec" id="kinerja--sdgs" data-t="SDGs">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Sustainable Development Goals</span>
              <h2>Ketercapaian implementasi SDGs</h2>
            </div>
          </div>

          <Card flat>
            <span className="eyebrow">{KIN_PANELS[2].eyebrow}</span>
            <h3 style={{ fontSize: '17px' }}>{KIN_PANELS[2].title}</h3>
            <p className="muted">{KIN_PANELS[2].note}</p>
            <p className="note" style={{ marginTop: '8px' }}>
              {KIN_PANELS[2].empty}
            </p>
          </Card>
        </div>
      </section>

      {/* === Risk Register === */}
      <section className="sec" id="kinerja--risiko" data-t="Risk Register">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Tata kelola berbasis risiko</span>
              <h2>Risk register &amp; laporan manajemen risiko</h2>
              <p>
                Mengikuti Pedoman Tata Kelola Berbasis Risiko UNIZAR (SNI ISO 31000:2018, HIRADC
                untuk risiko K3): identifikasi FR-01, mitigasi FR-02, pemantauan triwulanan,
                reviu SPI, dan laporan Lampiran 12.
              </p>
            </div>
          </div>

          <Card flat>
            <span className="eyebrow">{KIN_PANELS[3].eyebrow}</span>
            <h3 style={{ fontSize: '17px' }}>{KIN_PANELS[3].title}</h3>
            <p className="muted">{KIN_PANELS[3].note}</p>
            <p className="note" style={{ marginTop: '8px' }}>
              {KIN_PANELS[3].empty}
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}
