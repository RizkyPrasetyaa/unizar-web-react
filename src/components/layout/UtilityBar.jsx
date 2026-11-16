import SmartLink from "../ui/SmartLink.jsx";
import { Search } from "lucide-react";

// UtilityBar — bar hitam paling atas (di atas header)
export default function UtilityBar({ onOpenSearch }) {
  return (
    <div className="bg-em-900 text-[#DCEFE5] text-[13px]">
      <div className="wrap flex items-center justify-between gap-4 min-h-[38px]">
        <div className="hidden md:flex items-center gap-[18px] flex-wrap">
          <span className="text-[11px] font-bold tracking-[0.14em] text-[#9CC9B3]">
            UNIVERSITAS ISLAM AL-AZHAR
          </span>
        </div>

        <div className="flex items-center gap-[18px] flex-wrap ml-auto">
          <SmartLink
            to="/pendidikan#penerimaan"
            className="hidden md:inline-block bg-red-600 hover:bg-red-700 !text-white hover:!text-white font-semibold px-4 py-1.5 rounded-lg transition-colors shadow-sm"
          >
            PMB
          </SmartLink>
          <SmartLink
            to="/mahasiswa-alumni#alumni"
            className="hidden lg:inline !text-white hover:!text-white hover:!underline"
          >
            Karir
          </SmartLink>
          <SmartLink
            to="/berita"
            className="hidden lg:inline !text-white hover:!text-white hover:!underline"
          >
            Berita
          </SmartLink>
          <SmartLink
            to="/tata-kelola#ppid"
            className="hidden lg:inline !text-white hover:!text-white hover:!underline"
          >
            PPID
          </SmartLink>
          <SmartLink
            to="/pusdatin#jdih"
            className="hidden lg:inline !text-white hover:!text-white hover:!underline"
          >
            JDIH
          </SmartLink>
          <SmartLink
            to="/direktori#kontak"
            className="hidden lg:inline !text-white hover:!text-white hover:!underline"
          >
            Kontak
          </SmartLink>

          <button
            type="button"
            onClick={onOpenSearch}
            className="hidden md:inline-flex items-center gap-1.5 border-0 bg-white/10 text-white px-3 py-1.5 rounded-full text-[13px] hover:bg-white/20 transition-colors"
            aria-label="Buka pencarian"
          >
            <Search size={16} strokeWidth={1.9} />
            <span>Cari</span>
          </button>

          <div
            className="inline-flex border border-white/30 rounded-full overflow-hidden"
            role="group"
            aria-label="Bahasa"
          >
            <button
              type="button"
              className="border-0 bg-transparent text-[#DCEFE5] px-2.5 py-1 text-xs font-bold aria-[pressed=true]:bg-gold aria-[pressed=true]:text-em-950"
              aria-pressed="true"
            >
              ID
            </button>
            <button
              type="button"
              className="border-0 bg-transparent text-[#DCEFE5] px-2.5 py-1 text-xs font-bold aria-[pressed=true]:bg-gold aria-[pressed=true]:text-em-950"
              aria-pressed="false"
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
