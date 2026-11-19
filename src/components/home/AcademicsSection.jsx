import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, GraduationCap, Landmark, Search, X } from "lucide-react";
import { FACULTIES, PRODI_LINKS } from "../../data/content.js";
import { toHref } from "../../lib/router.js";

// AcademicsSection — dua kartu pintu masuk belajar di UNIZAR: Fakultas &
// Program Studi. Klik kartu membuka panel popup berisi daftar (pola sama
// dengan FocusSection, kelas .pop); klik item menuju halaman detail
// fakultas/prodi masing-masing.

const PRODI_ITEMS = FACULTIES.flatMap((f) =>
  f.prodi.map((p) => ({
    name: p,
    to: PRODI_LINKS[p] || "#",
    faculty: f,
  })),
);

const CARDS = [
  {
    key: "fakultas",
    icon: Landmark,
    count: FACULTIES.length,
    title: "Fakultas",
    desc: "Profil, akreditasi, dan program studi di setiap fakultas UNIZAR.",
    cta: "Jelajahi tujuh fakultas",
    popTitle: "Tujuh fakultas",
    searchLabel: "Cari fakultas",
    emptyText: "Fakultas tidak ditemukan",
  },
  {
    key: "prodi",
    icon: GraduationCap,
    count: PRODI_ITEMS.length,
    title: "Program Studi",
    desc: "Dua belas prodi sarjana dan profesi lintas disiplin di tujuh fakultas.",
    cta: "Telusuri dua belas prodi",
    popTitle: "Dua belas program studi",
    searchLabel: "Cari program studi",
    emptyText: "Program studi tidak ditemukan",
  },
];

export default function AcademicsSection() {
  const [active, setActive] = useState(null);
  const [query, setQuery] = useState("");
  const closeRef = useRef(null);

  // Esc menutup panel + kunci scroll body selama panel terbuka
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  // Mode popup diganti → reset pencarian
  const openPop = (key) => {
    setQuery("");
    setActive(key);
  };

  const card = active && CARDS.find((c) => c.key === active);

  // Daftar item sesuai mode + filter pencarian
  const items = useMemo(() => {
    if (!card) return [];
    const q = query.trim().toLowerCase();
    if (card.key === "fakultas") {
      return FACULTIES.filter(
        (f) =>
          !q ||
          f.full.toLowerCase().includes(q) ||
          f.prodi.some((p) => p.toLowerCase().includes(q)),
      ).map((f) => ({
        key: f.abbr,
        abbr: f.abbr,
        title: f.full,
        sub: `${f.prodi.length} program studi`,
        to: f.to,
      }));
    }
    return PRODI_ITEMS.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.faculty.full.toLowerCase().includes(q),
    ).map((p) => ({
      key: p.name,
      abbr: p.faculty.abbr,
      title: p.name,
      sub: p.faculty.full,
      to: p.to,
    }));
  }, [card, query]);

  return (
    <section className="sec bg-white">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Belajar di UNIZAR</span>
            <h2>Tujuh fakultas, dua belas program studi</h2>
          </div>
        </div>

        <div className="acad-cards">
          {CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.key}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openPop(c.key);
                }}
                className="acad-card"
                aria-haspopup="dialog"
              >
                <span className="acad-top">
                  <span className="acad-ico">
                    <Icon size={22} strokeWidth={1.9} />
                  </span>
                  <span className="acad-count">{c.count}</span>
                </span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="acad-cta">
                  {c.cta}
                  <ArrowRight size={17} strokeWidth={2} />
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {card && (
        <div className="pop-root">
          <div className="pop-backdrop" onClick={() => setActive(null)} />
          <aside
            className="pop"
            role="dialog"
            aria-modal="true"
            aria-label={card.popTitle}
          >
            <header className="pop-hd">
              <span className="eyebrow">Belajar di UNIZAR</span>
              <h3>{card.popTitle}</h3>
              <button
                ref={closeRef}
                type="button"
                className="pop-x"
                onClick={() => setActive(null)}
                aria-label="Tutup panel"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </header>

            <div className="pop-bd">
              <div className="acad-search">
                <Search size={16} strokeWidth={2} aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={card.searchLabel}
                  aria-label={card.searchLabel}
                />
              </div>

              <div className="acad-list">
                {items.length === 0 ? (
                  <p className="acad-empty">
                    “{query}” — {card.emptyText.toLowerCase()}.
                  </p>
                ) : (
                  items.map((item) => (
                    <a
                      key={item.key}
                      href={toHref(item.to)}
                      onClick={() => setActive(null)}
                      className="acad-item"
                    >
                      <span className="acad-abbr">{item.abbr}</span>
                      <span className="acad-item-main">
                        <b>{item.title}</b>
                        <small>{item.sub}</small>
                      </span>
                      <ArrowRight
                        className="acad-arrow"
                        size={17}
                        strokeWidth={2}
                      />
                    </a>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
