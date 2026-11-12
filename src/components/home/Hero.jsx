import { ArrowRight } from 'lucide-react'
import { toHref } from '../../lib/router.js'

// Hero — banner utama beranda
export default function Hero() {
  return (
    <section className="hero relative bg-em-900 text-white overflow-hidden" data-hero-media="emerald">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(115deg, rgba(3,41,31,0.96) 0%, rgba(5,59,44,0.82) 45%, rgba(10,107,79,0.35) 100%)',
        }}
        aria-hidden="true"
      />

      <div
        className="wrap relative z-10 grid items-end gap-10"
        style={{
          gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,0.7fr)',
          paddingTop: '84px',
          paddingBottom: '72px',
        }}
      >
        <div>
          <p className="hero-kicker text-[#9CC9B3] mb-3">
            UNIVERSITAS ISLAM AL-AZHAR
          </p>
          <h1
            className="text-white font-extrabold leading-[1.04] tracking-[-0.025em]"
            style={{ fontSize: 'clamp(38px, 5.6vw, 68px)' }}
          >
            Selamat Datang di Kampus <em className="not-italic text-gold">Rahmatan lil &lsquo;Alamin</em>
          </h1>
          <p className="lead text-[#D3EBDF] mt-[18px]">
            Universitas Islam di jantung Kota Mataram yang tumbuh bersama masyarakat Nusa Tenggara
            Barat sejak 1981.
          </p>
          <div className="btn-row mt-7">
            <a href={toHref('/pendidikan#penerimaan')} className="btn btn-pri">
              <span>Daftar PMB 2027</span>
              <ArrowRight size={18} strokeWidth={1.9} />
            </a>
            <a href={toHref('/profil')} className="btn btn-ghost">
              <span>Kenali UNIZAR</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
