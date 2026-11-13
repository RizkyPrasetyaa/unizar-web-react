import Button from './Button.jsx'
import { useHashRouter } from '../../lib/router.js'

/**
 * ProdiSwitcher
 *
 * - Di halaman prodi (ada yang match route): hanya tampilkan tombol prodi aktif (hijau).
 * - Di halaman fakultas (tidak ada yang match): tampilkan semua tombol (switcher).
 *
 * items: [{ label: 'Pendidikan Dokter', to: '/prodi/pendidikan-dokter' }, ...]
 */
export default function ProdiSwitcher({ items = [], className }) {
  const { route } = useHashRouter()
  const current = route.path || ''

  const activeIndex = items.findIndex(
    (item) => current === item.to || current.startsWith(item.to + '/')
  )

  // Di halaman prodi → hanya tampilkan tombol yang aktif
  // Di halaman fakultas → tampilkan semua
  const visibleItems =
    activeIndex >= 0
      ? [{ ...items[activeIndex], _active: true }]
      : items.map((item, i) => ({ ...item, _active: i === 0 }))

  if (visibleItems.length === 0) return null

  return (
    <div className={`btn-row ${className || ''}`} style={{ gap: '8px' }}>
      {visibleItems.map((item) => (
        <Button
          key={item.to}
          variant={item._active ? 'dark' : 'line'}
          href={item.to}
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}
