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
  { id: "dosen-1", name: "[Nama dosen]", jabatan: "Guru Besar", keilmuan: "hukum agraria", fakultas: "Hukum" },
  { id: "dosen-2", name: "[Nama dosen]", jabatan: "Lektor Kepala", keilmuan: "ergonomi", fakultas: "Teknik" },
  { id: "dosen-3", name: "[Nama dosen]", jabatan: "Lektor Kepala", keilmuan: "agribisnis", fakultas: "Pertanian" },
  { id: "dosen-4", name: "[Nama dosen]", jabatan: "Lektor", keilmuan: "akuntansi", fakultas: "Ekonomi & Bisnis" },
  { id: "dosen-5", name: "[Nama dosen]", jabatan: "Lektor", keilmuan: "teknik sipil", fakultas: "Teknik" },
  { id: "dosen-6", name: "[Nama dosen]", jabatan: "Lektor", keilmuan: "biologi", fakultas: "MIPA" },
  { id: "dosen-7", name: "[Nama dosen]", jabatan: "Asisten Ahli", keilmuan: "ekonomi syariah", fakultas: "Agama Islam" },
  { id: "dosen-8", name: "[Nama dosen]", jabatan: "Asisten Ahli", keilmuan: "ilmu komputer", fakultas: "Teknik" },
];

// Ringkasan jumlah resmi (placeholder); daftar di bawah adalah sampel untuk filter
const TENDIK_STATS = [
  { label: "Administrasi", value: "98" },
  { label: "Pustakawan", value: "14" },
  { label: "Laboran/teknisi", value: "52" },
  { label: "Pranata TI", value: "18" },
  { label: "Lainnya", value: "54" },
];

