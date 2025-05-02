import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '../common/DefaultLayout'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import CreatePost from '../pages/CreatePost.jsx'
import PostListPage from '../pages/PostListPage'
import PostDetailPage from '../pages/PostDetailPage.jsx'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <div>에러 발생</div>,
    children: [
      {
        index: true,
        element: <PostListPage />,
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
      {
        path: '/detail/:postId',
        element: <PostDetailPage />,
      },
    ],
  },
])
