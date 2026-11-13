import { useEffect, useMemo, useRef, useState } from "react";
import PageHero from "../components/layout/PageHero.jsx";
import Subnav from "../components/layout/Subnav.jsx";
import Card from "../components/ui/Card.jsx";
import Pill from "../components/ui/Pill.jsx";
import PhotoSlot from "../components/ui/PhotoSlot.jsx";
import Button from "../components/ui/Button.jsx";
import { ArrowRight, ExternalLink, X } from "lucide-react";

const UNIT_ITEMS = [
  {
    id: "unit-biro-akademik",
    kind: "biro",
    label: "Biro",
    title: "Biro Akademik",
    email: "akademik@unizar.ac.id",
    location: "Gedung Rektorat Lt. 2",
  },
  {
    id: "unit-biro-kemahasiswaan",
    kind: "biro",
    label: "Biro",
    title: "Biro Kemahasiswaan",
    email: "kemahasiswaan@unizar.ac.id",
    location: "Gedung Rektorat Lt. 2",
  },
  {
    id: "unit-biro-keuangan",
    kind: "biro",
    label: "Biro",
    title: "Biro Keuangan",
    email: "keuangan@unizar.ac.id",
    location: "Gedung Rektorat Lt. 2",
  },
  {
    id: "unit-biro-sumber-daya-manusia",
    kind: "biro",
    label: "Biro",
    title: "Biro Sumber Daya Manusia",
    email: "sdm@unizar.ac.id",
    location: "Gedung Rektorat Lt. 2",
  },
  {
    id: "unit-biro-humas-kerja-sama-alumni",
    kind: "biro",
    label: "Biro",
    title: "Biro Humas, Kerja Sama & Alumni",
    email: "hka@unizar.ac.id",
    location: "Gedung Rektorat Lt. 2",
  },
  {
    id: "unit-biro-umum",
    kind: "biro",
    label: "Biro",
    title: "Biro Umum",
    email: "biroumum@unizar.ac.id",
    location: "Gedung Rektorat Lt. 1",
  },
  {
    id: "unit-biro-perencanaan-pengembangan",
    kind: "biro",
    label: "Biro",
    title: "Biro Perencanaan & Pengembangan",
    email: "renstrabang@unizar.ac.id",
    location: "Gedung Rektorat Lt. 2",
  },
  {
    id: "unit-biro-hukum-administrasi-umum",
    kind: "biro",
    label: "Biro",
    title: "Biro Hukum & Administrasi Umum",
    email: "hukum@unizar.ac.id",
    location: "Gedung Rektorat Lt. 2",
  },
  {
    id: "unit-lppm",
    kind: "lembaga",
    label: "Lembaga",
    title: "LPPM",
    email: "[email]",
    location: "[lokasi]",
    hasWebsite: true,
  },
  {
    id: "unit-badan-penjaminan-mutu",
    kind: "badan",
    label: "Badan",
    title: "Badan Penjaminan Mutu",
    email: "[email]",
    location: "[lokasi]",
    hasWebsite: true,
  },
  {
    id: "unit-satuan-pengawasan-internal",
    kind: "badan",
    label: "Badan",
    title: "Satuan Pengawasan Internal",
    email: "[email]",
    location: "[lokasi]",
  },
  {
    id: "unit-pustik",
    kind: "upt",
    label: "UPT",
    title: "PUSTIK",
    email: "[email]",
    location: "[lokasi]",
    hasWebsite: true,
  },
  {
    id: "unit-perpustakaan",
    kind: "upt",
    label: "UPT",
    title: "Perpustakaan",
    email: "[email]",
    location: "[lokasi]",
    hasWebsite: true,
  },
  {
    id: "unit-inkubator-bisnis-dan-teknologi-ite",
    kind: "upt",
    label: "UPT",
    title: "Inkubator Bisnis dan Teknologi (ITe)",
    email: "[email]",
    location: "[lokasi]",
    hasWebsite: true,
  },
  {
    id: "unit-unit-bisnis",
    kind: "upt",
    label: "UPT",
    title: "Unit Bisnis",
    email: "[email]",
    location: "[lokasi]",
    hasWebsite: true,
  },
  {
    id: "unit-unizar-learning-center-ulc",
    kind: "upt",
    label: "UPT",
    title: "Unizar Learning Center (ULC)",
    email: "[email]",
    location: "[lokasi]",
    hasWebsite: true,
  },
  {
    id: "unit-unit-keselamatan-dan-kesehatan-kerja-k3",
    kind: "upt",
    label: "UPT",
    title: "Unit Keselamatan dan Kesehatan Kerja (K3)",
    email: "[email]",
    location: "[lokasi]",
    hasWebsite: true,
  },
  {
    id: "unit-satgas-ppkpt",
    kind: "satgas",
    label: "Satgas",
    title: "Satgas PPKPT",
    email: "[email]",
    location: "[lokasi]",
  },
];

