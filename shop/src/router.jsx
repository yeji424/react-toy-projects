import { createBrowserRouter } from 'react-router-dom'
import Default from './layout/Default'
import MainPage from './pages/MainPage'
import ShopPage from './pages/ShopPage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import CartPage from './pages/CartPage'
import NotFound from './pages/NotFound'

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
    element: <NotFound />,
  },
])

export default router
