import { CAMPUS_STATS } from '../../data/content.js'
import { toHref } from '../../lib/router.js'

// StatsSection — 4 kolom stat di beranda
export default function StatsSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="stats grid grid-cols-4 border border-line rounded-r-lg bg-white overflow-hidden">
          {CAMPUS_STATS.map((s, i) => (
            <div
              key={i}
              className="stat p-6 px-6 [&:not(:last-child)]:border-r border-line"
            >
              <b
                className="block font-extrabold text-em-800 leading-none tracking-[-0.02em] tabular-nums"
                style={{ fontSize: '44px' }}
              >
                {s.value}
              </b>
              <span className="block mt-2 text-muted text-sm">{s.label}</span>
            </div>
          ))}
          <div className="stat p-6 px-6 flex flex-col justify-center">
            <b
              className="block font-extrabold text-em-800 leading-[1.3] pt-2"
              style={{ fontSize: '20px' }}
            >
              Fakta lengkap &amp; sumber data
            </b>
            <span className="block mt-2">
              <a href={toHref('/profil/angka')} className="font-bold text-sm">
                UNIZAR dalam Angka →
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
