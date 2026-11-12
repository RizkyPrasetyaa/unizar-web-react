import { ArrowRight } from 'lucide-react'
import { FACULTIES } from '../../data/content.js'
import { toHref } from '../../lib/router.js'

// FacultyChips — horizontal scroll of 7 fakultas
export default function FacultyChips() {
  return (
    <section className="sec bg-white">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Belajar di UNIZAR</span>
            <h2>Tujuh fakultas, tiga belas program studi</h2>
          </div>
          <a href={toHref('/fakultas')} className="btn btn-line">
            Semua fakultas
            <ArrowRight size={18} strokeWidth={1.9} />
          </a>
        </div>

        <div
          className="fac-scroll grid gap-3 overflow-x-auto pb-1.5 no-scrollbar"
          style={{ gridTemplateColumns: 'repeat(7, minmax(150px,1fr))' }}
        >
          {FACULTIES.map((f) => (
            <a
              key={f.abbr}
              href={toHref(f.to)}
              className="fac-chip"
            >
              <span className="abbr">{f.abbr}</span>
              <b className="text-sm leading-[1.3]">{f.name}</b>
              <small className="text-muted text-[12.5px] mt-auto">{f.prodi.join(' · ')}</small>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
