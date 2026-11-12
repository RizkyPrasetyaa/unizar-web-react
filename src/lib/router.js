import { useCallback, useEffect, useState } from 'react'

/**
 * Hash-based router.
 *
 * The mockup is a single-page app that uses URL hash like `#profil`,
 * `#fakultas`, etc. We follow the same model.
 *
 * Examples:
 *   #profil              -> { path: '/profil', section: '' }
 *   #profil--tentang     -> { path: '/profil', section: 'tentang' }
 *   #fakultas/kedokteran -> { path: '/fakultas/kedokteran', section: '' }
 */

export function parseHash(hash) {
  let raw = (hash || '').replace(/^#/, '').replace(/^\//, '')
  if (!raw) raw = 'beranda'

  let pathPart = raw
  let section = ''

  if (raw.includes('--')) {
    const idx = raw.indexOf('--')
    pathPart = raw.slice(0, idx)
    section = raw.slice(idx + 2)
  } else if (raw.includes('#')) {
    const [p, s] = raw.split('#')
    pathPart = p
    section = s
  }

  const path = '/' + pathPart.replace(/^\/+/, '')
  return { path, section, raw }
}

export function useHashRouter() {
  const [route, setRoute] = useState({ path: '/beranda', section: '', raw: '' })

  useEffect(() => {
    const update = () => setRoute(parseHash(window.location.hash))
    update()
    window.addEventListener('hashchange', update)
    if (!window.location.hash) {
      window.location.hash = '#beranda'
    }
    return () => window.removeEventListener('hashchange', update)
  }, [])

  // Scroll handling: when section is set, scroll to that element
  useEffect(() => {
    if (!route.section) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    const t = setTimeout(() => {
      const pageBase = route.path.replace(/^\//, '').replace(/\//g, '-')
      const candidates = [`${pageBase}--${route.section}`, route.section]
      for (const id of candidates) {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
      }
    }, 80)
    return () => clearTimeout(t)
  }, [route.path, route.section])

  const navigate = useCallback((to) => {
    let s = to
    if (s.startsWith('/')) s = s.slice(1)
    if (s.includes('#')) {
      const [p, sec] = s.split('#')
      window.location.hash = `#${p}--${sec}`
    } else {
      window.location.hash = `#${s || 'beranda'}`
    }
  }, [])

  return { route, navigate }
}

/**
 * Convert an internal `to` link (e.g. "/profil#tentang") into an href that
 * works with our hash router (e.g. "#profil--tentang").
 */
export function toHref(to) {
  if (!to) return '#beranda'
  if (to.startsWith('http')) return to
  let s = to
  if (s.startsWith('/')) s = s.slice(1)
  if (s.includes('#')) {
    const [p, sec] = s.split('#')
    return `#${p}--${sec}`
  }
  return `#${s || 'beranda'}`
}

/**
 * Get the page key from a path (e.g. '/profil' -> 'profil', '/fakultas/kedokteran' -> 'fakultas-kedokteran')
 */
export function pageKeyFromPath(path) {
  return path.replace(/^\//, '').replace(/\//g, '-')
}
