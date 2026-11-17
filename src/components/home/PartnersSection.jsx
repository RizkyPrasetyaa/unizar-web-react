import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { PARTNERS } from '../../data/content.js'
import { toHref } from '../../lib/router.js'
import PartnerDrawer from './PartnerDrawer.jsx'

// PartnersSection — logo mitra + link dokumen mutu.
// Klik kartu logo mitra membuka popup detail kerja sama (PartnerDrawer).
export default function PartnersSection() {
  const [detail, setDetail] = useState(null)

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Mitra</span>
            <h2>Bekerja bersama</h2>
          </div>
          <a href={toHref('/kerjasama')} className="btn btn-line">
            Semua kerja sama
            <ArrowRight size={18} strokeWidth={1.9} />
          </a>
        </div>

        <div
          className="partners grid gap-3"
          style={{ gridTemplateColumns: 'repeat(6, minmax(0,1fr))' }}
        >
          {PARTNERS.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setDetail(p)}
              className="h-[70px] border border-dashed border-[#C4D6CC] rounded-card grid place-items-center text-muted text-[12.5px] font-bold text-center p-1.5 bg-white hover:border-em-500 hover:text-em-700 transition-colors cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="slim mt-7">
          <p className="text-muted text-[15px]">
            <b className="text-ink">Mencari dokumen mutu atau bukti akreditasi?</b>{' '}
            Semua tersedia di Penjaminan Mutu dan Pusdatin.
          </p>
          <div className="btn-row">
            <a href={toHref('/peta-bukti')} className="btn btn-line">
              Peta Bukti BAN-PT
            </a>
            <a href={toHref('/pusdatin')} className="btn btn-line">
              Pusdatin
            </a>
          </div>
        </div>
      </div>

      <PartnerDrawer mitra={detail} onClose={() => setDetail(null)} />
    </section>
  )
}
