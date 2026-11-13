import Button from './Button.jsx'
import { useHashRouter } from '../../lib/router.js'

/**
 * ProdiSwitcher — deretan tombol prodi.
 * Tombol yang sesuai route saat ini = variant "dark" (hijau).
 * Jika tidak ada yang match (mis. di halaman fakultas), tombol pertama jadi dark.
 *
 * items: [{ label: 'Pendidikan Dokter', to: '/prodi/pendidikan-dokter' }, ...]
 */
export default function ProdiSwitcher({ items = [], className }) {
  const { route } = useHashRouter()
  const current = route.path || ''

  const activeIndex = items.findIndex(
    (item) => current === item.to || current.startsWith(item.to + '/')
  )
  // Jika tidak ada yang aktif (halaman fakultas), highlight yang pertama
  const resolvedActive = activeIndex >= 0 ? activeIndex : 0

  return (
    <div className={`btn-row ${className || ''}`} style={{ gap: '8px' }}>
      {items.map((item, i) => (
        <Button
          key={item.to}
          variant={i === resolvedActive ? 'dark' : 'line'}
          href={item.to}
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}
