import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '../common/DefaultLayout'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import CreatePost from '../pages/CreatePost.jsx'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <div>에러 발생</div>,
    children: [
      {
        index: true,
        element: <div>메인페이지</div>,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/create',
        element: <CreatePost />,
      },
    ],
  },
])
