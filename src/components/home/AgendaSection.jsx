import { ArrowRight } from 'lucide-react'
import { AGENDA } from '../../data/content.js'
import { toHref } from '../../lib/router.js'

// AgendaSection — list agenda + CTA PMB 2027
export default function AgendaSection() {
  return (
    <section className="sec bg-white">
      <div className="wrap split">
        <div>
          <div className="sec-h">
            <div>
              <span className="eyebrow">Agenda</span>
              <h2>Segera di kampus</h2>
            </div>
          </div>
          <ul className="clean list-none p-0 m-0 grid">
            {AGENDA.map((a, i) => (
              <li
                key={i}
                className="grid items-center gap-4 py-3.5 border-b border-line"
                style={{ gridTemplateColumns: '64px minmax(0,1fr)' }}
              >
                <span className="d bg-em-50 rounded-r text-center py-2 font-extrabold text-em-800 leading-[1.1]">
                  {a.day}
                  <small className="block text-[11px] tracking-[0.08em] text-em-700">
                    {a.month}
                  </small>
                </span>
                <div>
                  <a href={toHref(a.to)} className="no-underline text-ink hover:text-em-700">
                    <b>{a.title}</b>
                  </a>
                  <div className="text-muted text-sm">{a.meta}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="band self-stretch bg-em-800 text-white rounded-r-lg p-9 flex flex-wrap gap-6 items-center justify-between relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'var(--pattern)', opacity: 0.7 }}
            aria-hidden="true"
          />
          <div className="relative min-w-0 flex-1 basis-[200px]">
            <span className="eyebrow text-gold">PMB 2027</span>
            <h2 className="text-white text-[28px]">Mulai perjalananmu di UNIZAR</h2>
            <p className="text-[#D3EBDF] mt-2">
              Lima jalur masuk, beasiswa KIP-Kuliah dan beasiswa internal, serta pendaftaran
              sepenuhnya daring.
            </p>
          </div>
          <a href={toHref('/pendidikan#penerimaan')} className="btn btn-pri relative shrink-0">
            Lihat jalur masuk
            <ArrowRight size={18} strokeWidth={1.9} />
          </a>
        </div>
      </div>
    </section>
  )
}
