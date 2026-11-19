import { LogIn, LayoutGrid, Handshake, GraduationCap } from 'lucide-react'
import { RAIL_LINKS } from '../../data/navigation.js'
import { useHashRouter, toHref } from '../../lib/router.js'
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
  const { route } = useHashRouter()

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
        const isActive =
          route.path === r.to ||
          (r.to !== '/beranda' && route.path.startsWith(r.to))

        const isLogin = r.variant === 'login'

        return (
          <div key={i} className="contents">
            <a
              href={toHref(r.to)}
              className={cn(
                'rail-link flex items-center gap-3 h-[46px] px-[13px] rounded-card overflow-hidden whitespace-nowrap transition-all duration-150',
                isLogin
                  ? 'bg-gold text-em-950 hover:bg-[#ffd24d] font-bold shadow-sm'
                  : isActive
                  ? 'bg-white/15 !text-white hover:!text-white font-bold border border-white/10 shadow-sm'
                  : '!text-white hover:bg-white/10 hover:!text-white',
              )}
              title={r.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                size={20}
                strokeWidth={1.9}
                className={cn('flex-none', isLogin ? 'text-em-950' : '!text-white')}
              />
              <span
                className={cn(
                  'text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-150',
                  isLogin ? 'text-em-950' : '!text-white',
                )}
              >
                {r.label}
              </span>
            </a>
            {isLogin && (
              <div className="my-0.5 border-b border-white/15 mx-1" aria-hidden="true" />
            )}
          </div>
        )
      })}
    </nav>
  )
}
