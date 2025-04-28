import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import WeatherPage from '../weather/WeatherPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <div>ERROR</div>,
    children: [
      {
        index: true,
        element: <WeatherPage />,
      },
    ],
  },
])
