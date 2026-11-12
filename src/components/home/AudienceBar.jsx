import { AUDIENCES } from '../../data/content.js'
import { toHref } from '../../lib/router.js'

// AudienceBar — bar "Saya adalah" di bawah hero
export default function AudienceBar() {
  return (
    <div className="aud bg-white border-b border-line">
      <div className="wrap flex items-center gap-2.5 flex-wrap py-4">
        <span className="font-bold text-muted text-sm mr-1.5">Saya adalah</span>
        {AUDIENCES.map((a, i) => (
          <a
            key={i}
            href={toHref(a.to)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-em-50 text-em-800 font-bold text-sm no-underline hover:bg-em-100 transition-colors"
          >
            {a.label}
          </a>
        ))}
      </div>
    </div>
  )
}
