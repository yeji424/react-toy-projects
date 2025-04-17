import React, { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Default from './layout/Default'
import NotFound from './pages/NotFound'

// import MainPage from './pages/MainPage'
// import AboutPage from './pages/AboutPage'
// import ShopPage from './pages/ShopPage'
// import BlogPage from './pages/BlogPage'
// import CartPage from './pages/CartPage'

const MainPage = lazy(() => import('./pages/MainPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const CartPage = lazy(() => import('./pages/CartPage'))

import Loading from './components/Loading'
import DetailPage from './pages/DetailPage'
import { getProductById } from './api/productsApi'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    errorElement: <NotFound />,
    children: [
      { path: '', element: <MainPage /> },
      { path: '/shop', element: <ShopPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/blog', element: <BlogPage /> },
      { path: '/cart', element: <CartPage /> },
      {
        path: '/detail/:productId',
        element: <DetailPage />,
        loader: async ({ params }) => {
          try {
            const product = await getProductById(params.productId)
            return product
          } catch (err) {
            console.log('err----', err)
          }
        },
      },
    ],
  },
])
export default router
