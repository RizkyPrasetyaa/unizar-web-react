import { useState } from "react";
import PageHero from "../components/layout/PageHero.jsx";
import Subnav from "../components/layout/Subnav.jsx";
import Card from "../components/ui/Card.jsx";
import Pill from "../components/ui/Pill.jsx";
import Button from "../components/ui/Button.jsx";
import SmartLink from "../components/ui/SmartLink.jsx";
import { ExternalLink } from "lucide-react";

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
  },
  {
    id: "doc:beasiswa-prestasi-tahfidz",
    title: "Beasiswa prestasi & tahfidz",
    small: "Universitas",
  },
  {
    id: "doc:keringanan-ukt",
    title: "Keringanan UKT",
    small: "Bagi mahasiswa terdampak ekonomi",
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

const KURIKULUM = [
  {
    pill: "Kebijakan",
    title: "Kurikulum berbasis luaran (OBE)",
    desc: "Disusun bersama pengguna lulusan dan dievaluasi berkala.",
  },
  {
    pill: "MBKM",
    title: "Merdeka Belajar (MBKM)",
    desc: "Minimal 10 sks di luar prodi: magang, proyek desa, riset, atau pertukaran.",
  },
  {
    pill: "RPL",
    title: "Rekognisi Pembelajaran Lampau",
    desc: "Pengalaman kerja dan pelatihan diakui sebagai sks.",
  },
  {
    pill: "Layanan",
    title: "E-learning",
    desc: "Kelas daring, bahan ajar, dan forum diskusi untuk semua mata kuliah.",
  },
  {
    pill: "Integritas",
    title: "Pendidikan antikorupsi",
    desc: "Nilai integritas terintegrasi di setiap kurikulum prodi.",
  },
  {
    pill: "Mutu",
    title: "Evaluasi pembelajaran",
    desc: "Hasil evaluasi dosen oleh mahasiswa dan tindak lanjutnya.",
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

export default function Pendidikan() {
  const [openFaq, setOpenFaq] = useState(null);

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
              <Card key={j.pill} to="#">
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
                    <SmartLink to="#">Lihat dokumen →</SmartLink>
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
                  <Button variant="pri" href="#">
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
              <Card key={k.title} to="#">
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
              <Card key={s.title} to="#">
                <Pill>{s.pill}</Pill>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="more">Selengkapnya →</span>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
