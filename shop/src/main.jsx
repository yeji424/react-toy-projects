import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'

// Bootstrap CSS, Icons, JS 가져오기
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// 기존 CSS파일 더 하단에 둬서 적용되도록
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
