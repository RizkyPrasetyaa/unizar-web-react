import { useEffect, useRef, useState } from "react";
import PageHero from "../components/layout/PageHero.jsx";
import Subnav from "../components/layout/Subnav.jsx";
import Card from "../components/ui/Card.jsx";
import Pill from "../components/ui/Pill.jsx";
import Button from "../components/ui/Button.jsx";
import SmartLink from "../components/ui/SmartLink.jsx";
import { toHref } from "../lib/router.js";
import { ExternalLink, FileDown, X } from "lucide-react";

const JALUR_PMB = [
  {
    pill: "Reguler",
    variant: "default",
    desc: "Seleksi tes potensi akademik daring.",
  },
  {
    pill: "Prestasi",
    variant: "gold",
    desc: "Rapor dan prestasi akademik atau non-akademik.",
  },
  {
    pill: "KIP-Kuliah",
    variant: "default",
    desc: "Untuk calon mahasiswa kurang mampu dan daerah 3T.",
  },
  {
    pill: "RPL",
    variant: "gold",
    desc: "Pengalaman kerja diakui sebagai sks.",
  },
  {
    pill: "Pindahan",
    variant: "default",
    desc: "Alih kredit dari perguruan tinggi lain.",
  },
];

const BEASISWA = [
  {
    id: "doc:kip-kuliah",
    title: "KIP-Kuliah",
    small: "Pemerintah · biaya pendidikan dan hidup",
    keterangan:
      "Bantuan biaya pendidikan dan biaya hidup dari pemerintah pusat bagi mahasiswa kurang mampu.",
    nomor: "SK [nomor]",
    tanggal: "[tanggal]",
    versi: "[v]",
    status: "Berlaku",
    akses: "Publik",
    riwayat: [
      { versi: "v1.0", desc: "[tanggal] — berlaku sejak versi awal." },
      {
        versi: "v0.9",
        desc: "[tanggal] — versi lama, digantikan setelah evaluasi dan RTM.",
      },
    ],
  },
  {
    id: "doc:beasiswa-3t-afirmasi",
    title: "Beasiswa afirmasi 3T",
    small: "Universitas · keringanan UKT bagi mahasiswa dari daerah 3T",
    keterangan:
      "Keringanan UKT dari universitas bagi mahasiswa yang berasal dari daerah tertinggal, terdepan, dan terluar (3T).",
    nomor: "SK [nomor]",
    tanggal: "[tanggal]",
    versi: "[v]",
    status: "Berlaku",
    akses: "Publik",
    riwayat: [
      { versi: "v1.0", desc: "[tanggal] — berlaku sejak versi awal." },
      {
        versi: "v0.9",
        desc: "[tanggal] — versi lama, digantikan setelah evaluasi dan RTM.",
      },
    ],
  },
  {
    id: "doc:beasiswa-prestasi-tahfidz",
    title: "Beasiswa prestasi & tahfidz",
    small: "Universitas",
    keterangan:
      "Beasiswa internal universitas untuk mahasiswa berprestasi akademik atau hafidz Al-Qur'an.",
    nomor: "SK [nomor]",
    tanggal: "[tanggal]",
    versi: "[v]",
    status: "Berlaku",
    akses: "Publik",
    riwayat: [
      { versi: "v1.0", desc: "[tanggal] — berlaku sejak versi awal." },
      {
        versi: "v0.9",
        desc: "[tanggal] — versi lama, digantikan setelah evaluasi dan RTM.",
      },
    ],
  },
  {
    id: "doc:keringanan-ukt",
    title: "Keringanan UKT",
    small: "Bagi mahasiswa terdampak ekonomi",
    keterangan:
      "Keringanan UKT bagi mahasiswa yang mengalami kendala ekonomi karena musibah, PHK, atau kondisi lain.",
    nomor: "SK [nomor]",
    tanggal: "[tanggal]",
    versi: "[v]",
    status: "Berlaku",
    akses: "Publik",
    riwayat: [
      { versi: "v1.0", desc: "[tanggal] — berlaku sejak versi awal." },
      {
        versi: "v0.9",
        desc: "[tanggal] — versi lama, digantikan setelah evaluasi dan RTM.",
      },
    ],
  },
];

