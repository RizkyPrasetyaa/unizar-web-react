import { LogIn, LayoutGrid, Handshake, GraduationCap } from 'lucide-react'
import { RAIL_LINKS } from '../../data/navigation.js'
import { toHref } from '../../lib/router.js'
import { cn } from '../../lib/cn.js'

const ICONS = {
  '/masuk': LogIn,
  '/layanan': LayoutGrid,
  '/kerjasama': Handshake,
  '/mahasiswa-alumni': GraduationCap,
}

// QuickRail — rail kiri melayang
// Kompak (ikon saja); saat rail di-hover seluruh panel melebar dan semua
// label muncul sekaligus (lihat mockup v9).
export default function QuickRail() {
  return (
    <nav
      aria-label="Akses cepat"
      className="fixed z-40 left-3 top-1/2 -translate-y-[40%] flex-col gap-1.5 p-2 bg-em-900 rounded-panel shadow-rail hidden md:flex w-[62px] hover:w-[248px] transition-[width] duration-200 group"
    >
      <div className="rail-label text-[9px] font-extrabold tracking-[0.14em] text-[#9CC9B3] text-center pt-0.5 whitespace-nowrap overflow-hidden">
        AKSES
      </div>
      {RAIL_LINKS.map((r, i) => {
        const Icon = ICONS[r.to] || LogIn
        return (
          <a
            key={i}
            href={toHref(r.to)}
            className={cn(
              'rail-link flex items-center gap-3 h-[46px] px-[13px] rounded-card overflow-hidden whitespace-nowrap transition-colors',
              'hover:bg-white/12 hover:text-white',
              r.variant === 'login'
                ? 'bg-gold text-em-950 hover:bg-gold hover:text-em-950'
                : 'text-[#DCEFE5]',
            )}
            title={r.label}
          >
            <Icon size={20} strokeWidth={1.9} className="flex-none" />
            <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              {r.label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