// Sampel nama tendik per kategori (placeholder — ganti data resmi)
const TENDIK_ITEMS = [
  { id: "tendik-1", name: "[Nama tendik]", kategori: "Administrasi", unit: "Biro Akademik", jabatan: "Staff administrasi", email: "[email]@unizar.ac.id" },
  { id: "tendik-2", name: "[Nama tendik]", kategori: "Administrasi", unit: "Biro Keuangan", jabatan: "Staff keuangan", email: "[email]@unizar.ac.id" },
  { id: "tendik-3", name: "[Nama tendik]", kategori: "Administrasi", unit: "Biro SDM", jabatan: "Staff kepegawaian", email: "[email]@unizar.ac.id" },
  { id: "tendik-4", name: "[Nama tendik]", kategori: "Administrasi", unit: "Fakultas Teknik", jabatan: "Staff administrasi", email: "[email]@unizar.ac.id" },
  { id: "tendik-5", name: "[Nama tendik]", kategori: "Pustakawan", unit: "Perpustakaan", jabatan: "Pustakawan", email: "[email]@unizar.ac.id" },
  { id: "tendik-6", name: "[Nama tendik]", kategori: "Pustakawan", unit: "Perpustakaan", jabatan: "Pustakawan madya", email: "[email]@unizar.ac.id" },
  { id: "tendik-7", name: "[Nama tendik]", kategori: "Laboran/teknisi", unit: "Lab Kedokteran", jabatan: "Laboran", email: "[email]@unizar.ac.id" },
  { id: "tendik-8", name: "[Nama tendik]", kategori: "Laboran/teknisi", unit: "Lab Teknik", jabatan: "Teknisi lab", email: "[email]@unizar.ac.id" },
  { id: "tendik-9", name: "[Nama tendik]", kategori: "Laboran/teknisi", unit: "Lab MIPA", jabatan: "Laboran", email: "[email]@unizar.ac.id" },
  { id: "tendik-10", name: "[Nama tendik]", kategori: "Pranata TI", unit: "UPT TIK", jabatan: "Pranata komputer", email: "[email]@unizar.ac.id" },
  { id: "tendik-11", name: "[Nama tendik]", kategori: "Pranata TI", unit: "UPT TIK", jabatan: "Network engineer", email: "[email]@unizar.ac.id" },
  { id: "tendik-12", name: "[Nama tendik]", kategori: "Lainnya", unit: "Biro Umum", jabatan: "Pengemudi", email: "[email]@unizar.ac.id" },
  { id: "tendik-13", name: "[Nama tendik]", kategori: "Lainnya", unit: "Biro Umum", jabatan: "Petugas keamanan", email: "[email]@unizar.ac.id" },
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
          <p className="pd-bio">Website resmi unit di lingkungan UNIZAR.</p>
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

function DosenDrawer({ dosen, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!dosen) return;
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
  }, [dosen, onClose]);

  if (!dosen) return null;

  const namaGelar = dosen.namaGelar || "[Nama dosen dan gelar]";
  const prodi = dosen.prodi || "[Prodi]";
  const bidang = dosen.bidang || ["[Bidang 1]", "[Bidang 2]"];
  const email = dosen.email || "[email]@unizar.ac.id";
  const ringkasan = dosen.ringkasan || "[Ringkasan kepakaran dalam dua kalimat.]";
  const publikasi =
    dosen.publikasi ||
    [
      { judul: "[Judul artikel]", jurnal: "[Jurnal]", tahun: "2026" },
      { judul: "[Judul artikel]", jurnal: "[Jurnal]", tahun: "2025" },
    ];
  const matkul = dosen.matkul || ["[Mata kuliah 1]", "[Mata kuliah 2]"];
  const bersedia = dosen.bersedia || ["Narasumber", "Saksi ahli", "Kolaborasi riset"];

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd"
        role="dialog"
        aria-modal="true"
        aria-label={`Profil dosen ${dosen.name}`}
      >
        <div className="pd-head">
          <span className="eyebrow">Dosen &amp; tendik</span>
          <h3>{namaGelar}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup profil dosen"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <PhotoSlot
            caption="Foto: foto profil"
            aria-label="Tempat foto: foto profil dosen"
            style={{ height: "210px" }}
          />
          <dl className="pd-meta">
            <div>
              <dt>Jabatan akademik</dt>
              <dd>{dosen.jabatan}</dd>
            </div>
            <div>
              <dt>Program studi</dt>
              <dd>{prodi}</dd>
            </div>
            <div>
              <dt>Bidang keilmuan</dt>
              <dd>{bidang.join(", ")}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{email}</dd>
            </div>
          </dl>
          <p className="pd-bio">{ringkasan}</p>
          <div className="pd-sec">
            <h4>Publikasi terbaru</h4>
            <ul className="clean">
              {publikasi.map((p, i) => (
                <li key={i} className="pd-row">
                  {p.judul} · {p.jurnal} · {p.tahun}
                </li>
              ))}
            </ul>
          </div>
          <div className="pd-sec">
            <h4>Mata kuliah</h4>
            <ul className="clean">
              {matkul.map((m, i) => (
                <li key={i} className="pd-row">
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="pd-sec">
            <h4>Bersedia untuk</h4>
            <ul className="clean">
              {bersedia.map((b, i) => (
                <li key={i} className="pd-row">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function TendikDrawer({ tendik, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!tendik) return;
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
  }, [tendik, onClose]);

  if (!tendik) return null;

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd"
        role="dialog"
        aria-modal="true"
        aria-label={`Profil tendik ${tendik.name}`}
      >
        <div className="pd-head">
          <span className="eyebrow">Dosen &amp; tendik</span>
          <h3>{tendik.name}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup profil tendik"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <PhotoSlot
            caption="Foto: foto profil"
            aria-label="Tempat foto: foto profil tendik"
            style={{ height: "210px" }}
          />
          <dl className="pd-meta">
            <div>
              <dt>Kategori</dt>
              <dd>{tendik.kategori}</dd>
            </div>
            <div>
              <dt>Jabatan</dt>
              <dd>{tendik.jabatan}</dd>
            </div>
            <div>
              <dt>Unit kerja</dt>
              <dd>{tendik.unit}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{tendik.email}</dd>
            </div>
          </dl>
          <div className="btn-row" style={{ marginTop: "18px" }}>
            <Button variant="dark" href={`mailto:${tendik.email}`}>
              Hubungi
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}


export default function Direktori() {
  const [unitQuery, setUnitQuery] = useState("");
  const [unitKind, setUnitKind] = useState("all");
  const [unitDetail, setUnitDetail] = useState(null);
  const [webUnit, setWebUnit] = useState(null);

  const [dosenQuery, setDosenQuery] = useState("");
  const [dosenFakultas, setDosenFakultas] = useState("Semua fakultas");
  const [dosenDetail, setDosenDetail] = useState(null);

  const [tendikKategori, setTendikKategori] = useState(null);
  const [tendikDetail, setTendikDetail] = useState(null);
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
        d.jabatan.toLowerCase().includes(q) ||
        d.keilmuan.toLowerCase().includes(q);
      const matchFak =
        dosenFakultas === "Semua fakultas" || d.fakultas === dosenFakultas;
      return matchText && matchFak;
    });
  }, [dosenQuery, dosenFakultas]);

  const filteredTendik = useMemo(() => {
    if (!tendikKategori) return [];
    return TENDIK_ITEMS.filter((t) => t.kategori === tendikKategori);
  }, [tendikKategori]);
return (
    <div className="page animate-fade">
      <PageHero
        title="Direktori"
        description="Satu tempat untuk menemukan unit kerja, dosen dan tendik, dokumen, serta lokasi di kampus."
        crumbs={[{ label: "Beranda", to: "/beranda" }, { label: "Direktori" }]}
        photoCaption="Foto: denah kampus"
      />
      <Subnav
        items={[
          { id: "direktori--unit", label: "Unit Kerja" },
          { id: "direktori--dosen", label: "Dosen & Tendik" },
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

      {/* === Dosen & Tendik === */}
      <section className="sec" id="direktori--dosen" data-t="Dosen & Tendik">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Dosen &amp; tendik</span>
              <h2>Cari dosen dan tenaga kependidikan</h2>
              <p>
                Profil publik memuat jabatan, bidang keilmuan, dan unit kerja.
                Data pribadi tidak ditampilkan.
              </p>
            </div>
          </div>

          {/* --- Dosen --- */}
          <div style={{ marginBottom: "40px" }}>
            <div style={{ marginBottom: "16px" }}>
              <span className="eyebrow">Dosen</span>
              <h3 style={{ fontSize: "20px", marginTop: "4px" }}>
                Dosen &amp; kepakaran
              </h3>
            </div>

            <div data-filter>
              <div className="toolbar">
                <div className="field">
                  <label htmlFor="d-q2">Nama atau bidang keilmuan</label>
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
                {filteredDosen.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className="card card-link pimpinan-card"
                    style={{
                      flexDirection: "row",
                      gap: "12px",
                      alignItems: "center",
                    }}
                    onClick={() => setDosenDetail(d)}
                    aria-haspopup="dialog"
                    aria-label={`Lihat profil ${d.name}`}
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
                      <p style={{ fontSize: "13px" }}>
                        {d.jabatan} · {d.keilmuan}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {filteredDosen.length === 0 && (
                <p className="muted" style={{ marginTop: "16px" }}>
                  Tidak ada dosen yang cocok dengan pencarian Anda.
                </p>
              )}
            </div>
          </div>

          {/* --- Tendik --- */}
          <div>
            <div style={{ marginBottom: "16px" }}>
              <span className="eyebrow">Tendik</span>
              <h3 style={{ fontSize: "20px", marginTop: "4px" }}>
                Tenaga kependidikan
              </h3>
              <p className="muted" style={{ marginTop: "4px" }}>
                Ringkasan jumlah tendik per kategori jabatan.
              </p>
            </div>

            <div
              className="grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: "12px",
              }}
            >
              {TENDIK_STATS.map((t) => {
                const active = tendikKategori === t.label;
                return (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() =>
                      setTendikKategori(active ? null : t.label)
                    }
                    aria-pressed={active}
                    style={{
                      textAlign: "left",
                      padding: "18px 20px",
                      borderRadius: "14px",
                      border: active
                        ? "2px solid var(--em-700)"
                        : "1px solid var(--line)",
                      background: active ? "#f1f7f3" : "#fff",
                      cursor: "pointer",
                      boxShadow: active
                        ? "0 0 0 3px rgba(10,107,79,0.15)"
                        : "none",
                    }}
                  >
                    <span
                      className="eyebrow"
                      style={{ display: "block", marginBottom: "10px" }}
                    >
                      {t.label}
                    </span>
                    <b
                      style={{
                        fontSize: "32px",
                        lineHeight: 1.1,
                        color: "var(--em-700)",
                      }}
                    >
                      {t.value}
                    </b>
                  </button>
                );
              })}
            </div>

            {tendikKategori && (
              <div style={{ marginTop: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    marginBottom: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: "17px" }}>
                    {tendikKategori}{" "}
                    <span style={{ color: "var(--muted)", fontWeight: 500 }}>
                      ({filteredTendik.length} nama sampel)
                    </span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setTendikKategori(null)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--em-700)",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Tutup daftar
                  </button>
                </div>
                <div className="grid g2" style={{ gap: "12px" }}>
                  {filteredTendik.length === 0 ? (
                    <p className="muted">Belum ada data untuk kategori ini.</p>
                  ) : (
                    filteredTendik.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        className="card"
                        style={{
                          textAlign: "left",
                          cursor: "pointer",
                          width: "100%",
                          border: "1px solid var(--line)",
                          background: "#fff",
                          padding: "16px 18px",
                        }}
                        onClick={() => setTendikDetail(t)}
                        aria-haspopup="dialog"
                        aria-label={`Profil ${t.name}`}
                      >
                        <b style={{ display: "block", marginBottom: "4px" }}>
                          {t.name}
                        </b>
                        <span style={{ color: "var(--muted)", fontSize: "14px" }}>
                          {t.jabatan} · {t.unit}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
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
      <DosenDrawer dosen={dosenDetail} onClose={() => setDosenDetail(null)} />
      <TendikDrawer tendik={tendikDetail} onClose={() => setTendikDetail(null)} />
    </div>
  );
}
