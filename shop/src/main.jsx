import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router.jsx'

// Bootstrap CSS, Icons, JS
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>
)
