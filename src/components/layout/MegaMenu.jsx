import { ArrowRight } from 'lucide-react'
import PhotoSlot from '../ui/PhotoSlot.jsx'
import { toHref } from '../../lib/router.js'

// MegaMenu — dropdown besar di bawah header
// Muncul saat user klik menu utama.
export default function MegaMenu({ menu, onClose }) {
  if (!menu || !menu.mega) return null
  const { intro, links, feat } = menu.mega

  return (
    <div
      className="absolute left-0 right-0 top-full bg-white border-b border-line shadow-mega animate-drop"
      id={`mega-${menu.key}`}
      role="menu"
      aria-label={`Menu ${menu.label}`}
    >
      <div
        className="wrap grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)_260px] lg:grid-cols-[260px_minmax(0,1fr)_280px] xl:grid-cols-[260px_minmax(0,1fr)_300px] gap-6 lg:gap-8 py-7 pb-8 items-start"
      >
        {/* Intro */}
        <div className="mega-intro">
          <span className="eyebrow text-gold-ink">{menu.label}</span>
          <h3 className="text-[26px] text-em-800 mt-1.5 mb-2">{intro}</h3>
          <a
            href={toHref(menu.to)}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 font-bold text-em-700 hover:text-em-900"
          >
            Lihat semua <ArrowRight size={14} strokeWidth={1.9} />
          </a>
        </div>

        {/* Grid link */}
        <div
          className="mega-links grid gap-x-5 gap-y-1"
          style={{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}
        >
          {links.map((l, i) => (
            <a
              key={i}
              href={toHref(l.to)}
              onClick={onClose}
              className="block px-3.5 py-3 rounded-card no-underline text-ink hover:bg-em-50 transition-colors"
            >
              <b className="flex items-center gap-1.5 text-[15px]">{l.title}</b>
              {l.desc && (
                <small className="block text-muted text-[13px] leading-[1.45] mt-0.5">
                  {l.desc}
                </small>
              )}
            </a>
          ))}
        </div>

        {/* Featured card */}
        {feat && (
          <a
            href={toHref(feat.to)}
            onClick={onClose}
            className="mega-feat self-start w-full overflow-hidden rounded-card bg-em-50 no-underline text-ink flex flex-col group hover:shadow-card transition-shadow"
          >
            <PhotoSlot
              className="w-full h-[180px]"
              variant="default"
              caption={feat.caption || ''}
            />
            {(feat.title || feat.desc) && (
              <div className="p-3.5">
                {feat.title && <b className="block text-[15px]">{feat.title}</b>}
                {feat.desc && <small className="text-muted">{feat.desc}</small>}
              </div>
            )}
          </a>
        )}
      </div>
    </div>
  )
}
