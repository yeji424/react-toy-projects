import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Default from './layout/Default'
import NotFound from './pages/NotFound'

// import MainPage from './pages/MainPage'
// import ShopPage from './pages/ShopPage'
// import AboutPage from './pages/AboutPage'
// import BlogPage from './pages/BlogPage'
// import CartPage from './pages/CartPage'
const MainPage = lazy(() => import('./pages/MainPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))

import Loading from './components/Loading'

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
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
])

export default router
