import PhotoSlot from '../ui/PhotoSlot.jsx'
import SmartLink from '../ui/SmartLink.jsx'

// PageHero — hero header untuk halaman selain Beranda
export default function PageHero({
  title,
  description,
  crumbs = [],
  photoCaption = '',
  photoVariant = 'default',
  extra,
}) {
  return (
    <div className="pagehero">
      <div className="pat" />
      <div className="wrap">
        <div>
          {crumbs.length > 0 && (
            <nav className="crumb" aria-label="Breadcrumb">
              {crumbs.map((c, i) => (
                <span key={i}>
                  {c.to ? (
                    <SmartLink to={c.to} className="hover:text-white">
                      {c.label}
                    </SmartLink>
                  ) : (
                    <span>{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden> / </span>}
                </span>
              ))}
            </nav>
          )}
          <h1>{title}</h1>
          {description && <p>{description}</p>}
          {extra && <div className="btn-row" style={{ marginTop: '20px' }}>{extra}</div>}
        </div>
        <PhotoSlot
          variant={photoVariant}
          caption={photoCaption}
          aria-label={photoCaption || 'Foto halaman'}
        />
      </div>
    </div>
  )
}
