import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Font: Plus Jakarta Sans — imported via JS for reliable loading in both dev & build.
// This ensures the @font-face rules are always injected, fixing font rendering
// in mega menu, Fakultas page, and all other components.
import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'
import '@fontsource/plus-jakarta-sans/800.css'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
