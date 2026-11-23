
export default function YearBars({ data, ariaLabel }) {
  const rows = [...data].reverse()
  const max = Math.max(...rows.map((d) => d.jumlah), 1)

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      style={{ display: 'grid', gap: 8 }}
    >
      {rows.map((d) => {
        const pct = (d.jumlah / max) * 78

        return (
          <div
            key={d.tahun}
            style={{
              display: 'grid',
              gridTemplateColumns: '52px minmax(0, 1fr)',
              columnGap: 14,
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#0C6B4D',
              }}
            >
              {d.tahun}
            </span>

            <div style={{ position: 'relative', height: 36 }}>
              <div
                title={`${d.tahun}: ${d.jumlah}`}
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  border: '1.75px solid #126B40',
                  background: '#198754',
                  boxSizing: 'border-box',
                }}
              />

              <span
                style={{
                  position: 'absolute',
                  left: `calc(${pct}% + 10px)`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#13231c',
                  lineHeight: 1,
                }}
              >
                {d.jumlah}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
