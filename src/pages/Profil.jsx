import { useEffect, useRef, useState } from "react";
import PageHero from "../components/layout/PageHero.jsx";
import Subnav from "../components/layout/Subnav.jsx";
import Card from "../components/ui/Card.jsx";
import Pill from "../components/ui/Pill.jsx";
import PhotoSlot from "../components/ui/PhotoSlot.jsx";
import Button from "../components/ui/Button.jsx";
import SmartLink from "../components/ui/SmartLink.jsx";
import { ExternalLink, FileDown, X } from "lucide-react";

const PIMPINAN = [
  {
    id: "pimpinan-rektor",
    role: "Rektor",
    name: "[Nama & gelar]",
    desc: "Memimpin penyelenggaraan universitas",
    jabatan: "Rektor Universitas Islam Al-Azhar",
    bidang: "[Bidang tugas]",
    periode: "[tahun]–[tahun]",
    sk: "SK [nomor]",
    bio: "[Profil singkat: latar belakang, fokus kepemimpinan, dan program prioritas periode ini.]",
    units: ["[Unit 1]", "[Unit 2]", "[Unit 3]"],
    edu: [
      "[S3 · universitas · tahun]",
      "[S2 · universitas · tahun]",
      "[S1 · universitas · tahun]",
    ],
  },
  {
    id: "pimpinan-wakil-rektor-i",
    role: "Wakil Rektor I",
    name: "[Nama & gelar]",
    desc: "[Bidang]",
    jabatan: "Wakil Rektor I Universitas Islam Al-Azhar",
    bidang: "[Bidang tugas]",
    periode: "[tahun]–[tahun]",
    sk: "SK [nomor]",
    bio: "[Profil singkat: latar belakang, fokus kepemimpinan, dan program prioritas periode ini.]",
    units: ["[Unit 1]", "[Unit 2]"],
    edu: [
      "[S3 · universitas · tahun]",
      "[S2 · universitas · tahun]",
      "[S1 · universitas · tahun]",
    ],
  },
  {
    id: "pimpinan-wakil-rektor-ii",
    role: "Wakil Rektor II",
    name: "[Nama & gelar]",
    desc: "[Bidang]",
    jabatan: "Wakil Rektor II Universitas Islam Al-Azhar",
    bidang: "[Bidang tugas]",
    periode: "[tahun]–[tahun]",
    sk: "SK [nomor]",
    bio: "[Profil singkat: latar belakang, fokus kepemimpinan, dan program prioritas periode ini.]",
    units: ["[Unit 1]", "[Unit 2]"],
    edu: [
      "[S3 · universitas · tahun]",
      "[S2 · universitas · tahun]",
      "[S1 · universitas · tahun]",
    ],
  },
  {
    id: "pimpinan-wakil-rektor-iii",
    role: "Wakil Rektor III",
    name: "[Nama & gelar]",
    desc: "[Bidang]",
    jabatan: "Wakil Rektor III Universitas Islam Al-Azhar",
    bidang: "[Bidang tugas]",
    periode: "[tahun]–[tahun]",
    sk: "SK [nomor]",
    bio: "[Profil singkat: latar belakang, fokus kepemimpinan, dan program prioritas periode ini.]",
    units: ["[Unit 1]", "[Unit 2]"],
    edu: [
      "[S3 · universitas · tahun]",
      "[S2 · universitas · tahun]",
      "[S1 · universitas · tahun]",
    ],
  },
  {
    id: "pimpinan-wakil-rektor-iv",
    role: "Wakil Rektor IV",
    name: "[Nama & gelar]",
    desc: "[Bidang]",
    jabatan: "Wakil Rektor IV Universitas Islam Al-Azhar",
    bidang: "[Bidang tugas]",
    periode: "[tahun]–[tahun]",
    sk: "SK [nomor]",
    bio: "[Profil singkat: latar belakang, fokus kepemimpinan, dan program prioritas periode ini.]",
    units: ["[Unit 1]", "[Unit 2]"],
    edu: [
      "[S3 · universitas · tahun]",
      "[S2 · universitas · tahun]",
      "[S1 · universitas · tahun]",
    ],
  },
];