const FAQ = [
  {
    q: "Berapa biaya kuliah per semester?",
    a: "Biaya berbeda per prodi. Gunakan simulasi biaya di portal PMB dan cek peluang beasiswa.",
  },
  {
    q: "Apakah penyandang disabilitas bisa mendaftar?",
    a: "Bisa. Unit layanan disabilitas mendampingi sejak pendaftaran, termasuk akomodasi saat seleksi.",
  },
  {
    q: "Saya sudah bekerja. Bisakah kuliah lebih singkat?",
    a: "Melalui jalur RPL, pengalaman kerja yang relevan dapat diakui sebagai sks.",
  },
];

// Dokumen kurikulum — detail SK muncul di drawer saat kartu terkait diklik.
// Placeholder [nomor]/[tanggal]/[v] diisi operator website ketika SK tersedia.
const DOK_OBE = {
  id: "doc:pedoman-kurikulum-obe",
  title: "Pedoman Kurikulum OBE",
  keterangan: "Wakil Rektor I - SK [nomor]",
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

const DOK_ANTIKORUPSI = {
  id: "doc:pedoman-pendidikan-antikorupsi",
  title: "Pedoman Pendidikan Antikorupsi",
  keterangan: "SK [nomor]",
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

const KURIKULUM = [
  {
    pill: "Kebijakan",
    title: "Kurikulum berbasis luaran (OBE)",
    desc: "Disusun bersama pengguna lulusan dan dievaluasi berkala.",
    action: "doc",
    doc: DOK_OBE,
  },
  {
    pill: "MBKM",
    title: "Merdeka Belajar (MBKM)",
    desc: "Minimal 10 sks di luar prodi: magang, proyek desa, riset, atau pertukaran.",
    action: "info",
  },
  {
    pill: "RPL",
    title: "Rekognisi Pembelajaran Lampau",
    desc: "Pengalaman kerja dan pelatihan diakui sebagai sks.",
    action: "sierra",
  },
  {
    pill: "Layanan",
    title: "E-learning",
    desc: "Kelas daring, bahan ajar, dan forum diskusi untuk semua mata kuliah.",
    action: "info",
  },
  {
    pill: "Integritas",
    title: "Pendidikan antikorupsi",
    desc: "Nilai integritas terintegrasi di setiap kurikulum prodi.",
    action: "doc",
    doc: DOK_ANTIKORUPSI,
  },
  {
    pill: "Mutu",
    title: "Evaluasi pembelajaran",
    desc: "Hasil evaluasi dosen oleh mahasiswa dan tindak lanjutnya.",
    action: "link",
    linkTo: "/penjaminan-mutu#dokumen",
  },
];

const KALENDER = [
  {
    month: "AGU",
    title: "Awal semester ganjil",
    small: "Perkuliahan dimulai",
    bg: "var(--em-700)",
  },
  {
    month: "OKT",
    title: "Ujian tengah semester",
    small: "Semua prodi",
    bg: "var(--em-800)",
  },
  {
    month: "DES",
    title: "Wisuda periode II",
    small: "Aula utama",
    bg: "#8A6A10",
  },
  {
    month: "JAN",
    title: "Ujian akhir semester",
    small: "Semester ganjil",
    bg: "var(--em-900)",
  },
  {
    month: "FEB",
    title: "Awal semester genap",
    small: "Pengisian KRS",
    bg: "var(--em-700)",
  },
];

const SUASANA = [
  {
    pill: "Agenda",
    title: "Kuliah umum & seminar",
    desc: "Agenda terbuka untuk umum setiap bulan.",
  },
  {
    pill: "Pedoman",
    title: "Integritas akademik",
    desc: "Pemeriksaan kemiripan karya ilmiah dan pedoman antiplagiarisme.",
  },
  {
    pill: "Komunitas",
    title: "Kelompok studi",
    desc: "Forum diskusi lintas prodi yang dikelola mahasiswa.",
  },
];

// Drawer "menuju sistem lain" — konfirmasi sebelum buka sistem eksternal
// di tab baru. Dipakai untuk Portal PMB dan SIERRA (RPL).
const PORTAL_PMB_URL = ""; // diisi operator website ketika sudah tersedia
const PORTAL_PMB_DESC =
  "Portal PMB UNIZAR berisi pendaftaran, pembayaran, tes seleksi, dan pengumuman calon mahasiswa baru.";

const SIERRA_URL = ""; // diisi operator website ketika sudah tersedia
const SIERRA_DESC =
  "SIERRA adalah sistem nasional rekognisi pembelajaran lampau (RPL) untuk pendaftaran jalur RPL.";

function SystemDrawer({ open, title, desc, url, onClose }) {
  const closeRef = useRef(null);

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

  const alamat = url || "[alamat diisi operator website]";

  const bukaTabBaru = () => {
    if (url) window.open(url, "_blank", "noreferrer");
  };

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="pd-head">
          <span className="eyebrow">Menuju sistem lain</span>
          <h3>{title}</h3>
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
          <p className="pd-bio">{desc}</p>
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

// Drawer detail kartu kurikulum — info ringkas program/kebijakan.
// Muncul saat klik kartu pada section "Kurikulum & Pembelajaran"
// yang tidak punya aksi khusus (RPL → SIERRA, OBE & Antikorupsi →
// drawer dokumen, Evaluasi pembelajaran → halaman Penjaminan Mutu).
function KurikulumDrawer({ kartu, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!kartu) return;
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
  }, [kartu, onClose]);

  if (!kartu) return null;

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="pd"
        role="dialog"
        aria-modal="true"
        aria-label={kartu.title}
      >
        <div className="pd-head">
          <span className="eyebrow">Kurikulum &amp; pembelajaran</span>
          <h3>{kartu.title}</h3>
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
          <span className="pill">{kartu.pill}</span>
          <p className="pd-bio">{kartu.desc}</p>
          <div className="pd-sec">
            <h4>Informasi lengkap</h4>
            <p className="pd-note">
              Rincian kebijakan, prosedur, dan dokumen terkait akan diisi
              operator website. Untuk sementara, informasi singkat di atas
              merupakan ringkasan program.
            </p>
          </div>
          <div className="btn-row">
            <Button variant="line" asButton onClick={onClose}>
              Tutup
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// Drawer detail dokumen — pratinjau dokumen di kiri, detail SK di kanan.
// Pola sama dengan BaganDrawer di Profil.jsx biar konsisten. Dipakai untuk
// dokumen beasiswa dan dokumen kurikulum (Pedoman OBE & Antikorupsi).
function DocDrawer({ doc, onClose }) {
  const closeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!doc) return;
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
  }, [doc, onClose]);

  if (!doc) return null;

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
        aria-label={`Dokumen ${doc.title}`}
      >
        <div className="pd-head">
          <span className="eyebrow">Pusdatin · Publik</span>
          <h3>{doc.title}</h3>
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
              <b>{doc.title}</b>
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
                  <dd>{doc.keterangan}</dd>
                </div>
                <div>
                  <dt>Nomor</dt>
                  <dd>{doc.nomor}</dd>
                </div>
                <div>
                  <dt>Tanggal penetapan</dt>
                  <dd>{doc.tanggal}</dd>
                </div>
                <div>
                  <dt>Versi</dt>
                  <dd>{doc.versi}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{doc.status}</dd>
                </div>
                <div>
                  <dt>Akses</dt>
                  <dd>{doc.akses}</dd>
                </div>
              </dl>
              <div className="pd-sec">
                <h4>Riwayat versi</h4>
                <ul className="clean">
                  {doc.riwayat.map((r, i) => (
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

export default function Pendidikan() {
  const [openFaq, setOpenFaq] = useState(null);
  const [openPmb, setOpenPmb] = useState(false);
  const [openSierra, setOpenSierra] = useState(false);
  const [kurikulumDetail, setKurikulumDetail] = useState(null);
  const [docDetail, setDocDetail] = useState(null);

  const handleKurikulumClick = (k) => {
    if (k.action === "sierra") {
      setOpenSierra(true);
    } else if (k.action === "doc") {
      setDocDetail(k.doc);
    } else if (k.action === "link") {
      window.location.hash = toHref(k.linkTo).replace(/^#/, "");
    } else {
      setKurikulumDetail(k);
    }
  };

  return (
    <div className="page animate-fade">
      <PageHero
        title="Pendidikan"
        description="Dari pendaftaran, perkuliahan, sampai wisuda. Semua yang perlu Anda ketahui tentang belajar di UNIZAR."
        crumbs={[{ label: "Beranda", to: "/beranda" }, { label: "Pendidikan" }]}
        photoCaption="Foto: perkuliahan di kelas"
      />
      <Subnav
        items={[
          { id: "pendidikan--penerimaan", label: "Penerimaan & Beasiswa" },
          { id: "pendidikan--kurikulum", label: "Kurikulum & Pembelajaran" },
          { id: "pendidikan--kalender", label: "Kalender & Panduan" },
          { id: "pendidikan--suasana", label: "Suasana Akademik" },
        ]}
      />

      {/* === Penerimaan & Beasiswa === */}
      <section
        className="sec"
        id="pendidikan--penerimaan"
        data-t="Penerimaan & Beasiswa"
      >
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">PMB 2027</span>
              <h2>Penerimaan mahasiswa baru</h2>
              <p>
                Terbuka untuk semua, tanpa membedakan suku, agama, asal daerah,
                maupun disabilitas.
              </p>
            </div>
          </div>

          <div
            className="grid g4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
          >
            {JALUR_PMB.map((j) => (
              <Card
                key={j.pill}
                onClick={() => setOpenPmb(true)}
                style={{ cursor: "pointer" }}
              >
                <Pill variant={j.variant}>{j.pill}</Pill>
                <p>{j.desc}</p>
                <span className="more">Daftar jalur ini →</span>
              </Card>
            ))}
          </div>

          <div className="split" style={{ marginTop: "22px" }}>
            <Card>
              <h3>Beasiswa &amp; keringanan</h3>
              <ul
                className="clean"
                style={{ display: "grid", gap: "14px", marginTop: "14px" }}
              >
                {BEASISWA.map((b) => (
                  <li
                    key={b.id}
                    className="doc"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <b>{b.title}</b>
                      <small
                        style={{
                          display: "block",
                          color: "var(--muted)",
                          fontSize: "13px",
                        }}
                      >
                        {b.small}
                      </small>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDocDetail(b)}
                      style={{
                        border: 0,
                        background: "transparent",
                        padding: 0,
                        font: "inherit",
                        color: "#0a6b4f",
                        fontWeight: 700,
                        fontSize: "14px",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                      className="weblink"
                    >
                      Lihat dokumen →
                    </button>
                  </li>
                ))}
              </ul>
            </Card>

            <div style={{ display: "grid", gap: "14px" }}>
              <div
                className="band"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h2>Siap mendaftar?</h2>
                  <p>
                    Pendaftaran, pembayaran, dan pengumuman sepenuhnya daring.
                  </p>
                </div>
                <div className="btn-row">
                  <Button variant="pri" asButton onClick={() => setOpenPmb(true)}>
                    Daftar Sekarang{" "}
                    <ExternalLink
                      style={{ width: 16, height: 16 }}
                      aria-hidden="true"
                    />
                  </Button>
                  <Button variant="ghost" href="#">
                    Simulasi biaya
                  </Button>
                </div>
              </div>

              <div style={{ display: "grid", gap: "10px" }}>
                {FAQ.map((f, i) => (
                  <div
                    key={i}
                    className="faq"
                    style={{
                      background: "#f1f7f3",
                      borderRadius: "14px",
                      padding: "14px 18px",
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={openFaq === i}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "12px",
                        background: "transparent",
                        border: 0,
                        textAlign: "left",
                        fontWeight: 700,
                        color: "var(--ink)",
                        fontSize: "15px",
                        padding: 0,
                      }}
                    >
                      <span>{f.q}</span>
                      <span
                        aria-hidden="true"
                        style={{ flex: "none", fontWeight: 800 }}
                      >
                        {openFaq === i ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === i && (
                      <p
                        style={{
                          marginTop: "10px",
                          color: "var(--muted)",
                          fontSize: "14.5px",
                        }}
                      >
                        {f.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Kurikulum & Pembelajaran === */}
      <section
        className="sec"
        id="pendidikan--kurikulum"
        data-t="Kurikulum & Pembelajaran"
      >
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Pembelajaran</span>
              <h2>Kurikulum &amp; pembelajaran</h2>
            </div>
          </div>
          <div className="grid g3">
            {KURIKULUM.map((k) => (
              <Card
                key={k.title}
                onClick={() => handleKurikulumClick(k)}
                style={{ cursor: "pointer" }}
              >
                <Pill>{k.pill}</Pill>
                <h3>{k.title}</h3>
                <p>{k.desc}</p>
                <span className="more">Selengkapnya →</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* === Kalender & Panduan === */}
      <section
        className="sec"
        id="pendidikan--kalender"
        data-t="Kalender & Panduan"
      >
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Kalender</span>
              <h2>Kalender akademik 2026/2027</h2>
            </div>
          </div>
          <div
            className="ppepp"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "14px",
            }}
          >
            {KALENDER.map((k) => (
              <div
                key={k.month}
                style={{
                  background: k.bg,
                  color: "#fff",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  display: "grid",
                  gap: "4px",
                }}
              >
                <b style={{ fontSize: "22px", letterSpacing: "0.04em" }}>
                  {k.month}
                </b>
                <span style={{ fontWeight: 700, fontSize: "15px" }}>
                  {k.title}
                </span>
                <small
                  style={{ color: "rgba(255,255,255,0.78)", fontSize: "13px" }}
                >
                  {k.small}
                </small>
              </div>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: "18px" }}>
            <Button variant="line" href="#">
              Kalender lengkap (PDF)
            </Button>
            <Button variant="line" href="#">
              Panduan akademik
            </Button>
          </div>
        </div>
      </section>

      {/* === Suasana Akademik === */}
      <section
        className="sec"
        id="pendidikan--suasana"
        data-t="Suasana Akademik"
      >
        <div className="wrap">
          <div className="sec-h">
            <div>
              <span className="eyebrow">Kehidupan akademik</span>
              <h2>Suasana akademik</h2>
              <p>
                Kebebasan akademik dan mimbar akademik dijalankan dengan
                menjunjung integritas.
              </p>
            </div>
          </div>
          <div className="grid g3">
            {SUASANA.map((s) => (
              <Card key={s.title} style={{ cursor: "pointer" }}>
                <Pill>{s.pill}</Pill>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="more">Selengkapnya →</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SystemDrawer
        open={openPmb}
        title="Portal PMB UNIZAR"
        desc={PORTAL_PMB_DESC}
        url={PORTAL_PMB_URL}
        onClose={() => setOpenPmb(false)}
      />
      <SystemDrawer
        open={openSierra}
        title="SIERRA"
        desc={SIERRA_DESC}
        url={SIERRA_URL}
        onClose={() => setOpenSierra(false)}
      />
      <KurikulumDrawer
        kartu={kurikulumDetail}
        onClose={() => setKurikulumDetail(null)}
      />
      <DocDrawer doc={docDetail} onClose={() => setDocDetail(null)} />
    </div>
  );
}
