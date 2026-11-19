import PageHero from '../components/layout/PageHero.jsx'
import Subnav from '../components/layout/Subnav.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import SmartLink from '../components/ui/SmartLink.jsx'
import PhotoSlot from '../components/ui/PhotoSlot.jsx'
import { FACULTIES, PRODI_LINKS } from '../data/content.js'
import { ExternalLink } from 'lucide-react'

// Map abbr to the mockup section id suffix
const FACULTY_IDS = {
  FK: 'fk',
  FT: 'ft',
  FH: 'fh',
  FEB: 'feb',
  FP: 'fp',
  FMIPA: 'fmipa',
  FAI: 'fai',
}

export default function Fakultas() {
  return (
    <div className="page animate-fade">
      <PageHero
        title="Fakultas & Program Studi"
        description="Tujuh fakultas dengan tiga belas program studi sarjana dan profesi."
        crumbs={[{ label: 'Beranda', to: '/beranda' }, { label: 'Fakultas' }]}
        photoCaption="Foto: gedung kuliah"
      />
      <Subnav
        items={[
          { id: 'fakultas--daftar', label: 'Semua fakultas' },
        ]}
      />

      <section className="sec" id="fakultas--daftar" data-t="Semua fakultas">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Pilih fakultas</span>
              <h2>Temukan program studi Anda</h2>
              <p>Status akreditasi setiap prodi ditarik dari data resmi dan selalu menampilkan masa berlakunya.</p>
            </div>
          </div>
          <div className="grid g3">
            {FACULTIES.map((f) => {
              const full = f.full || `Fakultas ${f.name}`
              const id = `fakultas--${FACULTY_IDS[f.abbr] || f.abbr.toLowerCase()}`
              const lihatTo = f.to || '#'
              return (
                <Card key={f.abbr} id={id} style={{ padding: 0, overflow: 'hidden' }}>
                  <PhotoSlot
                    variant={f.color}
                    caption={`Foto: kegiatan ${full}`}
                    aria-label={`Tempat foto: kegiatan ${full}`}
                    style={{ height: '150px', borderRadius: 0 }}
                  />
                  <div style={{ padding: '18px 20px 22px', display: 'grid', gap: '12px' }}>
                    <span className="eyebrow">{f.abbr}</span>
                    <h3>{full}</h3>
                    <ul className="clean" style={{ display: 'grid', gap: '8px' }}>
                      {f.prodi.map((p) => {
                        const prodiTo = PRODI_LINKS[p] || '#'
                        return (
                          <li
                            key={p}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '14.5px',
                            }}
                          >
                            <SmartLink to={prodiTo}>{p}</SmartLink>
                            <SmartLink
                              to="#"
                              className="weblink"
                              title="Alamat website menyusul"
                            >
                              Web prodi <ExternalLink style={{ width: 14, height: 14 }} aria-hidden="true" />
                            </SmartLink>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="btn-row" style={{ gap: '8px', marginTop: '4px' }}>
                      <Button
                        variant="dark"
                        href={lihatTo}
                        style={{ padding: '10px 16px', fontSize: '14px' }}
                      >
                        Lihat fakultas
                      </Button>
                      <Button
                        variant="line"
                        href="#"
                        title="Alamat website menyusul"
                        style={{ padding: '10px 16px', fontSize: '14px' }}
                      >
                        Website fakultas <ExternalLink style={{ width: 14, height: 14 }} aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