const UNIT_CHIPS = [
  { v: "all", label: "Semua" },
  { v: "biro", label: "Biro" },
  { v: "lembaga", label: "Lembaga" },
  { v: "badan", label: "Badan" },
  { v: "upt", label: "UPT" },
  { v: "satgas", label: "Satgas" },
];

const DOSEN_ITEMS = [
  { name: "[Nama dosen]", desc: "Guru Besar · hukum agraria" },
  { name: "[Nama dosen]", desc: "Lektor Kepala · ergonomi" },
  { name: "[Nama dosen]", desc: "Lektor Kepala · agribisnis" },
  { name: "[Nama dosen]", desc: "Lektor · akuntansi" },
  { name: "[Nama dosen]", desc: "Lektor · teknik sipil" },
  { name: "[Nama dosen]", desc: "Lektor · biologi" },
  { name: "[Nama dosen]", desc: "Asisten Ahli · ekonomi syariah" },
  { name: "[Nama dosen]", desc: "Asisten Ahli · ilmu komputer" },
];

const FAKULTAS_OPTIONS = [
  "Semua fakultas",
  "Kedokteran",
  "Teknik",
  "Hukum",
  "Ekonomi & Bisnis",
  "Pertanian",
  "MIPA",
  "Agama Islam",
];

// Drawer detail unit — panel geser dari sisi kanan saat tombol "Detail unit" diklik.
// Field opsional (kepala, tugas, layanan, jam) berasal dari data unit atau default.
function UnitDrawer({ unit, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!unit) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [unit, onClose]);

  if (!unit) return null;

  const jam = unit.jamLayanan || "Senin–Jumat, 08.00–16.00 WITA";
  const kepala = unit.kepala || "[Nama]";
  const tugas = unit.tugas || "[Tugas dan fungsi unit sesuai Statuta dan OTK.]";
  const layanan = unit.layanan || ["[Layanan 1]", "[Layanan 2]", "[Layanan 3]"];

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd"
        role="dialog"
        aria-modal="true"
        aria-label={`Detail unit ${unit.title}`}
      >
        <div className="pd-head">
          <span className="eyebrow" style={{ color: "#fff" }}>
            Direktori <span style={{ color: "#f2c230" }}>· {unit.label}</span>
          </span>
          <h3>{unit.title}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup detail unit"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <PhotoSlot
            caption={`Foto: kantor ${unit.title}`}
            aria-label={`Tempat foto: kantor ${unit.title}`}
            style={{ height: "210px" }}
          />
          <dl className="pd-meta">
            <div>
              <dt>Email</dt>
              <dd>{unit.email}</dd>
            </div>
            <div>
              <dt>Lokasi</dt>
              <dd>{unit.location}</dd>
            </div>
            <div>
              <dt>Jam layanan</dt>
              <dd>{jam}</dd>
            </div>
            <div>
              <dt>Kepala unit</dt>
              <dd>{kepala}</dd>
            </div>
          </dl>
          <p className="pd-bio">{tugas}</p>
          <div className="pd-sec">
            <h4>Layanan utama</h4>
            <ul className="clean">
              {layanan.map((l, i) => (
                <li key={i} className="pd-row">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

// Drawer website unit — konfirmasi "menuju sistem lain" sebelum buka tab baru.
function WebsiteDrawer({ unit, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!unit) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [unit, onClose]);

  if (!unit) return null;

  const alamat = unit.website || "[alamat diisi operator website]";

  const bukaTabBaru = () => {
    if (unit.website) window.open(unit.website, "_blank", "noreferrer");
  };

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd"
        role="dialog"
        aria-modal="true"
        aria-label={`Website ${unit.title}`}
      >
        <div className="pd-head">
          <span className="eyebrow">Menuju sistem lain</span>
          <h3>Website unit</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <span
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "#e3f1ea",
              display: "grid",
              placeItems: "center",
              color: "#064e3b",
            }}
            aria-hidden="true"
          >
            <ExternalLink size={26} strokeWidth={1.9} />
          </span>
          <p className="pd-bio">
            Website resmi unit di lingkungan UNIZAR.
          </p>
          <div className="pd-addr">
            <small>Alamat</small>
            <b>{alamat}</b>
          </div>
          <div className="btn-row" style={{ marginTop: "4px" }}>
            <Button variant="dark" asButton onClick={bukaTabBaru}>
              Buka di tab baru{" "}
              <ExternalLink style={{ width: 15, height: 15 }} aria-hidden="true" />
            </Button>
            <Button variant="line" asButton onClick={onClose}>
              Batal
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Direktori() {
  // Unit filter state
  const [unitQuery, setUnitQuery] = useState("");
  const [unitKind, setUnitKind] = useState("all");
  const [unitDetail, setUnitDetail] = useState(null);
  const [webUnit, setWebUnit] = useState(null);

  // Dosen filter state
  const [dosenQuery, setDosenQuery] = useState("");
  const [dosenFakultas, setDosenFakultas] = useState("Semua fakultas");

  const filteredUnits = useMemo(() => {
    const q = unitQuery.trim().toLowerCase();
    return UNIT_ITEMS.filter((u) => {
      const matchKind = unitKind === "all" || u.kind === unitKind;
      const matchText =
        !q ||
        u.title.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.location.toLowerCase().includes(q);
      return matchKind && matchText;
    });
  }, [unitQuery, unitKind]);

  const filteredDosen = useMemo(() => {
    const q = dosenQuery.trim().toLowerCase();
    return DOSEN_ITEMS.filter((d) => {
      const matchText =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q);
      const matchFak =
        dosenFakultas === "Semua fakultas" ||
        d.desc.toLowerCase().includes(dosenFakultas.toLowerCase());
      return matchText && matchFak;
    });
  }, [dosenQuery, dosenFakultas]);

  return (
    <div className="page animate-fade">
      <PageHero
        title="Direktori"
        description="Satu tempat untuk menemukan unit kerja, dosen dan pakar, dokumen, serta lokasi di kampus."
        crumbs={[{ label: "Beranda", to: "/beranda" }, { label: "Direktori" }]}
        photoCaption="Foto: denah kampus"
      />
      <Subnav
        items={[
          { id: "direktori--unit", label: "Unit Kerja" },
          { id: "direktori--dosen", label: "Dosen & Pakar" },
          { id: "direktori--dokumen", label: "Pusdatin" },
          { id: "direktori--kontak", label: "Kontak & Peta" },
        ]}
      />

      {/* === Unit Kerja === */}
      <section className="sec" id="direktori--unit" data-t="Unit Kerja">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Unit kerja</span>
              <h2>Biro, lembaga, badan, dan UPT</h2>
            </div>
          </div>

          <div data-filter>
            <div className="toolbar">
              <div className="field">
                <label htmlFor="u-q">Cari unit</label>
                <input
                  id="u-q"
                  placeholder="mis. keuangan, perpustakaan"
                  value={unitQuery}
                  onChange={(e) => setUnitQuery(e.target.value)}
                />
              </div>
              <div className="chips" role="group" aria-label="Jenis unit">
                {UNIT_CHIPS.map((c) => (
                  <button
                    key={c.v}
                    type="button"
                    aria-pressed={unitKind === c.v}
                    onClick={() => setUnitKind(c.v)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid g3">
              {filteredUnits.map((u) => (
                <Card key={u.id} to="#">
                  <Pill>{u.label}</Pill>
                  <h3 style={{ fontSize: "17px" }}>{u.title}</h3>
                  <p style={{ fontSize: "14px" }}>
                    {u.email}
                    <br />
                    {u.location}
                  </p>
                  <div
                    className="btn-row"
                    style={{ gap: "8px", marginTop: "auto" }}
                  >
                    <Button
                      variant="dark"
                      className="!px-4 !py-2.5 !text-sm"
                      onClick={() => setUnitDetail(u)}
                      aria-haspopup="dialog"
                    >
                      Detail unit
                    </Button>
                    {u.hasWebsite && (
                      <Button
                        variant="line"
                        onClick={() => setWebUnit(u)}
                        aria-haspopup="dialog"
                      >
                        Website{" "}
                        <ExternalLink
                          style={{ width: 14, height: 14 }}
                          aria-hidden="true"
                        />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {filteredUnits.length === 0 && (
              <p className="muted" style={{ marginTop: "16px" }}>
                Tidak ada unit yang cocok dengan pencarian Anda.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* === Dosen & Pakar === */}
      <section className="sec" id="direktori--dosen" data-t="Dosen & Pakar">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Dosen &amp; pakar</span>
              <h2>Cari dosen dan kepakarannya</h2>
              <p>
                Profil publik memuat jabatan akademik, bidang keahlian, dan
                tautan SINTA/Google Scholar. Data pribadi tidak ditampilkan.
              </p>
            </div>
          </div>

          <div data-filter>
            <div className="toolbar">
              <div className="field">
                <label htmlFor="d-q2">Nama atau bidang keahlian</label>
                <input
                  id="d-q2"
                  placeholder="mis. ergonomi, hukum agraria, agribisnis"
                  value={dosenQuery}
                  onChange={(e) => setDosenQuery(e.target.value)}
                />
              </div>
              <div className="field" style={{ flex: "0 1 220px" }}>
                <label htmlFor="d-f2">Fakultas</label>
                <select
                  id="d-f2"
                  value={dosenFakultas}
                  onChange={(e) => setDosenFakultas(e.target.value)}
                >
                  {FAKULTAS_OPTIONS.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid g4">
              {filteredDosen.map((d, i) => (
                <Card
                  key={i}
                  to="#"
                  style={{
                    flexDirection: "row",
                    gap: "12px",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      background: "var(--em-100)",
                      flex: "none",
                    }}
                    aria-hidden="true"
                  />
                  <div>
                    <b style={{ fontSize: "14.5px" }}>{d.name}</b>
                    <p style={{ fontSize: "13px" }}>{d.desc}</p>
                  </div>
                </Card>
              ))}
            </div>

            {filteredDosen.length === 0 && (
              <p className="muted" style={{ marginTop: "16px" }}>
                Tidak ada dosen yang cocok dengan pencarian Anda.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* === Pusdatin (Dokumen) === */}
      <section className="sec" id="direktori--dokumen" data-t="Pusdatin">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Dokumen</span>
              <h2>Pusdatin</h2>
            </div>
          </div>
          <div className="slim">
            <p>
              Statuta, peraturan, pedoman, SOP, rencana strategis, dan laporan,
              lengkap dengan nomor SK dan riwayat versi.
            </p>
            <Button variant="dark" href="/pusdatin">
              Buka Pusdatin{" "}
              <ArrowRight
                style={{ width: 16, height: 16 }}
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </section>

      {/* === Kontak & Peta === */}
      <section className="sec" id="direktori--kontak" data-t="Kontak & Peta">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Kontak</span>
              <h2>Kontak &amp; peta kampus</h2>
            </div>
          </div>
          <div className="split">
            <Card>
              <h3>Universitas Islam Al-Azhar</h3>
              <p>
                Jl. Unizar No. 20, Turida, Sandubaya
                <br />
                Mataram, Nusa Tenggara Barat 83232
              </p>
              <p>
                <b style={{ color: "var(--ink)" }}>Telepon</b> (0370) 6175555
                <br />
                <b style={{ color: "var(--ink)" }}>Email</b> humas@unizar.ac.id
              </p>
              <p>
                <b style={{ color: "var(--ink)" }}>Jam layanan</b> Senin–Jumat,
                08.00–16.00 WITA
              </p>
            </Card>
            <PhotoSlot
              variant="sky"
              caption="Foto: denah kampus interaktif (tautan ke peta)"
              aria-label="Tempat foto: denah kampus interaktif (tautan ke peta)"
              style={{ height: "260px" }}
            />
          </div>
        </div>
      </section>

      <UnitDrawer unit={unitDetail} onClose={() => setUnitDetail(null)} />
      <WebsiteDrawer unit={webUnit} onClose={() => setWebUnit(null)} />
    </div>
  );
}
