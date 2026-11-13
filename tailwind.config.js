/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Emerald — warna utama UNIZAR
        em: {
          50: '#F1F7F3',
          100: '#E3F1EA',
          500: '#2F8F6B',
          700: '#0A6B4F',
          800: '#064E3B',
          900: '#053B2C',
          950: '#03291F',
        },
        // Netral
        paper: '#F7FAF8',
        surface: '#FFFFFF',
        ink: '#13231C',
        muted: '#4A5E55',
        line: '#DCE6E0',
        // Gold
        gold: {
          DEFAULT: '#F2C230',
          soft: '#FFF4CF',
          ink: '#6B4E00',
        },
        // Red
        brand: {
          red: '#C1272D',
          'red-soft': '#FBE7E8',
          'red-ink': '#8E1B20',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Segoe UI', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Segoe UI', 'system-ui', 'sans-serif'],
        arab: ['Amiri', '"Traditional Arabic"', 'serif'],
      },
      // Sistem radius konsisten di seluruh situs:
      //   rounded-r     (14px) — cards, buttons, inputs, chips, icon badges
      //   rounded-r-lg  (22px) — panels, banners, modal search, big stat grid
      //   rounded-full         — pills / chip buttons (intentional pill shape)
      // Hindari rounded-xl (12), rounded-[10px], rounded-[13px], dll.
      borderRadius: {
        r: '14px',
        'r-lg': '22px',
      },
      maxWidth: {
        wrap: '1200px',
      },
      boxShadow: {
        mega: '0 24px 40px -18px rgba(5, 59, 44, 0.28)',
        rail: '0 12px 30px -10px rgba(3, 41, 31, 0.5)',
        card: '0 14px 28px -16px rgba(5, 59, 44, 0.35)',
        search: '0 30px 60px -20px rgba(0, 0, 0, 0.4)',
      },
      keyframes: {
        drop: {
          from: { transform: 'translateY(-6px)', opacity: '0.6' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fade: {
          from: { transform: 'translateY(8px)' },
          to: { transform: 'translateY(0)' },
        },
        slide: {
          from: { transform: 'translateX(-30px)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        drop: 'drop 0.18s ease-out',
        fade: 'fade 0.35s ease-out',
        slide: 'slide 0.22s ease-out',
      },
    },
  },
  plugins: [],
}