// Drawer detail pimpinan — panel geser dari sisi kanan.
function PimpinanDrawer({ person, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!person) return;
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
  }, [person, onClose]);

  if (!person) return null;

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd"
        role="dialog"
        aria-modal="true"
        aria-label={`Profil ${person.role}`}
      >
        <div className="pd-head">
          <span className="eyebrow">{person.role}</span>
          <h3>{person.name}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup profil"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <PhotoSlot
            caption="Foto: potret resmi"
            aria-label="Tempat foto: potret resmi"
            style={{ height: "230px" }}
          />
          <dl className="pd-meta">
            <div>
              <dt>Jabatan</dt>
              <dd>{person.jabatan}</dd>
            </div>
            <div>
              <dt>Bidang</dt>
              <dd>{person.bidang}</dd>
            </div>
            <div>
              <dt>Periode</dt>
              <dd>{person.periode}</dd>
            </div>
            <div>
              <dt>SK pengangkatan</dt>
              <dd>{person.sk}</dd>
            </div>
          </dl>
          <p className="pd-bio">{person.bio}</p>
          <div className="pd-sec">
            <h4>Unit yang dibina</h4>
            <ul className="clean">
              {person.units.map((u, i) => (
                <li key={i} className="pd-row">
                  {u}
                </li>
              ))}
            </ul>
          </div>
          <div className="pd-sec">
            <h4>Pendidikan</h4>
            <ul className="clean">
              {person.edu.map((e, i) => (
                <li key={i} className="pd-row">
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <p className="pd-note">
            Data lengkap mengikuti SK pengangkatan dan CV resmi yang
            dipublikasikan.
          </p>
        </div>
      </div>
    </>
  );
}

// Data dokumen Bagan & SK Struktur Organisasi (Publik · Pusdatin).
const SK_BAGAN = {
  title: "Bagan & SK Struktur Organisasi",
  keterangan: "Rektor - SK [nomor]",
  nomor: "SK [nomor]",
  tanggal: "[tanggal]",
  versi: "[v]",
  status: "Berlaku",
  akses: "Publik",
  riwayat: [
    { versi: "[v terbaru]", desc: "Berlaku sejak [tanggal]" },
    { versi: "[v sebelumnya]", desc: "Diganti setelah evaluasi dan RTM" },
  ],
};

// Drawer bagan & SK — pratinjau dokumen di kiri, detail SK di kanan.
function BaganDrawer({ open, onClose }) {
  const closeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

  if (!open) return null;

  const salinTautan = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard tidak tersedia di perangkat ini.
    }
  };

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd pd--wide"
        role="dialog"
        aria-modal="true"
        aria-label="Bagan & SK Struktur Organisasi"
      >
        <div className="pd-head">
          <span className="eyebrow">Pusdatin · Publik</span>
          <h3>Bagan & SK Struktur Organisasi</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup dokumen"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <div className="pd-doc-grid">
            <div className="pd-doc">
              <img src="/logo.png" alt="Logo UNIZAR" />
              <b>{SK_BAGAN.title}</b>
              <div className="pd-doc-lines" aria-hidden="true">
                <span style={{ width: "88%" }} />
                <span style={{ width: "72%" }} />
                <span style={{ width: "80%" }} />
                <span style={{ width: "62%" }} />
              </div>
              <small>Pratinjau dokumen</small>
            </div>
            <div style={{ display: "grid", gap: "16px", alignContent: "start" }}>
              <dl className="pd-meta">
                <div>
                  <dt>Keterangan</dt>
                  <dd>{SK_BAGAN.keterangan}</dd>
                </div>
                <div>
                  <dt>Nomor</dt>
                  <dd>{SK_BAGAN.nomor}</dd>
                </div>
                <div>
                  <dt>Tanggal penetapan</dt>
                  <dd>{SK_BAGAN.tanggal}</dd>
                </div>
                <div>
                  <dt>Versi</dt>
                  <dd>{SK_BAGAN.versi}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{SK_BAGAN.status}</dd>
                </div>
                <div>
                  <dt>Akses</dt>
                  <dd>{SK_BAGAN.akses}</dd>
                </div>
              </dl>
              <div className="pd-sec">
                <h4>Riwayat versi</h4>
                <ul className="clean">
                  {SK_BAGAN.riwayat.map((r, i) => (
                    <li key={i} className="pd-row pd-versi">
                      <b>{r.versi}</b> {r.desc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="btn-row">
                <Button variant="dark" asButton onClick={() => {}}>
                  <FileDown size={17} strokeWidth={1.9} /> Unduh PDF
                </Button>
                <Button variant="line" asButton onClick={salinTautan}>
                  {copied ? "Tautan disalin ✓" : "Salin tautan"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const TIMELINE = [
  {
    year: "1979",
    desc: "Yayasan Pesantren Luhur Al-Azhar didirikan untuk berperan dalam pendidikan tinggi di NTB.",
  },
  {
    year: "1981",
    desc: "SK Yayasan No. 01/YPLA/1981 tanggal 10 Mei 1981 membentuk Universitas Islam Al-Azhar dengan empat fakultas perintis: Hukum, Pertanian, Teknik, dan Ekonomi.",
  },
  {
    year: "1984",
    desc: "Keempat fakultas memperoleh status terdaftar melalui SK Mendikbud No. 0378/0/1984.",
  },
  {
    year: "1992",
    desc: "Fakultas MIPA dengan Program Studi Biologi resmi terdaftar, menjadi cikal bakal pendidikan kedokteran.",
  },
  {
    year: "2004",
    desc: "Izin penyelenggaraan Program Studi Pendidikan Dokter terbit.",
  },
  {
    year: "2016–2022",
    desc: "Program Studi Akuntansi (2016), Agroekoteknologi (2020), dan Ilmu Komputer (2022) dibuka.",
  },
  {
    year: "2023",
    desc: "Fakultas Agama Islam berdiri dengan Program Studi Ekonomi Syariah dan Manajemen Bisnis Syariah.",
  },
];

const STATS = [
  { value: "7", label: "Fakultas" },
  { value: "12", label: "Program studi" },
  { value: "[n]", label: "Mahasiswa aktif" },
  { value: "[n]", label: "Dosen tetap" },
  { value: "[n]", label: "Alumni" },
  { value: "[n]", label: "Mitra kerja sama" },
  { value: "[n]", label: "Publikasi 3 tahun" },
  { value: "[n]", label: "HKI tercatat" },
  { value: "–", label: "Ketercapaian IKU & IKT", dataKin: "iku" },
  { value: "–", label: "Ketercapaian SDGs", dataKin: "sdg" },
];

const SASARAN = [
  {
    n: "1",
    title:
      "Tercapainya mutu pembelajaran dan lulusan yang memiliki kompetensi tinggi, beriman, berakhlak, dan inovatif",
    perspektif: "Learning & Growth",
  },
  {
    n: "2",
    title: "Tercapainya mutu kemahasiswaan",
    perspektif: "Learning & Growth",
  },
  {
    n: "3",
    title:
      "Tercapainya peningkatan kapasitas dan kapabilitas sumber daya manusia",
    perspektif: "Learning & Growth",
  },
  {
    n: "4",
    title:
      "Tercapainya mutu sarana prasarana dan peningkatan pendapatan serta sistem keuangan yang akuntabel",
    perspektif: "Internal Business Process, Learning & Growth",
  },
  {
    n: "5",
    title:
      "Tercapainya mutu penelitian, publikasi ilmiah, dan pengabdian kepada masyarakat (PkM) yang berbasis riset dan inovasi",
    perspektif: "Learning & Growth",
  },
  {
    n: "6",
    title: "Tercapainya peningkatan kerja sama dalam dan luar negeri",
    perspektif: "Internal Business Process",
  },
  {
    n: "7",
    title:
      "Tercapainya peningkatan mutu tata kelola (good governance) kelembagaan dalam sistem manajemen",
    perspektif: "Internal Business Process",
  },
];

const VM_TABS = [
  { key: "misi", label: "Misi" },
  { key: "tujuan", label: "Tujuan" },
  { key: "sasaran", label: "Sasaran" },
  { key: "strategi", label: "Strategi pencapaian" },
];

const MISI = [
  "Menyelenggarakan Pendidikan dan pembelajaran secara professional yang berwawasan kepariwisataan dalam perkembangan IPTEK.",
  "Menyelenggarakan penelitian berwawasan kepariwisataan yang berkontribusi pada perkembangan IPTEK.",
  "Menyelenggarakan pengabdian kepada masyarakat berwawasan kepariwisataan untuk meningkatkan kesejahteraan masyarakat.",
  "Menyelenggarakan tata Kelola kelembagaan universitas secara professional berdasarkan nilai-nilai Islam.",
  "Mengembangkan Sumber Daya Manusia dan Kerjasama dengan pihak lain secara professional berdasarkan nilai-nilai Islam Rahmatan Lil Alamin.",
];

const TUJUAN = [
  "[Tujuan 1: lulusan yang kompeten, beriman, dan berakhlak]",
  "[Tujuan 2: riset dan inovasi yang bermanfaat]",
  "[Tujuan 3: pengabdian yang memberdayakan masyarakat NTB]",
  "[Tujuan 4: tata kelola yang baik dan kemitraan yang luas]",
];

const SDG_CARDS = [
  {
    num: "03",
    title: "Kesehatan & Kesejahteraan",
    desc: "Pendidikan dokter, pengabdian posyandu, dan kemitraan rumah sakit.",
  },
  {
    num: "04",
    title: "Pendidikan Berkualitas",
    desc: "Kurikulum berbasis luaran, beasiswa, dan akses pendidikan tinggi.",
  },
  {
    num: "08",
    title: "Pekerjaan Layak & Pertumbuhan Ekonomi",
    desc: "Kewirausahaan mahasiswa dan kemitraan UMKM halal.",
  },
  {
    num: "14",
    title: "Ekosistem Lautan",
    desc: "Riset biologi laut dan konservasi pesisir Lombok.",
  },
  {
    num: "17",
    title: "Kemitraan untuk Mencapai Tujuan",
    desc: "Kerja sama nasional dan internasional lintas prodi.",
  },
];

export default function Profil() {
  const [tab, setTab] = useState(0);
  const [pimpinan, setPimpinan] = useState(null);
  const [baganOpen, setBaganOpen] = useState(false);

  return (
    <div className="page animate-fade">
      <PageHero
        title="Mengenal UNIZAR"
        description="Universitas Islam di jantung Kota Mataram yang tumbuh bersama masyarakat Nusa Tenggara Barat sejak 1981."
        crumbs={[{ label: "Beranda", to: "/beranda" }, { label: "Profil" }]}
        photoCaption="Foto: Gedung Rektorat UNIZAR"
      />
      <Subnav
        items={[
          { id: "profil--tentang", label: "Tentang UNIZAR" },
          { id: "profil--sejarah", label: "Sejarah" },
          { id: "profil--pimpinan", label: "Pimpinan & Organisasi" },
          { id: "profil--angka", label: "Dalam Angka" },
          { id: "profil--sdgs", label: "UNIZAR untuk SDGs" },
        ]}
      />

      {/* === Tentang UNIZAR === */}
      <section className="sec" id="profil--tentang" data-t="Tentang UNIZAR">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Sambutan Rektor</span>
              <h2>Selamat datang di Universitas Islam Al-Azhar</h2>
            </div>
          </div>
          <div className="split">
            <div
              style={{
                display: "grid",
                gap: "16px",
                fontSize: "17px",
                maxWidth: "66ch",
              }}
            >
              <p>
                <i>Assalamu&apos;alaikum warahmatullahi wabarakatuh.</i>
              </p>
              <p>
                Empat puluh lima tahun lalu, UNIZAR lahir dari satu kegelisahan:
                anak-anak muda Nusa Tenggara Barat harus pergi jauh untuk
                kuliah. Para pendiri memilih membangun kampus di sini, di tanah
                sendiri.
              </p>
              <p>
                Semangat itu yang kami jaga sampai hari ini. Kami ingin setiap
                lulusan UNIZAR menguasai ilmunya, jujur dalam bekerja, dan
                pulang membawa manfaat bagi kampung halamannya. Itulah makna{" "}
                <i>rahmatan lil &apos;alamin</i> bagi kami.
              </p>
              <p>
                Melalui website ini, kami membuka diri seluas-luasnya: program
                studi, riset, layanan, laporan, dan dokumen tata kelola. Silakan
                menjelajah, dan sampaikan masukan Anda kepada kami.
              </p>
              <p>
                <b>Dr. Ir. Muh. Ansyar, MP.</b>
                <br />
                <span className="muted">Rektor Universitas Islam Al-Azhar</span>
              </p>
            </div>
            <div
              style={{ display: "grid", gap: "16px", alignContent: "start" }}
            >
              <PhotoSlot
                caption="Foto: potret Rektor"
                aria-label="Tempat foto: potret Rektor"
                style={{ height: "340px" }}
              />
            </div>
          </div>

          <div className="vm">
            <div className="vm-visi">
              <span className="eyebrow">Visi</span>
              <p>
                Menjadi Universitas terkemuka dalam pengembangan ilmu
                pengetahuan dan teknologi (IPTEK) berwawasan kepariwisataan yang
                professional dan berintegritas berdasarkan nilai Islam Rahmatan
                Lil Alamin.
              </p>
            </div>
            <div className="vm-tabs">
              <div
                className="tabs-l"
                role="tablist"
                aria-label="Misi, tujuan, sasaran, dan strategi"
              >
                {VM_TABS.map((t, i) => (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    aria-selected={i === tab}
                    onClick={() => setTab(i)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Panel: Misi */}
              {tab === 0 && (
                <div role="tabpanel">
                  <ol className="vm-list">
                    {MISI.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Panel: Tujuan */}
              {tab === 1 && (
                <div role="tabpanel">
                  <ol className="vm-list">
                    {TUJUAN.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Panel: Sasaran */}
              {tab === 2 && (
                <div role="tabpanel">
                  <p className="muted" style={{ marginBottom: "12px" }}>
                    Sasaran strategis Renstra UNIZAR 2026–2027 (SK Rektor No.
                    076B/SK/REK/UNIZAR-012/III/2026).
                  </p>
                  <ol className="vm-sas">
                    {SASARAN.map((s) => (
                      <li key={s.n}>
                        <span className="vm-n">{s.n}</span>
                        <div>
                          <b>{s.title}</b>
                          <small>{s.perspektif}</small>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Panel: Strategi pencapaian */}
              {tab === 3 && (
                <div role="tabpanel">
                  <div className="vm-str">
                    <div>
                      <span className="eyebrow">Jangka panjang · 25 tahun</span>
                      <b>Rencana Induk Pengembangan 2025–2045</b>
                      <p>
                        [Tahapan besar menuju visi: penguatan mutu, daya saing,
                        dan rekognisi internasional.]
                      </p>
                    </div>
                    <div>
                      <span className="eyebrow">Jangka menengah · 5 tahun</span>
                      <b>Rencana Strategis</b>
                      <p>
                        [Strategi per sasaran strategis beserta indikator
                        kinerja dan targetnya.]
                      </p>
                    </div>
                    <div>
                      <span className="eyebrow">Jangka pendek · 1 tahun</span>
                      <b>Rencana Kerja & Anggaran Tahunan</b>
                      <p>
                        [Program kerja unit yang diturunkan dari Renstra dan
                        dipantau tiap triwulan.]
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* === Sejarah === */}
      <section className="sec" id="profil--sejarah" data-t="Sejarah">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Sejarah</span>
              <h2>Perjalanan sejak 1981</h2>
              <p>
                Disusun dari dokumen sejarah institusi. Setiap tonggak dapat
                ditautkan ke SK aslinya.
              </p>
            </div>
          </div>
          <ul className="clean tl">
            {TIMELINE.map((t) => (
              <li key={t.year}>
                <b>{t.year}</b>
                <p>{t.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* === Pimpinan & Organisasi === */}
      <section
        className="sec"
        id="profil--pimpinan"
        data-t="Pimpinan & Organisasi"
      >
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Pimpinan</span>
              <h2>Pimpinan universitas</h2>
            </div>
          </div>
          <div className="grid g5">
            {PIMPINAN.map((p) => (
              <button
                key={p.id}
                type="button"
                className="card card-link pimpinan-card"
                style={{ padding: 0, overflow: "hidden" }}
                onClick={() => setPimpinan(p)}
                aria-haspopup="dialog"
                aria-label={`Lihat profil lengkap ${p.role}`}
              >
                <PhotoSlot
                  caption="Foto: potret resmi"
                  aria-label="Tempat foto: potret resmi"
                  style={{ height: "190px", borderRadius: 0 }}
                />
                <div style={{ padding: "16px 18px" }}>
                  <span className="eyebrow">{p.role}</span>
                  <h3 style={{ fontSize: "17px", marginTop: "4px" }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: "13.5px" }}>{p.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="slim" style={{ marginTop: "20px" }}>
            <p>
              Struktur organisasi serta tugas dan fungsi setiap unit tersedia
              lengkap.
            </p>
            <div className="btn-row">
              <Button
                variant="line"
                asButton
                onClick={() => setBaganOpen(true)}
                aria-haspopup="dialog"
              >
                Bagan &amp; SK organisasi
              </Button>
              <Button variant="line" href="/direktori#unit">
                Direktori unit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* === Dalam Angka === */}
      <section className="sec" id="profil--angka" data-t="Dalam Angka">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Fakta ringkas</span>
              <h2>UNIZAR dalam Angka</h2>
              <p>
                Angka ditarik otomatis dari PD Dikti dan sistem internal,
                lengkap dengan tanggal pembaruan.
              </p>
            </div>
          </div>
          <div className="stats s5">
            {STATS.map((s, i) => (
              <div key={i} className="stat" data-kin-year={s.dataKin}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <p className="note" style={{ marginTop: "14px" }}>
            Setiap angka menampilkan sumber dan tanggal pembaruan saat disentuh,
            misalnya &quot;PD Dikti · 1 Okt 2026&quot;. Ketercapaian IKU &amp;
            IKT dan SDGs diperbarui sekali setahun dari laporan kinerja tahunan.
          </p>
        </div>
      </section>

      {/* === UNIZAR untuk SDGs === */}
      <section className="sec" id="profil--sdgs" data-t="UNIZAR untuk SDGs">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Keberlanjutan</span>
              <h2>Kontribusi pada Sustainable Development Goals</h2>
              <p>
                Lima SDGs yang kami tekuni sesuai Keputusan Rektor tentang
                Implementasi SDGs.
              </p>
            </div>
          </div>
          <div className="grid g3">
            {SDG_CARDS.map((s) => (
              <Card key={s.num} flat>
                <Pill variant="default">SDG {s.num}</Pill>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PimpinanDrawer person={pimpinan} onClose={() => setPimpinan(null)} />
      <BaganDrawer open={baganOpen} onClose={() => setBaganOpen(false)} />
    </div>
  );
}
