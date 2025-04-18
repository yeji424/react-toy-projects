import React, { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Default from './layout/Default'
import NotFound from './pages/NotFound'

// import MainPage from './pages/MainPage'
// import AboutPage from './pages/AboutPage'
// import ShopPage from './pages/ShopPage'
// import BlogPage from './pages/BlogPage'
// import CartPage from './pages/CartPage'

// lazy보다 위에 기입해야 함
// import Loading from './components/Loading'
import { detailPageLoader } from './loaders/productsLoaders'
import DetailPage from './pages/DetailPage'
import { cartPageLoader } from './loaders/cartLoaders'

const MainPage = lazy(() => import('./pages/MainPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const CartPage = lazy(() => import('./pages/CartPage'))

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
      { path: '/cart', element: <CartPage />, loader: cartPageLoader },
      {
        path: '/detail/:productId',
        element: <DetailPage />,
        loader: detailPageLoader,
      },
    ],
  },
])
export default function Router() {
  return <RouterProvider router={router} fallbackElement={<div>로딩중...</div>} />
}
